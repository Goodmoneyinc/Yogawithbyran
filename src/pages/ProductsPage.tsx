import React from 'react'
import { Header } from '../components/layout/Header'
import { ProductList } from '../components/products/ProductList'

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  )
}