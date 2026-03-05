const ENV_API_URL = (import.meta as any)?.env?.VITE_API_URL as string | undefined;
const BASE_URL = ENV_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('authToken');

const headers = (withAuth = false): HeadersInit => {
  const h: HeadersInit = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = getToken();
    if (token) (h as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

const handle = async (resPromise: Promise<Response>) => {
  let res: Response;
  try {
    res = await resPromise;
  } catch {
    throw new Error('Network error: unable to reach server');
  }

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = typeof data === 'object' && data && 'message' in (data as any)
      ? (data as any).message
      : 'Request failed';
    throw new Error(msg);
  }
  return data;
};

// ── Auth ──
export const authAPI = {
  login: (email: string, password: string) =>
    handle(fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify({ email, password }) })),

  register: (data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) =>
    handle(fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(data) })),

  me: () =>
    handle(fetch(`${BASE_URL}/auth/me`, { headers: headers(true) })),

  updateProfile: (data: object) =>
    handle(fetch(`${BASE_URL}/auth/profile`, { method: 'PUT', headers: headers(true), body: JSON.stringify(data) })),

  changePassword: (currentPassword: string, newPassword: string) =>
    handle(fetch(`${BASE_URL}/auth/change-password`, { method: 'PUT', headers: headers(true), body: JSON.stringify({ currentPassword, newPassword }) })),

  deleteAccount: () =>
    handle(fetch(`${BASE_URL}/auth/account`, { method: 'DELETE', headers: headers(true) })),
};

// ── Products ──
export const productsAPI = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return handle(fetch(`${BASE_URL}/products${qs}`));
  },

  getById: (id: string) =>
    handle(fetch(`${BASE_URL}/products/${id}`)),

  create: (data: object) =>
    handle(fetch(`${BASE_URL}/products`, { method: 'POST', headers: headers(true), body: JSON.stringify(data) })),

  update: (id: string, data: object) =>
    handle(fetch(`${BASE_URL}/products/${id}`, { method: 'PUT', headers: headers(true), body: JSON.stringify(data) })),

  delete: (id: string) =>
    handle(fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE', headers: headers(true) })),
};

// ── Cart ──
export const cartAPI = {
  get: () =>
    handle(fetch(`${BASE_URL}/cart`, { headers: headers(true) })),

  addOrUpdate: (productId: string, quantity: number) =>
    handle(fetch(`${BASE_URL}/cart`, { method: 'POST', headers: headers(true), body: JSON.stringify({ productId, quantity }) })),

  remove: (productId: string) =>
    handle(fetch(`${BASE_URL}/cart/${productId}`, { method: 'DELETE', headers: headers(true) })),

  clear: () =>
    handle(fetch(`${BASE_URL}/cart`, { method: 'DELETE', headers: headers(true) })),
};

// ── Orders ──
export const ordersAPI = {
  getAll: () =>
    handle(fetch(`${BASE_URL}/orders`, { headers: headers(true) })),

  getById: (id: string) =>
    handle(fetch(`${BASE_URL}/orders/${id}`, { headers: headers(true) })),

  place: (data: object) =>
    handle(fetch(`${BASE_URL}/orders`, { method: 'POST', headers: headers(true), body: JSON.stringify(data) })),

  updateStatus: (id: string, status: string) =>
    handle(fetch(`${BASE_URL}/orders/${id}/status`, { method: 'PUT', headers: headers(true), body: JSON.stringify({ status }) })),
};

export const usersAPI = {
  getAll: () =>
    handle(fetch(`${BASE_URL}/auth/users`, { headers: headers(true) })),

  delete: (id: string) =>
    handle(fetch(`${BASE_URL}/auth/users/${id}`, { method: 'DELETE', headers: headers(true) })),
};

export const checkHealth = () =>
  handle(fetch(`${BASE_URL}/health`));
