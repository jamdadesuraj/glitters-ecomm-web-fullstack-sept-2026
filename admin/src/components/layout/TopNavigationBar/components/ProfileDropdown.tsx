'use client'

import avatar1 from '@/assets/images/users/avatar-1.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useGetSettingsQuery } from '@/store/settingApi'
import Image from 'next/image'
import Link from 'next/link'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

const ProfileDropdown = () => {
  const { data: settingsResponse } = useGetSettingsQuery()

  // Safely get settings data
  // @ts-ignore
  const settingsData = Array.isArray(settingsResponse?.data) ? settingsResponse.data : settingsResponse?.data ? [settingsResponse.data] : []

  const favicon = typeof settingsData[0]?.favicon === 'string' ? settingsData[0].favicon : null

  const profileImage = favicon || avatar1

  return (
    <Dropdown className="topbar-item">
      <DropdownToggle
        as="a"
        href="#"
        className="topbar-button content-none"
        id="page-header-user-dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="d-flex align-items-center">
          <Image
            className="rounded-circle"
            width={32}
            height={32}
            src={profileImage}
            alt="Profile"
            style={{
              objectFit: 'cover',
            }}
          />
        </span>
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-end">
        <DropdownHeader as="h6" className="dropdown-header">
          Welcome To Ecomm Admin!
        </DropdownHeader>

        <div className="dropdown-divider my-1" />

        <DropdownItem as={Link} className="text-danger" href="/auth/sign-in">
          <IconifyIcon icon="bx:log-out" className="fs-18 align-middle me-1" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileDropdown
