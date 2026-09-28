'use client'

import { useCreateSettingMutation, useGetSettingsQuery, useUpdateSettingMutation } from '@/store/settingApi'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

const Settings = () => {
  const [formData, setFormData] = useState({
    logo: null as File | null,
    favicon: null as File | null,

    mobileNo: '',
    alternateMobileNo: '',

    mail: '',
    alternateEmail: '',

    address: '',
    addressIframe: '',
    workingHrs: '',

    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    whatsApp: '',

    homeIntroVideo: '',
    homeSlidingTitle: '',
    footerCopyrights: '',
  })

  const [createSettings] = useCreateSettingMutation()
  const [updateSettings] = useUpdateSettingMutation()
  const { data: settingsData, isLoading, refetch } = useGetSettingsQuery()

  // preview
  const [logoPreview, setLogoPreview] = useState('')
  const [faviconPreview, setFaviconPreview] = useState('')

  // @ts-ignore
  const settings = settingsData?.[0]

  // handlechange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // handlefile change
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }))

    if (file && e.target.name === 'logo') {
      setLogoPreview(URL.createObjectURL(file))
    }

    if (file && e.target.name === 'favicon') {
      setFaviconPreview(URL.createObjectURL(file))
    }
  }

  // fetch data
  useEffect(() => {
    if (!settings) return

    setFormData((prev) => ({
      ...prev,

      mobileNo: settings.mobileNo || '',
      alternateMobileNo: settings.alternateMobileNo || '',

      mail: settings.mail || '',
      alternateEmail: settings.alternateEmail || '',

      address: settings.address || '',
      addressIframe: settings.addressIframe || '',
      workingHrs: settings.workingHrs || '',

      facebook: settings.facebook || '',
      instagram: settings.instagram || '',
      linkedin: settings.linkedin || '',
      twitter: settings.twitter || '',
      youtube: settings.youtube || '',
      whatsApp: settings.whatsApp || '',

      homeIntroVideo: settings.homeIntroVideo || '',
      homeSlidingTitle: settings.homeSlidingTitle || '',
      footerCopyrights: settings.footerCopyrights || '',

      username: settings.username || '',

      logo: null,
      favicon: null,
    }))

    setLogoPreview(settings.logo || '')
    setFaviconPreview(settings.favicon || '')
  }, [settings])

  // onsubmit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          payload.append(key, value as any)
        }
      })

      if (settings?._id) {
        await updateSettings({
          id: settings._id,
          formData: payload,
        }).unwrap()

        toast.success('Settings updated successfully')
      } else {
        await createSettings(payload as any).unwrap()

        toast.success('Settings created successfully')
      }

      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
    }
  }

  return (
    <>
      <Row>
        <Col md={6}>
          <form onSubmit={onSubmit}>
            <Card>
              <CardHeader>
                <CardTitle as={'h4'}>general Settings</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Logo</label>
                      <input type="file" name="logo" className="form-control" onChange={handleFile} />

                      {logoPreview && <Image src={logoPreview} width={100} height={100} alt="logo" className="mt-2 rounded" />}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Favicon</label>
                      <input type="file" name="favicon" className="form-control" onChange={handleFile} />

                      {faviconPreview && <Image src={faviconPreview} alt="favicon" width={50} height={50} className="mt-2 rounded" />}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Mobile No.</label>
                      <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="form-control" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Alternate Mobile No.</label>
                      <input
                        type="text"
                        name="alternateMobileNo"
                        value={formData.alternateMobileNo}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Mail Address</label>
                      <input type="email" className="form-control" onChange={handleChange} value={formData.mail} name="mail" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Alternate Mail Address</label>
                      <input type="email" className="form-control" onChange={handleChange} value={formData.alternateEmail} name="alternateEmail" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label"> Address</label>
                      <textarea name="address" rows={4} value={formData.address} onChange={handleChange} className="form-control" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label"> Address Iframe</label>
                      <textarea name="addressIframe" rows={4} value={formData.addressIframe} onChange={handleChange} className="form-control" />{' '}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Working Hours</label>
                      <input type="text" className="form-control" onChange={handleChange} value={formData.workingHrs} name="workingHrs" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Facebook</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.facebook} name="facebook" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Instagram</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.instagram} name="instagram" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Linkedin</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.linkedin} name="linkedin" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Twitter</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.twitter} name="twitter" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Youtube</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.youtube} name="youtube" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Whats app</label>
                      <input type="url" className="form-control" onChange={handleChange} value={formData.whatsApp} name="whatsapp" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Home Intro Video</label>
                      <input type="text" className="form-control" onChange={handleChange} value={formData.homeIntroVideo} name="homeIntroVideo" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Home Sliding Title</label>
                      <input type="text" className="form-control" onChange={handleChange} value={formData.homeSlidingTitle} name="homeSlidingTitle" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label">Footer Copyrights</label>
                      <input type="text" className="form-control" onChange={handleChange} value={formData.footerCopyrights} name="footerCopyrights" />
                    </div>
                  </Col>
                </Row>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100 mt-1">
                  Submit
                </button>
              </CardBody>
            </Card>
          </form>
        </Col>
        {/* <Col md={6}>
          <form>
            <Card>
              <CardHeader>
                <CardTitle as={'h4'}>Change Password</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-1">
                  Submit
                </button>
              </CardBody>
            </Card>
          </form>
        </Col> */}
      </Row>
    </>
  )
}

export default Settings
