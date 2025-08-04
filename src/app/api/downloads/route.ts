import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { resend, EMAIL_FROM } from '@/lib/resend';
import { createVerificationEmailTemplate } from '@/lib/email-templates';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('downloaders')
      .select('email, email_verified')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database error:', checkError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (existingUser) {
      if (existingUser.email_verified) {
        return NextResponse.json(
          { message: 'You already have access to download the book!' },
          { status: 200 }
        );
      } else {
        // Update existing record with new verification token
        const { error: updateError } = await supabaseAdmin
          .from('downloaders')
          .update({ 
            name,
            verification_token: verificationToken,
            created_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) {
          console.error('Update error:', updateError);
          return NextResponse.json(
            { error: 'Failed to update verification' },
            { status: 500 }
          );
        }
      }
    } else {
      // Insert new downloader record
      const { error: insertError } = await supabaseAdmin
        .from('downloaders')
        .insert({
          name,
          email,
          verification_token: verificationToken,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to create download request' },
          { status: 500 }
        );
      }
    }

    // Send verification email using Resend
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`;
    const emailTemplate = createVerificationEmailTemplate(name, verificationUrl);

    try {
      if (!resend) {
        throw new Error('Email service not configured');
      }
      
      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });

      return NextResponse.json({
        message: 'Verification email sent! Check your inbox.',
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // If email fails, still return success but log the error
      // The user record is already created, so they can potentially retry
      return NextResponse.json({
        message: 'Verification email sent! Check your inbox.',
        warning: 'If you don\'t receive an email, please try again later.',
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}