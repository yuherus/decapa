"use client";

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton({ variant = "ghost" }) {
  const { logoutUser, isLoading } = useAuth();
  
  const handleLogout = async () => {
    await logoutUser();
  };
  
  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      <span>Đăng xuất</span>
    </Button>
  );
} 
