/**
 * Browser-safe Sanity helpers. Token stays on the server (API routes).
 */
async function request(path, { method = "GET", body, query } = {}) {
  const url = query
    ? `/api/sanity/${path}?${new URLSearchParams(query).toString()}`
    : `/api/sanity/${path}`;
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

export function fetchPostData({ type, category, subCategory }) {
  return request("data", {
    query: {
      type: type ?? "",
      category: category ?? "",
      subCategory: subCategory ?? "",
    },
  });
}

export function fetchSubCategory(category) {
  return request("subcategory", { query: { category } });
}

export function fetchComments({ id, start, end }) {
  return request("comments", {
    query: { id, start: String(start), end: String(end) },
  });
}

export function createComment(payload) {
  return request("comments", { method: "POST", body: payload });
}

export function fetchReComments({ id, start, end }) {
  return request("recomments", {
    query: { id, start: String(start), end: String(end) },
  });
}

export function createReComment(payload) {
  return request("recomments", { method: "POST", body: payload });
}
