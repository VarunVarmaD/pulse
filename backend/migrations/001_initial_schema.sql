CREATE TYPE monitor_status AS ENUM ('up', 'down', 'degraded');

CREATE TABLE users
(
    user_id       SERIAL PRIMARY KEY,
    name          VARCHAR(50)         NOT NULL,
    password_hash VARCHAR(60)         NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    created_at    TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    last_login    TIMESTAMPTZ
);

CREATE TABLE monitors
(
    monitor_id      SERIAL PRIMARY KEY,
    user_id         INT            NOT NULL REFERENCES users (user_id),
    url             VARCHAR(255)   NOT NULL,
    domain_name     VARCHAR(50),
    status          monitor_status NOT NULL DEFAULT 'up',
    status_code     INT,
    response_time   INT,
    interval        INT,
    last_checked_at TIMESTAMPTZ,
    created_at      TIMESTAMPTZ             DEFAULT NOW()
);

CREATE TABLE checks
(
    check_id      SERIAL PRIMARY KEY,
    monitor_id    INT NOT NULL REFERENCES monitors (monitor_id),
    response_time INT,
    status_code   INT,
    checked_at    TIMESTAMPTZ DEFAULT NOW(),
    is_successful BOOLEAN
);

CREATE TABLE incidents
(
    incident_id SERIAL PRIMARY KEY,
    monitor_id  INT         NOT NULL REFERENCES monitors (monitor_id),
    started_at  TIMESTAMPTZ NOT NULL,
    ended_at    TIMESTAMPTZ,
    cause       VARCHAR(255)
);