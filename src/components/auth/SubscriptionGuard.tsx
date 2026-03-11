import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';

export function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subLoading } = useSubscription();

  if (user?.email === 'yogawithbw@proton.me') return <>{children}</>;

  if (authLoading || subLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 to-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!hasActiveSubscription) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
