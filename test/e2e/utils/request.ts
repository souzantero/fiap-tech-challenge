export const request = async <T>(url: string, method: string, body?: T) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return { response, data };
};
