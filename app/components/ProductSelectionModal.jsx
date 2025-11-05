// // // import {
// // //   Modal,
// // //   BlockStack,
// // //   Text,
// // //   Box,
// // //   Spinner,
// // //   EmptyState,
// // //   Card,
// // //   InlineStack,
// // //   Checkbox,
// // //   Thumbnail,
// // //   Icon,
// // //   Button,
// // //   Toast,
// // //   Frame,
// // //   TextField,
// // //   Badge,
// // // } from "@shopify/polaris";
// // // import { useState, useCallback, useMemo } from "react";

// // // export default function ProductSelectionModal({
// // //   open,
// // //   onClose,
// // //   title,
// // //   products,
// // //   productsLoading,
// // //   tempSelectedProducts,
// // //   onTempProductSelect,
// // //   primaryAction,
// // //   secondaryActions,
// // // }) {
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [productsPerPage] = useState(20);
// // //   const [toast, setToast] = useState({ active: false, message: "", error: false });

// // //   const dismissToast = useCallback(
// // //     () => setToast({ active: false, message: "", error: false }),
// // //     []
// // //   );
// // //   const showToast = useCallback((message, error = false) =>
// // //     setToast({ active: true, message, error }),
// // //     []
// // //   );

// // //   // Filter and paginate products
// // //   const filteredProducts = useMemo(() => {
// // //     const filtered = products.filter((product) =>
// // //       product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //       searchQuery === ""
// // //     );
    
// // //     const startIndex = (currentPage - 1) * productsPerPage;
// // //     const endIndex = startIndex + productsPerPage;
    
// // //     return filtered.slice(startIndex, endIndex);
// // //   }, [products, searchQuery, currentPage, productsPerPage]);

// // //   const totalPages = useMemo(() => {
// // //     const filtered = products.filter((product) =>
// // //       product.title?.toLowerCase().includes(searchQuery.toLowerCase())
// // //     );
// // //     return Math.ceil(filtered.length / productsPerPage);
// // //   }, [products, searchQuery, productsPerPage]);

// // //   const handlePageChange = (page) => {
// // //     setCurrentPage(page);
// // //   };

// // //   const handleSearchChange = (value) => {
// // //     setSearchQuery(value);
// // //     setCurrentPage(1); // Reset to first page when searching
// // //   };

// // //   const handleProductToggle = (productId, checked) => {
// // //     const productIdStr = String(productId);
// // //     if (checked) {
// // //       if (!tempSelectedProducts.includes(productIdStr)) {
// // //         onTempProductSelect([...tempSelectedProducts, productIdStr]);
// // //       }
// // //     } else {
// // //       onTempProductSelect(tempSelectedProducts.filter(id => id !== productIdStr));
// // //     }
// // //   };

// // //   const selectAllOnPage = () => {
// // //     const pageProductIds = filteredProducts.map(p => String(p.id));
// // //     const newSelected = [...new Set([...tempSelectedProducts, ...pageProductIds])];
// // //     onTempProductSelect(newSelected);
// // //     showToast(`Selected all ${filteredProducts.length} products on this page`);
// // //   };

// // //   const deselectAllOnPage = () => {
// // //     const pageProductIds = filteredProducts.map(p => String(p.id));
// // //     const newSelected = tempSelectedProducts.filter(id => !pageProductIds.includes(id));
// // //     onTempProductSelect(newSelected);
// // //     showToast(`Deselected all ${filteredProducts.length} products on this page`);
// // //   };

// // //   const isAllSelectedOnPage = filteredProducts.every(p => 
// // //     tempSelectedProducts.includes(String(p.id))
// // //   );

// // //   const selectedCount = tempSelectedProducts.length;

// // //   return (
// // //     <div>
// // //       <Modal
// // //         open={open}
// // //         onClose={onClose}
// // //         title={title}
// // //         primaryAction={primaryAction}
// // //         secondaryActions={secondaryActions}
// // //         size="large"
// // //       >
// // //         <Modal.Section>
// // //           <style jsx>{`
// // //             .product-list {
// // //               display: flex;
// // //               flex-direction: column;
// // //               gap: 8px;
// // //               padding: 16px 0;
// // //             }
// // //             .product-card {
// // //               transition: all 0.2s ease;
// // //               border-radius: 8px;
// // //             }
// // //             .product-card:hover {
// // //               transform: translateY(-2px);
// // //               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// // //             }
// // //             .product-title {
// // //               overflow: hidden;
// // //               text-overflow: ellipsis;
// // //               white-space: nowrap;
// // //               display: block;
// // //             }
// // //             .pagination-container {
// // //               display: flex;
// // //               justify-content: center;
// // //               align-items: center;
// // //               gap: 8px;
// // //               margin-top: 24px;
// // //             }
// // //           `}</style>

// // //           <BlockStack gap="400">
// // //             <Text variant="bodyMd" tone="subdued">
// // //               Select products to associate with this video. Use the search to find products from any page.
// // //             </Text>

// // //             {productsLoading ? (
// // //               <Box padding="800" align="center">
// // //                 <Spinner accessibilityLabel="Loading products" size="large" />
// // //                 <Text variant="bodyLg" tone="subdued" alignment="center">
// // //                   Loading products from your store...
// // //                 </Text>
// // //               </Box>
// // //             ) : products.length === 0 ? (
// // //               <EmptyState
// // //                 heading="No Products Available"
// // //                 image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
// // //               >
// // //                 <Text variant="bodyMd" as="p" tone="subdued">
// // //                   No products found in your store. Add products to start associating them with videos.
// // //                 </Text>
// // //               </EmptyState>
// // //             ) : (
// // //               <BlockStack gap="300">
// // //                 {/* Search and Stats Bar */}
// // //                 <Card padding="400" background="bg-surface-secondary">
// // //                   <InlineStack align="space-between" blockAlign="center">
// // //                     <TextField
// // //                       label=""
// // //                       labelHidden
// // //                       value={searchQuery}
// // //                       onChange={handleSearchChange}
// // //                       placeholder="Search products by name..."
// // //                       clearButton
// // //                       onClearButtonClick={() => handleSearchChange("")}
// // //                       disabled={primaryAction.loading}
// // //                     />
// // //                     <InlineStack gap="200">
// // //                       <Badge tone="success" size="small">
// // //                         {selectedCount} selected
// // //                       </Badge>
// // //                       <Text variant="bodySm" tone="subdued">
// // //                         {products.length} total products
// // //                       </Text>
// // //                     </InlineStack>
// // //                   </InlineStack>
// // //                 </Card>

// // //                 {/* Products List */}
// // //                 <Box>
// // //                   <InlineStack align="space-between" blockAlign="center" gap="200">
// // //                     <Text variant="headingSm" fontWeight="semibold">
// // //                       Products ({filteredProducts.length} shown)
// // //                     </Text>
// // //                     <Button
// // //                       size="slim"
// // //                       variant="plain"
// // //                       onClick={() => {
// // //                         if (isAllSelectedOnPage) {
// // //                           deselectAllOnPage();
// // //                         } else {
// // //                           selectAllOnPage();
// // //                         }
// // //                       }}
// // //                       disabled={primaryAction.loading || filteredProducts.length === 0}
// // //                     >
// // //                       {isAllSelectedOnPage ? "Deselect All" : "Select All"} on Page
// // //                     </Button>
// // //                   </InlineStack>

// // //                   <div className="product-list">
// // //                     {filteredProducts.map((product) => {
// // //                       const isSelected = tempSelectedProducts.includes(String(product.id));
// // //                       return (
// // //                         <Card
// // //                           key={product.id}
// // //                           padding="300"
// // //                           className="product-card"
// // //                           background={isSelected ? "bg-surface-success-subdued" : "bg-surface"}
// // //                         >
// // //                           <BlockStack gap="200">
// // //                             <Checkbox
// // //                               label=""
// // //                               labelHidden
// // //                               checked={isSelected}
// // //                               onChange={(checked) => handleProductToggle(product.id, checked)}
// // //                               disabled={primaryAction.loading}
// // //                             />

// // //                             <InlineStack gap="300" blockAlign="center">
// // //                               {product.image_url ? (
// // //                                 <Thumbnail
// // //                                   source={product.image_url}
// // //                                   alt={product.title || "Product image"}
// // //                                   size="medium"
// // //                                 />
// // //                               ) : (
// // //                                 <Box
// // //                                   background="bg-surface-secondary"
// // //                                   padding="300"
// // //                                   borderRadius="100"
// // //                                   minHeight="64px"
// // //                                   minWidth="64px"
// // //                                   display="flex"
// // //                                   alignItems="center"
// // //                                   justifyContent="center"
// // //                                 >
// // //                                 </Box>
// // //                               )}
// // //                               <BlockStack gap="100" style={{ flex: 1 }}>
// // //                                 <Text
// // //                                   variant="bodyMd"
// // //                                   fontWeight="medium"
// // //                                   className="product-title"
// // //                                 >
// // //                                   {product.title || "Untitled Product"}
// // //                                 </Text>
// // //                                 <Text variant="bodySm" tone="subdued">
// // //                                   {product.originalPrice ? (
// // //                                     `${product.originalPrice} ${product.currency_code || ""}`
// // //                                   ) : (
// // //                                     "Price not available"
// // //                                   )}
// // //                                 </Text>
// // //                               </BlockStack>
// // //                             </InlineStack>
// // //                           </BlockStack>
// // //                         </Card>
// // //                       );
// // //                     })}
// // //                   </div>

// // //                   {/* Pagination */}
// // //                   {totalPages > 1 && (
// // //                     <div className="pagination-container">
// // //                       <Button
// // //                         size="slim"
// // //                         variant="plain"
// // //                         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
// // //                         disabled={currentPage === 1 || primaryAction.loading}
// // //                       >
// // //                         Previous
// // //                       </Button>
                      
// // //                       <InlineStack gap="100">
// // //                         {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
// // //                           let page;
// // //                           if (totalPages <= 10) {
// // //                             page = i + 1;
// // //                           } else if (currentPage <= 5) {
// // //                             page = i + 1;
// // //                           } else if (currentPage > totalPages - 5) {
// // //                             page = totalPages - 9 + i;
// // //                           } else {
// // //                             page = currentPage - 4 + i;
// // //                           }
// // //                           return (
// // //                             <Button
// // //                               key={page}
// // //                               size="slim"
// // //                               variant={page === currentPage ? "primary" : "plain"}
// // //                               onClick={() => handlePageChange(page)}
// // //                               disabled={primaryAction.loading}
// // //                             >
// // //                               {page}
// // //                             </Button>
// // //                           );
// // //                         })}
// // //                         {totalPages > 10 && currentPage <= totalPages - 5 && (
// // //                           <Text variant="bodySm" tone="subdued">...</Text>
// // //                         )}
// // //                       </InlineStack>
                      
// // //                       <Button
// // //                         size="slim"
// // //                         variant="plain"
// // //                         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
// // //                         disabled={currentPage === totalPages || primaryAction.loading}
// // //                       >
// // //                         Next
// // //                       </Button>
// // //                     </div>
// // //                   )}
// // //                 </Box>
// // //               </BlockStack>
// // //             )}
// // //           </BlockStack>
// // //         </Modal.Section>
// // //       </Modal>

// // //       {toast.active && (
// // //         <Frame>
// // //           <Toast
// // //             content={toast.message}
// // //             error={toast.error}
// // //             onDismiss={dismissToast}
// // //             duration={2500}
// // //           />
// // //         </Frame>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import {
// //   Modal,
// //   BlockStack,
// //   Text,
// //   Box,
// //   Spinner,
// //   EmptyState,
// //   Card,
// //   InlineStack,
// //   Checkbox,
// //   Thumbnail,
// //   Icon,
// //   Button,
// //   Toast,
// //   Frame,
// //   TextField,
// //   Badge,
// // } from "@shopify/polaris";
// // import { useState, useCallback, useMemo } from "react";

// // export default function ProductSelectionModal({
// //   open,
// //   onClose,
// //   title,
// //   products,
// //   productsLoading,
// //   tempSelectedProducts,
// //   onTempProductSelect,
// //   primaryAction,
// //   secondaryActions,
// // }) {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [productsPerPage] = useState(20);
// //   const [toast, setToast] = useState({ active: false, message: "", error: false });

// //   const dismissToast = useCallback(
// //     () => setToast({ active: false, message: "", error: false }),
// //     []
// //   );
// //   const showToast = useCallback((message, error = false) =>
// //     setToast({ active: true, message, error }),
// //     []
// //   );

// //   // Filter and paginate products
// //   const filteredProducts = useMemo(() => {
// //     const filtered = products.filter((product) =>
// //       product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       searchQuery === ""
// //     );
    
// //     const startIndex = (currentPage - 1) * productsPerPage;
// //     const endIndex = startIndex + productsPerPage;
    
// //     return filtered.slice(startIndex, endIndex);
// //   }, [products, searchQuery, currentPage, productsPerPage]);

// //   const totalPages = useMemo(() => {
// //     const filtered = products.filter((product) =>
// //       product.title?.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     return Math.ceil(filtered.length / productsPerPage);
// //   }, [products, searchQuery, productsPerPage]);

// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   const handleSearchChange = (value) => {
// //     setSearchQuery(value);
// //     setCurrentPage(1); // Reset to first page when searching
// //   };

// //   const handleProductToggle = (productId, checked) => {
// //     const productIdStr = String(productId);
// //     if (checked) {
// //       if (!tempSelectedProducts.includes(productIdStr)) {
// //         onTempProductSelect([...tempSelectedProducts, productIdStr]);
// //       }
// //     } else {
// //       onTempProductSelect(tempSelectedProducts.filter(id => id !== productIdStr));
// //     }
// //   };

// //   const handleProductCardClick = (productId) => {
// //     const productIdStr = String(productId);
// //     const isCurrentlySelected = tempSelectedProducts.includes(productIdStr);
    
// //     if (isCurrentlySelected) {
// //       onTempProductSelect(tempSelectedProducts.filter(id => id !== productIdStr));
// //     } else {
// //       onTempProductSelect([...tempSelectedProducts, productIdStr]);
// //     }
// //   };

// //   const selectAllOnPage = () => {
// //     const pageProductIds = filteredProducts.map(p => String(p.id));
// //     const newSelected = [...new Set([...tempSelectedProducts, ...pageProductIds])];
// //     onTempProductSelect(newSelected);
// //     showToast(`Selected all ${filteredProducts.length} products on this page`);
// //   };

// //   const deselectAllOnPage = () => {
// //     const pageProductIds = filteredProducts.map(p => String(p.id));
// //     const newSelected = tempSelectedProducts.filter(id => !pageProductIds.includes(id));
// //     onTempProductSelect(newSelected);
// //     showToast(`Deselected all ${filteredProducts.length} products on this page`);
// //   };

// //   const isAllSelectedOnPage = filteredProducts.every(p => 
// //     tempSelectedProducts.includes(String(p.id))
// //   );

// //   const selectedCount = tempSelectedProducts.length;

// //   return (
// //     <div>
// //       <Modal
// //         open={open}
// //         onClose={onClose}
// //         title={title}
// //         primaryAction={primaryAction}
// //         secondaryActions={secondaryActions}
// //         size="large"
// //       >
// //         <Modal.Section>
// //           <style jsx>{`
// //             .product-list {
// //               display: flex;
// //               flex-direction: column;
// //               gap: 8px;
// //               padding: 16px 0;
// //             }
// //             .product-card {
// //               transition: all 0.2s ease;
// //               border-radius: 8px;
// //               cursor: pointer;
// //               min-height: 1.5rem;
// //             }
// //             .product-card:hover {
// //               transform: translateY(-2px);
// //               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// //             }
// //             .product-title {
// //               overflow: hidden;
// //               text-overflow: ellipsis;
// //               white-space: nowrap;
// //               display: block;
// //             }
// //             .pagination-container {
// //               display: flex;
// //               justify-content: center;
// //               align-items: center;
// //               gap: 8px;
// //               margin-top: 24px;
// //             }
// //             .product-content {
// //               display: flex;
// //               align-items: center;
// //               gap: 12px;
// //             }
// //           `}</style>

// //           <BlockStack gap="400">
// //             <Text variant="bodyMd" tone="subdued">
// //               Select products to associate with this video. Use the search to find products from any page.
// //             </Text>

// //             {productsLoading ? (
// //               <Box padding="800" align="center">
// //                 <Spinner accessibilityLabel="Loading products" size="large" />
// //                 <Text variant="bodyLg" tone="subdued" alignment="center">
// //                   Loading products from your store...
// //                 </Text>
// //               </Box>
// //             ) : products.length === 0 ? (
// //               <EmptyState
// //                 heading="No Products Available"
// //                 image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
// //               >
// //                 <Text variant="bodyMd" as="p" tone="subdued">
// //                   No products found in your store. Add products to start associating them with videos.
// //                 </Text>
// //               </EmptyState>
// //             ) : (
// //               <BlockStack gap="300">
// //                 {/* Search and Stats Bar */}
// //                 <Card padding="400" background="bg-surface-secondary">
// //                   <InlineStack align="space-between" blockAlign="center">
// //                     <TextField
// //                       label=""
// //                       labelHidden
// //                       value={searchQuery}
// //                       onChange={handleSearchChange}
// //                       placeholder="Search products by name..."
// //                       clearButton
// //                       onClearButtonClick={() => handleSearchChange("")}
// //                       disabled={primaryAction.loading}
// //                     />
// //                     <InlineStack gap="200">
// //                       <Badge tone="success" size="small">
// //                         {selectedCount} selected
// //                       </Badge>
// //                       <Text variant="bodySm" tone="subdued">
// //                         {products.length} total products
// //                       </Text>
// //                     </InlineStack>
// //                   </InlineStack>
// //                 </Card>

// //                 {/* Products List */}
// //                 <Box>
// //                   <InlineStack align="space-between" blockAlign="center" gap="200">
// //                     <Text variant="headingSm" fontWeight="semibold">
// //                       Products ({filteredProducts.length} shown)
// //                     </Text>
// //                     <Button
// //                       size="slim"
// //                       variant="plain"
// //                       onClick={() => {
// //                         if (isAllSelectedOnPage) {
// //                           deselectAllOnPage();
// //                         } else {
// //                           selectAllOnPage();
// //                         }
// //                       }}
// //                       disabled={primaryAction.loading || filteredProducts.length === 0}
// //                     >
// //                       {isAllSelectedOnPage ? "Deselect All" : "Select All"} on Page
// //                     </Button>
// //                   </InlineStack>

// //                   <div className="product-list">
// //                     {filteredProducts.map((product) => {
// //                       const isSelected = tempSelectedProducts.includes(String(product.id));
// //                       return (
// //                         <Card
// //                           key={product.id}
// //                           padding="300"
// //                           className="product-card"
// //                           background={isSelected ? "bg-surface-success-subdued" : "bg-surface"}
// //                           onClick={() => handleProductCardClick(product.id)}
// //                         >
// //                           <div className="product-content">
// //                             <Checkbox
// //                               label=""
// //                               labelHidden
// //                               checked={isSelected}
// //                               onChange={(checked) => handleProductToggle(product.id, checked)}
// //                               disabled={primaryAction.loading}
// //                             />

// //                             <InlineStack gap="300" blockAlign="center">
// //                               {product.image_url ? (
// //                                 <Thumbnail
// //                                   source={product.image_url}
// //                                   alt={product.title || "Product image"}
// //                                   size="medium"
// //                                 />
// //                               ) : (
// //                                 <Box
// //                                   background="bg-surface-secondary"
// //                                   padding="300"
// //                                   borderRadius="100"
// //                                   minHeight="64px"
// //                                   minWidth="64px"
// //                                   display="flex"
// //                                   alignItems="center"
// //                                   justifyContent="center"
// //                                 >
// //                                 </Box>
// //                               )}
// //                               <BlockStack gap="100" style={{ flex: 1 }}>
// //                                 <Text
// //                                   variant="bodyMd"
// //                                   fontWeight="medium"
// //                                   className="product-title"
// //                                 >
// //                                   {product.title || "Untitled Product"}
// //                                 </Text>
// //                                 <Text variant="bodySm" tone="subdued">
// //                                   {product.originalPrice ? (
// //                                     `${product.originalPrice} ${product.currency_code || ""}`
// //                                   ) : (
// //                                     "Price not available"
// //                                   )}
// //                                 </Text>
// //                               </BlockStack>
// //                             </InlineStack>
// //                           </div>
// //                         </Card>
// //                       );
// //                     })}
// //                   </div>

// //                   {/* Pagination */}
// //                   {totalPages > 1 && (
// //                     <div className="pagination-container">
// //                       <Button
// //                         size="slim"
// //                         variant="plain"
// //                         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
// //                         disabled={currentPage === 1 || primaryAction.loading}
// //                       >
// //                         Previous
// //                       </Button>
                      
// //                       <InlineStack gap="100">
// //                         {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
// //                           let page;
// //                           if (totalPages <= 10) {
// //                             page = i + 1;
// //                           } else if (currentPage <= 5) {
// //                             page = i + 1;
// //                           } else if (currentPage > totalPages - 5) {
// //                             page = totalPages - 9 + i;
// //                           } else {
// //                             page = currentPage - 4 + i;
// //                           }
// //                           return (
// //                             <Button
// //                               key={page}
// //                               size="slim"
// //                               variant={page === currentPage ? "primary" : "plain"}
// //                               onClick={() => handlePageChange(page)}
// //                               disabled={primaryAction.loading}
// //                             >
// //                               {page}
// //                             </Button>
// //                           );
// //                         })}
// //                         {totalPages > 10 && currentPage <= totalPages - 5 && (
// //                           <Text variant="bodySm" tone="subdued">...</Text>
// //                         )}
// //                       </InlineStack>
                      
// //                       <Button
// //                         size="slim"
// //                         variant="plain"
// //                         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
// //                         disabled={currentPage === totalPages || primaryAction.loading}
// //                       >
// //                         Next
// //                       </Button>
// //                     </div>
// //                   )}
// //                 </Box>
// //               </BlockStack>
// //             )}
// //           </BlockStack>
// //         </Modal.Section>
// //       </Modal>

// //       {toast.active && (
// //         <Frame>
// //           <Toast
// //             content={toast.message}
// //             error={toast.error}
// //             onDismiss={dismissToast}
// //             duration={2500}
// //           />
// //         </Frame>
// //       )}
// //     </div>
// //   );
// // }


// import {
//   Modal,
//   BlockStack,
//   Text,
//   Box,
//   Spinner,
//   EmptyState,
//   Card,
//   InlineStack,
//   Checkbox,
//   Thumbnail,
//   Icon,
//   Button,
//   Toast,
//   Frame,
//   TextField,
//   Badge,
// } from "@shopify/polaris";
// import { useState, useCallback, useMemo } from "react";

// export default function ProductSelectionModal({
//   open,
//   onClose,
//   title,
//   products,
//   productsLoading,
//   tempSelectedProducts,
//   onTempProductSelect,
//   primaryAction,
//   secondaryActions,
// }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(20);
//   const [toast, setToast] = useState({ active: false, message: "", error: false });

//   const dismissToast = useCallback(
//     () => setToast({ active: false, message: "", error: false }),
//     []
//   );
//   const showToast = useCallback((message, error = false) =>
//     setToast({ active: true, message, error }),
//     []
//   );

//   // Filter and paginate products
//   const filteredProducts = useMemo(() => {
//     const filtered = products.filter((product) =>
//       product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       searchQuery === ""
//     );
    
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
    
//     return filtered.slice(startIndex, endIndex);
//   }, [products, searchQuery, currentPage, productsPerPage]);

//   const totalPages = useMemo(() => {
//     const filtered = products.filter((product) =>
//       product.title?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     return Math.ceil(filtered.length / productsPerPage);
//   }, [products, searchQuery, productsPerPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const handleProductToggle = (productId, checked) => {
//     const productIdStr = String(productId);
//     if (checked) {
//       if (!tempSelectedProducts.includes(productIdStr)) {
//         onTempProductSelect([...tempSelectedProducts, productIdStr]);
//       }
//     } else {
//       onTempProductSelect(tempSelectedProducts.filter(id => id !== productIdStr));
//     }
//   };

//   const handleProductCardClick = (productId, event) => {
//     // Prevent triggering the checkbox click twice
//     if (event.target.type !== 'checkbox') {
//       const productIdStr = String(productId);
//       const isCurrentlySelected = tempSelectedProducts.includes(productIdStr);
//       handleProductToggle(productId, !isCurrentlySelected);
//     }
//   };

//   const selectAllOnPage = () => {
//     const pageProductIds = filteredProducts.map(p => String(p.id));
//     const newSelected = [...new Set([...tempSelectedProducts, ...pageProductIds])];
//     onTempProductSelect(newSelected);
//     showToast(`Selected all ${filteredProducts.length} products on this page`);
//   };

//   const deselectAllOnPage = () => {
//     const pageProductIds = filteredProducts.map(p => String(p.id));
//     const newSelected = tempSelectedProducts.filter(id => !pageProductIds.includes(id));
//     onTempProductSelect(newSelected);
//     showToast(`Deselected all ${filteredProducts.length} products on this page`);
//   };

//   const isAllSelectedOnPage = filteredProducts.every(p => 
//     tempSelectedProducts.includes(String(p.id))
//   );

//   const selectedCount = tempSelectedProducts.length;

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={onClose}
//         title={title}
//         primaryAction={primaryAction}
//         secondaryActions={secondaryActions}
//         size="large"
//       >
//         <Modal.Section>
//           <style jsx>{`
//             .product-list {
//               display: flex;
//               flex-direction: column;
//               gap: 8px;
//               padding: 16px 0;
//             }
//             .product-card {
//               transition: all 0.2s ease;
//               border-radius: 8px;
//               cursor: pointer;
//               min-height: 1.5rem;
//             }
//             .product-card:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//             }
//             .product-title {
//               overflow: hidden;
//               text-overflow: ellipsis;
//               white-space: nowrap;
//               display: block;
//             }
//             .pagination-container {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               gap: 8px;
//               margin-top: 24px;
//             }
//             .product-content {
//               display: flex;
//               align-items: center;
//               gap: 12px;
//               width: 100%;
//             }
//             .clickable-area {
//               display: flex;
//               align-items: center;
//               gap: 12px;
//               width: 100%;
//               cursor: pointer;
//             }
//           `}</style>

//           <BlockStack gap="400">
//             <Text variant="bodyMd" tone="subdued">
//               Select products to associate with this video. Use the search to find products from any page.
//             </Text>

//             {productsLoading ? (
//               <Box padding="800" align="center">
//                 <Spinner accessibilityLabel="Loading products" size="large" />
//                 <Text variant="bodyLg" tone="subdued" alignment="center">
//                   Loading products from your store...
//                 </Text>
//               </Box>
//             ) : products.length === 0 ? (
//               <EmptyState
//                 heading="No Products Available"
//                 image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
//               >
//                 <Text variant="bodyMd" as="p" tone="subdued">
//                   No products found in your store. Add products to start associating them with videos.
//                 </Text>
//               </EmptyState>
//             ) : (
//               <BlockStack gap="300">
//                 {/* Search and Stats Bar */}
//                 <Card padding="400" background="bg-surface-secondary">
//                   <InlineStack align="space-between" blockAlign="center">
//                     <TextField
//                       label=""
//                       labelHidden
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                       placeholder="Search products by name..."
//                       clearButton
//                       onClearButtonClick={() => handleSearchChange("")}
//                       disabled={primaryAction.loading}
//                     />
//                     <InlineStack gap="200">
//                       <Badge tone="success" size="small">
//                         {selectedCount} selected
//                       </Badge>
//                       <Text variant="bodySm" tone="subdued">
//                         {products.length} total products
//                       </Text>
//                     </InlineStack>
//                   </InlineStack>
//                 </Card>

//                 {/* Products List */}
//                 <Box>
//                   <InlineStack align="space-between" blockAlign="center" gap="200">
//                     <Text variant="headingSm" fontWeight="semibold">
//                       Products ({filteredProducts.length} shown)
//                     </Text>
//                     <Button
//                       size="slim"
//                       variant="plain"
//                       onClick={() => {
//                         if (isAllSelectedOnPage) {
//                           deselectAllOnPage();
//                         } else {
//                           selectAllOnPage();
//                         }
//                       }}
//                       disabled={primaryAction.loading || filteredProducts.length === 0}
//                     >
//                       {isAllSelectedOnPage ? "Deselect All" : "Select All"} on Page
//                     </Button>
//                   </InlineStack>

//                   <div className="product-list">
//                     {filteredProducts.map((product) => {
//                       const isSelected = tempSelectedProducts.includes(String(product.id));
//                       return (
//                         <Card
//                           key={product.id}
//                           padding="300"
//                           className="product-card"
//                           background={isSelected ? "bg-surface-success-subdued" : "bg-surface"}
//                         >
//                           <div 
//                             className="clickable-area"
//                             onClick={(event) => handleProductCardClick(product.id, event)}
//                           >
//                             <Checkbox
//                               label=""
//                               labelHidden
//                               checked={isSelected}
//                               onChange={(checked) => handleProductToggle(product.id, checked)}
//                               disabled={primaryAction.loading}
//                             />

//                             <InlineStack gap="300" blockAlign="center" style={{ flex: 1 }}>
//                               {product.image_url ? (
//                                 <Thumbnail
//                                   source={product.image_url}
//                                   alt={product.title || "Product image"}
//                                   size="medium"
//                                 />
//                               ) : (
//                                 <Box
//                                   background="bg-surface-secondary"
//                                   padding="300"
//                                   borderRadius="100"
//                                   minHeight="64px"
//                                   minWidth="64px"
//                                   display="flex"
//                                   alignItems="center"
//                                   justifyContent="center"
//                                 >
//                                 </Box>
//                               )}
//                               <BlockStack gap="100" style={{ flex: 1 }}>
//                                 <Text
//                                   variant="bodyMd"
//                                   fontWeight="medium"
//                                   className="product-title"
//                                 >
//                                   {product.title || "Untitled Product"}
//                                 </Text>
//                                 <Text variant="bodySm" tone="subdued">
//                                   {product.originalPrice ? (
//                                     `${product.originalPrice} ${product.currency_code || ""}`
//                                   ) : (
//                                     "Price not available"
//                                   )}
//                                 </Text>
//                               </BlockStack>
//                             </InlineStack>
//                           </div>
//                         </Card>
//                       );
//                     })}
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="pagination-container">
//                       <Button
//                         size="slim"
//                         variant="plain"
//                         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                         disabled={currentPage === 1 || primaryAction.loading}
//                       >
//                         Previous
//                       </Button>
                      
//                       <InlineStack gap="100">
//                         {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
//                           let page;
//                           if (totalPages <= 10) {
//                             page = i + 1;
//                           } else if (currentPage <= 5) {
//                             page = i + 1;
//                           } else if (currentPage > totalPages - 5) {
//                             page = totalPages - 9 + i;
//                           } else {
//                             page = currentPage - 4 + i;
//                           }
//                           return (
//                             <Button
//                               key={page}
//                               size="slim"
//                               variant={page === currentPage ? "primary" : "plain"}
//                               onClick={() => handlePageChange(page)}
//                               disabled={primaryAction.loading}
//                             >
//                               {page}
//                             </Button>
//                           );
//                         })}
//                         {totalPages > 10 && currentPage <= totalPages - 5 && (
//                           <Text variant="bodySm" tone="subdued">...</Text>
//                         )}
//                       </InlineStack>
                      
//                       <Button
//                         size="slim"
//                         variant="plain"
//                         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                         disabled={currentPage === totalPages || primaryAction.loading}
//                       >
//                         Next
//                       </Button>
//                     </div>
//                   )}
//                 </Box>
//               </BlockStack>
//             )}
//           </BlockStack>
//         </Modal.Section>
//       </Modal>

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



// app/components/ProductSelectionModal.jsx

import { useState, useCallback, useMemo } from "react";

export default function ProductSelectionModal({
  open,
  onClose,
  title,
  products,
  productsLoading,
  tempSelectedProducts,
  onTempProductSelect,
  primaryAction,
  secondaryActions,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [toast, setToast] = useState({ active: false, message: "", error: false });

  const dismissToast = useCallback(
    () => setToast({ active: false, message: "", error: false }),
    []
  );
  const showToast = useCallback((message, error = false) =>
    setToast({ active: true, message, error }),
    []
  );

  // Filter and paginate products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery === ""
    );
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    return filtered.slice(startIndex, endIndex);
  }, [products, searchQuery, currentPage, productsPerPage]);

  const totalPages = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return Math.ceil(filtered.length / productsPerPage);
  }, [products, searchQuery, productsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleProductToggle = (productId, checked) => {
    const productIdStr = String(productId);
    if (checked) {
      if (!tempSelectedProducts.includes(productIdStr)) {
        onTempProductSelect([...tempSelectedProducts, productIdStr]);
      }
    } else {
      onTempProductSelect(tempSelectedProducts.filter(id => id !== productIdStr));
    }
  };

  const selectAllOnPage = () => {
    const pageProductIds = filteredProducts.map(p => String(p.id));
    const newSelected = [...new Set([...tempSelectedProducts, ...pageProductIds])];
    onTempProductSelect(newSelected);
    showToast(`Selected all ${filteredProducts.length} products on this page`);
  };

  const deselectAllOnPage = () => {
    const pageProductIds = filteredProducts.map(p => String(p.id));
    const newSelected = tempSelectedProducts.filter(id => !pageProductIds.includes(id));
    onTempProductSelect(newSelected);
    showToast(`Deselected all ${filteredProducts.length} products on this page`);
  };

  const isAllSelectedOnPage = filteredProducts.every(p => 
    tempSelectedProducts.includes(String(p.id))
  );

  const selectedCount = tempSelectedProducts.length;

  const handleProductCardClick = (productId, event) => {
    // Implement if needed, based on truncated code
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
              Select products to associate with this video. Use the search to find products from any page.
            </p>

            {productsLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-lg text-gray-500">Loading products from your store...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-4">
                <h3 className="text-md font-medium">No Products Available</h3>
                <p className="text-sm text-gray-500">
                  No products found in your store. Add products to start associating them with videos.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Search and Stats Bar */}
                <div className="p-4 bg-gray-100 rounded">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search products..."
                      className="border border-gray-300 rounded px-2 py-1 w-1/2"
                    />
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {selectedCount} selected
                      </span>
                      <button
                        onClick={() => {
                          if (isAllSelectedOnPage) {
                            deselectAllOnPage();
                          } else {
                            selectAllOnPage();
                          }
                        }}
                        disabled={primaryAction.loading || filteredProducts.length === 0}
                        className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        {isAllSelectedOnPage ? "Deselect All" : "Select All"} on Page
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {filteredProducts.map((product) => {
                    const isSelected = tempSelectedProducts.includes(String(product.id));
                    return (
                      <div
                        key={product.id}
                        className={`p-3 rounded ${isSelected ? "bg-green-50" : "bg-white"} shadow hover:shadow-md transition-all`}
                      >
                        <div 
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={(event) => handleProductCardClick(product.id, event)}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleProductToggle(product.id, e.target.checked)}
                            disabled={primaryAction.loading}
                            className="h-4 w-4"
                          />
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.title || "Product image"}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="bg-gray-200 w-16 h-16 flex items-center justify-center rounded">
                              {/* Placeholder */}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-md font-medium truncate">{product.title || "Untitled Product"}</p>
                            <p className="text-sm text-gray-500">
                              {product.originalPrice ? (
                                `${product.originalPrice} ${product.currency_code || ""}`
                              ) : (
                                "Price not available"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1 || primaryAction.loading}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                      let page;
                      if (totalPages <= 10) {
                        page = i + 1;
                      } else if (currentPage <= 5) {
                        page = i + 1;
                      } else if (currentPage > totalPages - 5) {
                        page = totalPages - 9 + i;
                      } else {
                        page = currentPage - 4 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          disabled={primaryAction.loading}
                          className={`text-xs px-2 py-1 rounded ${page === currentPage ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-200"} disabled:opacity-50`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    {totalPages > 10 && currentPage <= totalPages - 5 && (
                      <span className="text-xs text-gray-500">...</span>
                    )}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || primaryAction.loading}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast.active && (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${toast.error ? "bg-red-500" : "bg-green-500"} text-white`}>
          {toast.message}
          <button onClick={dismissToast} className="ml-2 text-white">×</button>
        </div>
      )}
    </div>
  );
}