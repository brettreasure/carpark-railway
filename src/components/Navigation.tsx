'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/', 
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      href: '/about', 
      label: 'About',
      icon: null
    },
    { 
      href: '/contribute', 
      label: 'Share',
      icon: null
    },
    { 
      href: '/downloads', 
      label: 'Review',
      icon: null
    },
    { 
      href: '/contact', 
      label: 'Contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center justify-between w-full max-w-md sm:space-x-4 sm:justify-center sm:max-w-none">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base ${
                pathname === item.href
                  ? 'bg-orange text-cream shadow-lg'
                  : 'text-foreground hover:bg-orange/10 hover:text-orange'
              }`}
            >
              {item.icon && (
                <span className="flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <span className="hidden sm:inline">{item.label}</span>
              {item.icon ? (
                <span className="sm:hidden sr-only">{item.label}</span>
              ) : (
                <span className="sm:hidden text-base font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;