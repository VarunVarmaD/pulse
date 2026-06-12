package main

import (
    "database/sql"
    "fmt"
    "log"
    "os"

    "github.com/joho/godotenv"
    _ "github.com/lib/pq"
)

type MonitorStatus string

const (
    MonitorStatusUp MonitorStatus = "up"
    MonitorStatusDown MonitorStatus = "down"
    MonitorStatusDegraded MonitorStatus = "degraded"
)

type Monitor struct{
    MonitorID int
    UserID int
    URL string
    DomainName string
    Status monitor_status
    StatusCode int
    ResponseTime int
    Interval int
    LastCheckedAt time.Time
    CreatedAt time.Time
}

func main() {
    // Load .env
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Build connection string using os.Getenv
    connStr := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASS"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )

    // Open connection
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }

    // Verify connection
    err = db.Ping()
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Connected to database")
}

