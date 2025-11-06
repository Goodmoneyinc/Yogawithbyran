
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
  // For demo purposes, redirect to Stripe's test checkout page
  // In production, this would call your backend API
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_id: priceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode
    }),
  });

  if (response.ok) {
    const { url } = await response.json();
    if (url) {
      window.location.href = url;
      return;
    }
  }

  // Fallback: redirect to a demo Stripe checkout page
  // Replace with your actual Stripe checkout URLs
  const checkoutUrls = {
    'price_1S7khi9wDfAiVIZSc1j1C58H': 'https://buy.stripe.com/test_basic_yogi',
    'price_1S7kim9wDfAiVIZSQYhypnfc': 'https://buy.stripe.com/test_yogi_pre', 
    'price_1S7kjI9wDfAiVIZSGdd7hPVG': 'https://buy.stripe.com/test_yogi_adv'
  };
  
  const checkoutUrl = checkoutUrls[priceId as keyof typeof checkoutUrls];
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    throw new Error('Checkout URL not found for this product');
  }
}