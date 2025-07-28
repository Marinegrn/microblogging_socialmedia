'use client';

import { Home, Search, Bell, User } from 'lucide-react';

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 lg:hidden z-50">
      <div className="flex justify-around py-3">
        <button className="flex flex-col items-center space-y-1 text-blue-400">
          <Home size={24} />
          <span className="text-xs">Accueil</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400">
          <Search size={24} />
          <span className="text-xs">Recherche</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400">
          <Bell size={24} />
          <span className="text-xs">Notifications</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400">
          <User size={24} />
          <span className="text-xs">Profil</span>
        </button>
      </div>
    </div>
  );
}
