import { Inter } from 'next/font/google';
import './globals.css';
import MobileNav from '../components/ui/MobileNav'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Microblog App',
  description: 'A Twitter-like microblogging platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 relative">
          {children}
          <MobileNav /> {/* Nav mobile globale */}
        </div>
      </body>
    </html>
  );
}
