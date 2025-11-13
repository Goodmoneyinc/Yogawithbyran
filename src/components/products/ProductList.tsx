import React from 'react'
import { products } from '../../stripe-config'
import { ProductCard } from './ProductCard'

export function ProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Yoga Plan</h1>
        <p className="text-xl text-gray-600">
          Find the perfect subscription plan for your yoga journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}