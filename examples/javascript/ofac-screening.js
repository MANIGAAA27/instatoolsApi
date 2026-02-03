/**
 * InstaTools API - OFAC Sanctions Screening Example
 * 
 * This example demonstrates how to screen entities against the OFAC sanctions list.
 */

const API_KEY = process.env.INSTATOOLS_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.instatools.co';

/**
 * Screen a single entity against OFAC sanctions list
 */
async function screenEntity(name, country, entityType = 'individual') {
  const response = await fetch(`${BASE_URL}/api/v1/screen`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      country,
      entityType
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.title} - ${error.detail}`);
  }

  return response.json();
}

/**
 * Screen multiple entities in bulk (Enterprise tier only)
 */
async function screenBulk(entities) {
  const response = await fetch(`${BASE_URL}/api/v1/screen/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ entities })
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
    // Single entity screening
    console.log('Screening single entity...');
    const result = await screenEntity('John Doe', 'US');
    console.log('Result:', JSON.stringify(result, null, 2));

    // Check for matches
    if (result.match) {
      console.log('WARNING: Potential sanctions match found!');
      console.log('Match score:', result.score);
    } else {
      console.log('No sanctions matches found.');
    }

    // Bulk screening example (Enterprise tier)
    console.log('\nBulk screening...');
    const bulkResults = await screenBulk([
      { name: 'Jane Smith', country: 'UK' },
      { name: 'Bob Johnson', country: 'CA' }
    ]);
    console.log('Bulk Results:', JSON.stringify(bulkResults, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
