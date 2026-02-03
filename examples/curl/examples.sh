#!/bin/bash
#
# InstaTools API - cURL Examples
#
# Replace YOUR_API_KEY with your actual API key

API_KEY="${INSTATOOLS_API_KEY:-YOUR_API_KEY}"
BASE_URL="https://api.instatools.com"

echo "=== OFAC Sanctions Screening ==="

# Screen single entity
echo -e "\n1. Screen single entity:"
curl -X POST "${BASE_URL}/api/v1/screen" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "country": "US",
    "entityType": "individual"
  }'

# Screen bulk entities (Enterprise tier)
echo -e "\n\n2. Screen bulk entities (Enterprise tier):"
curl -X POST "${BASE_URL}/api/v1/screen/bulk" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "entities": [
      {"name": "Jane Smith", "country": "UK"},
      {"name": "Bob Johnson", "country": "CA"}
    ]
  }'

echo -e "\n\n=== PII Detection ==="

# Detect PII in text
echo -e "\n3. Detect PII in text:"
curl -X POST "${BASE_URL}/api/v1/detect" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Contact John Doe at john@example.com. SSN: 123-45-6789",
    "policyId": "default"
  }'

# Bulk PII detection (Enterprise tier)
echo -e "\n\n4. Bulk PII detection (Enterprise tier):"
curl -X POST "${BASE_URL}/api/v1/detect/bulk" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {"id": "doc1", "text": "Email: jane@company.com"},
      {"id": "doc2", "text": "SSN: 987-65-4321"}
    ],
    "policyId": "default"
  }'

echo -e "\n\n=== Email Verification ==="

# Verify single email
echo -e "\n5. Verify single email:"
curl -X POST "${BASE_URL}/api/v1/verify" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'

# Bulk email verification (Enterprise tier)
echo -e "\n\n6. Bulk email verification (Enterprise tier):"
curl -X POST "${BASE_URL}/api/v1/verify/bulk" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "emails": [
      "user1@gmail.com",
      "user2@company.com",
      "fake@invalid-domain.com"
    ]
  }'

echo -e "\n\n=== License Validation ==="

# Validate single license
echo -e "\n7. Validate license:"
curl -X POST "${BASE_URL}/api/v1/validate" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "licenseNumber": "MD12345",
    "state": "CA",
    "licenseType": "medical"
  }'

echo -e "\n\n=== Usage Stats ==="

# Get usage statistics
echo -e "\n8. Get usage stats:"
curl -X GET "${BASE_URL}/api/v1/usage" \
  -H "Authorization: Bearer ${API_KEY}"

echo -e "\n"
