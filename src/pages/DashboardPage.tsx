import React from 'react'
import { Header } from '../components/layout/Header'
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function DashboardPage() {
  const handleViewProducts = () => {
    window.location.href = '/products'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">
              Manage your subscription and explore your yoga journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SubscriptionStatus />
            
            <Card>
              <CardHeader>
                <CardTitle>Explore Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Discover our different yoga subscription plans and find the one that's perfect for you.
                </p>
                <Button onClick={handleViewProducts} className="w-full">
                  View All Plans
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}