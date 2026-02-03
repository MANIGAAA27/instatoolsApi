# InstaTools API

Official API client examples and documentation for [InstaTools](https://instatools.com) - Enterprise-grade compliance and productivity tools.

## Overview

InstaTools provides RESTful APIs for:
- **OFAC Sanctions Screening** - Screen entities against U.S. Treasury OFAC sanctions list
- **PII Detection & Redaction** - Detect and redact personally identifiable information
- **Email Verification** - Verify email addresses for deliverability
- **License Validation** - Validate professional licenses across all 50 U.S. states(coming soon)

## Quick Start

### 1. Get Your API Key

Sign up at [instatools.com/signup](https://instatools.co/signup) and navigate to the Developer Portal to create your API key.

### 2. Make Your First Request

```javascript
const response = await fetch('https://api.instatools.com/v1/screen', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    country: 'US'
  })
});

const result = await response.json();
console.log(result);
```

## Authentication

InstaTools API supports multiple authentication methods:

| Method | Description | Use Case |
|--------|-------------|----------|
| API Key | Bearer token in Authorization header | Simple integrations |
| OAuth 2.0 | Client credentials flow | Enterprise applications |
| JWT | JSON Web Tokens with RSA-256 signing | Advanced security needs |

### API Key Authentication

```bash
curl -X POST https://api.instatools.co/v1/screen \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "country": "US"}'
```

## API Endpoints

### OFAC Sanctions Screening

| Endpoint | Method | Tier | Description |
|----------|--------|------|-------------|
| `/api/v1/screen` | POST | Basic | Screen single entity |
| `/api/v1/screen/bulk` | POST | Enterprise | Screen multiple entities |

### PII Detection

| Endpoint | Method | Tier | Description |
|----------|--------|------|-------------|
| `/api/v1/detect` | POST | Basic | Detect PII in text/document |
| `/api/v1/detect/bulk` | POST | Enterprise | Batch document processing |

### Email Verification

| Endpoint | Method | Tier | Description |
|----------|--------|------|-------------|
| `/api/v1/verify` | POST | Basic | Verify single email |
| `/api/v1/verify/bulk` | POST | Enterprise | Verify multiple emails |

### License Validation

| Endpoint | Method | Tier | Description |
|----------|--------|------|-------------|
| `/api/v1/validate` | POST | Basic | Validate single license |
| `/api/v1/validate/bulk` | POST | Enterprise | Validate multiple licenses |

## Rate Limits

| Tier | Requests/Minute | Requests/Day | Price |
|------|-----------------|--------------|-------|
| Basic | 30 | 1,000 | $99/month |
| Professional | 60 | 5,000 | $299/month |
| Enterprise | 120 | 50,000 | $799/month |

Rate limit headers are included in every response:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests remaining in window
- `X-RateLimit-Reset` - Unix timestamp when limit resets

## Error Handling

All errors follow RFC 7807 Problem Details format:

```json
{
  "type": "https://api.instatools.co/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "You have exceeded 30 requests per minute",
  "instance": "/api/v1/screen"
}
```

## Examples

See the `/examples` directory for integration examples in:
- JavaScript/Node.js
- Python
- cURL/Shell

## Postman Collection

Import the [Postman Collection](./postman/instatools-api-collection.json) to test API endpoints quickly.

## Support

- Documentation: [instatools.co/developers](https://instatools.co/developers)
- Email: support@instatools.co
- Contact: [instatools.co/contact](https://instatools.co/contact)

## License

MIT License - See [LICENSE](./LICENSE) for details.
