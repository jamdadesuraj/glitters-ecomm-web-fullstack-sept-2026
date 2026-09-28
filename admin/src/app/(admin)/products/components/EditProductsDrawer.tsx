'use client'

import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import { useGetProductsByIdQuery, useUpdateProductsMutation } from '@/store/productsApi'

interface Feature {
  icon: File | null
  title: string
  subTitle: string
}

const EditProductsDrawer = ({ item }: any) => {
  const { data: productsData } = useGetProductsByIdQuery(item._id)
  const [updateProduct, { isLoading }] = useUpdateProductsMutation()
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      productImages: [] as File[],
      video: '',
      description: '',
    },

    productOverview: {
      title: '',
      subTitle: '',
      description: '',
    },

    productTesting: {
      title: '',
      subTitle: '',
      shortDescription: '',
      testingParameters: [''],
    },

    aiFeatures: {
      title: '',
      subTitle: '',
      shortDescription: '',
      features: [
        {
          icon: null,
          title: '',
          subTitle: '',
        } as Feature,
      ],
    },

    system: {
      title: '',
      subTitle: '',
      img: null as File | null,
    },

    technicalInfo: {
      title: '',
      subTitle: '',
      flightTime: '',
      range: '',
      speed: '',
      weight: '',
      battery: '',
      camera: '',
    },
  })

  //  /fetch data
  useEffect(() => {
    if (!productsData) return

    setFormData({
      basicInfo: {
        title: productsData.basicInfo?.title || '',
        productImages: [],
        video: productsData.basicInfo?.video || '',
        description: productsData.basicInfo?.description || '',
      },

      productOverview: {
        title: productsData.productOverview?.title || '',
        subTitle: productsData.productOverview?.subTitle || '',
        description: productsData.productOverview?.description || '',
      },

      productTesting: {
        title: productsData.productTesting?.title || '',
        subTitle: productsData.productTesting?.subTitle || '',
        shortDescription: productsData.productTesting?.shortDescription || '',
        testingParameters: productsData.productTesting?.testingParameters || [''],
      },

      aiFeatures: {
        title: productsData.aiFeatures?.title || '',
        subTitle: productsData.aiFeatures?.subTitle || '',
        shortDescription: productsData.aiFeatures?.shortDescription || '',
        features:
          productsData.aiFeatures?.features?.map((feature) => ({
            icon: null,
            title: feature.title,
            subTitle: feature.subTitle,
          })) || [],
      },

      system: {
        title: productsData.system?.title || '',
        subTitle: productsData.system?.subTitle || '',
        img: null,
      },

      technicalInfo: {
        title: productsData.technicalInfo?.title || '',
        subTitle: productsData.technicalInfo?.subTitle || '',
        flightTime: productsData.technicalInfo?.flightTime || '',
        range: productsData.technicalInfo?.range || '',
        speed: productsData.technicalInfo?.speed || '',
        weight: productsData.technicalInfo?.weight || '',
        battery: productsData.technicalInfo?.battery || '',
        camera: productsData.technicalInfo?.camera || '',
      },
    })
  }, [productsData])
  // -------------------------
  // BASIC INFO
  // -------------------------

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }))
  }

  const handleProductImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        productImages: files,
      },
    }))
  }

  // -------------------------
  // OVERVIEW
  // -------------------------

  const handleOverviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      productOverview: {
        ...prev.productOverview,
        [name]: value,
      },
    }))
  }

  // -------------------------
  // TESTING
  // -------------------------

  const handleTestingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      productTesting: {
        ...prev.productTesting,
        [name]: value,
      },
    }))
  }

  const addParameter = () => {
    setFormData((prev) => ({
      ...prev,
      productTesting: {
        ...prev.productTesting,
        testingParameters: [...prev.productTesting.testingParameters, ''],
      },
    }))
  }

  const updateParameter = (index: number, value: string) => {
    const updated = [...formData.productTesting.testingParameters]

    updated[index] = value

    setFormData((prev) => ({
      ...prev,
      productTesting: {
        ...prev.productTesting,
        testingParameters: updated,
      },
    }))
  }

  const removeParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productTesting: {
        ...prev.productTesting,
        testingParameters: prev.productTesting.testingParameters.filter((_, i) => i !== index),
      },
    }))
  }

  // -------------------------
  // AI SECTION
  // -------------------------

  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      aiFeatures: {
        ...prev.aiFeatures,
        [name]: value,
      },
    }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      aiFeatures: {
        ...prev.aiFeatures,
        features: [
          ...prev.aiFeatures.features,
          {
            icon: null,
            title: '',
            subTitle: '',
          },
        ],
      },
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      aiFeatures: {
        ...prev.aiFeatures,
        features: prev.aiFeatures.features.filter((_, i) => i !== index),
      },
    }))
  }

  const updateFeature = (index: number, field: keyof Feature, value: string | File | null) => {
    const updated = [...formData.aiFeatures.features]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setFormData((prev) => ({
      ...prev,
      aiFeatures: {
        ...prev.aiFeatures,
        features: updated,
      },
    }))
  }

  // -------------------------
  // SYSTEM
  // -------------------------

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [name]: value,
      },
    }))
  }

  const handleSystemImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setFormData((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        img: file,
      },
    }))
  }

  // -------------------------
  // TECHNICAL INFO
  // -------------------------

  const handleTechnicalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      technicalInfo: {
        ...prev.technicalInfo,
        [name]: value,
      },
    }))
  }

  // -------------------------
  // SUBMIT
  // -------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = new FormData()

      payload.append(
        'basicInfo',
        JSON.stringify({
          title: formData.basicInfo.title,
          video: formData.basicInfo.video,
          description: formData.basicInfo.description,
        }),
      )

      payload.append('productOverview', JSON.stringify(formData.productOverview))

      payload.append('productTesting', JSON.stringify(formData.productTesting))

      payload.append('technicalInfo', JSON.stringify(formData.technicalInfo))

      payload.append(
        'aiFeatures',
        JSON.stringify({
          title: formData.aiFeatures.title,
          subTitle: formData.aiFeatures.subTitle,
          shortDescription: formData.aiFeatures.shortDescription,
          features: formData.aiFeatures.features.map(({ title, subTitle }) => ({
            title,
            subTitle,
          })),
        }),
      )

      payload.append(
        'system',
        JSON.stringify({
          title: formData.system.title,
          subTitle: formData.system.subTitle,
        }),
      )

      formData.basicInfo.productImages.forEach((file) => {
        payload.append('productImages', file)
      })

      if (formData.system.img) {
        payload.append('systemImage', formData.system.img)
      }

      formData.aiFeatures.features.forEach((feature) => {
        if (feature.icon) {
          payload.append('featureIcons', feature.icon)
        }
      })

      const result = await updateProduct({
        id: item._id,
        data: payload,
      }).unwrap()

      console.log('Created Product:', result)

      toast.success('Product Updated Successfully')

      setOpen(false)

      // reset
      setOpen(false)
      setFormData({
        basicInfo: {
          title: '',
          productImages: [] as File[],
          video: '',
          description: '',
        },

        productOverview: {
          title: '',
          subTitle: '',
          description: '',
        },

        productTesting: {
          title: '',
          subTitle: '',
          shortDescription: '',
          testingParameters: [''],
        },

        aiFeatures: {
          title: '',
          subTitle: '',
          shortDescription: '',
          features: [
            {
              icon: null,
              title: '',
              subTitle: '',
            } as Feature,
          ],
        },

        system: {
          title: '',
          subTitle: '',
          img: null as File | null,
        },

        technicalInfo: {
          title: '',
          subTitle: '',
          flightTime: '',
          range: '',
          speed: '',
          weight: '',
          battery: '',
          camera: '',
        },
      })
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create product')
    }
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button className="btn btn-soft-primary d-flex align-items-center gap-2" onClick={() => setOpen(true)}>
        <IconifyIcon icon="solar:pen-2-broken" />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
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
        <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Edit Products</h5>

          <button
            type="button"
            className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
            onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-3">
            <Card className="bg-light mb-4">
              <CardHeader>
                <h5>Basic Information</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input type="text" name="title" className="form-control" value={formData.basicInfo.title} onChange={handleBasicInfoChange} />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Product Images *</label>

                      <input type="file" multiple className="form-control" onChange={handleProductImages} />

                      {productsData?.basicInfo?.productImages?.length ? (
                        <div className="d-flex gap-2 flex-wrap mt-3">
                          {productsData.basicInfo.productImages.map((image: string, index: number) => (
                            <div key={index}>
                              <Image
                                src={image}
                                alt={`product-${index}`}
                                width={80}
                                height={80}
                                className="rounded border"
                                style={{
                                  objectFit: 'cover',
                                  width: '80px',
                                  height: '80px',
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Video</label>
                      <input type="text" name="video" className="form-control" value={formData.basicInfo.video} onChange={handleBasicInfoChange} />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        rows={4}
                        name="description"
                        className="form-control"
                        value={formData.basicInfo.description}
                        onChange={handleBasicInfoChange}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="bg-light mb-4">
              <CardHeader>
                <h5>Technical Specifications</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.technicalInfo.title}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sub-Title *</label>
                      <input
                        type="text"
                        name="subTitle"
                        className="form-control"
                        value={formData.technicalInfo.subTitle}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Flight Time *</label>
                      <input
                        type="text"
                        name="flightTime"
                        className="form-control"
                        value={formData.technicalInfo.flightTime}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Range *</label>
                      <input
                        type="text"
                        name="range"
                        className="form-control"
                        value={formData.technicalInfo.range}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Speed *</label>

                      <input
                        type="text"
                        name="speed"
                        className="form-control"
                        value={formData.technicalInfo.speed}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Weight *</label>
                      <input
                        type="text"
                        name="weight"
                        className="form-control"
                        value={formData.technicalInfo.weight}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Battery *</label>
                      <input
                        type="text"
                        name="battery"
                        className="form-control"
                        value={formData.technicalInfo.battery}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="mb-3">
                      <label className="form-label">Camera *</label>
                      <input
                        type="text"
                        name="camera"
                        className="form-control"
                        value={formData.technicalInfo.camera}
                        onChange={handleTechnicalInfoChange}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="bg-light mb-4">
              <CardHeader>
                <h5>Product Overview</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.productOverview.title}
                        onChange={handleOverviewChange}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sub-Title *</label>
                      <input
                        type="text"
                        name="subTitle"
                        className="form-control"
                        value={formData.productOverview.subTitle}
                        onChange={handleOverviewChange}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        rows={4}
                        name="description"
                        className="form-control"
                        value={formData.productOverview.description}
                        onChange={handleOverviewChange}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="bg-light mb-4">
              <CardHeader>
                <h5>Product Testing</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input type="text" name="title" className="form-control" value={formData.productTesting.title} onChange={handleTestingChange} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sub-Title *</label>
                      <input
                        type="text"
                        name="subTitle"
                        className="form-control"
                        value={formData.productTesting.subTitle}
                        onChange={handleTestingChange}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Short Description</label>
                      <textarea
                        rows={4}
                        name="shortDescription"
                        className="form-control"
                        value={formData.productTesting.shortDescription}
                        onChange={handleTestingChange}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Testing Parameters</label>

                      <button type="button" className="btn btn-sm btn-primary" onClick={addParameter}>
                        + Add
                      </button>
                    </div>

                    {formData.productTesting.testingParameters.map((item, index) => (
                      <Row key={index} className="align-items-center mb-2">
                        <Col md={10}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter parameter"
                            value={item}
                            onChange={(e) => updateParameter(index, e.target.value)}
                          />
                        </Col>

                        <Col md={2} className="d-flex gap-2">
                          <button type="button" className="btn btn-success btn-sm" onClick={addParameter}>
                            +
                          </button>

                          {formData.productTesting.testingParameters.length > 1 && (
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeParameter(index)}>
                              ✕
                            </button>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="bg-light mb-4">
              <CardHeader>
                <h5> AI Features</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input type="text" name="title" className="form-control" value={formData.aiFeatures.title} onChange={handleAiChange} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sub-Title *</label>
                      <input type="text" name="subTitle" className="form-control" value={formData.aiFeatures.subTitle} onChange={handleAiChange} />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Short Description</label>
                      <textarea
                        rows={4}
                        name="shortDescription"
                        className="form-control"
                        value={formData.aiFeatures.shortDescription}
                        onChange={handleAiChange}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Features</label>

                      <button type="button" className="btn btn-sm btn-primary" onClick={addFeature}>
                        + Add
                      </button>
                    </div>

                    {formData.aiFeatures.features.map((item, index) => (
                      <Row key={index} className="align-items-end mb-3 border p-3 rounded">
                        {/* Icon */}
                        <Col md={3}>
                          <label className="form-label">Icon</label>

                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => updateFeature(index, 'icon', e.target.files?.[0] || null)}
                          />

                          {item.icon && (
                            <div className="mt-2">
                              <Image
                                src={URL.createObjectURL(item.icon)}
                                alt="preview"
                                width={80}
                                height={80}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                            </div>
                          )}
                        </Col>

                        {/* Title */}
                        <Col md={3}>
                          <label className="form-label">Title</label>

                          <input
                            type="text"
                            className="form-control"
                            value={item.title}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          />
                        </Col>

                        {/* Subtitle */}
                        <Col md={3}>
                          <label className="form-label">Sub Title</label>

                          <input
                            type="text"
                            className="form-control"
                            value={item.subTitle}
                            onChange={(e) => updateFeature(index, 'subTitle', e.target.value)}
                          />
                        </Col>

                        {/* Actions */}
                        <Col md={3} className="d-flex gap-2">
                          {index === formData.aiFeatures.features.length - 1 && (
                            <button type="button" className="btn btn-success btn-sm" onClick={addFeature}>
                              +
                            </button>
                          )}

                          {formData.aiFeatures.features.length > 1 && (
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeFeature(index)}>
                              ✕
                            </button>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="bg-light mb-4">
              <CardHeader>
                <h5>Watch the Drone System in Action</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input type="text" name="title" className="form-control" value={formData.system.title} onChange={handleSystemChange} />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Sub-Title *</label>
                      <input type="text" name="subTitle" className="form-control" value={formData.system.subTitle} onChange={handleSystemChange} />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <label className="form-label">Image *</label>
                      <input type="file" className="form-control" onChange={handleSystemImage} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>

          {/* FOOTER */}
          <div className="p-3 border-top d-flex gap-2">
            <button type="button" className="btn btn-light w-100" onClick={() => setOpen(false)}>
              Cancel
            </button>

            <button type="submit" disabled={isLoading} className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
              <IconifyIcon icon="solar:diskette-broken" />

              {isLoading ? 'Saving...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProductsDrawer
