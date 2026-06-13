const DEFAULT_API_URL = 'http://localhost:5050';

function getApiBaseUrl() {
  const configuredUrl =
    process.env.API_URL ||
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_API_URL;

  return configuredUrl.replace(/\/+$/, '');
}

async function readBackendResponse(response) {
  const contentType = response.headers.get('content-type') || 'application/json';
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: { 'Content-Type': contentType }
  });
}

export async function POST(request) {
  const apiBaseUrl = getApiBaseUrl();
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: 'Invalid enquiry payload.'
      },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(`${apiBaseUrl}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    return await readBackendResponse(backendResponse);
  } catch (error) {
    console.error('Enquiry proxy error:', error);

    return Response.json(
      {
        success: false,
        message: 'Enquiry service is unavailable. Please try again shortly.'
      },
      { status: 503 }
    );
  }
}
