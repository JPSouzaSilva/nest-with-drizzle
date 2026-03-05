export interface TwoFactorCodeTemplateParams {
  name: string;
  code: string;
  expiresInMinutes: number;
}

export function twoFactorCodeTemplate({
  name,
  code,
  expiresInMinutes
}: TwoFactorCodeTemplateParams): string {
  const codeDigits = code.split("").join(" ");
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your verification code</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
      background-color: #f4f4f5;
      color: #18181b;
    }
    .wrapper {
      width: 100%;
      padding: 40px 16px;
    }
    .card {
      max-width: 520px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #18181b;
      padding: 32px 40px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .body {
      padding: 40px;
    }
    .greeting {
      font-size: 16px;
      color: #3f3f46;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .description {
      font-size: 14px;
      color: #71717a;
      margin-bottom: 32px;
      line-height: 1.6;
    }
    .code-label {
      font-size: 12px;
      font-weight: 600;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .code-box {
      background-color: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      margin-bottom: 24px;
    }
    .code {
      font-size: 40px;
      font-weight: 800;
      letter-spacing: 12px;
      color: #18181b;
      font-family: "Courier New", Courier, monospace;
    }
    .expiry-badge {
      display: inline-block;
      background-color: #fef9c3;
      border: 1px solid #fde047;
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 13px;
      color: #713f12;
      margin-bottom: 32px;
    }
    .divider {
      border: none;
      border-top: 1px solid #e4e4e7;
      margin-bottom: 24px;
    }
    .security-note {
      font-size: 13px;
      color: #a1a1aa;
      line-height: 1.6;
    }
    .security-note strong {
      color: #71717a;
    }
    .footer {
      background-color: #fafafa;
      border-top: 1px solid #f0f0f0;
      padding: 24px 40px;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      color: #a1a1aa;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <div class="header">
        <h1>Verification Code</h1>
      </div>

      <div class="body">
        <p class="greeting">Hi, <strong>${name}</strong>!</p>
        <p class="description">
          We received a login request for your account. Use the code below
          to complete your sign-in. Do not share this code with anyone.
        </p>

        <p class="code-label">Your one-time code</p>
        <div class="code-box">
          <span class="code">${codeDigits}</span>
        </div>

        <div class="expiry-badge">
          &#9200; This code expires in <strong>${expiresInMinutes} minutes</strong>
        </div>

        <hr class="divider" />

        <p class="security-note">
          <strong>Didn&rsquo;t request this?</strong><br />
          If you did not attempt to sign in, you can safely ignore this email.
          Your account remains secure and no action is required.
        </p>
      </div>

      <div class="footer">
        <p>&copy; ${year} All rights reserved.<br />
        This is an automated message &mdash; please do not reply.</p>
      </div>

    </div>
  </div>
</body>
</html>`;
}
