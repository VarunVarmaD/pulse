# Build stage
FROM golang:1.25.0-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

RUN go build -o worker main.go

# Final stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/worker .

CMD ["/app/worker"]

