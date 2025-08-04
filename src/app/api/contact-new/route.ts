import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  console.log('Contact API called!');
  try {
    const { name, email, message } = await request.json();
    console.log('Received data:', { name, email, message });

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

    console.log('About to insert into database...');
    
    // TEST: Insert into contributions table with timeout
    const insertPromise = supabaseAdmin
      .from('contributions')
      .insert({
        name,
        email,
        review_link: 'https://google.com/maps/test',
        comment: message,
        wants_credit: false,
      });

    // Add 8-second timeout (well under Vercel's 10s limit)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database timeout after 8 seconds')), 8000)
    );

    let insertError;
    try {
      const result = await Promise.race([insertPromise, timeoutPromise]);
      insertError = result.error;
    } catch (timeoutError) {
      console.error('Database operation timed out:', timeoutError);
      return NextResponse.json(
        { error: 'Database request timed out' },
        { status: 408 }
      );
    }

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    console.log('Database insert completed successfully!');

    return NextResponse.json({
      message: 'Thank you for your message! We\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}