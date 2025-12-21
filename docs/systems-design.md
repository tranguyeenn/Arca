← Back to [Readme](https://github.com/tranguyeenn/Arca/blob/main/docs/README.md)

# System Design (MVP)
This document defines the system architecture and core data models for the Arca MVP. 
It describes the responsibilities of each service and the data stored by the system.
This is the source of the ruth for backend and frontend integration.

--------
## High-Level Architecture
Arca follows a service-oriented architecture with clear boundaries between concerns.

Frontend (Web App)
- Backend API
- ML Extraction Service
- Supabase (Database + Scheduler)

Each Service has a single responsibility and does not duplicate logic owned by another layer.

--------
## Service Responsibilities

### Frontend (Web)

**Purpose**
- Everything the user sees and interacts with

**Owns**
- UI Components
- Upload flow
- Review interfaces
- Progress display
- Authentication UI

**Does NOT Own**
- Business logic
- Spaced repetition scheduling
- Data persistence
- ML Processing

The frontend displays state returned by the backend and sends user actions as events

--------

### Backend API
**Purpose**
- Central coordinator and source of truth

**Owns**
- User validation
- Document ingestion
- Writhing and reading data from the databases
- Triggering ML extraction
- Recording revie results
- Updating spaced repetition schedules

**Avoids**
- UI logic
- ML model execution
- Direct database exposure to frontend

The backend is responsible for enforcing all system rules

--------
**ML Extraction Service**
- Convert raw learning material into structured study content

**Owns**
- Text extraction from PDFs and slides
- Concept identification
- Summary generation
- Micro-question generation
- Difficulty estimation

**Avoids**
- Database access
- Authentication
- Scheduling logic
- UI concerns

This service returns structured JSON to the backend.

---

### Supabase Platform

#### Database

**Owns**
- Persistent data storage
- User records
- Learning content
- Review history
- Spaced repetition schedules

#### Scheduled Functions

**Purpose**
- Run daily scheduling maintenance
- Flag overdue questions
- Maintain schedule integrity

Scheduled functions do not communicate with frontend or ML services.

---

## Core Data Models

### User

Represents an authenticated user of Arca.

- `id`
- `email`
- `created_at`

---

### Document

Represents an uploaded learning file.

- `id`
- `user_id`
- `filename`
- `storage_path`
- `uploaded_at`

---

### Concept

Represents a key concept extracted from a document.

- `id`
- `document_id`
- `concept_text`
- `summary`
- `difficulty`
- `created_at`

---

### Question

Represents a reviewable learning unit.

- `id`
- `user_id`
- `concept_id`
- `question_text`
- `answer`
- `created_at`

---

### Review

Represents a single review attempt.

- `id`
- `user_id`
- `question_id`
- `is_correct`
- `confidence_level`
- `reviewed_at`

---

### Schedule

Represents spaced repetition state for a question.

- `id`
- `user_id`
- `question_id`
- `interval_days`
- `next_due_at`
- `last_review_at`
- `last_result`
- `review_count`
- `created_at`

Scheduling logic is defined in [spaced-rep.md](https://github.com/tranguyeenn/Arca/blob/main/docs/spaced-rep.md).

---

## Data Flow (MVP)

### Document Upload

1. User uploads a document via frontend
2. Frontend sends file to backend
3. Backend records document metadata
4. Backend sends file to ML service
5. ML service returns structured concepts and questions
6. Backend stores results in database
7. Backend initializes spaced repetition schedules

---

### Review Session

1. Frontend requests due questions
2. Backend queries schedules
3. Backend returns due questions
4. User submits answer and confidence
5. Backend records review
6. Backend updates schedule
7. Updated due dates are stored

---

## Design Principles

- Backend is the single source of truth
- Scheduling logic is centralized
- Services communicate through well-defined contracts
- No service oversteps its responsibility
- MVP favors clarity and correctness over optimization

---

## Summary

This system design defines a clear separation of concerns and a minimal but complete
architecture for the Arca MVP. It enables reliable content ingestion, adaptive review
scheduling, and a clean path for future expansion without overcomplicating the initial build.


