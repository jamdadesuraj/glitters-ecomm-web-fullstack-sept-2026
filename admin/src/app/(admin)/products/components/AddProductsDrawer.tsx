'use client'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import dynamic from 'next/dynamic'

import Select, { SingleValue, StylesConfig } from 'react-select'

import CreatableSelect from 'react-select/creatable'

import IconifyIcon from '@/components/wrappers/IconifyIcon'

import 'react-quill-new/dist/quill.snow.css'

/* ======================================================
   REACT QUILL
====================================================== */

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
})

/* ======================================================
   TYPES
====================================================== */

type SelectOption = {
  value: string
  label: string
}

type TagOption = {
  value: string
  label: string
}

type ProductFormData = {
  product_name: string
  image: File | null

  category: string
  sub_category: string
  material: string
  section: string
  brand: string

  coupon_code: string
  deal: string

  tags: string[]

  video_url: string

  short_description: string
  product_description: string
  additional_information: string
  shipping_return_policy: string
}

type ProductVariant = {
  id: number
  size: string
  color: string
  stock: string
  price: string
  del_price: string
  discount: string
}

type VariantField = 'size' | 'color' | 'stock' | 'price' | 'del_price' | 'discount'

type ProductSpecification = {
  id: number
  name: string
  value: string
}

type SpecificationField = 'name' | 'value'

type SelectField = 'category' | 'sub_category' | 'material' | 'section' | 'brand' | 'coupon_code' | 'deal'

type TextInputField = 'product_name' | 'video_url'

/* ======================================================
   STATIC DATA
====================================================== */

const categories: SelectOption[] = [
  {
    value: 'clothing',
    label: 'Clothing',
  },
  {
    value: 'footwear',
    label: 'Footwear',
  },
  {
    value: 'accessories',
    label: 'Accessories',
  },
  {
    value: 'electronics',
    label: 'Electronics',
  },
  {
    value: 'beauty',
    label: 'Beauty',
  },
]

const subCategories: SelectOption[] = [
  {
    value: 'tshirt',
    label: 'T-Shirt',
  },
  {
    value: 'shirt',
    label: 'Shirt',
  },
  {
    value: 'jeans',
    label: 'Jeans',
  },
  {
    value: 'shoes',
    label: 'Shoes',
  },
  {
    value: 'watch',
    label: 'Watch',
  },
]

const brands: SelectOption[] = [
  {
    value: 'nike',
    label: 'Nike',
  },
  {
    value: 'adidas',
    label: 'Adidas',
  },
  {
    value: 'puma',
    label: 'Puma',
  },
  {
    value: 'zara',
    label: 'Zara',
  },
  {
    value: 'hm',
    label: 'H&M',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

const sections: SelectOption[] = [
  {
    value: 'men',
    label: 'Men',
  },
  {
    value: 'women',
    label: 'Women',
  },
  {
    value: 'kids',
    label: 'Kids',
  },
  {
    value: 'unisex',
    label: 'Unisex',
  },
]

const materials: SelectOption[] = [
  {
    value: 'cotton',
    label: 'Cotton',
  },
  {
    value: 'polyester',
    label: 'Polyester',
  },
  {
    value: 'denim',
    label: 'Denim',
  },
  {
    value: 'leather',
    label: 'Leather',
  },
  {
    value: 'silk',
    label: 'Silk',
  },
  {
    value: 'wool',
    label: 'Wool',
  },
]

const coupons: SelectOption[] = [
  {
    value: 'WELCOME10',
    label: 'WELCOME10 - 10% Off',
  },
  {
    value: 'SAVE20',
    label: 'SAVE20 - 20% Off',
  },
  {
    value: 'FESTIVE25',
    label: 'FESTIVE25 - 25% Off',
  },
  {
    value: 'NEWUSER',
    label: 'NEWUSER - New User Offer',
  },
]

const dealOptions: SelectOption[] = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
]

const sizeOptions: SelectOption[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 'Free Size'].map((item) => ({
  value: item,
  label: item,
}))

const colorOptions: SelectOption[] = [
  'Black',
  'White',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Pink',
  'Grey',
  'Brown',
  'Orange',
  'Purple',
  'Navy Blue',
].map((item) => ({
  value: item,
  label: item,
}))

const defaultTagOptions: TagOption[] = [
  {
    value: 'new-arrival',
    label: 'New Arrival',
  },
  {
    value: 'best-seller',
    label: 'Best Seller',
  },
  {
    value: 'trending',
    label: 'Trending',
  },
  {
    value: 'premium',
    label: 'Premium',
  },
  {
    value: 'summer',
    label: 'Summer',
  },
  {
    value: 'winter',
    label: 'Winter',
  },
]

/* ======================================================
   REACT SELECT STYLES
====================================================== */

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,

    minHeight: '38px',

    borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',

    boxShadow: state.isFocused ? '0 0 0 0.15rem rgba(13, 110, 253, 0.15)' : 'none',

    '&:hover': {
      borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',
    },
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 99999,
  }),

  menu: (base) => ({
    ...base,
    zIndex: 99999,
  }),
}

/* ======================================================
   REACT QUILL CONFIG
====================================================== */

const quillModules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, false],
      },
    ],

    ['bold', 'italic', 'underline', 'strike'],

    [
      {
        list: 'ordered',
      },

      {
        list: 'bullet',
      },
    ],

    ['blockquote', 'link'],

    [
      {
        align: [],
      },
    ],

    ['clean'],
  ],
}

const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'blockquote', 'link', 'align']

/* ======================================================
   CREATE EMPTY VARIANT
====================================================== */

const createEmptyVariant = (): ProductVariant => ({
  id: Date.now() + Math.random(),

  size: '',
  color: '',

  stock: '',
  price: '',
  del_price: '',
  discount: '',
})

/* ======================================================
   CREATE EMPTY SPECIFICATION
====================================================== */

const createEmptySpecification = (): ProductSpecification => ({
  id: Date.now() + Math.random(),

  name: '',
  value: '',
})

/* ======================================================
   CHECK QUILL EMPTY
====================================================== */

const hasRichTextContent = (value: string): boolean => {
  const cleanText = value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  return cleanText.length > 0
}

/* ======================================================
   COMPONENT
====================================================== */

const AddProductsDrawer = () => {
  /* ======================================================
       STATES
    ====================================================== */

  const [open, setOpen] = useState<boolean>(false)

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [error, setError] = useState<string>('')

  const [formData, setFormData] = useState<ProductFormData>({
    product_name: '',

    image: null,

    category: '',
    sub_category: '',

    material: '',
    section: '',
    brand: '',

    coupon_code: '',

    deal: 'no',

    tags: [],

    video_url: '',

    short_description: '',

    product_description: '',

    additional_information: '',

    shipping_return_policy: '',
  })

  const [variants, setVariants] = useState<ProductVariant[]>([createEmptyVariant()])

  const [specifications, setSpecifications] = useState<ProductSpecification[]>([createEmptySpecification()])

  /* ======================================================
       IMAGE CLEANUP
    ====================================================== */

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  /* ======================================================
       GET SELECTED OPTION
    ====================================================== */

  const getSelectedOption = (options: SelectOption[], value: string): SelectOption | null => {
    return options.find((option) => option.value === value) ?? null
  }

  /* ======================================================
       TEXT INPUT CHANGE
    ====================================================== */

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as TextInputField

    const value = e.target.value

    setFormData((prev) => ({
      ...prev,

      [field]: value,
    }))
  }

  /* ======================================================
       SELECT CHANGE
    ====================================================== */

  const handleSelectChange = (field: SelectField, option: SingleValue<SelectOption>) => {
    setFormData((prev) => ({
      ...prev,

      [field]: option?.value ?? '',
    }))
  }

  /* ======================================================
       TAG CHANGE
    ====================================================== */

  const handleTagChange = (options: readonly TagOption[]) => {
    setFormData((prev) => ({
      ...prev,

      tags: options.map((option) => option.value),
    }))
  }

  /* ======================================================
       SELECTED TAG VALUES
    ====================================================== */

  const selectedTags: TagOption[] = formData.tags.map((tag) => {
    const found = defaultTagOptions.find((option) => option.value === tag)

    if (found) {
      return found
    }

    return {
      value: tag,
      label: tag,
    }
  })

  /* ======================================================
       IMAGE CHANGE
    ====================================================== */

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setFormData((prev) => ({
      ...prev,

      image: file,
    }))

    const previewUrl = URL.createObjectURL(file)

    setImagePreview(previewUrl)
  }

  /* ======================================================
       REMOVE IMAGE
    ====================================================== */

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImagePreview(null)

    setFormData((prev) => ({
      ...prev,

      image: null,
    }))

    const fileInput = document.getElementById('productImage') as HTMLInputElement | null

    if (fileInput) {
      fileInput.value = ''
    }
  }

  /* ======================================================
       VARIANT CHANGE
    ====================================================== */

  const handleVariantChange = (id: number, field: VariantField, value: string) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,

              [field]: value,
            }
          : variant,
      ),
    )
  }

  /* ======================================================
       ADD VARIANT
    ====================================================== */

  const addVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()])
  }

  /* ======================================================
       REMOVE VARIANT
    ====================================================== */

  const removeVariant = (id: number) => {
    if (variants.length <= 1) {
      return
    }

    setVariants((prev) => prev.filter((variant) => variant.id !== id))
  }

  /* ======================================================
       SPECIFICATION CHANGE
    ====================================================== */

  const handleSpecificationChange = (
    id: number,

    field: SpecificationField,

    value: string,
  ) => {
    setSpecifications((prev) =>
      prev.map((specification) =>
        specification.id === id
          ? {
              ...specification,

              [field]: value,
            }
          : specification,
      ),
    )
  }

  /* ======================================================
       ADD SPECIFICATION
    ====================================================== */

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, createEmptySpecification()])
  }

  /* ======================================================
       REMOVE SPECIFICATION
    ====================================================== */

  const removeSpecification = (id: number) => {
    if (specifications.length === 1) {
      setSpecifications([createEmptySpecification()])

      return
    }

    setSpecifications((prev) => prev.filter((specification) => specification.id !== id))
  }

  /* ======================================================
       RESET FORM
    ====================================================== */

  const resetForm = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImagePreview(null)

    setError('')

    setFormData({
      product_name: '',

      image: null,

      category: '',
      sub_category: '',

      material: '',
      section: '',
      brand: '',

      coupon_code: '',

      deal: 'no',

      tags: [],

      video_url: '',

      short_description: '',

      product_description: '',

      additional_information: '',

      shipping_return_policy: '',
    })

    setVariants([createEmptyVariant()])

    setSpecifications([createEmptySpecification()])
  }

  /* ======================================================
       CLOSE DRAWER
    ====================================================== */

  const closeDrawer = () => {
    setOpen(false)
  }

  /* ======================================================
       VALIDATION
    ====================================================== */

  const validateForm = (): boolean => {
    if (!formData.product_name.trim()) {
      setError('Product name is required.')

      return false
    }

    if (!hasRichTextContent(formData.short_description)) {
      setError('Short Description is required.')

      return false
    }

    if (!hasRichTextContent(formData.product_description)) {
      setError('Product Description is required.')

      return false
    }

    if (!hasRichTextContent(formData.shipping_return_policy)) {
      setError('Shipping & Return Policy is required.')

      return false
    }

    const invalidVariant = variants.some((variant) => !variant.size || !variant.color || !variant.price || !variant.stock)

    if (invalidVariant) {
      setError('Please complete Size, Color, Price and Stock for all variants.')

      return false
    }

    setError('')

    return true
  }

  /* ======================================================
       SUBMIT
    ====================================================== */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const finalData = {
      product_name: formData.product_name,

      image: formData.image,

      category: formData.category,

      sub_category: formData.sub_category,

      material: formData.material,

      section: formData.section,

      brand: formData.brand,

      coupon_code: formData.coupon_code,

      deal: formData.deal,

      tags: formData.tags,

      video_url: formData.video_url,

      short_description: formData.short_description,

      product_description: formData.product_description,

      additional_information: formData.additional_information,

      shipping_return_policy: formData.shipping_return_policy,

      specifications: specifications
        .filter((specification) => specification.name.trim() || specification.value.trim())
        .map(
          ({
            id: _id,

            ...specification
          }) => specification,
        ),

      variants: variants.map(
        ({
          id: _id,

          ...variant
        }) => variant,
      ),
    }

    console.log('FINAL PRODUCT DATA:', finalData)

    /*
        ================================================
        API FORM DATA EXAMPLE
        ================================================

        const apiFormData =
          new FormData()

        apiFormData.append(
          'product_name',
          formData.product_name,
        )

        apiFormData.append(
          'category',
          formData.category,
        )

        apiFormData.append(
          'sub_category',
          formData.sub_category,
        )

        apiFormData.append(
          'material',
          formData.material,
        )

        apiFormData.append(
          'section',
          formData.section,
        )

        apiFormData.append(
          'brand',
          formData.brand,
        )

        apiFormData.append(
          'coupon_code',
          formData.coupon_code,
        )

        apiFormData.append(
          'deal',
          formData.deal,
        )

        apiFormData.append(
          'tags',
          JSON.stringify(
            formData.tags,
          ),
        )

        apiFormData.append(
          'video_url',
          formData.video_url,
        )

        apiFormData.append(
          'short_description',
          formData.short_description,
        )

        apiFormData.append(
          'product_description',
          formData.product_description,
        )

        apiFormData.append(
          'additional_information',
          formData.additional_information,
        )

        apiFormData.append(
          'shipping_return_policy',
          formData.shipping_return_policy,
        )

        apiFormData.append(
          'specifications',
          JSON.stringify(
            specifications
              .filter(
                (item) =>
                  item.name.trim() ||
                  item.value.trim(),
              )
              .map(
                ({
                  id,
                  ...item
                }) =>
                  item,
              ),
          ),
        )

        apiFormData.append(
          'variants',
          JSON.stringify(
            variants.map(
              ({
                id,
                ...item
              }) =>
                item,
            ),
          ),
        )

        if (
          formData.image
        ) {
          apiFormData.append(
            'image',
            formData.image,
          )
        }

        await axios.post(
          '/api/products',
          apiFormData,
        )
        */
  }

  /* ======================================================
       PORTAL TARGET
    ====================================================== */

  const portalTarget = typeof document !== 'undefined' ? document.body : undefined

  /* ======================================================
       RETURN
    ====================================================== */

  return (
    <>
      {/* ==================================================
            OPEN BUTTON
        ================================================== */}

      <button type="button" className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setOpen(true)}>
        <IconifyIcon icon="solar:add-circle-broken" />
        Add Products
      </button>

      {/* ==================================================
            OVERLAY
        ================================================== */}

      {open && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: 'rgba(0,0,0,0.5)',

            zIndex: 1040,
          }}
          onClick={closeDrawer}
        />
      )}

      {/* ==================================================
            DRAWER
        ================================================== */}

      <div
        className="position-fixed top-0 end-0 bg-white h-100 shadow-lg"
        style={{
          width: '1520px',

          maxWidth: '100%',

          zIndex: 1050,

          transform: open ? 'translateX(0)' : 'translateX(100%)',

          transition: 'transform 0.3s ease',

          overflowY: 'auto',
        }}>
        {/* ==================================================
              HEADER
          ================================================== */}

        <div
          className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center position-sticky top-0"
          style={{
            zIndex: 50,
          }}>
          <div>
            <h5 className="mb-1 fw-bold">Add Products</h5>

            <small className="text-muted">Add product information, variants and specifications</small>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 32,
              height: 32,
            }}
            onClick={closeDrawer}>
            ✕
          </button>
        </div>

        {/* ==================================================
              FORM
          ================================================== */}

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* ==============================================
                  ERROR
              ============================================== */}

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <IconifyIcon icon="solar:danger-triangle-broken" />

                {error}
              </div>
            )}

            {/* ==============================================
                  PRODUCT INFORMATION
              ============================================== */}

            <div className="card border mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Product Information</h6>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {/* PRODUCT NAME */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Product Name
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                      type="text"
                      name="product_name"
                      value={formData.product_name}
                      onChange={handleTextChange}
                      className="form-control"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  {/* CATEGORY */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Category</label>

                    <Select<SelectOption>
                      options={categories}
                      value={getSelectedOption(categories, formData.category)}
                      onChange={(option) => handleSelectChange('category', option)}
                      placeholder="Select Category"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* SUB CATEGORY */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Sub-Category</label>

                    <Select<SelectOption>
                      options={subCategories}
                      value={getSelectedOption(subCategories, formData.sub_category)}
                      onChange={(option) => handleSelectChange('sub_category', option)}
                      placeholder="Select Sub-Category"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* MATERIAL */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Material</label>

                    <Select<SelectOption>
                      options={materials}
                      value={getSelectedOption(materials, formData.material)}
                      onChange={(option) => handleSelectChange('material', option)}
                      placeholder="Select Material"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* SECTION */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Section</label>

                    <Select<SelectOption>
                      options={sections}
                      value={getSelectedOption(sections, formData.section)}
                      onChange={(option) => handleSelectChange('section', option)}
                      placeholder="Select Section"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* BRAND */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Brand</label>

                    <Select<SelectOption>
                      options={brands}
                      value={getSelectedOption(brands, formData.brand)}
                      onChange={(option) => handleSelectChange('brand', option)}
                      placeholder="Select Brand"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* DEAL OF THE DAY */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Deal of the Day</label>

                    <Select<SelectOption>
                      options={dealOptions}
                      value={getSelectedOption(dealOptions, formData.deal)}
                      onChange={(option) => handleSelectChange('deal', option)}
                      placeholder="Select"
                      isSearchable
                      isClearable={false}
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* COUPON */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Coupon Code</label>

                    <Select<SelectOption>
                      options={coupons}
                      value={getSelectedOption(coupons, formData.coupon_code)}
                      onChange={(option) => handleSelectChange('coupon_code', option)}
                      placeholder="Select Coupon"
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* TAGS */}

                  <div className="col-xl-8 col-lg-8 col-md-12">
                    <label className="form-label fw-semibold">Tags</label>

                    <CreatableSelect<TagOption, true>
                      isMulti
                      isSearchable
                      isClearable
                      options={defaultTagOptions}
                      value={selectedTags}
                      onChange={handleTagChange}
                      placeholder="Select or create tags..."
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                      styles={{
                        ...selectStyles,

                        control: (base, state) => ({
                          ...base,

                          minHeight: '38px',

                          borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',

                          boxShadow: state.isFocused ? '0 0 0 0.15rem rgba(13, 110, 253, 0.15)' : 'none',
                        }),

                        menuPortal: (base) => ({
                          ...base,

                          zIndex: 99999,
                        }),
                      }}
                    />

                    <small className="text-muted">Search existing tags or type a new tag and press Enter.</small>
                  </div>

                  {/* VIDEO URL */}

                  <div className="col-12">
                    <label className="form-label fw-semibold">Video URL</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <IconifyIcon icon="solar:video-frame-play-horizontal-broken" />
                      </span>

                      <input
                        type="url"
                        name="video_url"
                        className="form-control"
                        value={formData.video_url}
                        onChange={handleTextChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==============================================
                  PRODUCT VARIANTS
              ============================================== */}

            <div className="card border">
              <div className="card-header bg-light d-flex align-items-center justify-content-between gap-3 flex-wrap">
                <div>
                  <h6 className="mb-1 fw-bold">Product Variants</h6>

                  <small className="text-muted">Add multiple size, color, price, discount and stock combinations.</small>
                </div>

                <button type="button" className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={addVariant}>
                  <IconifyIcon icon="solar:add-circle-broken" />
                  Add More Variant
                </button>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table table-bordered align-middle mb-0"
                    style={{
                      minWidth: 1250,
                    }}>
                    <thead className="table-light">
                      <tr>
                        <th
                          className="text-center"
                          style={{
                            width: 60,
                          }}>
                          #
                        </th>
                        <th
                          style={{
                            minWidth: 180,
                          }}>
                          Size
                        </th>
                        <th
                          style={{
                            minWidth: 190,
                          }}>
                          Color
                        </th>
                        <th
                          style={{
                            minWidth: 150,
                          }}>
                          Price
                        </th>
                        <th
                          style={{
                            minWidth: 150,
                          }}>
                          Del-Price
                        </th>
                        <th
                          style={{
                            minWidth: 140,
                          }}>
                          Discount
                        </th>
                        <th
                          style={{
                            minWidth: 120,
                          }}>
                          Stock
                        </th>{' '}
                        <th
                          style={{
                            minWidth: 140,
                          }}>
                          Image
                        </th>
                        <th
                          className="text-center"
                          style={{
                            width: 90,
                          }}>
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={variant.id}>
                          {/* NUMBER */}

                          <td className="text-center fw-semibold">{index + 1}</td>

                          {/* SIZE */}

                          <td>
                            <Select<SelectOption>
                              options={sizeOptions}
                              value={getSelectedOption(sizeOptions, variant.size)}
                              onChange={(option) => handleVariantChange(variant.id, 'size', option?.value ?? '')}
                              placeholder="Select Size"
                              isSearchable
                              isClearable
                              styles={selectStyles}
                              menuPortalTarget={portalTarget}
                              menuPosition="fixed"
                            />
                          </td>

                          {/* COLOR */}

                          <td>
                            <Select<SelectOption>
                              options={colorOptions}
                              value={getSelectedOption(colorOptions, variant.color)}
                              onChange={(option) => handleVariantChange(variant.id, 'color', option?.value ?? '')}
                              placeholder="Select Color"
                              isSearchable
                              isClearable
                              styles={selectStyles}
                              menuPortalTarget={portalTarget}
                              menuPosition="fixed"
                            />
                          </td>

                          {/* PRICE */}

                          <td>
                            <div className="input-group">
                              <span className="input-group-text">₹</span>

                              <input
                                type="number"
                                className="form-control"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={variant.price}
                                onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                                required
                              />
                            </div>
                          </td>

                          {/* DEL PRICE */}

                          <td>
                            <div className="input-group">
                              <span className="input-group-text">₹</span>

                              <input
                                type="number"
                                className="form-control"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={variant.del_price}
                                onChange={(e) => handleVariantChange(variant.id, 'del_price', e.target.value)}
                              />
                            </div>
                          </td>

                          {/* DISCOUNT */}

                          <td>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                min="0"
                                max="100"
                                step="0.01"
                                value={variant.discount}
                                onChange={(e) => handleVariantChange(variant.id, 'discount', e.target.value)}
                              />

                              <span className="input-group-text">%</span>
                            </div>
                          </td>

                          {/* STOCK */}

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="0"
                              min="0"
                              step="1"
                              value={variant.stock}
                              onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                              required
                            />
                          </td>

                          {/* image */}

                          <td>
                            <input
                              type="file"
                              className="form-control"
                              onChange={(e) => handleVariantChange(variant.id, 'image', e.target.files?.[0])}
                            />
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-soft-danger btn-sm"
                              disabled={variants.length === 1}
                              onClick={() => removeVariant(variant.id)}
                              title="Remove Variant">
                              <IconifyIcon icon="solar:trash-bin-trash-broken" width={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 border-top bg-light">
                  <button type="button" className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={addVariant}>
                    <IconifyIcon icon="solar:add-circle-broken" />
                    Add Another Variant
                  </button>
                </div>
              </div>
            </div>

            {/* ==============================================
                  DESCRIPTIONS
              ============================================== */}

            <div className="card border mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Product Description</h6>
              </div>

              <div className="card-body">
                <div className="row g-4">
                  {/* SHORT DESCRIPTION */}

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Short Description
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <div className="product-quill-editor">
                      <ReactQuill
                        theme="snow"
                        value={formData.short_description}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,

                            short_description: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter short product description..."
                      />
                    </div>
                  </div>

                  {/* PRODUCT DESCRIPTION */}

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Product Description
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <div className="product-quill-editor product-quill-large">
                      <ReactQuill
                        theme="snow"
                        value={formData.product_description}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,

                            product_description: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter complete product description..."
                      />
                    </div>
                  </div>

                  {/* ADDITIONAL INFORMATION */}

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <label className="form-label fw-semibold">Additional Information</label>

                    <div className="product-quill-editor">
                      <ReactQuill
                        theme="snow"
                        value={formData.additional_information}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,

                            additional_information: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter additional information..."
                      />
                    </div>
                  </div>

                  {/* SHIPPING RETURN POLICY */}

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <label className="form-label fw-semibold">
                      Shipping & Return Policy
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <div className="product-quill-editor">
                      <ReactQuill
                        theme="snow"
                        value={formData.shipping_return_policy}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,

                            shipping_return_policy: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter shipping and return policy..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==============================================
                  SPECIFICATIONS
              ============================================== */}

            <div className="card border mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <h6 className="mb-1 fw-bold">Product Specifications</h6>

                  <small className="text-muted">Add specification name and value.</small>
                </div>

                <button type="button" className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={addSpecification}>
                  <IconifyIcon icon="solar:add-circle-broken" />
                  Add Specification
                </button>
              </div>

              <div className="card-body">
                {specifications.map((specification, index) => (
                  <div key={specification.id} className="row g-3 align-items-end mb-3">
                    {/* NUMBER */}

                    <div className="col-lg-1 col-md-2">
                      <label className="form-label fw-semibold">#</label>

                      <div className="form-control bg-light text-center">{index + 1}</div>
                    </div>

                    {/* NAME */}

                    <div className="col-lg-5 col-md-5">
                      <label className="form-label fw-semibold">Specification Name</label>

                      <input
                        type="text"
                        className="form-control"
                        value={specification.name}
                        placeholder="e.g. Fabric"
                        onChange={(e) => handleSpecificationChange(specification.id, 'name', e.target.value)}
                      />
                    </div>

                    {/* VALUE */}

                    <div className="col-lg-5 col-md-4">
                      <label className="form-label fw-semibold">Value</label>

                      <input
                        type="text"
                        className="form-control"
                        value={specification.value}
                        placeholder="e.g. 100% Cotton"
                        onChange={(e) => handleSpecificationChange(specification.id, 'value', e.target.value)}
                      />
                    </div>

                    {/* DELETE */}

                    <div className="col-lg-1 col-md-1">
                      <button
                        type="button"
                        className="btn btn-soft-danger w-100 d-flex align-items-center justify-content-center"
                        style={{
                          minHeight: 38,
                        }}
                        onClick={() => removeSpecification(specification.id)}
                        title="Remove Specification">
                        <IconifyIcon icon="solar:trash-bin-trash-broken" width={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <button type="button" className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={addSpecification}>
                  <IconifyIcon icon="solar:add-circle-broken" />
                  Add Another Specification
                </button>
              </div>
            </div>
          </div>

          {/* ==================================================
                FOOTER
            ================================================== */}

          <div
            className="p-3 border-top bg-white d-flex justify-content-end gap-2 position-sticky bottom-0"
            style={{
              zIndex: 40,
            }}>
            <button
              type="button"
              className="btn btn-light px-4"
              onClick={() => {
                resetForm()
                closeDrawer()
              }}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary px-4 d-flex align-items-center justify-content-center gap-2">
              <IconifyIcon icon="solar:diskette-broken" />
              Add Products
            </button>
          </div>
        </form>
      </div>

      {/* ==================================================
            GLOBAL CSS
        ================================================== */}

      <style jsx global>{`
        .product-quill-editor .ql-toolbar.ql-snow {
          border-color: #dee2e6;
          border-radius: 8px 8px 0 0;
          background: #ffffff;
        }

        .product-quill-editor .ql-container.ql-snow {
          border-color: #dee2e6;
          border-radius: 0 0 8px 8px;
          background: #ffffff;
          font-size: 14px;
        }

        .product-quill-editor .ql-editor {
          min-height: 150px;
          font-size: 14px;
          line-height: 1.6;
        }

        .product-quill-large .ql-editor {
          min-height: 240px;
        }

        .product-quill-editor .ql-editor.ql-blank::before {
          color: #8c98a4;
          font-style: normal;
        }

        .product-quill-editor .ql-toolbar button {
          width: 28px;
          height: 28px;
        }

        .product-quill-editor .ql-toolbar .ql-picker-label {
          height: 28px;
        }
      `}</style>
    </>
  )
}

export default AddProductsDrawer
