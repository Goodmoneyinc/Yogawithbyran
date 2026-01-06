import React, { useState } from 'react'
import { Product } from '../../stripe-config'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Alert, AlertDescription, AlertIcons } from '../ui/alert'
import { Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { session } = useAuth()

  const handleCheckout = async () => {
    if (!session) {
      setError('Please sign in to continue')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/products`,
          mode: product.mode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold">
          ${product.price}
          {product.mode === 'subscription' && <span className="text-lg font-normal">/month</span>}
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertIcons.destructive className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCheckout} 
          disabled={loading} 
          className="w-full"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product.mode === 'subscription' ? 'Subscribe Now' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  )
}