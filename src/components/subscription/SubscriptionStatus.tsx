import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { getProductByPriceId } from '../../stripe-config'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription, AlertIcons } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Loader2 } from 'lucide-react'

interface SubscriptionData {
  subscription_status: string
  price_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  cancel_at_period_end: boolean
  payment_method_brand: string | null
  payment_method_last4: string | null
}

export function SubscriptionStatus() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle()

        if (error) {
          setError('Failed to fetch subscription data')
          console.error('Subscription fetch error:', error)
        } else {
          setSubscription(data)
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Subscription fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading subscription status...
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertIcons.destructive className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!subscription || !subscription.price_id) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No active subscription found.</p>
        </CardContent>
      </Card>
    )
  }

  const product = getProductByPriceId(subscription.price_id)
  const statusColor = subscription.subscription_status === 'active' ? 'success' : 
                     subscription.subscription_status === 'canceled' ? 'destructive' : 'warning'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Subscription Status
          <Badge variant={statusColor === 'success' ? 'default' : statusColor === 'destructive' ? 'destructive' : 'secondary'}>
            {subscription.subscription_status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {product && (
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold">${product.price}/month</p>
          </div>
        )}

        {subscription.current_period_end && (
          <div>
            <p className="text-sm text-gray-600">
              {subscription.cancel_at_period_end ? 'Expires on:' : 'Next billing date:'}
            </p>
            <p className="font-medium">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </p>
          </div>
        )}

        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div>
            <p className="text-sm text-gray-600">Payment method:</p>
            <p className="font-medium">
              {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
            </p>
          </div>
        )}

        {subscription.cancel_at_period_end && (
          <Alert variant="warning">
            <AlertIcons.warning className="h-4 w-4" />
            <AlertDescription>
              Your subscription will not renew and will end on{' '}
              {subscription.current_period_end && 
                new Date(subscription.current_period_end * 1000).toLocaleDateString()
              }.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}