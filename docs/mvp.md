← Back to [Readme](https://github.com/tranguyeenn/Arca/blob/main/docs/README.md)

# Arca MVP

## What Arca is 

Arca is a web-based study platform that converts uploaded learning materials into strucure, reviewable knowledge and helps user retains that knowledge long-term through adaptive spaced repetition.

At its core, Arca automates the full study loop:
- Ingest learning materials
- Convert them into structured concepts and questions
- Schedule review based on user performance
- Surface the right questions at the right time

Arca is designed to reduce cognitive overhead for students by removing the need to manually create, organize, and schedule study materials.

--------
## Target User (MVP)
Primary target users for the MVP:
- College, graduate and post-grad students
- High school students

These users:
- Study from PDFs, slides, and notes
- Need efficient long-term retention
- Are overwhelmed by disorganized materials and ad-hoc studying

--------
## Core User Problem
Students struggle with 
- Turning raw materials into usable study content
- Knowing what to review and when
- Retaining infomration long-term instead of cramming

Existing tools either:
- Require too much manual setup, or
- Do not adapt review schedules based on actual performances

--------
## Arca MVP Solution

Arca solves this by providing:

1. **Automated Content Structuring**
   - Users upload PDFs or slides
   - Arca extracts concepts, summaries, and micro-questions
   - Content is stored as structured learning units

2. **Adaptive Spaced Repetition**
   - Each question is scheduled for review
   - Review intervals change based on user performance
   - Questions reappear until mastery is demonstrated

3. **Guided Review Flow**
   - Users are shown only questions due for review
   - Each review updates future scheduling
   - The system, not the user, decides what comes next

---
## MVP Feature Set (What We Are Building)

### 1. Document Upload
- Upload PDFs or slides through the web app
- Store document metadata
- Trigger extraction and question generation

### 2. Concept & Question Generation
- Extract key concepts from uploaded material
- Generate summaries per concept
- Generate micro-questions tied to those concepts

### 3. Review Session
- Display questions due for review
- Allow users to answer questions
- Record correctness and review history

### 4. Spaced Repetition Scheduling
- Assign initial review intervals
- Update intervals based on performance
- Compute next review date for each question

### 5. Progress Visibility (Basic)
- Show which documents and questions exist
- Show review completion status
- No advanced analytics in MVP

---
## What “Done” Means for the MVP

The MVP is considered complete when:
- A user can upload a document
- Arca generates concepts and questions
- The user can review questions over multiple days
- Review timing changes based on correctness
- The system reliably surfaces “due” questions

If this works end-to-end, Arca is real.

---
## What Is Explicitly NOT in the MVP

The following are intentionally excluded from the MVP:

- Mobile apps
- Social or collaborative features
- AI chat tutors
- Knowledge graphs
- Exam simulations
- Advanced analytics dashboards
- Institutional or enterprise tooling
- Gamification systems (streaks, badges, etc.)

These features may exist later, but they do not define MVP success.

---
## Product Philosophy (MVP)

- Backend is the source of truth
- Frontend displays state, not logic
- Scheduling decisions are deterministic
- Simplicity beats cleverness
- Working beats impressive

The MVP prioritizes correctness, clarity, and learning effectiveness over polish.

---
## Summary

Arca MVP is a focused system that:
- Converts learning materials into structured study content
- Uses adaptive spaced repetition to optimize retention
- Guides users through a clean, automated review loop

Everything else is future work.



