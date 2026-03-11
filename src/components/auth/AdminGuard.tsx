import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ADMIN_EMAIL = 'yogawithbw@proton.me';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Verifying credentials...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    console.error("Unauthorized access attempt blocked.");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
