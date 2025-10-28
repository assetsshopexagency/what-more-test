// File: app/routes/app.products.jsx
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
import ProductCarousel from "../components/ProductCarousel";
import ProductSelectionModal from "../components/ProductSelectionModal";
import VideoDetailsModal from "../components/VideoDetailsModal"; // ✅ Import the new modal

export const loader = async () => null;

export default function ManageProducts() {
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [videoProductsMap, setVideoProductsMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", status: "" });
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoForView, setSelectedVideoForView] = useState(null); // ✅ For View Products Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [viewProductsModalOpen, setViewProductsModalOpen] = useState(false); // ✅ Modal state
  const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
  const [updatingProducts, setUpdatingProducts] = useState(false);

  useEffect(() => {
    loadVideos();
    loadVideoProducts();
  }, []);

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

  const loadVideoProducts = async () => {
    try {
      const response = await fetch("/api/showproducts-onvideos");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
        setVideoProductsMap(map);
      } else {
        setMessage({ text: `❌ Failed to load video products: ${data.error || "Unknown error"}`, status: "critical" });
        setVideoProductsMap(new Map());
      }
    } catch (error) {
      console.error("Failed to load video products:", error);
      setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
      setVideoProductsMap(new Map());
    }
  };

  // const deleteVideoProduct = async (videoId, productId) => {
  //   try {
  //     const response = await fetch("/api/delete-video-product", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ videoId, productId })
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       setVideoProductsMap(prev => {
  //         const newMap = new Map(prev);
  //         const products = newMap.get(videoId) || [];
  //         newMap.set(videoId, products.filter(p => p.id !== productId));
  //         return newMap;
  //       });
  //       setMessage({ text: "✅ Product removed from video", status: "success" });
  //     } else {
  //       setMessage({ text: `❌ Failed to remove product: ${data.error}`, status: "critical" });
  //     }
  //   } catch (error) {
  //     setMessage({ text: `❌ Error removing product: ${error.message}`, status: "critical" });
  //   }
  // };

  const openProductModal = async (video) => {
    try {
      setSelectedVideo(video);
      setProductModalOpen(true);
      setProductsLoading(true);

      const response = await fetch("/api/viewproducts");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
        const currentProducts = videoProductsMap.get(video.id) || [];
        const currentProductIds = currentProducts.map(p => String(p.id));
        setTempSelectedProducts(currentProductIds);
      } else {
        setMessage({ text: `❌ Failed to load products: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Error opening product modal:", error);
      setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
    } finally {
      setProductsLoading(false);
    }
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setSelectedVideo(null);
    setTempSelectedProducts([]);
  };

  // ✅ View Products Modal controls
  const openViewProductsModal = (video) => {
    setSelectedVideoForView(video);
    setViewProductsModalOpen(true);
  };

  const closeViewProductsModal = () => {
    setSelectedVideoForView(null);
    setViewProductsModalOpen(false);
  };

  const updateVideoProducts = async () => {
    if (!selectedVideo) return;

    setUpdatingProducts(true);
    try {
      const response = await fetch("/api/saveproducts-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: selectedVideo.id,
          productIds: tempSelectedProducts
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const updatedProducts = data.video?.videoProducts?.map(vp => vp.product) || [];
        
        setVideoProductsMap(prev => {
          const newMap = new Map(prev);
          newMap.set(selectedVideo.id, updatedProducts);
          return newMap;
        });
        
        setMessage({ text: "✅ Products updated successfully!", status: "success" });
        closeProductModal();
        
        setTimeout(() => {
          loadVideoProducts();
        }, 500);
        
      } else {
        setMessage({ text: `❌ Failed to update products: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      setMessage({ text: `❌ Failed to update products: ${error.message}`, status: "critical" });
    } finally {
      setUpdatingProducts(false);
    }
  };

  return (
    <Page title="Manage Products">
      {/* ✅ Product Selection Modal */}
      <ProductSelectionModal
        open={productModalOpen}
        onClose={closeProductModal}
        title={`Select Products for "${selectedVideo?.title}"`}
        products={products}
        productsLoading={productsLoading}
        tempSelectedProducts={tempSelectedProducts}
        onTempProductSelect={(productIds) => setTempSelectedProducts(productIds)}
        primaryAction={{
          content: "Save Products",
          onAction: updateVideoProducts,
          loading: updatingProducts,
        }}
        secondaryActions={[
          { content: "Cancel", onAction: closeProductModal },
        ]}
      />

      {/* ✅ View Products Modal */}
      {selectedVideoForView && (
        <VideoDetailsModal
          open={viewProductsModalOpen}
          onClose={closeViewProductsModal}
          video={selectedVideoForView}
          products={videoProductsMap.get(selectedVideoForView.id) || []}
          collections={[]} // Optional: add collections later if you want
        />
      )}

      {message.text && (
        <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
          {message.text}
        </Banner>
      )}

      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="headingLg" as="h2">
                  Manage Products for Videos ({videos.length})
                </Text>
                <Button onClick={() => { loadVideos(); loadVideoProducts(); }} disabled={loading}>
                  Refresh
                </Button>
              </InlineStack>

              {loading ? (
                <Box padding="800" alignment="center">
                  <Spinner accessibilityLabel="Loading videos" size="large" />
                  <Text alignment="center" tone="subdued" variant="bodyMd">
                    Loading your videos...
                  </Text>
                </Box>
              ) : videos.length === 0 ? (
                <EmptyState
                  heading="No videos yet"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <Text variant="bodyMd" as="p">
                    Upload videos to manage products.
                  </Text>
                </EmptyState>
              ) : (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}>
                  {videos.map((video) => {
                    const directProducts = videoProductsMap.get(video.id) || [];

                    return (
                      <div
                        key={video.id}
                        style={{
                          flex: "0 0 calc(33.333% - 13.33px)",
                          minWidth: "280px",
                          boxSizing: "border-box",
                          position: "relative",
                        }}
                      >
                        <Card padding="300">
                          <BlockStack gap="300">
                            <VideoPlayer video={video} />
                            
                            {/* <ProductCarousel
                              products={directProducts}
                              videoId={video.id}
                              onDelete={deleteVideoProduct}
                            /> */}

                            <BlockStack gap="200">
                              <Text variant="bodyMd" fontWeight="bold" alignment="center" truncate>
                                {video.title}
                              </Text>
                              
                              <InlineStack gap="100" align="center" blockAlign="center">
                                <Badge tone="success" size="small">
                                  {directProducts.length} products
                                </Badge>
                                <Badge tone="subdued" size="small">
                                  {new Date(video.created_at).toLocaleDateString()}
                                </Badge>
                              </InlineStack>

                              {/* ✅ Manage + View Buttons */}
                              <InlineStack gap="200">
                                <Button fullWidth size="slim" onClick={() => openProductModal(video)}>
                                  Manage Products
                                </Button>
                                <Button
                                  fullWidth
                                  size="slim"
                                  onClick={() => openViewProductsModal(video)}
                                  tone="secondary"
                                >
                                  View Products
                                </Button>
                              </InlineStack>
                            </BlockStack>
                          </BlockStack>
                        </Card>
                      </div>
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
