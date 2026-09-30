'use client'

import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Select, { SingleValue, StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Swal from 'sweetalert2'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
// @ts-ignore
import 'react-quill-new/dist/quill.snow.css'

import { useCreateProductsMutation } from '@/store/productsApi'
import { useGetcategoryQuery } from '@/store/categoriesApi'
import { useGetSubCategoryQuery } from '@/store/subCategoryApi'
import { useGetMaterialQuery } from '@/store/materialApi'
import { useGetBrandQuery } from '@/store/brandApi'
import { useGetCouponQuery } from '@/store/couponApi'
import { useGetSizeQuery } from '@/store/sizeApi'
import { useGetColorsQuery } from '@/store/colorsApi'
import Image from 'next/image'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
})

// =====================================================
// TYPES
// =====================================================

type SelectOption = {
  value: string
  label: string
}

type TagOption = SelectOption

type ProductFormData = {
  productName: string
  category: string
  subCategory: string
  material: string
  section: '' | 'New Offers' | 'Popular Products' | 'New Arrivals'
  brand: string
  coupon: string
  dealOfTheDay: boolean
  tags: string[]
  videoUrl: string

  shortDescription: string
  productDescription: string
  additionalInformation: string
  shippingReturnPolicy: string
}

type ProductVariant = {
  id: number
  size: string
  color: string
  stock: string
  price: string
  delPrice: string
  discount: string
  image: File | null
  imagePreview: string
}

type VariantField = 'size' | 'color' | 'stock' | 'price' | 'delPrice' | 'discount'

type ProductSpecification = {
  id: number
  specificationName: string
  value: string
}

type SpecificationField = 'specificationName' | 'value'

// =====================================================
// STATIC OPTIONS
// =====================================================

const sections: SelectOption[] = [
  {
    value: 'New Offers',
    label: 'New Offers',
  },
  {
    value: 'Popular Products',
    label: 'Popular Products',
  },
  {
    value: 'New Arrivals',
    label: 'New Arrivals',
  },
]

const dealOptions: SelectOption[] = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
]

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

// =====================================================
// SELECT STYLES
// =====================================================

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

// =====================================================
// QUILL CONFIG
// =====================================================

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'link'],
    [{ align: [] }],
    ['clean'],
  ],
}

const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'blockquote', 'link', 'align']

// =====================================================
// HELPERS
// =====================================================

const createEmptyVariant = (): ProductVariant => ({
  id: Date.now() + Math.random(),
  size: '',
  color: '',
  stock: '',
  price: '',
  delPrice: '',
  discount: '',
  image: null,
  imagePreview: '',
})

const createEmptySpecification = (): ProductSpecification => ({
  id: Date.now() + Math.random(),
  specificationName: '',
  value: '',
})

const hasRichTextContent = (value: string): boolean => {
  return (
    value
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim().length > 0
  )
}

const AddProductsDrawer = () => {
  // =====================================================
  // API
  // =====================================================

  const [createProduct, { isLoading: createLoading }] = useCreateProductsMutation()

  const { data: categoryData = [], isLoading: categoryLoading } = useGetcategoryQuery()

  const { data: subCategoryData = [], isLoading: subCategoryLoading } = useGetSubCategoryQuery()

  const { data: materialData = [], isLoading: materialLoading } = useGetMaterialQuery()

  const { data: brandData = [], isLoading: brandLoading } = useGetBrandQuery()

  const { data: couponData = [], isLoading: couponLoading } = useGetCouponQuery()

  const { data: sizeData = [], isLoading: sizeLoading } = useGetSizeQuery()

  const { data: colorData = [], isLoading: colorLoading } = useGetColorsQuery()

  console.log('COLOR DATA:', colorData)

  // =====================================================
  // STATE
  // =====================================================

  const [open, setOpen] = useState<boolean>(false)

  const [error, setError] = useState<string>('')

  const [productImages, setProductImages] = useState<File[]>([])

  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([])

  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    category: '',
    subCategory: '',
    material: '',
    section: '',
    brand: '',
    coupon: '',
    dealOfTheDay: false,
    tags: [],
    videoUrl: '',
    shortDescription: '',
    productDescription: '',
    additionalInformation: '',
    shippingReturnPolicy: '',
  })

  const [variants, setVariants] = useState<ProductVariant[]>([createEmptyVariant()])

  const [specifications, setSpecifications] = useState<ProductSpecification[]>([createEmptySpecification()])

  // =====================================================
  // DYNAMIC OPTIONS
  // =====================================================

  const categories = useMemo<SelectOption[]>(() => {
    return categoryData
      .filter((item: any) => item.status === 'active' && !item.isDeleted)
      .map((item: any) => ({
        value: item._id,
        label: item.categoryName,
      }))
  }, [categoryData])

  const subCategories = useMemo<SelectOption[]>(() => {
    return subCategoryData
      .filter((item: any) => {
        if (item.status !== 'active' || item.isDeleted) {
          return false
        }

        if (!formData.category) {
          return true
        }

        const categoryId = typeof item.category === 'object' ? item.category?._id : item.category

        return categoryId === formData.category
      })
      .map((item: any) => ({
        value: item._id,
        label: item.subCategoryName,
      }))
  }, [subCategoryData, formData.category])

  const materials = useMemo<SelectOption[]>(() => {
    return materialData
      .filter((item: any) => item.status === 'active' && !item.isDeleted)
      .map((item: any) => ({
        value: item._id,
        label: item.materialName || item.name,
      }))
  }, [materialData])

  const brands = useMemo<SelectOption[]>(() => {
    return brandData
      .filter((item: any) => item.status === 'active' && !item.isDeleted)
      .map((item: any) => ({
        value: item._id,
        label: item.brandName || item.name,
      }))
  }, [brandData])

  const coupons = useMemo<SelectOption[]>(() => {
    return couponData
      .filter((item: any) => item.status === 'active' && !item.isDeleted)
      .map((item: any) => ({
        value: item._id,
        label: item.couponCode || item.code || item.couponName,
      }))
  }, [couponData])

  // =====================================================
  // COLOR OPTIONS
  // =====================================================

  const colorOptions = useMemo<SelectOption[]>(() => {
    const list = Array.isArray(colorData) ? colorData : Array.isArray((colorData as any)?.data) ? (colorData as any).data : []

    return list
      .filter((item: any) => item.status === 'active' && item.isDeleted !== true)
      .map((item: any) => ({
        value: item._id,
        label: item.colorName,
      }))
  }, [colorData])

  // =====================================================
  // SIZE OPTIONS
  // =====================================================

  const sizeOptions = useMemo<SelectOption[]>(() => {
    const list = Array.isArray(sizeData) ? sizeData : Array.isArray((sizeData as any)?.data) ? (sizeData as any).data : []

    return list
      .filter((item: any) => item.status === 'active' && item.isDeleted !== true)
      .map((item: any) => ({
        value: item._id,
        label: item.size,
      }))
  }, [sizeData])

  // =====================================================
  // SELECTED TAGS
  // =====================================================

  const selectedTags = useMemo<TagOption[]>(() => {
    return formData.tags.map((tag) => {
      const found = defaultTagOptions.find((option) => option.value === tag)

      return (
        found || {
          value: tag,
          label: tag,
        }
      )
    })
  }, [formData.tags])

  // =====================================================
  // PORTAL
  // =====================================================

  const portalTarget = typeof document !== 'undefined' ? document.body : undefined

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      productImagePreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [productImagePreviews])

  // =====================================================
  // GET SELECTED OPTION
  // =====================================================

  const getSelectedOption = (options: SelectOption[], value: string): SelectOption | null => {
    return options.find((option) => option.value === value) ?? null
  }

  // =====================================================
  // TEXT CHANGE
  // =====================================================

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =====================================================
  // SELECT CHANGE
  // =====================================================

  const handleSelectChange = (field: 'category' | 'subCategory' | 'material' | 'section' | 'brand' | 'coupon', option: SingleValue<SelectOption>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option?.value ?? '',
    }))
  }

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (option: SingleValue<SelectOption>) => {
    setFormData((prev) => ({
      ...prev,
      category: option?.value ?? '',
      subCategory: '',
    }))
  }

  // =====================================================
  // DEAL CHANGE
  // =====================================================

  const handleDealChange = (option: SingleValue<SelectOption>) => {
    setFormData((prev) => ({
      ...prev,
      dealOfTheDay: option?.value === 'true',
    }))
  }

  // =====================================================
  // TAG CHANGE
  // =====================================================

  const handleTagChange = (options: readonly TagOption[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: options.map((option) => option.value),
    }))
  }

  // =====================================================
  // PRODUCT IMAGES
  // =====================================================

  const handleProductImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (!files.length) {
      return
    }

    const validFiles = files.filter((file) => file.type.startsWith('image/'))

    if (!validFiles.length) {
      setError('Please select valid image files.')
      return
    }

    productImagePreviews.forEach((url) => URL.revokeObjectURL(url))

    setProductImages(validFiles)

    setProductImagePreviews(validFiles.map((file) => URL.createObjectURL(file)))

    setError('')
  }

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index))

    setProductImagePreviews((prev) => {
      const target = prev[index]

      if (target) {
        URL.revokeObjectURL(target)
      }

      return prev.filter((_, i) => i !== index)
    })
  }

  // =====================================================
  // VARIANT
  // =====================================================

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

  const handleVariantImageChange = (id: number, file: File | null) => {
    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id !== id) {
          return variant
        }

        if (variant.imagePreview) {
          URL.revokeObjectURL(variant.imagePreview)
        }

        return {
          ...variant,
          image: file,
          imagePreview: file ? URL.createObjectURL(file) : '',
        }
      }),
    )
  }

  const removeVariantImage = (id: number) => {
    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id !== id) {
          return variant
        }

        if (variant.imagePreview) {
          URL.revokeObjectURL(variant.imagePreview)
        }

        return {
          ...variant,
          image: null,
          imagePreview: '',
        }
      }),
    )
  }

  const addVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()])
  }

  const removeVariant = (id: number) => {
    if (variants.length <= 1) {
      return
    }

    setVariants((prev) => {
      const target = prev.find((variant) => variant.id === id)

      if (target?.imagePreview) {
        URL.revokeObjectURL(target.imagePreview)
      }

      return prev.filter((variant) => variant.id !== id)
    })
  }

  // =====================================================
  // SPECIFICATION
  // =====================================================

  const handleSpecificationChange = (id: number, field: SpecificationField, value: string) => {
    setSpecifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    )
  }

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, createEmptySpecification()])
  }

  const removeSpecification = (id: number) => {
    if (specifications.length === 1) {
      setSpecifications([createEmptySpecification()])
      return
    }

    setSpecifications((prev) => prev.filter((item) => item.id !== id))
  }

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    productImagePreviews.forEach((url) => URL.revokeObjectURL(url))

    setProductImages([])
    setProductImagePreviews([])
    setError('')

    setFormData({
      productName: '',
      category: '',
      subCategory: '',
      material: '',
      section: '',
      brand: '',
      coupon: '',
      dealOfTheDay: false,
      tags: [],
      videoUrl: '',
      shortDescription: '',
      productDescription: '',
      additionalInformation: '',
      shippingReturnPolicy: '',
    })

    variants.forEach((variant) => {
      if (variant.imagePreview) {
        URL.revokeObjectURL(variant.imagePreview)
      }
    })

    setVariants([createEmptyVariant()])

    setSpecifications([createEmptySpecification()])
  }

  // =====================================================
  // CLOSE
  // =====================================================

  const closeDrawer = () => {
    if (createLoading) {
      return
    }

    setOpen(false)
  }

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = (): boolean => {
    if (!formData.productName.trim()) {
      setError('Product name is required.')
      return false
    }

    if (!formData.category) {
      setError('Category is required.')
      return false
    }

    if (!formData.section) {
      setError('Section is required.')
      return false
    }

    if (!hasRichTextContent(formData.shortDescription)) {
      setError('Short Description is required.')
      return false
    }

    if (!hasRichTextContent(formData.productDescription)) {
      setError('Product Description is required.')
      return false
    }

    const invalidVariant = variants.some((variant) => !variant.size || !variant.color || variant.price === '' || variant.stock === '')

    if (invalidVariant) {
      setError('Please complete Size, Color, Price and Stock for all variants.')
      return false
    }

    const invalidNumber = variants.some((variant) => {
      const price = Number(variant.price)

      const delPrice = variant.delPrice ? Number(variant.delPrice) : 0

      const discount = variant.discount ? Number(variant.discount) : 0

      const stock = Number(variant.stock)

      return (
        Number.isNaN(price) ||
        price < 0 ||
        Number.isNaN(delPrice) ||
        delPrice < 0 ||
        Number.isNaN(discount) ||
        discount < 0 ||
        discount > 100 ||
        Number.isNaN(stock) ||
        stock < 0
      )
    })

    if (invalidNumber) {
      setError('Please enter valid price, discount and stock values.')
      return false
    }

    setError('')

    return true
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    const apiFormData = new FormData()

    apiFormData.append('productName', formData.productName)

    apiFormData.append('category', formData.category)

    if (formData.subCategory) {
      apiFormData.append('subCategory', formData.subCategory)
    }

    if (formData.material) {
      apiFormData.append('material', formData.material)
    }

    apiFormData.append('section', formData.section)

    if (formData.brand) {
      apiFormData.append('brand', formData.brand)
    }

    apiFormData.append('dealOfTheDay', String(formData.dealOfTheDay))

    if (formData.coupon) {
      apiFormData.append('coupon', formData.coupon)
    }

    apiFormData.append('tags', JSON.stringify(formData.tags))

    if (formData.videoUrl.trim()) {
      apiFormData.append('videoUrl', formData.videoUrl.trim())
    }

    // REQUIRED BACKEND FIELDS
    apiFormData.append('shortDesc', formData.shortDescription)

    apiFormData.append('desc', formData.productDescription)

    apiFormData.append('shippingReturnPolicy', formData.shippingReturnPolicy)

    if (formData.additionalInformation) {
      apiFormData.append('additionalInformation', formData.additionalInformation)
    }

    const cleanVariants = variants.map((variant) => ({
      size: variant.size,
      color: variant.color,
      price: Number(variant.price),
      delPrice: variant.delPrice ? Number(variant.delPrice) : 0,
      discount: variant.discount ? Number(variant.discount) : 0,
      stock: Number(variant.stock),
    }))

    apiFormData.append('variants', JSON.stringify(cleanVariants))

    const cleanSpecifications = specifications
      .filter((item) => item.specificationName.trim() || item.value.trim())
      .map((item) => ({
        specificationName: item.specificationName.trim(),
        value: item.value.trim(),
      }))

    apiFormData.append('specifications', JSON.stringify(cleanSpecifications))

    productImages.forEach((file) => {
      apiFormData.append('productImages', file)
    })

    variants.forEach((variant) => {
      if (variant.image) {
        apiFormData.append('variantImages', variant.image)
      }
    })

    try {
      await createProduct(apiFormData).unwrap()

      await Swal.fire({
        title: 'Success',
        text: 'Product added successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })

      resetForm()
      setOpen(false)
    } catch (err: any) {
      const message = err?.data?.message || err?.error || err?.message || 'Unable to add product.'

      setError(message)

      await Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
      })
    }
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <button type="button" className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setOpen(true)}>
        <IconifyIcon icon="solar:add-circle-broken" />
        Add Product
      </button>

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
        {/* HEADER */}

        <div
          className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center position-sticky top-0"
          style={{
            zIndex: 50,
          }}>
          <div>
            <h5 className="mb-1 fw-bold">Add Product</h5>

            <small className="text-muted">Add product information, variants and specifications</small>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 32,
              height: 32,
            }}
            onClick={closeDrawer}
            disabled={createLoading}>
            ✕
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <IconifyIcon icon="solar:danger-triangle-broken" />
                {error}
              </div>
            )}

            {/* PRODUCT INFO */}

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
                      name="productName"
                      value={formData.productName}
                      onChange={handleTextChange}
                      className="form-control"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  {/* CATEGORY */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Category
                      <span className="text-danger ms-1">*</span>
                    </label>

                    <Select<SelectOption>
                      options={categories}
                      value={getSelectedOption(categories, formData.category)}
                      onChange={handleCategoryChange}
                      placeholder={categoryLoading ? 'Loading Categories...' : 'Select Category'}
                      isLoading={categoryLoading}
                      isDisabled={categoryLoading}
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
                      value={getSelectedOption(subCategories, formData.subCategory)}
                      onChange={(option) => handleSelectChange('subCategory', option)}
                      placeholder={
                        !formData.category ? 'Select Category First' : subCategoryLoading ? 'Loading Sub-Categories...' : 'Select Sub-Category'
                      }
                      isLoading={subCategoryLoading}
                      isDisabled={!formData.category || subCategoryLoading}
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
                      placeholder={materialLoading ? 'Loading Materials...' : 'Select Material'}
                      isLoading={materialLoading}
                      isDisabled={materialLoading}
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* SECTION */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Section
                      <span className="text-danger ms-1">*</span>
                    </label>

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
                      placeholder={brandLoading ? 'Loading Brands...' : 'Select Brand'}
                      isLoading={brandLoading}
                      isDisabled={brandLoading}
                      isSearchable
                      isClearable
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* DEAL */}

                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Deal of the Day</label>

                    <Select<SelectOption>
                      options={dealOptions}
                      value={getSelectedOption(dealOptions, String(formData.dealOfTheDay))}
                      onChange={handleDealChange}
                      placeholder="Select"
                      isSearchable={false}
                      isClearable={false}
                      styles={selectStyles}
                      menuPortalTarget={portalTarget}
                      menuPosition="fixed"
                    />
                  </div>

                  {/* COUPON */}

                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="form-label fw-semibold">Coupon</label>

                    <Select<SelectOption>
                      options={coupons}
                      value={getSelectedOption(coupons, formData.coupon)}
                      onChange={(option) => handleSelectChange('coupon', option)}
                      placeholder={couponLoading ? 'Loading Coupons...' : 'Select Coupon'}
                      isLoading={couponLoading}
                      isDisabled={couponLoading}
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
                    />
                  </div>

                  {/* VIDEO URL */}

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Video URL</label>

                    <input
                      type="url"
                      name="videoUrl"
                      className="form-control"
                      value={formData.videoUrl}
                      onChange={handleTextChange}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  {/* PRODUCT IMAGES */}

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Product Images</label>

                    <input type="file" className="form-control" accept="image/*" multiple onChange={handleProductImagesChange} />
                  </div>

                  {productImagePreviews.length > 0 && (
                    <div className="col-12">
                      <div className="d-flex gap-2 flex-wrap">
                        {productImagePreviews.map((preview, index) => (
                          <div
                            key={preview}
                            className="position-relative border rounded overflow-hidden"
                            style={{
                              width: 90,
                              height: 90,
                            }}>
                            <Image
                              src={preview}
                              alt={`Product ${index + 1}`}
                              width={90}
                              height={90}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />

                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle"
                              style={{
                                width: 22,
                                height: 22,
                              }}
                              onClick={() => removeProductImage(index)}>
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VARIANTS */}

            <div className="card border mb-4">
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
                        <th className="text-center">#</th>

                        <th>Size</th>

                        <th>Color</th>

                        <th>Price</th>

                        <th>Del Price</th>

                        <th>Discount</th>

                        <th>Stock</th>

                        <th>Image</th>

                        <th className="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={variant.id}>
                          <td className="text-center fw-semibold">{index + 1}</td>

                          {/* SIZE */}

                          <td
                            style={{
                              minWidth: 170,
                            }}>
                            <Select<SelectOption>
                              options={sizeOptions}
                              value={getSelectedOption(sizeOptions, variant.size)}
                              onChange={(option) => handleVariantChange(variant.id, 'size', option?.value ?? '')}
                              placeholder={sizeLoading ? 'Loading Sizes...' : 'Select Size'}
                              isLoading={sizeLoading}
                              isDisabled={sizeLoading}
                              isSearchable
                              isClearable
                              styles={selectStyles}
                              menuPortalTarget={portalTarget}
                              menuPosition="fixed"
                            />
                          </td>

                          {/* COLOR */}

                          <td
                            style={{
                              minWidth: 180,
                            }}>
                            <Select<SelectOption>
                              options={colorOptions}
                              value={getSelectedOption(colorOptions, variant.color)}
                              onChange={(option) => handleVariantChange(variant.id, 'color', option?.value ?? '')}
                              placeholder={colorLoading ? 'Loading Colors...' : 'Select Color'}
                              isLoading={colorLoading}
                              isDisabled={colorLoading}
                              isSearchable
                              isClearable
                              styles={selectStyles}
                              menuPortalTarget={portalTarget}
                              menuPosition="fixed"
                            />
                          </td>

                          {/* PRICE */}

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              step="0.01"
                              value={variant.price}
                              onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                              required
                            />
                          </td>

                          {/* DEL PRICE */}

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              step="0.01"
                              value={variant.delPrice}
                              onChange={(e) => handleVariantChange(variant.id, 'delPrice', e.target.value)}
                            />
                          </td>

                          {/* DISCOUNT */}

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              max="100"
                              step="0.01"
                              value={variant.discount}
                              onChange={(e) => handleVariantChange(variant.id, 'discount', e.target.value)}
                            />
                          </td>

                          {/* STOCK */}

                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              step="1"
                              value={variant.stock}
                              onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                              required
                            />
                          </td>

                          {/* IMAGE */}

                          <td
                            style={{
                              minWidth: 220,
                            }}>
                            {variant.imagePreview ? (
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="position-relative border rounded overflow-hidden flex-shrink-0"
                                  style={{
                                    width: 58,
                                    height: 58,
                                  }}>
                                  <Image
                                    src={variant.imagePreview}
                                    alt="Variant"
                                    width={58}
                                    height={58}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                </div>

                                <div className="d-flex flex-column gap-1">
                                  <label className="btn btn-soft-dark btn-sm mb-0" style={{ cursor: 'pointer' }}>
                                    Change
                                    <input
                                      type="file"
                                      accept="image/*"
                                      hidden
                                      onChange={(e) => handleVariantImageChange(variant.id, e.target.files?.[0] || null)}
                                    />
                                  </label>

                                  <button type="button" className="btn btn-soft-danger btn-sm" onClick={() => removeVariantImage(variant.id)}>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => handleVariantImageChange(variant.id, e.target.files?.[0] || null)}
                              />
                            )}
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-soft-danger btn-sm"
                              disabled={variants.length === 1}
                              onClick={() => removeVariant(variant.id)}>
                              <IconifyIcon icon="solar:trash-bin-trash-broken" width={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* DESCRIPTIONS */}

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
                        value={formData.shortDescription}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            shortDescription: value,
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
                        value={formData.productDescription}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            productDescription: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter complete product description..."
                      />
                    </div>
                  </div>

                  {/* ADDITIONAL */}

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <label className="form-label fw-semibold">Additional Information</label>

                    <div className="product-quill-editor">
                      <ReactQuill
                        theme="snow"
                        value={formData.additionalInformation}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            additionalInformation: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                      />
                    </div>
                  </div>

                  {/* SHIPPING */}

                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <label className="form-label fw-semibold">Shipping & Return Policy</label>

                    <div className="product-quill-editor">
                      <ReactQuill
                        theme="snow"
                        value={formData.shippingReturnPolicy}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            shippingReturnPolicy: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SPECIFICATIONS */}

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
                    <div className="col-lg-1 col-md-2">
                      <label className="form-label fw-semibold">#</label>

                      <div className="form-control bg-light text-center">{index + 1}</div>
                    </div>

                    <div className="col-lg-5 col-md-5">
                      <label className="form-label fw-semibold">Specification Name</label>

                      <input
                        type="text"
                        className="form-control"
                        value={specification.specificationName}
                        placeholder="e.g. Fabric"
                        onChange={(e) => handleSpecificationChange(specification.id, 'specificationName', e.target.value)}
                      />
                    </div>

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

                    <div className="col-lg-1 col-md-1">
                      <button
                        type="button"
                        className="btn btn-soft-danger w-100 d-flex align-items-center justify-content-center"
                        style={{
                          minHeight: 38,
                        }}
                        onClick={() => removeSpecification(specification.id)}>
                        <IconifyIcon icon="solar:trash-bin-trash-broken" width={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="p-3 border-top bg-white d-flex justify-content-end gap-2 position-sticky bottom-0"
            style={{
              zIndex: 40,
            }}>
            <button
              type="button"
              className="btn btn-light px-4"
              disabled={createLoading}
              onClick={() => {
                resetForm()
                closeDrawer()
              }}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary px-4 d-flex align-items-center justify-content-center gap-2" disabled={createLoading}>
              {createLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" />
                  Saving...
                </>
              ) : (
                <>
                  <IconifyIcon icon="solar:diskette-broken" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* CSS */}

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
      `}</style>
    </>
  )
}

export default AddProductsDrawer
