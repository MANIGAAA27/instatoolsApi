# Authentication

InstaTools API supports multiple authentication methods to fit your integration needs.

## API Key Authentication

The simplest way to authenticate. Include your API key in the `Authorization` header.

```bash
curl -X POST https://api.instatools.com/api/v1/screen \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "country": "US"}'
```

### Getting Your API Key

1. Sign up at [instatools.com/signup](https://instatools.com/signup)
2. Navigate to Developer Portal
3. Click "Create API Key"
4. Copy your key (it's only shown once!)

### Security Best Practices

- Never expose your API key in client-side code
- Use environment variables to store keys
- Rotate keys periodically
- Use IP whitelisting for additional security

## OAuth 2.0 (Client Credentials)

For enterprise applications requiring programmatic access.

### Step 1: Create OAuth Application

1. Go to Developer Portal > OAuth Apps
2. Click "Create OAuth App"
3. Note your `client_id` and `client_secret`

### Step 2: Get Access Token

```bash
curl -X POST https://api.instatools.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=screen:read detect:read verify:read"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "screen:read detect:read verify:read"
}
```

### Step 3: Use Access Token

```bash
curl -X POST https://api.instatools.com/api/v1/screen \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "country": "US"}'
```

## Available Scopes

| Scope | Description |
|-------|-------------|
| `screen:read` | OFAC sanctions screening |
| `screen:write` | Bulk OFAC operations |
| `detect:read` | PII detection |
| `detect:write` | Bulk PII operations |
| `verify:read` | Email verification |
| `verify:write` | Bulk email verification |
| `validate:read` | License validation |
| `validate:write` | Bulk license validation |
| `webhooks:manage` | Webhook configuration |

## IP Whitelisting

Restrict API access to specific IP addresses for enhanced security.

1. Go to Developer Portal > Security
2. Add allowed IP addresses or CIDR ranges
3. All requests from non-whitelisted IPs will be rejected

## Webhook HMAC Signing

Verify webhook payloads using HMAC-SHA256 signatures.

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## Error Responses

Authentication errors return HTTP 401 or 403:

```json
{
  "type": "https://api.instatools.com/errors/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Invalid or expired API key"
}
```

| Status | Meaning |
|--------|---------|
| 401 | Invalid/missing credentials |
| 403 | Valid credentials but insufficient permissions |
