'use client'

import React, { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'
import { useCreateHomeBannerMutation } from '@/store/homeBanner'

const AddHomeDrawer = ({ onAdd }: any) => {
  const [open, setOpen] = useState(false)
  // api
  const [createHomeBanner] = useCreateHomeBannerMutation()

  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    shortDesc: '',
    bgVideo: null as File | null,
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFile = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      bgVideo: e.target.files?.[0] || null,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload = new FormData()

      payload.append('title', formData.title)
      payload.append('subTitle', formData.subTitle)
      payload.append('shortDesc', formData.shortDesc)

      if (formData.bgVideo) {
        payload.append('bgVideo', formData.bgVideo)
      }

      await createHomeBanner(payload).unwrap()

      toast.success('Home Banner created successfully')
      setOpen(false)
      onAdd()

      setFormData({
        title: '',
        subTitle: '',
        shortDesc: '',
        bgVideo: null,
      })
    } catch (error: any) {
      console.error(error)
      toast.error(error?.data?.message || 'Something went wrong')
    }
  }
  return (
    <>
      {/* OPEN BUTTON */}
      <button type="button" className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setOpen(true)}>
        <IconifyIcon icon="solar:add-circle-broken" />
        Add Home Banner
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
          width: '520px',
          maxWidth: '100%',
          zIndex: 1050,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}>
        {/* HEADER */}
        <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Add Home Banner</h5>

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
            <Row>
              {/* <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Sub-Title *</label>
                  <input type="text" className="form-control" name="subTitle" value={formData.subTitle} onChange={handleChange} />
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea rows={4} className="form-control" name="shortDesc" value={formData.shortDesc} onChange={handleChange} />
                </div>
              </Col> */}

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Banner / Video</label>
                  <input type="file" accept="video/*" className="form-control" onChange={handleFile} />{' '}
                </div>
              </Col>
            </Row>
          </div>

          {/* FOOTER */}
          <div className="p-3 border-top d-flex gap-2">
            <button type="button" className="btn btn-light w-100" onClick={() => setOpen(false)}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
              <IconifyIcon icon="solar:diskette-broken" />
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddHomeDrawer
