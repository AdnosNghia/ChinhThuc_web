import { createClient } from '@supabase/supabase-js';
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
const isJwtLike = Boolean(key && key.split('.').length === 3 && key.length > 80);
export const supabase = url && isJwtLike ? createClient(url, key!, { auth: { autoRefreshToken: false, persistSession: false } }) : null;
export const supabaseConfigError = url && key && !isJwtLike ? 'SUPABASE_SECRET_KEY không hợp lệ: cần secret/service key JWT thật, không phải placeholder hoặc giá trị Vercel mã hóa.' : !url || !key ? 'Thiếu SUPABASE_URL hoặc SUPABASE_SECRET_KEY.' : '';
export const storageBucket = process.env.SUPABASE_STORAGE_BUCKET || 'media';
