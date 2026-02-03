"""
InstaTools API - OFAC Sanctions Screening Example

This example demonstrates how to screen entities against the OFAC sanctions list.
"""

import os
import requests

API_KEY = os.getenv('INSTATOOLS_API_KEY', 'YOUR_API_KEY')
BASE_URL = 'https://api.instatools.co'


def screen_entity(name: str, country: str, entity_type: str = 'individual') -> dict:
    """Screen a single entity against OFAC sanctions list."""
    response = requests.post(
        f'{BASE_URL}/api/v1/screen',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={
            'name': name,
            'country': country,
            'entityType': entity_type
        }
    )
    response.raise_for_status()
    return response.json()


def screen_bulk(entities: list) -> dict:
    """Screen multiple entities in bulk (Enterprise tier only)."""
    response = requests.post(
        f'{BASE_URL}/api/v1/screen/bulk',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        },
        json={'entities': entities}
    )
    response.raise_for_status()
    return response.json()


def main():
    try:
        # Single entity screening
        print('Screening single entity...')
        result = screen_entity('John Doe', 'US')
        print(f'Result: {result}')

        # Check for matches
        if result.get('match'):
            print('WARNING: Potential sanctions match found!')
            print(f"Match score: {result.get('score')}")
        else:
            print('No sanctions matches found.')

        # Bulk screening example (Enterprise tier)
        print('\nBulk screening...')
        bulk_results = screen_bulk([
            {'name': 'Jane Smith', 'country': 'UK'},
            {'name': 'Bob Johnson', 'country': 'CA'}
        ])
        print(f'Bulk Results: {bulk_results}')

    except requests.HTTPError as e:
        print(f'HTTP Error: {e.response.status_code} - {e.response.text}')
    except Exception as e:
        print(f'Error: {e}')


if __name__ == '__main__':
    main()
