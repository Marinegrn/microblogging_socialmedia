'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // TEST sans connexion pour vérifier le style de la page d'accueil
    // if (!loading && !user) {
    //   router.push('/login');
    // }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="h-16 w-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-3xl overflow-hidden">
        <header className="bg-indigo-600 text-white p-6 rounded-t-3xl">
          <h1 className="text-4xl font-extrabold mb-1">Accueil</h1>
          <p className="text-lg">Salut<span className="font-semibold">{user.email}</span></p>
        </header>

        <main className="p-8">
          <div className="text-gray-700 text-lg">
            <p>Bon retour parmi nous !</p>
            <p className="mt-2">Bientôt ici, ton fil d&apos;actualité</p>
          </div>

          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow hover:bg-indigo-700 transition">
              Découvrir les posts
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}