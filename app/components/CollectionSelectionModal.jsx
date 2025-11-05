// // File: app/components/CollectionSelectionModal.jsx
// import { Modal, BlockStack, Text, Box, Spinner, EmptyState, Card, InlineStack, Checkbox, Thumbnail, Icon } from "@shopify/polaris";

// export default function CollectionSelectionModal({
//   open,
//   onClose,
//   title,
//   collections,
//   collectionsLoading,
//   tempSelectedCollections,
//   onTempCollectionSelect,
//   primaryAction,
//   secondaryActions,
// }) {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       title={title}
//       primaryAction={primaryAction}
//       secondaryActions={secondaryActions}
//       size="large"
//     >
//       <Modal.Section>
//         <BlockStack gap="400">
//           <Text variant="bodyMd" tone="subdued">
//             Choose collections from your store to associate with this video.
//           </Text>
          
//           {collectionsLoading ? (
//             <Box padding="400" alignment="center">
//               <Spinner size="small" />
//               <Text variant="bodySm" tone="subdued">Loading collections...</Text>
//             </Box>
//           ) : collections.length === 0 ? (
//             <EmptyState heading="No collections available">
//               <Text variant="bodyMd" as="p">
//                 No collections found in your store.
//               </Text>
//             </EmptyState>
//           ) : (
//             <Box>
//               <Text variant="bodySm" fontWeight="medium" marginBottom="200">
//                 All Collections ({collections.length}):
//               </Text>
//               <div style={{
//                 maxHeight: '400px',
//                 overflowY: 'auto',
//                 border: '1px solid var(--p-border-subdued)',
//                 borderRadius: '8px',
//                 padding: '12px'
//               }}>
//                 <BlockStack gap="200">
//                   {collections.map((collection) => (
//                     <Card
//                       key={collection.id}
//                       padding="200"
//                       style={{
//                         border: tempSelectedCollections.includes(String(collection.id))
//                           ? '2px solid var(--p-border-success)'
//                           : '1px solid var(--p-border-subdued)',
//                         background: tempSelectedCollections.includes(String(collection.id))
//                           ? 'var(--p-surface-success-subdued)'
//                           : 'var(--p-surface)',
//                       }}
//                     >
//                       <InlineStack gap="200" blockAlign="center">
//                         <Checkbox
//                           label=""
//                           labelHidden
//                           checked={tempSelectedCollections.includes(String(collection.id))}
//                           onChange={(checked) => {
//                             const collectionId = String(collection.id);
//                             onTempCollectionSelect(
//                               checked
//                                 ? [...tempSelectedCollections, collectionId]
//                                 : tempSelectedCollections.filter((id) => id !== collectionId)
//                             );
//                           }}
//                           disabled={primaryAction.loading}
//                         />
//                         {collection.image_url ? (
//                           <Thumbnail
//                             source={collection.image_url}
//                             alt={collection.title}
//                             size="small"
//                           />
//                         ) : (
//                           <Box
//                             background="bg-surface-secondary"
//                             padding="200"
//                             borderRadius="100"
//                             minHeight="40px"
//                             minWidth="40px"
//                             display="flex"
//                             alignItems="center"
//                             justifyContent="center"
//                           >
//                             <Icon source="CollectionMajor" tone="subdued" />
//                           </Box>
//                         )}
//                         <Text variant="bodySm" fontWeight="medium" truncate>
//                           {collection.title || 'Untitled Collection'}
//                         </Text>
//                       </InlineStack>
//                     </Card>
//                   ))}
//                 </BlockStack>
//               </div>
//               <Text variant="bodySm" tone="subdued" marginTop="200">
//                 {tempSelectedCollections.length} collection(s) selected
//               </Text>
//             </Box>
//           )}
//         </BlockStack>
//       </Modal.Section>
//     </Modal>
//   );
// }




// app/components/CollectionSelectionModal.jsx

export default function CollectionSelectionModal({
  open,
  onClose,
  title,
  collections,
  collectionsLoading,
  tempSelectedCollections,
  onTempCollectionSelect,
  primaryAction,
  secondaryActions,
}) {
  if (!open) return null;

  return (
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
            Choose collections from your store to associate with this video.
          </p>
          
          {collectionsLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-sm text-gray-500">Loading collections...</p>
            </div>
          ) : collections.length === 0 ? (
            <div className="p-4 text-center">
              <h3 className="text-md font-medium">No collections available</h3>
              <p className="text-sm text-gray-500">No collections found in your store.</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium mb-2">
                All Collections ({collections.length}):
              </p>
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded p-3">
                <div className="flex flex-col gap-2">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className={`p-2 rounded border ${tempSelectedCollections.includes(String(collection.id)) ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}`}
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={tempSelectedCollections.includes(String(collection.id))}
                          onChange={(e) => {
                            const collectionId = String(collection.id);
                            onTempCollectionSelect(
                              e.target.checked
                                ? [...tempSelectedCollections, collectionId]
                                : tempSelectedCollections.filter((id) => id !== collectionId)
                            );
                          }}
                          disabled={primaryAction.loading}
                          className="h-4 w-4"
                        />
                        {collection.image_url ? (
                          <img
                            src={collection.image_url}
                            alt={collection.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded">
                            {/* Placeholder icon */}
                          </div>
                        )}
                        <p className="text-sm font-medium truncate">{collection.title || 'Untitled Collection'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {tempSelectedCollections.length} collection(s) selected
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 p-4 border-t">
          {secondaryActions.map((action, idx) => (
            <button key={idx} onClick={action.onAction} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              {action.content}
            </button>
          ))}
          <button onClick={primaryAction.onAction} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {primaryAction.content}
          </button>
        </div>
      </div>
    </div>
  );
}