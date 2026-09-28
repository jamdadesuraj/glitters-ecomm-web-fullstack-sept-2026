'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useCreateSEOPagesMutation, useGetSEOPagesQuery, useUpdateSEOPagesMutation } from '@/store/seoPages'

const Seo = () => {
  const { data: seoPagesData, isLoading, refetch } = useGetSEOPagesQuery()
  const [createSeoPages, { isLoading: creating }] = useCreateSEOPagesMutation()
  const [updateSeoPages, { isLoading: updating }] = useUpdateSEOPagesMutation()

  // @ts-ignore
  const SeoPage = seoPagesData?.data || seoPagesData?.[0]

  const [formData, setFormData] = useState({
    aboutTitle: '',
    aboutSubTitle: '',

    servicesTitle: '',
    servicesSubTitle: '',

    servicesDetailsTitle: '',
    servicesDetailsSubTitle: '',

    productTitle: '',
    productSubTitle: '',

    productDetailsTitle: '',
    productDetailsSubTitle: '',

    newsTitle: '',
    newsSubTitle: '',

    newsDetailsTitle: '',
    newsDetailsSubTitle: '',

    careerTitle: '',
    careerSubTitle: '',

    contactTitle: '',
    contactSubTitle: '',

    awardTitle: '',
    awardSubTitle: '',

    ourPartnerTitle: '',
    ourPartnerSubTitle: '',

    mediaCoverageTitle: '',
    mediaCoverageSubTitle: '',

    galleryTitle: '',
    gallerySubTitle: '',

    faqTitle: '',
    faqSubTitle: '',

    privacyTitle: '',
    privacySubTitle: '',

    termsTitle: '',
    termsSubTitle: '',
  })

  const [files, setFiles] = useState<Record<string, File | null>>({
    aboutBgImage: null,
    servicesBgImage: null,
    servicesDetailsBgImage: null,
    productBgImage: null,
    productDetailsBgImage: null,
    newsBgImage: null,
    newsDetailsBgImage: null,
    careerBgImage: null,
    contactBgImage: null,
    awardBgImage: null,
    ourPartnerBgImage: null,
    mediaCoverageBgImage: null,
    galleryBgImage: null,
    faqBgImage: null,
    privacyBgImage: null,
    termsBgImage: null,
  })

  const [previews, setPreviews] = useState<Record<string, string>>({
    aboutBgImage: '',
    servicesBgImage: '',
    servicesDetailsBgImage: '',
    productBgImage: '',
    productDetailsBgImage: '',
    newsBgImage: '',
    newsDetailsBgImage: '',
    careerBgImage: '',
    contactBgImage: '',
    awardBgImage: '',
    ourPartnerBgImage: '',
    mediaCoverageBgImage: '',
    galleryBgImage: '',
    faqBgImage: '',
    privacyBgImage: '',
    termsBgImage: '',
  })

  useEffect(() => {
    if (SeoPage) {
      setFormData({
        aboutTitle: SeoPage.aboutTitle || '',
        aboutSubTitle: SeoPage.aboutSubTitle || '',

        servicesTitle: SeoPage.servicesTitle || '',
        servicesSubTitle: SeoPage.servicesSubTitle || '',

        servicesDetailsTitle: SeoPage.servicesDetailsTitle || '',
        servicesDetailsSubTitle: SeoPage.servicesDetailsSubTitle || '',

        productTitle: SeoPage.productTitle || '',
        productSubTitle: SeoPage.productSubTitle || '',

        productDetailsTitle: SeoPage.productDetailsTitle || '',
        productDetailsSubTitle: SeoPage.productDetailsSubTitle || '',

        newsTitle: SeoPage.newsTitle || '',
        newsSubTitle: SeoPage.newsSubTitle || '',

        newsDetailsTitle: SeoPage.newsDetailsTitle || '',
        newsDetailsSubTitle: SeoPage.newsDetailsSubTitle || '',

        careerTitle: SeoPage.careerTitle || '',
        careerSubTitle: SeoPage.careerSubTitle || '',

        contactTitle: SeoPage.contactTitle || '',
        contactSubTitle: SeoPage.contactSubTitle || '',

        awardTitle: SeoPage.awardTitle || '',
        awardSubTitle: SeoPage.awardSubTitle || '',

        ourPartnerTitle: SeoPage.ourPartnerTitle || '',
        ourPartnerSubTitle: SeoPage.ourPartnerSubTitle || '',

        mediaCoverageTitle: SeoPage.mediaCoverageTitle || '',
        mediaCoverageSubTitle: SeoPage.mediaCoverageSubTitle || '',

        galleryTitle: SeoPage.galleryTitle || '',
        gallerySubTitle: SeoPage.gallerySubTitle || '',

        faqTitle: SeoPage.faqTitle || '',
        faqSubTitle: SeoPage.faqSubTitle || '',

        privacyTitle: SeoPage.privacyTitle || '',
        privacySubTitle: SeoPage.privacySubTitle || '',

        termsTitle: SeoPage.termsTitle || '',
        termsSubTitle: SeoPage.termsSubTitle || '',
      })

      setPreviews({
        aboutBgImage: SeoPage.aboutBgImage || '',
        servicesBgImage: SeoPage.servicesBgImage || '',
        servicesDetailsBgImage: SeoPage.servicesDetailsBgImage || '',
        productBgImage: SeoPage.productBgImage || '',
        productDetailsBgImage: SeoPage.productDetailsBgImage || '',
        newsBgImage: SeoPage.newsBgImage || '',
        newsDetailsBgImage: SeoPage.newsDetailsBgImage || '',
        careerBgImage: SeoPage.careerBgImage || '',
        contactBgImage: SeoPage.contactBgImage || '',
        awardBgImage: SeoPage.awardBgImage || '',
        ourPartnerBgImage: SeoPage.ourPartnerBgImage || '',
        mediaCoverageBgImage: SeoPage.mediaCoverageBgImage || '',
        galleryBgImage: SeoPage.galleryBgImage || '',
        faqBgImage: SeoPage.faqBgImage || '',
        privacyBgImage: SeoPage.privacyBgImage || '',
        termsBgImage: SeoPage.termsBgImage || '',
      })
    }
  }, [SeoPage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const { name } = e.target

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }))

    setPreviews((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const form = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value)
      })

      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          form.append(key, file)
        }
      })

      if (SeoPage?._id) {
        await updateSeoPages({
          id: SeoPage._id,
          data: form,
        }).unwrap()

        toast.success('SEO Pages updated successfully')
      } else {
        await createSeoPages(form).unwrap()

        toast.success('SEO Pages created successfully')
      }

      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const seoSections = [
    {
      title: 'About Us',
      titleField: 'aboutTitle',
      subTitleField: 'aboutSubTitle',
      imageField: 'aboutBgImage',
    },
    {
      title: 'Services',
      titleField: 'servicesTitle',
      subTitleField: 'servicesSubTitle',
      imageField: 'servicesBgImage',
    },
    {
      title: 'Services Details',
      titleField: 'servicesDetailsTitle',
      subTitleField: 'servicesDetailsSubTitle',
      imageField: 'servicesDetailsBgImage',
    },
    {
      title: 'Product',
      titleField: 'productTitle',
      subTitleField: 'productSubTitle',
      imageField: 'productBgImage',
    },
    {
      title: 'Product Details',
      titleField: 'productDetailsTitle',
      subTitleField: 'productDetailsSubTitle',
      imageField: 'productDetailsBgImage',
    },
    {
      title: 'News & Media',
      titleField: 'newsTitle',
      subTitleField: 'newsSubTitle',
      imageField: 'newsBgImage',
    },
    {
      title: 'News & Media Details',
      titleField: 'newsDetailsTitle',
      subTitleField: 'newsDetailsSubTitle',
      imageField: 'newsDetailsBgImage',
    },
    {
      title: 'Careers',
      titleField: 'careerTitle',
      subTitleField: 'careerSubTitle',
      imageField: 'careerBgImage',
    },
    {
      title: 'Contact Us',
      titleField: 'contactTitle',
      subTitleField: 'contactSubTitle',
      imageField: 'contactBgImage',
    },
    {
      title: 'Awards',
      titleField: 'awardTitle',
      subTitleField: 'awardSubTitle',
      imageField: 'awardBgImage',
    },
    {
      title: 'Our Partners',
      titleField: 'ourPartnerTitle',
      subTitleField: 'ourPartnerSubTitle',
      imageField: 'ourPartnerBgImage',
    },
    {
      title: 'Media Coverage',
      titleField: 'mediaCoverageTitle',
      subTitleField: 'mediaCoverageSubTitle',
      imageField: 'mediaCoverageBgImage',
    },
    {
      title: 'Gallery',
      titleField: 'galleryTitle',
      subTitleField: 'gallerySubTitle',
      imageField: 'galleryBgImage',
    },
    {
      title: 'FAQs',
      titleField: 'faqTitle',
      subTitleField: 'faqSubTitle',
      imageField: 'faqBgImage',
    },
    {
      title: 'Privacy Policy',
      titleField: 'privacyTitle',
      subTitleField: 'privacySubTitle',
      imageField: 'privacyBgImage',
    },
    {
      title: 'Terms & Conditions',
      titleField: 'termsTitle',
      subTitleField: 'termsSubTitle',
      imageField: 'termsBgImage',
    },
  ]

  return (
    <form onSubmit={handleSubmit}>
      {seoSections.map((section) => (
        <Card key={section.imageField} className="mb-3">
          <CardHeader>
            <CardTitle as="h4">{section.title}</CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col md={4}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name={section.titleField}
                    value={formData[section.titleField as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              </Col>

              <Col md={4}>
                <div className="mb-3">
                  <label className="form-label">Sub Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name={section.subTitleField}
                    value={formData[section.subTitleField as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              </Col>

              <Col md={4}>
                <label className="form-label">Background Image</label>

                <input type="file" className="form-control" name={section.imageField} accept="image/*" onChange={handleFileChange} />

                {previews[section.imageField as keyof typeof previews] && (
                  <Image
                    src={previews[section.imageField as keyof typeof previews]}
                    alt={section.title}
                    width={250}
                    height={100}
                    className="mt-2 rounded border"
                    unoptimized
                  />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}

      <button type="submit" className="btn btn-primary w-100" disabled={creating || updating}>
        {creating || updating ? 'Saving...' : 'Save SEO Pages'}
      </button>
    </form>
  )
}

export default Seo
