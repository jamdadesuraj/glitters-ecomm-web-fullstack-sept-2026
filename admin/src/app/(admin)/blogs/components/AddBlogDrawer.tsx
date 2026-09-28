'use client'

import React, { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'
// @ts-ignore
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { useCreateBlogMutation } from '@/store/blogApi'
import Image from 'next/image'

// ✅ Fix SSR issue
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
const AddBlogDrawer = () => {
  const [open, setOpen] = useState(false)
  // api
  const [createWorkingProcess] = useCreateBlogMutation()

  const [imagePreview, setImagePreview] = useState<string>('')

  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    tags: '',
    metaTitle: '',
    metaDesc: '',
    metaTags: '',
    image: null as File | null,
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    setFormData((prev) => ({
      ...prev,
      image: file,
    }))

    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload = new FormData()

      payload.append('title', formData.title)
      payload.append('shortDesc', formData.shortDesc)
      payload.append('description', formData.description)
      payload.append('tags', formData.tags)
      payload.append('metaTitle', formData.metaTitle)
      payload.append('metaDesc', formData.metaDesc)
      payload.append('metaTags', formData.metaTags)

      if (formData.image) {
        payload.append('image', formData.image)
      }

      await createWorkingProcess(payload).unwrap()

      toast.success('blog created successfully')
      setOpen(false)

      setFormData({
        title: '',
        shortDesc: '',
        description: '',
        tags: '',
        metaTitle: '',
        metaDesc: '',
        metaTags: '',
        image: null,
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
        Add Blog
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
          width: '820px',
          maxWidth: '100%',
          zIndex: 1050,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}>
        {/* HEADER */}
        <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Add Blog</h5>

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
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                </div>
              </Col>

              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Image *</label>

                  <input type="file" className="form-control" onChange={handleFile} accept="image/*" />

                  {imagePreview && (
                    <div className="mt-3">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        width={150}
                        height={150}
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Short Description *</label>
                  <textarea
                    name="shortDesc"
                    id=""
                    cols={30}
                    rows={4}
                    className="form-control"
                    value={formData.shortDesc}
                    onChange={handleChange}></textarea>
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <div style={{ height: '200px' }}>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) => setFormData({ ...formData, description: value })}
                      placeholder="Enter description..."
                      style={{ height: '150px' }}
                    />
                  </div>{' '}
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <input type="text" className="form-control" name="tags" value={formData.tags} onChange={handleChange} />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Meta Title</label>
                  <input type="text" className="form-control" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="" />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Meta Description</label>
                  <input type="text" className="form-control" name="metaDesc" value={formData.metaDesc} onChange={handleChange} />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Meta Tags</label>
                  <input type="text" className="form-control" name="metaTags" value={formData.metaTags} onChange={handleChange} />
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

export default AddBlogDrawer
