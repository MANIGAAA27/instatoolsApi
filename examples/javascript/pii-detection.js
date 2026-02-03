/**
 * InstaTools API - PII Detection Example
 * 
 * This example demonstrates how to detect personally identifiable information (PII) in text.
 */

const API_KEY = process.env.INSTATOOLS_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.instatools.com';

/**
 * Detect PII in text content
 */
async function detectPII(text, policyId = 'default') {
  const response = await fetch(`${BASE_URL}/api/v1/detect`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      policyId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.title} - ${error.detail}`);
  }

  return response.json();
}

/**
 * Detect PII in multiple documents (Enterprise tier only)
 */
async function detectPIIBulk(documents, policyId = 'default') {
  const response = await fetch(`${BASE_URL}/api/v1/detect/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      documents,
      policyId
    })
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
    // Single text PII detection
    const sampleText = `
      Customer Information:
      Name: John Doe
      Email: john.doe@example.com
      SSN: 123-45-6789
      Phone: (555) 123-4567
      Credit Card: 4111-1111-1111-1111
    `;

    console.log('Detecting PII in text...');
    const result = await detectPII(sampleText);
    console.log('Detected PII:', JSON.stringify(result, null, 2));

    // Display findings
    if (result.findings && result.findings.length > 0) {
      console.log('\nPII Found:');
      result.findings.forEach((finding, index) => {
        console.log(`  ${index + 1}. ${finding.type}: "${finding.value}" (confidence: ${finding.confidence})`);
      });
    }

    // Bulk detection example (Enterprise tier)
    console.log('\nBulk PII detection...');
    const bulkResults = await detectPIIBulk([
      { id: 'doc1', text: 'Contact: jane@company.com' },
      { id: 'doc2', text: 'SSN: 987-65-4321' }
    ]);
    console.log('Bulk Results:', JSON.stringify(bulkResults, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
