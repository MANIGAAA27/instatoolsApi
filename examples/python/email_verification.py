"""
InstaTools API - Email Verification Example

This example demonstrates how to verify email addresses for deliverability.
"""

import os
import requests

API_KEY = os.getenv('INSTATOOLS_API_KEY', 'YOUR_API_KEY')
BASE_URL = 'https://api.instatools.com'


def verify_email(email: str) -> dict:
    """Verify a single email address."""
    response = requests.post(
        f'{BASE_URL}/api/v1/verify',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={'email': email}
    )
    response.raise_for_status()
    return response.json()


def verify_emails_bulk(emails: list) -> dict:
    """Verify multiple email addresses (Enterprise tier only)."""
    response = requests.post(
        f'{BASE_URL}/api/v1/verify/bulk',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={'emails': emails}
    )
    response.raise_for_status()
    return response.json()


def main():
    try:
        # Single email verification
        print('Verifying single email...')
        result = verify_email('test@example.com')
        print(f'Result: {result}')

        # Check verification status
        print('\nVerification Status:')
        print(f"  Email: {result.get('email')}")
        print(f"  Valid: {result.get('isValid')}")
        print(f"  Deliverable: {result.get('isDeliverable')}")
        print(f"  Disposable: {result.get('isDisposable')}")
        print(f"  Role Account: {result.get('isRoleAccount')}")

        # Bulk verification example (Enterprise tier)
        print('\nBulk email verification...')
        bulk_results = verify_emails_bulk([
            'user1@gmail.com',
            'user2@company.com',
            'fake@invalid-domain-xyz.com'
        ])
        print(f'Bulk Results: {bulk_results}')

    except requests.HTTPError as e:
        print(f'HTTP Error: {e.response.status_code} - {e.response.text}')
    except Exception as e:
        print(f'Error: {e}')


if __name__ == '__main__':
    main()
