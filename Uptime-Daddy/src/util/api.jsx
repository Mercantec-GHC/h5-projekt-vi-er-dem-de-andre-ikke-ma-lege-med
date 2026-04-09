const ACCOUNTS_URL = "http://10.133.51.121:6969/accounts";
const API_URL = "http://10.133.51.121:8080/api";

async function fetchCall({ url, method = "GET", headers = {}, body }) {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export { API_URL, ACCOUNTS_URL, fetchCall};