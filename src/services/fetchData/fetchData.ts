export async function fetchData<T>(url: string) {
  let rawResponse: Response;
  try {
    rawResponse = await fetch(url);
  } catch (error) {
    return Promise.reject(String(error));
  }
  if (!rawResponse.ok) {
    const error = await rawResponse.text();
    return Promise.reject(error);
  }
  const response: T = await rawResponse.json();
  return Promise.resolve(response);
}
