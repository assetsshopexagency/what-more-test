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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`
        w-full max-w-lg max-h-[85vh] overflow-auto rounded-2xl shadow-2xl border
        ${
          isDarkTheme
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }
      `}
      >
        {/* Close Button */}
        <button
          onClick={onHide}
          className={`
            absolute top-4 right-4 bg-transparent border-none text-2xl font-bold cursor-pointer
            w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
            ${
              isDarkTheme
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-500 hover:bg-gray-100"
            }
          `}
        >
          ×
        </button>

        <div className="p-8">
          <h3
            className={`
            text-xl font-bold mb-6
            ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
          `}
          >
            TAG PRODUCTS
          </h3>

          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full px-4 py-3 border-2 rounded-xl text-base font-semibold outline-none transition-colors duration-200
              ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-green-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-green-500"
              }
            `}
          />

          {loadingProducts ? (
            <div
              className={`
              text-center py-12 text-lg font-bold
              ${isDarkTheme ? "text-gray-300" : "text-gray-700"}
            `}
            >
              LOADING PRODUCTS...
            </div>
          ) : (
            <>
              <div
                className={`
                max-h-72 overflow-y-auto border rounded-xl p-2 mt-4
                ${isDarkTheme ? "border-gray-600" : "border-gray-300"}
              `}
              >
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 italic">
                    NO PRODUCTS FOUND
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <label
                      key={product.id}
                      className={`
                        flex items-center gap-4 p-3 rounded-lg mb-2 cursor-pointer transition-colors duration-200
                        ${
                          isDarkTheme
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-50 hover:bg-gray-200"
                        }
                      `}
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
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                          P
                        </div>
                      )}
                      <div className="flex-1">
                        <div
                          className={`
                          font-semibold
                          ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                        `}
                        >
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
                  onClick={onSaveProducts}
                  className="bg-green-500 hover:bg-green-600 text-white border-none py-3 px-7 rounded-xl font-bold cursor-pointer text-base transition-colors duration-200"
                >
                  SAVE ({selectedProducts.size})
                </button>
                <button
                  onClick={onHide}
                  className="bg-gray-500 hover:bg-gray-600 text-white border-none py-3 px-7 rounded-xl font-bold cursor-pointer transition-colors duration-200"
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
