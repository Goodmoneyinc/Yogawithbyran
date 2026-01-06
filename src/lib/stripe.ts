import { supabase } from './supabase';

interface CheckoutSessionParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode: 'payment' | 'subscription';
}

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  mode
}: CheckoutSessionParams): Promise<void> {
  try {
    // Get the current session to check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // If no user session, redirect to signup first
      alert('Please sign up or sign in to continue with your purchase.');
      return;
    }

    // Call the Supabase edge function to create checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: {
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: mode
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }

    if (data?.url) {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Fallback: Show error message
    alert('Unable to process checkout at this time. Please try again later or contact support.');
    throw error;
  }
}