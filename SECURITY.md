# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Active |
| < 1.0   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in MAKON, please report it responsibly.

**DO NOT open a public GitHub issue.**

Instead, please email **farhod@makon.uz** with:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

### Response Timeline

| Step | Timeline |
|------|----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix or mitigation | Within 30 days (severity dependent) |
| Public disclosure | After fix is released |

## Security Measures

### Authentication
- Auth middleware on all admin routes
- Role-based access control (8 roles)
- localStorage for session (v1.0, tokens planned for v1.1)

### Data Protection
- No sensitive data in static output
- All mock data is fictional
- No API keys or secrets in frontend code

### Dependencies
- Dependencies are regularly audited via `npm audit`
- Pinned versions in `package.json`
- GitHub Dependabot alerts enabled

## Best Practices for Contributors

- Never commit secrets, API keys, or credentials
- Use `.env` files for local configuration (already in `.gitignore`)
- Report any suspicious activity immediately
- Follow the principle of least privilege when implementing role-based features
