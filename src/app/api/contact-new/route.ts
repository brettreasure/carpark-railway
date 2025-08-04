import { NextRequest, NextResponse } from 'next/server';
  import { supabaseAdmin } from '@/lib/supabase';

  export async function POST(request: NextRequest) {
    try {
      const { name, email, message } = await request.json();

      // Validate required fields
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      // Save contact message to database
      const { error: insertError } = await supabaseAdmin
        .from('contact_messages')
        .insert({
          name,
          email,
          message,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to save message' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Thank you for your message! We will get back to you
   soon.',
      });

    } catch (error) {
      console.error('API error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
