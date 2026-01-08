import { NextResponse } from 'next/server';

const BASE_URL = process.env.COINGECKO_BASE_URL ?? '';
const API_KEY = process.env.COINGECKO_API_KEY ?? '';

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('query') ?? '').trim();

  if (!query) {
    return NextResponse.json({ coins: [] });
  }

  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set('query', query);

  const authHeader = BASE_URL.includes('pro-api.coingecko.com')
    ? 'x-cg-pro-api-key'
    : 'x-cg-demo-api-key';

  const response = await fetch(url.toString(), {
    headers: {
      [authHeader]: API_KEY,
      'Content-Type': 'application/json',
    },
    // Search should be fresh while typing.
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody: { error?: string } = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorBody.error || response.statusText },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
