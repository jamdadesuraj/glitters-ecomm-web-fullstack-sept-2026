'use client'

import React, { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import { Col, Row } from 'react-bootstrap'

const EditBrandsDrawer = ({ onAdd }: any) => {
  const [open, setOpen] = useState(false)

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
          width: '520px',
          maxWidth: '100%',
          zIndex: 1050,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}>
        {/* HEADER */}
        <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Edit Brands</h5>

          <button
            type="button"
            className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
            onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <form>
          <div className="p-3">
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Brand Name *</label>
                  <input type="text" className="form-control" />
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label d-block">Status</label>

                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="statusToggle" defaultChecked />

                    <label className="form-check-label" htmlFor="statusToggle">
                      Active
                    </label>
                  </div>
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

export default EditBrandsDrawer
