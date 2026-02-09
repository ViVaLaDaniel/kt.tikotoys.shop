const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

const apiBaseUrl = isSupabaseEnabled ? `${supabaseUrl}/rest/v1` : '';

export const fetchSupabase = async <T>(path: string, options: RequestInit = {}) => {
  if (!isSupabaseEnabled) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Supabase request failed');
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
};
