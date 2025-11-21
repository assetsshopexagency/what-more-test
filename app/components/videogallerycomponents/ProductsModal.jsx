// // components/videogallerycomponents/ProductsModal.jsx
// import React, { useState } from 'react';

// export default function ProductsModal({
//   showProductsModal,
//   products,
//   selectedProducts,
//   loadingProducts,
//   onToggleProduct,
//   onSaveProducts,
//   onHide
// }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   if (!showProductsModal.show) return null;

//   const filteredProducts = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content" style={{ maxWidth: '500px', maxHeight: '80vh', overflow: 'auto', position: 'relative' }}>
//         <button
//           onClick={onHide}
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'none',
//             border: 'none',
//             fontSize: '1.5rem',
//             cursor: 'pointer',
//             color: '#6b7280'
//           }}
//         >
//           ×
//         </button>
//         <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
//           Select Products for "{showProductsModal.video.title}"
//         </h3>

//         <input
//           type="text"
//           placeholder="Search products by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             marginBottom: '1rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '8px',
//             fontSize: '1rem'
//           }}
//         />

//         {loadingProducts ? (
//           <div style={{ textAlign: 'center', padding: '2rem' }}>
//             <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
//             Loading products...
//           </div>
//         ) : (
//           <>
//             <div className="products-grid">
//               {filteredProducts.map(product => (
//                 <div key={product.id} className="product-item">
//                   <input
//                     type="checkbox"
//                     checked={selectedProducts.has(product.id)}
//                     onChange={() => onToggleProduct(product.id)}
//                     style={{ width: '18px', height: '18px' }}
//                   />
//                   {product.image_url && (
//                     <img
//                       src={product.image_url}
//                       alt={product.title}
//                       className="product-image"
//                     />
//                   )}
//                   <div className="product-info">
//                     <div className="product-name">{product.title}</div>
//                     <div className="product-price">${product.price}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
//                 No products found matching your search.
//               </div>
//             )}

//             <div className="modal-buttons">
//               <button
//                 onClick={onSaveProducts}
//                 style={{
//                   background: '#10b981',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   fontWeight: '600',
//                   cursor: 'pointer'
//                 }}
//               >
//                 💾 Save Products ({selectedProducts.size})
//               </button>
//               <button
//                 onClick={onHide}
//                 style={{
//                   background: '#6b7280',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   fontWeight: '600',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// components/videogallerycomponents/ProductsModal.jsx
import React, { useState } from 'react';

export default function ProductsModal({
  showProductsModal,
  products,
  selectedProducts,
  loadingProducts,
  onToggleProduct,
  onSaveProducts,
  onHide,
  isDarkTheme
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!showProductsModal.show) return null;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = isDarkTheme
    ? { bg: '#1f2937', text: '#f3f4f6', border: '#374151', input: '#374151' }
    : { bg: '#ffffff', text: '#1f2937', border: '#e5e7eb', input: '#ffffff' };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20000,
      padding: '1rem'
    }}>
      <div style={{
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onHide}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: isDarkTheme ? '#9ca3af' : '#6b7280',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          X
        </button>

        <div style={{ padding: '2rem' }}>
          <h3 style={{
            margin: '0 0 1.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: theme.text
          }}>
            TAG PRODUCTS → "{showProductsModal.video.title}"
          </h3>

          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              border: `2px solid ${theme.border}`,
              borderRadius: '12px',
              background: theme.input,
              color: theme.text,
              fontSize: '1rem',
              fontWeight: '600',
              outline: 'none',
              marginBottom: '1.5rem'
            }}
            onFocus={e => e.target.style.borderColor = '#10b981'}
            onBlur={e => e.target.style.borderColor = theme.border}
          />

          {loadingProducts ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: theme.text,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              LOADING PRODUCTS...
            </div>
          ) : (
            <>
              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '0.5rem'
              }}>
                {filteredProducts.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#9ca3af',
                    fontStyle: 'italic'
                  }}>
                    NO PRODUCTS FOUND
                  </div>
                ) : (
                  filteredProducts.map(product => (
                    <label
                      key={product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.9rem',
                        background: isDarkTheme ? '#374151' : '#f8fafc',
                        borderRadius: '10px',
                        marginBottom: '0.5rem',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = isDarkTheme ? '#4b5563' : '#e5e7eb'}
                      onMouseLeave={e => e.currentTarget.style.background = isDarkTheme ? '#374151' : '#f8fafc'}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => onToggleProduct(product.id)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                          P
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: theme.text }}>{product.title}</div>
                        <div style={{ color: '#10b981', fontSize: '0.9rem' }}>${product.price}</div>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={onSaveProducts}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '0.9rem 1.8rem',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  SAVE ({selectedProducts.size})
                </button>
                <button
                  onClick={onHide}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.9rem 1.8rem',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  CANCEL
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}