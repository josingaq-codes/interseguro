# Interseguro Matrix & Result APIs

## General Information

- Both services expect JSON payloads and respond with JSON.
- Protect every endpoint except the status ping and signin using the header `Authorization: Bearer <token>`.
- Use `Content-Type: application/json` on every request that carries a body.

## API Matrix

- **Base URL:** https://api-matrix.zyncplay.me

### Authentication

- **POST /api/auth/signin**
  - **Body:**
    ```json
    {
      "email": "jose.inga@email.com",
      "password": "J0S3!NG@26"
    }
    ```
  - **Response 200:**
    ```json
    {
      "token": "<jwt-token>"
    }
    ```
  - **Errors:** `401` for invalid credentials, `400` for malformed body.
- **GET /api/auth/me**
  - **Headers:** `Authorization: Bearer <token>`
  - **Response 200:**
    ```json
    {
      "user": {
        "id": "<uuid>",
        "email": "user@example.com"
      }
    }
    ```
  - **Errors:** `401` if the token is missing or invalid.

### Status

- **GET /api/status/ping**
  - **Response 200:**
    ```json
    {
      "message": "pong"
    }
    ```

### QR Decomposition

- **POST /api/matrix/qr**
  - **Headers:** `Authorization: Bearer <token>`
  - **Body:**
    ```json
    {
      "matrix": [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
    }
    ```
    - Matrix must be rectangular, numeric, and have at least as many rows as columns.
  - **Response 200:**
    ```json
    {
      "Q": [[...],[...],[...]],
      "R": [[...],[...],[...]],
      "maximum": 12.34,
      "minimum": -5.67,
      "average": 1.23,
      "diagnonal": [
        [..., ..., ...],
        [..., ..., ...]
      ]
    }
    ```
  - **Errors:** `400` for validation issues, `401` when authorization fails.

## API Result

- **Base URL:** https://api-result.zyncplay.me

### Results Metrics

- **POST /api/results**
  - **Headers:** `Authorization: Bearer <token>`
  - **Body:**
    ```json
    {
      "Q": [[...],[...],[...]],
      "R": [[...],[...]]
    }
    ```
    - `Q` must be an m x n array of numbers.
    - `R` must be an n x n array of numbers.
  - **Response 200:**
    ```json
    {
      "maximum": 12.34,
      "minimum": -5.67,
      "average": 1.23,
      "diagnonal": [
        [1.0, 1.0, 1.0],
        [4.5, 3.2]
      ]
    }
    ```
  - **Errors:** `400` for validation issues, `401` when authorization fails.

## Error Handling Summary

- `400 Bad Request` when the JSON body is invalid or fails schema validation.
- `401 Unauthorized` when the Bearer token is missing, expired, or invalid.
- `500 Internal Server Error` for unexpected runtime failures.

## Suggested Workflow

1. Sign in via API Matrix to obtain a JWT token.
2. Call POST /api/matrix/qr with the source matrix to receive matrices Q and R.
3. Call POST /api/results with the Q and R matrices to retrieve aggregated metrics.
