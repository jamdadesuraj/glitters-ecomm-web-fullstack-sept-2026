'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardTitle, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import AddBlogDrawer from './AddBlogDrawer'
import EditBlogDrawer from './EditBlogDrawer'
import Image from 'next/image'
import { useDeleteBlogMutation, useGetBlogQuery } from '@/store/blogApi'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const Blogs = () => {
  // search
  const [search, setSearch] = React.useState('')

  // pagniation
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 10

  const { data: blogsData = [], isLoading, isError } = useGetBlogQuery()
  const [deleteBlog] = useDeleteBlogMutation()

  // search
  const hendleSearch = blogsData.filter((item: any) => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  })

  // pagniation

  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const currentItems = hendleSearch.slice(startIndex, endIndex)

  const totalPages = Math.ceil(hendleSearch.length / itemPerPage)

  // SINGLE DELETE
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (!result.isConfirmed) return

    try {
      await deleteBlog(id).unwrap()

      toast.success('Blog deleted successfully')
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
            <CardTitle as="h4">All Blog List</CardTitle>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="position-relative ms-2 d-none d-md-block">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control form-control-sm ps-4"
                  placeholder="Search..."
                  autoComplete="off"
                />
                <IconifyIcon icon="solar:magnifer-linear" className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
              </div>
              {/* Add Button */}
              <AddBlogDrawer />
            </div>
          </div>

          <CardBody>
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Sr No.</th>
                    <th>Title</th>
                    <th>Short Desc</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems?.length ? (
                    currentItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.shortDesc.slice(0, 50)}</td>
                        <td>
                          <Image src={item.image} alt={item.title} width={50} height={50} className="img-fluid" />
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <EditBlogDrawer item={item} />
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
          <CardFooter className="border-top">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
                    Previous
                  </button>
                </li>
                {/* PAGE */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                      <button type="button" className="page-link" onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                      </button>
                    </li>
                  )
                })}

                <li className="page-item">
                  <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}

export default Blogs
