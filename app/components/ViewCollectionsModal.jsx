// // this shows the "View Collections" Button modal on the "Manage Collections" page code

// import {
//   Modal,
//   BlockStack,
//   Text,
//   Card,
//   InlineStack,
//   Button,
//   Toast,
//   Frame,
// } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// import CollectionProductsModal from "./CollectionProductsModal";

// export default function ViewCollectionsModal({
//   open,
//   onClose,
//   title,
//   videoId,
//   collections,
//   collectionProducts,
//   excludedMap,
//   onDeleteCollection,
//   onExcludeProduct,
//   setMessage,
// }) {
//   const [toast, setToast] = useState({ active: false, message: "", error: false });
//   const [selectedCollection, setSelectedCollection] = useState(null);
//   const [productsModalOpen, setProductsModalOpen] = useState(false);

//   const dismissToast = useCallback(
//     () => setToast({ active: false, message: "", error: false }),
//     []
//   );
//   const showToast = useCallback(
//     (message, error = false) => setToast({ active: true, message, error }),
//     []
//   );

//   const handleRemoveCollection = async (collectionId) => {
//     try {
//       await onDeleteCollection(videoId, collectionId);
//       showToast("Collection removed successfully", false);
//     } catch (error) {
//       showToast("Failed to remove collection", true);
//     }
//   };

//   const openProductsModal = (collection) => {
//     setSelectedCollection(collection);
//     setProductsModalOpen(true);
//   };

//   const closeProductsModal = () => {
//     setSelectedCollection(null);
//     setProductsModalOpen(false);
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={onClose}
//         title={title}
//         primaryAction={{
//           content: "Close",
//           onAction: onClose,
//         }}
//         size="large"
//       >
//         <Modal.Section>
//           <style jsx>{`
//             .collection-card {
//               transition: all 0.2s ease;
//               border-radius: 8px;
//             }
//             .collection-card:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//             }
//           `}</style>

//           <BlockStack gap="400">
//             <Text variant="bodyMd" tone="subdued">
//               View collections associated with this video. Click "View Collection Products" to see products in each collection.
//             </Text>

//             {collections.length === 0 ? (
//               <Card padding="400">
//                 <Text variant="headingSm" alignment="center" tone="subdued">
//                   No collections assigned to this video.
//                 </Text>
//               </Card>
//             ) : (
//               <BlockStack gap="300">
//                 {collections.map((collection) => (
//                   <Card
//                     key={collection.id}
//                     padding="400"
//                     className="collection-card"
//                     background="bg-surface"
//                   >
//                     <InlineStack align="space-between" blockAlign="center">
//                       <Text variant="headingSm" fontWeight="semibold">
//                         {collection.title || "Untitled Collection"}
//                       </Text>
//                       <InlineStack gap="200">
//                         <Button
//                           variant="plain"
//                           tone="critical"
//                           size="slim"
//                           onClick={() => handleRemoveCollection(collection.id)}
//                         >
//                           Remove Collection
//                         </Button>
//                         <Button
//                           variant="secondary"
//                           size="slim"
//                           onClick={() => openProductsModal(collection)}
//                         >
//                           View Collection Products
//                         </Button>
//                       </InlineStack>
//                     </InlineStack>
//                   </Card>
//                 ))}
//               </BlockStack>
//             )}
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

//       <CollectionProductsModal
//         open={productsModalOpen}
//         onClose={closeProductsModal}
//         title={`Products in "${selectedCollection?.title || "Collection"}"`}
//         videoId={videoId}
//         collection={selectedCollection}
//         products={selectedCollection ? collectionProducts.get(selectedCollection.shopify_collection_id) || [] : []}
//         excludedMap={excludedMap}
//         onExcludeProduct={onExcludeProduct}
//         setMessage={setMessage}
//       />

//       {toast.active && (
//         <Frame>
//           <Toast
//             content={toast.message}
//             error={toast.error}
//             onDismiss={dismissToast}
//             duration={2500}
//           />
//         </Frame>
//       )}
//     </div>
//   );
// }






// app/components/ViewCollectionsModal.jsx

import { useState, useCallback } from "react";
import CollectionProductsModal from "./CollectionProductsModal";

export default function ViewCollectionsModal({
  open,
  onClose,
  title,
  videoId,
  collections,
  collectionProducts,
  excludedMap,
  onDeleteCollection,
  onExcludeProduct,
  setMessage,
}) {
  const [toast, setToast] = useState({ active: false, message: "", error: false });
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [productsModalOpen, setProductsModalOpen] = useState(false);

  const dismissToast = useCallback(
    () => setToast({ active: false, message: "", error: false }),
    []
  );
  const showToast = useCallback(
    (message, error = false) => setToast({ active: true, message, error }),
    []
  );

  const handleRemoveCollection = async (collectionId) => {
    try {
      await onDeleteCollection(videoId, collectionId);
      showToast("Collection removed successfully", false);
    } catch (error) {
      showToast("Failed to remove collection", true);
    }
  };

  const openProductsModal = (collection) => {
    setSelectedCollection(collection);
    setProductsModalOpen(true);
  };

  const closeProductsModal = () => {
    setSelectedCollection(null);
    setProductsModalOpen(false);
  };

  if (!open) return null;

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              Close
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              View collections associated with this video. Click "View Collection Products" to see products in each collection.
            </p>

            {collections.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No collections assigned to this video.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold">{collection.title || "Untitled Collection"}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveCollection(collection.id)}
                          className="text-red-500 text-xs hover:text-red-700"
                        >
                          Remove Collection
                        </button>
                        <button
                          onClick={() => openProductsModal(collection)}
                          className="text-blue-500 text-xs hover:text-blue-700"
                        >
                          View Collection Products
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CollectionProductsModal
        open={productsModalOpen}
        onClose={closeProductsModal}
        title={`Products in "${selectedCollection?.title || "Collection"}"`}
        videoId={videoId}
        collection={selectedCollection}
        products={selectedCollection ? collectionProducts.get(selectedCollection.shopify_collection_id) || [] : []}
        excludedMap={excludedMap}
        onExcludeProduct={onExcludeProduct}
        setMessage={setMessage}
      />

      {toast.active && (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${toast.error ? "bg-red-500" : "bg-green-500"} text-white`}>
          {toast.message}
          <button onClick={dismissToast} className="ml-2 text-white">×</button>
        </div>
      )}
    </div>
  );
}