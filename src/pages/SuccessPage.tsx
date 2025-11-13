import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription, AlertIcons } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { CheckCircle } from 'lucide-react'

export function SuccessPage() {
  const handleContinue = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="success">
            <AlertIcons.success className="h-4 w-4" />
            <AlertDescription>
              Your payment has been processed successfully. Welcome to your yoga journey!
            </AlertDescription>
          </Alert>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              You should receive a confirmation email shortly. Your subscription is now active and you can start enjoying all the benefits.
            </p>
            
            <Button onClick={handleContinue} className="w-full">
              Continue to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}