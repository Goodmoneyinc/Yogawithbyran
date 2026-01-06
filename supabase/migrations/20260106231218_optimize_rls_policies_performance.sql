/*
  # Optimize RLS Policies for Performance

  ## Changes Made
  
  1. **RLS Policy Optimization**
     - Updated `stripe_customers` policy "Users can view their own customer data"
     - Updated `stripe_subscriptions` policy "Users can view their own subscription data"
     - Updated `stripe_orders` policy "Users can view their own order data"
  
  ## Performance Improvement
  
  Replaced `auth.uid()` with `(select auth.uid())` in all RLS policies to prevent
  re-evaluation of the auth function for each row. This significantly improves
  query performance at scale.
  
  ## Technical Details
  
  - The `(select auth.uid())` pattern evaluates the function once and caches the result
  - Without the subquery, `auth.uid()` is called for every single row being checked
  - This optimization is especially important for tables with many rows
  
  ## Security
  
  - All policies maintain the same security guarantees
  - Users can still only access their own data
  - RLS remains enabled on all tables
  
  ## Views Updated
  
  - Recreated `stripe_user_subscriptions` view with optimized auth function
  - Recreated `stripe_user_orders` view with optimized auth function
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

-- Recreate optimized policies
CREATE POLICY "Users can view their own customer data"
    ON stripe_customers
    FOR SELECT
    TO authenticated
    USING (user_id = (select auth.uid()) AND deleted_at IS NULL);

CREATE POLICY "Users can view their own subscription data"
    ON stripe_subscriptions
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

CREATE POLICY "Users can view their own order data"
    ON stripe_orders
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

-- Drop and recreate views with optimized auth function
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

CREATE VIEW stripe_user_subscriptions WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    s.subscription_id,
    s.status as subscription_status,
    s.price_id,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.payment_method_brand,
    s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = (select auth.uid())
AND c.deleted_at IS NULL
AND s.deleted_at IS NULL;

GRANT SELECT ON stripe_user_subscriptions TO authenticated;

CREATE VIEW stripe_user_orders WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    o.id as order_id,
    o.checkout_session_id,
    o.payment_intent_id,
    o.amount_subtotal,
    o.amount_total,
    o.currency,
    o.payment_status,
    o.status as order_status,
    o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = (select auth.uid())
AND c.deleted_at IS NULL
AND o.deleted_at IS NULL;

GRANT SELECT ON stripe_user_orders TO authenticated;
