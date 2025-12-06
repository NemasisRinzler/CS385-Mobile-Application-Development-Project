/*
Notes for Chris:
Welcome, this ones nice and simple.
This is simmply us setting up the supabase client to connect to our backend database. 
FYI Supabase is like a firebase alternative that uses PostgresSQL as the database engine, easy for us since we know SQL and its not Google (yay).
The URL gives the location of our supabase project, and the anon key is like a password that
lets us access the database. From here we can import this supabase client to any file that needs to interact with the database.

When we import supabase in other files, we can use it to call different endpoints on the database.
These endpoints are basically columns of the "users" table in supabase which stores usernames, passwords, and progress such as xp.

Go to services/authService.js to see next notes
*/

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://neynsjohdechnkjlureu.supabase.co';
const supabaseAnonKey = 'sb_publishable_RqFtBgd0dVTNJPp8G3cjDw_G-_YQcwy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);