// Supabase Client — adapted from myMedKitt

const SUPABASE_URL = 'https://kzzqloklnxlqbccxbxgr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6enFsb2tsbnhscWJjY3hieGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzA4MDMsImV4cCI6MjA4ODA0NjgwM30.lCqD2KymgqQf3h8xUHIht7PeBcmvPVSXxvqsL45Mrko';

const ALLOWED_TABLES = new Set(['landing_suggestions', 'landing_emails']);

export interface SupabaseResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// Simple rate limiter: max 10 requests per 30 seconds
let requestTimestamps: number[] = [];
function isRateLimited(): boolean {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(t => now - t < 30000);
  if (requestTimestamps.length >= 10) return true;
  requestTimestamps.push(now);
  return false;
}

function headers(extra?: Record<string, string>): Record<string, string> {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function supabaseFetch<T>(
  table: string,
  query: string = '',
): Promise<SupabaseResponse<T>> {
  if (!ALLOWED_TABLES.has(table)) {
    return { data: null, error: 'Invalid request.', status: 403 };
  }
  if (isRateLimited()) {
    return { data: null, error: 'Too many requests.', status: 429 };
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) {
      return { data: null, error: `Request failed: ${res.status}`, status: res.status };
    }
    const data = await res.json() as T;
    return { data, error: null, status: res.status };
  } catch {
    return { data: null, error: 'Network error.', status: 0 };
  }
}

export async function supabaseInsert<T>(
  table: string,
  data: Record<string, unknown>,
): Promise<SupabaseResponse<T>> {
  if (!ALLOWED_TABLES.has(table)) {
    return { data: null, error: 'Invalid request.', status: 403 };
  }
  if (isRateLimited()) {
    return { data: null, error: 'Too many requests.', status: 429 };
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: headers({ 'Prefer': 'return=representation' }),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || `Request failed: ${res.status}`, status: res.status };
    }
    const result = await res.json() as T;
    return { data: result, error: null, status: res.status };
  } catch {
    return { data: null, error: 'Network error.', status: 0 };
  }
}

export async function supabaseRpc<T>(
  fn: string,
  params: Record<string, unknown>,
): Promise<SupabaseResponse<T>> {
  if (isRateLimited()) {
    return { data: null, error: 'Too many requests.', status: 429 };
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/rpc/${fn}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      return { data: null, error: `Request failed: ${res.status}`, status: res.status };
    }
    const data = await res.json() as T;
    return { data, error: null, status: res.status };
  } catch {
    return { data: null, error: 'Network error.', status: 0 };
  }
}
