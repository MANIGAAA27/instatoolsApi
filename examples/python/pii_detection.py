"""
InstaTools API - PII Detection Example

This example demonstrates how to detect personally identifiable information (PII) in text.
"""

import os
import requests

API_KEY = os.getenv('INSTATOOLS_API_KEY', 'YOUR_API_KEY')
BASE_URL = 'https://api.instatools.co'


def detect_pii(text: str, policy_id: str = 'default') -> dict:
    """Detect PII in text content."""
    response = requests.post(
        f'{BASE_URL}/api/v1/detect',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'text': text,
            'policyId': policy_id
        }
    )
    response.raise_for_status()
    return response.json()


def detect_pii_bulk(documents: list, policy_id: str = 'default') -> dict:
    """Detect PII in multiple documents (Enterprise tier only)."""
    response = requests.post(
        f'{BASE_URL}/api/v1/detect/bulk',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'documents': documents,
            'policyId': policy_id
        }
    )
    response.raise_for_status()
    return response.json()


def main():
    try:
        # Single text PII detection
        sample_text = """
        Customer Information:
        Name: John Doe
        Email: john.doe@example.com
        SSN: 123-45-6789
        Phone: (555) 123-4567
        Credit Card: 4111-1111-1111-1111
        """

        print('Detecting PII in text...')
        result = detect_pii(sample_text)
        print(f'Result: {result}')

        # Display findings
        findings = result.get('findings', [])
        if findings:
            print('\nPII Found:')
            for i, finding in enumerate(findings, 1):
                print(f"  {i}. {finding['type']}: \"{finding['value']}\" (confidence: {finding['confidence']})")

        # Bulk detection example (Enterprise tier)
        print('\nBulk PII detection...')
        bulk_results = detect_pii_bulk([
            {'id': 'doc1', 'text': 'Contact: jane@company.com'},
            {'id': 'doc2', 'text': 'SSN: 987-65-4321'}
        ])
        print(f'Bulk Results: {bulk_results}')

    except requests.HTTPError as e:
        print(f'HTTP Error: {e.response.status_code} - {e.response.text}')
    except Exception as e:
        print(f'Error: {e}')


if __name__ == '__main__':
    main()
