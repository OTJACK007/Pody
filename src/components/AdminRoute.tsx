import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { Card, CardBody, Spinner } from '@nextui-org/react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isLoading } = useAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-danger-50">
          <CardBody className="text-center py-8">
            <h2 className="text-2xl font-bold text-danger mb-2">Access Denied</h2>
            <p className="text-gray-600">
              You don't have permission to access this page. Please contact an administrator if you believe this is an error.
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}