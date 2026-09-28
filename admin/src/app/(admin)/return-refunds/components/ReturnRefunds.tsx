'use client'

import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'

import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'

import { toast } from 'react-toastify'

import { useCreateReturnRefundMutation, useGetReturnRefundQuery, useUpdateReturnRefundMutation } from '@/store/returnRefundApi'

// =====================================================
// TYPES
// =====================================================

type FeatureItem = {
  title: string
  description: string
}

type ReturnStepItem = {
  step: string
  title: string
  description: string
}

type RefundTimelineItem = {
  title: string
  description: string
}

type ReturnRefundFormData = {
  badgeTitle: string
  title: string
  shortDesc: string

  startReturnBtnText: string
  startReturnBtnUrl: string

  contactSupportBtnText: string
  contactSupportBtnUrl: string

  features: FeatureItem[]

  howItWorksTitle: string
  howItWorksDesc: string

  returnSteps: ReturnStepItem[]

  eligibleTitle: string
  eligibleDesc: string
  eligibleItems: string[]

  nonReturnableTitle: string
  nonReturnableDesc: string
  nonReturnableItems: string[]

  refundTimelineTitle: string
  refundTimelineDesc: string
  refundTimeline: RefundTimelineItem[]

  refundProcessingTitle: string
  refundProcessingDesc: string
}

// =====================================================
// INITIAL DATA
// =====================================================

const initialFormData: ReturnRefundFormData = {
  badgeTitle: '',
  title: '',
  shortDesc: '',

  startReturnBtnText: '',
  startReturnBtnUrl: '',

  contactSupportBtnText: '',
  contactSupportBtnUrl: '',

  features: [
    {
      title: '',
      description: '',
    },
  ],

  howItWorksTitle: '',
  howItWorksDesc: '',

  returnSteps: [
    {
      step: '',
      title: '',
      description: '',
    },
  ],

  eligibleTitle: '',
  eligibleDesc: '',
  eligibleItems: [''],

  nonReturnableTitle: '',
  nonReturnableDesc: '',
  nonReturnableItems: [''],

  refundTimelineTitle: '',
  refundTimelineDesc: '',

  refundTimeline: [
    {
      title: '',
      description: '',
    },
  ],

  refundProcessingTitle: '',
  refundProcessingDesc: '',
}

// =====================================================
// COMPONENT
// =====================================================

const ReturnRefunds = () => {
  // ===================================================
  // API
  // ===================================================

  const { data: returnResponse, isLoading, isError, refetch } = useGetReturnRefundQuery()

  const [createReturnRefund, { isLoading: creating }] = useCreateReturnRefundMutation()

  const [updateReturnRefund, { isLoading: updating }] = useUpdateReturnRefundMutation()

  // ===================================================
  // NORMALIZE RESPONSE
  // ===================================================

  const returnData = useMemo(() => {
    const response: any = returnResponse

    if (!response) {
      return null
    }

    if (Array.isArray(response?.data)) {
      return response.data[0] || null
    }

    if (response?.data && typeof response.data === 'object') {
      return response.data
    }

    if (Array.isArray(response)) {
      return response[0] || null
    }

    return response
  }, [returnResponse])

  // ===================================================
  // FORM STATE
  // ===================================================

  const [formData, setFormData] = useState<ReturnRefundFormData>(initialFormData)

  // ===================================================
  // LOAD EXISTING DATA
  // ===================================================

  useEffect(() => {
    if (!returnData) {
      return
    }

    setFormData({
      badgeTitle: returnData.badgeTitle || '',

      title: returnData.title || '',

      shortDesc: returnData.shortDesc || '',

      startReturnBtnText: returnData.startReturnBtnText || '',

      startReturnBtnUrl: returnData.startReturnBtnUrl || '',

      contactSupportBtnText: returnData.contactSupportBtnText || '',

      contactSupportBtnUrl: returnData.contactSupportBtnUrl || '',

      // ===============================================
      // FEATURES
      // ===============================================

      features:
        Array.isArray(returnData.features) && returnData.features.length > 0
          ? returnData.features.map((item: any) => ({
              title: item?.title || '',
              description: item?.description || '',
            }))
          : [
              {
                title: '',
                description: '',
              },
            ],

      // ===============================================
      // HOW IT WORKS
      // ===============================================

      howItWorksTitle: returnData.howItWorksTitle || '',

      howItWorksDesc: returnData.howItWorksDesc || '',

      // ===============================================
      // RETURN STEPS
      // ===============================================

      returnSteps:
        Array.isArray(returnData.returnSteps) && returnData.returnSteps.length > 0
          ? returnData.returnSteps.map((item: any) => ({
              step: item?.step || '',
              title: item?.title || '',
              description: item?.description || '',
            }))
          : [
              {
                step: '',
                title: '',
                description: '',
              },
            ],

      // ===============================================
      // ELIGIBLE
      // ===============================================

      eligibleTitle: returnData.eligibleTitle || '',

      eligibleDesc: returnData.eligibleDesc || '',

      eligibleItems:
        Array.isArray(returnData.eligibleItems) && returnData.eligibleItems.length > 0
          ? returnData.eligibleItems.map((item: any) => String(item || ''))
          : [''],

      // ===============================================
      // NON RETURNABLE
      // ===============================================

      nonReturnableTitle: returnData.nonReturnableTitle || '',

      nonReturnableDesc: returnData.nonReturnableDesc || '',

      nonReturnableItems:
        Array.isArray(returnData.nonReturnableItems) && returnData.nonReturnableItems.length > 0
          ? returnData.nonReturnableItems.map((item: any) => String(item || ''))
          : [''],

      // ===============================================
      // REFUND TIMELINE
      // ===============================================

      refundTimelineTitle: returnData.refundTimelineTitle || '',

      refundTimelineDesc: returnData.refundTimelineDesc || '',

      refundTimeline:
        Array.isArray(returnData.refundTimeline) && returnData.refundTimeline.length > 0
          ? returnData.refundTimeline.map((item: any) => ({
              title: item?.title || '',
              description: item?.description || '',
            }))
          : [
              {
                title: '',
                description: '',
              },
            ],

      // ===============================================
      // PROCESSING
      // ===============================================

      refundProcessingTitle: returnData.refundProcessingTitle || '',

      refundProcessingDesc: returnData.refundProcessingDesc || '',
    })
  }, [returnData])

  // ===================================================
  // NORMAL INPUT
  // ===================================================

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ===================================================
  // FEATURES
  // ===================================================

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => {
    setFormData((prev) => {
      const data = [...prev.features]

      data[index] = {
        ...data[index],
        [field]: value,
      }

      return {
        ...prev,
        features: data,
      }
    })
  }

  const addFeature = () => {
    const last = formData.features[formData.features.length - 1]

    if (last && (!last.title.trim() || !last.description.trim())) {
      toast.error('Please complete current feature first')
      return
    }

    setFormData((prev) => ({
      ...prev,

      features: [
        ...prev.features,
        {
          title: '',
          description: '',
        },
      ],
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      features: prev.features.length > 1 ? prev.features.filter((_, i) => i !== index) : prev.features,
    }))
  }

  // ===================================================
  // RETURN STEPS
  // ===================================================

  const handleReturnStepChange = (index: number, field: keyof ReturnStepItem, value: string) => {
    setFormData((prev) => {
      const data = [...prev.returnSteps]

      data[index] = {
        ...data[index],
        [field]: value,
      }

      return {
        ...prev,
        returnSteps: data,
      }
    })
  }

  const addReturnStep = () => {
    const last = formData.returnSteps[formData.returnSteps.length - 1]

    if (last && (!last.step.trim() || !last.title.trim() || !last.description.trim())) {
      toast.error('Please complete current return step first')
      return
    }

    setFormData((prev) => ({
      ...prev,

      returnSteps: [
        ...prev.returnSteps,

        {
          step: '',
          title: '',
          description: '',
        },
      ],
    }))
  }

  const removeReturnStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      returnSteps: prev.returnSteps.length > 1 ? prev.returnSteps.filter((_, i) => i !== index) : prev.returnSteps,
    }))
  }

  // ===================================================
  // ELIGIBLE ITEMS
  // ===================================================

  const handleEligibleChange = (index: number, value: string) => {
    setFormData((prev) => {
      const data = [...prev.eligibleItems]

      data[index] = value

      return {
        ...prev,
        eligibleItems: data,
      }
    })
  }

  const addEligibleItem = () => {
    const last = formData.eligibleItems[formData.eligibleItems.length - 1]

    if (last !== undefined && !last.trim()) {
      toast.error('Please enter current eligible item first')
      return
    }

    setFormData((prev) => ({
      ...prev,

      eligibleItems: [...prev.eligibleItems, ''],
    }))
  }

  const removeEligibleItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      eligibleItems: prev.eligibleItems.length > 1 ? prev.eligibleItems.filter((_, i) => i !== index) : prev.eligibleItems,
    }))
  }

  // ===================================================
  // NON RETURNABLE ITEMS
  // ===================================================

  const handleNonReturnableChange = (index: number, value: string) => {
    setFormData((prev) => {
      const data = [...prev.nonReturnableItems]

      data[index] = value

      return {
        ...prev,
        nonReturnableItems: data,
      }
    })
  }

  const addNonReturnableItem = () => {
    const last = formData.nonReturnableItems[formData.nonReturnableItems.length - 1]

    if (last !== undefined && !last.trim()) {
      toast.error('Please enter current non-returnable item first')
      return
    }

    setFormData((prev) => ({
      ...prev,

      nonReturnableItems: [...prev.nonReturnableItems, ''],
    }))
  }

  const removeNonReturnableItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      nonReturnableItems: prev.nonReturnableItems.length > 1 ? prev.nonReturnableItems.filter((_, i) => i !== index) : prev.nonReturnableItems,
    }))
  }

  // ===================================================
  // REFUND TIMELINE
  // ===================================================

  const handleRefundTimelineChange = (index: number, field: keyof RefundTimelineItem, value: string) => {
    setFormData((prev) => {
      const data = [...prev.refundTimeline]

      data[index] = {
        ...data[index],
        [field]: value,
      }

      return {
        ...prev,
        refundTimeline: data,
      }
    })
  }

  const addRefundTimeline = () => {
    const last = formData.refundTimeline[formData.refundTimeline.length - 1]

    if (last && (!last.title.trim() || !last.description.trim())) {
      toast.error('Please complete current timeline item first')
      return
    }

    setFormData((prev) => ({
      ...prev,

      refundTimeline: [
        ...prev.refundTimeline,

        {
          title: '',
          description: '',
        },
      ],
    }))
  }

  const removeRefundTimeline = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      refundTimeline: prev.refundTimeline.length > 1 ? prev.refundTimeline.filter((_, i) => i !== index) : prev.refundTimeline,
    }))
  }

  // ===================================================
  // VALIDATION
  // ===================================================

  const validateForm = () => {
    if (!formData.badgeTitle.trim()) {
      toast.error('Badge Title is required')
      return false
    }

    if (!formData.title.trim()) {
      toast.error('Title is required')
      return false
    }

    if (!formData.shortDesc.trim()) {
      toast.error('Short Description is required')
      return false
    }

    return true
  }

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // ===============================================
    // CLEAN FEATURES
    // ===============================================

    const features = formData.features
      .filter((item) => item.title.trim() || item.description.trim())
      .map((item) => ({
        title: item.title.trim(),
        description: item.description.trim(),
      }))

    // ===============================================
    // CLEAN RETURN STEPS
    // ===============================================

    const returnSteps = formData.returnSteps
      .filter((item) => item.step.trim() || item.title.trim() || item.description.trim())
      .map((item) => ({
        step: item.step.trim(),
        title: item.title.trim(),
        description: item.description.trim(),
      }))

    // ===============================================
    // CLEAN ELIGIBLE
    // ===============================================

    const eligibleItems = formData.eligibleItems.map((item) => item.trim()).filter(Boolean)

    // ===============================================
    // CLEAN NON RETURNABLE
    // ===============================================

    const nonReturnableItems = formData.nonReturnableItems.map((item) => item.trim()).filter(Boolean)

    // ===============================================
    // CLEAN TIMELINE
    // ===============================================

    const refundTimeline = formData.refundTimeline
      .filter((item) => item.title.trim() || item.description.trim())
      .map((item) => ({
        title: item.title.trim(),
        description: item.description.trim(),
      }))

    // ===============================================
    // PAYLOAD
    // ===============================================

    const payload = {
      badgeTitle: formData.badgeTitle.trim(),

      title: formData.title.trim(),

      shortDesc: formData.shortDesc.trim(),

      startReturnBtnText: formData.startReturnBtnText.trim(),

      startReturnBtnUrl: formData.startReturnBtnUrl.trim(),

      contactSupportBtnText: formData.contactSupportBtnText.trim(),

      contactSupportBtnUrl: formData.contactSupportBtnUrl.trim(),

      features,

      howItWorksTitle: formData.howItWorksTitle.trim(),

      howItWorksDesc: formData.howItWorksDesc.trim(),

      returnSteps,

      eligibleTitle: formData.eligibleTitle.trim(),

      eligibleDesc: formData.eligibleDesc.trim(),

      eligibleItems,

      nonReturnableTitle: formData.nonReturnableTitle.trim(),

      nonReturnableDesc: formData.nonReturnableDesc.trim(),

      nonReturnableItems,

      refundTimelineTitle: formData.refundTimelineTitle.trim(),

      refundTimelineDesc: formData.refundTimelineDesc.trim(),

      refundTimeline,

      refundProcessingTitle: formData.refundProcessingTitle.trim(),

      refundProcessingDesc: formData.refundProcessingDesc.trim(),
    }

    try {
      // =============================================
      // UPDATE
      // =============================================

      if (returnData?._id) {
        console.log('UPDATE ID:', returnData._id)

        await updateReturnRefund({
          _id: returnData._id,
          data: payload,
        }).unwrap()

        toast.success('Returns & Refunds updated successfully')
      }

      // =============================================
      // CREATE
      // =============================================
      else {
        await createReturnRefund(payload).unwrap()

        toast.success('Returns & Refunds created successfully')
      }

      await refetch()
    } catch (error: any) {
      console.error('Return Refund Error:', error)

      toast.error(error?.data?.message || 'Something went wrong')
    }
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" />

        <div className="mt-2">Loading Returns & Refunds...</div>
      </div>
    )
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {
    return <div className="alert alert-danger">Unable to load Returns & Refunds.</div>
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <form onSubmit={handleSubmit}>
      {/* ============================================
          HERO
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle as="h4" className="mb-0">
            Hero Section
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Badge Title" name="badgeTitle" value={formData.badgeTitle} onChange={handleChange} />
            </Col>

            <Col md={6}>
              <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Short Description" name="shortDesc" value={formData.shortDesc} onChange={handleChange} />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ============================================
          BUTTONS
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle as="h4" className="mb-0">
            Action Buttons
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Start Return Button Text" name="startReturnBtnText" value={formData.startReturnBtnText} onChange={handleChange} />
            </Col>

            <Col md={6}>
              <TextInput label="Start Return Button URL" name="startReturnBtnUrl" value={formData.startReturnBtnUrl} onChange={handleChange} />
            </Col>

            <Col md={6}>
              <TextInput
                label="Contact Support Button Text"
                name="contactSupportBtnText"
                value={formData.contactSupportBtnText}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <TextInput
                label="Contact Support Button URL"
                name="contactSupportBtnUrl"
                value={formData.contactSupportBtnUrl}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ============================================
          FEATURES
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              Features
            </CardTitle>

            <button type="button" className="btn btn-primary btn-sm" onClick={addFeature}>
              + Add Feature
            </button>
          </div>
        </CardHeader>

        <CardBody>
          {formData.features.map((item, index) => (
            <RepeatCard key={index} title={`Feature ${index + 1}`} showRemove={formData.features.length > 1} onRemove={() => removeFeature(index)}>
              <Row>
                <Col md={5}>
                  <CustomInput label="Title" value={item.title} onChange={(value) => handleFeatureChange(index, 'title', value)} />
                </Col>

                <Col md={7}>
                  <CustomTextarea
                    label="Description"
                    value={item.description}
                    onChange={(value) => handleFeatureChange(index, 'description', value)}
                  />
                </Col>
              </Row>
            </RepeatCard>
          ))}
        </CardBody>
      </Card>

      {/* ============================================
          HOW IT WORKS
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle as="h4" className="mb-0">
            How Returns Work
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Title" name="howItWorksTitle" value={formData.howItWorksTitle} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Description" name="howItWorksDesc" value={formData.howItWorksDesc} onChange={handleChange} />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ============================================
          RETURN STEPS
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              Return Steps
            </CardTitle>

            <button type="button" className="btn btn-primary btn-sm" onClick={addReturnStep}>
              + Add Step
            </button>
          </div>
        </CardHeader>

        <CardBody>
          {formData.returnSteps.map((item, index) => (
            <RepeatCard
              key={index}
              title={`Return Step ${index + 1}`}
              showRemove={formData.returnSteps.length > 1}
              onRemove={() => removeReturnStep(index)}>
              <Row>
                <Col md={2}>
                  <CustomInput label="Step" value={item.step} onChange={(value) => handleReturnStepChange(index, 'step', value)} />
                </Col>

                <Col md={4}>
                  <CustomInput label="Title" value={item.title} onChange={(value) => handleReturnStepChange(index, 'title', value)} />
                </Col>

                <Col md={6}>
                  <CustomTextarea
                    label="Description"
                    value={item.description}
                    onChange={(value) => handleReturnStepChange(index, 'description', value)}
                  />
                </Col>
              </Row>
            </RepeatCard>
          ))}
        </CardBody>
      </Card>

      {/* ============================================
          ELIGIBLE
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              Eligible for Return
            </CardTitle>

            <button type="button" className="btn btn-primary btn-sm" onClick={addEligibleItem}>
              + Add Item
            </button>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Title" name="eligibleTitle" value={formData.eligibleTitle} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Description" name="eligibleDesc" value={formData.eligibleDesc} onChange={handleChange} />
            </Col>
          </Row>

          {formData.eligibleItems.map((item, index) => (
            <StringItem
              key={index}
              label={`Eligible Item ${index + 1}`}
              value={item}
              showRemove={formData.eligibleItems.length > 1}
              onChange={(value) => handleEligibleChange(index, value)}
              onRemove={() => removeEligibleItem(index)}
            />
          ))}
        </CardBody>
      </Card>

      {/* ============================================
          NON RETURNABLE
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              Non-Returnable Products
            </CardTitle>

            <button type="button" className="btn btn-primary btn-sm" onClick={addNonReturnableItem}>
              + Add Item
            </button>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Title" name="nonReturnableTitle" value={formData.nonReturnableTitle} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Description" name="nonReturnableDesc" value={formData.nonReturnableDesc} onChange={handleChange} />
            </Col>
          </Row>

          {formData.nonReturnableItems.map((item, index) => (
            <StringItem
              key={index}
              label={`Non-Returnable Item ${index + 1}`}
              value={item}
              showRemove={formData.nonReturnableItems.length > 1}
              onChange={(value) => handleNonReturnableChange(index, value)}
              onRemove={() => removeNonReturnableItem(index)}
            />
          ))}
        </CardBody>
      </Card>

      {/* ============================================
          REFUND TIMELINE
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              Refund Timeline
            </CardTitle>

            <button type="button" className="btn btn-primary btn-sm" onClick={addRefundTimeline}>
              + Add Timeline
            </button>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Title" name="refundTimelineTitle" value={formData.refundTimelineTitle} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Description" name="refundTimelineDesc" value={formData.refundTimelineDesc} onChange={handleChange} />
            </Col>
          </Row>

          {formData.refundTimeline.map((item, index) => (
            <RepeatCard
              key={index}
              title={`Timeline ${index + 1}`}
              showRemove={formData.refundTimeline.length > 1}
              onRemove={() => removeRefundTimeline(index)}>
              <Row>
                <Col md={5}>
                  <CustomInput label="Title" value={item.title} onChange={(value) => handleRefundTimelineChange(index, 'title', value)} />
                </Col>

                <Col md={7}>
                  <CustomTextarea
                    label="Description"
                    value={item.description}
                    onChange={(value) => handleRefundTimelineChange(index, 'description', value)}
                  />
                </Col>
              </Row>
            </RepeatCard>
          ))}
        </CardBody>
      </Card>

      {/* ============================================
          REFUND PROCESSING
      ============================================ */}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle as="h4" className="mb-0">
            Refund Processing
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md={6}>
              <TextInput label="Title" name="refundProcessingTitle" value={formData.refundProcessingTitle} onChange={handleChange} />
            </Col>

            <Col md={12}>
              <TextArea label="Description" name="refundProcessingDesc" value={formData.refundProcessingDesc} onChange={handleChange} />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ============================================
          SAVE
      ============================================ */}

      <button type="submit" className="btn btn-primary w-100 mb-4" disabled={creating || updating}>
        {creating || updating ? 'Please wait...' : returnData?._id ? 'Update Returns & Refunds' : 'Create Returns & Refunds'}
      </button>
    </form>
  )
}

// =====================================================
// NORMAL TEXT INPUT
// =====================================================

const TextInput = ({ label, name, value, onChange }: any) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>

    <input type="text" className="form-control" name={name} value={value} onChange={onChange} />
  </div>
)

// =====================================================
// NORMAL TEXTAREA
// =====================================================

const TextArea = ({ label, name, value, onChange }: any) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>

    <textarea rows={3} className="form-control" name={name} value={value} onChange={onChange} />
  </div>
)

// =====================================================
// CUSTOM INPUT
// =====================================================

const CustomInput = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>

    <input type="text" className="form-control" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

// =====================================================
// CUSTOM TEXTAREA
// =====================================================

const CustomTextarea = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>

    <textarea rows={3} className="form-control" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

// =====================================================
// REPEAT CARD
// =====================================================

const RepeatCard = ({
  title,
  children,
  showRemove,
  onRemove,
}: {
  title: string
  children: React.ReactNode
  showRemove: boolean
  onRemove: () => void
}) => (
  <div className="border rounded p-3 mb-3 bg-light">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="mb-0">{title}</h6>

      {showRemove && (
        <button type="button" className="btn btn-soft-danger btn-sm" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>

    {children}
  </div>
)

// =====================================================
// STRING ITEM
// =====================================================

const StringItem = ({
  label,
  value,
  showRemove,
  onChange,
  onRemove,
}: {
  label: string
  value: string
  showRemove: boolean
  onChange: (value: string) => void
  onRemove: () => void
}) => (
  <div className="border rounded p-3 mb-3 bg-light">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <label className="form-label mb-0">{label}</label>

      {showRemove && (
        <button type="button" className="btn btn-soft-danger btn-sm" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>

    <input type="text" className="form-control" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default ReturnRefunds
