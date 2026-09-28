'use client'

import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import Image from 'next/image'
import AddAppBannerDrawer from './AddAppBannerDrawer'
import EditAppBannerDrawer from './EditAppBannerDrawer'

const AppBanners = () => {
  return (
    <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              All App Banners List
            </CardTitle>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Add Color */}
              <AddAppBannerDrawer />
            </div>
          </div>
          <CardBody>
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="bg-light-subtle">
                  <tr>
                    {/* Checkbox */}
                    <th
                      className="text-center"
                      style={{
                        width: '45px',
                        minWidth: '45px',
                      }}>
                      <input type="checkbox" className="form-check-input" />
                    </th>

                    <th className="text-nowrap">Sr No.</th>
                    <th className="text-nowrap">App Banner</th>
                    <th className="text-nowrap">Status</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    {/* Row Checkbox */}
                    <td className="text-center">
                      <input type="checkbox" className="form-check-input" />
                    </td>

                    <td>1</td>

                    <td className="text-nowrap">
                      <Image src="/assets/images/brands/brand-1.png" alt="" width={100} height={100} />
                    </td>

                    <td>
                      <span className="badge bg-success-subtle text-success">Active</span>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {/* Edit */}
                        <EditAppBannerDrawer />

                        {/* Delete */}
                        <button type="button" className="btn btn-soft-danger btn-sm" title="Delete">
                          <IconifyIcon icon="solar:trash-bin-trash-bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default AppBanners
