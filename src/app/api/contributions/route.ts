import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email, reviewLink, comment, wantsCredit } = await request.json();

    // Validate required fields
    if (!name || !email || !reviewLink) {
      return NextResponse.json(
        { error: 'Name, email, and review link are required' },
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

    // Validate Google Maps review link
    const googleMapsRegex = /^https:\/\/(www\.)?google\.(com|[a-z]{2,3}(\.[a-z]{2})?)\/.*(maps|place).*reviews?/i;
    if (!googleMapsRegex.test(reviewLink)) {
      return NextResponse.json(
        { error: 'Please provide a valid Google Maps review link' },
        { status: 400 }
      );
    }

    // Validate comment length (250 words max)
    if (comment) {
      const wordCount = comment.trim().split(/\s+/).length;
      if (wordCount > 250) {
        return NextResponse.json(
          { error: 'Comment must be 250 words or fewer' },
          { status: 400 }
        );
      }
    }

    // Insert contribution record
    const { error: insertError } = await supabaseAdmin
      .from('contributions')
      .insert({
        name,
        email,
        review_link: reviewLink,
        comment: comment || null,
        wants_credit: wantsCredit || false,
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Thank you for sharing the review! We appreciate your contribution.',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}