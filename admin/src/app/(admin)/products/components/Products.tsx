'use client'

import React, { useMemo, useState } from 'react'

import Image from 'next/image'

import { Card, CardBody, CardFooter, CardTitle, Col, Row } from 'react-bootstrap'

import Swal from 'sweetalert2'

import IconifyIcon from '@/components/wrappers/IconifyIcon'

import AddProductsDrawer from './AddProductsDrawer'

/* ======================================================
   TYPES
====================================================== */

type ProductStatus = 'Active' | 'Inactive'

type Product = {
  id: number
  name: string
  image: string

  category: string
  subCategory: string

  size: string
  color: string

  stock: number

  price: number
  delPrice: number

  couponCode: string
  discount: number

  material: string
  section: string
  brand: string

  status: ProductStatus
}

/* ======================================================
   DUMMY DATA
====================================================== */

const dummyProducts: Product[] = [
  {
    id: 1,

    name: 'Premium Cotton T-Shirt',

    image: '',

    category: 'Men',

    subCategory: 'T-Shirts',

    size: 'M, L, XL',

    color: 'Black',

    stock: 120,

    price: 1299,

    delPrice: 1699,

    couponCode: 'FLAT20',

    discount: 24,

    material: 'Cotton',

    section: 'New Arrival',

    brand: 'Urban Fit',

    status: 'Active',
  },

  {
    id: 2,

    name: 'Slim Fit Denim Jeans',

    image: '',

    category: 'Men',

    subCategory: 'Jeans',

    size: '30, 32, 34',

    color: 'Blue',

    stock: 85,

    price: 1899,

    delPrice: 2499,

    couponCode: 'FLAT20',

    discount: 24,

    material: 'Denim',

    section: 'Best Seller',

    brand: 'Denim Hub',

    status: 'Active',
  },

  {
    id: 3,

    name: 'Premium Casual Shoes',

    image: '',

    category: 'Footwear',

    subCategory: 'Casual Shoes',

    size: '7, 8, 9, 10',

    color: 'White',

    stock: 18,

    price: 2199,

    delPrice: 2999,

    couponCode: 'SHOE15',

    discount: 27,

    material: 'Synthetic',

    section: 'Trending',

    brand: 'Urban Walk',

    status: 'Inactive',
  },

  {
    id: 4,

    name: 'Classic Formal Shirt',

    image: '',

    category: 'Men',

    subCategory: 'Shirts',

    size: 'M, L, XL',

    color: 'White',

    stock: 42,

    price: 1499,

    delPrice: 1999,

    couponCode: 'SAVE10',

    discount: 25,

    material: 'Cotton',

    section: 'Featured',

    brand: 'Style Hub',

    status: 'Active',
  },
]

/* ======================================================
   PAGE SIZE
====================================================== */

const PAGE_SIZE = 6

/* ======================================================
   COMPONENT
====================================================== */

const Products = () => {
  /* ======================================================
     STATES
  ====================================================== */

  const [products, setProducts] = useState<Product[]>(dummyProducts)

  const [search, setSearch] = useState<string>('')

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  /* ======================================================
     SEARCH
  ====================================================== */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subCategory.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.section.toLowerCase().includes(query) ||
        product.status.toLowerCase().includes(query) ||
        product.couponCode.toLowerCase().includes(query),
    )
  }, [search, products])

  /* ======================================================
     PAGINATION
  ====================================================== */

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

  const startIndex = (currentPage - 1) * PAGE_SIZE

  const endIndex = startIndex + PAGE_SIZE

  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  /* ======================================================
     SELECT SINGLE
  ====================================================== */

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]))
  }

  /* ======================================================
     SELECT ALL CURRENT PAGE
  ====================================================== */

  const currentPageIds = currentProducts.map((product) => product.id)

  const isAllCurrentPageSelected = currentPageIds.length > 0 && currentPageIds.every((id) => selectedProducts.includes(id))

  const handleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      setSelectedProducts((prev) => prev.filter((id) => !currentPageIds.includes(id)))

      return
    }

    setSelectedProducts((prev) => [...new Set([...prev, ...currentPageIds])])
  }

  /* ======================================================
     DELETE
  ====================================================== */

  const handleDelete = async (product: Product) => {
    const result = await Swal.fire({
      title: 'Are you sure?',

      text: `Do you want to delete "${product.name}"?`,

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, Delete',

      cancelButtonText: 'Cancel',

      confirmButtonColor: '#d33',
    })

    if (!result.isConfirmed) {
      return
    }

    setProducts((prev) => prev.filter((item) => item.id !== product.id))

    setSelectedProducts((prev) => prev.filter((id) => id !== product.id))

    await Swal.fire({
      title: 'Deleted!',

      text: 'Product deleted successfully.',

      icon: 'success',

      timer: 1400,

      showConfirmButton: false,
    })
  }

  /* ======================================================
     PAGE CHANGE
  ====================================================== */

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return
    }

    setCurrentPage(page)
  }

  /* ======================================================
     STOCK CLASS
  ====================================================== */

  const getStockClass = (stock: number) => {
    if (stock > 50) {
      return 'bg-success-subtle text-success'
    }

    if (stock > 20) {
      return 'bg-warning-subtle text-warning'
    }

    return 'bg-danger-subtle text-danger'
  }

  /* ======================================================
     STOCK TEXT
  ====================================================== */

  const getStockText = (stock: number) => {
    if (stock <= 0) {
      return 'Out of Stock'
    }

    if (stock <= 20) {
      return 'Low Stock'
    }

    return 'In Stock'
  }

  /* ======================================================
     RETURN
  ====================================================== */

  return (
    <Row>
      <Col xl={12}>
        <Card className="border-0 shadow-sm">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <CardTitle as="h4" className="mb-1">
                All Products
              </CardTitle>

              <p className="text-muted mb-0">Manage all product information, inventory and pricing.</p>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* SELECTED */}

              {selectedProducts.length > 0 && (
                <span className="badge bg-primary-subtle text-primary px-3 py-2">{selectedProducts.length} Selected</span>
              )}

              {/* SEARCH */}

              <div
                className="position-relative"
                style={{
                  minWidth: 250,
                }}>
                <input
                  type="search"
                  className="form-control ps-5"
                  placeholder="Search products..."
                  autoComplete="off"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)

                    setCurrentPage(1)
                  }}
                />

                <IconifyIcon
                  icon="solar:magnifer-linear"
                  width={18}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                />
              </div>

              {/* ADD */}

              <AddProductsDrawer />
            </div>
          </div>

          {/* ==================================================
              BODY
          ================================================== */}

          <CardBody>
            {/* ==================================================
                TOP CONTROLS
            ================================================== */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div className="d-flex align-items-center gap-2">
                <input
                  id="selectAllProducts"
                  type="checkbox"
                  className="form-check-input mt-0"
                  checked={isAllCurrentPageSelected}
                  onChange={handleSelectAll}
                />

                <label
                  htmlFor="selectAllProducts"
                  className="mb-0 text-muted"
                  style={{
                    cursor: 'pointer',
                  }}>
                  Select all on this page
                </label>
              </div>

              <div className="text-muted small">
                <strong>{filteredProducts.length}</strong> Products
              </div>
            </div>

            {/* ==================================================
                PRODUCT CARDS
            ================================================== */}

            <Row className="g-4">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => {
                  const isSelected = selectedProducts.includes(product.id)

                  return (
                    <Col key={product.id} xxl={4} xl={4} lg={6} md={6} sm={12}>
                      <Card className={`product-modern-card h-100 ${isSelected ? 'product-card-selected' : ''}`}>
                        {/* ==================================
                              IMAGE AREA
                          ================================== */}

                        <div className="product-card-image-area">
                          {/* CHECKBOX */}

                          <div className="product-card-checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input mt-0"
                              checked={isSelected}
                              onChange={() => handleSelectProduct(product.id)}
                            />
                          </div>

                          {/* STATUS */}

                          <div className="product-card-status">
                            <span
                              className={`badge ${product.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                              <IconifyIcon
                                icon={product.status === 'Active' ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                                className="me-1"
                              />

                              {product.status}
                            </span>
                          </div>

                          {/* DISCOUNT */}

                          {product.discount > 0 && <div className="product-discount-badge">-{product.discount}%</div>}

                          {/* IMAGE */}

                          {product.image ? (
                            <Image src={product.image} alt={product.name} width={500} height={320} unoptimized className="product-card-image" />
                          ) : (
                            <div className="product-image-placeholder">
                              <div className="text-center">
                                <IconifyIcon icon="solar:gallery-bold-duotone" width={55} />

                                <div className="small mt-2">No Image</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* ==================================
                              BODY
                          ================================== */}

                        <CardBody className="p-3 d-flex flex-column">
                          {/* CATEGORY */}

                          <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                            <span className="product-category-badge">{product.category}</span>

                            <IconifyIcon icon="solar:alt-arrow-right-linear" width={12} className="text-muted" />

                            <span className="text-muted small">{product.subCategory}</span>
                          </div>

                          {/* NAME */}

                          <h5 className="product-card-name mb-2">{product.name}</h5>

                          {/* BRAND */}

                          <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                            <IconifyIcon icon="solar:tag-linear" width={15} />

                            <span>Brand:</span>

                            <strong className="text-body">{product.brand}</strong>
                          </div>

                          {/* PRICE */}

                          <div className="product-price-area mb-3">
                            <div className="d-flex align-items-end flex-wrap gap-2">
                              <span className="product-current-price">₹{product.price.toLocaleString('en-IN')}</span>

                              <del className="product-old-price">₹{product.delPrice.toLocaleString('en-IN')}</del>

                              <span className="product-off-text">{product.discount}% OFF</span>
                            </div>
                          </div>

                          {/* INFO GRID */}

                          <Row className="g-2">
                            {/* SIZE */}

                            <Col xs={6}>
                              <div className="product-detail-box">
                                <div className="product-detail-icon">
                                  <IconifyIcon icon="solar:ruler-cross-pen-linear" width={17} />
                                </div>

                                <div className="min-w-0">
                                  <span>Size</span>

                                  <strong>{product.size}</strong>
                                </div>
                              </div>
                            </Col>

                            {/* COLOR */}

                            <Col xs={6}>
                              <div className="product-detail-box">
                                <div className="product-detail-icon">
                                  <IconifyIcon icon="solar:palette-linear" width={17} />
                                </div>

                                <div className="min-w-0">
                                  <span>Color</span>

                                  <strong>{product.color}</strong>
                                </div>
                              </div>
                            </Col>

                            {/* MATERIAL */}

                            <Col xs={6}>
                              <div className="product-detail-box">
                                <div className="product-detail-icon">
                                  <IconifyIcon icon="solar:t-shirt-linear" width={17} />
                                </div>

                                <div className="min-w-0">
                                  <span>Material</span>

                                  <strong>{product.material}</strong>
                                </div>
                              </div>
                            </Col>

                            {/* SECTION */}

                            <Col xs={6}>
                              <div className="product-detail-box">
                                <div className="product-detail-icon">
                                  <IconifyIcon icon="solar:star-linear" width={17} />
                                </div>

                                <div className="min-w-0">
                                  <span>Section</span>

                                  <strong>{product.section}</strong>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {/* STOCK */}

                          <div className="d-flex justify-content-between align-items-center mt-3 product-stock-box">
                            <div className="d-flex align-items-center gap-2">
                              <div className="product-stock-icon">
                                <IconifyIcon icon="solar:box-linear" width={18} />
                              </div>

                              <div>
                                <small className="text-muted d-block">Available Stock</small>

                                <strong>{product.stock} Units</strong>
                              </div>
                            </div>

                            <span className={`badge ${getStockClass(product.stock)}`}>{getStockText(product.stock)}</span>
                          </div>

                          {/* COUPON */}

                          {product.couponCode && (
                            <div className="product-coupon mt-3">
                              <div className="d-flex align-items-center gap-2">
                                <IconifyIcon icon="solar:ticket-sale-bold-duotone" width={19} />

                                <span className="small">Coupon</span>
                              </div>

                              <strong>{product.couponCode}</strong>
                            </div>
                          )}
                        </CardBody>

                        {/* ==================================
                              FOOTER
                          ================================== */}

                        <div className="product-card-footer border-top p-3">
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            {/* SERIAL */}

                            <span className="text-muted small">#{startIndex + index + 1}</span>

                            {/* ACTIONS */}

                            <div className="d-flex align-items-center gap-2">
                              {/* VIEW */}

                              <button type="button" className="btn btn-soft-info btn-sm product-action-btn" title="View Product">
                                <IconifyIcon icon="solar:eye-bold-duotone" width={18} />
                              </button>

                              {/* EDIT */}

                              <button type="button" className="btn btn-soft-primary btn-sm product-action-btn" title="Edit Product">
                                <IconifyIcon icon="solar:pen-2-bold-duotone" width={18} />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="btn btn-soft-danger btn-sm product-action-btn"
                                title="Delete Product"
                                onClick={() => handleDelete(product)}>
                                <IconifyIcon icon="solar:trash-bin-minimalistic-2-bold-duotone" width={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )
                })
              ) : (
                /* ============================================
                   EMPTY
                ============================================ */

                <Col xs={12}>
                  <div className="text-center py-5">
                    <div className="product-empty-icon mx-auto mb-3">
                      <IconifyIcon icon="solar:box-minimalistic-linear" width={38} />
                    </div>

                    <h5 className="mb-1">No Products Found</h5>

                    <p className="text-muted mb-0">Try searching with another keyword.</p>
                  </div>
                </Col>
              )}
            </Row>
          </CardBody>

          {/* ==================================================
              PAGINATION
          ================================================== */}

          <CardFooter className="bg-white border-top">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="text-muted small">
                Showing {filteredProducts.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredProducts.length)} of{' '}
                {filteredProducts.length} products
              </div>

              <nav aria-label="Product pagination">
                <ul className="pagination pagination-sm mb-0">
                  {/* PREVIOUS */}

                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button type="button" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>

                  {/* PAGE NUMBERS */}

                  {Array.from(
                    {
                      length: totalPages,
                    },

                    (_, index) => index + 1,
                  ).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button type="button" className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                      </button>
                    </li>
                  ))}

                  {/* NEXT */}

                  <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <button type="button" className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </CardFooter>
        </Card>

        {/* ==================================================
            CSS
        ================================================== */}

        <style jsx global>{`
          /* ================================================
             PRODUCT CARD
          ================================================ */

          .product-modern-card {
            position: relative;
            overflow: hidden;
            border: 1px solid #e7ebf0;
            border-radius: 16px;
            background: #ffffff;

            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease,
              border-color 0.2s ease;
          }

          .product-modern-card:hover {
            transform: translateY(-3px);

            border-color: #cbd5e1;

            box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          }

          .product-card-selected {
            border-color: var(--bs-primary);

            box-shadow: 0 0 0 2px rgba(var(--bs-primary-rgb), 0.08);
          }

          /* ================================================
             IMAGE
          ================================================ */

          .product-card-image-area {
            position: relative;
            width: 100%;
            height: 220px;
            overflow: hidden;
            background: #f7f8fa;
          }

          .product-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;

            transition: transform 0.3s ease;
          }

          .product-modern-card:hover .product-card-image {
            transform: scale(1.03);
          }

          .product-image-placeholder {
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #a1a9b7;

            background: linear-gradient(135deg, #f8fafc, #f1f4f8);
          }

          /* ================================================
             CHECKBOX
          ================================================ */

          .product-card-checkbox {
            position: absolute;
            top: 13px;
            left: 13px;
            z-index: 5;

            width: 34px;
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 9px;

            background: rgba(255, 255, 255, 0.94);

            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.09);
          }

          /* ================================================
             STATUS
          ================================================ */

          .product-card-status {
            position: absolute;
            top: 13px;
            right: 13px;
            z-index: 5;
          }

          /* ================================================
             DISCOUNT
          ================================================ */

          .product-discount-badge {
            position: absolute;
            left: 13px;
            bottom: 13px;
            z-index: 5;

            padding: 5px 9px;

            border-radius: 7px;

            color: #ffffff;
            background: #dc3545;

            font-size: 12px;
            font-weight: 700;

            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.18);
          }

          /* ================================================
             CATEGORY
          ================================================ */

          .product-category-badge {
            display: inline-flex;
            align-items: center;

            padding: 4px 8px;

            border-radius: 6px;

            color: var(--bs-primary);

            background: rgba(var(--bs-primary-rgb), 0.08);

            font-size: 11px;
            font-weight: 600;
          }

          /* ================================================
             NAME
          ================================================ */

          .product-card-name {
            min-height: 28px;

            color: #263244;

            font-size: 16px;
            line-height: 1.4;
            font-weight: 700;
          }

          /* ================================================
             PRICE
          ================================================ */

          .product-price-area {
            padding-bottom: 13px;

            border-bottom: 1px solid #edf0f4;
          }

          .product-current-price {
            color: #1e293b;

            font-size: 21px;
            font-weight: 700;
          }

          .product-old-price {
            color: #9aa4b2;

            font-size: 13px;
          }

          .product-off-text {
            color: #198754;

            font-size: 11px;
            font-weight: 700;
          }

          /* ================================================
             DETAILS
          ================================================ */

          .product-detail-box {
            height: 100%;

            display: flex;
            align-items: center;

            gap: 8px;

            padding: 9px;

            border-radius: 9px;

            border: 1px solid #edf0f4;

            background: #fafbfc;
          }

          .product-detail-icon {
            width: 31px;
            height: 31px;
            min-width: 31px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 7px;

            color: var(--bs-primary);

            background: rgba(var(--bs-primary-rgb), 0.08);
          }

          .product-detail-box span {
            display: block;

            color: #8b95a5;

            font-size: 10px;
          }

          .product-detail-box strong {
            display: block;

            overflow: hidden;

            color: #3b4657;

            font-size: 12px;
            font-weight: 600;

            white-space: nowrap;
            text-overflow: ellipsis;
          }

          /* ================================================
             STOCK
          ================================================ */

          .product-stock-box {
            padding: 10px;

            border-radius: 9px;

            background: #f8fafc;

            border: 1px solid #edf0f4;
          }

          .product-stock-icon {
            width: 34px;
            height: 34px;
            min-width: 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 8px;

            color: var(--bs-primary);

            background: #ffffff;

            border: 1px solid #e6eaf0;
          }

          /* ================================================
             COUPON
          ================================================ */

          .product-coupon {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 10px;

            padding: 9px 11px;

            border: 1px dashed rgba(var(--bs-primary-rgb), 0.35);

            border-radius: 8px;

            color: var(--bs-primary);

            background: rgba(var(--bs-primary-rgb), 0.035);
          }

          .product-coupon strong {
            font-size: 12px;
            letter-spacing: 0.3px;
          }

          /* ================================================
             FOOTER
          ================================================ */

          .product-card-footer {
            background: #fafbfc;
          }

          .product-action-btn {
            width: 34px;
            height: 34px;

            padding: 0;

            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          /* ================================================
             EMPTY
          ================================================ */

          .product-empty-icon {
            width: 72px;
            height: 72px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            color: var(--bs-primary);

            background: rgba(var(--bs-primary-rgb), 0.08);
          }

          .min-w-0 {
            min-width: 0;
          }

          /* ================================================
             MOBILE
          ================================================ */

          @media (max-width: 575.98px) {
            .product-card-image-area {
              height: 200px;
            }

            .product-current-price {
              font-size: 19px;
            }
          }
        `}</style>
      </Col>
    </Row>
  )
}

export default Products
