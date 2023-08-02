import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://bagwuefyfgrwfnoyrwhp.supabase.co',
    'peyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ3d1ZWZ5Zmdyd2Zub3lyd2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4OTE3MDAsImV4cCI6MjAwNjQ2NzcwMH0.88gE9y2nXt6llr8fETParqe0i7s675S_LvkrCW-qErw'
);

