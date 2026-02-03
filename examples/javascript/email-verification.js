/**
 * InstaTools API - Email Verification Example
 * 
 * This example demonstrates how to verify email addresses for deliverability.
 */

const API_KEY = process.env.INSTATOOLS_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.instatools.com';

/**
 * Verify a single email address
 */
async function verifyEmail(email) {
  const response = await fetch(`${BASE_URL}/api/v1/verify`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.title} - ${error.detail}`);
  }

  return response.json();
}

/**
 * Verify multiple email addresses (Enterprise tier only)
 */
async function verifyEmailsBulk(emails) {
  const response = await fetch(`${BASE_URL}/api/v1/verify/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emails })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.title} - ${error.detail}`);
  }

  return response.json();
}

// Example usage
async function main() {
  try {
    // Single email verification
    console.log('Verifying single email...');
    const result = await verifyEmail('test@example.com');
    console.log('Result:', JSON.stringify(result, null, 2));

    // Check verification status
    console.log('\nVerification Status:');
    console.log(`  Email: ${result.email}`);
    console.log(`  Valid: ${result.isValid}`);
    console.log(`  Deliverable: ${result.isDeliverable}`);
    console.log(`  Disposable: ${result.isDisposable}`);
    console.log(`  Role Account: ${result.isRoleAccount}`);

    // Bulk verification example (Enterprise tier)
    console.log('\nBulk email verification...');
    const bulkResults = await verifyEmailsBulk([
      'user1@gmail.com',
      'user2@company.com',
      'fake@invalid-domain-xyz.com'
    ]);
    console.log('Bulk Results:', JSON.stringify(bulkResults, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
