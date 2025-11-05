// import { useState, useEffect } from "react";
// import {
//   Modal,
//   Text,
//   BlockStack,
//   InlineStack,
//   Scrollable,
//   Box,
//   Thumbnail,
//   Divider,
//   Badge,
//   Card,
//   Spinner,
//   Button,
//   Toast,
//   Frame,
// } from "@shopify/polaris";

// export default function VideoDetailsModal({
//   open,
//   onClose,
//   video,
//   products = [],
//   collections = [],
// }) {
//   const [productImagesMap, setProductImagesMap] = useState(new Map());
//   const [collectionImagesMap, setCollectionImagesMap] = useState(new Map());
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(null);
//   const [toast, setToast] = useState({ active: false, message: "", error: false });

//   const dismissToast = () => setToast({ active: false, message: "", error: false });
//   const showToast = (message, error = false) =>
//     setToast({ active: true, message, error });

//   // 🧩 Fetch product + collection images from APIs when modal opens
//   useEffect(() => {
//     if (!open) return;

//     const fetchImages = async () => {
//       setLoading(true);
//       try {
//         const [productsRes, collectionsRes] = await Promise.all([
//           fetch("/api/viewproducts"),
//           fetch("/api/viewcollections"),
//         ]);

//         const [productsData, collectionsData] = await Promise.all([
//           productsRes.json(),
//           collectionsRes.json(),
//         ]);

//         // Products
//         if (productsData.success && Array.isArray(productsData.products)) {
//           const imageMap = new Map(
//             productsData.products.map((p) => [p.id, p.image_url])
//           );
//           setProductImagesMap(imageMap);
//         }

//         // Collections
//         if (collectionsData.success && Array.isArray(collectionsData.collections)) {
//           const imageMap = new Map(
//             collectionsData.collections.map((c) => [c.id, c.image_url])
//           );
//           setCollectionImagesMap(imageMap);
//         }
//       } catch (error) {
//         console.error("Error fetching product/collection images:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, [open]);

//   // 🧠 Image helpers
//   const getProductImage = (product) => {
//     return (
//       productImagesMap.get(product.id) ||
//       product?.image_url ||
//       product?.image?.src ||
//       product?.featured_image ||
//       product?.images?.[0]?.src ||
//       "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/placeholder-image.png"
//     );
//   };

//   const getCollectionImage = (collection) => {
//     return (
//       collectionImagesMap.get(collection.id) ||
//       collection?.image_url ||
//       collection?.image?.src ||
//       "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/placeholder-image.png"
//     );
//   };

//   // 🧾 Price fallback
//   const getProductPrice = (product) => {
//     if (product?.variants?.length > 0) {
//       const price = product.variants[0].price;
//       return `$${parseFloat(price).toFixed(2)}`;
//     }
//     if (typeof product?.price === "number") return `$${product.price.toFixed(2)}`;
//     if (typeof product?.price === "string") return `$${parseFloat(product.price).toFixed(2)}`;
//     return "—";
//   };

//   // 🗑️ Handle delete
//   const handleDeleteProduct = async (productId) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     setDeleting(productId);
//     try {
//       const res = await fetch("/api/delete-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         showToast("✅ Product deleted successfully!");
//       } else {
//         showToast("❌ Failed to delete product", true);
//       }
//     } catch (err) {
//       showToast("❌ " + err.message, true);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   return (
//     <Frame>
//       <Modal
//         open={open}
//         onClose={onClose}
//         title="Video Details"
//         primaryAction={{ content: "Close", onAction: onClose }}
//         large
//       >
//         <Modal.Section>
//           <BlockStack gap="400">
//             {/* HEADER */}
//             <Box paddingBlockEnd="200" borderBlockEndWidth="1" borderColor="border-subdued">
//               <Text variant="headingMd" as="h2">
//                 {video.title}
//               </Text>
//               <Text tone="subdued" variant="bodySm">
//                 Products and collections linked to this video
//               </Text>
//             </Box>

//             {loading ? (
//               <Box padding="600" align="center">
//                 <Spinner accessibilityLabel="Loading details" size="large" />
//                 <Text alignment="center" tone="subdued">
//                   Loading product and collection images...
//                 </Text>
//               </Box>
//             ) : (
//               <Scrollable shadow style={{ maxHeight: "500px" }}>
//                 <BlockStack gap="600">
//                   {/* 🛍️ PRODUCTS SECTION */}
//                   <BlockStack gap="300">
//                     <Text variant="headingSm" as="h3">
//                       Linked Products ({products.length})
//                     </Text>

//                     {products.length === 0 ? (
//                       <Text tone="subdued">No products linked to this video.</Text>
//                     ) : (
//                       products.map((product) => (
//                         <Card
//                           key={product.id}
//                           padding="300"
//                           sectioned
//                           subdued
//                           style={{
//                             transition: "background 0.2s ease",
//                             cursor: "pointer",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.background = "white")
//                           }
//                         >
//                           <InlineStack
//                             gap="400"
//                             align="space-between"
//                             blockAlign="center"
//                           >
//                             <InlineStack gap="300" blockAlign="center">
//                               <Thumbnail
//                                 source={getProductImage(product)}
//                                 alt={product.title}
//                                 size="medium"
//                               />
//                               <BlockStack gap="50">
//                                 <Text variant="bodyMd" fontWeight="semibold">
//                                   {product.title}
//                                 </Text>
//                                 <Text tone="subdued" variant="bodySm">
//                                   {getProductPrice(product)}
//                                 </Text>
//                               </BlockStack>
//                             </InlineStack>

//                             <InlineStack gap="200" blockAlign="center">
//                               <Badge tone="subdued" size="small">
//                                 {product.created_at
//                                   ? new Date(product.created_at).toLocaleDateString()
//                                   : "—"}
//                               </Badge>

//                               {/* ✅ Delete Button */}
//                               <Button
//                                 size="slim"
//                                 tone="critical"
//                                 loading={deleting === product.id}
//                                 onClick={() => handleDeleteProduct(product.id)}
//                               >
//                                 Delete
//                               </Button>
//                             </InlineStack>
//                           </InlineStack>
//                         </Card>
//                       ))
//                     )}
//                   </BlockStack>

//                   <Divider />

//                   {/* 🧩 COLLECTIONS SECTION */}
//                   <BlockStack gap="300">
//                     <Text variant="headingSm" as="h3">
//                       Linked Collections ({collections.length})
//                     </Text>

//                     {collections.length === 0 ? (
//                       <Text tone="subdued">No collections linked to this video.</Text>
//                     ) : (
//                       collections.map((collection) => (
//                         <Card
//                           key={collection.id}
//                           padding="300"
//                           sectioned
//                           subdued
//                           style={{
//                             transition: "background 0.2s ease",
//                             cursor: "pointer",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.background = "white")
//                           }
//                         >
//                           <InlineStack
//                             gap="400"
//                             align="space-between"
//                             blockAlign="center"
//                           >
//                             <InlineStack gap="300" blockAlign="center">
//                               <Thumbnail
//                                 source={getCollectionImage(collection)}
//                                 alt={collection.title}
//                                 size="medium"
//                               />
//                               <BlockStack gap="50">
//                                 <Text variant="bodyMd" fontWeight="semibold">
//                                   {collection.title}
//                                 </Text>
//                                 <Text tone="subdued" variant="bodySm">
//                                   Collection
//                                 </Text>
//                               </BlockStack>
//                             </InlineStack>

//                             <Badge tone="subdued" size="small">
//                               {collection.created_at
//                                 ? new Date(collection.created_at).toLocaleDateString()
//                                 : "—"}
//                             </Badge>
//                           </InlineStack>
//                         </Card>
//                       ))
//                     )}
//                   </BlockStack>
//                 </BlockStack>
//               </Scrollable>
//             )}
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

//       {/* ✅ Toast Notification */}
//       {toast.active && (
//         <Toast
//           content={toast.message}
//           error={toast.error}
//           onDismiss={dismissToast}
//           duration={2500}
//         />
//       )}
//     </Frame>
//   );
// }




// app/components/VideoDetailsModal.jsx

import { useState, useEffect } from "react";

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

  if (!open) return null;

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Video Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              Close
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {/* HEADER */}
            <div className="pb-2 border-b border-gray-200">
              <h2 className="text-md font-medium">{video.title}</h2>
              <p className="text-sm text-gray-500">Products and collections linked to this video</p>
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-sm text-gray-500">Loading product and collection images...</p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {/* 🛍️ PRODUCTS SECTION */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium">Linked Products ({products.length})</h3>

                    {products.length === 0 ? (
                      <p className="text-sm text-gray-500">No products linked to this video.</p>
                    ) : (
                      products.map((product) => (
                        <div
                          key={product.id}
                          className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-all cursor-pointer"
                        >
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-3 items-center">
                              <img
                                src={getProductImage(product)}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-md font-semibold">{product.title}</p>
                                <p className="text-sm text-gray-500">{getProductPrice(product)}</p>
                              </div>
                            </div>

                            <div className="flex gap-2 items-center">
                              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                                {product.created_at
                                  ? new Date(product.created_at).toLocaleDateString()
                                  : "—"}
                              </span>

                              {/* ✅ Delete Button */}
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={deleting === product.id}
                                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                              >
                                {deleting === product.id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <hr className="border-gray-200" />

                  {/* 🧩 COLLECTIONS SECTION */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium">Linked Collections ({collections.length})</h3>

                    {collections.length === 0 ? (
                      <p className="text-sm text-gray-500">No collections linked to this video.</p>
                    ) : (
                      collections.map((collection) => (
                        <div
                          key={collection.id}
                          className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-all cursor-pointer"
                        >
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-3 items-center">
                              <img
                                src={getCollectionImage(collection)}
                                alt={collection.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-md font-semibold">{collection.title}</p>
                                <p className="text-sm text-gray-500">Collection</p>
                              </div>
                            </div>

                            <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                              {collection.created_at
                                ? new Date(collection.created_at).toLocaleDateString()
                                : "—"}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {toast.active && (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${toast.error ? "bg-red-500" : "bg-green-500"} text-white`}>
          {toast.message}
          <button onClick={dismissToast} className="ml-2 text-white">×</button>
        </div>
      )}
    </div>
  );
}
