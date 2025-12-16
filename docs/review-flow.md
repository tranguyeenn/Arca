← Back to [Readme](https://github.com/tranguyeenn/Arca/blob/main/docs/README.md)

# Review Flow

This document defines the step-by-step flow of a review session in the Arca MVP. It describes what happens when a user reviews study material and how the system updates future review scheduling.

--------

## Entry Point
1. User navigates to the review page
2. User clicks "Start Review"

--------

## Fetch Due Questions
3. The system retrieves all question that are due for review
   - A quesstion is considered due if 'next_due_at' is today or earlier
   - If no questions are due, the system displays a completion status

--------

## Question Presentation
4. The system selects the next due question.
5. The question prompt is displayed to the user
6. The answer is hidden by default
7. The user reveals the answer when ready

--------

## User Response
8. The user selects a confidence level for their answer:
   - Again
   - Hard
   - Good
   - Easy

This input represents the user's perceived mastery of the question

--------

## Review Recording
9. The system records the review result:
    - Question ID
    - Selected Confidence Level
    - Timestamp of Review
  
--------

## Scheduling Update
10. The system updates the question's spaced repetition data:
    - Adjusts the review interval
    - Updates the next due date
    - Stores the last review result

The scheduling logic is deterministic and based on predefined rules

--------

## Continue or Exit
11. The system advances to the next due question
12. Steps 4-11 repeat until no due question is remain
13. The review session ends

--------

## Review Completion
14. The system displays a completion state indicating
    - All due qursitons have been reviewed
    - The user may return later for the next scheduled session
