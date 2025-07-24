'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Accueil</h1>
        <p className="text-gray-600">Bienvenue, {user.email}!</p>
      </header>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          Interface des posts à venir... 📝
        </p>
      </div>
    </div>
  );
}
