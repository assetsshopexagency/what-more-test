import { useState, useCallback, useEffect } from "react";
import {
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  DropZone,
  Banner,
  BlockStack,
  Thumbnail,
  Text,
  InlineStack,
  Box,
  Badge,
  List,
  Icon,
  Layout,
} from "@shopify/polaris";
// import { UploadMajor, InfoMinor, CheckMinor } from "@shopify/polaris-icons";

export const loader = async () => null;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState({ text: "", status: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  const handleDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (selectedFile.size > 100 * 1024 * 1024) {
      setMessage({ text: "❌ File size must be less than 100MB", status: "critical" });
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/quicktime",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setMessage({ text: "❌ Please select a valid image or video file", status: "critical" });
      return;
    }

    setFile(selectedFile);
    setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    setMessage({ text: "", status: "" });
  }, []);

  const handleBulkDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => {
      const validTypes = [
        "image/jpeg", "image/png", "image/gif", "image/webp",
        "video/mp4", "video/quicktime", "video/x-m4v", "video/avi"
      ];
      
      if (!validTypes.includes(file.type)) {
        return false;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        return false;
      }
      
      return true;
    });

    setBulkFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ""),
      status: 'pending',
      progress: 0
    }))]);

    setMessage({ 
      text: `✅ Added ${validFiles.length} files to upload queue. Total: ${bulkFiles.length + validFiles.length}`, 
      status: "success" 
    });
  }, [bulkFiles.length]);

  const removeBulkFile = useCallback((index) => {
    setBulkFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearBulkFiles = useCallback(() => {
    setBulkFiles([]);
  }, []);

  const handleTitleChange = useCallback((value) => setTitle(value), []);

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    
    if (bulkFiles.length === 0) {
      setMessage({ text: "⚠️ Please add files to upload first!", status: "warning" });
      return;
    }

    setIsBulkUploading(true);
    setMessage({ text: `🚀 Starting bulk upload of ${bulkFiles.length} files...`, status: "info" });

    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    const BATCH_SIZE = 5;
    const totalBatches = Math.ceil(bulkFiles.length / BATCH_SIZE);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * BATCH_SIZE;
      const endIndex = Math.min(startIndex + BATCH_SIZE, bulkFiles.length);
      const batch = bulkFiles.slice(startIndex, endIndex);

      const batchPromises = batch.map(async (bulkFile, indexInBatch) => {
        const globalIndex = startIndex + indexInBatch;
        
        try {
          setBulkFiles(prev => prev.map((item, i) => 
            i === globalIndex ? { ...item, status: 'uploading', progress: 10 } : item
          ));

          const initBody = {
            fileName: bulkFile.file.name,
            fileSize: bulkFile.file.size,
            fileType: bulkFile.file.type,
            title: bulkFile.title,
          };

          const initRes = await fetch("/api/upload/init", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initBody),
          });

          const initData = await initRes.json();
          if (!initRes.ok || !initData.success) {
            throw new Error(initData.error || "Failed to get upload target");
          }

          const { target, resourceType } = initData;

          setBulkFiles(prev => prev.map((item, i) => 
            i === globalIndex ? { ...item, progress: 30 } : item
          ));

          const s3Form = new FormData();
          (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
          s3Form.append("file", bulkFile.file, bulkFile.file.name);

          const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
          if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

          setBulkFiles(prev => prev.map((item, i) => 
            i === globalIndex ? { ...item, progress: 70 } : item
          ));

          const finalizeRes = await fetch("/api/upload/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resourceUrl: target.resourceUrl,
              title: bulkFile.title,
              resourceType,
              selectedProducts: [], 
              selectedCollections: [], 
            }),
          });

          const finalizeData = await finalizeRes.json();
          
          if (!finalizeRes.ok || !finalizeData.success) {
            throw new Error(finalizeData.error || "Failed to finalize upload");
          }

          setBulkFiles(prev => prev.map((item, i) => 
            i === globalIndex ? { ...item, status: 'completed', progress: 100 } : item
          ));

          results.success++;
          
          return { success: true, file: bulkFile.file.name };

        } catch (error) {
          console.error(`❌ Failed to upload ${bulkFile.file.name}:`, error);
          
          setBulkFiles(prev => prev.map((item, i) => 
            i === globalIndex ? { ...item, status: 'failed', error: error.message } : item
          ));

          results.failed++;
          results.errors.push(`${bulkFile.file.name}: ${error.message}`);
          
          return { success: false, file: bulkFile.file.name, error: error.message };
        }
      });

      await Promise.allSettled(batchPromises);

      if (batchIndex < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setIsBulkUploading(false);
    
    const resultMessage = `📊 Bulk upload completed: ${results.success} successful, ${results.failed} failed`;
    setMessage({ 
      text: resultMessage, 
      status: results.failed === 0 ? "success" : results.success > 0 ? "warning" : "critical" 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ text: "⚠️ Please select a file first!", status: "warning" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "⏳ Preparing upload...", status: "info" });

    try {
      const initBody = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        title,
      };
      const initRes = await fetch("/api/upload/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initBody),
      });

      const initData = await initRes.json();
      if (!initRes.ok || !initData.success) {
        throw new Error(initData.error || "Failed to get upload target");
      }

      const { target, resourceType } = initData;
      setMessage({ text: "⏳ Uploading file to Shopify storage...", status: "info" });

      const s3Form = new FormData();
      (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
      s3Form.append("file", file, file.name);

      const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
      if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

      setMessage({ text: "⏳ Finalizing upload with Shopify...", status: "info" });

      const finalizeRes = await fetch("/api/upload/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceUrl: target.resourceUrl,
          title,
          resourceType,
          selectedProducts: [],
          selectedCollections: [],
        }),
      });

      const finalizeData = await finalizeRes.json();
      
      if (!finalizeRes.ok || !finalizeData.success) {
        throw new Error(finalizeData.error || "Failed to finalize upload");
      }

      setMessage({ text: "✅ File uploaded successfully!", status: "success" });
      setFile(null);
      setTitle("");
      
    } catch (err) {
      const errorMsg =
        err.name === "AbortError"
          ? "❌ Upload timed out. Please try again."
          : `❌ Upload failed: ${err.message}`;
      setMessage({ text: errorMsg, status: "critical" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = useCallback(() => {
    setFile(null);
    setTitle("");
    setMessage({ text: "", status: "" });
  }, []);

  return (
    <Page
      title="Upload Media"
      primaryAction={{
        content: "View Uploads",
        onAction: () => (window.location.href = "/app/uploads"),
      }}
    >
      <Card padding="600" borderRadius="200" shadow="md">
        <BlockStack gap="800">
          <Box padding="400">
            <BlockStack gap="200">
              <Text variant="heading2xl" as="h1" fontWeight="bold">
                Upload Media
              </Text>
              <Text variant="bodyLg" as="p" tone="subdued">
                Upload single videos or bulk upload multiple files at once. Supports images and videos up to 100MB.
              </Text>
            </BlockStack>
          </Box>

          {message.text && (
            <Box padding="400">
              <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
                <Text variant="bodyMd">{message.text}</Text>
              </Banner>
            </Box>
          )}

          <Layout>
            <Layout.Section oneHalf>
              <Card padding="600" borderRadius="200" shadow="sm" background="bg-surface">
                <BlockStack gap="400">
                  <Box padding="400">
                    <BlockStack gap="200">
                      <InlineStack gap="200" align="start" blockAlign="center">
                        {/* <Icon source={UploadMajor} tone="interactive" /> */}
                        <Text variant="headingLg" as="h2" fontWeight="semibold">
                          Single Upload
                        </Text>
                      </InlineStack>
                      <div style={{
                        width: '50px',
                        height: '4px',
                        background: 'linear-gradient(90deg, var(--p-color-bg-interactive) 0%, transparent 100%)',
                        marginTop: '-8px'
                      }} />
                      <Text variant="bodySm" as="p" tone="subdued">
                        Perfect for uploading individual videos or images with custom titles.
                      </Text>
                    </BlockStack>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <FormLayout>
                      {!file ? (
                        <DropZone
                          onDrop={handleDrop}
                          accept="image/*,video/*"
                          type="file"
                          label="Media file"
                          disabled={isUploading || isBulkUploading}
                          aria-label="Upload media file"
                        >
                          <div style={{
                            textAlign: 'center',
                            padding: 'var(--p-space-400)',
                            border: '2px dashed var(--p-color-border-interactive)',
                            borderRadius: 'var(--p-border-radius-200)',
                            background: 'var(--p-color-bg-surface)',
                            transition: 'all 0.3s ease',
                          }}>
                            <DropZone.FileUpload />
                            <Box padding="200">
                              <BlockStack gap="100">
                                {/* <Icon source={UploadMajor} tone="interactive" /> */}
                                <Text variant="bodyMd" fontWeight="medium">
                                  Drag and drop your file here or click to browse
                                </Text>
                              </BlockStack>
                            </Box>
                          </div>
                        </DropZone>
                      ) : (
                        <BlockStack gap="200">
                          <InlineStack gap="200" align="start" blockAlign="center">
                            <Thumbnail
                              source={file.type.startsWith("image") ? URL.createObjectURL(file) : ""}
                              alt={file.name}
                              size="medium"
                              style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            />
                            <BlockStack gap="100">
                              <Text variant="bodyMd" as="p" fontWeight="medium">
                                {file.name}
                              </Text>
                              <Text variant="bodySm" as="p" tone="subdued">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                              </Text>
                            </BlockStack>
                            <Button onClick={removeFile} disabled={isUploading || isBulkUploading} variant="plain" tone="critical">
                              Remove
                            </Button>
                          </InlineStack>
                        </BlockStack>
                      )}

                      <TextField
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        autoComplete="off"
                        disabled={isUploading || isBulkUploading}
                        helpText="A descriptive title for your media file"
                      />

                      <Button
                        primary
                        submit
                        loading={isUploading}
                        disabled={!file || isUploading || isBulkUploading}
                        size="large"
                        fullWidth
                        // icon={UploadMajor}
                        tone="success"
                      >
                        {isUploading ? "Uploading..." : "Upload Single File"}
                      </Button>
                    </FormLayout>
                  </form>
                </BlockStack>
              </Card>
            </Layout.Section>

            <Layout.Section oneHalf>
              <Card padding="600" borderRadius="200" shadow="sm" background="bg-surface">
                <BlockStack gap="400">
                  <Box padding="400">
                    <BlockStack gap="200">
                      <InlineStack gap="200" align="start" blockAlign="center">
                        {/* <Icon source={UploadMajor} tone="interactive" /> */}
                        <Text variant="headingLg" as="h2" fontWeight="semibold">
                          Bulk Upload
                        </Text>
                      </InlineStack>
                      <div style={{
                        width: '50px',
                        height: '4px',
                        background: 'linear-gradient(90deg, var(--p-color-bg-interactive) 0%, transparent 100%)',
                        marginTop: '-8px'
                      }} />
                      <Text variant="bodySm" as="p" tone="subdued">
                        Upload multiple files at once. Perfect for large batches of 100+ videos.
                      </Text>
                    </BlockStack>
                  </Box>

                  <BlockStack gap="300">
                    <DropZone
                      onDrop={handleBulkDrop}
                      accept="image/*,video/*"
                      type="file"
                      label="Select multiple media files"
                      allowMultiple
                      disabled={isBulkUploading}
                      aria-label="Upload multiple media files"
                    >
                      <div style={{
                        textAlign: 'center',
                        padding: 'var(--p-space-400)',
                        border: '2px dashed var(--p-color-border-interactive)',
                        borderRadius: 'var(--p-border-radius-200)',
                        background: 'var(--p-color-bg-surface)',
                        transition: 'all 0.3s ease',
                      }}>
                        <DropZone.FileUpload />
                        <Box padding="200">
                          <BlockStack gap="100">
                            {/* <Icon source={UploadMajor} tone="interactive" /> */}
                            <Text variant="bodyMd" fontWeight="medium">
                              Drag and drop multiple files here or click to browse
                            </Text>
                          </BlockStack>
                        </Box>
                      </div>
                    </DropZone>

                    {bulkFiles.length > 0 && (
                      <BlockStack gap="200">
                        <InlineStack align="space-between" blockAlign="center">
                          <Text variant="bodyMd" fontWeight="semibold">
                            Upload Queue ({bulkFiles.length} files)
                          </Text>
                          <Button
                            onClick={clearBulkFiles}
                            disabled={isBulkUploading}
                            variant="plain"
                            tone="critical"
                          >
                            Clear All
                          </Button>
                        </InlineStack>

                        <Box
                          maxHeight="300px"
                          overflowY="auto"
                          padding="200"
                          background="bg-surface-secondary"
                          borderRadius="200"
                          border="divider"
                        >
                          <BlockStack gap="100">
                            {bulkFiles.map((bulkFile, index) => (
                              <Card key={index} padding="400" borderRadius="200" shadow="sm">
                                <InlineStack align="space-between" blockAlign="center">
                                  <InlineStack gap="200" blockAlign="center">
                                    <Thumbnail
                                      source={bulkFile.file.type.startsWith("image") ? URL.createObjectURL(bulkFile.file) : ""}
                                      alt={bulkFile.file.name}
                                      size="medium"
                                      style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                    />
                                    <BlockStack gap="050">
                                      <Text variant="bodySm" fontWeight="medium">
                                        {bulkFile.title}
                                      </Text>
                                      <Text variant="bodySm" tone="subdued">
                                        {(bulkFile.file.size / 1024 / 1024).toFixed(2)} MB
                                      </Text>
                                    </BlockStack>
                                  </InlineStack>
                                  <InlineStack gap="100" blockAlign="center">
                                    {bulkFile.status === 'completed' && <Badge tone="success">Completed</Badge>}
                                    {bulkFile.status === 'uploading' && <Badge tone="attention">Uploading {bulkFile.progress}%</Badge>}
                                    {bulkFile.status === 'failed' && <Badge tone="critical">Failed</Badge>}
                                    {bulkFile.status === 'pending' && <Badge tone="subdued">Pending</Badge>}
                                    <Button
                                      size="slim"
                                      tone="critical"
                                      onClick={() => removeBulkFile(index)}
                                      disabled={isBulkUploading}
                                    >
                                      Remove
                                    </Button>
                                  </InlineStack>
                                </InlineStack>
                                {bulkFile.status === 'uploading' && (
                                  <Box marginTop="100">
                                    <div style={{
                                      width: '100%',
                                      height: '6px',
                                      backgroundColor: 'var(--p-color-bg-surface)',
                                      borderRadius: '3px',
                                      overflow: 'hidden',
                                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                                    }}>
                                      <div style={{
                                        width: `${bulkFile.progress}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--p-color-bg-success) 0%, var(--p-color-bg-interactive) 100%)',
                                        transition: 'width 0.4s ease-in-out',
                                      }} />
                                    </div>
                                  </Box>
                                )}
                                {bulkFile.status === 'failed' && bulkFile.error && (
                                  <Box marginTop="100">
                                    <Text variant="bodySm" tone="critical">
                                      Error: {bulkFile.error}
                                    </Text>
                                  </Box>
                                )}
                              </Card>
                            ))}
                          </BlockStack>
                        </Box>

                        <Button
                          primary
                          onClick={handleBulkUpload}
                          loading={isBulkUploading}
                          disabled={isBulkUploading || bulkFiles.length === 0}
                          size="large"
                          fullWidth
                          // icon={UploadMajor}
                          tone="success"
                        >
                          {isBulkUploading ? `Uploading... (${bulkFiles.filter(f => f.status === 'completed').length}/${bulkFiles.length})` : `Start Bulk Upload (${bulkFiles.length} files)`}
                        </Button>

                        {isBulkUploading && (
                          <Box>
                            <Text variant="bodySm" tone="subdued">
                              📦 Uploading in batches of 5 files. Do not close this page.
                            </Text>
                          </Box>
                        )}
                      </BlockStack>
                    )}
                  </BlockStack>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>

          <Box
            padding="600"
            background="bg-surface-secondary"
            borderRadius="200"
            style={{
              background: 'linear-gradient(180deg, var(--p-color-bg-surface) 0%, var(--p-color-bg-surface-secondary) 100%)',
            }}
          >
            <BlockStack gap="400">
              <Text variant="headingMd" as="h3" fontWeight="semibold">
                <InlineStack gap="100">
                  {/* <Icon source={InfoMinor} tone="info" /> */}
                  Upload Tips
                </InlineStack>
              </Text>
              <List type="bullet">
                <List.Item>
                  <InlineStack gap="100">
                    {/* <Icon source={CheckMinor} tone="success" /> */}
                    Supported formats: JPEG, PNG, GIF, WebP, MP4, MOV, M4V, AVI
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="100">
                    {/* <Icon source={CheckMinor} tone="success" /> */}
                    Maximum file size: 100MB per file
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="100">
                    {/* <Icon source={CheckMinor} tone="success" /> */}
                    Bulk upload processes files in batches of 5 for optimal performance
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="100">
                    {/* <Icon source={CheckMinor} tone="success" /> */}
                    Keep this page open during bulk uploads
                  </InlineStack>
                </List.Item>
              </List>
            </BlockStack>
          </Box>
        </BlockStack>
      </Card>
    </Page>
  );
}