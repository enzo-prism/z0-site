const configuredEmail = (
  process.env.NEXT_PUBLIC_Z0_CONTACT_EMAIL ?? "lorenzosison@gmail.com"
).trim();
const looksLikeEmail =
  configuredEmail !== undefined &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail);

/**
 * Public, non-secret contact information shown on Z0's legal and support pages.
 * NEXT_PUBLIC_Z0_CONTACT_EMAIL may override the public contact address used for
 * the Entra app registration and Minecraft AppID review.
 */
export const publicContact = {
  email: looksLikeEmail ? configuredEmail : null,
  isConfigured: looksLikeEmail,
  placeholder: "PUBLIC CONTACT EMAIL REQUIRED BEFORE SUBMISSION",
} as const;
