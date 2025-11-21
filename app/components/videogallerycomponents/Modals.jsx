// // // // // // // components/videogallerycomponents/Modals.jsx
// // // // // // import VideoOptionsModal from "./VideoOptionsModal";
// // // // // // import ProductsModal from "./ProductsModal";
// // // // // // import DeleteModal from "./DeleteModal";
// // // // // // import BulkDeleteModal from "./BulkDeleteModal";

// // // // // // export default function Modals({
// // // // // //   showVideoOptions,
// // // // // //   showProductsModal,
// // // // // //   showDeleteModal,
// // // // // //   showBulkDeleteModal,
// // // // // //   products,
// // // // // //   selectedProducts,
// // // // // //   loadingProducts,
// // // // // //   selectedVideos,
// // // // // //   onHideVideoOptions,
// // // // // //   onCopyUrl,
// // // // // //   onDownload,
// // // // // //   onLoadProducts,
// // // // // //   onDelete,
// // // // // //   onHideDeleteModal,
// // // // // //   onBulkDelete,
// // // // // //   onHideBulkDeleteModal,
// // // // // //   onToggleProduct,
// // // // // //   onSaveProducts,
// // // // // //   onHideProductsModal
// // // // // // }) {
// // // // // //   return (
// // // // // //     <>
// // // // // //       {/* Video Options Menu */}
// // // // // //       <VideoOptionsModal
// // // // // //         showVideoOptions={showVideoOptions}
// // // // // //         onHide={onHideVideoOptions}
// // // // // //         onCopyUrl={onCopyUrl}
// // // // // //         onDownload={onDownload}
// // // // // //         onLoadProducts={onLoadProducts}
// // // // // //         onDelete={onDelete}
// // // // // //       />

// // // // // //       {/* Products Modal */}
// // // // // //       <ProductsModal
// // // // // //         showProductsModal={showProductsModal}
// // // // // //         products={products}
// // // // // //         selectedProducts={selectedProducts}
// // // // // //         loadingProducts={loadingProducts}
// // // // // //         onToggleProduct={onToggleProduct}
// // // // // //         onSaveProducts={onSaveProducts}
// // // // // //         onHide={onHideProductsModal}
// // // // // //       />

// // // // // //       {/* Delete Confirmation Modal */}
// // // // // //       <DeleteModal
// // // // // //         showDeleteModal={showDeleteModal}
// // // // // //         onDelete={onDelete}
// // // // // //         onHide={onHideDeleteModal}
// // // // // //       />

// // // // // //       {/* Bulk Delete Confirmation Modal */}
// // // // // //       <BulkDeleteModal
// // // // // //         showBulkDeleteModal={showBulkDeleteModal}
// // // // // //         selectedVideos={selectedVideos}
// // // // // //         onBulkDelete={onBulkDelete}
// // // // // //         onHide={onHideBulkDeleteModal}
// // // // // //       />
// // // // // //     </>
// // // // // //   );
// // // // // // }



// // // // // // components/videogallerycomponents/Modals.jsx
// // // // // import VideoOptionsModal from './VideoOptionsModal';

// // // // // export default function Modals({
// // // // //   showVideoOptions,
// // // // //   showProductsModal,
// // // // //   showDeleteModal,
// // // // //   showBulkDeleteModal,
// // // // //   products,
// // // // //   selectedProducts,
// // // // //   selectedVideos,
// // // // //   loadingProducts,
// // // // //   onHideVideoOptions,
// // // // //   onCopyUrl,
// // // // //   onDownload,
// // // // //   onLoadProducts,
// // // // //   onDelete,
// // // // //   onHideDeleteModal,
// // // // //   onBulkDelete,
// // // // //   onHideBulkDeleteModal,
// // // // //   onToggleProduct,
// // // // //   onSaveProducts,
// // // // //   onHideProductsModal,
// // // // //   isDarkTheme
// // // // // }) {
// // // // //   return (
// // // // //     <>
// // // // //       {/* Video Options Modal */}
// // // // //       <VideoOptionsModal
// // // // //         showVideoOptions={showVideoOptions}
// // // // //         onHide={onHideVideoOptions}
// // // // //         onCopyUrl={onCopyUrl}
// // // // //         onDownload={onDownload}
// // // // //         onLoadProducts={onLoadProducts}
// // // // //         onDelete={onDelete}
// // // // //         isDarkTheme={isDarkTheme}
// // // // //       />

// // // // //       {/* Products Modal */}
// // // // //       {showProductsModal.show && (
// // // // //         <div style={{
// // // // //           position: 'fixed',
// // // // //           top: 0,
// // // // //           left: 0,
// // // // //           right: 0,
// // // // //           bottom: 0,
// // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // //           display: 'flex',
// // // // //           alignItems: 'center',
// // // // //           justifyContent: 'center',
// // // // //           zIndex: 1000,
// // // // //           padding: '2rem'
// // // // //         }}>
// // // // //           <div style={{
// // // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // // //             borderRadius: '12px',
// // // // //             padding: '2rem',
// // // // //             maxWidth: '600px',
// // // // //             width: '100%',
// // // // //             maxHeight: '80vh',
// // // // //             overflow: 'auto'
// // // // //           }}>
// // // // //             <h3 style={{ 
// // // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // // //               marginBottom: '1rem'
// // // // //             }}>
// // // // //               Select Products for {showProductsModal.video?.title}
// // // // //             </h3>
            
// // // // //             {loadingProducts ? (
// // // // //               <div>Loading products...</div>
// // // // //             ) : (
// // // // //               <div style={{ maxHeight: '400px', overflow: 'auto' }}>
// // // // //                 {products.map(product => (
// // // // //                   <div key={product.id} style={{
// // // // //                     display: 'flex',
// // // // //                     alignItems: 'center',
// // // // //                     padding: '0.75rem',
// // // // //                     border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
// // // // //                     borderRadius: '8px',
// // // // //                     marginBottom: '0.5rem',
// // // // //                     background: selectedProducts.has(product.id) 
// // // // //                       ? (isDarkTheme ? '#374151' : '#f3f4f6')
// // // // //                       : 'transparent'
// // // // //                   }}>
// // // // //                     <input
// // // // //                       type="checkbox"
// // // // //                       checked={selectedProducts.has(product.id)}
// // // // //                       onChange={() => onToggleProduct(product.id)}
// // // // //                       style={{ marginRight: '1rem' }}
// // // // //                     />
// // // // //                     <div>
// // // // //                       <div style={{ 
// // // // //                         fontWeight: '500',
// // // // //                         color: isDarkTheme ? '#f9fafb' : '#1f2937'
// // // // //                       }}>
// // // // //                         {product.title}
// // // // //                       </div>
// // // // //                       <div style={{ 
// // // // //                         color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // // //                         fontSize: '0.875rem'
// // // // //                       }}>
// // // // //                         ${product.price}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
            
// // // // //             <div style={{ 
// // // // //               display: 'flex', 
// // // // //               gap: '1rem', 
// // // // //               marginTop: '1.5rem',
// // // // //               justifyContent: 'flex-end'
// // // // //             }}>
// // // // //               <button
// // // // //                 onClick={onHideProductsModal}
// // // // //                 style={{
// // // // //                   background: '#6b7280',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={onSaveProducts}
// // // // //                 style={{
// // // // //                   background: '#10b981',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Save Products
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Single Delete Modal */}
// // // // //       {showDeleteModal.show && (
// // // // //         <div style={{
// // // // //           position: 'fixed',
// // // // //           top: 0,
// // // // //           left: 0,
// // // // //           right: 0,
// // // // //           bottom: 0,
// // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // //           display: 'flex',
// // // // //           alignItems: 'center',
// // // // //           justifyContent: 'center',
// // // // //           zIndex: 1000
// // // // //         }}>
// // // // //           <div style={{
// // // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // // //             borderRadius: '12px',
// // // // //             padding: '2rem',
// // // // //             maxWidth: '400px',
// // // // //             width: '100%'
// // // // //           }}>
// // // // //             <h3 style={{ 
// // // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // // //               marginBottom: '1rem'
// // // // //             }}>
// // // // //               Delete Video
// // // // //             </h3>
// // // // //             <p style={{ 
// // // // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // // // //               marginBottom: '2rem'
// // // // //             }}>
// // // // //               Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
// // // // //             </p>
// // // // //             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
// // // // //               <button
// // // // //                 onClick={onHideDeleteModal}
// // // // //                 style={{
// // // // //                   background: '#6b7280',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => onDelete(showDeleteModal.videoId)}
// // // // //                 style={{
// // // // //                   background: '#ef4444',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Delete
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Bulk Delete Modal */}
// // // // //       {showBulkDeleteModal && (
// // // // //         <div style={{
// // // // //           position: 'fixed',
// // // // //           top: 0,
// // // // //           left: 0,
// // // // //           right: 0,
// // // // //           bottom: 0,
// // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // //           display: 'flex',
// // // // //           alignItems: 'center',
// // // // //           justifyContent: 'center',
// // // // //           zIndex: 1000
// // // // //         }}>
// // // // //           <div style={{
// // // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // // //             borderRadius: '12px',
// // // // //             padding: '2rem',
// // // // //             maxWidth: '400px',
// // // // //             width: '100%'
// // // // //           }}>
// // // // //             <h3 style={{ 
// // // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // // //               marginBottom: '1rem'
// // // // //             }}>
// // // // //               Delete {selectedVideos.size} Videos
// // // // //             </h3>
// // // // //             <p style={{ 
// // // // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // // // //               marginBottom: '2rem'
// // // // //             }}>
// // // // //               Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
// // // // //             </p>
// // // // //             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
// // // // //               <button
// // // // //                 onClick={onHideBulkDeleteModal}
// // // // //                 style={{
// // // // //                   background: '#6b7280',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={onBulkDelete}
// // // // //                 style={{
// // // // //                   background: '#ef4444',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 Delete All
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // }



// // // // // components/videogallerycomponents/Modals.jsx
// // // // import VideoOptionsModal from './VideoOptionsModal';
// // // // import ProductsModal from './ProductsModal';

// // // // export default function Modals({
// // // //   showVideoOptions,
// // // //   showProductsModal,
// // // //   showDeleteModal,
// // // //   showBulkDeleteModal,
// // // //   products,
// // // //   selectedProducts,
// // // //   selectedVideos,
// // // //   loadingProducts,
// // // //   onHideVideoOptions,
// // // //   onCopyUrl,
// // // //   onDownload,
// // // //   onLoadProducts,
// // // //   onDelete,
// // // //   onHideDeleteModal,
// // // //   onBulkDelete,
// // // //   onHideBulkDeleteModal,
// // // //   onToggleProduct,
// // // //   onSaveProducts,
// // // //   onHideProductsModal,
// // // //   isDarkTheme
// // // // }) {
// // // //   return (
// // // //     <>
// // // //       {/* Video Options Modal */}
// // // //       <VideoOptionsModal
// // // //         showVideoOptions={showVideoOptions}
// // // //         onHide={onHideVideoOptions}
// // // //         onCopyUrl={onCopyUrl}
// // // //         onDownload={onDownload}
// // // //         onLoadProducts={onLoadProducts}
// // // //         onDelete={onDelete}
// // // //         isDarkTheme={isDarkTheme}
// // // //         selectedProducts={selectedProducts}
// // // //       />

// // // //       {/* Products Modal */}
// // // //       {showProductsModal.show && (
// // // //         <div style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           justifyContent: 'center',
// // // //           zIndex: 1000,
// // // //           padding: '2rem'
// // // //         }}>
// // // //           <div style={{
// // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // //             borderRadius: '12px',
// // // //             padding: '2rem',
// // // //             maxWidth: '600px',
// // // //             width: '100%',
// // // //             maxHeight: '80vh',
// // // //             overflow: 'auto'
// // // //           }}>
// // // //             <h3 style={{ 
// // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // //               marginBottom: '1rem',
// // // //               fontSize: '1.25rem',
// // // //               fontWeight: '600'
// // // //             }}>
// // // //               Select Products for "{showProductsModal.video?.title}"
// // // //             </h3>
            
// // // //             {loadingProducts ? (
// // // //               <div style={{ 
// // // //                 textAlign: 'center', 
// // // //                 padding: '2rem',
// // // //                 color: isDarkTheme ? '#d1d5db' : '#6b7280'
// // // //               }}>
// // // //                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// // // //                 Loading products...
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 <div style={{ 
// // // //                   maxHeight: '400px', 
// // // //                   overflow: 'auto',
// // // //                   marginBottom: '1.5rem'
// // // //                 }}>
// // // //                   {products.map(product => (
// // // //                     <div key={product.id} style={{
// // // //                       display: 'flex',
// // // //                       alignItems: 'center',
// // // //                       padding: '0.75rem',
// // // //                       border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
// // // //                       borderRadius: '8px',
// // // //                       marginBottom: '0.5rem',
// // // //                       background: selectedProducts.has(product.id) 
// // // //                         ? (isDarkTheme ? '#374151' : '#f3f4f6')
// // // //                         : 'transparent',
// // // //                       cursor: 'pointer',
// // // //                       transition: 'all 0.2s ease'
// // // //                     }}
// // // //                     onClick={() => onToggleProduct(product.id)}
// // // //                     >
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={selectedProducts.has(product.id)}
// // // //                         onChange={() => onToggleProduct(product.id)}
// // // //                         style={{ 
// // // //                           marginRight: '1rem',
// // // //                           width: '18px',
// // // //                           height: '18px',
// // // //                           cursor: 'pointer'
// // // //                         }}
// // // //                       />
// // // //                       {product.image_url && (
// // // //                         <img 
// // // //                           src={product.image_url} 
// // // //                           alt={product.title}
// // // //                           style={{
// // // //                             width: '40px',
// // // //                             height: '40px',
// // // //                             borderRadius: '6px',
// // // //                             objectFit: 'cover',
// // // //                             marginRight: '1rem'
// // // //                           }}
// // // //                         />
// // // //                       )}
// // // //                       <div style={{ flex: 1 }}>
// // // //                         <div style={{ 
// // // //                           fontWeight: '500',
// // // //                           color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // //                           fontSize: '0.9rem',
// // // //                           marginBottom: '0.25rem'
// // // //                         }}>
// // // //                           {product.title}
// // // //                         </div>
// // // //                         <div style={{ 
// // // //                           color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // //                           fontSize: '0.8rem'
// // // //                         }}>
// // // //                           ${product.price}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
                
// // // //                 <div style={{ 
// // // //                   display: 'flex', 
// // // //                   gap: '1rem', 
// // // //                   justifyContent: 'flex-end'
// // // //                 }}>
// // // //                   <button
// // // //                     onClick={onHideProductsModal}
// // // //                     style={{
// // // //                       background: '#6b7280',
// // // //                       color: 'white',
// // // //                       border: 'none',
// // // //                       padding: '0.75rem 1.5rem',
// // // //                       borderRadius: '8px',
// // // //                       cursor: 'pointer',
// // // //                       fontWeight: '500',
// // // //                       fontSize: '0.875rem',
// // // //                       transition: 'background-color 0.2s'
// // // //                     }}
// // // //                     onMouseEnter={(e) => {
// // // //                       e.target.style.background = '#4b5563';
// // // //                     }}
// // // //                     onMouseLeave={(e) => {
// // // //                       e.target.style.background = '#6b7280';
// // // //                     }}
// // // //                   >
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={onSaveProducts}
// // // //                     style={{
// // // //                       background: '#10b981',
// // // //                       color: 'white',
// // // //                       border: 'none',
// // // //                       padding: '0.75rem 1.5rem',
// // // //                       borderRadius: '8px',
// // // //                       cursor: 'pointer',
// // // //                       fontWeight: '500',
// // // //                       fontSize: '0.875rem',
// // // //                       transition: 'background-color 0.2s'
// // // //                     }}
// // // //                     onMouseEnter={(e) => {
// // // //                       e.target.style.background = '#059669';
// // // //                     }}
// // // //                     onMouseLeave={(e) => {
// // // //                       e.target.style.background = '#10b981';
// // // //                     }}
// // // //                   >
// // // //                     💾 Save Products ({selectedProducts.size})
// // // //                   </button>
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Single Delete Modal */}
// // // //       {showDeleteModal.show && (
// // // //         <div style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           justifyContent: 'center',
// // // //           zIndex: 1000
// // // //         }}>
// // // //           <div style={{
// // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // //             borderRadius: '12px',
// // // //             padding: '2rem',
// // // //             maxWidth: '400px',
// // // //             width: '100%'
// // // //           }}>
// // // //             <h3 style={{ 
// // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // //               marginBottom: '1rem',
// // // //               fontSize: '1.25rem',
// // // //               fontWeight: '600'
// // // //             }}>
// // // //               Delete Video
// // // //             </h3>
// // // //             <p style={{ 
// // // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // // //               marginBottom: '2rem',
// // // //               lineHeight: '1.5'
// // // //             }}>
// // // //               Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
// // // //             </p>
// // // //             <div style={{ 
// // // //               display: 'flex', 
// // // //               gap: '1rem', 
// // // //               justifyContent: 'flex-end' 
// // // //             }}>
// // // //               <button
// // // //                 onClick={onHideDeleteModal}
// // // //                 style={{
// // // //                   background: '#6b7280',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.75rem 1.5rem',
// // // //                   borderRadius: '8px',
// // // //                   cursor: 'pointer',
// // // //                   fontWeight: '500',
// // // //                   fontSize: '0.875rem',
// // // //                   transition: 'background-color 0.2s'
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.background = '#4b5563';
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.background = '#6b7280';
// // // //                 }}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => onDelete(showDeleteModal.videoId)}
// // // //                 style={{
// // // //                   background: '#ef4444',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.75rem 1.5rem',
// // // //                   borderRadius: '8px',
// // // //                   cursor: 'pointer',
// // // //                   fontWeight: '500',
// // // //                   fontSize: '0.875rem',
// // // //                   transition: 'background-color 0.2s'
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.background = '#dc2626';
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.background = '#ef4444';
// // // //                 }}
// // // //               >
// // // //                 Delete
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Bulk Delete Modal */}
// // // //       {showBulkDeleteModal && (
// // // //         <div style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           justifyContent: 'center',
// // // //           zIndex: 1000
// // // //         }}>
// // // //           <div style={{
// // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // //             borderRadius: '12px',
// // // //             padding: '2rem',
// // // //             maxWidth: '400px',
// // // //             width: '100%'
// // // //           }}>
// // // //             <h3 style={{ 
// // // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // // //               marginBottom: '1rem',
// // // //               fontSize: '1.25rem',
// // // //               fontWeight: '600'
// // // //             }}>
// // // //               Delete {selectedVideos.size} Videos
// // // //             </h3>
// // // //             <p style={{ 
// // // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // // //               marginBottom: '2rem',
// // // //               lineHeight: '1.5'
// // // //             }}>
// // // //               Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
// // // //             </p>
// // // //             <div style={{ 
// // // //               display: 'flex', 
// // // //               gap: '1rem', 
// // // //               justifyContent: 'flex-end' 
// // // //             }}>
// // // //               <button
// // // //                 onClick={onHideBulkDeleteModal}
// // // //                 style={{
// // // //                   background: '#6b7280',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.75rem 1.5rem',
// // // //                   borderRadius: '8px',
// // // //                   cursor: 'pointer',
// // // //                   fontWeight: '500',
// // // //                   fontSize: '0.875rem',
// // // //                   transition: 'background-color 0.2s'
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.background = '#4b5563';
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.background = '#6b7280';
// // // //                 }}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={onBulkDelete}
// // // //                 style={{
// // // //                   background: '#ef4444',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.75rem 1.5rem',
// // // //                   borderRadius: '8px',
// // // //                   cursor: 'pointer',
// // // //                   fontWeight: '500',
// // // //                   fontSize: '0.875rem',
// // // //                   transition: 'background-color 0.2s'
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.background = '#dc2626';
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.background = '#ef4444';
// // // //                 }}
// // // //               >
// // // //                 Delete All
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }






// // // // components/videogallerycomponents/Modals.jsx
// // // import VideoOptionsModal from './VideoOptionsModal';
// // // import ProductsModal from './ProductsModal';

// // // export default function Modals({
// // //   showVideoOptions,
// // //   showProductsModal,
// // //   showDeleteModal,
// // //   showBulkDeleteModal,
// // //   products,
// // //   selectedProducts,
// // //   selectedVideos,
// // //   loadingProducts,
// // //   onHideVideoOptions,
// // //   onCopyUrl,
// // //   onDownload,
// // //   onLoadProducts,
// // //   onDelete,
// // //   onHideDeleteModal,
// // //   onBulkDelete,
// // //   onHideBulkDeleteModal,
// // //   onToggleProduct,
// // //   onSaveProducts,
// // //   onHideProductsModal,
// // //   isDarkTheme,
// // //   showVideoPlayerModal // Add this prop
// // // }) {
// // //   return (
// // //     <>
// // //       {/* Video Options Modal */}
// // //       <VideoOptionsModal
// // //         showVideoOptions={showVideoOptions}
// // //         onHide={onHideVideoOptions}
// // //         onCopyUrl={onCopyUrl}
// // //         onDownload={onDownload}
// // //         onLoadProducts={onLoadProducts}
// // //         onDelete={onDelete}
// // //         isDarkTheme={isDarkTheme}
// // //         selectedProducts={selectedProducts}
// // //         products={products}
// // //         onToggleProduct={onToggleProduct}
// // //         onSaveProducts={onSaveProducts}
// // //         showVideoPlayerModal={showVideoPlayerModal}
// // //       />

// // //       {/* Products Modal */}
// // //       {showProductsModal.show && (
// // //         <div style={{
// // //           position: 'fixed',
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           background: 'rgba(0, 0, 0, 0.5)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           zIndex: 1000,
// // //           padding: '2rem'
// // //         }}>
// // //           <div style={{
// // //             background: isDarkTheme ? '#1f2937' : 'white',
// // //             borderRadius: '12px',
// // //             padding: '2rem',
// // //             maxWidth: '600px',
// // //             width: '100%',
// // //             maxHeight: '80vh',
// // //             overflow: 'auto'
// // //           }}>
// // //             <h3 style={{ 
// // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // //               marginBottom: '1rem',
// // //               fontSize: '1.25rem',
// // //               fontWeight: '600'
// // //             }}>
// // //               Select Products for "{showProductsModal.video?.title}"
// // //             </h3>
            
// // //             {loadingProducts ? (
// // //               <div style={{ 
// // //                 textAlign: 'center', 
// // //                 padding: '2rem',
// // //                 color: isDarkTheme ? '#d1d5db' : '#6b7280'
// // //               }}>
// // //                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// // //                 Loading products...
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div style={{ 
// // //                   maxHeight: '400px', 
// // //                   overflow: 'auto',
// // //                   marginBottom: '1.5rem'
// // //                 }}>
// // //                   {products.map(product => (
// // //                     <div key={product.id} style={{
// // //                       display: 'flex',
// // //                       alignItems: 'center',
// // //                       padding: '0.75rem',
// // //                       border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
// // //                       borderRadius: '8px',
// // //                       marginBottom: '0.5rem',
// // //                       background: selectedProducts.has(product.id) 
// // //                         ? (isDarkTheme ? '#374151' : '#f3f4f6')
// // //                         : 'transparent',
// // //                       cursor: 'pointer',
// // //                       transition: 'all 0.2s ease'
// // //                     }}
// // //                     onClick={() => onToggleProduct(product.id)}
// // //                     >
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedProducts.has(product.id)}
// // //                         onChange={() => onToggleProduct(product.id)}
// // //                         style={{ 
// // //                           marginRight: '1rem',
// // //                           width: '18px',
// // //                           height: '18px',
// // //                           cursor: 'pointer'
// // //                         }}
// // //                       />
// // //                       {product.image_url && (
// // //                         <img 
// // //                           src={product.image_url} 
// // //                           alt={product.title}
// // //                           style={{
// // //                             width: '40px',
// // //                             height: '40px',
// // //                             borderRadius: '6px',
// // //                             objectFit: 'cover',
// // //                             marginRight: '1rem'
// // //                           }}
// // //                         />
// // //                       )}
// // //                       <div style={{ flex: 1 }}>
// // //                         <div style={{ 
// // //                           fontWeight: '500',
// // //                           color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // //                           fontSize: '0.9rem',
// // //                           marginBottom: '0.25rem'
// // //                         }}>
// // //                           {product.title}
// // //                         </div>
// // //                         <div style={{ 
// // //                           color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // //                           fontSize: '0.8rem'
// // //                         }}>
// // //                           ${product.price}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
                
// // //                 <div style={{ 
// // //                   display: 'flex', 
// // //                   gap: '1rem', 
// // //                   justifyContent: 'flex-end'
// // //                 }}>
// // //                   <button
// // //                     onClick={onHideProductsModal}
// // //                     style={{
// // //                       background: '#6b7280',
// // //                       color: 'white',
// // //                       border: 'none',
// // //                       padding: '0.75rem 1.5rem',
// // //                       borderRadius: '8px',
// // //                       cursor: 'pointer',
// // //                       fontWeight: '500',
// // //                       fontSize: '0.875rem',
// // //                       transition: 'background-color 0.2s'
// // //                     }}
// // //                     onMouseEnter={(e) => {
// // //                       e.target.style.background = '#4b5563';
// // //                     }}
// // //                     onMouseLeave={(e) => {
// // //                       e.target.style.background = '#6b7280';
// // //                     }}
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     onClick={onSaveProducts}
// // //                     style={{
// // //                       background: '#10b981',
// // //                       color: 'white',
// // //                       border: 'none',
// // //                       padding: '0.75rem 1.5rem',
// // //                       borderRadius: '8px',
// // //                       cursor: 'pointer',
// // //                       fontWeight: '500',
// // //                       fontSize: '0.875rem',
// // //                       transition: 'background-color 0.2s'
// // //                     }}
// // //                     onMouseEnter={(e) => {
// // //                       e.target.style.background = '#059669';
// // //                     }}
// // //                     onMouseLeave={(e) => {
// // //                       e.target.style.background = '#10b981';
// // //                     }}
// // //                   >
// // //                     💾 Save Products ({selectedProducts.size})
// // //                   </button>
// // //                 </div>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Single Delete Modal */}
// // //       {showDeleteModal.show && (
// // //         <div style={{
// // //           position: 'fixed',
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           background: 'rgba(0, 0, 0, 0.5)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           zIndex: 1000
// // //         }}>
// // //           <div style={{
// // //             background: isDarkTheme ? '#1f2937' : 'white',
// // //             borderRadius: '12px',
// // //             padding: '2rem',
// // //             maxWidth: '400px',
// // //             width: '100%'
// // //           }}>
// // //             <h3 style={{ 
// // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // //               marginBottom: '1rem',
// // //               fontSize: '1.25rem',
// // //               fontWeight: '600'
// // //             }}>
// // //               Delete Video
// // //             </h3>
// // //             <p style={{ 
// // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // //               marginBottom: '2rem',
// // //               lineHeight: '1.5'
// // //             }}>
// // //               Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
// // //             </p>
// // //             <div style={{ 
// // //               display: 'flex', 
// // //               gap: '1rem', 
// // //               justifyContent: 'flex-end' 
// // //             }}>
// // //               <button
// // //                 onClick={onHideDeleteModal}
// // //                 style={{
// // //                   background: '#6b7280',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.75rem 1.5rem',
// // //                   borderRadius: '8px',
// // //                   cursor: 'pointer',
// // //                   fontWeight: '500',
// // //                   fontSize: '0.875rem',
// // //                   transition: 'background-color 0.2s'
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.background = '#4b5563';
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.background = '#6b7280';
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={() => onDelete(showDeleteModal.videoId)}
// // //                 style={{
// // //                   background: '#ef4444',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.75rem 1.5rem',
// // //                   borderRadius: '8px',
// // //                   cursor: 'pointer',
// // //                   fontWeight: '500',
// // //                   fontSize: '0.875rem',
// // //                   transition: 'background-color 0.2s'
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.background = '#dc2626';
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.background = '#ef4444';
// // //                 }}
// // //               >
// // //                 Delete
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Bulk Delete Modal */}
// // //       {showBulkDeleteModal && (
// // //         <div style={{
// // //           position: 'fixed',
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           background: 'rgba(0, 0, 0, 0.5)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           zIndex: 1000
// // //         }}>
// // //           <div style={{
// // //             background: isDarkTheme ? '#1f2937' : 'white',
// // //             borderRadius: '12px',
// // //             padding: '2rem',
// // //             maxWidth: '400px',
// // //             width: '100%'
// // //           }}>
// // //             <h3 style={{ 
// // //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// // //               marginBottom: '1rem',
// // //               fontSize: '1.25rem',
// // //               fontWeight: '600'
// // //             }}>
// // //               Delete {selectedVideos.size} Videos
// // //             </h3>
// // //             <p style={{ 
// // //               color: isDarkTheme ? '#d1d5db' : '#6b7280',
// // //               marginBottom: '2rem',
// // //               lineHeight: '1.5'
// // //             }}>
// // //               Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
// // //             </p>
// // //             <div style={{ 
// // //               display: 'flex', 
// // //               gap: '1rem', 
// // //               justifyContent: 'flex-end' 
// // //             }}>
// // //               <button
// // //                 onClick={onHideBulkDeleteModal}
// // //                 style={{
// // //                   background: '#6b7280',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.75rem 1.5rem',
// // //                   borderRadius: '8px',
// // //                   cursor: 'pointer',
// // //                   fontWeight: '500',
// // //                   fontSize: '0.875rem',
// // //                   transition: 'background-color 0.2s'
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.background = '#4b5563';
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.background = '#6b7280';
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={onBulkDelete}
// // //                 style={{
// // //                   background: '#ef4444',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.75rem 1.5rem',
// // //                   borderRadius: '8px',
// // //                   cursor: 'pointer',
// // //                   fontWeight: '500',
// // //                   fontSize: '0.875rem',
// // //                   transition: 'background-color 0.2s'
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.background = '#dc2626';
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.background = '#ef4444';
// // //                 }}
// // //               >
// // //                 Delete All
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }



// // // components/videogallerycomponents/Modals.jsx
// // import VideoOptionsModal from './VideoOptionsModal';

// // export default function Modals({
// //   showVideoOptions,
// //   showProductsModal,
// //   showDeleteModal,
// //   showBulkDeleteModal,
// //   products,
// //   selectedProducts,
// //   selectedVideos,
// //   loadingProducts,
// //   onHideVideoOptions,
// //   onCopyUrl,
// //   onDownload,
// //   onLoadProducts,
// //   onDelete,
// //   onHideDeleteModal,
// //   onBulkDelete,
// //   onHideBulkDeleteModal,
// //   onToggleProduct,
// //   onSaveProducts,
// //   onHideProductsModal,
// //   isDarkTheme
// // }) {
// //   return (
// //     <>
// //       {/* Video Options Modal */}
// //       <VideoOptionsModal
// //         showVideoOptions={showVideoOptions}
// //         onHide={onHideVideoOptions}
// //         onCopyUrl={onCopyUrl}
// //         onDownload={onDownload}
// //         onLoadProducts={onLoadProducts}
// //         onDelete={onDelete}
// //         isDarkTheme={isDarkTheme}
// //       />

// //       {/* Products Modal */}
// //       {showProductsModal.show && (
// //         <div style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: 'rgba(0, 0, 0, 0.5)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           zIndex: 1000,
// //           padding: '2rem'
// //         }}>
// //           <div style={{
// //             background: isDarkTheme ? '#1f2937' : 'white',
// //             borderRadius: '12px',
// //             padding: '2rem',
// //             maxWidth: '500px',
// //             width: '100%',
// //             maxHeight: '80vh',
// //             overflow: 'auto'
// //           }}>
// //             <h3 style={{ 
// //               color: isDarkTheme ? '#f9fafb' : '#1f2937',
// //               marginBottom: '1rem'
// //             }}>
// //               Select Products for "{showProductsModal.video?.title}"
// //             </h3>
            
// //             {loadingProducts ? (
// //               <div style={{ textAlign: 'center', padding: '2rem' }}>
// //                 Loading products...
// //               </div>
// //             ) : (
// //               <>
// //                 <div style={{ 
// //                   maxHeight: '400px', 
// //                   overflow: 'auto',
// //                   marginBottom: '1.5rem'
// //                 }}>
// //                   {products.map(product => (
// //                     <div key={product.id} style={{
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       padding: '0.75rem',
// //                       border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
// //                       borderRadius: '8px',
// //                       marginBottom: '0.5rem',
// //                       background: selectedProducts.has(product.id) 
// //                         ? (isDarkTheme ? '#374151' : '#f3f4f6')
// //                         : 'transparent',
// //                       cursor: 'pointer'
// //                     }}
// //                     onClick={() => onToggleProduct(product.id)}
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedProducts.has(product.id)}
// //                         onChange={() => onToggleProduct(product.id)}
// //                         style={{ marginRight: '1rem' }}
// //                       />
// //                       {product.image_url && (
// //                         <img 
// //                           src={product.image_url} 
// //                           alt={product.title}
// //                           style={{
// //                             width: '40px',
// //                             height: '40px',
// //                             borderRadius: '6px',
// //                             objectFit: 'cover',
// //                             marginRight: '1rem'
// //                           }}
// //                         />
// //                       )}
// //                       <div style={{ flex: 1 }}>
// //                         <div style={{ fontWeight: '500' }}>
// //                           {product.title}
// //                         </div>
// //                         <div style={{ color: isDarkTheme ? '#9ca3af' : '#6b7280' }}>
// //                           ${product.price}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
// //                   <button
// //                     onClick={onHideProductsModal}
// //                     style={{
// //                       background: '#6b7280',
// //                       color: 'white',
// //                       border: 'none',
// //                       padding: '0.75rem 1.5rem',
// //                       borderRadius: '8px',
// //                       cursor: 'pointer'
// //                     }}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={onSaveProducts}
// //                     style={{
// //                       background: '#10b981',
// //                       color: 'white',
// //                       border: 'none',
// //                       padding: '0.75rem 1.5rem',
// //                       borderRadius: '8px',
// //                       cursor: 'pointer'
// //                     }}
// //                   >
// //                     Save Products ({selectedProducts.size})
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* Single Delete Modal */}
// //       {showDeleteModal.show && (
// //         <div style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: 'rgba(0, 0, 0, 0.5)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           zIndex: 1000
// //         }}>
// //           <div style={{
// //             background: isDarkTheme ? '#1f2937' : 'white',
// //             borderRadius: '12px',
// //             padding: '2rem',
// //             maxWidth: '400px',
// //             width: '100%'
// //           }}>
// //             <h3 style={{ color: isDarkTheme ? '#f9fafb' : '#1f2937', marginBottom: '1rem' }}>
// //               Confirm Delete
// //             </h3>
// //             <p style={{ color: isDarkTheme ? '#d1d5db' : '#6b7280', marginBottom: '2rem' }}>
// //               Are you sure you want to delete "{showDeleteModal.videoTitle}"?
// //             </p>
// //             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
// //               <button
// //                 onClick={onHideDeleteModal}
// //                 style={{
// //                   background: '#6b7280',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '8px',
// //                   cursor: 'pointer'
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() => onDelete(showDeleteModal.videoId)}
// //                 style={{
// //                   background: '#ef4444',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '8px',
// //                   cursor: 'pointer'
// //                 }}
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Bulk Delete Modal */}
// //       {showBulkDeleteModal && (
// //         <div style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: 'rgba(0, 0, 0, 0.5)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           zIndex: 1000
// //         }}>
// //           <div style={{
// //             background: isDarkTheme ? '#1f2937' : 'white',
// //             borderRadius: '12px',
// //             padding: '2rem',
// //             maxWidth: '400px',
// //             width: '100%'
// //           }}>
// //             <h3 style={{ color: isDarkTheme ? '#f9fafb' : '#1f2937', marginBottom: '1rem' }}>
// //               Confirm Bulk Delete
// //             </h3>
// //             <p style={{ color: isDarkTheme ? '#d1d5db' : '#6b7280', marginBottom: '2rem' }}>
// //               Delete {selectedVideos.size} selected videos?
// //             </p>
// //             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
// //               <button
// //                 onClick={onHideBulkDeleteModal}
// //                 style={{
// //                   background: '#6b7280',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '8px',
// //                   cursor: 'pointer'
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={onBulkDelete}
// //                 style={{
// //                   background: '#ef4444',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '8px',
// //                   cursor: 'pointer'
// //                 }}
// //               >
// //                 Delete All
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }



// // components/videogallerycomponents/Modals.jsx
// import VideoOptionsModal from './VideoOptionsModal';
// import ProductsModal from './ProductsModal';
// import TagProductsModal from './TagProducts';

// export default function Modals({
//   showVideoOptions,
//   showProductsModal,
//   showDeleteModal,
//   showBulkDeleteModal,
//   products = [],
//   selectedProducts = new Set(),
//   selectedVideos = new Set(),
//   loadingProducts = false,
//   onHideVideoOptions,
//   onCopyUrl,
//   onDownload,
//   onLoadProducts,
//   onDelete,
//   onHideDeleteModal,
//   onBulkDelete,
//   onHideBulkDeleteModal,
//   onToggleProduct,
//   onSaveProducts,
//   onHideProductsModal,
//   isDarkTheme,
//   showVideoPlayerModal
// }) {
//   return (
//     <>
//       {/* Video Options Modal */}
//       <VideoOptionsModal
//         showVideoOptions={showVideoOptions}
//         onHide={onHideVideoOptions}
//         onCopyUrl={onCopyUrl}
//         onDownload={onDownload}
//         onLoadProducts={onLoadProducts}
//         onDelete={onDelete}
//         isDarkTheme={isDarkTheme}
//         selectedProducts={selectedProducts}
//         products={products}
//         onToggleProduct={onToggleProduct}
//         onSaveProducts={onSaveProducts}
//         showVideoPlayerModal={showVideoPlayerModal}
//       />
//   {/* NEW: Tag Products Modal - for tag products button */}
//   <TagProductsModal
//         showTagProducts={showVideoOptions} // Use same state
//         onHide={onHideVideoOptions} // Use same hide function
//         onLoadProducts={onLoadProducts}
//         isDarkTheme={isDarkTheme}
//         selectedProducts={selectedProducts}
//         products={products}
//         onToggleProduct={onToggleProduct}
//         onSaveProducts={onSaveProducts}
//       />
//       {/* Products Modal */}
//       <ProductsModal
//         showProductsModal={showProductsModal}
//         products={products}
//         selectedProducts={selectedProducts}
//         loadingProducts={loadingProducts}
//         onToggleProduct={onToggleProduct}
//         onSaveProducts={onSaveProducts}
//         onHide={onHideProductsModal}
//         isDarkTheme={isDarkTheme}
//       />

//       {/* Single Delete Modal */}
//       {showDeleteModal.show && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             background: isDarkTheme ? '#1f2937' : 'white',
//             borderRadius: '12px',
//             padding: '2rem',
//             maxWidth: '400px',
//             width: '100%'
//           }}>
//             <h3 style={{ 
//               color: isDarkTheme ? '#f9fafb' : '#1f2937',
//               marginBottom: '1rem'
//             }}>
//               Confirm Delete
//             </h3>
//             <p style={{ 
//               color: isDarkTheme ? '#d1d5db' : '#6b7280',
//               marginBottom: '2rem'
//             }}>
//               Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
//             </p>
//             <div style={{ 
//               display: 'flex', 
//               gap: '1rem', 
//               justifyContent: 'flex-end' 
//             }}>
//               <button
//                 onClick={onHideDeleteModal}
//                 style={{
//                   background: '#6b7280',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => onDelete(showDeleteModal.videoId)}
//                 style={{
//                   background: '#ef4444',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bulk Delete Modal */}
//       {showBulkDeleteModal && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             background: isDarkTheme ? '#1f2937' : 'white',
//             borderRadius: '12px',
//             padding: '2rem',
//             maxWidth: '400px',
//             width: '100%'
//           }}>
//             <h3 style={{ 
//               color: isDarkTheme ? '#f9fafb' : '#1f2937',
//               marginBottom: '1rem'
//             }}>
//               Confirm Bulk Delete
//             </h3>
//             <p style={{ 
//               color: isDarkTheme ? '#d1d5db' : '#6b7280',
//               marginBottom: '2rem'
//             }}>
//               Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
//             </p>
//             <div style={{ 
//               display: 'flex', 
//               gap: '1rem', 
//               justifyContent: 'flex-end' 
//             }}>
//               <button
//                 onClick={onHideBulkDeleteModal}
//                 style={{
//                   background: '#6b7280',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onBulkDelete}
//                 style={{
//                   background: '#ef4444',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// components/videogallerycomponents/Modals.jsx
import VideoOptionsModal from './VideoOptionsModal';
import ProductsModal from './ProductsModal';
import TagProductsModal from './TagProducts';

export default function Modals({
  showVideoOptions,
  showProductsModal,
  showDeleteModal,
  showBulkDeleteModal,
  products = [],
  selectedProducts = new Set(),
  selectedVideos = new Set(),
  loadingProducts = false,
  onHideVideoOptions,
  onCopyUrl,
  onDownload,
  onLoadProducts,
  onDelete,
  onHideDeleteModal,
  onBulkDelete,
  onHideBulkDeleteModal,
  onToggleProduct,
  onSaveProducts,
  onHideProductsModal,
  isDarkTheme,
  showVideoPlayerModal,
  // NEW: Separate props for tag products modal
  showTagProductsModal,
  onHideTagProductsModal
}) {
  return (
    <>
      {/* Video Options Modal - opens when video is clicked */}
      <VideoOptionsModal
        showVideoOptions={showVideoOptions}
        onHide={onHideVideoOptions}
        onCopyUrl={onCopyUrl}
        onDownload={onDownload}
        onLoadProducts={onLoadProducts}
        onDelete={onDelete}
        isDarkTheme={isDarkTheme}
        selectedProducts={selectedProducts}
        products={products}
        onToggleProduct={onToggleProduct}
        onSaveProducts={onSaveProducts}
        showVideoPlayerModal={showVideoPlayerModal}
      />

      {/* Tag Products Modal - opens ONLY when tag products button is clicked */}
      {showTagProductsModal && (
        <TagProductsModal
          showTagProducts={showTagProductsModal}
          onHide={onHideTagProductsModal}
          onLoadProducts={onLoadProducts}
          isDarkTheme={isDarkTheme}
          selectedProducts={selectedProducts}
          products={products}
          onToggleProduct={onToggleProduct}
          onSaveProducts={onSaveProducts}
        />
      )}

      {/* Products Modal */}
      <ProductsModal
        showProductsModal={showProductsModal}
        products={products}
        selectedProducts={selectedProducts}
        loadingProducts={loadingProducts}
        onToggleProduct={onToggleProduct}
        onSaveProducts={onSaveProducts}
        onHide={onHideProductsModal}
        isDarkTheme={isDarkTheme}
      />

      {/* Single Delete Modal */}
      {showDeleteModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: isDarkTheme ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ 
              color: isDarkTheme ? '#f9fafb' : '#1f2937',
              marginBottom: '1rem'
            }}>
              Confirm Delete
            </h3>
            <p style={{ 
              color: isDarkTheme ? '#d1d5db' : '#6b7280',
              marginBottom: '2rem'
            }}>
              Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={onHideDeleteModal}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(showDeleteModal.videoId)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: isDarkTheme ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ 
              color: isDarkTheme ? '#f9fafb' : '#1f2937',
              marginBottom: '1rem'
            }}>
              Confirm Bulk Delete
            </h3>
            <p style={{ 
              color: isDarkTheme ? '#d1d5db' : '#6b7280',
              marginBottom: '2rem'
            }}>
              Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={onHideBulkDeleteModal}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={onBulkDelete}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}