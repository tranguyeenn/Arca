# Arca API Specification (MVP)
This document defines the **public backend API contract* for the Arca MVP.

All frontend, backend, and helper utilities **must conform to this spec**.
Any changes require discussion and explicit agreement

---

## General Rules
- All endpoints require authentication
- User identity is derived from the Supabase Auth ('user_id')
- Frontend must **not*** implement business logic
- Backend must **not** depend on UI state
- API responses must match the defined shapes exactly

---

## Authentication
- Supaabse Auth is used for all requests
- API handlers extract 'user_id' from the auth context
- Requests without valid auth should return '401 Unauthorized'

---

## Endpoints

---

### GET '/health'

#### Purpose
Heatlh check endpoint to verify backend availability

#### Auth
Not required

#### Response
``` json
{
  "status": "ok"
}
```

#### Notes
- Used for deployment and sanity checks
- No business logic

---

### GET '/reviews/due'

#### Purpose
Fetch all questions that are due for review for the authenticated user

#### Auth
Required

#### Request
No request body.

#### Behavior
- Use user_id from auth context
- Fetch questions where next_due_at <= now
- Order results by next_due_at ascending

#### Response
``` json
[
  {
    "question_id": "string",
    "question_text": "string",
    "next_due_at": "ISO-8601 string"
  }
]
```

#### Notes
- Response may be an empty array
- No scheduling logic occurs here
- Endpoint is read-only

---

### POST '/reviews/submit'

#### Purpose
Submit the result of single review attempt

#### Auth
Required

#### Request Body
``` json
{
  "question_id": "string",
  "is_correct": true,
  "confidence": 3
}
```

#### Validation
- Input must be validated and normalized before use
- Invalid inputs returns 400 Bad Request

#### Behavior
- Verify question ownership using user_id
- Insert a review record
- Update scheduling state
- Return success response

#### Response
``` json
{
  "success": true
}
```

#### Notes
- Scheduling logic is executed server-side
- Frontend does not calculated next due date
- One request = one review submission

---

## Error Responses
All error responses must follow this shape:
``` json
{
  "error": "string"
}
```

### Common Status Codes
- '400' - Invalid input
- '401' - Unauthorized
- '403' - Forbidden (Ownership violation)
- '500' - Internal server error

---
## Out of Scope (MVP)
- Bulk review submission
- Review history endpoints
- Analytics or stats endponts
- User settings
- ML explanation or feedback generation

---

## Ownership Rules
- All data access is scoped to user_id
- Users may only access their own questions and reviews
- Ownership checks are enforced server-side

---

## Versioning
- This document defines API v1 (MVP)
- Breaking changes require:
  - Updating this document
  - Coordinated frontend and backend changes
