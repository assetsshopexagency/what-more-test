// manage collection page code 

import { useState, useEffect } from "react";
import {
  Page,
  Card,
  Banner,
  BlockStack,
  Text,
  InlineStack,
  Badge,
  Layout,
  Box,
  Spinner,
  EmptyState,
  Button,
} from "@shopify/polaris";
import VideoPlayer from "../components/VideoPlayer";
import CollectionSelectionModal from "../components/CollectionSelectionModal";
import ViewCollectionsModal from "../components/ViewCollectionsModal";

export const loader = async () => null;

export default function ManageCollections() {
  const [videos, setVideos] = useState([]);
  const [collections, setCollections] = useState([]);
  const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
  const [collectionProducts, setCollectionProducts] = useState(new Map());
  const [excludedMap, setExcludedMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", status: "" });
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [viewCollectionsModalOpen, setViewCollectionsModalOpen] = useState(false);
  const [tempSelectedCollections, setTempSelectedCollections] = useState([]);
  const [updatingCollections, setUpdatingCollections] = useState(false);

  useEffect(() => {
    loadVideos();
    loadVideoCollections();
    loadExcludedProducts();
  }, []);

  useEffect(() => {
    const fetchMissingCollectionProducts = async () => {
      const uniqueShopifyIds = new Set();
      videoCollectionsMap.forEach(colls => {
        colls.forEach(c => uniqueShopifyIds.add(c.shopify_collection_id));
      });

      for (const shopifyId of uniqueShopifyIds) {
        if (!collectionProducts.has(shopifyId)) {
          try {
            const response = await fetch(`/api/collection-products?collectionId=${encodeURIComponent(shopifyId)}`);
            const data = await response.json();
            if (data.success) {
              setCollectionProducts(prev => new Map(prev).set(shopifyId, data.products));
            }
          } catch (error) {
            console.error(`Failed to load products for collection ${shopifyId}:`, error);
          }
        }
      }
    };

    if (videoCollectionsMap.size > 0) {
      fetchMissingCollectionProducts();
    }
  }, [videoCollectionsMap, collectionProducts]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos || []);
      } else {
        setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
        setVideos([]);
      }
    } catch (error) {
      console.error("Failed to load videos:", error);
      setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const loadVideoCollections = async () => {
    try {
      const response = await fetch("/api/showcollections-onvideos");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
        setVideoCollectionsMap(map);
      } else {
        setMessage({ text: `❌ Failed to load video collections: ${data.error || "Unknown error"}`, status: "critical" });
        setVideoCollectionsMap(new Map());
      }
    } catch (error) {
      console.error("Failed to load video collections:", error);
      setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
      setVideoCollectionsMap(new Map());
    }
  };

  const loadExcludedProducts = async () => {
    try {
      const response = await fetch("/api/show-excluded-products");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const map = data.videoExcludeds.reduce((m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))), new Map());
        setExcludedMap(map);
      } else {
        setMessage({ text: `❌ Failed to load excluded products: ${data.error || "Unknown error"}`, status: "critical" });
        setExcludedMap(new Map());
      }
    } catch (error) {
      console.error("Failed to load excluded products:", error);
      setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
      setExcludedMap(new Map());
    }
  };

  const deleteVideoCollection = async (videoId, collectionLocalId) => {
    try {
      const response = await fetch("/api/delete-video-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, collectionId: collectionLocalId })
      });
      const data = await response.json();
      if (data.success) {
        setVideoCollectionsMap(prev => {
          const newMap = new Map(prev);
          const colls = newMap.get(videoId) || [];
          newMap.set(videoId, colls.filter(c => c.id !== collectionLocalId));
          return newMap;
        });
        setMessage({ text: "✅ Collection removed from video", status: "success" });
      } else {
        setMessage({ text: `❌ Failed to remove collection: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      setMessage({ text: `❌ Error removing collection: ${error.message}`, status: "critical" });
    }
  };

  const excludeProduct = async (videoId, productId) => {
    try {
      const response = await fetch("/api/exclude-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, productId })
      });
      const data = await response.json();
      if (data.success) {
        setExcludedMap(prev => {
          const newMap = new Map(prev);
          const ex = new Set(newMap.get(videoId) || []);
          ex.add(productId);
          newMap.set(videoId, ex);
          return newMap;
        });
        setMessage({ text: "✅ Product excluded from video", status: "success" });
      } else {
        setMessage({ text: `❌ Failed to exclude product: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      setMessage({ text: `❌ Error excluding product: ${error.message}`, status: "critical" });
    }
  };

  const openCollectionModal = async (video) => {
    try {
      setSelectedVideo(video);
      setCollectionModalOpen(true);
      setCollectionsLoading(true);

      const response = await fetch("/api/viewcollections");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        setCollections(data.collections || []);
        const currentCollectionIds = (videoCollectionsMap.get(video.id) || []).map(c => String(c.shopify_collection_id));
        setTempSelectedCollections(currentCollectionIds);
      } else {
        setMessage({ text: `❌ Failed to load collections: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Error opening collection modal:", error);
      setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
    } finally {
      setCollectionsLoading(false);
    }
  };

  const closeCollectionModal = () => {
    setCollectionModalOpen(false);
    setSelectedVideo(null);
    setTempSelectedCollections([]);
  };

  const openViewCollectionsModal = (video) => {
    setSelectedVideo(video);
    setViewCollectionsModalOpen(true);
  };

  const closeViewCollectionsModal = () => {
    setViewCollectionsModalOpen(false);
    setSelectedVideo(null);
  };

  const updateVideoCollections = async () => {
    if (!selectedVideo) return;

    setUpdatingCollections(true);
    try {
      const response = await fetch("/api/savecollections-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: selectedVideo.id,
          collectionIds: tempSelectedCollections
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setVideoCollectionsMap(prev => {
          const newMap = new Map(prev);
          newMap.set(selectedVideo.id, data.video.collections || []);
          return newMap;
        });
        setMessage({ text: "✅ Collections updated successfully!", status: "success" });
        closeCollectionModal();
      } else {
        setMessage({ text: `❌ Failed to update collections: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      setMessage({ text: `❌ Failed to update collections: ${error.message}`, status: "critical" });
    } finally {
      setUpdatingCollections(false);
    }
  };

  return (
    <Page title="Manage Collections" fullWidth>
      <CollectionSelectionModal
        open={collectionModalOpen}
        onClose={closeCollectionModal}
        title={`Select Collections for "${selectedVideo?.title}"`}
        collections={collections}
        collectionsLoading={collectionsLoading}
        tempSelectedCollections={tempSelectedCollections}
        onTempCollectionSelect={(collectionIds) => setTempSelectedCollections(collectionIds)}
        primaryAction={{
          content: "Save Collections",
          onAction: updateVideoCollections,
          loading: updatingCollections,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: closeCollectionModal,
          },
        ]}
      />

      <ViewCollectionsModal
        open={viewCollectionsModalOpen}
        onClose={closeViewCollectionsModal}
        title={`Collections for "${selectedVideo?.title}"`}
        videoId={selectedVideo?.id}
        collections={selectedVideo ? videoCollectionsMap.get(selectedVideo.id) || [] : []}
        collectionProducts={collectionProducts}
        excludedMap={excludedMap}
        onDeleteCollection={deleteVideoCollection}
        onExcludeProduct={excludeProduct}
        setMessage={setMessage}
      />

      {message.text && (
        <Box paddingBlockEnd="400">
          <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
            {message.text}
          </Banner>
        </Box>
      )}

      <Layout>
        <Layout.Section>
          <Card padding="600">
            <BlockStack gap="600">
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="heading2xl" as="h1" fontWeight="bold">
                  Manage Collections for Videos ({videos.length})
                </Text>
                <Button
                  onClick={() => {
                    loadVideos();
                    loadVideoCollections();
                    loadExcludedProducts();
                  }}
                  disabled={loading}
                  variant="secondary"
                >
                  Refresh
                </Button>
              </InlineStack>

              {loading ? (
                <Box padding="800" align="center">
                  <Spinner accessibilityLabel="Loading videos" size="large" />
                  <Text variant="bodyLg" tone="subdued" alignment="center">
                    Loading your videos...
                  </Text>
                </Box>
              ) : videos.length === 0 ? (
                <EmptyState
                  heading="No videos yet"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  action={{
                    content: "Upload Video",
                    onAction: () => window.location.href = "/upload",
                  }}
                >
                  <Text variant="bodyLg" as="p" tone="subdued">
                    Upload videos to manage collections.
                  </Text>
                </EmptyState>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px',
                  padding: '16px 0',
                }}>
                  {videos.map((video) => {
                    const colls = videoCollectionsMap.get(video.id) || [];

                    return (
                      <Card
                        key={video.id}
                        padding="400"
                        background="bg-surface"
                        roundedAbove="sm"
                        style={{
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          ':hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <BlockStack gap="400">
                          <VideoPlayer video={video} />

                          <BlockStack gap="200">
                            <Text
                              variant="headingSm"
                              fontWeight="semibold"
                              alignment="center"
                              truncate
                            >
                              {video.title}
                            </Text>

                            <InlineStack gap="200" align="center" blockAlign="center">
                              <Badge tone="info">{colls.length} collections</Badge>
                              <Badge tone="subdued">
                                {new Date(video.created_at).toLocaleDateString()}
                              </Badge>
                            </InlineStack>

                            <InlineStack gap="200" align="center">
                              <Button
                                fullWidth
                                variant="primary"
                                tone="success"
                                size="medium"
                                onClick={() => openCollectionModal(video)}
                              >
                                Manage Collections
                              </Button>
                              <Button
                                fullWidth
                                variant="secondary"
                                size="medium"
                                onClick={() => openViewCollectionsModal(video)}
                              >
                                View Collections
                              </Button>
                            </InlineStack>
                          </BlockStack>
                        </BlockStack>
                      </Card>
                    );
                  })}
                </div>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}