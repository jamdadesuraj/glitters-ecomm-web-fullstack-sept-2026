'use client'

import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import EditBrandsDrawer from './EditMaterialDrawer'
import AddBrandsDrawer from './AddMaterialDrawer'
import AddMaterialDrawer from './AddMaterialDrawer'
import EditMaterialDrawer from './EditMaterialDrawer'

const MaterialManagement = () => {
  return (
    <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <CardTitle as="h4" className="mb-0">
              All Material List
            </CardTitle>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="position-relative">
                <input type="search" className="form-control form-control-sm ps-4" placeholder="Search colors..." autoComplete="off" />

                <IconifyIcon icon="solar:magnifer-linear" className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
              </div>

              {/* Add Color */}
              <AddMaterialDrawer />
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
                    <th className="text-nowrap">Material Name</th>
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

                    <td className="text-nowrap">Red</td>

                    <td>
                      <span className="badge bg-success-subtle text-success">Active</span>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {/* Edit */}
                        <EditMaterialDrawer />

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

export default MaterialManagement
