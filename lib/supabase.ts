import { createClient } from '@supabase/supabase-js';

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined';

// These are public values and can be exposed in the client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jkpcillmkjcxatibjbxb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcGNpbGxta2pjeGF0aWJqYnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTAxNzIsImV4cCI6MjA1NjY4NjE3Mn0.3dyUU_j4ynkK_a2cPSq-JghPz2nbfybML_lGzjQRyWM';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Authentication might not work properly.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isClient, // Don't persist session in server-side contexts
    autoRefreshToken: isClient,
    detectSessionInUrl: isClient,
  },
});

// Helper function to create a Supabase client with cookies for server components
export const createServerClient = async (cookieStore: any) => {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          cookie: cookieStore.toString(),
        },
      },
    }
  );
};

export default supabase;
