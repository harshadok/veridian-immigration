const ENQUIRY_ENDPOINT = '/api/enquiry';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return {};
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function submitEnquiry(payload) {
  let response;

  try {
    response = await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error('Unable to reach the enquiry service. Please try again shortly.');
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || 'Submission failed. Please try again.');
  }

  return data;
}
