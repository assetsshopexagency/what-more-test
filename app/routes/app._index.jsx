// // // import { useState, useCallback, useEffect, useRef } from "react";
// // // import {
// // //   Page,
// // //   Card,
// // //   FormLayout,
// // //   TextField,
// // //   Button,
// // //   DropZone,
// // //   Banner,
// // //   BlockStack,
// // //   Thumbnail,
// // //   Text,
// // //   InlineStack,
// // //   Select,
// // //   List,
// // //   Badge,
// // //   Layout,
// // //   Box,
// // //   Spinner,
// // //   Modal,
// // //   EmptyState,
// // //   Icon,
// // //   Checkbox,
// // // } from "@shopify/polaris";

// // // export const loader = async () => null;

// // // export default function Index() {
// // //   const [file, setFile] = useState(null);
// // //   const [title, setTitle] = useState("");
// // //   const [message, setMessage] = useState({ text: "", status: "" });
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [products, setProducts] = useState([]);
// // //   const [collections, setCollections] = useState([]);
// // //   const [selectedProducts, setSelectedProducts] = useState([]);
// // //   const [selectedCollections, setSelectedCollections] = useState([]);
// // //   const [videos, setVideos] = useState([]);
// // //   const [videoProductsMap, setVideoProductsMap] = useState(new Map());
// // //   const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
// // //   const [collectionProducts, setCollectionProducts] = useState(new Map());
// // //   const [excludedMap, setExcludedMap] = useState(new Map());
// // //   const [loading, setLoading] = useState(true);
// // //   const [productsLoading, setProductsLoading] = useState(false);
// // //   const [collectionsLoading, setCollectionsLoading] = useState(false);

// // //   // States for product selection modal
// // //   const [selectedVideo, setSelectedVideo] = useState(null);
// // //   const [productModalOpen, setProductModalOpen] = useState(false);
// // //   const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
// // //   const [updatingProducts, setUpdatingProducts] = useState(false);

// // //   // States for collection selection modal
// // //   const [collectionModalOpen, setCollectionModalOpen] = useState(false);
// // //   const [tempSelectedCollections, setTempSelectedCollections] = useState([]);
// // //   const [updatingCollections, setUpdatingCollections] = useState(false);

// // //   // States for bulk deletion
// // //   const [selectedVideos, setSelectedVideos] = useState([]);
// // //   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
// // //   const [deleting, setDeleting] = useState(false);

// // //   // Load data when page loads
// // //   useEffect(() => {
// // //     loadProducts();
// // //     loadCollections();
// // //     loadVideos();
// // //     loadVideoProducts();
// // //     loadVideoCollections();
// // //     loadExcludedProducts();
// // //   }, []);

// // //   // Fetch collection products when collections are loaded
// // //   useEffect(() => {
// // //     const fetchMissingCollectionProducts = async () => {
// // //       const uniqueShopifyIds = new Set();
// // //       videoCollectionsMap.forEach(colls => {
// // //         colls.forEach(c => uniqueShopifyIds.add(c.shopify_collection_id));
// // //       });

// // //       for (const shopifyId of uniqueShopifyIds) {
// // //         if (!collectionProducts.has(shopifyId)) {
// // //           try {
// // //             const response = await fetch(`/api/collection-products?collectionId=${encodeURIComponent(shopifyId)}`);
// // //             const data = await response.json();
// // //             if (data.success) {
// // //               setCollectionProducts(prev => new Map(prev).set(shopifyId, data.products));
// // //             }
// // //           } catch (error) {
// // //             console.error(`Failed to load products for collection ${shopifyId}:`, error);
// // //           }
// // //         }
// // //       }
// // //     };

// // //     if (videoCollectionsMap.size > 0) {
// // //       fetchMissingCollectionProducts();
// // //     }
// // //   }, [videoCollectionsMap, collectionProducts]);

// // //   // Load products from Shopify (/api/viewproducts)
// // //   const loadProducts = async () => {
// // //     try {
// // //       setProductsLoading(true);
// // //       const response = await fetch("/api/viewproducts");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setProducts(data.products || []);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load products: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setProducts([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load products:", error);
// // //       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
// // //       setProducts([]);
// // //     } finally {
// // //       setProductsLoading(false);
// // //     }
// // //   };

// // //   // Load collections from Shopify (/api/viewcollections)
// // //   const loadCollections = async () => {
// // //     try {
// // //       setCollectionsLoading(true);
// // //       const response = await fetch("/api/viewcollections");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setCollections(data.collections || []);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load collections: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setCollections([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load collections:", error);
// // //       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
// // //       setCollections([]);
// // //     } finally {
// // //       setCollectionsLoading(false);
// // //     }
// // //   };

// // //   // Load videos (/api/videos)
// // //   const loadVideos = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await fetch("/api/videos");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setVideos(data.videos || []);
// // //         setSelectedVideos([]);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setVideos([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load videos:", error);
// // //       setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
// // //       setVideos([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Load video products map (/api/showproducts-onvideos)
// // //   const loadVideoProducts = async () => {
// // //     try {
// // //       const response = await fetch("/api/showproducts-onvideos");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
// // //         setVideoProductsMap(map);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load video products: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setVideoProductsMap(new Map());
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load video products:", error);
// // //       setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
// // //       setVideoProductsMap(new Map());
// // //     }
// // //   };

// // //   // Load video collections map (/api/showcollections-onvideos)
// // //   const loadVideoCollections = async () => {
// // //     try {
// // //       const response = await fetch("/api/showcollections-onvideos");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
// // //         setVideoCollectionsMap(map);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load video collections: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setVideoCollectionsMap(new Map());
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load video collections:", error);
// // //       setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
// // //       setVideoCollectionsMap(new Map());
// // //     }
// // //   };

// // //   // Load excluded products map (/api/show-excluded-products)
// // //   const loadExcludedProducts = async () => {
// // //     try {
// // //       const response = await fetch("/api/show-excluded-products");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         const map = data.videoExcludeds.reduce((m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))), new Map());
// // //         setExcludedMap(map);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load excluded products: ${data.error || "Unknown error"}`, status: "critical" });
// // //         setExcludedMap(new Map());
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to load excluded products:", error);
// // //       setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
// // //       setExcludedMap(new Map());
// // //     }
// // //   };

// // //   // Delete product from video (direct)
// // //   const deleteVideoProduct = async (videoId, productId) => {
// // //     try {
// // //       const response = await fetch("/api/delete-video-product", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ videoId, productId })
// // //       });
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setVideoProductsMap(prev => {
// // //           const newMap = new Map(prev);
// // //           const products = newMap.get(videoId) || [];
// // //           newMap.set(videoId, products.filter(p => p.id !== productId));
// // //           return newMap;
// // //         });
// // //         setMessage({ text: "✅ Product removed from video", status: "success" });
// // //       } else {
// // //         setMessage({ text: `❌ Failed to remove product: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       setMessage({ text: `❌ Error removing product: ${error.message}`, status: "critical" });
// // //     }
// // //   };

// // //   // Delete collection from video
// // //   const deleteVideoCollection = async (videoId, collectionLocalId) => {
// // //     try {
// // //       const response = await fetch("/api/delete-video-collection", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ videoId, collectionId: collectionLocalId })
// // //       });
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setVideoCollectionsMap(prev => {
// // //           const newMap = new Map(prev);
// // //           const colls = newMap.get(videoId) || [];
// // //           newMap.set(videoId, colls.filter(c => c.id !== collectionLocalId));
// // //           return newMap;
// // //         });
// // //         setMessage({ text: "✅ Collection removed from video", status: "success" });
// // //       } else {
// // //         setMessage({ text: `❌ Failed to remove collection: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       setMessage({ text: `❌ Error removing collection: ${error.message}`, status: "critical" });
// // //     }
// // //   };

// // //   // Exclude product from video (for collections)
// // //   const excludeProduct = async (videoId, productId) => {
// // //     try {
// // //       const response = await fetch("/api/exclude-product", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ videoId, productId })
// // //       });
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setExcludedMap(prev => {
// // //           const newMap = new Map(prev);
// // //           const ex = new Set(newMap.get(videoId) || []);
// // //           ex.add(productId);
// // //           newMap.set(videoId, ex);
// // //           return newMap;
// // //         });
// // //         setMessage({ text: "✅ Product excluded from video", status: "success" });
// // //       } else {
// // //         setMessage({ text: `❌ Failed to exclude product: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       setMessage({ text: `❌ Error excluding product: ${error.message}`, status: "critical" });
// // //     }
// // //   };

// // //   // Compute effective products for a video
// // //   const getEffectiveProducts = (videoId) => {
// // //     const direct = videoProductsMap.get(videoId) || [];
// // //     const colls = videoCollectionsMap.get(videoId) || [];
// // //     const collProds = colls.flatMap(c => {
// // //       const prods = collectionProducts.get(c.shopify_collection_id) || [];
// // //       return prods.filter(p => !(excludedMap.get(videoId)?.has(p.id) || false));
// // //     });
// // //     const allProds = [...direct, ...collProds];
// // //     const unique = new Map(allProds.map(p => [p.id, p]));
// // //     return Array.from(unique.values());
// // //   };

// // //   // Handle file drop
// // //   const handleDrop = useCallback((acceptedFiles) => {
// // //     const selectedFile = acceptedFiles[0];
// // //     if (!selectedFile) return;

// // //     if (selectedFile.size > 100 * 1024 * 1024) {
// // //       setMessage({ text: "❌ File size must be less than 100MB", status: "critical" });
// // //       return;
// // //     }

// // //     const validTypes = [
// // //       "image/jpeg",
// // //       "image/png",
// // //       "image/gif",
// // //       "image/webp",
// // //       "video/mp4",
// // //       "video/quicktime",
// // //     ];
// // //     if (!validTypes.includes(selectedFile.type)) {
// // //       setMessage({ text: "❌ Please select a valid image or video file", status: "critical" });
// // //       return;
// // //     }

// // //     setFile(selectedFile);
// // //     setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
// // //     setMessage({ text: "", status: "" });
// // //   }, []);

// // //   const handleTitleChange = useCallback((value) => setTitle(value), []);

// // //   // Product selection for upload
// // //   const productOptions = products.map((p) => ({
// // //     label: p.title,
// // //     value: String(p.id),
// // //   }));

// // //   const collectionOptions = collections.map((c) => ({
// // //     label: c.title,
// // //     value: String(c.id),
// // //   }));

// // //   const handleProductSelect = useCallback(
// // //     (productId) => {
// // //       const product = products.find((p) => String(p.id) === String(productId));
// // //       if (product && !selectedProducts.find((p) => p.id === product.id)) {
// // //         setSelectedProducts((prev) => [...prev, product]);
// // //       }
// // //     },
// // //     [products, selectedProducts]
// // //   );

// // //   const handleCollectionSelect = useCallback(
// // //     (collectionId) => {
// // //       const collection = collections.find((c) => String(c.id) === String(collectionId));
// // //       if (collection && !selectedCollections.find((c) => c.id === collection.id)) {
// // //         setSelectedCollections((prev) => [...prev, collection]);
// // //       }
// // //     },
// // //     [collections, selectedCollections]
// // //   );

// // //   const removeProduct = useCallback(
// // //     (productId) =>
// // //       setSelectedProducts((prev) =>
// // //         prev.filter((p) => p.id !== productId)
// // //       ),
// // //     []
// // //   );

// // //   const removeCollection = useCallback(
// // //     (collectionId) =>
// // //       setSelectedCollections((prev) =>
// // //         prev.filter((c) => c.id !== collectionId)
// // //       ),
// // //     []
// // //   );

// // //   // Handle select all videos
// // //   const handleSelectAll = useCallback(() => {
// // //     if (selectedVideos.length === videos.length) {
// // //       setSelectedVideos([]);
// // //     } else {
// // //       setSelectedVideos(videos.map(v => v.id));
// // //     }
// // //   }, [videos, selectedVideos.length]);

// // //   // Handle individual video selection
// // //   const handleVideoSelect = useCallback((videoId, checked) => {
// // //     setSelectedVideos(prev => 
// // //       checked 
// // //         ? [...prev, videoId]
// // //         : prev.filter(id => id !== videoId)
// // //     );
// // //   }, []);

// // //   // Open delete modal
// // //   const openDeleteModal = () => {
// // //     if (selectedVideos.length === 0) {
// // //       setMessage({ text: "⚠️ Please select at least one video to delete", status: "warning" });
// // //       return;
// // //     }
// // //     setDeleteModalOpen(true);
// // //   };

// // //   // Close delete modal
// // //   const closeDeleteModal = () => {
// // //     setDeleteModalOpen(false);
// // //   };

// // //   // Delete selected videos
// // //   const deleteSelectedVideos = async () => {
// // //     setDeleting(true);
// // //     try {
// // //       const response = await fetch("/api/delete-videos", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ videoIds: selectedVideos }),
// // //       });

// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
// // //         setSelectedVideos([]);
// // //         setMessage({ text: `✅ Successfully deleted ${data.deletedCount} video(s)`, status: "success" });
// // //         closeDeleteModal();
// // //       } else {
// // //         setMessage({ text: `❌ Failed to delete videos: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       console.error("Delete error:", error);
// // //       setMessage({ text: `❌ Failed to delete videos: ${error.message}`, status: "critical" });
// // //     } finally {
// // //       setDeleting(false);
// // //     }
// // //   };

// // //   const ProductCarousel = ({ products, videoId, onDelete, type }) => {
// // //     if (!products || products.length === 0) return null;
  
// // //     return (
// // //       <Box
// // //         padding="200"
// // //         background="bg-surface-secondary"
// // //         borderRadius="200"
// // //         marginTop="200"
// // //       >
// // //         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// // //           {type === 'collection' ? 'Products from Collections' : 'Effective Products'} ({products.length})
// // //         </Text>
// // //         <div style={{
// // //           display: 'flex',
// // //           gap: '12px',
// // //           overflowX: 'auto',
// // //           padding: '8px 4px',
// // //           scrollbarWidth: 'thin',
// // //         }}>
// // //           {products.map((product) => (
// // //             <Box
// // //               key={product.id || Math.random()}
// // //               position="relative"
// // //               padding="150"
// // //               background="bg-surface"
// // //               borderRadius="150"
// // //               minWidth="100px"
// // //               maxWidth="120px"
// // //               style={{
// // //                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
// // //                 border: '1px solid #e1e3e5',
// // //               }}
// // //             >
// // //               {onDelete && (
// // //                 <Box position="absolute" top="4px" right="4px">
// // //                   <Button
// // //                     size="slim"
// // //                     icon={<Icon source="CancelSmallMinor" />}
// // //                     onClick={() => onDelete(videoId, product.id)}
// // //                     destructive
// // //                     plain
// // //                   />
// // //                 </Box>
// // //               )}
// // //               <BlockStack gap="100" align="center">
// // //                 {product.image_url ? (
// // //                   <Thumbnail
// // //                     source={product.image_url}
// // //                     alt={product.title}
// // //                     size="small"
// // //                   />
// // //                 ) : (
// // //                   <Box
// // //                     background="bg-surface-secondary"
// // //                     padding="200"
// // //                     borderRadius="100"
// // //                     minHeight="50px"
// // //                     minWidth="50px"
// // //                     display="flex"
// // //                     alignItems="center"
// // //                     justifyContent="center"
// // //                   >
// // //                     <Icon source="ProductMajor" tone="subdued" />
// // //                   </Box>
// // //                 )}
// // //                 <Text variant="bodySm" alignment="center" truncate>
// // //                   {product.title || 'Untitled Product'}
// // //                 </Text>
// // //                 <Text variant="bodySm" fontWeight="bold" tone="success">
// // //                   {product.price || '0.00'} {product.currency_code || ''}
// // //                 </Text>
// // //               </BlockStack>
// // //             </Box>
// // //           ))}
// // //         </div>
// // //       </Box>
// // //     );
// // //   };

// // //   const CollectionsSection = ({ collections, videoId }) => {
// // //     if (!collections || collections.length === 0) return null;

// // //     return (
// // //       <Box
// // //         padding="200"
// // //         background="bg-surface-secondary"
// // //         borderRadius="200"
// // //         marginTop="200"
// // //       >
// // //         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// // //           Associated Collections ({collections.length})
// // //         </Text>
// // //         <BlockStack gap="200">
// // //           {collections.map((collection) => {
// // //             const prods = (collectionProducts.get(collection.shopify_collection_id) || []).filter(
// // //               p => !(excludedMap.get(videoId)?.has(p.id) || false)
// // //             );
// // //             return (
// // //               <Card key={collection.id} padding="200">
// // //                 <InlineStack align="space-between" blockAlign="center">
// // //                   <InlineStack gap="200" blockAlign="center">
// // //                     {collection.image_url ? (
// // //                       <Thumbnail source={collection.image_url} alt={collection.title} size="small" />
// // //                     ) : (
// // //                       <Icon source="CollectionMajor" tone="subdued" />
// // //                     )}
// // //                     <Text variant="bodyMd" fontWeight="medium">
// // //                       {collection.title}
// // //                     </Text>
// // //                   </InlineStack>
// // //                   <Button
// // //                     destructive
// // //                     plain
// // //                     icon={<Icon source="DeleteMinor" />}
// // //                     onClick={() => deleteVideoCollection(videoId, collection.id)}
// // //                   >
// // //                     Remove Collection
// // //                   </Button>
// // //                 </InlineStack>
// // //                 <ProductCarousel
// // //                   products={prods}
// // //                   videoId={videoId}
// // //                   onDelete={excludeProduct}
// // //                   type="collection"
// // //                 />
// // //               </Card>
// // //             );
// // //           })}
// // //         </BlockStack>
// // //       </Box>
// // //     );
// // //   };

// // //   const openProductModal = async (video) => {
// // //     try {
// // //       setSelectedVideo(video);
// // //       setProductModalOpen(true);
// // //       setProductsLoading(true);

// // //       const response = await fetch("/api/viewproducts");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setProducts(data.products || []);
// // //         const currentProductIds = (videoProductsMap.get(video.id) || []).map(p => String(p.id));
// // //         setTempSelectedProducts(currentProductIds);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load products: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error opening product modal:", error);
// // //       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
// // //     } finally {
// // //       setProductsLoading(false);
// // //     }
// // //   };

// // //   const closeProductModal = () => {
// // //     setProductModalOpen(false);
// // //     setSelectedVideo(null);
// // //     setTempSelectedProducts([]);
// // //   };

// // //   const handleTempProductSelect = useCallback((productIds) => {
// // //     setTempSelectedProducts(productIds);
// // //   }, []);

// // //   const updateVideoProducts = async () => {
// // //     if (!selectedVideo) return;

// // //     setUpdatingProducts(true);
// // //     try {
// // //       const response = await fetch("/api/saveproducts-database", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           videoId: selectedVideo.id,
// // //           productIds: tempSelectedProducts
// // //         }),
// // //       });

// // //       const data = await response.json();
      
// // //       if (data.success) {
// // //         setVideoProductsMap(prev => {
// // //           const newMap = new Map(prev);
// // //           newMap.set(selectedVideo.id, data.video.products || []);
// // //           return newMap;
// // //         });
// // //         setMessage({ text: "✅ Products updated successfully!", status: "success" });
// // //         closeProductModal();
// // //       } else {
// // //         setMessage({ text: `❌ Failed to update products: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       setMessage({ text: `❌ Failed to update products: ${error.message}`, status: "critical" });
// // //     } finally {
// // //       setUpdatingProducts(false);
// // //     }
// // //   };

// // //   const openCollectionModal = async (video) => {
// // //     try {
// // //       setSelectedVideo(video);
// // //       setCollectionModalOpen(true);
// // //       setCollectionsLoading(true);

// // //       const response = await fetch("/api/viewcollections");
// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setCollections(data.collections || []);
// // //         const currentCollectionIds = (videoCollectionsMap.get(video.id) || []).map(c => String(c.shopify_collection_id));
// // //         setTempSelectedCollections(currentCollectionIds);
// // //       } else {
// // //         setMessage({ text: `❌ Failed to load collections: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error opening collection modal:", error);
// // //       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
// // //     } finally {
// // //       setCollectionsLoading(false);
// // //     }
// // //   };

// // //   const closeCollectionModal = () => {
// // //     setCollectionModalOpen(false);
// // //     setSelectedVideo(null);
// // //     setTempSelectedCollections([]);
// // //   };

// // //   const handleTempCollectionSelect = useCallback((collectionIds) => {
// // //     setTempSelectedCollections(collectionIds);
// // //   }, []);

// // //   const updateVideoCollections = async () => {
// // //     if (!selectedVideo) return;

// // //     setUpdatingCollections(true);
// // //     try {
// // //       const response = await fetch("/api/savecollections-database", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           videoId: selectedVideo.id,
// // //           collectionIds: tempSelectedCollections
// // //         }),
// // //       });

// // //       const data = await response.json();
      
// // //       if (data.success) {
// // //         setVideoCollectionsMap(prev => {
// // //           const newMap = new Map(prev);
// // //           newMap.set(selectedVideo.id, data.video.collections || []);
// // //           return newMap;
// // //         });
// // //         setMessage({ text: "✅ Collections updated successfully!", status: "success" });
// // //         closeCollectionModal();
// // //       } else {
// // //         setMessage({ text: `❌ Failed to update collections: ${data.error}`, status: "critical" });
// // //       }
// // //     } catch (error) {
// // //       setMessage({ text: `❌ Failed to update collections: ${error.message}`, status: "critical" });
// // //     } finally {
// // //       setUpdatingCollections(false);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!file) {
// // //       setMessage({ text: "⚠️ Please select a file first!", status: "warning" });
// // //       return;
// // //     }

// // //     setIsUploading(true);
// // //     setMessage({ text: "⏳ Preparing upload...", status: "info" });

// // //     try {
// // //       // 1️⃣ Get staged upload target from server
// // //       const initBody = {
// // //         fileName: file.name,
// // //         fileSize: file.size,
// // //         fileType: file.type,
// // //         title,
// // //       };
// // //       const initRes = await fetch("/api/upload/init", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(initBody),
// // //       });

// // //       const initData = await initRes.json();
// // //       if (!initRes.ok || !initData.success) {
// // //         throw new Error(initData.error || "Failed to get upload target");
// // //       }

// // //       const { target, resourceType } = initData;
// // //       setMessage({ text: "⏳ Uploading file to Shopify storage...", status: "info" });

// // //       // 2️⃣ Upload file directly to Shopify S3
// // //       const s3Form = new FormData();
// // //       (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
// // //       s3Form.append("file", file, file.name);

// // //       const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
// // //       if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

// // //       // 3️⃣ Finalize & save metadata to DB
// // //       setMessage({ text: "⏳ Finalizing upload with Shopify...", status: "info" });

// // //       const finalizeRes = await fetch("/api/upload/complete", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           resourceUrl: target.resourceUrl,
// // //           title,
// // //           resourceType,
// // //           selectedProducts: selectedProducts.map((p) => String(p.id)),
// // //           selectedCollections: selectedCollections.map((c) => String(c.id)),
// // //         }),
// // //       });

// // //       const finalizeData = await finalizeRes.json();
      
// // //       if (!finalizeRes.ok || !finalizeData.success) {
// // //         throw new Error(finalizeData.error || "Failed to finalize upload");
// // //       }

// // //       setMessage({ text: "✅ File uploaded successfully!", status: "success" });
// // //       setFile(null);
// // //       setTitle("");
// // //       setSelectedProducts([]);
// // //       setSelectedCollections([]);
      
// // //       // Reload data
// // //       setTimeout(() => {
// // //         loadVideos();
// // //         loadVideoProducts();
// // //         loadVideoCollections();
// // //         loadExcludedProducts();
// // //       }, 1000);
      
// // //     } catch (err) {
// // //       const errorMsg =
// // //         err.name === "AbortError"
// // //           ? "❌ Upload timed out. Please try again."
// // //           : `❌ Upload failed: ${err.message}`;
// // //       setMessage({ text: errorMsg, status: "critical" });
// // //     } finally {
// // //       setIsUploading(false);
// // //     }
// // //   };

// // //   const removeFile = useCallback(() => {
// // //     setFile(null);
// // //     setTitle("");
// // //     setMessage({ text: "", status: "" });
// // //   }, []);

// // //   // Video Player Component
// // //   const VideoPlayer = ({ video }) => {
// // //     const videoRef = useRef(null);
// // //     const [isPlaying, setIsPlaying] = useState(false);
// // //     const [showControls, setShowControls] = useState(false);
// // //     const [isMuted, setIsMuted] = useState(true);

// // //     // Auto-play video when component mounts
// // //     useEffect(() => {
// // //       if (videoRef.current && video.shopify_file_url) {
// // //         const playVideo = async () => {
// // //           try {
// // //             videoRef.current.loop = true;
// // //             videoRef.current.muted = true;
// // //             await videoRef.current.play();
// // //             setIsPlaying(true);
// // //           } catch (error) {
// // //             console.log("Auto-play failed, waiting for user interaction");
// // //           }
// // //         };
        
// // //         playVideo();
// // //       }
// // //     }, [video.shopify_file_url]);

// // //     const togglePlay = () => {
// // //       if (videoRef.current) {
// // //         if (isPlaying) {
// // //           videoRef.current.pause();
// // //         } else {
// // //           videoRef.current.play();
// // //         }
// // //         setIsPlaying(!isPlaying);
// // //       }
// // //     };

// // //     const toggleMute = (e) => {
// // //       e.stopPropagation();
// // //       if (videoRef.current) {
// // //         videoRef.current.muted = !videoRef.current.muted;
// // //         setIsMuted(!isMuted);
// // //       }
// // //     };

// // //     const handleMouseEnter = () => {
// // //       setShowControls(true);
// // //     };

// // //     const handleMouseLeave = () => {
// // //       setShowControls(false);
// // //     };

// // //     const handleVideoClick = () => {
// // //       togglePlay();
// // //     };

// // //     if (!video.shopify_file_url) {
// // //       return (
// // //         <Box
// // //           background="bg-surface-secondary"
// // //           padding="400"
// // //           width="100%"
// // //           height="180px"
// // //           display="flex"
// // //           alignItems="center"
// // //           justifyContent="center"
// // //           borderRadius="200"
// // //         >
// // //           <Text tone="subdued" alignment="center">
// // //             🎬<br />No Video URL
// // //           </Text>
// // //         </Box>
// // //       );
// // //     }

// // //     return (
// // //       <Box
// // //         position="relative"
// // //         width="100%"
// // //         height="180px"
// // //         maxWidth="240px"
// // //         margin="0 auto"
// // //         overflow="hidden"
// // //         borderRadius="200"
// // //         onMouseEnter={handleMouseEnter}
// // //         onMouseLeave={handleMouseLeave}
// // //         onClick={handleVideoClick}
// // //         style={{ cursor: 'pointer' }}
// // //       >
// // //         <video
// // //           ref={videoRef}
// // //           src={video.shopify_file_url}
// // //           style={{
// // //             width: '100%',
// // //             height: '100%',
// // //             objectFit: 'cover',
// // //             borderRadius: '8px',
// // //             backgroundColor: '#000'
// // //           }}
// // //           muted={isMuted}
// // //           loop
// // //           playsInline
// // //           preload="auto"
// // //         />
        
// // //         {/* Controls Container - Top Right Corner */}
// // //         {showControls && (
// // //           <Box position="absolute" top="8px" right="8px">
// // //             <InlineStack gap="100" align="center">
// // //               <Badge tone={isPlaying ? "success" : "subdued"} size="small">
// // //                 {isPlaying ? "🔴 Live" : "⏸️ Paused"}
// // //               </Badge>
// // //               <Button
// // //                 size="slim"
// // //                 variant="primary"
// // //                 onClick={toggleMute}
// // //                 icon={isMuted ? <Icon source="MuteMinor" /> : <Icon source="SoundMajor" />}
// // //               />
// // //             </InlineStack>
// // //           </Box>
// // //         )}
// // //       </Box>
// // //     );
// // //   };

// // //   return (
// // //     <Page
// // //       title="Video Carousel Manager"
// // //       primaryAction={{
// // //         content: "Refresh Videos",
// // //         onAction: () => {
// // //           loadVideos();
// // //           loadVideoProducts();
// // //           loadVideoCollections();
// // //           loadExcludedProducts();
// // //         },
// // //         disabled: isUploading
// // //       }}
// // //     >
// // //       {/* Delete Confirmation Modal */}
// // //       <Modal
// // //         open={deleteModalOpen}
// // //         onClose={closeDeleteModal}
// // //         title="Delete Videos"
// // //         primaryAction={{
// // //           content: "Delete Videos",
// // //           onAction: deleteSelectedVideos,
// // //           loading: deleting,
// // //           destructive: true,
// // //         }}
// // //         secondaryActions={[
// // //           {
// // //             content: "Cancel",
// // //             onAction: closeDeleteModal,
// // //           },
// // //         ]}
// // //       >
// // //         <Modal.Section>
// // //           <BlockStack gap="400">
// // //             <Text variant="bodyMd" as="p">
// // //               Are you sure you want to delete {selectedVideos.length} selected video(s)? This action cannot be undone.
// // //             </Text>
// // //             <Text variant="bodySm" tone="subdued">
// // //               All associated product and collection links will also be removed.
// // //             </Text>
// // //           </BlockStack>
// // //         </Modal.Section>
// // //       </Modal>

// // //       {/* Product Selection Modal */}
// // //       <Modal
// // //         open={productModalOpen}
// // //         onClose={closeProductModal}
// // //         title={`Select Products for "${selectedVideo?.title}"`}
// // //         primaryAction={{
// // //           content: "Save Products",
// // //           onAction: updateVideoProducts,
// // //           loading: updatingProducts,
// // //         }}
// // //         secondaryActions={[
// // //           {
// // //             content: "Cancel",
// // //             onAction: closeProductModal,
// // //           },
// // //         ]}
// // //         size="large"
// // //       >
// // //         <Modal.Section>
// // //           <BlockStack gap="400">
// // //             <Text variant="bodyMd" tone="subdued">
// // //               Choose products from your store to associate with this video.
// // //             </Text>
            
// // //             {productsLoading ? (
// // //               <Box padding="400" alignment="center">
// // //                 <Spinner size="small" />
// // //                 <Text variant="bodySm" tone="subdued">Loading products...</Text>
// // //               </Box>
// // //             ) : products.length === 0 ? (
// // //               <EmptyState heading="No products available">
// // //                 <Text variant="bodyMd" as="p">
// // //                   No products found in your store.
// // //                 </Text>
// // //               </EmptyState>
// // //             ) : (
// // //               <Box>
// // //                 <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// // //                   All Products ({products.length}):
// // //                 </Text>
// // //                 <div style={{
// // //                   maxHeight: '400px',
// // //                   overflowY: 'auto',
// // //                   border: '1px solid var(--p-border-subdued)',
// // //                   borderRadius: '8px',
// // //                   padding: '12px'
// // //                 }}>
// // //                   <BlockStack gap="200">
// // //                     {products.map((product) => (
// // //                       <Card
// // //                         key={product.id}
// // //                         padding="200"
// // //                         style={{
// // //                           border: tempSelectedProducts.includes(String(product.id))
// // //                             ? '2px solid var(--p-border-success)'
// // //                             : '1px solid var(--p-border-subdued)',
// // //                           background: tempSelectedProducts.includes(String(product.id))
// // //                             ? 'var(--p-surface-success-subdued)'
// // //                             : 'var(--p-surface)',
// // //                         }}
// // //                       >
// // //                         <InlineStack gap="200" blockAlign="center">
// // //                           <Checkbox
// // //                             label=""
// // //                             labelHidden
// // //                             checked={tempSelectedProducts.includes(String(product.id))}
// // //                             onChange={(checked) => {
// // //                               const productId = String(product.id);
// // //                               setTempSelectedProducts((prev) =>
// // //                                 checked
// // //                                   ? [...prev, productId]
// // //                                   : prev.filter((id) => id !== productId)
// // //                               );
// // //                             }}
// // //                             disabled={updatingProducts}
// // //                           />
// // //                           {product.image_url ? (
// // //                             <Thumbnail
// // //                               source={product.image_url}
// // //                               alt={product.title}
// // //                               size="small"
// // //                             />
// // //                           ) : (
// // //                             <Box
// // //                               background="bg-surface-secondary"
// // //                               padding="200"
// // //                               borderRadius="100"
// // //                               minHeight="40px"
// // //                               minWidth="40px"
// // //                               display="flex"
// // //                               alignItems="center"
// // //                               justifyContent="center"
// // //                             >
// // //                               <Icon source="ProductMajor" tone="subdued" />
// // //                             </Box>
// // //                           )}
// // //                           <BlockStack gap="050">
// // //                             <Text variant="bodySm" fontWeight="medium" truncate>
// // //                               {product.title || 'Untitled Product'}
// // //                             </Text>
// // //                             <Text variant="bodySm" tone="subdued">
// // //                               {product.price || '0.00'} {product.currency_code || ''}
// // //                             </Text>
// // //                           </BlockStack>
// // //                         </InlineStack>
// // //                       </Card>
// // //                     ))}
// // //                   </BlockStack>
// // //                 </div>
// // //                 <Text variant="bodySm" tone="subdued" marginTop="200">
// // //                   {tempSelectedProducts.length} product(s) selected
// // //                 </Text>
// // //               </Box>
// // //             )}
// // //           </BlockStack>
// // //         </Modal.Section>
// // //       </Modal>

// // //       {/* Collection Selection Modal */}
// // //       <Modal
// // //         open={collectionModalOpen}
// // //         onClose={closeCollectionModal}
// // //         title={`Select Collections for "${selectedVideo?.title}"`}
// // //         primaryAction={{
// // //           content: "Save Collections",
// // //           onAction: updateVideoCollections,
// // //           loading: updatingCollections,
// // //         }}
// // //         secondaryActions={[
// // //           {
// // //             content: "Cancel",
// // //             onAction: closeCollectionModal,
// // //           },
// // //         ]}
// // //         size="large"
// // //       >
// // //         <Modal.Section>
// // //           <BlockStack gap="400">
// // //             <Text variant="bodyMd" tone="subdued">
// // //               Choose collections from your store to associate with this video.
// // //             </Text>
            
// // //             {collectionsLoading ? (
// // //               <Box padding="400" alignment="center">
// // //                 <Spinner size="small" />
// // //                 <Text variant="bodySm" tone="subdued">Loading collections...</Text>
// // //               </Box>
// // //             ) : collections.length === 0 ? (
// // //               <EmptyState heading="No collections available">
// // //                 <Text variant="bodyMd" as="p">
// // //                   No collections found in your store.
// // //                 </Text>
// // //               </EmptyState>
// // //             ) : (
// // //               <Box>
// // //                 <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// // //                   All Collections ({collections.length}):
// // //                 </Text>
// // //                 <div style={{
// // //                   maxHeight: '400px',
// // //                   overflowY: 'auto',
// // //                   border: '1px solid var(--p-border-subdued)',
// // //                   borderRadius: '8px',
// // //                   padding: '12px'
// // //                 }}>
// // //                   <BlockStack gap="200">
// // //                     {collections.map((collection) => (
// // //                       <Card
// // //                         key={collection.id}
// // //                         padding="200"
// // //                         style={{
// // //                           border: tempSelectedCollections.includes(String(collection.id))
// // //                             ? '2px solid var(--p-border-success)'
// // //                             : '1px solid var(--p-border-subdued)',
// // //                           background: tempSelectedCollections.includes(String(collection.id))
// // //                             ? 'var(--p-surface-success-subdued)'
// // //                             : 'var(--p-surface)',
// // //                         }}
// // //                       >
// // //                         <InlineStack gap="200" blockAlign="center">
// // //                           <Checkbox
// // //                             label=""
// // //                             labelHidden
// // //                             checked={tempSelectedCollections.includes(String(collection.id))}
// // //                             onChange={(checked) => {
// // //                               const collectionId = String(collection.id);
// // //                               setTempSelectedCollections((prev) =>
// // //                                 checked
// // //                                   ? [...prev, collectionId]
// // //                                   : prev.filter((id) => id !== collectionId)
// // //                               );
// // //                             }}
// // //                             disabled={updatingCollections}
// // //                           />
// // //                           {collection.image_url ? (
// // //                             <Thumbnail
// // //                               source={collection.image_url}
// // //                               alt={collection.title}
// // //                               size="small"
// // //                             />
// // //                           ) : (
// // //                             <Box
// // //                               background="bg-surface-secondary"
// // //                               padding="200"
// // //                               borderRadius="100"
// // //                               minHeight="40px"
// // //                               minWidth="40px"
// // //                               display="flex"
// // //                               alignItems="center"
// // //                               justifyContent="center"
// // //                             >
// // //                               <Icon source="CollectionMajor" tone="subdued" />
// // //                             </Box>
// // //                           )}
// // //                           <Text variant="bodySm" fontWeight="medium" truncate>
// // //                             {collection.title || 'Untitled Collection'}
// // //                           </Text>
// // //                         </InlineStack>
// // //                       </Card>
// // //                     ))}
// // //                   </BlockStack>
// // //                 </div>
// // //                 <Text variant="bodySm" tone="subdued" marginTop="200">
// // //                   {tempSelectedCollections.length} collection(s) selected
// // //                 </Text>
// // //               </Box>
// // //             )}
// // //           </BlockStack>
// // //         </Modal.Section>
// // //       </Modal>

// // //       <Layout>
// // //         {/* Upload Section */}
// // //         <Layout.Section>
// // //           <Card>
// // //             <BlockStack gap="400">
// // //               <Text variant="headingLg" as="h2">Upload New Video</Text>
              
// // //               {message.text && (
// // //                 <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
// // //                   {message.text}
// // //                 </Banner>
// // //               )}

// // //               <form onSubmit={handleSubmit}>
// // //                 <FormLayout>
// // //                   {!file ? (
// // //                     <DropZone
// // //                       onDrop={handleDrop}
// // //                       accept="image/*,video/*"
// // //                       type="file"
// // //                       label="Media file"
// // //                       disabled={isUploading}
// // //                     >
// // //                       <DropZone.FileUpload />
// // //                     </DropZone>
// // //                   ) : (
// // //                     <BlockStack gap="200">
// // //                       <InlineStack gap="200" align="center" blockAlign="center">
// // //                         <Thumbnail
// // //                           source={file.type.startsWith("image") ? URL.createObjectURL(file) : ""}
// // //                           alt={file.name}
// // //                           size="small"
// // //                         />
// // //                         <BlockStack gap="100">
// // //                           <Text variant="bodyMd" as="p" fontWeight="medium">
// // //                             {file.name}
// // //                           </Text>
// // //                           <Text variant="bodySm" as="p" tone="subdued">
// // //                             {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
// // //                           </Text>
// // //                         </BlockStack>
// // //                         <Button onClick={removeFile} disabled={isUploading}>
// // //                           Remove
// // //                         </Button>
// // //                       </InlineStack>
// // //                     </BlockStack>
// // //                   )}

// // //                   <TextField
// // //                     label="Title"
// // //                     value={title}
// // //                     onChange={handleTitleChange}
// // //                     autoComplete="off"
// // //                     disabled={isUploading}
// // //                     helpText="A descriptive title for your video"
// // //                   />

// // //                   <Select
// // //                     label="Add Products to Video"
// // //                     options={productOptions}
// // //                     onChange={handleProductSelect}
// // //                     disabled={isUploading}
// // //                     placeholder="Select products to associate with this video"
// // //                   />

// // //                   {selectedProducts.length > 0 && (
// // //                     <BlockStack gap="200">
// // //                       <Text variant="bodyMd" fontWeight="semibold">
// // //                         Selected Products ({selectedProducts.length})
// // //                       </Text>
// // //                       <List>
// // //                         {selectedProducts.map((product) => (
// // //                           <List.Item key={product.id}>
// // //                             <InlineStack align="space-between" blockAlign="center">
// // //                               <Text>{product.title}</Text>
// // //                               <Button
// // //                                 destructive
// // //                                 size="slim"
// // //                                 onClick={() => removeProduct(product.id)}
// // //                                 disabled={isUploading}
// // //                               >
// // //                                 Remove
// // //                               </Button>
// // //                             </InlineStack>
// // //                           </List.Item>
// // //                         ))}
// // //                       </List>
// // //                     </BlockStack>
// // //                   )}

// // //                   <Select
// // //                     label="Add Collections to Video"
// // //                     options={collectionOptions}
// // //                     onChange={handleCollectionSelect}
// // //                     disabled={isUploading}
// // //                     placeholder="Select collections to associate with this video"
// // //                   />

// // //                   {selectedCollections.length > 0 && (
// // //                     <BlockStack gap="200">
// // //                       <Text variant="bodyMd" fontWeight="semibold">
// // //                         Selected Collections ({selectedCollections.length})
// // //                       </Text>
// // //                       <List>
// // //                         {selectedCollections.map((collection) => (
// // //                           <List.Item key={collection.id}>
// // //                             <InlineStack align="space-between" blockAlign="center">
// // //                               <Text>{collection.title}</Text>
// // //                               <Button
// // //                                 destructive
// // //                                 size="slim"
// // //                                 onClick={() => removeCollection(collection.id)}
// // //                                 disabled={isUploading}
// // //                               >
// // //                                 Remove
// // //                               </Button>
// // //                             </InlineStack>
// // //                           </List.Item>
// // //                         ))}
// // //                       </List>
// // //                     </BlockStack>
// // //                   )}

// // //                   <Button 
// // //                     primary 
// // //                     submit 
// // //                     loading={isUploading} 
// // //                     disabled={!file || isUploading}
// // //                     size="large"
// // //                   >
// // //                     {isUploading ? "Uploading..." : "Upload Video"}
// // //                   </Button>
// // //                 </FormLayout>
// // //               </form>
// // //             </BlockStack>
// // //           </Card>
// // //         </Layout.Section>

// // //         {/* Uploaded Videos Section */}
// // //         <Layout.Section>
// // //           <Card>
// // //             <BlockStack gap="400">
// // //               <InlineStack align="space-between" blockAlign="center">
// // //                 <Text variant="headingLg" as="h2">
// // //                   Your Videos ({videos.length})
// // //                 </Text>
// // //                 <InlineStack gap="200">
// // //                   {selectedVideos.length > 0 && (
// // //                     <Button 
// // //                       destructive 
// // //                       onClick={openDeleteModal}
// // //                       disabled={loading}
// // //                       icon={<Icon source="DeleteMinor" />}
// // //                     >
// // //                       Delete Selected ({selectedVideos.length})
// // //                     </Button>
// // //                   )}
// // //                   <Button 
// // //                     onClick={() => {
// // //                       loadVideos();
// // //                       loadVideoProducts();
// // //                       loadVideoCollections();
// // //                       loadExcludedProducts();
// // //                     }} 
// // //                     disabled={loading}
// // //                   >
// // //                     Refresh
// // //                   </Button>
// // //                 </InlineStack>
// // //               </InlineStack>

// // //               {loading ? (
// // //                 <Box padding="800" alignment="center">
// // //                   <Spinner accessibilityLabel="Loading videos" size="large" />
// // //                   <Text alignment="center" tone="subdued" variant="bodyMd">
// // //                     Loading your videos...
// // //                   </Text>
// // //                 </Box>
// // //               ) : videos.length === 0 ? (
// // //                 <EmptyState
// // //                   heading="No videos yet"
// // //                   image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
// // //                 >
// // //                   <Text variant="bodyMd" as="p">
// // //                     Upload your first video to get started.
// // //                   </Text>
// // //                 </EmptyState>
// // //               ) : (
// // //                 <div style={{
// // //                   display: 'flex',
// // //                   flexWrap: 'wrap',
// // //                   gap: '20px',
// // //                   justifyContent: 'flex-start'
// // //                 }}>
// // //                   {/* Select All Checkbox */}
// // //                   <div style={{ 
// // //                     width: '100%', 
// // //                     padding: '12px 16px',
// // //                     background: 'var(--p-surface-subdued)',
// // //                     borderRadius: '8px',
// // //                     border: '1px solid var(--p-border-subdued)'
// // //                   }}>
// // //                     <Checkbox
// // //                       label={`Select all ${videos.length} videos`}
// // //                       checked={selectedVideos.length === videos.length && videos.length > 0}
// // //                       onChange={handleSelectAll}
// // //                     />
// // //                   </div>

// // //                   {videos.map((video) => {
// // //                     const effectiveProducts = getEffectiveProducts(video.id);
// // //                     const collections = videoCollectionsMap.get(video.id) || [];

// // //                     return (
// // //                       <div key={video.id} style={{
// // //                         flex: '0 0 calc(33.333% - 13.33px)',
// // //                         minWidth: '280px',
// // //                         boxSizing: 'border-box',
// // //                         position: 'relative'
// // //                       }}>
// // //                         <Card 
// // //                           padding="300"
// // //                           style={{
// // //                             border: selectedVideos.includes(video.id) 
// // //                               ? '2px solid var(--p-border-critical)' 
// // //                               : '1px solid var(--p-border-subdued)',
// // //                             transition: 'all 0.2s ease',
// // //                             background: selectedVideos.includes(video.id)
// // //                               ? 'var(--p-surface-critical-subdued)'
// // //                               : 'var(--p-surface)'
// // //                           }}
// // //                         >
// // //                           <BlockStack gap="300">
// // //                             {/* Video Selection Checkbox */}
// // //                             <Box position="absolute" top="12px" left="12px" zIndex="100">
// // //                               <Checkbox
// // //                                 label=""
// // //                                 labelHidden
// // //                                 checked={selectedVideos.includes(video.id)}
// // //                                 onChange={(checked) => handleVideoSelect(video.id, checked)}
// // //                               />
// // //                             </Box>

// // //                             {/* Video Player */}
// // //                             <VideoPlayer video={video} />
                            
// // //                             {/* Effective Products Carousel */}
// // //                             <ProductCarousel
// // //                               products={effectiveProducts}
// // //                               videoId={video.id}
// // //                               onDelete={deleteVideoProduct}
// // //                             />

// // //                             {/* Collections Section */}
// // //                             <CollectionsSection collections={collections} videoId={video.id} />

// // //                             {/* Video Info */}
// // //                             <BlockStack gap="200">
// // //                               <Text variant="bodyMd" fontWeight="bold" alignment="center" truncate>
// // //                                 {video.title}
// // //                               </Text>
                              
// // //                               <InlineStack gap="100" align="center" blockAlign="center">
// // //                                 <Badge tone="success" size="small">
// // //                                   {effectiveProducts.length} products
// // //                                 </Badge>
// // //                                 <Badge tone="info" size="small">
// // //                                   {collections.length} collections
// // //                                 </Badge>
// // //                                 <Badge tone="subdued" size="small">
// // //                                   {new Date(video.created_at).toLocaleDateString()}
// // //                                 </Badge>
// // //                               </InlineStack>

// // //                               <BlockStack gap="100">
// // //                                 <Button
// // //                                   fullWidth
// // //                                   size="slim"
// // //                                   onClick={() => openProductModal(video)}
// // //                                   disabled={selectedVideos.length > 0}
// // //                                 >
// // //                                   Manage Products
// // //                                 </Button>
// // //                                 <Button
// // //                                   fullWidth
// // //                                   size="slim"
// // //                                   onClick={() => openCollectionModal(video)}
// // //                                   disabled={selectedVideos.length > 0}
// // //                                 >
// // //                                   Manage Collections
// // //                                 </Button>

// // //                                 <InlineStack gap="100" align="center">
// // //                                   {video.shopify_file_url && (
// // //                                     <Button
// // //                                       fullWidth
// // //                                       size="slim"
// // //                                       variant="secondary"
// // //                                       onClick={() => window.open(video.shopify_file_url, '_blank')}
// // //                                       disabled={selectedVideos.length > 0}
// // //                                     >
// // //                                       View Original
// // //                                     </Button>
// // //                                   )}
                                  
// // //                                   {/* Individual Delete Button */}
// // //                                   <Button
// // //                                     size="slim"
// // //                                     variant="plain"
// // //                                     destructive
// // //                                     onClick={() => {
// // //                                       setSelectedVideos([video.id]);
// // //                                       setDeleteModalOpen(true);
// // //                                     }}
// // //                                     disabled={selectedVideos.length > 0 && !selectedVideos.includes(video.id)}
// // //                                     icon={<Icon source="DeleteMinor" />}
// // //                                   />
// // //                                 </InlineStack>
// // //                               </BlockStack>
// // //                             </BlockStack>
// // //                           </BlockStack>
// // //                         </Card>
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               )}
// // //             </BlockStack>
// // //           </Card>
// // //         </Layout.Section>
// // //       </Layout>
// // //     </Page>
// // //   );
// // // }




// // import { useState, useCallback, useEffect, useRef } from "react";
// // import {
// //   Page,
// //   Card,
// //   FormLayout,
// //   TextField,
// //   Button,
// //   DropZone,
// //   Banner,
// //   BlockStack,
// //   Thumbnail,
// //   Text,
// //   InlineStack,
// //   Select,
// //   List,
// //   Badge,
// //   Layout,
// //   Box,
// //   Spinner,
// //   Modal,
// //   EmptyState,
// //   Icon,
// //   Checkbox,
// // } from "@shopify/polaris";

// // export const loader = async () => null;

// // export default function Index() {
// //   const [file, setFile] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const [message, setMessage] = useState({ text: "", status: "" });
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [products, setProducts] = useState([]);
// //   const [collections, setCollections] = useState([]);
// //   const [selectedProducts, setSelectedProducts] = useState([]);
// //   const [selectedCollections, setSelectedCollections] = useState([]);
// //   const [videos, setVideos] = useState([]);
// //   const [videoProductsMap, setVideoProductsMap] = useState(new Map());
// //   const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
// //   const [collectionProducts, setCollectionProducts] = useState(new Map());
// //   const [excludedMap, setExcludedMap] = useState(new Map());
// //   const [loading, setLoading] = useState(true);
// //   const [productsLoading, setProductsLoading] = useState(false);
// //   const [collectionsLoading, setCollectionsLoading] = useState(false);

// //   // States for product selection modal
// //   const [selectedVideo, setSelectedVideo] = useState(null);
// //   const [productModalOpen, setProductModalOpen] = useState(false);
// //   const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
// //   const [updatingProducts, setUpdatingProducts] = useState(false);

// //   // States for collection selection modal
// //   const [collectionModalOpen, setCollectionModalOpen] = useState(false);
// //   const [tempSelectedCollections, setTempSelectedCollections] = useState([]);
// //   const [updatingCollections, setUpdatingCollections] = useState(false);

// //   // States for bulk deletion
// //   const [selectedVideos, setSelectedVideos] = useState([]);
// //   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
// //   const [deleting, setDeleting] = useState(false);

// //   // Bulk upload states
// //   const [bulkFiles, setBulkFiles] = useState([]);
// //   const [isBulkUploading, setIsBulkUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState({});
// //   const [currentUploadIndex, setCurrentUploadIndex] = useState(0);

// //   // Load data when page loads
// //   useEffect(() => {
// //     loadProducts();
// //     loadCollections();
// //     loadVideos();
// //     loadVideoProducts();
// //     loadVideoCollections();
// //     loadExcludedProducts();
// //   }, []);

// //   // Fetch collection products when collections are loaded
// //   useEffect(() => {
// //     const fetchMissingCollectionProducts = async () => {
// //       const uniqueShopifyIds = new Set();
// //       videoCollectionsMap.forEach(colls => {
// //         colls.forEach(c => uniqueShopifyIds.add(c.shopify_collection_id));
// //       });

// //       for (const shopifyId of uniqueShopifyIds) {
// //         if (!collectionProducts.has(shopifyId)) {
// //           try {
// //             const response = await fetch(`/api/collection-products?collectionId=${encodeURIComponent(shopifyId)}`);
// //             const data = await response.json();
// //             if (data.success) {
// //               setCollectionProducts(prev => new Map(prev).set(shopifyId, data.products));
// //             }
// //           } catch (error) {
// //             console.error(`Failed to load products for collection ${shopifyId}:`, error);
// //           }
// //         }
// //       }
// //     };

// //     if (videoCollectionsMap.size > 0) {
// //       fetchMissingCollectionProducts();
// //     }
// //   }, [videoCollectionsMap, collectionProducts]);

// //   // Load products from Shopify (/api/viewproducts)
// //   const loadProducts = async () => {
// //     try {
// //       setProductsLoading(true);
// //       const response = await fetch("/api/viewproducts");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setProducts(data.products || []);
// //       } else {
// //         setMessage({ text: `❌ Failed to load products: ${data.error || "Unknown error"}`, status: "critical" });
// //         setProducts([]);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load products:", error);
// //       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
// //       setProducts([]);
// //     } finally {
// //       setProductsLoading(false);
// //     }
// //   };

// //   // Load collections from Shopify (/api/viewcollections)
// //   const loadCollections = async () => {
// //     try {
// //       setCollectionsLoading(true);
// //       const response = await fetch("/api/viewcollections");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setCollections(data.collections || []);
// //       } else {
// //         setMessage({ text: `❌ Failed to load collections: ${data.error || "Unknown error"}`, status: "critical" });
// //         setCollections([]);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load collections:", error);
// //       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
// //       setCollections([]);
// //     } finally {
// //       setCollectionsLoading(false);
// //     }
// //   };

// //   // Load videos (/api/videos)
// //   const loadVideos = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch("/api/videos");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setVideos(data.videos || []);
// //         setSelectedVideos([]);
// //       } else {
// //         setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
// //         setVideos([]);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load videos:", error);
// //       setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
// //       setVideos([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Load video products map (/api/showproducts-onvideos)
// //   const loadVideoProducts = async () => {
// //     try {
// //       const response = await fetch("/api/showproducts-onvideos");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
// //         setVideoProductsMap(map);
// //       } else {
// //         setMessage({ text: `❌ Failed to load video products: ${data.error || "Unknown error"}`, status: "critical" });
// //         setVideoProductsMap(new Map());
// //       }
// //     } catch (error) {
// //       console.error("Failed to load video products:", error);
// //       setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
// //       setVideoProductsMap(new Map());
// //     }
// //   };

// //   // Load video collections map (/api/showcollections-onvideos)
// //   const loadVideoCollections = async () => {
// //     try {
// //       const response = await fetch("/api/showcollections-onvideos");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
// //         setVideoCollectionsMap(map);
// //       } else {
// //         setMessage({ text: `❌ Failed to load video collections: ${data.error || "Unknown error"}`, status: "critical" });
// //         setVideoCollectionsMap(new Map());
// //       }
// //     } catch (error) {
// //       console.error("Failed to load video collections:", error);
// //       setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
// //       setVideoCollectionsMap(new Map());
// //     }
// //   };

// //   // Load excluded products map (/api/show-excluded-products)
// //   const loadExcludedProducts = async () => {
// //     try {
// //       const response = await fetch("/api/show-excluded-products");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         const map = data.videoExcludeds.reduce((m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))), new Map());
// //         setExcludedMap(map);
// //       } else {
// //         setMessage({ text: `❌ Failed to load excluded products: ${data.error || "Unknown error"}`, status: "critical" });
// //         setExcludedMap(new Map());
// //       }
// //     } catch (error) {
// //       console.error("Failed to load excluded products:", error);
// //       setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
// //       setExcludedMap(new Map());
// //     }
// //   };

// //   // Delete product from video (direct)
// //   const deleteVideoProduct = async (videoId, productId) => {
// //     try {
// //       const response = await fetch("/api/delete-video-product", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ videoId, productId })
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setVideoProductsMap(prev => {
// //           const newMap = new Map(prev);
// //           const products = newMap.get(videoId) || [];
// //           newMap.set(videoId, products.filter(p => p.id !== productId));
// //           return newMap;
// //         });
// //         setMessage({ text: "✅ Product removed from video", status: "success" });
// //       } else {
// //         setMessage({ text: `❌ Failed to remove product: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       setMessage({ text: `❌ Error removing product: ${error.message}`, status: "critical" });
// //     }
// //   };

// //   // Delete collection from video
// //   const deleteVideoCollection = async (videoId, collectionLocalId) => {
// //     try {
// //       const response = await fetch("/api/delete-video-collection", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ videoId, collectionId: collectionLocalId })
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setVideoCollectionsMap(prev => {
// //           const newMap = new Map(prev);
// //           const colls = newMap.get(videoId) || [];
// //           newMap.set(videoId, colls.filter(c => c.id !== collectionLocalId));
// //           return newMap;
// //         });
// //         setMessage({ text: "✅ Collection removed from video", status: "success" });
// //       } else {
// //         setMessage({ text: `❌ Failed to remove collection: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       setMessage({ text: `❌ Error removing collection: ${error.message}`, status: "critical" });
// //     }
// //   };

// //   // Exclude product from video (for collections)
// //   const excludeProduct = async (videoId, productId) => {
// //     try {
// //       const response = await fetch("/api/exclude-product", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ videoId, productId })
// //       });
// //       const data = await response.json();
// //       if (data.success) {
// //         setExcludedMap(prev => {
// //           const newMap = new Map(prev);
// //           const ex = new Set(newMap.get(videoId) || []);
// //           ex.add(productId);
// //           newMap.set(videoId, ex);
// //           return newMap;
// //         });
// //         setMessage({ text: "✅ Product excluded from video", status: "success" });
// //       } else {
// //         setMessage({ text: `❌ Failed to exclude product: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       setMessage({ text: `❌ Error excluding product: ${error.message}`, status: "critical" });
// //     }
// //   };

// //   // Compute effective products for a video
// //   const getEffectiveProducts = (videoId) => {
// //     const direct = videoProductsMap.get(videoId) || [];
// //     const colls = videoCollectionsMap.get(videoId) || [];
// //     const collProds = colls.flatMap(c => {
// //       const prods = collectionProducts.get(c.shopify_collection_id) || [];
// //       return prods.filter(p => !(excludedMap.get(videoId)?.has(p.id) || false));
// //     });
// //     const allProds = [...direct, ...collProds];
// //     const unique = new Map(allProds.map(p => [p.id, p]));
// //     return Array.from(unique.values());
// //   };

// //   // Handle single file drop
// //   const handleDrop = useCallback((acceptedFiles) => {
// //     const selectedFile = acceptedFiles[0];
// //     if (!selectedFile) return;

// //     if (selectedFile.size > 100 * 1024 * 1024) {
// //       setMessage({ text: "❌ File size must be less than 100MB", status: "critical" });
// //       return;
// //     }

// //     const validTypes = [
// //       "image/jpeg",
// //       "image/png",
// //       "image/gif",
// //       "image/webp",
// //       "video/mp4",
// //       "video/quicktime",
// //     ];
// //     if (!validTypes.includes(selectedFile.type)) {
// //       setMessage({ text: "❌ Please select a valid image or video file", status: "critical" });
// //       return;
// //     }

// //     setFile(selectedFile);
// //     setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
// //     setMessage({ text: "", status: "" });
// //   }, []);

// //   // Bulk File Drop Handler
// //   const handleBulkDrop = useCallback((acceptedFiles) => {
// //     const validFiles = acceptedFiles.filter(file => {
// //       const validTypes = [
// //         "image/jpeg", "image/png", "image/gif", "image/webp",
// //         "video/mp4", "video/quicktime", "video/x-m4v", "video/avi"
// //       ];
      
// //       if (!validTypes.includes(file.type)) {
// //         return false;
// //       }
      
// //       if (file.size > 100 * 1024 * 1024) {
// //         return false;
// //       }
      
// //       return true;
// //     });

// //     // Add files to existing bulk files
// //     setBulkFiles(prev => [...prev, ...validFiles.map(file => ({
// //       file,
// //       title: file.name.replace(/\.[^/.]+$/, ""),
// //       status: 'pending',
// //       progress: 0
// //     }))]);

// //     setMessage({ 
// //       text: `✅ Added ${validFiles.length} files to upload queue. Total: ${bulkFiles.length + validFiles.length}`, 
// //       status: "success" 
// //     });
// //   }, [bulkFiles.length]);

// //   // Remove file from bulk upload list
// //   const removeBulkFile = useCallback((index) => {
// //     setBulkFiles(prev => prev.filter((_, i) => i !== index));
// //   }, []);

// //   // Clear all bulk files
// //   const clearBulkFiles = useCallback(() => {
// //     setBulkFiles([]);
// //     setUploadProgress({});
// //   }, []);

// //   const handleTitleChange = useCallback((value) => setTitle(value), []);

// //   // Product selection for upload
// //   const productOptions = products.map((p) => ({
// //     label: p.title,
// //     value: String(p.id),
// //   }));

// //   const collectionOptions = collections.map((c) => ({
// //     label: c.title,
// //     value: String(c.id),
// //   }));

// //   const handleProductSelect = useCallback(
// //     (productId) => {
// //       const product = products.find((p) => String(p.id) === String(productId));
// //       if (product && !selectedProducts.find((p) => p.id === product.id)) {
// //         setSelectedProducts((prev) => [...prev, product]);
// //       }
// //     },
// //     [products, selectedProducts]
// //   );

// //   const handleCollectionSelect = useCallback(
// //     (collectionId) => {
// //       const collection = collections.find((c) => String(c.id) === String(collectionId));
// //       if (collection && !selectedCollections.find((c) => c.id === collection.id)) {
// //         setSelectedCollections((prev) => [...prev, collection]);
// //       }
// //     },
// //     [collections, selectedCollections]
// //   );

// //   const removeProduct = useCallback(
// //     (productId) =>
// //       setSelectedProducts((prev) =>
// //         prev.filter((p) => p.id !== productId)
// //       ),
// //     []
// //   );

// //   const removeCollection = useCallback(
// //     (collectionId) =>
// //       setSelectedCollections((prev) =>
// //         prev.filter((c) => c.id !== collectionId)
// //       ),
// //     []
// //   );

// //   // Handle select all videos
// //   const handleSelectAll = useCallback(() => {
// //     if (selectedVideos.length === videos.length) {
// //       setSelectedVideos([]);
// //     } else {
// //       setSelectedVideos(videos.map(v => v.id));
// //     }
// //   }, [videos, selectedVideos.length]);

// //   // Handle individual video selection
// //   const handleVideoSelect = useCallback((videoId, checked) => {
// //     setSelectedVideos(prev => 
// //       checked 
// //         ? [...prev, videoId]
// //         : prev.filter(id => id !== videoId)
// //     );
// //   }, []);

// //   // Open delete modal
// //   const openDeleteModal = () => {
// //     if (selectedVideos.length === 0) {
// //       setMessage({ text: "⚠️ Please select at least one video to delete", status: "warning" });
// //       return;
// //     }
// //     setDeleteModalOpen(true);
// //   };

// //   // Close delete modal
// //   const closeDeleteModal = () => {
// //     setDeleteModalOpen(false);
// //   };

// //   // Delete selected videos
// //   const deleteSelectedVideos = async () => {
// //     setDeleting(true);
// //     try {
// //       const response = await fetch("/api/delete-videos", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ videoIds: selectedVideos }),
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
// //         setSelectedVideos([]);
// //         setMessage({ text: `✅ Successfully deleted ${data.deletedCount} video(s)`, status: "success" });
// //         closeDeleteModal();
// //       } else {
// //         setMessage({ text: `❌ Failed to delete videos: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       console.error("Delete error:", error);
// //       setMessage({ text: `❌ Failed to delete videos: ${error.message}`, status: "critical" });
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   // Bulk Upload Handler
// //   const handleBulkUpload = async (e) => {
// //     e.preventDefault();
    
// //     if (bulkFiles.length === 0) {
// //       setMessage({ text: "⚠️ Please add files to upload first!", status: "warning" });
// //       return;
// //     }

// //     setIsBulkUploading(true);
// //     setMessage({ text: `🚀 Starting bulk upload of ${bulkFiles.length} files...`, status: "info" });

// //     const results = {
// //       success: 0,
// //       failed: 0,
// //       errors: []
// //     };

// //     // Process files in batches to avoid overwhelming the server
// //     const BATCH_SIZE = 5; // Upload 5 files at a time
// //     const totalBatches = Math.ceil(bulkFiles.length / BATCH_SIZE);

// //     for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
// //       const startIndex = batchIndex * BATCH_SIZE;
// //       const endIndex = Math.min(startIndex + BATCH_SIZE, bulkFiles.length);
// //       const batch = bulkFiles.slice(startIndex, endIndex);

// //       console.log(`📦 Processing batch ${batchIndex + 1}/${totalBatches} with ${batch.length} files`);

// //       // Process each file in the current batch
// //       const batchPromises = batch.map(async (bulkFile, indexInBatch) => {
// //         const globalIndex = startIndex + indexInBatch;
        
// //         try {
// //           // Update status to uploading
// //           setBulkFiles(prev => prev.map((item, i) => 
// //             i === globalIndex ? { ...item, status: 'uploading', progress: 10 } : item
// //           ));

// //           // 1️⃣ Get staged upload target
// //           const initBody = {
// //             fileName: bulkFile.file.name,
// //             fileSize: bulkFile.file.size,
// //             fileType: bulkFile.file.type,
// //             title: bulkFile.title,
// //           };

// //           const initRes = await fetch("/api/upload/init", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(initBody),
// //           });

// //           const initData = await initRes.json();
// //           if (!initRes.ok || !initData.success) {
// //             throw new Error(initData.error || "Failed to get upload target");
// //           }

// //           const { target, resourceType } = initData;

// //           // Update progress
// //           setBulkFiles(prev => prev.map((item, i) => 
// //             i === globalIndex ? { ...item, progress: 30 } : item
// //           ));

// //           // 2️⃣ Upload file to Shopify S3
// //           const s3Form = new FormData();
// //           (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
// //           s3Form.append("file", bulkFile.file, bulkFile.file.name);

// //           const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
// //           if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

// //           // Update progress
// //           setBulkFiles(prev => prev.map((item, i) => 
// //             i === globalIndex ? { ...item, progress: 70 } : item
// //           ));

// //           // 3️⃣ Finalize upload
// //           const finalizeRes = await fetch("/api/upload/complete", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               resourceUrl: target.resourceUrl,
// //               title: bulkFile.title,
// //               resourceType,
// //               selectedProducts: [], // Empty for bulk uploads
// //               selectedCollections: [], // Empty for bulk uploads
// //             }),
// //           });

// //           const finalizeData = await finalizeRes.json();
          
// //           if (!finalizeRes.ok || !finalizeData.success) {
// //             throw new Error(finalizeData.error || "Failed to finalize upload");
// //           }

// //           // Mark as completed
// //           setBulkFiles(prev => prev.map((item, i) => 
// //             i === globalIndex ? { ...item, status: 'completed', progress: 100 } : item
// //           ));

// //           results.success++;
          
// //           return { success: true, file: bulkFile.file.name };

// //         } catch (error) {
// //           console.error(`❌ Failed to upload ${bulkFile.file.name}:`, error);
          
// //           setBulkFiles(prev => prev.map((item, i) => 
// //             i === globalIndex ? { ...item, status: 'failed', error: error.message } : item
// //           ));

// //           results.failed++;
// //           results.errors.push(`${bulkFile.file.name}: ${error.message}`);
          
// //           return { success: false, file: bulkFile.file.name, error: error.message };
// //         }
// //       });

// //       // Wait for current batch to complete before proceeding to next batch
// //       await Promise.allSettled(batchPromises);

// //       // Small delay between batches to avoid rate limiting
// //       if (batchIndex < totalBatches - 1) {
// //         await new Promise(resolve => setTimeout(resolve, 1000));
// //       }
// //     }

// //     // Final results
// //     setIsBulkUploading(false);
    
// //     const resultMessage = `📊 Bulk upload completed: ${results.success} successful, ${results.failed} failed`;
// //     setMessage({ 
// //       text: resultMessage, 
// //       status: results.failed === 0 ? "success" : results.success > 0 ? "warning" : "critical" 
// //     });

// //     // Reload data if any uploads were successful
// //     if (results.success > 0) {
// //       setTimeout(() => {
// //         loadVideos();
// //         loadVideoProducts();
// //         loadVideoCollections();
// //         loadExcludedProducts();
// //       }, 2000);
// //     }

// //     // Show detailed errors if any
// //     if (results.errors.length > 0) {
// //       console.error("Upload errors:", results.errors);
// //     }
// //   };

// //   const ProductCarousel = ({ products, videoId, onDelete, type }) => {
// //     if (!products || products.length === 0) return null;
  
// //     return (
// //       <Box
// //         padding="200"
// //         background="bg-surface-secondary"
// //         borderRadius="200"
// //         marginTop="200"
// //       >
// //         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// //           {type === 'collection' ? 'Products from Collections' : 'Effective Products'} ({products.length})
// //         </Text>
// //         <div style={{
// //           display: 'flex',
// //           gap: '12px',
// //           overflowX: 'auto',
// //           padding: '8px 4px',
// //           scrollbarWidth: 'thin',
// //         }}>
// //           {products.map((product) => (
// //             <Box
// //               key={product.id || Math.random()}
// //               position="relative"
// //               padding="150"
// //               background="bg-surface"
// //               borderRadius="150"
// //               minWidth="100px"
// //               maxWidth="120px"
// //               style={{
// //                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
// //                 border: '1px solid #e1e3e5',
// //               }}
// //             >
// //               {onDelete && (
// //                 <Box position="absolute" top="4px" right="4px">
// //                   <Button
// //                     size="slim"
// //                     icon={<Icon source="CancelSmallMinor" />}
// //                     onClick={() => onDelete(videoId, product.id)}
// //                     destructive
// //                     plain
// //                   />
// //                 </Box>
// //               )}
// //               <BlockStack gap="100" align="center">
// //                 {product.image_url ? (
// //                   <Thumbnail
// //                     source={product.image_url}
// //                     alt={product.title}
// //                     size="small"
// //                   />
// //                 ) : (
// //                   <Box
// //                     background="bg-surface-secondary"
// //                     padding="200"
// //                     borderRadius="100"
// //                     minHeight="50px"
// //                     minWidth="50px"
// //                     display="flex"
// //                     alignItems="center"
// //                     justifyContent="center"
// //                   >
// //                     <Icon source="ProductMajor" tone="subdued" />
// //                   </Box>
// //                 )}
// //                 <Text variant="bodySm" alignment="center" truncate>
// //                   {product.title || 'Untitled Product'}
// //                 </Text>
// //                 <Text variant="bodySm" fontWeight="bold" tone="success">
// //                   {product.price || '0.00'} {product.currency_code || ''}
// //                 </Text>
// //               </BlockStack>
// //             </Box>
// //           ))}
// //         </div>
// //       </Box>
// //     );
// //   };

// //   const CollectionsSection = ({ collections, videoId }) => {
// //     if (!collections || collections.length === 0) return null;

// //     return (
// //       <Box
// //         padding="200"
// //         background="bg-surface-secondary"
// //         borderRadius="200"
// //         marginTop="200"
// //       >
// //         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// //           Associated Collections ({collections.length})
// //         </Text>
// //         <BlockStack gap="200">
// //           {collections.map((collection) => {
// //             const prods = (collectionProducts.get(collection.shopify_collection_id) || []).filter(
// //               p => !(excludedMap.get(videoId)?.has(p.id) || false)
// //             );
// //             return (
// //               <Card key={collection.id} padding="200">
// //                 <InlineStack align="space-between" blockAlign="center">
// //                   <InlineStack gap="200" blockAlign="center">
// //                     {collection.image_url ? (
// //                       <Thumbnail source={collection.image_url} alt={collection.title} size="small" />
// //                     ) : (
// //                       <Icon source="CollectionMajor" tone="subdued" />
// //                     )}
// //                     <Text variant="bodyMd" fontWeight="medium">
// //                       {collection.title}
// //                     </Text>
// //                   </InlineStack>
// //                   <Button
// //                     destructive
// //                     plain
// //                     icon={<Icon source="DeleteMinor" />}
// //                     onClick={() => deleteVideoCollection(videoId, collection.id)}
// //                   >
// //                     Remove Collection
// //                   </Button>
// //                 </InlineStack>
// //                 <ProductCarousel
// //                   products={prods}
// //                   videoId={videoId}
// //                   onDelete={excludeProduct}
// //                   type="collection"
// //                 />
// //               </Card>
// //             );
// //           })}
// //         </BlockStack>
// //       </Box>
// //     );
// //   };

// //   const openProductModal = async (video) => {
// //     try {
// //       setSelectedVideo(video);
// //       setProductModalOpen(true);
// //       setProductsLoading(true);

// //       const response = await fetch("/api/viewproducts");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setProducts(data.products || []);
// //         const currentProductIds = (videoProductsMap.get(video.id) || []).map(p => String(p.id));
// //         setTempSelectedProducts(currentProductIds);
// //       } else {
// //         setMessage({ text: `❌ Failed to load products: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       console.error("Error opening product modal:", error);
// //       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
// //     } finally {
// //       setProductsLoading(false);
// //     }
// //   };

// //   const closeProductModal = () => {
// //     setProductModalOpen(false);
// //     setSelectedVideo(null);
// //     setTempSelectedProducts([]);
// //   };

// //   const handleTempProductSelect = useCallback((productIds) => {
// //     setTempSelectedProducts(productIds);
// //   }, []);

// //   const updateVideoProducts = async () => {
// //     if (!selectedVideo) return;

// //     setUpdatingProducts(true);
// //     try {
// //       const response = await fetch("/api/saveproducts-database", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           videoId: selectedVideo.id,
// //           productIds: tempSelectedProducts
// //         }),
// //       });

// //       const data = await response.json();
      
// //       if (data.success) {
// //         setVideoProductsMap(prev => {
// //           const newMap = new Map(prev);
// //           newMap.set(selectedVideo.id, data.video.products || []);
// //           return newMap;
// //         });
// //         setMessage({ text: "✅ Products updated successfully!", status: "success" });
// //         closeProductModal();
// //       } else {
// //         setMessage({ text: `❌ Failed to update products: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       setMessage({ text: `❌ Failed to update products: ${error.message}`, status: "critical" });
// //     } finally {
// //       setUpdatingProducts(false);
// //     }
// //   };

// //   const openCollectionModal = async (video) => {
// //     try {
// //       setSelectedVideo(video);
// //       setCollectionModalOpen(true);
// //       setCollectionsLoading(true);

// //       const response = await fetch("/api/viewcollections");
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setCollections(data.collections || []);
// //         const currentCollectionIds = (videoCollectionsMap.get(video.id) || []).map(c => String(c.shopify_collection_id));
// //         setTempSelectedCollections(currentCollectionIds);
// //       } else {
// //         setMessage({ text: `❌ Failed to load collections: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       console.error("Error opening collection modal:", error);
// //       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
// //     } finally {
// //       setCollectionsLoading(false);
// //     }
// //   };

// //   const closeCollectionModal = () => {
// //     setCollectionModalOpen(false);
// //     setSelectedVideo(null);
// //     setTempSelectedCollections([]);
// //   };

// //   const handleTempCollectionSelect = useCallback((collectionIds) => {
// //     setTempSelectedCollections(collectionIds);
// //   }, []);

// //   const updateVideoCollections = async () => {
// //     if (!selectedVideo) return;

// //     setUpdatingCollections(true);
// //     try {
// //       const response = await fetch("/api/savecollections-database", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           videoId: selectedVideo.id,
// //           collectionIds: tempSelectedCollections
// //         }),
// //       });

// //       const data = await response.json();
      
// //       if (data.success) {
// //         setVideoCollectionsMap(prev => {
// //           const newMap = new Map(prev);
// //           newMap.set(selectedVideo.id, data.video.collections || []);
// //           return newMap;
// //         });
// //         setMessage({ text: "✅ Collections updated successfully!", status: "success" });
// //         closeCollectionModal();
// //       } else {
// //         setMessage({ text: `❌ Failed to update collections: ${data.error}`, status: "critical" });
// //       }
// //     } catch (error) {
// //       setMessage({ text: `❌ Failed to update collections: ${error.message}`, status: "critical" });
// //     } finally {
// //       setUpdatingCollections(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       setMessage({ text: "⚠️ Please select a file first!", status: "warning" });
// //       return;
// //     }

// //     setIsUploading(true);
// //     setMessage({ text: "⏳ Preparing upload...", status: "info" });

// //     try {
// //       // 1️⃣ Get staged upload target from server
// //       const initBody = {
// //         fileName: file.name,
// //         fileSize: file.size,
// //         fileType: file.type,
// //         title,
// //       };
// //       const initRes = await fetch("/api/upload/init", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(initBody),
// //       });

// //       const initData = await initRes.json();
// //       if (!initRes.ok || !initData.success) {
// //         throw new Error(initData.error || "Failed to get upload target");
// //       }

// //       const { target, resourceType } = initData;
// //       setMessage({ text: "⏳ Uploading file to Shopify storage...", status: "info" });

// //       // 2️⃣ Upload file directly to Shopify S3
// //       const s3Form = new FormData();
// //       (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
// //       s3Form.append("file", file, file.name);

// //       const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
// //       if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

// //       // 3️⃣ Finalize & save metadata to DB
// //       setMessage({ text: "⏳ Finalizing upload with Shopify...", status: "info" });

// //       const finalizeRes = await fetch("/api/upload/complete", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           resourceUrl: target.resourceUrl,
// //           title,
// //           resourceType,
// //           selectedProducts: selectedProducts.map((p) => String(p.id)),
// //           selectedCollections: selectedCollections.map((c) => String(c.id)),
// //         }),
// //       });

// //       const finalizeData = await finalizeRes.json();
      
// //       if (!finalizeRes.ok || !finalizeData.success) {
// //         throw new Error(finalizeData.error || "Failed to finalize upload");
// //       }

// //       setMessage({ text: "✅ File uploaded successfully!", status: "success" });
// //       setFile(null);
// //       setTitle("");
// //       setSelectedProducts([]);
// //       setSelectedCollections([]);
      
// //       // Reload data
// //       setTimeout(() => {
// //         loadVideos();
// //         loadVideoProducts();
// //         loadVideoCollections();
// //         loadExcludedProducts();
// //       }, 1000);
      
// //     } catch (err) {
// //       const errorMsg =
// //         err.name === "AbortError"
// //           ? "❌ Upload timed out. Please try again."
// //           : `❌ Upload failed: ${err.message}`;
// //       setMessage({ text: errorMsg, status: "critical" });
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   const removeFile = useCallback(() => {
// //     setFile(null);
// //     setTitle("");
// //     setMessage({ text: "", status: "" });
// //   }, []);

// //   // Video Player Component
// //   const VideoPlayer = ({ video }) => {
// //     const videoRef = useRef(null);
// //     const [isPlaying, setIsPlaying] = useState(false);
// //     const [showControls, setShowControls] = useState(false);
// //     const [isMuted, setIsMuted] = useState(true);

// //     // Auto-play video when component mounts
// //     useEffect(() => {
// //       if (videoRef.current && video.shopify_file_url) {
// //         const playVideo = async () => {
// //           try {
// //             videoRef.current.loop = true;
// //             videoRef.current.muted = true;
// //             await videoRef.current.play();
// //             setIsPlaying(true);
// //           } catch (error) {
// //             console.log("Auto-play failed, waiting for user interaction");
// //           }
// //         };
        
// //         playVideo();
// //       }
// //     }, [video.shopify_file_url]);

// //     const togglePlay = () => {
// //       if (videoRef.current) {
// //         if (isPlaying) {
// //           videoRef.current.pause();
// //         } else {
// //           videoRef.current.play();
// //         }
// //         setIsPlaying(!isPlaying);
// //       }
// //     };

// //     const toggleMute = (e) => {
// //       e.stopPropagation();
// //       if (videoRef.current) {
// //         videoRef.current.muted = !videoRef.current.muted;
// //         setIsMuted(!isMuted);
// //       }
// //     };

// //     const handleMouseEnter = () => {
// //       setShowControls(true);
// //     };

// //     const handleMouseLeave = () => {
// //       setShowControls(false);
// //     };

// //     const handleVideoClick = () => {
// //       togglePlay();
// //     };

// //     if (!video.shopify_file_url) {
// //       return (
// //         <Box
// //           background="bg-surface-secondary"
// //           padding="400"
// //           width="100%"
// //           height="180px"
// //           display="flex"
// //           alignItems="center"
// //           justifyContent="center"
// //           borderRadius="200"
// //         >
// //           <Text tone="subdued" alignment="center">
// //             🎬<br />No Video URL
// //           </Text>
// //         </Box>
// //       );
// //     }

// //     return (
// //       <Box
// //         position="relative"
// //         width="100%"
// //         height="180px"
// //         maxWidth="240px"
// //         margin="0 auto"
// //         overflow="hidden"
// //         borderRadius="200"
// //         onMouseEnter={handleMouseEnter}
// //         onMouseLeave={handleMouseLeave}
// //         onClick={handleVideoClick}
// //         style={{ cursor: 'pointer' }}
// //       >
// //         <video
// //           ref={videoRef}
// //           src={video.shopify_file_url}
// //           style={{
// //             width: '100%',
// //             height: '100%',
// //             objectFit: 'cover',
// //             borderRadius: '8px',
// //             backgroundColor: '#000'
// //           }}
// //           muted={isMuted}
// //           loop
// //           playsInline
// //           preload="auto"
// //         />
        
// //         {/* Controls Container - Top Right Corner */}
// //         {showControls && (
// //           <Box position="absolute" top="8px" right="8px">
// //             <InlineStack gap="100" align="center">
// //               <Badge tone={isPlaying ? "success" : "subdued"} size="small">
// //                 {isPlaying ? "🔴 Live" : "⏸️ Paused"}
// //               </Badge>
// //               <Button
// //                 size="slim"
// //                 variant="primary"
// //                 onClick={toggleMute}
// //                 icon={isMuted ? <Icon source="MuteMinor" /> : <Icon source="SoundMajor" />}
// //               />
// //             </InlineStack>
// //           </Box>
// //         )}
// //       </Box>
// //     );
// //   };

// //   return (
// //     <Page
// //       title="Video Carousel Manager"
// //       primaryAction={{
// //         content: "Refresh Videos",
// //         onAction: () => {
// //           loadVideos();
// //           loadVideoProducts();
// //           loadVideoCollections();
// //           loadExcludedProducts();
// //         },
// //         disabled: isUploading || isBulkUploading
// //       }}
// //     >
// //       {/* Delete Confirmation Modal */}
// //       <Modal
// //         open={deleteModalOpen}
// //         onClose={closeDeleteModal}
// //         title="Delete Videos"
// //         primaryAction={{
// //           content: "Delete Videos",
// //           onAction: deleteSelectedVideos,
// //           loading: deleting,
// //           destructive: true,
// //         }}
// //         secondaryActions={[
// //           {
// //             content: "Cancel",
// //             onAction: closeDeleteModal,
// //           },
// //         ]}
// //       >
// //         <Modal.Section>
// //           <BlockStack gap="400">
// //             <Text variant="bodyMd" as="p">
// //               Are you sure you want to delete {selectedVideos.length} selected video(s)? This action cannot be undone.
// //             </Text>
// //             <Text variant="bodySm" tone="subdued">
// //               All associated product and collection links will also be removed.
// //             </Text>
// //           </BlockStack>
// //         </Modal.Section>
// //       </Modal>

// //       {/* Product Selection Modal */}
// //       <Modal
// //         open={productModalOpen}
// //         onClose={closeProductModal}
// //         title={`Select Products for "${selectedVideo?.title}"`}
// //         primaryAction={{
// //           content: "Save Products",
// //           onAction: updateVideoProducts,
// //           loading: updatingProducts,
// //         }}
// //         secondaryActions={[
// //           {
// //             content: "Cancel",
// //             onAction: closeProductModal,
// //           },
// //         ]}
// //         size="large"
// //       >
// //         <Modal.Section>
// //           <BlockStack gap="400">
// //             <Text variant="bodyMd" tone="subdued">
// //               Choose products from your store to associate with this video.
// //             </Text>
            
// //             {productsLoading ? (
// //               <Box padding="400" alignment="center">
// //                 <Spinner size="small" />
// //                 <Text variant="bodySm" tone="subdued">Loading products...</Text>
// //               </Box>
// //             ) : products.length === 0 ? (
// //               <EmptyState heading="No products available">
// //                 <Text variant="bodyMd" as="p">
// //                   No products found in your store.
// //                 </Text>
// //               </EmptyState>
// //             ) : (
// //               <Box>
// //                 <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// //                   All Products ({products.length}):
// //                 </Text>
// //                 <div style={{
// //                   maxHeight: '400px',
// //                   overflowY: 'auto',
// //                   border: '1px solid var(--p-border-subdued)',
// //                   borderRadius: '8px',
// //                   padding: '12px'
// //                 }}>
// //                   <BlockStack gap="200">
// //                     {products.map((product) => (
// //                       <Card
// //                         key={product.id}
// //                         padding="200"
// //                         style={{
// //                           border: tempSelectedProducts.includes(String(product.id))
// //                             ? '2px solid var(--p-border-success)'
// //                             : '1px solid var(--p-border-subdued)',
// //                           background: tempSelectedProducts.includes(String(product.id))
// //                             ? 'var(--p-surface-success-subdued)'
// //                             : 'var(--p-surface)',
// //                         }}
// //                       >
// //                         <InlineStack gap="200" blockAlign="center">
// //                           <Checkbox
// //                             label=""
// //                             labelHidden
// //                             checked={tempSelectedProducts.includes(String(product.id))}
// //                             onChange={(checked) => {
// //                               const productId = String(product.id);
// //                               setTempSelectedProducts((prev) =>
// //                                 checked
// //                                   ? [...prev, productId]
// //                                   : prev.filter((id) => id !== productId)
// //                               );
// //                             }}
// //                             disabled={updatingProducts}
// //                           />
// //                           {product.image_url ? (
// //                             <Thumbnail
// //                               source={product.image_url}
// //                               alt={product.title}
// //                               size="small"
// //                             />
// //                           ) : (
// //                             <Box
// //                               background="bg-surface-secondary"
// //                               padding="200"
// //                               borderRadius="100"
// //                               minHeight="40px"
// //                               minWidth="40px"
// //                               display="flex"
// //                               alignItems="center"
// //                               justifyContent="center"
// //                             >
// //                               <Icon source="ProductMajor" tone="subdued" />
// //                             </Box>
// //                           )}
// //                           <BlockStack gap="050">
// //                             <Text variant="bodySm" fontWeight="medium" truncate>
// //                               {product.title || 'Untitled Product'}
// //                             </Text>
// //                             <Text variant="bodySm" tone="subdued">
// //                               {product.price || '0.00'} {product.currency_code || ''}
// //                             </Text>
// //                           </BlockStack>
// //                         </InlineStack>
// //                       </Card>
// //                     ))}
// //                   </BlockStack>
// //                 </div>
// //                 <Text variant="bodySm" tone="subdued" marginTop="200">
// //                   {tempSelectedProducts.length} product(s) selected
// //                 </Text>
// //               </Box>
// //             )}
// //           </BlockStack>
// //         </Modal.Section>
// //       </Modal>

// //       {/* Collection Selection Modal */}
// //       <Modal
// //         open={collectionModalOpen}
// //         onClose={closeCollectionModal}
// //         title={`Select Collections for "${selectedVideo?.title}"`}
// //         primaryAction={{
// //           content: "Save Collections",
// //           onAction: updateVideoCollections,
// //           loading: updatingCollections,
// //         }}
// //         secondaryActions={[
// //           {
// //             content: "Cancel",
// //             onAction: closeCollectionModal,
// //           },
// //         ]}
// //         size="large"
// //       >
// //         <Modal.Section>
// //           <BlockStack gap="400">
// //             <Text variant="bodyMd" tone="subdued">
// //               Choose collections from your store to associate with this video.
// //             </Text>
            
// //             {collectionsLoading ? (
// //               <Box padding="400" alignment="center">
// //                 <Spinner size="small" />
// //                 <Text variant="bodySm" tone="subdued">Loading collections...</Text>
// //               </Box>
// //             ) : collections.length === 0 ? (
// //               <EmptyState heading="No collections available">
// //                 <Text variant="bodyMd" as="p">
// //                   No collections found in your store.
// //                 </Text>
// //               </EmptyState>
// //             ) : (
// //               <Box>
// //                 <Text variant="bodySm" fontWeight="medium" marginBottom="200">
// //                   All Collections ({collections.length}):
// //                 </Text>
// //                 <div style={{
// //                   maxHeight: '400px',
// //                   overflowY: 'auto',
// //                   border: '1px solid var(--p-border-subdued)',
// //                   borderRadius: '8px',
// //                   padding: '12px'
// //                 }}>
// //                   <BlockStack gap="200">
// //                     {collections.map((collection) => (
// //                       <Card
// //                         key={collection.id}
// //                         padding="200"
// //                         style={{
// //                           border: tempSelectedCollections.includes(String(collection.id))
// //                             ? '2px solid var(--p-border-success)'
// //                             : '1px solid var(--p-border-subdued)',
// //                           background: tempSelectedCollections.includes(String(collection.id))
// //                             ? 'var(--p-surface-success-subdued)'
// //                             : 'var(--p-surface)',
// //                         }}
// //                       >
// //                         <InlineStack gap="200" blockAlign="center">
// //                           <Checkbox
// //                             label=""
// //                             labelHidden
// //                             checked={tempSelectedCollections.includes(String(collection.id))}
// //                             onChange={(checked) => {
// //                               const collectionId = String(collection.id);
// //                               setTempSelectedCollections((prev) =>
// //                                 checked
// //                                   ? [...prev, collectionId]
// //                                   : prev.filter((id) => id !== collectionId)
// //                               );
// //                             }}
// //                             disabled={updatingCollections}
// //                           />
// //                           {collection.image_url ? (
// //                             <Thumbnail
// //                               source={collection.image_url}
// //                               alt={collection.title}
// //                               size="small"
// //                             />
// //                           ) : (
// //                             <Box
// //                               background="bg-surface-secondary"
// //                               padding="200"
// //                               borderRadius="100"
// //                               minHeight="40px"
// //                               minWidth="40px"
// //                               display="flex"
// //                               alignItems="center"
// //                               justifyContent="center"
// //                             >
// //                               <Icon source="CollectionMajor" tone="subdued" />
// //                             </Box>
// //                           )}
// //                           <Text variant="bodySm" fontWeight="medium" truncate>
// //                             {collection.title || 'Untitled Collection'}
// //                           </Text>
// //                         </InlineStack>
// //                       </Card>
// //                     ))}
// //                   </BlockStack>
// //                 </div>
// //                 <Text variant="bodySm" tone="subdued" marginTop="200">
// //                   {tempSelectedCollections.length} collection(s) selected
// //                 </Text>
// //               </Box>
// //             )}
// //           </BlockStack>
// //         </Modal.Section>
// //       </Modal>

// //       <Layout>
// //         {/* Upload Section */}
// //         <Layout.Section>
// //           <Card>
// //             <BlockStack gap="400">
// //               <Text variant="headingLg" as="h2">Upload Videos</Text>
              
// //               {message.text && (
// //                 <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
// //                   {message.text}
// //                 </Banner>
// //               )}

// //               {/* Single File Upload */}
// //               <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                 <Text variant="headingSm" as="h3" marginBottom="200">Single Upload</Text>
// //                 <form onSubmit={handleSubmit}>
// //                   <FormLayout>
// //                     {!file ? (
// //                       <DropZone
// //                         onDrop={handleDrop}
// //                         accept="image/*,video/*"
// //                         type="file"
// //                         label="Media file"
// //                         disabled={isUploading || isBulkUploading}
// //                       >
// //                         <DropZone.FileUpload />
// //                       </DropZone>
// //                     ) : (
// //                       <BlockStack gap="200">
// //                         <InlineStack gap="200" align="center" blockAlign="center">
// //                           <Thumbnail
// //                             source={file.type.startsWith("image") ? URL.createObjectURL(file) : ""}
// //                             alt={file.name}
// //                             size="small"
// //                           />
// //                           <BlockStack gap="100">
// //                             <Text variant="bodyMd" as="p" fontWeight="medium">
// //                               {file.name}
// //                             </Text>
// //                             <Text variant="bodySm" as="p" tone="subdued">
// //                               {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
// //                             </Text>
// //                           </BlockStack>
// //                           <Button onClick={removeFile} disabled={isUploading || isBulkUploading}>
// //                             Remove
// //                           </Button>
// //                         </InlineStack>
// //                       </BlockStack>
// //                     )}

// //                     <TextField
// //                       label="Title"
// //                       value={title}
// //                       onChange={handleTitleChange}
// //                       autoComplete="off"
// //                       disabled={isUploading || isBulkUploading}
// //                       helpText="A descriptive title for your video"
// //                     />

// //                     <Select
// //                       label="Add Products to Video"
// //                       options={productOptions}
// //                       onChange={handleProductSelect}
// //                       disabled={isUploading || isBulkUploading}
// //                       placeholder="Select products to associate with this video"
// //                     />

// //                     {selectedProducts.length > 0 && (
// //                       <BlockStack gap="200">
// //                         <Text variant="bodyMd" fontWeight="semibold">
// //                           Selected Products ({selectedProducts.length})
// //                         </Text>
// //                         <List>
// //                           {selectedProducts.map((product) => (
// //                             <List.Item key={product.id}>
// //                               <InlineStack align="space-between" blockAlign="center">
// //                                 <Text>{product.title}</Text>
// //                                 <Button
// //                                   destructive
// //                                   size="slim"
// //                                   onClick={() => removeProduct(product.id)}
// //                                   disabled={isUploading || isBulkUploading}
// //                                 >
// //                                   Remove
// //                                 </Button>
// //                               </InlineStack>
// //                             </List.Item>
// //                           ))}
// //                         </List>
// //                       </BlockStack>
// //                     )}

// //                     <Select
// //                       label="Add Collections to Video"
// //                       options={collectionOptions}
// //                       onChange={handleCollectionSelect}
// //                       disabled={isUploading || isBulkUploading}
// //                       placeholder="Select collections to associate with this video"
// //                     />

// //                     {selectedCollections.length > 0 && (
// //                       <BlockStack gap="200">
// //                         <Text variant="bodyMd" fontWeight="semibold">
// //                           Selected Collections ({selectedCollections.length})
// //                         </Text>
// //                         <List>
// //                           {selectedCollections.map((collection) => (
// //                             <List.Item key={collection.id}>
// //                               <InlineStack align="space-between" blockAlign="center">
// //                                 <Text>{collection.title}</Text>
// //                                 <Button
// //                                   destructive
// //                                   size="slim"
// //                                   onClick={() => removeCollection(collection.id)}
// //                                   disabled={isUploading || isBulkUploading}
// //                                 >
// //                                   Remove
// //                                 </Button>
// //                               </InlineStack>
// //                             </List.Item>
// //                           ))}
// //                         </List>
// //                       </BlockStack>
// //                     )}

// //                     <Button 
// //                       primary 
// //                       submit 
// //                       loading={isUploading} 
// //                       disabled={!file || isUploading || isBulkUploading}
// //                       size="large"
// //                     >
// //                       {isUploading ? "Uploading..." : "Upload Single Video"}
// //                     </Button>
// //                   </FormLayout>
// //                 </form>
// //               </Box>

// //               {/* Bulk Upload Section */}
// //               <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                 <Text variant="headingSm" as="h3" marginBottom="200">Bulk Upload (100+ Videos)</Text>
                
// //                 <BlockStack gap="300">
// //                   <DropZone
// //                     onDrop={handleBulkDrop}
// //                     accept="image/*,video/*"
// //                     type="file"
// //                     label="Select multiple media files"
// //                     allowMultiple
// //                     disabled={isBulkUploading}
// //                   >
// //                     <DropZone.FileUpload />
// //                   </DropZone>

// //                   {bulkFiles.length > 0 && (
// //                     <BlockStack gap="200">
// //                       <InlineStack align="space-between" blockAlign="center">
// //                         <Text variant="bodyMd" fontWeight="semibold">
// //                           Upload Queue ({bulkFiles.length} files)
// //                         </Text>
// //                         <Button 
// //                           onClick={clearBulkFiles} 
// //                           disabled={isBulkUploading}
// //                           variant="plain"
// //                           destructive
// //                         >
// //                           Clear All
// //                         </Button>
// //                       </InlineStack>

// //                       <Box
// //                         maxHeight="300px"
// //                         overflowY="auto"
// //                         padding="200"
// //                         background="bg-surface"
// //                         borderRadius="200"
// //                         border="divider"
// //                       >
// //                         <BlockStack gap="100">
// //                           {bulkFiles.map((bulkFile, index) => (
// //                             <Card key={index} padding="200">
// //                               <InlineStack align="space-between" blockAlign="center">
// //                                 <InlineStack gap="200" blockAlign="center">
// //                                   <Thumbnail
// //                                     source={bulkFile.file.type.startsWith("image") ? URL.createObjectURL(bulkFile.file) : ""}
// //                                     alt={bulkFile.file.name}
// //                                     size="small"
// //                                   />
// //                                   <BlockStack gap="050">
// //                                     <Text variant="bodySm" fontWeight="medium">
// //                                       {bulkFile.title}
// //                                     </Text>
// //                                     <Text variant="bodySm" tone="subdued">
// //                                       {(bulkFile.file.size / 1024 / 1024).toFixed(2)} MB
// //                                     </Text>
// //                                   </BlockStack>
// //                                 </InlineStack>
                                
// //                                 <InlineStack gap="100" blockAlign="center">
// //                                   {/* Status Badge */}
// //                                   {bulkFile.status === 'completed' && (
// //                                     <Badge tone="success">Completed</Badge>
// //                                   )}
// //                                   {bulkFile.status === 'uploading' && (
// //                                     <Badge tone="attention">Uploading {bulkFile.progress}%</Badge>
// //                                   )}
// //                                   {bulkFile.status === 'failed' && (
// //                                     <Badge tone="critical">Failed</Badge>
// //                                   )}
// //                                   {bulkFile.status === 'pending' && (
// //                                     <Badge tone="subdued">Pending</Badge>
// //                                   )}
                                  
// //                                   <Button
// //                                     size="slim"
// //                                     destructive
// //                                     onClick={() => removeBulkFile(index)}
// //                                     disabled={isBulkUploading}
// //                                     icon={<Icon source="DeleteMinor" />}
// //                                   >
// //                                     Remove
// //                                   </Button>
// //                                 </InlineStack>
// //                               </InlineStack>

// //                               {/* Progress Bar */}
// //                               {bulkFile.status === 'uploading' && (
// //                                 <Box marginTop="100">
// //                                   <div style={{
// //                                     width: '100%',
// //                                     height: '4px',
// //                                     backgroundColor: 'var(--p-border-subdued)',
// //                                     borderRadius: '2px',
// //                                     overflow: 'hidden'
// //                                   }}>
// //                                     <div style={{
// //                                       width: `${bulkFile.progress}%`,
// //                                       height: '100%',
// //                                       backgroundColor: 'var(--p-interactive)',
// //                                       transition: 'width 0.3s ease'
// //                                     }} />
// //                                   </div>
// //                                 </Box>
// //                               )}

// //                               {/* Error Message */}
// //                               {bulkFile.status === 'failed' && bulkFile.error && (
// //                                 <Box marginTop="100">
// //                                   <Text variant="bodySm" tone="critical">
// //                                     Error: {bulkFile.error}
// //                                   </Text>
// //                                 </Box>
// //                               )}
// //                             </Card>
// //                           ))}
// //                         </BlockStack>
// //                       </Box>

// //                       <Button 
// //                         primary 
// //                         onClick={handleBulkUpload}
// //                         loading={isBulkUploading}
// //                         disabled={isBulkUploading || bulkFiles.length === 0}
// //                         size="large"
// //                       >
// //                         {isBulkUploading ? `Uploading... (${bulkFiles.filter(f => f.status === 'completed').length}/${bulkFiles.length})` : `Start Bulk Upload (${bulkFiles.length} files)`}
// //                       </Button>

// //                       {isBulkUploading && (
// //                         <Box>
// //                           <Text variant="bodySm" tone="subdued">
// //                             📦 Uploading in batches of 5 files. Do not close this page.
// //                           </Text>
// //                         </Box>
// //                       )}
// //                     </BlockStack>
// //                   )}
// //                 </BlockStack>
// //               </Box>
// //             </BlockStack>
// //           </Card>
// //         </Layout.Section>

// //         {/* Uploaded Videos Section */}
// //         <Layout.Section>
// //           <Card>
// //             <BlockStack gap="400">
// //               <InlineStack align="space-between" blockAlign="center">
// //                 <Text variant="headingLg" as="h2">
// //                   Your Videos ({videos.length})
// //                 </Text>
// //                 <InlineStack gap="200">
// //                   {selectedVideos.length > 0 && (
// //                     <Button 
// //                       destructive 
// //                       onClick={openDeleteModal}
// //                       disabled={loading || isBulkUploading}
// //                       icon={<Icon source="DeleteMinor" />}
// //                     >
// //                       Delete Selected ({selectedVideos.length})
// //                     </Button>
// //                   )}
// //                   <Button 
// //                     onClick={() => {
// //                       loadVideos();
// //                       loadVideoProducts();
// //                       loadVideoCollections();
// //                       loadExcludedProducts();
// //                     }} 
// //                     disabled={loading || isBulkUploading}
// //                   >
// //                     Refresh
// //                   </Button>
// //                 </InlineStack>
// //               </InlineStack>

// //               {loading ? (
// //                 <Box padding="800" alignment="center">
// //                   <Spinner accessibilityLabel="Loading videos" size="large" />
// //                   <Text alignment="center" tone="subdued" variant="bodyMd">
// //                     Loading your videos...
// //                   </Text>
// //                 </Box>
// //               ) : videos.length === 0 ? (
// //                 <EmptyState
// //                   heading="No videos yet"
// //                   image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
// //                 >
// //                   <Text variant="bodyMd" as="p">
// //                     Upload your first video to get started.
// //                   </Text>
// //                 </EmptyState>
// //               ) : (
// //                 <div style={{
// //                   display: 'flex',
// //                   flexWrap: 'wrap',
// //                   gap: '20px',
// //                   justifyContent: 'flex-start'
// //                 }}>
// //                   {/* Select All Checkbox */}
// //                   <div style={{ 
// //                     width: '100%', 
// //                     padding: '12px 16px',
// //                     background: 'var(--p-surface-subdued)',
// //                     borderRadius: '8px',
// //                     border: '1px solid var(--p-border-subdued)'
// //                   }}>
// //                     <Checkbox
// //                       label={`Select all ${videos.length} videos`}
// //                       checked={selectedVideos.length === videos.length && videos.length > 0}
// //                       onChange={handleSelectAll}
// //                       disabled={isBulkUploading}
// //                     />
// //                   </div>

// //                   {videos.map((video) => {
// //                     const effectiveProducts = getEffectiveProducts(video.id);
// //                     const collections = videoCollectionsMap.get(video.id) || [];

// //                     return (
// //                       <div key={video.id} style={{
// //                         flex: '0 0 calc(33.333% - 13.33px)',
// //                         minWidth: '280px',
// //                         boxSizing: 'border-box',
// //                         position: 'relative'
// //                       }}>
// //                         <Card 
// //                           padding="300"
// //                           style={{
// //                             border: selectedVideos.includes(video.id) 
// //                               ? '2px solid var(--p-border-critical)' 
// //                               : '1px solid var(--p-border-subdued)',
// //                             transition: 'all 0.2s ease',
// //                             background: selectedVideos.includes(video.id)
// //                               ? 'var(--p-surface-critical-subdued)'
// //                               : 'var(--p-surface)'
// //                           }}
// //                         >
// //                           <BlockStack gap="300">
// //                             {/* Video Selection Checkbox */}
// //                             <Box position="absolute" top="12px" left="12px" zIndex="100">
// //                               <Checkbox
// //                                 label=""
// //                                 labelHidden
// //                                 checked={selectedVideos.includes(video.id)}
// //                                 onChange={(checked) => handleVideoSelect(video.id, checked)}
// //                                 disabled={isBulkUploading}
// //                               />
// //                             </Box>

// //                             {/* Video Player */}
// //                             <VideoPlayer video={video} />
                            
// //                             {/* Effective Products Carousel */}
// //                             <ProductCarousel
// //                               products={effectiveProducts}
// //                               videoId={video.id}
// //                               onDelete={deleteVideoProduct}
// //                             />

// //                             {/* Collections Section */}
// //                             <CollectionsSection collections={collections} videoId={video.id} />

// //                             {/* Video Info */}
// //                             <BlockStack gap="200">
// //                               <Text variant="bodyMd" fontWeight="bold" alignment="center" truncate>
// //                                 {video.title}
// //                               </Text>
                              
// //                               <InlineStack gap="100" align="center" blockAlign="center">
// //                                 <Badge tone="success" size="small">
// //                                   {effectiveProducts.length} products
// //                                 </Badge>
// //                                 <Badge tone="info" size="small">
// //                                   {collections.length} collections
// //                                 </Badge>
// //                                 <Badge tone="subdued" size="small">
// //                                   {new Date(video.created_at).toLocaleDateString()}
// //                                 </Badge>
// //                               </InlineStack>

// //                               <BlockStack gap="100">
// //                                 <Button
// //                                   fullWidth
// //                                   size="slim"
// //                                   onClick={() => openProductModal(video)}
// //                                   disabled={selectedVideos.length > 0 || isBulkUploading}
// //                                 >
// //                                   Manage Products
// //                                 </Button>
// //                                 <Button
// //                                   fullWidth
// //                                   size="slim"
// //                                   onClick={() => openCollectionModal(video)}
// //                                   disabled={selectedVideos.length > 0 || isBulkUploading}
// //                                 >
// //                                   Manage Collections
// //                                 </Button>

// //                                 <InlineStack gap="100" align="center">
// //                                   {video.shopify_file_url && (
// //                                     <Button
// //                                       fullWidth
// //                                       size="slim"
// //                                       variant="secondary"
// //                                       onClick={() => window.open(video.shopify_file_url, '_blank')}
// //                                       disabled={selectedVideos.length > 0 || isBulkUploading}
// //                                     >
// //                                       View Original
// //                                     </Button>
// //                                   )}
                                  
// //                                   {/* Individual Delete Button */}
// //                                   <Button
// //                                     size="slim"
// //                                     variant="plain"
// //                                     destructive
// //                                     onClick={() => {
// //                                       setSelectedVideos([video.id]);
// //                                       setDeleteModalOpen(true);
// //                                     }}
// //                                     disabled={(selectedVideos.length > 0 && !selectedVideos.includes(video.id)) || isBulkUploading}
// //                                     icon={<Icon source="DeleteMinor" />}
// //                                   />
// //                                 </InlineStack>
// //                               </BlockStack>
// //                             </BlockStack>
// //                           </BlockStack>
// //                         </Card>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </BlockStack>
// //           </Card>
// //         </Layout.Section>
// //       </Layout>
// //     </Page>
// //   );
// // }








// import { useState, useCallback, useEffect, useRef } from "react";
// import {
//   Page,
//   Card,
//   FormLayout,
//   TextField,
//   Button,
//   DropZone,
//   Banner,
//   BlockStack,
//   Thumbnail,
//   Text,
//   InlineStack,
//   Select,
//   List,
//   Badge,
//   Layout,
//   Box,
//   Spinner,
//   Modal,
//   EmptyState,
//   Icon,
//   Checkbox,
// } from "@shopify/polaris";

// export const loader = async () => null;

// export default function Index() {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState({ text: "", status: "" });
//   const [isUploading, setIsUploading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [collections, setCollections] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [selectedCollections, setSelectedCollections] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [videoProductsMap, setVideoProductsMap] = useState(new Map());
//   const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
//   const [collectionProducts, setCollectionProducts] = useState(new Map());
//   const [excludedMap, setExcludedMap] = useState(new Map());
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [collectionsLoading, setCollectionsLoading] = useState(false);

//   // States for product selection modal
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [productModalOpen, setProductModalOpen] = useState(false);
//   const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
//   const [updatingProducts, setUpdatingProducts] = useState(false);

//   // States for collection selection modal
//   const [collectionModalOpen, setCollectionModalOpen] = useState(false);
//   const [tempSelectedCollections, setTempSelectedCollections] = useState([]);
//   const [updatingCollections, setUpdatingCollections] = useState(false);

//   // States for bulk deletion
//   const [selectedVideos, setSelectedVideos] = useState([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   // Bulk upload states
//   const [bulkFiles, setBulkFiles] = useState([]);
//   const [isBulkUploading, setIsBulkUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [currentUploadIndex, setCurrentUploadIndex] = useState(0);

//   // Load data when page loads
//   useEffect(() => {
//     loadProducts();
//     loadCollections();
//     loadVideos();
//     loadVideoProducts();
//     loadVideoCollections();
//     loadExcludedProducts();
//   }, []);

//   // Fetch collection products when collections are loaded
//   useEffect(() => {
//     const fetchMissingCollectionProducts = async () => {
//       const uniqueShopifyIds = new Set();
//       videoCollectionsMap.forEach(colls => {
//         colls.forEach(c => uniqueShopifyIds.add(c.shopify_collection_id));
//       });

//       for (const shopifyId of uniqueShopifyIds) {
//         if (!collectionProducts.has(shopifyId)) {
//           try {
//             const response = await fetch(`/api/collection-products?collectionId=${encodeURIComponent(shopifyId)}`);
//             const data = await response.json();
//             if (data.success) {
//               setCollectionProducts(prev => new Map(prev).set(shopifyId, data.products));
//             }
//           } catch (error) {
//             console.error(`Failed to load products for collection ${shopifyId}:`, error);
//           }
//         }
//       }
//     };

//     if (videoCollectionsMap.size > 0) {
//       fetchMissingCollectionProducts();
//     }
//   }, [videoCollectionsMap, collectionProducts]);

//   // Load products from Shopify (/api/viewproducts)
//   const loadProducts = async () => {
//     try {
//       setProductsLoading(true);
//       const response = await fetch("/api/viewproducts");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.products || []);
//       } else {
//         setMessage({ text: `❌ Failed to load products: ${data.error || "Unknown error"}`, status: "critical" });
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   // Load collections from Shopify (/api/viewcollections)
//   const loadCollections = async () => {
//     try {
//       setCollectionsLoading(true);
//       const response = await fetch("/api/viewcollections");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         setCollections(data.collections || []);
//       } else {
//         setMessage({ text: `❌ Failed to load collections: ${data.error || "Unknown error"}`, status: "critical" });
//         setCollections([]);
//       }
//     } catch (error) {
//       console.error("Failed to load collections:", error);
//       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
//       setCollections([]);
//     } finally {
//       setCollectionsLoading(false);
//     }
//   };

//   // Load videos (/api/videos)
//   const loadVideos = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/videos");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         setVideos(data.videos || []);
//         setSelectedVideos([]);
//       } else {
//         setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
//         setVideos([]);
//       }
//     } catch (error) {
//       console.error("Failed to load videos:", error);
//       setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
//       setVideos([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load video products map (/api/showproducts-onvideos)
//   const loadVideoProducts = async () => {
//     try {
//       const response = await fetch("/api/showproducts-onvideos");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
//         setVideoProductsMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load video products: ${data.error || "Unknown error"}`, status: "critical" });
//         setVideoProductsMap(new Map());
//       }
//     } catch (error) {
//       console.error("Failed to load video products:", error);
//       setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
//       setVideoProductsMap(new Map());
//     }
//   };

//   // Load video collections map (/api/showcollections-onvideos)
//   const loadVideoCollections = async () => {
//     try {
//       const response = await fetch("/api/showcollections-onvideos");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
//         setVideoCollectionsMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load video collections: ${data.error || "Unknown error"}`, status: "critical" });
//         setVideoCollectionsMap(new Map());
//       }
//     } catch (error) {
//       console.error("Failed to load video collections:", error);
//       setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
//       setVideoCollectionsMap(new Map());
//     }
//   };

//   // Load excluded products map (/api/show-excluded-products)
//   const loadExcludedProducts = async () => {
//     try {
//       const response = await fetch("/api/show-excluded-products");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoExcludeds.reduce((m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))), new Map());
//         setExcludedMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load excluded products: ${data.error || "Unknown error"}`, status: "critical" });
//         setExcludedMap(new Map());
//       }
//     } catch (error) {
//       console.error("Failed to load excluded products:", error);
//       setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
//       setExcludedMap(new Map());
//     }
//   };

//   // Delete product from video (direct)
//   const deleteVideoProduct = async (videoId, productId) => {
//     try {
//       const response = await fetch("/api/delete-video-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoId, productId })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setVideoProductsMap(prev => {
//           const newMap = new Map(prev);
//           const products = newMap.get(videoId) || [];
//           newMap.set(videoId, products.filter(p => p.id !== productId));
//           return newMap;
//         });
//         setMessage({ text: "✅ Product removed from video", status: "success" });
//       } else {
//         setMessage({ text: `❌ Failed to remove product: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       setMessage({ text: `❌ Error removing product: ${error.message}`, status: "critical" });
//     }
//   };

//   // Delete collection from video
//   const deleteVideoCollection = async (videoId, collectionLocalId) => {
//     try {
//       const response = await fetch("/api/delete-video-collection", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoId, collectionId: collectionLocalId })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setVideoCollectionsMap(prev => {
//           const newMap = new Map(prev);
//           const colls = newMap.get(videoId) || [];
//           newMap.set(videoId, colls.filter(c => c.id !== collectionLocalId));
//           return newMap;
//         });
//         setMessage({ text: "✅ Collection removed from video", status: "success" });
//       } else {
//         setMessage({ text: `❌ Failed to remove collection: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       setMessage({ text: `❌ Error removing collection: ${error.message}`, status: "critical" });
//     }
//   };

//   // Exclude product from video (for collections)
//   const excludeProduct = async (videoId, productId) => {
//     try {
//       const response = await fetch("/api/exclude-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoId, productId })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setExcludedMap(prev => {
//           const newMap = new Map(prev);
//           const ex = new Set(newMap.get(videoId) || []);
//           ex.add(productId);
//           newMap.set(videoId, ex);
//           return newMap;
//         });
//         setMessage({ text: "✅ Product excluded from video", status: "success" });
//       } else {
//         setMessage({ text: `❌ Failed to exclude product: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       setMessage({ text: `❌ Error excluding product: ${error.message}`, status: "critical" });
//     }
//   };

//   // Compute effective products for a video
//   const getEffectiveProducts = (videoId) => {
//     const direct = videoProductsMap.get(videoId) || [];
//     const colls = videoCollectionsMap.get(videoId) || [];
//     const collProds = colls.flatMap(c => {
//       const prods = collectionProducts.get(c.shopify_collection_id) || [];
//       return prods.filter(p => !(excludedMap.get(videoId)?.has(p.id) || false));
//     });
//     const allProds = [...direct, ...collProds];
//     const unique = new Map(allProds.map(p => [p.id, p]));
//     return Array.from(unique.values());
//   };

//   // Handle single file drop
//   const handleDrop = useCallback((acceptedFiles) => {
//     const selectedFile = acceptedFiles[0];
//     if (!selectedFile) return;

//     if (selectedFile.size > 100 * 1024 * 1024) {
//       setMessage({ text: "❌ File size must be less than 100MB", status: "critical" });
//       return;
//     }

//     const validTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//       "video/mp4",
//       "video/quicktime",
//     ];
//     if (!validTypes.includes(selectedFile.type)) {
//       setMessage({ text: "❌ Please select a valid image or video file", status: "critical" });
//       return;
//     }

//     setFile(selectedFile);
//     setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
//     setMessage({ text: "", status: "" });
//   }, []);

//   // Bulk File Drop Handler
//   const handleBulkDrop = useCallback((acceptedFiles) => {
//     const validFiles = acceptedFiles.filter(file => {
//       const validTypes = [
//         "image/jpeg", "image/png", "image/gif", "image/webp",
//         "video/mp4", "video/quicktime", "video/x-m4v", "video/avi"
//       ];
      
//       if (!validTypes.includes(file.type)) {
//         return false;
//       }
      
//       if (file.size > 100 * 1024 * 1024) {
//         return false;
//       }
      
//       return true;
//     });

//     // Add files to existing bulk files
//     setBulkFiles(prev => [...prev, ...validFiles.map(file => ({
//       file,
//       title: file.name.replace(/\.[^/.]+$/, ""),
//       status: 'pending',
//       progress: 0
//     }))]);

//     setMessage({ 
//       text: `✅ Added ${validFiles.length} files to upload queue. Total: ${bulkFiles.length + validFiles.length}`, 
//       status: "success" 
//     });
//   }, [bulkFiles.length]);

//   // Remove file from bulk upload list
//   const removeBulkFile = useCallback((index) => {
//     setBulkFiles(prev => prev.filter((_, i) => i !== index));
//   }, []);

//   // Clear all bulk files
//   const clearBulkFiles = useCallback(() => {
//     setBulkFiles([]);
//     setUploadProgress({});
//   }, []);

//   const handleTitleChange = useCallback((value) => setTitle(value), []);

//   // Product selection for upload
//   const productOptions = products.map((p) => ({
//     label: p.title,
//     value: String(p.id),
//   }));

//   const collectionOptions = collections.map((c) => ({
//     label: c.title,
//     value: String(c.id),
//   }));

//   const handleProductSelect = useCallback(
//     (productId) => {
//       const product = products.find((p) => String(p.id) === String(productId));
//       if (product && !selectedProducts.find((p) => p.id === product.id)) {
//         setSelectedProducts((prev) => [...prev, product]);
//       }
//     },
//     [products, selectedProducts]
//   );

//   const handleCollectionSelect = useCallback(
//     (collectionId) => {
//       const collection = collections.find((c) => String(c.id) === String(collectionId));
//       if (collection && !selectedCollections.find((c) => c.id === collection.id)) {
//         setSelectedCollections((prev) => [...prev, collection]);
//       }
//     },
//     [collections, selectedCollections]
//   );

//   const removeProduct = useCallback(
//     (productId) =>
//       setSelectedProducts((prev) =>
//         prev.filter((p) => p.id !== productId)
//       ),
//     []
//   );

//   const removeCollection = useCallback(
//     (collectionId) =>
//       setSelectedCollections((prev) =>
//         prev.filter((c) => c.id !== collectionId)
//       ),
//     []
//   );

//   // Handle select all videos
//   const handleSelectAll = useCallback(() => {
//     if (selectedVideos.length === videos.length) {
//       setSelectedVideos([]);
//     } else {
//       setSelectedVideos(videos.map(v => v.id));
//     }
//   }, [videos, selectedVideos.length]);

//   // Handle individual video selection
//   const handleVideoSelect = useCallback((videoId, checked) => {
//     setSelectedVideos(prev => 
//       checked 
//         ? [...prev, videoId]
//         : prev.filter(id => id !== videoId)
//     );
//   }, []);

//   // Open delete modal
//   const openDeleteModal = () => {
//     if (selectedVideos.length === 0) {
//       setMessage({ text: "⚠️ Please select at least one video to delete", status: "warning" });
//       return;
//     }
//     setDeleteModalOpen(true);
//   };

//   // Close delete modal
//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//   };

//   // Delete selected videos
//   const deleteSelectedVideos = async () => {
//     setDeleting(true);
//     try {
//       const response = await fetch("/api/delete-videos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoIds: selectedVideos }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
//         setSelectedVideos([]);
//         setMessage({ text: `✅ Successfully deleted ${data.deletedCount} video(s)`, status: "success" });
//         closeDeleteModal();
//       } else {
//         setMessage({ text: `❌ Failed to delete videos: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       setMessage({ text: `❌ Failed to delete videos: ${error.message}`, status: "critical" });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // Bulk Upload Handler
//   const handleBulkUpload = async (e) => {
//     e.preventDefault();
    
//     if (bulkFiles.length === 0) {
//       setMessage({ text: "⚠️ Please add files to upload first!", status: "warning" });
//       return;
//     }

//     setIsBulkUploading(true);
//     setMessage({ text: `🚀 Starting bulk upload of ${bulkFiles.length} files...`, status: "info" });

//     const results = {
//       success: 0,
//       failed: 0,
//       errors: []
//     };

//     // Process files in batches to avoid overwhelming the server
//     const BATCH_SIZE = 5; // Upload 5 files at a time
//     const totalBatches = Math.ceil(bulkFiles.length / BATCH_SIZE);

//     for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
//       const startIndex = batchIndex * BATCH_SIZE;
//       const endIndex = Math.min(startIndex + BATCH_SIZE, bulkFiles.length);
//       const batch = bulkFiles.slice(startIndex, endIndex);

//       console.log(`📦 Processing batch ${batchIndex + 1}/${totalBatches} with ${batch.length} files`);

//       // Process each file in the current batch
//       const batchPromises = batch.map(async (bulkFile, indexInBatch) => {
//         const globalIndex = startIndex + indexInBatch;
        
//         try {
//           // Update status to uploading
//           setBulkFiles(prev => prev.map((item, i) => 
//             i === globalIndex ? { ...item, status: 'uploading', progress: 10 } : item
//           ));

//           // 1️⃣ Get staged upload target
//           const initBody = {
//             fileName: bulkFile.file.name,
//             fileSize: bulkFile.file.size,
//             fileType: bulkFile.file.type,
//             title: bulkFile.title,
//           };

//           const initRes = await fetch("/api/upload/init", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(initBody),
//           });

//           const initData = await initRes.json();
//           if (!initRes.ok || !initData.success) {
//             throw new Error(initData.error || "Failed to get upload target");
//           }

//           const { target, resourceType } = initData;

//           // Update progress
//           setBulkFiles(prev => prev.map((item, i) => 
//             i === globalIndex ? { ...item, progress: 30 } : item
//           ));

//           // 2️⃣ Upload file to Shopify S3
//           const s3Form = new FormData();
//           (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
//           s3Form.append("file", bulkFile.file, bulkFile.file.name);

//           const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
//           if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

//           // Update progress
//           setBulkFiles(prev => prev.map((item, i) => 
//             i === globalIndex ? { ...item, progress: 70 } : item
//           ));

//           // 3️⃣ Finalize upload
//           const finalizeRes = await fetch("/api/upload/complete", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               resourceUrl: target.resourceUrl,
//               title: bulkFile.title,
//               resourceType,
//               selectedProducts: [], // Empty for bulk uploads
//               selectedCollections: [], // Empty for bulk uploads
//             }),
//           });

//           const finalizeData = await finalizeRes.json();
          
//           if (!finalizeRes.ok || !finalizeData.success) {
//             throw new Error(finalizeData.error || "Failed to finalize upload");
//           }

//           // Mark as completed
//           setBulkFiles(prev => prev.map((item, i) => 
//             i === globalIndex ? { ...item, status: 'completed', progress: 100 } : item
//           ));

//           results.success++;
          
//           return { success: true, file: bulkFile.file.name };

//         } catch (error) {
//           console.error(`❌ Failed to upload ${bulkFile.file.name}:`, error);
          
//           setBulkFiles(prev => prev.map((item, i) => 
//             i === globalIndex ? { ...item, status: 'failed', error: error.message } : item
//           ));

//           results.failed++;
//           results.errors.push(`${bulkFile.file.name}: ${error.message}`);
          
//           return { success: false, file: bulkFile.file.name, error: error.message };
//         }
//       });

//       // Wait for current batch to complete before proceeding to next batch
//       await Promise.allSettled(batchPromises);

//       // Small delay between batches to avoid rate limiting
//       if (batchIndex < totalBatches - 1) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       }
//     }

//     // Final results
//     setIsBulkUploading(false);
    
//     const resultMessage = `📊 Bulk upload completed: ${results.success} successful, ${results.failed} failed`;
//     setMessage({ 
//       text: resultMessage, 
//       status: results.failed === 0 ? "success" : results.success > 0 ? "warning" : "critical" 
//     });

//     // Reload data if any uploads were successful
//     if (results.success > 0) {
//       setTimeout(() => {
//         loadVideos();
//         loadVideoProducts();
//         loadVideoCollections();
//         loadExcludedProducts();
//       }, 2000);
//     }

//     // Show detailed errors if any
//     if (results.errors.length > 0) {
//       console.error("Upload errors:", results.errors);
//     }
//   };

//   const ProductCarousel = ({ products, videoId, onDelete, type }) => {
//     if (!products || products.length === 0) return null;
  
//     return (
//       <Box
//         padding="200"
//         background="bg-surface-secondary"
//         borderRadius="200"
//         marginTop="200"
//       >
//         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
//           {type === 'collection' ? 'Products from Collections' : 'Effective Products'} ({products.length})
//         </Text>
//         <div style={{
//           display: 'flex',
//           gap: '12px',
//           overflowX: 'auto',
//           padding: '8px 4px',
//           scrollbarWidth: 'thin',
//         }}>
//           {products.map((product) => (
//             <Box
//               key={product.id || Math.random()}
//               position="relative"
//               padding="150"
//               background="bg-surface"
//               borderRadius="150"
//               minWidth="100px"
//               maxWidth="120px"
//               style={{
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                 border: '1px solid #e1e3e5',
//               }}
//             >
//               {onDelete && (
//                 <Box position="absolute" top="4px" right="4px">
//                   <Button
//                     size="slim"
//                     icon={<Icon source="CancelSmallMinor" />}
//                     onClick={() => onDelete(videoId, product.id)}
//                     destructive
//                     plain
//                   />
//                 </Box>
//               )}
//               <BlockStack gap="100" align="center">
//                 {product.image_url ? (
//                   <Thumbnail
//                     source={product.image_url}
//                     alt={product.title}
//                     size="small"
//                   />
//                 ) : (
//                   <Box
//                     background="bg-surface-secondary"
//                     padding="200"
//                     borderRadius="100"
//                     minHeight="50px"
//                     minWidth="50px"
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                   >
//                     <Icon source="ProductMajor" tone="subdued" />
//                   </Box>
//                 )}
//                 <Text variant="bodySm" alignment="center" truncate>
//                   {product.title || 'Untitled Product'}
//                 </Text>
//                 <Text variant="bodySm" fontWeight="bold" tone="success">
//                   {product.price || '0.00'} {product.currency_code || ''}
//                 </Text>
//               </BlockStack>
//             </Box>
//           ))}
//         </div>
//       </Box>
//     );
//   };

//   const CollectionsSection = ({ collections, videoId }) => {
//     if (!collections || collections.length === 0) return null;

//     return (
//       <Box
//         padding="200"
//         background="bg-surface-secondary"
//         borderRadius="200"
//         marginTop="200"
//       >
//         <Text variant="bodySm" fontWeight="medium" marginBottom="200">
//           Associated Collections ({collections.length})
//         </Text>
//         <BlockStack gap="200">
//           {collections.map((collection) => {
//             const prods = (collectionProducts.get(collection.shopify_collection_id) || []).filter(
//               p => !(excludedMap.get(videoId)?.has(p.id) || false)
//             );
//             return (
//               <Card key={collection.id} padding="200">
//                 <InlineStack align="space-between" blockAlign="center">
//                   <InlineStack gap="200" blockAlign="center">
//                     {collection.image_url ? (
//                       <Thumbnail source={collection.image_url} alt={collection.title} size="small" />
//                     ) : (
//                       <Icon source="CollectionMajor" tone="subdued" />
//                     )}
//                     <Text variant="bodyMd" fontWeight="medium">
//                       {collection.title}
//                     </Text>
//                   </InlineStack>
//                   <Button
//                     destructive
//                     plain
//                     icon={<Icon source="DeleteMinor" />}
//                     onClick={() => deleteVideoCollection(videoId, collection.id)}
//                   >
//                     Remove Collection
//                   </Button>
//                 </InlineStack>
//                 <ProductCarousel
//                   products={prods}
//                   videoId={videoId}
//                   onDelete={excludeProduct}
//                   type="collection"
//                 />
//               </Card>
//             );
//           })}
//         </BlockStack>
//       </Box>
//     );
//   };

//   // FIXED: Open product modal with current selections preserved
//   const openProductModal = async (video) => {
//     try {
//       setSelectedVideo(video);
//       setProductModalOpen(true);
//       setProductsLoading(true);

//       // Load fresh products list
//       const response = await fetch("/api/viewproducts");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.products || []);
        
//         // Get current product associations for this video
//         const currentProducts = videoProductsMap.get(video.id) || [];
        
//         // Convert to array of product IDs (as strings)
//         const currentProductIds = currentProducts.map(p => String(p.id));
//         setTempSelectedProducts(currentProductIds);
        
//         console.log("🔄 Loaded current product selections:", {
//           videoId: video.id,
//           currentProducts: currentProducts.length,
//           selectedIds: currentProductIds
//         });
//       } else {
//         setMessage({ text: `❌ Failed to load products: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Error opening product modal:", error);
//       setMessage({ text: "❌ Failed to load products from your store", status: "critical" });
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   const closeProductModal = () => {
//     setProductModalOpen(false);
//     setSelectedVideo(null);
//     setTempSelectedProducts([]);
//   };

//   const handleTempProductSelect = useCallback((productIds) => {
//     setTempSelectedProducts(productIds);
//   }, []);

//   // FIXED: Update video products with immediate state update
//   const updateVideoProducts = async () => {
//     if (!selectedVideo) return;

//     setUpdatingProducts(true);
//     try {
//       const response = await fetch("/api/saveproducts-database", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           videoId: selectedVideo.id,
//           productIds: tempSelectedProducts
//         }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         // Immediately update the local state with the new products
//         const updatedProducts = data.video?.videoProducts?.map(vp => vp.product) || [];
        
//         setVideoProductsMap(prev => {
//           const newMap = new Map(prev);
//           newMap.set(selectedVideo.id, updatedProducts);
//           return newMap;
//         });
        
//         setMessage({ text: "✅ Products updated successfully!", status: "success" });
//         closeProductModal();
        
//         // Also reload the video products to ensure everything is in sync
//         setTimeout(() => {
//           loadVideoProducts();
//         }, 500);
        
//       } else {
//         setMessage({ text: `❌ Failed to update products: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       setMessage({ text: `❌ Failed to update products: ${error.message}`, status: "critical" });
//     } finally {
//       setUpdatingProducts(false);
//     }
//   };

//   const openCollectionModal = async (video) => {
//     try {
//       setSelectedVideo(video);
//       setCollectionModalOpen(true);
//       setCollectionsLoading(true);

//       const response = await fetch("/api/viewcollections");
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (data.success) {
//         setCollections(data.collections || []);
//         const currentCollectionIds = (videoCollectionsMap.get(video.id) || []).map(c => String(c.shopify_collection_id));
//         setTempSelectedCollections(currentCollectionIds);
//       } else {
//         setMessage({ text: `❌ Failed to load collections: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Error opening collection modal:", error);
//       setMessage({ text: "❌ Failed to load collections from your store", status: "critical" });
//     } finally {
//       setCollectionsLoading(false);
//     }
//   };

//   const closeCollectionModal = () => {
//     setCollectionModalOpen(false);
//     setSelectedVideo(null);
//     setTempSelectedCollections([]);
//   };

//   const handleTempCollectionSelect = useCallback((collectionIds) => {
//     setTempSelectedCollections(collectionIds);
//   }, []);

//   const updateVideoCollections = async () => {
//     if (!selectedVideo) return;

//     setUpdatingCollections(true);
//     try {
//       const response = await fetch("/api/savecollections-database", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           videoId: selectedVideo.id,
//           collectionIds: tempSelectedCollections
//         }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setVideoCollectionsMap(prev => {
//           const newMap = new Map(prev);
//           newMap.set(selectedVideo.id, data.video.collections || []);
//           return newMap;
//         });
//         setMessage({ text: "✅ Collections updated successfully!", status: "success" });
//         closeCollectionModal();
//       } else {
//         setMessage({ text: `❌ Failed to update collections: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       setMessage({ text: `❌ Failed to update collections: ${error.message}`, status: "critical" });
//     } finally {
//       setUpdatingCollections(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage({ text: "⚠️ Please select a file first!", status: "warning" });
//       return;
//     }

//     setIsUploading(true);
//     setMessage({ text: "⏳ Preparing upload...", status: "info" });

//     try {
//       // 1️⃣ Get staged upload target from server
//       const initBody = {
//         fileName: file.name,
//         fileSize: file.size,
//         fileType: file.type,
//         title,
//       };
//       const initRes = await fetch("/api/upload/init", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(initBody),
//       });

//       const initData = await initRes.json();
//       if (!initRes.ok || !initData.success) {
//         throw new Error(initData.error || "Failed to get upload target");
//       }

//       const { target, resourceType } = initData;
//       setMessage({ text: "⏳ Uploading file to Shopify storage...", status: "info" });

//       // 2️⃣ Upload file directly to Shopify S3
//       const s3Form = new FormData();
//       (target.parameters || []).forEach((p) => s3Form.append(p.name, p.value));
//       s3Form.append("file", file, file.name);

//       const s3Resp = await fetch(target.url, { method: "POST", body: s3Form });
//       if (!s3Resp.ok) throw new Error("Upload to Shopify storage failed");

//       // 3️⃣ Finalize & save metadata to DB
//       setMessage({ text: "⏳ Finalizing upload with Shopify...", status: "info" });

//       const finalizeRes = await fetch("/api/upload/complete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           resourceUrl: target.resourceUrl,
//           title,
//           resourceType,
//           selectedProducts: selectedProducts.map((p) => String(p.id)),
//           selectedCollections: selectedCollections.map((c) => String(c.id)),
//         }),
//       });

//       const finalizeData = await finalizeRes.json();
      
//       if (!finalizeRes.ok || !finalizeData.success) {
//         throw new Error(finalizeData.error || "Failed to finalize upload");
//       }

//       setMessage({ text: "✅ File uploaded successfully!", status: "success" });
//       setFile(null);
//       setTitle("");
//       setSelectedProducts([]);
//       setSelectedCollections([]);
      
//       // Reload data
//       setTimeout(() => {
//         loadVideos();
//         loadVideoProducts();
//         loadVideoCollections();
//         loadExcludedProducts();
//       }, 1000);
      
//     } catch (err) {
//       const errorMsg =
//         err.name === "AbortError"
//           ? "❌ Upload timed out. Please try again."
//           : `❌ Upload failed: ${err.message}`;
//       setMessage({ text: errorMsg, status: "critical" });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeFile = useCallback(() => {
//     setFile(null);
//     setTitle("");
//     setMessage({ text: "", status: "" });
//   }, []);

//   // Video Player Component
//   const VideoPlayer = ({ video }) => {
//     const videoRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showControls, setShowControls] = useState(false);
//     const [isMuted, setIsMuted] = useState(true);

//     // Auto-play video when component mounts
//     useEffect(() => {
//       if (videoRef.current && video.shopify_file_url) {
//         const playVideo = async () => {
//           try {
//             videoRef.current.loop = true;
//             videoRef.current.muted = true;
//             await videoRef.current.play();
//             setIsPlaying(true);
//           } catch (error) {
//             console.log("Auto-play failed, waiting for user interaction");
//           }
//         };
        
//         playVideo();
//       }
//     }, [video.shopify_file_url]);

//     const togglePlay = () => {
//       if (videoRef.current) {
//         if (isPlaying) {
//           videoRef.current.pause();
//         } else {
//           videoRef.current.play();
//         }
//         setIsPlaying(!isPlaying);
//       }
//     };

//     const toggleMute = (e) => {
//       e.stopPropagation();
//       if (videoRef.current) {
//         videoRef.current.muted = !videoRef.current.muted;
//         setIsMuted(!isMuted);
//       }
//     };

//     const handleMouseEnter = () => {
//       setShowControls(true);
//     };

//     const handleMouseLeave = () => {
//       setShowControls(false);
//     };

//     const handleVideoClick = () => {
//       togglePlay();
//     };

//     if (!video.shopify_file_url) {
//       return (
//         <Box
//           background="bg-surface-secondary"
//           padding="400"
//           width="100%"
//           height="180px"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           borderRadius="200"
//         >
//           <Text tone="subdued" alignment="center">
//             🎬<br />No Video URL
//           </Text>
//         </Box>
//       );
//     }

//     return (
//       <Box
//         position="relative"
//         width="100%"
//         height="180px"
//         maxWidth="240px"
//         margin="0 auto"
//         overflow="hidden"
//         borderRadius="200"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onClick={handleVideoClick}
//         style={{ cursor: 'pointer' }}
//       >
//         <video
//           ref={videoRef}
//           src={video.shopify_file_url}
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             borderRadius: '8px',
//             backgroundColor: '#000'
//           }}
//           muted={isMuted}
//           loop
//           playsInline
//           preload="auto"
//         />
        
//         {/* Controls Container - Top Right Corner */}
//         {showControls && (
//           <Box position="absolute" top="8px" right="8px">
//             <InlineStack gap="100" align="center">
//               <Badge tone={isPlaying ? "success" : "subdued"} size="small">
//                 {isPlaying ? "🔴 Live" : "⏸️ Paused"}
//               </Badge>
//               <Button
//                 size="slim"
//                 variant="primary"
//                 onClick={toggleMute}
//                 icon={isMuted ? <Icon source="MuteMinor" /> : <Icon source="SoundMajor" />}
//               />
//             </InlineStack>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   return (
//     <Page
//       title="Video Carousel Manager"
//       primaryAction={{
//         content: "Refresh Videos",
//         onAction: () => {
//           loadVideos();
//           loadVideoProducts();
//           loadVideoCollections();
//           loadExcludedProducts();
//         },
//         disabled: isUploading || isBulkUploading
//       }}
//     >
//       {/* Delete Confirmation Modal */}
//       <Modal
//         open={deleteModalOpen}
//         onClose={closeDeleteModal}
//         title="Delete Videos"
//         primaryAction={{
//           content: "Delete Videos",
//           onAction: deleteSelectedVideos,
//           loading: deleting,
//           destructive: true,
//         }}
//         secondaryActions={[
//           {
//             content: "Cancel",
//             onAction: closeDeleteModal,
//           },
//         ]}
//       >
//         <Modal.Section>
//           <BlockStack gap="400">
//             <Text variant="bodyMd" as="p">
//               Are you sure you want to delete {selectedVideos.length} selected video(s)? This action cannot be undone.
//             </Text>
//             <Text variant="bodySm" tone="subdued">
//               All associated product and collection links will also be removed.
//             </Text>
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

//       {/* Product Selection Modal */}
//       <Modal
//         open={productModalOpen}
//         onClose={closeProductModal}
//         title={`Select Products for "${selectedVideo?.title}"`}
//         primaryAction={{
//           content: "Save Products",
//           onAction: updateVideoProducts,
//           loading: updatingProducts,
//         }}
//         secondaryActions={[
//           {
//             content: "Cancel",
//             onAction: closeProductModal,
//           },
//         ]}
//         size="large"
//       >
//         <Modal.Section>
//           <BlockStack gap="400">
//             <Text variant="bodyMd" tone="subdued">
//               Choose products from your store to associate with this video. Selected products will be preserved when you reopen this modal.
//             </Text>
            
//             {productsLoading ? (
//               <Box padding="400" alignment="center">
//                 <Spinner size="small" />
//                 <Text variant="bodySm" tone="subdued">Loading products...</Text>
//               </Box>
//             ) : products.length === 0 ? (
//               <EmptyState heading="No products available">
//                 <Text variant="bodyMd" as="p">
//                   No products found in your store.
//                 </Text>
//               </EmptyState>
//             ) : (
//               <Box>
//                 <InlineStack align="space-between" blockAlign="center" marginBottom="200">
//                   <Text variant="bodySm" fontWeight="medium">
//                     All Products ({products.length}):
//                   </Text>
//                   <Text variant="bodySm" tone="subdued">
//                     {tempSelectedProducts.length} product(s) selected
//                   </Text>
//                 </InlineStack>
//                 <div style={{
//                   maxHeight: '400px',
//                   overflowY: 'auto',
//                   border: '1px solid var(--p-border-subdued)',
//                   borderRadius: '8px',
//                   padding: '12px'
//                 }}>
//                   <BlockStack gap="200">
//                     {products.map((product) => (
//                       <Card
//                         key={product.id}
//                         padding="200"
//                         style={{
//                           border: tempSelectedProducts.includes(String(product.id))
//                             ? '2px solid var(--p-border-success)'
//                             : '1px solid var(--p-border-subdued)',
//                           background: tempSelectedProducts.includes(String(product.id))
//                             ? 'var(--p-surface-success-subdued)'
//                             : 'var(--p-surface)',
//                         }}
//                       >
//                         <InlineStack gap="200" blockAlign="center">
//                           <Checkbox
//                             label=""
//                             labelHidden
//                             checked={tempSelectedProducts.includes(String(product.id))}
//                             onChange={(checked) => {
//                               const productId = String(product.id);
//                               setTempSelectedProducts((prev) =>
//                                 checked
//                                   ? [...prev, productId]
//                                   : prev.filter((id) => id !== productId)
//                               );
//                             }}
//                             disabled={updatingProducts}
//                           />
//                           {product.image_url ? (
//                             <Thumbnail
//                               source={product.image_url}
//                               alt={product.title}
//                               size="small"
//                             />
//                           ) : (
//                             <Box
//                               background="bg-surface-secondary"
//                               padding="200"
//                               borderRadius="100"
//                               minHeight="40px"
//                               minWidth="40px"
//                               display="flex"
//                               alignItems="center"
//                               justifyContent="center"
//                             >
//                               <Icon source="ProductMajor" tone="subdued" />
//                             </Box>
//                           )}
//                           <BlockStack gap="050" style={{ flex: 1 }}>
//                             <Text variant="bodySm" fontWeight="medium" truncate>
//                               {product.title || 'Untitled Product'}
//                             </Text>
//                             <Text variant="bodySm" tone="subdued">
//                               {product.price || '0.00'} {product.currency_code || ''}
//                             </Text>
//                             {product.shopify_variant_id && (
//                               <Text variant="bodySm" tone="subdued">
//                                 Variant: {product.shopify_variant_id}
//                               </Text>
//                             )}
//                           </BlockStack>
//                         </InlineStack>
//                       </Card>
//                     ))}
//                   </BlockStack>
//                 </div>
//               </Box>
//             )}
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

//       {/* Collection Selection Modal */}
//       <Modal
//         open={collectionModalOpen}
//         onClose={closeCollectionModal}
//         title={`Select Collections for "${selectedVideo?.title}"`}
//         primaryAction={{
//           content: "Save Collections",
//           onAction: updateVideoCollections,
//           loading: updatingCollections,
//         }}
//         secondaryActions={[
//           {
//             content: "Cancel",
//             onAction: closeCollectionModal,
//           },
//         ]}
//         size="large"
//       >
//         <Modal.Section>
//           <BlockStack gap="400">
//             <Text variant="bodyMd" tone="subdued">
//               Choose collections from your store to associate with this video.
//             </Text>
            
//             {collectionsLoading ? (
//               <Box padding="400" alignment="center">
//                 <Spinner size="small" />
//                 <Text variant="bodySm" tone="subdued">Loading collections...</Text>
//               </Box>
//             ) : collections.length === 0 ? (
//               <EmptyState heading="No collections available">
//                 <Text variant="bodyMd" as="p">
//                   No collections found in your store.
//                 </Text>
//               </EmptyState>
//             ) : (
//               <Box>
//                 <Text variant="bodySm" fontWeight="medium" marginBottom="200">
//                   All Collections ({collections.length}):
//                 </Text>
//                 <div style={{
//                   maxHeight: '400px',
//                   overflowY: 'auto',
//                   border: '1px solid var(--p-border-subdued)',
//                   borderRadius: '8px',
//                   padding: '12px'
//                 }}>
//                   <BlockStack gap="200">
//                     {collections.map((collection) => (
//                       <Card
//                         key={collection.id}
//                         padding="200"
//                         style={{
//                           border: tempSelectedCollections.includes(String(collection.id))
//                             ? '2px solid var(--p-border-success)'
//                             : '1px solid var(--p-border-subdued)',
//                           background: tempSelectedCollections.includes(String(collection.id))
//                             ? 'var(--p-surface-success-subdued)'
//                             : 'var(--p-surface)',
//                         }}
//                       >
//                         <InlineStack gap="200" blockAlign="center">
//                           <Checkbox
//                             label=""
//                             labelHidden
//                             checked={tempSelectedCollections.includes(String(collection.id))}
//                             onChange={(checked) => {
//                               const collectionId = String(collection.id);
//                               setTempSelectedCollections((prev) =>
//                                 checked
//                                   ? [...prev, collectionId]
//                                   : prev.filter((id) => id !== collectionId)
//                               );
//                             }}
//                             disabled={updatingCollections}
//                           />
//                           {collection.image_url ? (
//                             <Thumbnail
//                               source={collection.image_url}
//                               alt={collection.title}
//                               size="small"
//                             />
//                           ) : (
//                             <Box
//                               background="bg-surface-secondary"
//                               padding="200"
//                               borderRadius="100"
//                               minHeight="40px"
//                               minWidth="40px"
//                               display="flex"
//                               alignItems="center"
//                               justifyContent="center"
//                             >
//                               <Icon source="CollectionMajor" tone="subdued" />
//                             </Box>
//                           )}
//                           <Text variant="bodySm" fontWeight="medium" truncate>
//                             {collection.title || 'Untitled Collection'}
//                           </Text>
//                         </InlineStack>
//                       </Card>
//                     ))}
//                   </BlockStack>
//                 </div>
//                 <Text variant="bodySm" tone="subdued" marginTop="200">
//                   {tempSelectedCollections.length} collection(s) selected
//                 </Text>
//               </Box>
//             )}
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

//       <Layout>
//         {/* Upload Section */}
//         <Layout.Section>
//           <Card>
//             <BlockStack gap="400">
//               <Text variant="headingLg" as="h2">Upload Videos</Text>
              
//               {message.text && (
//                 <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
//                   {message.text}
//                 </Banner>
//               )}

//               {/* Single File Upload */}
//               <Box padding="400" background="bg-surface-secondary" borderRadius="200">
//                 <Text variant="headingSm" as="h3" marginBottom="200">Single Upload</Text>
//                 <form onSubmit={handleSubmit}>
//                   <FormLayout>
//                     {!file ? (
//                       <DropZone
//                         onDrop={handleDrop}
//                         accept="image/*,video/*"
//                         type="file"
//                         label="Media file"
//                         disabled={isUploading || isBulkUploading}
//                       >
//                         <DropZone.FileUpload />
//                       </DropZone>
//                     ) : (
//                       <BlockStack gap="200">
//                         <InlineStack gap="200" align="center" blockAlign="center">
//                           <Thumbnail
//                             source={file.type.startsWith("image") ? URL.createObjectURL(file) : ""}
//                             alt={file.name}
//                             size="small"
//                           />
//                           <BlockStack gap="100">
//                             <Text variant="bodyMd" as="p" fontWeight="medium">
//                               {file.name}
//                             </Text>
//                             <Text variant="bodySm" as="p" tone="subdued">
//                               {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
//                             </Text>
//                           </BlockStack>
//                           <Button onClick={removeFile} disabled={isUploading || isBulkUploading}>
//                             Remove
//                           </Button>
//                         </InlineStack>
//                       </BlockStack>
//                     )}

//                     <TextField
//                       label="Title"
//                       value={title}
//                       onChange={handleTitleChange}
//                       autoComplete="off"
//                       disabled={isUploading || isBulkUploading}
//                       helpText="A descriptive title for your video"
//                     />

//                     <Select
//                       label="Add Products to Video"
//                       options={productOptions}
//                       onChange={handleProductSelect}
//                       disabled={isUploading || isBulkUploading}
//                       placeholder="Select products to associate with this video"
//                     />

//                     {selectedProducts.length > 0 && (
//                       <BlockStack gap="200">
//                         <Text variant="bodyMd" fontWeight="semibold">
//                           Selected Products ({selectedProducts.length})
//                         </Text>
//                         <List>
//                           {selectedProducts.map((product) => (
//                             <List.Item key={product.id}>
//                               <InlineStack align="space-between" blockAlign="center">
//                                 <Text>{product.title}</Text>
//                                 <Button
//                                   destructive
//                                   size="slim"
//                                   onClick={() => removeProduct(product.id)}
//                                   disabled={isUploading || isBulkUploading}
//                                 >
//                                   Remove
//                                 </Button>
//                               </InlineStack>
//                             </List.Item>
//                           ))}
//                         </List>
//                       </BlockStack>
//                     )}

//                     <Select
//                       label="Add Collections to Video"
//                       options={collectionOptions}
//                       onChange={handleCollectionSelect}
//                       disabled={isUploading || isBulkUploading}
//                       placeholder="Select collections to associate with this video"
//                     />

//                     {selectedCollections.length > 0 && (
//                       <BlockStack gap="200">
//                         <Text variant="bodyMd" fontWeight="semibold">
//                           Selected Collections ({selectedCollections.length})
//                         </Text>
//                         <List>
//                           {selectedCollections.map((collection) => (
//                             <List.Item key={collection.id}>
//                               <InlineStack align="space-between" blockAlign="center">
//                                 <Text>{collection.title}</Text>
//                                 <Button
//                                   destructive
//                                   size="slim"
//                                   onClick={() => removeCollection(collection.id)}
//                                   disabled={isUploading || isBulkUploading}
//                                 >
//                                   Remove
//                                 </Button>
//                               </InlineStack>
//                             </List.Item>
//                           ))}
//                         </List>
//                       </BlockStack>
//                     )}

//                     <Button 
//                       primary 
//                       submit 
//                       loading={isUploading} 
//                       disabled={!file || isUploading || isBulkUploading}
//                       size="large"
//                     >
//                       {isUploading ? "Uploading..." : "Upload Single Video"}
//                     </Button>
//                   </FormLayout>
//                 </form>
//               </Box>

//               {/* Bulk Upload Section */}
//               <Box padding="400" background="bg-surface-secondary" borderRadius="200">
//                 <Text variant="headingSm" as="h3" marginBottom="200">Bulk Upload (100+ Videos)</Text>
                
//                 <BlockStack gap="300">
//                   <DropZone
//                     onDrop={handleBulkDrop}
//                     accept="image/*,video/*"
//                     type="file"
//                     label="Select multiple media files"
//                     allowMultiple
//                     disabled={isBulkUploading}
//                   >
//                     <DropZone.FileUpload />
//                   </DropZone>

//                   {bulkFiles.length > 0 && (
//                     <BlockStack gap="200">
//                       <InlineStack align="space-between" blockAlign="center">
//                         <Text variant="bodyMd" fontWeight="semibold">
//                           Upload Queue ({bulkFiles.length} files)
//                         </Text>
//                         <Button 
//                           onClick={clearBulkFiles} 
//                           disabled={isBulkUploading}
//                           variant="plain"
//                           destructive
//                         >
//                           Clear All
//                         </Button>
//                       </InlineStack>

//                       <Box
//                         maxHeight="300px"
//                         overflowY="auto"
//                         padding="200"
//                         background="bg-surface"
//                         borderRadius="200"
//                         border="divider"
//                       >
//                         <BlockStack gap="100">
//                           {bulkFiles.map((bulkFile, index) => (
//                             <Card key={index} padding="200">
//                               <InlineStack align="space-between" blockAlign="center">
//                                 <InlineStack gap="200" blockAlign="center">
//                                   <Thumbnail
//                                     source={bulkFile.file.type.startsWith("image") ? URL.createObjectURL(bulkFile.file) : ""}
//                                     alt={bulkFile.file.name}
//                                     size="small"
//                                   />
//                                   <BlockStack gap="050">
//                                     <Text variant="bodySm" fontWeight="medium">
//                                       {bulkFile.title}
//                                     </Text>
//                                     <Text variant="bodySm" tone="subdued">
//                                       {(bulkFile.file.size / 1024 / 1024).toFixed(2)} MB
//                                     </Text>
//                                   </BlockStack>
//                                 </InlineStack>
                                
//                                 <InlineStack gap="100" blockAlign="center">
//                                   {/* Status Badge */}
//                                   {bulkFile.status === 'completed' && (
//                                     <Badge tone="success">Completed</Badge>
//                                   )}
//                                   {bulkFile.status === 'uploading' && (
//                                     <Badge tone="attention">Uploading {bulkFile.progress}%</Badge>
//                                   )}
//                                   {bulkFile.status === 'failed' && (
//                                     <Badge tone="critical">Failed</Badge>
//                                   )}
//                                   {bulkFile.status === 'pending' && (
//                                     <Badge tone="subdued">Pending</Badge>
//                                   )}
                                  
//                                   <Button
//                                     size="slim"
//                                     destructive
//                                     onClick={() => removeBulkFile(index)}
//                                     disabled={isBulkUploading}
//                                     icon={<Icon source="DeleteMinor" />}
//                                   >
//                                     Remove
//                                   </Button>
//                                 </InlineStack>
//                               </InlineStack>

//                               {/* Progress Bar */}
//                               {bulkFile.status === 'uploading' && (
//                                 <Box marginTop="100">
//                                   <div style={{
//                                     width: '100%',
//                                     height: '4px',
//                                     backgroundColor: 'var(--p-border-subdued)',
//                                     borderRadius: '2px',
//                                     overflow: 'hidden'
//                                   }}>
//                                     <div style={{
//                                       width: `${bulkFile.progress}%`,
//                                       height: '100%',
//                                       backgroundColor: 'var(--p-interactive)',
//                                       transition: 'width 0.3s ease'
//                                     }} />
//                                   </div>
//                                 </Box>
//                               )}

//                               {/* Error Message */}
//                               {bulkFile.status === 'failed' && bulkFile.error && (
//                                 <Box marginTop="100">
//                                   <Text variant="bodySm" tone="critical">
//                                     Error: {bulkFile.error}
//                                   </Text>
//                                 </Box>
//                               )}
//                             </Card>
//                           ))}
//                         </BlockStack>
//                       </Box>

//                       <Button 
//                         primary 
//                         onClick={handleBulkUpload}
//                         loading={isBulkUploading}
//                         disabled={isBulkUploading || bulkFiles.length === 0}
//                         size="large"
//                       >
//                         {isBulkUploading ? `Uploading... (${bulkFiles.filter(f => f.status === 'completed').length}/${bulkFiles.length})` : `Start Bulk Upload (${bulkFiles.length} files)`}
//                       </Button>

//                       {isBulkUploading && (
//                         <Box>
//                           <Text variant="bodySm" tone="subdued">
//                             📦 Uploading in batches of 5 files. Do not close this page.
//                           </Text>
//                         </Box>
//                       )}
//                     </BlockStack>
//                   )}
//                 </BlockStack>
//               </Box>
//             </BlockStack>
//           </Card>
//         </Layout.Section>

//         {/* Uploaded Videos Section */}
//         <Layout.Section>
//           <Card>
//             <BlockStack gap="400">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="headingLg" as="h2">
//                   Your Videos ({videos.length})
//                 </Text>
//                 <InlineStack gap="200">
//                   {selectedVideos.length > 0 && (
//                     <Button 
//                       destructive 
//                       onClick={openDeleteModal}
//                       disabled={loading || isBulkUploading}
//                       icon={<Icon source="DeleteMinor" />}
//                     >
//                       Delete Selected ({selectedVideos.length})
//                     </Button>
//                   )}
//                   <Button 
//                     onClick={() => {
//                       loadVideos();
//                       loadVideoProducts();
//                       loadVideoCollections();
//                       loadExcludedProducts();
//                     }} 
//                     disabled={loading || isBulkUploading}
//                   >
//                     Refresh
//                   </Button>
//                 </InlineStack>
//               </InlineStack>

//               {loading ? (
//                 <Box padding="800" alignment="center">
//                   <Spinner accessibilityLabel="Loading videos" size="large" />
//                   <Text alignment="center" tone="subdued" variant="bodyMd">
//                     Loading your videos...
//                   </Text>
//                 </Box>
//               ) : videos.length === 0 ? (
//                 <EmptyState
//                   heading="No videos yet"
//                   image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
//                 >
//                   <Text variant="bodyMd" as="p">
//                     Upload your first video to get started.
//                   </Text>
//                 </EmptyState>
//               ) : (
//                 <div style={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: '20px',
//                   justifyContent: 'flex-start'
//                 }}>
//                   {/* Select All Checkbox */}
//                   <div style={{ 
//                     width: '100%', 
//                     padding: '12px 16px',
//                     background: 'var(--p-surface-subdued)',
//                     borderRadius: '8px',
//                     border: '1px solid var(--p-border-subdued)'
//                   }}>
//                     <Checkbox
//                       label={`Select all ${videos.length} videos`}
//                       checked={selectedVideos.length === videos.length && videos.length > 0}
//                       onChange={handleSelectAll}
//                       disabled={isBulkUploading}
//                     />
//                   </div>

//                   {videos.map((video) => {
//                     const effectiveProducts = getEffectiveProducts(video.id);
//                     const collections = videoCollectionsMap.get(video.id) || [];

//                     return (
//                       <div key={video.id} style={{
//                         flex: '0 0 calc(33.333% - 13.33px)',
//                         minWidth: '280px',
//                         boxSizing: 'border-box',
//                         position: 'relative'
//                       }}>
//                         <Card 
//                           padding="300"
//                           style={{
//                             border: selectedVideos.includes(video.id) 
//                               ? '2px solid var(--p-border-critical)' 
//                               : '1px solid var(--p-border-subdued)',
//                             transition: 'all 0.2s ease',
//                             background: selectedVideos.includes(video.id)
//                               ? 'var(--p-surface-critical-subdued)'
//                               : 'var(--p-surface)'
//                           }}
//                         >
//                           <BlockStack gap="300">
//                             {/* Video Selection Checkbox */}
//                             <Box position="absolute" top="12px" left="12px" zIndex="100">
//                               <Checkbox
//                                 label=""
//                                 labelHidden
//                                 checked={selectedVideos.includes(video.id)}
//                                 onChange={(checked) => handleVideoSelect(video.id, checked)}
//                                 disabled={isBulkUploading}
//                               />
//                             </Box>

//                             {/* Video Player */}
//                             <VideoPlayer video={video} />
                            
//                             {/* Effective Products Carousel */}
//                             <ProductCarousel
//                               products={effectiveProducts}
//                               videoId={video.id}
//                               onDelete={deleteVideoProduct}
//                             />

//                             {/* Collections Section */}
//                             <CollectionsSection collections={collections} videoId={video.id} />

//                             {/* Video Info */}
//                             <BlockStack gap="200">
//                               <Text variant="bodyMd" fontWeight="bold" alignment="center" truncate>
//                                 {video.title}
//                               </Text>
                              
//                               <InlineStack gap="100" align="center" blockAlign="center">
//                                 <Badge tone="success" size="small">
//                                   {effectiveProducts.length} products
//                                 </Badge>
//                                 <Badge tone="info" size="small">
//                                   {collections.length} collections
//                                 </Badge>
//                                 <Badge tone="subdued" size="small">
//                                   {new Date(video.created_at).toLocaleDateString()}
//                                 </Badge>
//                               </InlineStack>

//                               <BlockStack gap="100">
//                                 <Button
//                                   fullWidth
//                                   size="slim"
//                                   onClick={() => openProductModal(video)}
//                                   disabled={selectedVideos.length > 0 || isBulkUploading}
//                                 >
//                                   Manage Products
//                                 </Button>
//                                 <Button
//                                   fullWidth
//                                   size="slim"
//                                   onClick={() => openCollectionModal(video)}
//                                   disabled={selectedVideos.length > 0 || isBulkUploading}
//                                 >
//                                   Manage Collections
//                                 </Button>

//                                 <InlineStack gap="100" align="center">
//                                   {video.shopify_file_url && (
//                                     <Button
//                                       fullWidth
//                                       size="slim"
//                                       variant="secondary"
//                                       onClick={() => window.open(video.shopify_file_url, '_blank')}
//                                       disabled={selectedVideos.length > 0 || isBulkUploading}
//                                     >
//                                       View Original
//                                     </Button>
//                                   )}
                                  
//                                   {/* Individual Delete Button */}
//                                   <Button
//                                     size="slim"
//                                     variant="plain"
//                                     destructive
//                                     onClick={() => {
//                                       setSelectedVideos([video.id]);
//                                       setDeleteModalOpen(true);
//                                     }}
//                                     disabled={(selectedVideos.length > 0 && !selectedVideos.includes(video.id)) || isBulkUploading}
//                                     icon={<Icon source="DeleteMinor" />}
//                                   />
//                                 </InlineStack>
//                               </BlockStack>
//                             </BlockStack>
//                           </BlockStack>
//                         </Card>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </BlockStack>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }




// import { useState, useEffect } from "react";
// import {
//   Page,
//   Card,
//   Banner,
//   BlockStack,
//   Text,
//   InlineStack,
//   Badge,
//   Layout,
//   Box,
//   Spinner,
//   EmptyState,
//   Button,
//   Icon,
//   Checkbox,
// } from "@shopify/polaris";
// import VideoPlayer from "../components/VideoPlayer";
// import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
// import VideoDetailsModal from "../components/VideoDetailsModal";

// export const loader = async () => null;

// export default function Home() {
//   const [videos, setVideos] = useState([]);
//   const [videoProductsMap, setVideoProductsMap] = useState(new Map());
//   const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
//   const [collectionProducts, setCollectionProducts] = useState(new Map());
//   const [excludedMap, setExcludedMap] = useState(new Map());
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: "", status: "" });
//   const [selectedVideos, setSelectedVideos] = useState([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   // New modal state
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [selectedVideoForDetails, setSelectedVideoForDetails] = useState(null);

//   useEffect(() => {
//     loadVideos();
//     loadVideoProducts();
//     loadVideoCollections();
//     loadExcludedProducts();
//   }, []);

//   useEffect(() => {
//     const fetchMissingCollectionProducts = async () => {
//       const uniqueShopifyIds = new Set();
//       videoCollectionsMap.forEach(colls => {
//         colls.forEach(c => uniqueShopifyIds.add(c.shopify_collection_id));
//       });

//       for (const shopifyId of uniqueShopifyIds) {
//         if (!collectionProducts.has(shopifyId)) {
//           try {
//             const response = await fetch(`/api/collection-products?collectionId=${encodeURIComponent(shopifyId)}`);
//             const data = await response.json();
//             if (data.success) {
//               setCollectionProducts(prev => new Map(prev).set(shopifyId, data.products));
//             }
//           } catch (error) {
//             console.error(`Failed to load products for collection ${shopifyId}:`, error);
//           }
//         }
//       }
//     };

//     if (videoCollectionsMap.size > 0) {
//       fetchMissingCollectionProducts();
//     }
//   }, [videoCollectionsMap, collectionProducts]);

//   const loadVideos = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/videos");
//       const data = await response.json();
//       if (data.success) {
//         setVideos(data.videos || []);
//         setSelectedVideos([]);
//       } else {
//         setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Failed to load videos:", error);
//       setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadVideoProducts = async () => {
//     try {
//       const response = await fetch("/api/showproducts-onvideos");
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
//         setVideoProductsMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load video products: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Failed to load video products:", error);
//       setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
//     }
//   };

//   const loadVideoCollections = async () => {
//     try {
//       const response = await fetch("/api/showcollections-onvideos");
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
//         setVideoCollectionsMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load video collections: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Failed to load video collections:", error);
//       setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
//     }
//   };

//   const loadExcludedProducts = async () => {
//     try {
//       const response = await fetch("/api/show-excluded-products");
//       const data = await response.json();
//       if (data.success) {
//         const map = data.videoExcludeds.reduce(
//           (m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))),
//           new Map()
//         );
//         setExcludedMap(map);
//       } else {
//         setMessage({ text: `❌ Failed to load excluded products: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Failed to load excluded products:", error);
//       setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
//     }
//   };

//   const getEffectiveProducts = (videoId) => {
//     const direct = videoProductsMap.get(videoId) || [];
//     const colls = videoCollectionsMap.get(videoId) || [];
//     const collProds = colls.flatMap(c => {
//       const prods = collectionProducts.get(c.shopify_collection_id) || [];
//       return prods.filter(p => !(excludedMap.get(videoId)?.has(p.id) || false));
//     });
//     const allProds = [...direct, ...collProds];
//     const unique = new Map(allProds.map(p => [p.id, p]));
//     return Array.from(unique.values());
//   };

//   const handleSelectAll = () => {
//     if (selectedVideos.length === videos.length) {
//       setSelectedVideos([]);
//     } else {
//       setSelectedVideos(videos.map(v => v.id));
//     }
//   };

//   const handleVideoSelect = (videoId, checked) => {
//     setSelectedVideos(prev =>
//       checked ? [...prev, videoId] : prev.filter(id => id !== videoId)
//     );
//   };

//   const openDeleteModal = () => {
//     if (selectedVideos.length === 0) {
//       setMessage({ text: "⚠️ Please select at least one video to delete", status: "warning" });
//       return;
//     }
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => setDeleteModalOpen(false);

//   const deleteSelectedVideos = async () => {
//     setDeleting(true);
//     try {
//       const response = await fetch("/api/delete-videos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ videoIds: selectedVideos }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
//         setSelectedVideos([]);
//         setMessage({ text: `✅ Deleted ${data.deletedCount} video(s)`, status: "success" });
//         closeDeleteModal();
//       } else {
//         setMessage({ text: `❌ Failed to delete videos: ${data.error}`, status: "critical" });
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       setMessage({ text: `❌ Failed to delete videos: ${error.message}`, status: "critical" });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // Handle video details modal
//   const handleOpenDetails = (video) => {
//     setSelectedVideoForDetails(video);
//     setDetailsModalOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsModalOpen(false);
//     setSelectedVideoForDetails(null);
//   };

//   return (
//     <Page
//       title="Dashboard"
//       primaryAction={{
//         content: "Refresh",
//         onAction: () => {
//           loadVideos();
//           loadVideoProducts();
//           loadVideoCollections();
//           loadExcludedProducts();
//         },
//         disabled: loading,
//       }}
//     >
//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         open={deleteModalOpen}
//         onClose={closeDeleteModal}
//         title="Delete Videos"
//         primaryAction={{
//           content: "Delete Videos",
//           onAction: deleteSelectedVideos,
//           loading: deleting,
//           destructive: true,
//         }}
//         secondaryActions={[{ content: "Cancel", onAction: closeDeleteModal }]}
//         selectedCount={selectedVideos.length}
//       />

//       {/* Video Details Modal */}
//       {selectedVideoForDetails && (
//         <VideoDetailsModal
//           open={detailsModalOpen}
//           onClose={handleCloseDetails}
//           video={selectedVideoForDetails}
//           products={getEffectiveProducts(selectedVideoForDetails.id)}
//           collections={videoCollectionsMap.get(selectedVideoForDetails.id) || []}
//         />
//       )}

//       {message.text && (
//         <Banner status={message.status} onDismiss={() => setMessage({ text: "", status: "" })}>
//           {message.text}
//         </Banner>
//       )}

//       <Layout>
//         <Layout.Section>
//           <Card>
//             <BlockStack gap="400">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="headingLg" as="h2">
//                   Your Videos ({videos.length})
//                 </Text>
//                 <InlineStack gap="200">
//                   {selectedVideos.length > 0 && (
//                     <Button destructive onClick={openDeleteModal} disabled={loading}>
//                       Delete Selected ({selectedVideos.length})
//                     </Button>
//                   )}
//                   <Button
//                     onClick={() => {
//                       loadVideos();
//                       loadVideoProducts();
//                       loadVideoCollections();
//                       loadExcludedProducts();
//                     }}
//                     disabled={loading}
//                   >
//                     Refresh
//                   </Button>
//                 </InlineStack>
//               </InlineStack>

//               {loading ? (
//                 <Box padding="800" alignment="center">
//                   <Spinner accessibilityLabel="Loading videos" size="large" />
//                   <Text alignment="center" tone="subdued" variant="bodyMd">
//                     Loading your videos...
//                   </Text>
//                 </Box>
//               ) : videos.length === 0 ? (
//                 <EmptyState
//                   heading="No videos yet"
//                   image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
//                 >
//                   <Text>Upload your first video to get started.</Text>
//                 </EmptyState>
//               ) : (
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//                   <div
//                     style={{
//                       width: "100%",
//                       padding: "12px 16px",
//                       background: "var(--p-surface-subdued)",
//                       borderRadius: "8px",
//                       border: "1px solid var(--p-border-subdued)",
//                     }}
//                   >
//                     <Checkbox
//                       label={`Select all ${videos.length} videos`}
//                       checked={selectedVideos.length === videos.length && videos.length > 0}
//                       onChange={handleSelectAll}
//                     />
//                   </div>

//                   {videos.map((video) => (
//                     <div key={video.id} style={{ flex: "0 0 calc(33.333% - 13.33px)" }}>
//                       <Card padding="300">
//                         <BlockStack gap="300">
//                           <Box position="absolute" top="12px" left="12px">
//                             <Checkbox
//                               label=""
//                               labelHidden
//                               checked={selectedVideos.includes(video.id)}
//                               onChange={(checked) => handleVideoSelect(video.id, checked)}
//                             />
//                           </Box>

//                           <VideoPlayer video={video} />

//                           <BlockStack gap="200">
//                             <Text variant="bodyMd" fontWeight="bold" alignment="center" truncate>
//                               {video.title}
//                             </Text>

//                             <InlineStack gap="100" align="center" blockAlign="center">
//                               <Badge tone="success" size="small">
//                                 {getEffectiveProducts(video.id).length} products
//                               </Badge>
//                               <Badge tone="info" size="small">
//                                 {(videoCollectionsMap.get(video.id) || []).length} collections
//                               </Badge>
//                             </InlineStack>

//                             <InlineStack gap="100" align="center">
//                               <Button
//                                 fullWidth
//                                 variant="primary"
//                                 size="slim"
//                                 onClick={() => handleOpenDetails(video)}
//                               >
//                                 View Products
//                               </Button>
//                               <Button
//                                 size="slim"
//                                 variant="plain"
//                                 destructive
//                                 onClick={() => {
//                                   setSelectedVideos([video.id]);
//                                   setDeleteModalOpen(true);
//                                 }}
//                                 icon={<Icon source="DeleteMinor" />}
//                               />
//                             </InlineStack>
//                           </BlockStack>
//                         </BlockStack>
//                       </Card>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </BlockStack>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }









import { useState, useEffect } from "react";
import { Link } from "@remix-run/react"; // Keep for navigation if needed
import VideoPlayer from "../components/VideoPlayer";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import VideoDetailsModal from "../components/VideoDetailsModal";

export const loader = async () => null;

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [videoProductsMap, setVideoProductsMap] = useState(new Map());
  const [videoCollectionsMap, setVideoCollectionsMap] = useState(new Map());
  const [collectionProducts, setCollectionProducts] = useState(new Map());
  const [excludedMap, setExcludedMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", status: "" });
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // New modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedVideoForDetails, setSelectedVideoForDetails] = useState(null);

  useEffect(() => {
    loadVideos();
    loadVideoProducts();
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
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos || []);
        setSelectedVideos([]);
      } else {
        setMessage({ text: `❌ Failed to load videos: ${data.error || "Unknown error"}`, status: "critical" });
      }
    } catch (error) {
      console.error("Failed to load videos:", error);
      setMessage({ text: `❌ Failed to load videos: ${error.message}`, status: "critical" });
    } finally {
      setLoading(false);
    }
  };

  const loadVideoProducts = async () => {
    try {
      const response = await fetch("/api/showproducts-onvideos");
      const data = await response.json();
      if (data.success) {
        const map = data.videoProducts.reduce((m, vp) => m.set(vp.video.id, vp.products), new Map());
        setVideoProductsMap(map);
      } else {
        setMessage({ text: `❌ Failed to load video products: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Failed to load video products:", error);
      setMessage({ text: "❌ Failed to load products for videos", status: "critical" });
    }
  };

  const loadVideoCollections = async () => {
    try {
      const response = await fetch("/api/showcollections-onvideos");
      const data = await response.json();
      if (data.success) {
        const map = data.videoCollections.reduce((m, vc) => m.set(vc.video.id, vc.collections), new Map());
        setVideoCollectionsMap(map);
      } else {
        setMessage({ text: `❌ Failed to load video collections: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Failed to load video collections:", error);
      setMessage({ text: "❌ Failed to load collections for videos", status: "critical" });
    }
  };

  const loadExcludedProducts = async () => {
    try {
      const response = await fetch("/api/show-excluded-products");
      const data = await response.json();
      if (data.success) {
        const map = data.videoExcludeds.reduce(
          (m, ve) => m.set(ve.video.id, new Set(ve.excluded.map(p => p.shopify_product_id))),
          new Map()
        );
        setExcludedMap(map);
      } else {
        setMessage({ text: `❌ Failed to load excluded products: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Failed to load excluded products:", error);
      setMessage({ text: "❌ Failed to load excluded products", status: "critical" });
    }
  };

  const getEffectiveProducts = (videoId) => {
    const direct = videoProductsMap.get(videoId) || [];
    const colls = videoCollectionsMap.get(videoId) || [];
    const collProds = colls.flatMap(c => {
      const prods = collectionProducts.get(c.shopify_collection_id) || [];
      return prods.filter(p => !(excludedMap.get(videoId)?.has(p.id) || false));
    });
    const allProds = [...direct, ...collProds];
    const unique = new Map(allProds.map(p => [p.id, p]));
    return Array.from(unique.values());
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === videos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map(v => v.id));
    }
  };

  const handleVideoSelect = (videoId, checked) => {
    setSelectedVideos(prev =>
      checked ? [...prev, videoId] : prev.filter(id => id !== videoId)
    );
  };

  const openDeleteModal = () => {
    if (selectedVideos.length === 0) {
      setMessage({ text: "⚠️ Please select at least one video to delete", status: "warning" });
      return;
    }
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const deleteSelectedVideos = async () => {
    setDeleting(true);
    try {
      const response = await fetch("/api/delete-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoIds: selectedVideos }),
      });
      const data = await response.json();
      if (data.success) {
        setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
        setSelectedVideos([]);
        setMessage({ text: `✅ Deleted ${data.deletedCount} video(s)`, status: "success" });
        closeDeleteModal();
      } else {
        setMessage({ text: `❌ Failed to delete videos: ${data.error}`, status: "critical" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({ text: `❌ Failed to delete videos: ${error.message}`, status: "critical" });
    } finally {
      setDeleting(false);
    }
  };

  // Handle video details modal
  const handleOpenDetails = (video) => {
    setSelectedVideoForDetails(video);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedVideoForDetails(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Videos"
        primaryAction={{
          content: "Delete Videos",
          onAction: deleteSelectedVideos,
          loading: deleting,
          destructive: true,
        }}
        secondaryActions={[{ content: "Cancel", onAction: closeDeleteModal }]}
        selectedCount={selectedVideos.length}
      />

      {/* Video Details Modal */}
      {selectedVideoForDetails && (
        <VideoDetailsModal
          open={detailsModalOpen}
          onClose={handleCloseDetails}
          video={selectedVideoForDetails}
          products={getEffectiveProducts(selectedVideoForDetails.id)}
          collections={videoCollectionsMap.get(selectedVideoForDetails.id) || []}
        />
      )}

      {message.text && (
        <div className={`p-4 rounded ${message.status === 'critical' ? 'bg-red-100 text-red-700' : message.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {message.text}
          <button onClick={() => setMessage({ text: "", status: "" })} className="ml-2">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Videos ({videos.length})</h2>
          <div className="flex gap-2">
            {selectedVideos.length > 0 && (
              <button onClick={openDeleteModal} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50">
                Delete Selected ({selectedVideos.length})
              </button>
            )}
            <button
              onClick={() => {
                loadVideos();
                loadVideoProducts();
                loadVideoCollections();
                loadExcludedProducts();
              }}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="ml-2">Loading your videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center p-8 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold">No videos yet</h3>
            <p>Upload your first video to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="w-full p-3 bg-gray-100 rounded border border-gray-300">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedVideos.length === videos.length && videos.length > 0}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                Select all {videos.length} videos
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {videos.map((video) => (
                <div key={video.id} className="border border-gray-300 rounded overflow-hidden shadow-md">
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <input
                        type="checkbox"
                        checked={selectedVideos.includes(video.id)}
                        onChange={(e) => handleVideoSelect(video.id, e.target.checked)}
                      />
                    </div>
                    <VideoPlayer video={video} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-center font-bold truncate">{video.title}</h3>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
                        {getEffectiveProducts(video.id).length} products
                      </span>
                      <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                        {(videoCollectionsMap.get(video.id) || []).length} collections
                      </span>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        onClick={() => handleOpenDetails(video)}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full text-sm"
                      >
                        View Products
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVideos([video.id]);
                          setDeleteModalOpen(true);
                        }}
                        className="bg-red-500 text-white px-2 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}