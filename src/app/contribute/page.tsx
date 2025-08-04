'use client';

import { useState } from 'react';

export default function Contribute() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reviewLink: '',
    comment: '',
    wantsCredit: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          name: '',
          email: '',
          reviewLink: '',
          comment: '',
          wantsCredit: false
        });
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray/10 via-cream to-orange/5">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-r-8 border-blue-gray">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-8 text-center">
            Share a review
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground mb-8">
            <p className="text-xl leading-relaxed text-center">
              Thanks so much for sending in a Google Review link. I promise to read it. Let me know if you want a credit when I use it, and feel free to add your comment or story about the review.
            </p>
          </div>
          
          <div className="bg-blue-gray/5 rounded-2xl p-8 border-2 border-blue-gray/20">
            {message && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {message}
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-green mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-blue-gray/20 rounded-lg focus:border-blue-gray focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-green mb-2">
                  Valid email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-blue-gray/20 rounded-lg focus:border-blue-gray focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="reviewLink" className="block text-sm font-medium text-dark-green mb-2">
                  The review&apos;s Share link from Google Maps
                </label>
                <input
                  type="url"
                  id="reviewLink"
                  name="reviewLink"
                  value={formData.reviewLink}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-blue-gray/20 rounded-lg focus:border-blue-gray focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-dark-green mb-2">
                  Your comment (optional; 250 words max.)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-blue-gray/20 rounded-lg focus:border-blue-gray focus:outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell us about this review..."
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="wantsCredit"
                  name="wantsCredit"
                  checked={formData.wantsCredit}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-5 h-5 text-blue-gray border-2 border-blue-gray/20 rounded focus:ring-blue-gray disabled:opacity-50"
                />
                <label htmlFor="wantsCredit" className="text-sm font-medium text-dark-green">
                  Yes, I want a credit
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-gray hover:bg-blue-gray/90 disabled:bg-blue-gray/50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button className="text-blue-gray hover:text-dark-green underline font-medium">
                Add another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}