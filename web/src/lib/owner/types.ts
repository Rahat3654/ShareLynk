// TypeScript mirrors of the owner schemas in the ShareLynk backend
// (backend/app/schemas/schemas.py). Field names are snake_case because these
// are the wire shapes exactly as FastAPI serialises them — do not rename them
// here, or a backend change stops being a type error and becomes `undefined`
// at runtime.

/** POST /api/owners/auth/login | verify-login-otp | refresh-token */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

/** GET /api/owners/profile, GET /api/owners/auth/me */
export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  photo_url: string | null;
  is_verified: boolean;
  created_at: string;
  last_login: string | null;
}

/** GET /api/owners/dashboard */
export interface OwnerDashboard {
  total_routers: number;
  active_routers: number;
  pending_routers: number;
  current_active_connections: number;
  today_connections: number;
  month_connections: number;
  monthly_earnings: number;
  total_earnings: number;
  available_balance: number;
  pending_withdrawals: number;
  /**
   * Recorded Wi-Fi use in hours across all networks (sum of session
   * durations). Optional: absent from backends older than this field.
   */
  total_usage_hours?: number;
  month_usage_hours?: number;
  today_usage_hours?: number;
}

/** GET /api/owners/earnings */
export interface OwnerEarnings {
  available_balance: number;
  today_earnings: number;
  weekly_earnings: number;
  monthly_earnings: number;
  lifetime_earnings: number;
  pending_withdrawals: number;
  completed_withdrawals: number;
  total_usage_hours: number;
  today_usage_hours: number;
  month_usage_hours: number;
  total_sessions: number;
}

/**
 * GET /api/owners/analytics
 *
 * `daily` and `monthly` are `List[dict]` on the backend, so their shape is not
 * pinned by a Pydantic model. They are read defensively via readSeries() in
 * lib/owner/series.ts rather than being trusted as a fixed contract.
 */
export interface OwnerAnalytics {
  current_active_connections: number;
  today_connections: number;
  weekly_connections: number;
  monthly_connections: number;
  peak_hour: number | null;
  avg_session_minutes: number;
  unique_users: number;
  returning_users: number;
  daily: Record<string, unknown>[];
  monthly: Record<string, unknown>[];
}

/**
 * GET /api/owners/routers
 *
 * The backend calls these "routers"; the site calls them Wi-Fi networks. The
 * wire type keeps the backend's name so the mapping stays visible at the edge.
 */
export interface OwnerRouter {
  id: string;
  ssid: string;
  network_type: string;
  status: string;
  enabled: boolean;
  password_verified: boolean;
  connection_limit: number | null;
  /** Set by admins only — read-only here (backend commit 8eb89b0). */
  rate_per_minute: number;
  ownership_document_url: string | null;
  source: string;
  shop_id: string | null;
  review_note: string | null;
  connected_users: number;
  monthly_connections: number;
  earnings: number;
  /** Lifetime hours of recorded use on this network. Optional: older backends omit it. */
  usage_hours?: number;
  created_at: string;
}

/** GET /api/owners/withdrawals */
export interface Withdrawal {
  id: string;
  amount_bdt: number;
  method: string;
  account_details: string;
  status: string;
  admin_note: string | null;
  created_at: string;
  processed_at: string | null;
}

/** GET /api/owners/withdrawals/config */
export interface WithdrawalConfig {
  minimum_bdt: number;
  methods: string[];
}

/** GET /api/owners/notifications */
export interface OwnerNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}
