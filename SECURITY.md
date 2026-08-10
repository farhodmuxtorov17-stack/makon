# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in MAKON, please report it responsibly.

### How to Report
1. **DO NOT** open a public GitHub Issue
2. Email: security@makon.uz
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline
- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 7 days
- **Fix or mitigation**: within 30 days (severity-dependent)

## Security Measures

### Authentication
- Role-based access control (RBAC) with 5 predefined roles
- Auth middleware on all admin routes
- Session-based authentication

### ERI (Electronic Registration Identifier)
- SHA-256 digital hash for every contract
- Certificate expiry validation
- One TIN = one organization profile
- Passwords stored encrypted (bcrypt)

### Data Protection
- No secrets in client-side code
- Backend functions handle all sensitive API calls
- Row-level security on entity access
- HTTPS enforced (GitHub Pages CDN)

### Audit Trail
- All create/update/delete actions logged
- User, action, IP, and timestamp recorded
- 24-hour activity history visible in admin panel

## Scope

This security policy covers:
- The MAKON frontend application
- Base44 backend functions
- ERI integration flow

It does **not** cover:
- Third-party services (Base44 platform, ERI provider)
- Infrastructure security (GitHub Pages CDN)
