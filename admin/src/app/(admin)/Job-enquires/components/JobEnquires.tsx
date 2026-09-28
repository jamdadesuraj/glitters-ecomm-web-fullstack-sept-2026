'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useCreateCounterMutation, useGetCounterQuery, useUpdateCounterMutation } from '@/store/counterApi'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

const JobEnquires = () => {
  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            {/* ================= HEADER ================= */}
            <div className="d-flex card-header justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <CardTitle as="h4" className="mb-0">
                  Job Enquires
                </CardTitle>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* Selected Count */}

                {/* Search */}
                <div className="position-relative">
                  <input type="search" className="form-control form-control-sm ps-4" placeholder="Search..." autoComplete="off" />

                  <IconifyIcon icon="solar:magnifer-linear" className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                </div>
              </div>
            </div>

            {/* ================= TABLE ================= */}
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

                      {/* Basic Details */}
                      <th className="text-nowrap">Sr No.</th>
                      <th className="text-nowrap">Job Title</th>
                      <th className="text-nowrap">Full Name</th>
                      <th className="text-nowrap">Email</th>
                      <th className="text-nowrap">Phone</th>
                      <th className="text-nowrap">Resume/CV</th>
                      <th className="text-nowrap">Message</th>
                      <th className="text-nowrap">Date</th>

                      {/* Action */}
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>

                  <tbody></tbody>
                </table>
              </div>
            </CardBody>

            {/* ================= PAGINATION ================= */}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default JobEnquires
