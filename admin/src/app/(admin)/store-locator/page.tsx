import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'
import StoreLocator from './components/StoreLocator'

export const metadata: Metadata = { title: 'Store Locator' }

const StoreLocatorPage = () => {
  return (
    <>
      <PageTItle title="Store Locator" />
      <StoreLocator />
    </>
  )
}

export default StoreLocatorPage
