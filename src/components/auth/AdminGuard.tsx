import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ADMIN_EMAIL = 'yogawithbw@proton.me';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-sage-600"></div>
        <span className="ml-3 text-stone-600">Verifying Admin Status...</span>
      </div>
    );
  }

  console.log("Current User Email:", user?.email);
  console.log("Is Admin Match:", user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  const isAuthorized = user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorized) {
    console.warn("Unauthorized access to /admin blocked. Redirecting to home.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
