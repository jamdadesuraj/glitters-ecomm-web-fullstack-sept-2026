'use client'

import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import AddHomeDrawer from './AddHomeDrawer'
import EditHomeBannerDrawer from './EditHomeBannerDrawer'
import { useDeleteHomeBannerMutation, useGetHomeBannerQuery } from '@/store/homeBanner'
import Image from 'next/image'

const HomeBanner = () => {
  const { data: homeBanner = [], isLoading, isError } = useGetHomeBannerQuery()
  const [deleteHomeBanner] = useDeleteHomeBannerMutation()

  // SINGLE DELETE
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Home Banner?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (!result.isConfirmed) return

    try {
      await deleteHomeBanner(id).unwrap()

      toast.success('Home Banner deleted successfully')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <CardTitle as="h4">All Home Banner List</CardTitle>

            <AddHomeDrawer />
          </div>

          <CardBody>
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Sr No.</th>
                    {/* <th>Title</th>
                    <th>Sub-Title</th>
                    <th>Short Desc</th> */}
                    <th>Banner / Video</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {homeBanner?.length ? (
                    homeBanner.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        {/* <td>{item.title}</td>
                        <td>{item.subTitle}</td>
                        <td>{item.shortDesc}</td> */}
                        <td>
                          {item.bgVideo ? (
                            <video width={120} height={70} muted controls className="rounded">
                              <source src={item.bgVideo} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : item.banner ? (
                            <Image src={item.banner} alt="Background" width={120} height={70} className="rounded object-fit-contain" />
                          ) : (
                            <span>No Media</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <EditHomeBannerDrawer item={item} />
                            <button type="button" className="btn btn-soft-danger btn-sm" onClick={() => handleDelete(item._id)}>
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default HomeBanner
