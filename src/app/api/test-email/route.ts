import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    const resend = new Resend('re_6ApdTWuw_CmtZM88iB5vuhEehRjN5PNsP');
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'treasure@freebeer.com.au',
      subject: 'Direct test from Vercel',
      text: 'This is a direct test bypassing all other code'
    });

    return NextResponse.json({ 
      success: true, 
      result: result,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}