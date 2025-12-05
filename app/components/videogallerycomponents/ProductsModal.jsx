// components/videogallerycomponents/ProductsModal.jsx
import React, { useState } from "react";

export default function ProductsModal({
  showProductsModal,
  products,
  selectedProducts,
  loadingProducts,
  onToggleProduct,
  onSaveProducts,
  onHide,
  isDarkTheme,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!showProductsModal.show) return null;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSave = async () => {
    if (onSaveProducts) {
      await onSaveProducts();
    }
    // The onHide callback should be called after saving is complete
    // so that the parent component can refresh its data
    if (onHide) {
      onHide();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div
        className={`relative rounded-2xl border w-full max-w-lg max-h-[85vh] overflow-auto shadow-2xl ${isDarkTheme
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
          }`}
      >
        <button
          onClick={onHide}
          className={`absolute top-4 right-4 bg-transparent border-none text-2xl font-bold cursor-pointer w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkTheme
            ? 'text-gray-400 hover:bg-gray-700'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          X
        </button>

        <div className="p-8">
          <h3
            className={`m-0 mb-6 text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}
          >
            TAG PRODUCTS
          </h3>

          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-3 px-4 border-2 rounded-xl text-base font-semibold outline-none transition-colors mb-6 ${isDarkTheme
              ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
              : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
              }`}
          />

          {loadingProducts ? (
            <div
              className={`text-center py-12 font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}
            >
              LOADING PRODUCTS...
            </div>
          ) : (
            <>
              <div
                className={`max-h-80 overflow-y-auto border rounded-xl p-2 ${isDarkTheme
                  ? 'border-gray-600'
                  : 'border-gray-200'
                  }`}
              >
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 italic">
                    NO PRODUCTS FOUND
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <label
                      key={product.id}
                      className={`flex items-center gap-4 p-3 rounded-xl mb-2 cursor-pointer transition-colors ${isDarkTheme
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-50 hover:bg-gray-200'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => onToggleProduct(product.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded flex items-center justify-center bg-green-500 text-white font-bold">
                          P
                        </div>
                      )}
                      <div className="flex-1">
                        <div className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'
                          }`}>
                          {product.title}
                        </div>
                        <div className="text-green-500 text-sm">
                          ${product.price}
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <div className="flex gap-4 mt-6 justify-end">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white border-none py-3 px-7 rounded-xl font-bold cursor-pointer text-base"
                >
                  SAVE ({selectedProducts.size})
                </button>
                <button
                  onClick={onHide}
                  className="bg-gray-500 text-white border-none py-3 px-7 rounded-xl font-bold cursor-pointer"
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