// this is the "View Collection Products" inside the "View Collections Button Modal" code


import {
  Modal,
  BlockStack,
  Text,
  Box,
  Spinner,
  EmptyState,
  Card,
  InlineStack,
  Button,
  Toast,
  Frame,
  TextField,
  Badge,
  Thumbnail,
  Icon,
} from "@shopify/polaris";
// import { ImageMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo } from "react";

export default function CollectionProductsModal({
  open,
  onClose,
  title,
  videoId,
  collection,
  products,
  excludedMap,
  onExcludeProduct,
  setMessage,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [toast, setToast] = useState({ active: false, message: "", error: false });

  const dismissToast = useCallback(
    () => setToast({ active: false, message: "", error: false }),
    []
  );
  const showToast = useCallback(
    (message, error = false) => setToast({ active: true, message, error }),
    []
  );

  // Filter out excluded products
  const filteredProducts = useMemo(() => {
    const excluded = excludedMap.get(videoId) || new Set();
    const availableProducts = products.filter(
      (product) => !excluded.has(product.id)
    );

    return availableProducts.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === ""
    );
  }, [products, excludedMap, videoId, searchQuery]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / productsPerPage);
  }, [filteredProducts, productsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleExcludeProduct = async (productId) => {
    try {
      await onExcludeProduct(videoId, productId);
      showToast("Product excluded successfully", false);
    } catch (error) {
      showToast("Failed to exclude product", true);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        primaryAction={{
          content: "Close",
          onAction: onClose,
        }}
        size="large"
      >
        <Modal.Section>
          <style jsx>{`
            .product-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
              gap: 16px;
              padding: 16px 0;
            }
            .product-card {
              transition: all 0.2s ease;
              border-radius: 8px;
            }
            .product-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }
            .product-title {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: block;
            }
            .pagination-container {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;
              margin-top: 24px;
            }
          `}</style>

          <BlockStack gap="400">
            <Text variant="bodyMd" tone="subdued">
              View products in this collection. Use the search to find specific products.
            </Text>

            {products.length === 0 || filteredProducts.length === 0 ? (
              <EmptyState
                heading="No Products Available"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text variant="bodyMd" as="p" tone="subdued">
                  {products.length === 0
                    ? "No products in this collection."
                    : "No products match your search."}
                </Text>
              </EmptyState>
            ) : (
              <BlockStack gap="300">
                <Card padding="400" background="bg-surface-secondary">
                  <InlineStack align="space-between" blockAlign="center">
                    <TextField
                      label=""
                      labelHidden
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search products..."
                      // prefix={<Icon source="SearchMajor" tone="subdued" />}
                      clearButton
                      onClearButtonClick={() => handleSearchChange("")}
                    />
                    <InlineStack gap="200">
                      <Badge tone="info" size="small">
                        {filteredProducts.length} products
                      </Badge>
                    </InlineStack>
                  </InlineStack>
                </Card>

                <Box>
                  <Text variant="headingSm" fontWeight="semibold">
                    Products ({paginatedProducts.length} shown)
                  </Text>

                  <div className="product-grid">
                    {paginatedProducts.map((product) => (
                      <Card
                        key={product.id}
                        padding="300"
                        className="product-card"
                        background="bg-surface"
                      >
                        <BlockStack gap="200">
                          <InlineStack align="space-between" blockAlign="center">
                            <Text variant="bodySm" tone="subdued">
                              Product ID: {product.id}
                            </Text>
                            <Button
                              variant="plain"
                              tone="critical"
                              size="slim"
                              onClick={() => handleExcludeProduct(product.id)}
                            >
                              Exclude
                            </Button>
                          </InlineStack>

                          <InlineStack gap="300" blockAlign="center">
                            {product.image_url ? (
                              <Thumbnail
                                source={product.image_url}
                                alt={product.title || "Product image"}
                                size="medium"
                              />
                            ) : (
                              <Box
                                background="bg-surface-secondary"
                                padding="300"
                                borderRadius="100"
                                minHeight="64px"
                                minWidth="64px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {/* <Icon source={ImageMajor} tone="subdued" /> */}
                              </Box>
                            )}

                            <BlockStack gap="100" style={{ flex: 1 }}>
                              <Text
                                variant="bodyMd"
                                fontWeight="medium"
                                className="product-title"
                              >
                                {product.title || "Untitled Product"}
                              </Text>
                              <Text variant="bodySm" tone="subdued">
                                {product.originalPrice
                                  ? `${product.originalPrice} ${product.currency_code || ""}`
                                  : "Price not available"}
                              </Text>
                            </BlockStack>
                          </InlineStack>
                        </BlockStack>
                      </Card>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <Button
                        size="slim"
                        variant="plain"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <InlineStack gap="100">
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
                            <Button
                              key={page}
                              size="slim"
                              variant={page === currentPage ? "primary" : "plain"}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                        {totalPages > 10 && currentPage <= totalPages - 5 && (
                          <Text variant="bodySm" tone="subdued">...</Text>
                        )}
                      </InlineStack>
                      <Button
                        size="slim"
                        variant="plain"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </Box>
              </BlockStack>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>

      {toast.active && (
        <Frame>
          <Toast
            content={toast.message}
            error={toast.error}
            onDismiss={dismissToast}
            duration={2500}
          />
        </Frame>
      )}
    </div>
  );
}