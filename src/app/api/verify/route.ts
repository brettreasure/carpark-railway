import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find user with this verification token
    const { data: user, error: findError } = await supabaseAdmin
      .from('downloaders')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (findError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    if (user.email_verified) {
      return NextResponse.json({
        message: 'Email already verified! You can download the book.',
      });
    }

    // Update user as verified
    const { error: updateError } = await supabaseAdmin
      .from('downloaders')
      .update({
        email_verified: true,
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear the token
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Email verified successfully! You can now download the book.',
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}