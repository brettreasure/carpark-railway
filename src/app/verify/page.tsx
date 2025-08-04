'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch {
        setStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-gray/5 to-orange/10 flex items-center justify-center">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-l-8 border-orange text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-8">
            Email Verification
          </h1>
          
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto"></div>
              <p className="text-lg text-foreground">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-xl text-green-600 font-semibold">{message}</p>
              <div className="space-y-4">
                <a
                  href="/book.pdf"
                  download
                  className="inline-block bg-orange hover:bg-orange/90 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Download the Book
                </a>
                <p className="text-sm text-blue-gray">
                  The download should start automatically. If not, click the button above.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="text-6xl mb-4">❌</div>
              <p className="text-xl text-red-600 font-semibold">{message}</p>
              <Link
                href="/downloads"
                className="inline-block bg-blue-gray hover:bg-blue-gray/90 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Again
              </Link>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-orange/20">
            <Link
              href="/"
              className="text-blue-gray hover:text-orange underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}