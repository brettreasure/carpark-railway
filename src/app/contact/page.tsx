'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await fetch('/api/contact-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({ name: '', email: '', message: '' });
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-orange/5 to-blue-gray/10">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-b-8 border-dark-green">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-8 text-center">
            Get in Touch
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground mb-8 space-y-4">
            <p className="text-lg">
              Yes, I do entertaining after-dinner speeches.
            </p>
            
            <p className="text-lg">
              Yes, I perform for the media.
            </p>
            
            <p className="text-lg">
              Yes, you can plonk a review here if you&apos;re too lazy to do it on Amazon.
            </p>
            
            <p className="text-lg font-semibold text-orange">
              Contact me if you can help me fund-raise for Myanmar refugees.
            </p>
          </div>
          
          <div className="bg-dark-green/5 rounded-2xl p-8 border-2 border-dark-green/20">
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {success}
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
                  className="w-full px-4 py-3 border-2 border-dark-green/20 rounded-lg focus:border-dark-green focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-green mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-dark-green/20 rounded-lg focus:border-dark-green focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-green mb-2">
                  Comment
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-dark-green/20 rounded-lg focus:border-dark-green focus:outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-dark-green hover:bg-dark-green/90 disabled:bg-dark-green/50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}