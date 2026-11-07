CREATE TABLE IF NOT EXISTS registries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  occasion TEXT NOT NULL,
  location TEXT NOT NULL,
  event_date TEXT,
  purchase_options TEXT NOT NULL DEFAULT '["online","in_store"]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_registries_name ON registries(name);
CREATE INDEX IF NOT EXISTS idx_registries_title ON registries(title);
