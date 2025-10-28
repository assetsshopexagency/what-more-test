import { useState, useEffect } from "react";
import {
  Modal,
  Text,
  BlockStack,
  InlineStack,
  Scrollable,
  Box,
  Thumbnail,
  Divider,
  Badge,
  Card,
  Spinner,
  Button,
  Toast,
  Frame,
} from "@shopify/polaris";

export default function VideoDetailsModal({
  open,
  onClose,
  video,
  products = [],
  collections = [],
}) {
  const [productImagesMap, setProductImagesMap] = useState(new Map());
  const [collectionImagesMap, setCollectionImagesMap] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState({ active: false, message: "", error: false });

  const dismissToast = () => setToast({ active: false, message: "", error: false });
  const showToast = (message, error = false) =>
    setToast({ active: true, message, error });

  // 🧩 Fetch product + collection images from APIs when modal opens
  useEffect(() => {
    if (!open) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const [productsRes, collectionsRes] = await Promise.all([
          fetch("/api/viewproducts"),
          fetch("/api/viewcollections"),
        ]);

        const [productsData, collectionsData] = await Promise.all([
          productsRes.json(),
          collectionsRes.json(),
        ]);

        // Products
        if (productsData.success && Array.isArray(productsData.products)) {
          const imageMap = new Map(
            productsData.products.map((p) => [p.id, p.image_url])
          );
          setProductImagesMap(imageMap);
        }

        // Collections
        if (collectionsData.success && Array.isArray(collectionsData.collections)) {
          const imageMap = new Map(
            collectionsData.collections.map((c) => [c.id, c.image_url])
          );
          setCollectionImagesMap(imageMap);
        }
      } catch (error) {
        console.error("Error fetching product/collection images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [open]);

  // 🧠 Image helpers
  const getProductImage = (product) => {
    return (
      productImagesMap.get(product.id) ||
      product?.image_url ||
      product?.image?.src ||
      product?.featured_image ||
      product?.images?.[0]?.src ||
      "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/placeholder-image.png"
    );
  };

  const getCollectionImage = (collection) => {
    return (
      collectionImagesMap.get(collection.id) ||
      collection?.image_url ||
      collection?.image?.src ||
      "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/placeholder-image.png"
    );
  };

  // 🧾 Price fallback
  const getProductPrice = (product) => {
    if (product?.variants?.length > 0) {
      const price = product.variants[0].price;
      return `$${parseFloat(price).toFixed(2)}`;
    }
    if (typeof product?.price === "number") return `$${product.price.toFixed(2)}`;
    if (typeof product?.price === "string") return `$${parseFloat(product.price).toFixed(2)}`;
    return "—";
  };

  // 🗑️ Handle delete
  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(productId);
    try {
      const res = await fetch("/api/delete-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✅ Product deleted successfully!");
      } else {
        showToast("❌ Failed to delete product", true);
      }
    } catch (err) {
      showToast("❌ " + err.message, true);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Frame>
      <Modal
        open={open}
        onClose={onClose}
        title="Video Details"
        primaryAction={{ content: "Close", onAction: onClose }}
        large
      >
        <Modal.Section>
          <BlockStack gap="400">
            {/* HEADER */}
            <Box paddingBlockEnd="200" borderBlockEndWidth="1" borderColor="border-subdued">
              <Text variant="headingMd" as="h2">
                {video.title}
              </Text>
              <Text tone="subdued" variant="bodySm">
                Products and collections linked to this video
              </Text>
            </Box>

            {loading ? (
              <Box padding="600" align="center">
                <Spinner accessibilityLabel="Loading details" size="large" />
                <Text alignment="center" tone="subdued">
                  Loading product and collection images...
                </Text>
              </Box>
            ) : (
              <Scrollable shadow style={{ maxHeight: "500px" }}>
                <BlockStack gap="600">
                  {/* 🛍️ PRODUCTS SECTION */}
                  <BlockStack gap="300">
                    <Text variant="headingSm" as="h3">
                      Linked Products ({products.length})
                    </Text>

                    {products.length === 0 ? (
                      <Text tone="subdued">No products linked to this video.</Text>
                    ) : (
                      products.map((product) => (
                        <Card
                          key={product.id}
                          padding="300"
                          sectioned
                          subdued
                          style={{
                            transition: "background 0.2s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          <InlineStack
                            gap="400"
                            align="space-between"
                            blockAlign="center"
                          >
                            <InlineStack gap="300" blockAlign="center">
                              <Thumbnail
                                source={getProductImage(product)}
                                alt={product.title}
                                size="medium"
                              />
                              <BlockStack gap="50">
                                <Text variant="bodyMd" fontWeight="semibold">
                                  {product.title}
                                </Text>
                                <Text tone="subdued" variant="bodySm">
                                  {getProductPrice(product)}
                                </Text>
                              </BlockStack>
                            </InlineStack>

                            <InlineStack gap="200" blockAlign="center">
                              <Badge tone="subdued" size="small">
                                {product.created_at
                                  ? new Date(product.created_at).toLocaleDateString()
                                  : "—"}
                              </Badge>

                              {/* ✅ Delete Button */}
                              <Button
                                size="slim"
                                tone="critical"
                                loading={deleting === product.id}
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </Button>
                            </InlineStack>
                          </InlineStack>
                        </Card>
                      ))
                    )}
                  </BlockStack>

                  <Divider />

                  {/* 🧩 COLLECTIONS SECTION */}
                  <BlockStack gap="300">
                    <Text variant="headingSm" as="h3">
                      Linked Collections ({collections.length})
                    </Text>

                    {collections.length === 0 ? (
                      <Text tone="subdued">No collections linked to this video.</Text>
                    ) : (
                      collections.map((collection) => (
                        <Card
                          key={collection.id}
                          padding="300"
                          sectioned
                          subdued
                          style={{
                            transition: "background 0.2s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          <InlineStack
                            gap="400"
                            align="space-between"
                            blockAlign="center"
                          >
                            <InlineStack gap="300" blockAlign="center">
                              <Thumbnail
                                source={getCollectionImage(collection)}
                                alt={collection.title}
                                size="medium"
                              />
                              <BlockStack gap="50">
                                <Text variant="bodyMd" fontWeight="semibold">
                                  {collection.title}
                                </Text>
                                <Text tone="subdued" variant="bodySm">
                                  Collection
                                </Text>
                              </BlockStack>
                            </InlineStack>

                            <Badge tone="subdued" size="small">
                              {collection.created_at
                                ? new Date(collection.created_at).toLocaleDateString()
                                : "—"}
                            </Badge>
                          </InlineStack>
                        </Card>
                      ))
                    )}
                  </BlockStack>
                </BlockStack>
              </Scrollable>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* ✅ Toast Notification */}
      {toast.active && (
        <Toast
          content={toast.message}
          error={toast.error}
          onDismiss={dismissToast}
          duration={2500}
        />
      )}
    </Frame>
  );
}
