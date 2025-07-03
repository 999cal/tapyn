// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqfqpnupsjfgrsloabhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZnFwbnVwc2pmZ3JzbG9hYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Nzc1MjUsImV4cCI6MjA2NzE1MzUyNX0.xW2qkJa_j6n_JUX-SgzISde6d85mAQiEKevwHPjkIXs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
