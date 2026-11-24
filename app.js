// ▼ ここに Supabase の Project URL と anon key を貼り付けてください
const SUPABASE_URL = "https://hwwgaqhewnpshaglqhwm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d2dhcWhld25wc2hhZ2xxaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU1MjgwNDQsImV4cCI6MjExMTEwNDA0NH0.8tiyF6ULDqtIumFVILfY_4fzD_C4gcSoWJebA3izeyU";

const isSupabaseConfigured =
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("YOUR_PROJECT_ID") &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const STORAGE_KEY = "kurawalk_state_v4";
const METERS_PER_TICKET = 500;
const MULTI_GACHA_COUNT = 10;

// 25x25 ドット絵データ
const CHAR_SPRITE_DATA =
  "25,25:255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,1,255,255,255,255,255,1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,1,255,1,255,255,255,1,255,1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,255,255,255,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,255,255,255,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,1,255,255,0,0,0,1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,2,0,1,1,1,0,2,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,2,2,0,1,255,1,0,2,2,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,2,2,0,1,255,1,0,2,2,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,255,255,255,255,255,255,255,255,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,255,255,255,255,255,255,255,255,255,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,255,255,255,255,255,255,255,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,255,255,255,255,255,255,255,255,255,255,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255:16777215,0,16755967,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0:-1";

// 50x50 部屋背景ドット絵データ
const ROOM_BG_DATA =
  "50,50:1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,1,8,8,8,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,1,8,8,8,8,8,1,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,8,8,8,8,8,8,8,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,1,1,6,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,7,3,7,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,5,6,5,7,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,5,5,4,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,0,3,7,6,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,6,0,5,7,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,5,0,6,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,7,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,3,3,3,3,3,1,3,3,3,3,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,1,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,0,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,4,4,4,4,4,4,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,4,4,4,4,4,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,4,4,4,4,4,4,4,1,1,0,1,0,1,1,0,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,1,5,1,0,1,0,1,1,0,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,1,5,5,1,0,1,1,5,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,1,5,5,5,1,0,1,5,5,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1:11760187,0,16776960,4325375,16777081,16752127,10913535,4587355,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0:-1";

function intToCssColor(num) {
  const hex = (Number(num) >>> 0).toString(16).padStart(6, "0");
  return `#${hex}`;
}

function drawSpriteDataToCanvas(canvas, spriteString) {
  if (!canvas || !spriteString) return;

  const [sizePart, gridPart, palettePart] = spriteString.split(":");
  if (!sizePart || !gridPart || !palettePart) return;

  const [wStr, hStr] = sizePart.split(",");
  const width = Number(wStr);
  const height = Number(hStr);
  const indices = gridPart.split(",").map((v) => Number(v.trim()));
  const palette = palettePart.split(",").map((v) => v.trim());

  if (!width || !height || indices.length < width * height) return;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = indices[y * width + x];
      if (idx === 255 || idx < 0 || idx >= palette.length) continue;
      ctx.fillStyle = intToCssColor(palette[idx]);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function renderSpriteToCanvas(spriteString) {
  drawSpriteDataToCanvas(document.getElementById("charSpriteCanvas"), spriteString);
}

function renderRoomBackground(spriteString) {
  drawSpriteDataToCanvas(document.getElementById("roomBgCanvas"), spriteString);
}

function generateUserId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "user_" + Math.random().toString(36).slice(2) + Date.now();
}

const DEFAULT_STATE = {
  userId: generateUserId(),
  registered: false,
  userName: "ゲスト",
  userIcon: "🐶",
  fontScale: 1,
  hunger: 50,
  happiness: 50,
  totalDistance: 0,
  grantedTickets: 0,
  tickets: 0,
  items: [{ type: "food", name: "ほねっこ", label: "餌：ほねっこ", rarity: 1 }],
  coupons: [],
  claimedQrCodes: [],
  equippedDecor: "なし",
  equippedAccessory: ""
};

const DUMMY_OTHERS = [
  { user_id: "u1", user_name: "田中", user_icon: "🦊", distance: 10000 },
  { user_id: "u2", user_name: "山田", user_icon: "🐱", distance: 5000 },
  { user_id: "u3", user_name: "まゆ", user_icon: "🐶", distance: 4000 },
  { user_id: "u4", user_name: "あす", user_icon: "🐱", distance: 1000 },
  { user_id: "u5", user_name: "ふじ", user_icon: "🦊", distance: 500 }
];

const GACHA_POOL = [
  { type: "food", name: "ほねっこ", label: "餌：ほねっこ", rarity: 1, weight: 30 },
  { type: "food", name: "おいしいカリカリ", label: "餌：おいしいカリカリ", rarity: 1, weight: 25 },
  { type: "coupon", shop: "カフェ〇〇", discount: "100円引き", label: "クーポン：カフェ〇〇（100円引き）", rarity: 2, weight: 15 },
  { type: "coupon", shop: "ベーカリー△△", discount: "50円引き", label: "クーポン：ベーカリー△△（50円引き）", rarity: 2, weight: 15 },
  { type: "decor", name: "赤いソファ", label: "インテリア：赤いソファ", rarity: 3, weight: 5 },
  { type: "decor", name: "星ランプ", label: "インテリア：星ランプ", rarity: 3, weight: 5 },
  { type: "accessory", name: "🎀青いリボン", label: "着せ替え：青いリボン", rarity: 3, weight: 5 }
];

const QR_REWARDS = {
  KURAWALK_SHOP_A: {
    title: "店舗A（カフェ〇〇）",
    item: { type: "decor", name: "北欧ラグ", label: "インテリア：北欧ラグ", rarity: 3 },
    coupon: { shop: "カフェ〇〇", discount: "100円引き" }
  },
  KURAWALK_SHOP_B: {
    title: "店舗B（ベーカリー△△）",
    item: { type: "accessory", name: "🕶️サングラス", label: "着せ替え：サングラス", rarity: 3 },
    coupon: { shop: "ベーカリー△△", discount: "50円引き" }
  }
};

function clampStat(val) {
  return Math.max(0, Math.min(100, Math.round(val)));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, userId: generateUserId() };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      userId: parsed.userId || generateUserId()
    };
  } catch {
    return { ...DEFAULT_STATE, userId: generateUserId() };
  }
}

let state = loadState();
let onlineRankings = [];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// キャラクターの部屋内トコトコ移動制御
const roomBox = document.getElementById("roomBox");
const charBadge = document.getElementById("charBadge");
let charWalkRafId = null;
let charPauseTimeoutId = null;
let charCurrentX = 0;
let charTargetX = 0;
let charIsWalking = false;
let charFacingLeft = false;
let charLastFrameTime = null;

function getCharMoveBounds() {
  if (!roomBox || !charBadge) return { minX: 0, maxX: 0 };
  const roomWidth = roomBox.clientWidth || 320;
  const badgeWidth = charBadge.offsetWidth || 110;
  const padding = 14;
  const halfSpan = Math.max(12, (roomWidth - badgeWidth) / 2 - padding);
  return { minX: -halfSpan, maxX: halfSpan };
}

function applyCharPosition() {
  if (!charBadge) return;
  charBadge.style.transform = `translateX(calc(-50% + ${Math.round(charCurrentX)}px))`;
  charBadge.classList.toggle("walking", charIsWalking);
  charBadge.classList.toggle("facing-left", charFacingLeft);
}

function pickNextCharTarget() {
  const { minX, maxX } = getCharMoveBounds();
  if (maxX <= minX + 4) {
    charTargetX = 0;
    charIsWalking = false;
    applyCharPosition();
    return;
  }
  let nextX = minX + Math.random() * (maxX - minX);
  if (Math.abs(nextX - charCurrentX) < 28) {
    nextX = charCurrentX > 0 ? minX + Math.random() * 24 : maxX - Math.random() * 24;
  }
  charTargetX = Math.max(minX, Math.min(maxX, nextX));
  if (Math.abs(charTargetX - charCurrentX) > 1) {
    charFacingLeft = charTargetX < charCurrentX;
  }
  charIsWalking = true;
  applyCharPosition();
}

function scheduleCharPauseThenWalk() {
  charIsWalking = false;
  applyCharPosition();
  clearTimeout(charPauseTimeoutId);
  const pauseMs = 900 + Math.random() * 1400;
  charPauseTimeoutId = setTimeout(() => {
    if (document.getElementById("home")?.classList.contains("active")) {
      pickNextCharTarget();
    }
  }, pauseMs);
}

function stepCharWalk(timestamp) {
  if (!document.getElementById("home")?.classList.contains("active")) {
    charWalkRafId = null;
    charLastFrameTime = null;
    return;
  }

  if (charLastFrameTime === null) {
    charLastFrameTime = timestamp;
  }
  const dtSec = Math.min(0.05, (timestamp - charLastFrameTime) / 1000);
  charLastFrameTime = timestamp;

  const { minX, maxX } = getCharMoveBounds();
  charCurrentX = Math.max(minX, Math.min(maxX, charCurrentX));
  charTargetX = Math.max(minX, Math.min(maxX, charTargetX));

  if (charIsWalking) {
    const speedPxPerSec = 36;
    const diff = charTargetX - charCurrentX;
    if (Math.abs(diff) > 1) {
      charFacingLeft = diff < 0;
    }
    const step = Math.sign(diff) * Math.min(Math.abs(diff), speedPxPerSec * dtSec);
    charCurrentX += step;
    applyCharPosition();

    if (Math.abs(charTargetX - charCurrentX) < 1.5) {
      charCurrentX = charTargetX;
      scheduleCharPauseThenWalk();
    }
  }

  charWalkRafId = requestAnimationFrame(stepCharWalk);
}

function startCharMovement() {
  clearTimeout(charPauseTimeoutId);
  const { minX, maxX } = getCharMoveBounds();
  charCurrentX = Math.max(minX, Math.min(maxX, charCurrentX));
  if (!charIsWalking) {
    pickNextCharTarget();
  }
  if (charWalkRafId === null) {
    charLastFrameTime = null;
    charWalkRafId = requestAnimationFrame(stepCharWalk);
  }
}

function stopCharMovement() {
  clearTimeout(charPauseTimeoutId);
  charPauseTimeoutId = null;
  if (charWalkRafId !== null) {
    cancelAnimationFrame(charWalkRafId);
    charWalkRafId = null;
  }
  charLastFrameTime = null;
  charIsWalking = false;
  applyCharPosition();
}

function resetCharMovement() {
  stopCharMovement();
  charCurrentX = 0;
  charTargetX = 0;
  charFacingLeft = false;
  applyCharPosition();
  if (document.getElementById("home")?.classList.contains("active")) {
    startCharMovement();
  }
}

window.addEventListener("resize", () => {
  const { minX, maxX } = getCharMoveBounds();
  charCurrentX = Math.max(minX, Math.min(maxX, charCurrentX));
  charTargetX = Math.max(minX, Math.min(maxX, charTargetX));
  applyCharPosition();
});

// Supabase へ自分のスコア・プロフィールを送信（upsert）
async function syncMyScoreToSupabase() {
  const syncEl = document.getElementById("syncStatusText");
  if (!supabaseClient) {
    syncEl.textContent = "オンライン同期：未設定（ローカルモード）";
    return;
  }
  if (!state.registered) return;

  syncEl.textContent = "オンライン同期：送信中...";
  const { error } = await supabaseClient.from("rankings").upsert({
    user_id: state.userId,
    user_name: state.userName,
    user_icon: state.userIcon,
    distance: Math.floor(state.totalDistance),
    updated_at: new Date().toISOString()
  });

  if (error) {
    syncEl.textContent = `オンライン同期エラー: ${error.message}`;
  } else {
    const nowStr = new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    syncEl.textContent = `オンライン同期：完了（${nowStr}）`;
  }
}

// Supabase から全ユーザーのランキングを取得
async function fetchOnlineRankings() {
  if (!supabaseClient) {
    onlineRankings = [
      ...DUMMY_OTHERS,
      {
        user_id: state.userId,
        user_name: state.userName,
        user_icon: state.userIcon,
        distance: Math.floor(state.totalDistance)
      }
    ].sort((a, b) => b.distance - a.distance);
    renderRanking();
    return;
  }

  const { data, error } = await supabaseClient
    .from("rankings")
    .select("user_id, user_name, user_icon, distance")
    .order("distance", { ascending: false })
    .limit(200);

  if (error) {
    document.getElementById("myRankSummary").textContent = `ランキング取得エラー: ${error.message}`;
    return;
  }

  onlineRankings = data || [];
  renderRanking();
}

function formatDistance(meters) {
  const m = Math.floor(meters);
  if (m >= 1000) {
    return `${(m / 1000).toFixed(2)} km (${m} m)`;
  }
  return `${m} m`;
}

async function addDistance(deltaMeters) {
  if (deltaMeters <= 0) return;
  state.totalDistance += deltaMeters;

  const shouldHaveTotalTickets = Math.floor(state.totalDistance / METERS_PER_TICKET);
  const newTickets = shouldHaveTotalTickets - state.grantedTickets;
  if (newTickets > 0) {
    state.grantedTickets += newTickets;
    state.tickets += newTickets;
  }

  saveState();
  renderAll();
  await syncMyScoreToSupabase();
  await fetchOnlineRankings();
}

function calcDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

let watchId = null;
let lastPos = null;

function startGps() {
  if (!navigator.geolocation) {
    document.getElementById("gpsStatusText").textContent = "このブラウザはGPSに非対応です";
    return;
  }
  lastPos = null;
  document.getElementById("gpsStatusText").textContent = "位置情報を取得中...";
  document.getElementById("toggleGpsBtn").textContent = "GPS計測：停止する";

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const now = pos.timestamp || Date.now();

      if (accuracy > 30) {
        document.getElementById("gpsStatusText").textContent =
          `GPS誤差が大きいため除外（誤差: ${Math.round(accuracy)}m）`;
        return;
      }

      if (!lastPos) {
        lastPos = { lat: latitude, lon: longitude, time: now };
        document.getElementById("gpsStatusText").textContent =
          `基準地点を記録（精度: ±${Math.round(accuracy)}m）`;
        return;
      }

      const dist = calcDistanceMeters(lastPos.lat, lastPos.lon, latitude, longitude);
      const elapsedSec = Math.max((now - lastPos.time) / 1000, 1);
      const speedMps = dist / elapsedSec;

      if (dist < 5) {
        document.getElementById("gpsStatusText").textContent =
          `移動微小（${dist.toFixed(1)}m）のため未加算`;
        return;
      }

      if (speedMps > 2.22) {
        lastPos = { lat: latitude, lon: longitude, time: now };
        document.getElementById("gpsStatusText").textContent =
          `速度が速いため除外（約${(speedMps * 3.6).toFixed(1)} km/h）`;
        return;
      }

      lastPos = { lat: latitude, lon: longitude, time: now };
      addDistance(dist);
      document.getElementById("gpsStatusText").textContent =
        `+${Math.round(dist)}m 計測（精度: ±${Math.round(accuracy)}m）`;
    },
    (err) => {
      document.getElementById("gpsStatusText").textContent = `GPSエラー: ${err.message}`;
      stopGps();
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
  );
}

function stopGps() {
  if (watchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  lastPos = null;
  document.getElementById("toggleGpsBtn").textContent = "GPS計測：開始";
}

function pickFromPool(pool) {
  const totalWeight = pool.reduce((sum, entry) => sum + (entry.weight || 1), 0);
  let roll = Math.random() * totalWeight;
  for (const entry of pool) {
    roll -= (entry.weight || 1);
    if (roll <= 0) {
      return { ...entry };
    }
  }
  return { ...pool[pool.length - 1] };
}

function applyRewardToState(picked) {
  if (picked.type === "coupon") {
    state.coupons.unshift({ shop: picked.shop, discount: picked.discount });
  } else {
    state.items.push(picked);
    if (picked.type === "decor") state.equippedDecor = picked.name;
    if (picked.type === "accessory") state.equippedAccessory = picked.name;
  }
}

function getRarityLabel(rarity) {
  if (rarity >= 3) return "★3 レア";
  if (rarity === 2) return "★2 確定枠対象";
  return "★1";
}

const gachaModal = document.getElementById("gachaModal");
const capsuleHero = document.getElementById("capsuleHero");
const gachaAnimStatus = document.getElementById("gachaAnimStatus");
const gachaCardsGrid = document.getElementById("gachaCardsGrid");
const revealAllGachaBtn = document.getElementById("revealAllGachaBtn");
const closeGachaModalBtn = document.getElementById("closeGachaModalBtn");

let gachaTimers = [];

function clearGachaTimers() {
  gachaTimers.forEach((id) => clearTimeout(id));
  gachaTimers = [];
}

function revealAllGachaCards(results) {
  clearGachaTimers();
  const maxRarity = Math.max(...results.map((r) => r.rarity || 1));
  capsuleHero.classList.remove("shaking");
  capsuleHero.textContent = maxRarity >= 3 ? "✨" : "🎉";
  gachaAnimStatus.textContent = maxRarity >= 3
    ? "★3 アイテム出現！結果を確認してください"
    : "獲得結果を確認してください！";

  gachaCardsGrid.querySelectorAll(".gacha-card").forEach((card) => {
    card.classList.add("revealed");
  });
  revealAllGachaBtn.disabled = true;
  closeGachaModalBtn.disabled = false;
}

function playGachaAnimation(results, isTenPull) {
  clearGachaTimers();
  document.getElementById("gachaModalTitle").textContent = isTenPull
    ? "🎰 10連ガチャ演出"
    : "🎰 ガチャ演出";

  gachaCardsGrid.className = isTenPull ? "gacha-cards-grid" : "gacha-cards-grid single";
  gachaCardsGrid.innerHTML = results
    .map(
      (item) => `
      <div class="gacha-card rarity-${item.rarity || 1}">
        <div class="rarity-tag">${getRarityLabel(item.rarity || 1)}</div>
        <div class="gacha-card-title">${item.label}</div>
      </div>
    `
    )
    .join("");

  capsuleHero.textContent = "🎁";
  capsuleHero.classList.add("shaking");
  gachaAnimStatus.textContent = "カプセルをオープン中...";
  revealAllGachaBtn.disabled = false;
  closeGachaModalBtn.disabled = true;
  gachaModal.classList.add("open");

  const cards = Array.from(gachaCardsGrid.querySelectorAll(".gacha-card"));
  const stepMs = isTenPull ? 95 : 180;
  const openDelayMs = 360;

  const openTimer = setTimeout(() => {
    capsuleHero.classList.remove("shaking");
    capsuleHero.textContent = "🎊";
    gachaAnimStatus.textContent = "アイテム獲得！";

    cards.forEach((card, idx) => {
      const t = setTimeout(() => {
        card.classList.add("revealed");
        if (idx === cards.length - 1) {
          revealAllGachaBtn.disabled = true;
          closeGachaModalBtn.disabled = false;
          const maxRarity = Math.max(...results.map((r) => r.rarity || 1));
          if (maxRarity >= 3) {
            capsuleHero.textContent = "✨";
            gachaAnimStatus.textContent = "★3 ゲット！おめでとうございます！";
          }
        }
      }, idx * stepMs);
      gachaTimers.push(t);
    });
  }, openDelayMs);

  gachaTimers.push(openTimer);
  revealAllGachaBtn.onclick = () => revealAllGachaCards(results);
}

function pullGacha() {
  if (state.tickets <= 0) return;
  state.tickets -= 1;

  const picked = pickFromPool(GACHA_POOL);
  applyRewardToState(picked);

  saveState();
  renderAll();

  const resCard = document.getElementById("gachaResultCard");
  const resText = document.getElementById("gachaResultText");
  resCard.style.display = "block";
  resText.textContent = `[${getRarityLabel(picked.rarity || 1)}] ${picked.label}`;

  playGachaAnimation([picked], false);
}

function pullTenGacha() {
  if (state.tickets < MULTI_GACHA_COUNT) return;
  state.tickets -= MULTI_GACHA_COUNT;

  const guaranteedPool = GACHA_POOL.filter((entry) => (entry.rarity || 1) >= 2);
  const results = [];
  for (let i = 0; i < MULTI_GACHA_COUNT; i += 1) {
    results.push(pickFromPool(GACHA_POOL));
  }

  const hasGuaranteed = results.some((item) => (item.rarity || 1) >= 2);
  if (!hasGuaranteed && guaranteedPool.length > 0) {
    results[results.length - 1] = pickFromPool(guaranteedPool);
  }

  results.forEach((item) => applyRewardToState(item));

  saveState();
  renderAll();

  const resCard = document.getElementById("gachaResultCard");
  const resText = document.getElementById("gachaResultText");
  resCard.style.display = "block";
  resText.innerHTML = `
    <div>10連の結果（★2以上確定）：</div>
    <ol class="gacha-result-list">
      ${results.map((item) => `<li>[${getRarityLabel(item.rarity || 1)}] ${item.label}</li>`).join("")}
    </ol>
  `;

  playGachaAnimation(results, true);
}

closeGachaModalBtn.addEventListener("click", () => {
  clearGachaTimers();
  gachaModal.classList.remove("open");
});

function useItem(index) {
  const item = state.items[index];
  if (!item) return;

  if (item.type === "food") {
    state.hunger = clampStat(state.hunger + 25);
    state.happiness = clampStat(state.happiness + 10);
    state.items.splice(index, 1);
  } else if (item.type === "decor") {
    state.equippedDecor = state.equippedDecor === item.name ? "なし" : item.name;
  } else if (item.type === "accessory") {
    state.equippedAccessory = state.equippedAccessory === item.name ? "" : item.name;
  }

  saveState();
  renderAll();
}

function renderInventory() {
  const wrap = document.getElementById("inventoryList");
  if (state.items.length === 0) {
    wrap.innerHTML = `<span class="small-note">アイテムがありません。ガチャやQRで手に入れましょう！</span>`;
    return;
  }

  wrap.innerHTML = state.items
    .map((item, idx) => {
      let label = item.name;
      let extraClass = "";
      if (item.type === "food") {
        label = `🍖 ${item.name}（あげる）`;
      } else if (item.type === "decor") {
        const active = state.equippedDecor === item.name;
        label = `🛋️ ${item.name}${active ? "（配置中）" : ""}`;
        if (active) extraClass = "selected";
      } else if (item.type === "accessory") {
        const active = state.equippedAccessory === item.name;
        label = `${item.name}${active ? "（装着中）" : ""}`;
        if (active) extraClass = "selected";
      }
      return `<button type="button" class="action-btn ${extraClass}" data-item-idx="${idx}">${label}</button>`;
    })
    .join("");

  wrap.querySelectorAll("[data-item-idx]").forEach((btn) => {
    btn.addEventListener("click", () => useItem(Number(btn.dataset.itemIdx)));
  });
}

function renderAll() {
  document.documentElement.style.setProperty("--font-scale", state.fontScale);
  document.querySelectorAll("[data-scale]").forEach((btn) => {
    btn.classList.toggle("selected", Number(btn.dataset.scale) === Number(state.fontScale));
  });

  renderRoomBackground(ROOM_BG_DATA);
  renderSpriteToCanvas(CHAR_SPRITE_DATA);
  document.getElementById("userNameDisplay").textContent = state.userName;
  document.getElementById("charAccessoryDisplay").textContent = state.equippedAccessory;
  document.getElementById("roomDecorDisplay").textContent = `インテリア：${state.equippedDecor}`;

  document.getElementById("hungerText").textContent = `${state.hunger} / 100`;
  document.getElementById("hungerBar").style.width = `${state.hunger}%`;
  document.getElementById("happyText").textContent = `${state.happiness} / 100`;
  document.getElementById("happyBar").style.width = `${state.happiness}%`;

  const floorDist = Math.floor(state.totalDistance);
  const remainder = floorDist % METERS_PER_TICKET;
  const toNext = remainder === 0 ? METERS_PER_TICKET : METERS_PER_TICKET - remainder;

  document.getElementById("distanceDisplay").textContent = formatDistance(state.totalDistance);
  document.getElementById("nextTicketNote").textContent = `次のガチャ券まで：あと ${toNext} m`;
  document.getElementById("ticketDisplay").textContent = `${state.tickets} 枚`;
  document.getElementById("gachaBtn").disabled = state.tickets <= 0;
  document.getElementById("gacha10Btn").disabled = state.tickets < MULTI_GACHA_COUNT;

  renderInventory();
  renderRanking();
  renderCoupons();
  applyCharPosition();
}

function renderRanking() {
  const list = onlineRankings.length > 0 ? onlineRankings : [
    {
      user_id: state.userId,
      user_name: state.userName,
      user_icon: state.userIcon,
      distance: Math.floor(state.totalDistance)
    }
  ];

  const myIndex = list.findIndex((u) => u.user_id === state.userId);
  const rankLabel = myIndex >= 0 ? `${myIndex + 1}位` : "圏外";
  document.getElementById("myRankSummary").textContent =
    `あなた（${state.userName}）：${rankLabel} ／ ${formatDistance(state.totalDistance)}`;

  const top50 = list.slice(0, 50);
  const listEl = document.getElementById("rankingList");
  listEl.innerHTML = top50
    .map((u, idx) => {
      const isMe = u.user_id === state.userId;
      return `
        <div class="list-row ${isMe ? "me" : ""}">
          <span>${idx + 1}位</span>
          <span>${u.user_icon} ${u.user_name}${isMe ? "（自分）" : ""}</span>
          <span>${u.distance}m</span>
        </div>
      `;
    })
    .join("");
}

function renderCoupons() {
  const listEl = document.getElementById("couponList");
  if (state.coupons.length === 0) {
    listEl.innerHTML = `<div class="card">まだクーポンがありません。ガチャやQRで獲得してみましょう！</div>`;
    return;
  }
  listEl.innerHTML = state.coupons
    .map(
      (c) => `
      <div class="list-row">
        <div>🏬 <strong>${c.shop}</strong></div>
        <strong>${c.discount}</strong>
      </div>
    `
    )
    .join("");
}

function handleScannedQrCode(rawText) {
  const code = (rawText || "").trim();
  const reward = QR_REWARDS[code];
  const resCard = document.getElementById("qrResultCard");
  const resText = document.getElementById("qrResultText");
  resCard.style.display = "block";

  if (!reward) {
    resText.textContent = `未登録のQRコードです（読み取り値: ${code || "空"}）`;
    return;
  }

  if (state.claimedQrCodes.includes(code)) {
    resText.textContent = `${reward.title} のQRコードはすでに受け取り済みです。`;
    return;
  }

  state.claimedQrCodes.push(code);
  state.items.push(reward.item);
  if (reward.item.type === "decor") state.equippedDecor = reward.item.name;
  if (reward.item.type === "accessory") state.equippedAccessory = reward.item.name;
  state.coupons.unshift(reward.coupon);

  saveState();
  renderAll();
  resText.textContent =
    `${reward.title} から「${reward.item.label}」と「${reward.coupon.shop}（${reward.coupon.discount}）」を獲得！`;
}

const qrVideo = document.getElementById("qrVideo");
const qrCanvas = document.getElementById("qrCanvas");
const qrCtx = qrCanvas.getContext("2d", { willReadFrequently: true });
let qrStream = null;
let qrRafId = null;

async function startQrCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    document.getElementById("qrStatusText").textContent =
      "この環境ではカメラAPIを利用できません（テストボタンをお試しください）";
    return;
  }

  try {
    qrStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    qrVideo.srcObject = qrStream;
    qrVideo.style.display = "block";
    document.getElementById("qrPlaceholder").style.display = "none";
    document.getElementById("startQrBtn").disabled = true;
    document.getElementById("stopQrBtn").disabled = false;
    document.getElementById("qrStatusText").textContent = "QRコードをスキャン中...";
    await qrVideo.play();
    scanQrFrame();
  } catch (err) {
    document.getElementById("qrStatusText").textContent =
      `カメラを起動できませんでした: ${err.message}`;
  }
}

function stopQrCamera() {
  if (qrRafId !== null) {
    cancelAnimationFrame(qrRafId);
    qrRafId = null;
  }
  if (qrStream) {
    qrStream.getTracks().forEach((t) => t.stop());
    qrStream = null;
  }
  qrVideo.pause();
  qrVideo.srcObject = null;
  qrVideo.style.display = "none";
  document.getElementById("qrPlaceholder").style.display = "block";
  document.getElementById("startQrBtn").disabled = false;
  document.getElementById("stopQrBtn").disabled = true;
  document.getElementById("qrStatusText").textContent = "カメラを停止しました";
}

function scanQrFrame() {
  if (!qrStream) return;
  if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {
    qrCanvas.width = qrVideo.videoWidth;
    qrCanvas.height = qrVideo.videoHeight;
    qrCtx.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);
    const imageData = qrCtx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });
    if (code && code.data) {
      stopQrCamera();
      handleScannedQrCode(code.data);
      return;
    }
  }
  qrRafId = requestAnimationFrame(scanQrFrame);
}

document.getElementById("startQrBtn").addEventListener("click", startQrCamera);
document.getElementById("stopQrBtn").addEventListener("click", stopQrCamera);
document.querySelectorAll("[data-sim-qr]").forEach((btn) => {
  btn.addEventListener("click", () => handleScannedQrCode(btn.dataset.simQr));
});

const mgModal = document.getElementById("minigameModal");
const mgStage = document.getElementById("mgStage");
const mgTarget = document.getElementById("mgTarget");
let mgInterval = null;
let mgScore = 0;
let mgRunning = false;

function moveMgTarget() {
  const maxX = mgStage.clientWidth - 40;
  const maxY = mgStage.clientHeight - 40;
  const x = 20 + Math.random() * Math.max(20, maxX);
  const y = 20 + Math.random() * Math.max(20, maxY);
  mgTarget.style.left = `${x}px`;
  mgTarget.style.top = `${y}px`;
}

function startMinigame() {
  mgScore = 0;
  mgRunning = true;
  let leftSec = 5.0;
  document.getElementById("mgScore").textContent = "0";
  document.getElementById("mgTimer").textContent = "5.0";
  document.getElementById("mgResultNote").textContent = "ハートをタップしよう！";
  mgModal.classList.add("open");
  moveMgTarget();

  clearInterval(mgInterval);
  mgInterval = setInterval(() => {
    leftSec = Math.max(0, Number((leftSec - 0.1).toFixed(1)));
    document.getElementById("mgTimer").textContent = leftSec.toFixed(1);
    if (leftSec <= 0) {
      clearInterval(mgInterval);
      mgRunning = false;
      const gain = Math.min(25, Math.max(5, mgScore * 2));
      state.happiness = clampStat(state.happiness + gain);
      saveState();
      renderAll();
      document.getElementById("mgResultNote").textContent =
        `終了！嬉しさが +${gain} 上がりました！`;
    }
  }, 100);
}

mgTarget.addEventListener("click", () => {
  if (!mgRunning) return;
  mgScore += 1;
  document.getElementById("mgScore").textContent = String(mgScore);
  moveMgTarget();
});

document.getElementById("openMinigameBtn").addEventListener("click", startMinigame);
document.getElementById("closeMinigameBtn").addEventListener("click", () => {
  clearInterval(mgInterval);
  mgRunning = false;
  mgModal.classList.remove("open");
});

const tabButtons = document.querySelectorAll(".tab-btn");
const screens = document.querySelectorAll(".screen");
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    if (targetId !== "qr") stopQrCamera();
    if (targetId === "home") {
      startCharMovement();
    } else {
      stopCharMovement();
    }
    if (targetId === "ranking") fetchOnlineRankings();
    tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
    screens.forEach((s) => s.classList.toggle("active", s.id === targetId));
  });
});

document.getElementById("refreshRankingBtn").addEventListener("click", fetchOnlineRankings);

document.querySelectorAll("[data-scale]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.fontScale = Number(btn.dataset.scale);
    saveState();
    renderAll();
  });
});

const modal = document.getElementById("profileModal");
const usernameInput = document.getElementById("usernameInput");
let selectedIcon = state.userIcon;

function openProfileModal(isInitial) {
  document.getElementById("modalTitle").textContent = isInitial ? "ユーザー登録" : "プロファイル編集";
  usernameInput.value = state.registered ? state.userName : "";
  selectedIcon = state.userIcon;
  document.querySelectorAll("#iconChoices [data-icon]").forEach((b) => {
    b.classList.toggle("selected", b.dataset.icon === selectedIcon);
  });
  modal.classList.add("open");
}

document.querySelectorAll("#iconChoices [data-icon]").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedIcon = btn.dataset.icon;
    document.querySelectorAll("#iconChoices [data-icon]").forEach((b) => {
      b.classList.toggle("selected", b === btn);
    });
  });
});

document.getElementById("saveProfileBtn").addEventListener("click", async () => {
  const name = usernameInput.value.trim();
  state.userName = name || "ゲスト";
  state.userIcon = selectedIcon;
  state.registered = true;
  saveState();
  renderAll();
  modal.classList.remove("open");
  await syncMyScoreToSupabase();
  await fetchOnlineRankings();
});

document.getElementById("openProfileBtn").addEventListener("click", () => openProfileModal(false));

document.querySelectorAll("[data-add-dist]").forEach((btn) => {
  btn.addEventListener("click", () => addDistance(Number(btn.dataset.addDist)));
});

document.getElementById("gachaBtn").addEventListener("click", pullGacha);
document.getElementById("gacha10Btn").addEventListener("click", pullTenGacha);

document.getElementById("toggleGpsBtn").addEventListener("click", () => {
  if (watchId !== null) stopGps();
  else startGps();
});

document.getElementById("resetDataBtn").addEventListener("click", () => {
  stopGps();
  stopQrCamera();
  clearInterval(mgInterval);
  mgRunning = false;
  clearGachaTimers();
  gachaModal.classList.remove("open");
  state = {
    ...DEFAULT_STATE,
    userId: generateUserId(),
    items: [{ type: "food", name: "ほねっこ", label: "餌：ほねっこ", rarity: 1 }],
    claimedQrCodes: []
  };
  saveState();
  document.getElementById("gachaResultCard").style.display = "none";
  document.getElementById("qrResultCard").style.display = "none";
  renderAll();
  resetCharMovement();
  openProfileModal(true);
});

// Realtime 購読（他の人が移動距離を更新したら自動でランキング表を更新）
if (supabaseClient) {
  supabaseClient
    .channel("public:rankings")
    .on("postgres_changes", { event: "*", schema: "public", table: "rankings" }, () => {
      fetchOnlineRankings();
    })
    .subscribe();
}

renderAll();
startCharMovement();
if (!state.registered) {
  openProfileModal(true);
} else {
  syncMyScoreToSupabase().then(fetchOnlineRankings);
}