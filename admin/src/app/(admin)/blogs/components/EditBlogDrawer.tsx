'use client'

import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'
// @ts-ignore
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '@/store/blogApi'

// ✅ Fix SSR issue
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})
const EditBlogDrawer = ({ item }: any) => {
  const [open, setOpen] = useState(false)
  // api
  const { data: blogData, isLoading } = useGetBlogByIdQuery(item?._id, {
    skip: !item?._id,
  })
  const [updateBlog] = useUpdateBlogMutation()

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
  const [imagePreview, setImagePreview] = useState<string>('')
  // fetch data
  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData?.title || '',
        shortDesc: blogData?.shortDesc || '',
        description: blogData?.description || '',
        tags: blogData?.tags || '',
        metaTitle: blogData?.metaTitle || '',
        metaDesc: blogData?.metaDesc || '',
        metaTags: blogData?.metaTags || '',
        image: null,
      })
      setImagePreview(blogData.image || '')
    }
  }, [blogData])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = new FormData()

      data.append('title', formData.title)
      data.append('shortDesc', formData.shortDesc)
      data.append('description', formData.description)
      data.append('tags', formData.tags)
      data.append('metaTitle', formData.metaTitle)
      data.append('metaDesc', formData.metaDesc)
      data.append('metaTags', formData.metaTags)

      if (formData.image) {
        data.append('image', formData.image)
      }

      await updateBlog({
        id: item._id,
        data,
      }).unwrap()

      toast.success('Blog updated successfully')
      setOpen(false)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
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
          width: '820px',
          maxWidth: '100%',
          zIndex: 1050,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}>
        {/* HEADER */}
        <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Edit Blog</h5>

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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditBlogDrawer
