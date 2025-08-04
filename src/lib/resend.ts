import { Resend } from 'resend';

// Temporary hardcoded values for debugging
const resendClient = new Resend('re_6ApdTWuw_CmtZM88iB5vuhEehRjN5PNsP');

// Wrapper with timeout for Resend calls
export const resend = {
  emails: {
    send: async (emailData: any) => {
      const emailPromise = resendClient.emails.send(emailData);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email timeout after 8 seconds')), 8000)
      );
      return Promise.race([emailPromise, timeoutPromise]);
    }
  }
};

export const EMAIL_FROM = 'onboarding@resend.dev';
export const EMAIL_REPLY_TO = 'treasure@freebeer.com.au';