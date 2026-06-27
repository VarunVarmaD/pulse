CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

DO $$ BEGIN
    CREATE TYPE monitor_status AS ENUM ('up', 'down', 'degraded');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users (
    user_id       SERIAL PRIMARY KEY,
    name          VARCHAR(50),
    password_hash VARCHAR(60)         NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    created_at    TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    last_login    TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS monitors (
    monitor_id      SERIAL PRIMARY KEY,
    user_id         INT            NOT NULL REFERENCES users (user_id),
    url             VARCHAR(255)   NOT NULL,
    domain_name     VARCHAR(50),
    status          monitor_status NOT NULL DEFAULT 'up',
    status_code     INT,
    response_time   INT,
    interval        INT,           -- ping interval in seconds
    last_checked_at TIMESTAMPTZ,
    created_at      TIMESTAMPTZ             DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checks (
    checked_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    monitor_id    INT NOT NULL REFERENCES monitors (monitor_id),
    response_time INT,
    status_code   INT,
    is_successful BOOLEAN
);

CREATE TABLE IF NOT EXISTS incidents (
    incident_id SERIAL PRIMARY KEY,
    monitor_id  INT         NOT NULL REFERENCES monitors (monitor_id),
    started_at  TIMESTAMPTZ NOT NULL,
    ended_at    TIMESTAMPTZ,
    cause       VARCHAR(255)
);

SELECT create_hypertable('checks', 'checked_at', if_not_exists => TRUE);