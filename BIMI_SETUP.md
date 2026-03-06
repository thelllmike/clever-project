# BIMI Setup Checklist for cleverproject.lk

## Logo

- **File path:** `public/bimi/logo.svg`
- **Public URL:** `https://cleverproject.lk/bimi/logo.svg`
- **Format:** SVG Tiny PS 1.2, square (426x426), white background, no scripts/animations/external refs

## DNS Record

Add this TXT record to your domain DNS:

```
Host:  default._bimi
Type:  TXT
Value: v=BIMI1; l=https://cleverproject.lk/bimi/logo.svg;
```

## Email Authentication Prerequisites

BIMI requires all of the following to be configured on `cleverproject.lk`:

- [ ] **SPF** — TXT record authorizing your mail sending servers
- [ ] **DKIM** — Domain signing enabled on your email provider
- [ ] **DMARC** — TXT record with `p=quarantine` or `p=reject` policy (required for BIMI)
  - Minimum: `v=DMARC1; p=quarantine; rua=mailto:dmarc@cleverproject.lk;`
  - Recommended: `v=DMARC1; p=reject; rua=mailto:dmarc@cleverproject.lk;`

## VMC / CMC Certificate (Optional but Recommended)

- Some inbox providers (Gmail, Apple Mail) require a **Verified Mark Certificate (VMC)** or **Common Mark Certificate (CMC)** for the BIMI logo to display.
- VMC requires your logo to be a registered trademark.
- CMC is a newer, less restrictive alternative.
- If you obtain a VMC/CMC, update your BIMI DNS record to include the certificate URL:
  ```
  v=BIMI1; l=https://cleverproject.lk/bimi/logo.svg; a=https://cleverproject.lk/bimi/certificate.pem;
  ```

## Verification

1. Deploy the site and confirm `https://cleverproject.lk/bimi/logo.svg` loads in a browser
2. Use [BIMI Inspector](https://bimigroup.org/bimi-generator/) or [MXToolbox BIMI Lookup](https://mxtoolbox.com/bimi.aspx) to validate
3. Send a test email and check if the logo appears in supported inboxes
