'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [fakeUser, setFakeUser] = useState<{ email: string } | null>(null); // fakeUser

  useEffect(() => {
    // ✅ Garde ta logique d'origine commentée
    // if (!loading && !user) {
    //   router.push('/login');
    // }

    // TEMP : bypass l'auth pour preview design
    if (!loading && !user) {
      setFakeUser({ email: 'invite@example.com' });
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="h-16 w-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // fakeUser
  const currentUser = user ?? fakeUser;
  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto mt-10 sm:mt-16 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-8 rounded-t-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">Welcome back !</h1>
          <p className="text-lg sm:text-xl font-light">
            Nous sommes ravis de te revoir, <span className="font-medium">{currentUser.email}.</span>
          </p>
        </header>

        <main className="px-6 sm:px-10 py-8">
          <p className="text-gray-700 text-lg sm:text-xl">
            Prépare-toi à découvrir ton fil d’actualité
          </p>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
              Découvrir les posts
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
