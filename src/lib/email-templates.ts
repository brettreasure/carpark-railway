export const createVerificationEmailTemplate = (name: string, verificationUrl: string) => ({
  subject: 'Verify your email to download the book',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            color: #2d5a27;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .subtitle {
            color: #666;
            font-size: 16px;
          }
          .content {
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            background-color: #2d5a27;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .button:hover {
            background-color: #1e3a1a;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
          }
          .link {
            color: #2d5a27;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Almost There!</h1>
            <p class="subtitle">Just one more step to get your book</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thanks for your interest in downloading the book! To complete your request and get access to the download, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email & Download</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p><a href="${verificationUrl}" class="link">${verificationUrl}</a></p>
            
            <p>This verification link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't request this download, you can safely ignore this email.</p>
          </div>
          
          <div class="footer">
            <p>Thanks for your interest!<br>
            If you have any questions, feel free to reach out.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
Hi ${name},

Thanks for your interest in downloading the book! To complete your request and get access to the download, please verify your email address by visiting this link:

${verificationUrl}

This verification link will expire in 24 hours for security reasons.

If you didn't request this download, you can safely ignore this email.

Thanks for your interest!
If you have any questions, feel free to reach out.
  `.trim()
});

export const createContactNotificationEmailTemplate = (name: string, email: string, message: string) => ({
  subject: `New contact form submission from ${name}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2d5a27;
          }
          .title {
            color: #2d5a27;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #2d5a27;
            padding: 20px;
            margin: 20px 0;
          }
          .label {
            font-weight: bold;
            color: #2d5a27;
            margin-bottom: 5px;
          }
          .value {
            margin-bottom: 15px;
          }
          .message-content {
            background-color: #fff;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 15px;
            white-space: pre-wrap;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">New Contact Form Submission</h1>
          </div>
          
          <div class="info-box">
            <div class="label">From:</div>
            <div class="value">${name}</div>
            
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
            
            <div class="label">Message:</div>
            <div class="message-content">${message}</div>
          </div>
          
          <div class="footer">
            <p>Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}

Submitted on ${new Date().toLocaleString()}
  `.trim()
});