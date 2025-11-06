import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({
      data: { user: null, session: null },
      error: { message: 'Supabase is not configured. Authentication is temporarily unavailable.' }
    }),
    signUp: () => Promise.resolve({
      data: { user: null, session: null },
      error: { message: 'Supabase is not configured. Registration is temporarily unavailable.' }
    }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({
      data: { user: null },
      error: { message: 'Supabase not configured' }
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
      maybeSingle: () => Promise.resolve({ data: null, error: null })
    }),
    insert: () => Promise.resolve({
      data: null,
      error: { message: 'Supabase not configured' }
    }),
    upsert: () => Promise.resolve({
      data: null,
      error: { message: 'Supabase not configured' }
    })
  })
};

let supabase;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
  console.warn('⚠️ Supabase is not properly configured. Using mock client for development.');
  console.warn('To enable authentication, configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');

  // @ts-ignore - Mock client for development
  supabase = mockClient;
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    // @ts-ignore
    supabase = mockClient;
  }
}

export { supabase };

export interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export async function getUserSubscription(): Promise<UserSubscription | null> {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching user subscription:', error);
    return null;
  }

  return data;
}