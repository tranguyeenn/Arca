← Back to [Readme](https://github.com/tranguyeenn/Arca/blob/main/docs/README.md)

# Spaced Repetition Logic (MVP)
This document defines the spaced repetition rules used in the Arca MVP.
The goal is to schedule review quesions in a way that optimizes long-term retention while remaining simple, predictable, and debuggable.

--------

## Core Principles
- Scheduling logic lives in the backend
- Frontend does not compute intervals
- Scheduling is deterministic
- Simplicity > cleverness
- The system adpts based on uer performance over time

--------

## Scheduling State per Question
Each question maintains the following scheduling fields:
- 'interval_days': number of days until the next review
- 'ease_factor': represents how easily the user remembers the question
- 'next_due_at': timestamp for the next scheduled review
- 'last_review_at': timestamp of the most recent review
- 'review_count': total number of times reviewed
- 'last_result': result of the mosst recent review

--------

## Review Inputs
During a review, the user provides:
1. **Answer outcomes**
   - Correct or incorrect
  
2. **Confidence level**
   - Again
   - Hard
   - Good
   - Easy
These inputs are recorded for every review attempt

--------

## Initial Scheduling
When a questioon is first created:
- 'interval_days' = 3
- 'ease_factor' = 2.5
- 'next_due_at' = now + interval_days
- 'review_count' = 0

--------

## Scheduling Rules
### If The Answer Is Incorrect

- 'interval_days' is reset to 1
- 'ease_factor' is decreased slightly
- 'last_result' is set to 'incorrect'

The question should reappear soon to reinforce learning.

--------

### If The Answer Is Correct
The new interval is determined by confidence level:

#### Again
- Treat as a near-failure
- 'interval_days' = max(1. interval_days * 0.5)
- Slight decrease to 'ease_factor'

#### Hard
- Small increase in interval
- 'interval_days' *= 1.2
- No change or sligh decrease to 'ease_factor'

#### Good
- Normal progression
- 'interval_days" *= ease_factor
- 'ease_factor' remains stable

#### Easy
- Agressive increase
- 'interval_days' = interval_days * (ease_factor + 0.3)
- Slight increase to 'ease_factor'

--------

## Interval Constraints
- Minimum interval: 1 day
- Maximum interval: implementation-defined (e.g. 180 days)
- All intervals are rounded to whole days

--------

## Review Count Updates
After ever review:
- 'review_count' is incremented
- 'last_review_at' is updated
- 'next_due_at' is recalculated using the new interval

--------

## Daily Scheduler Behavior
A daily scheduled job:
- Flags questions as due if 'next_due_at <= today'
- Does not change intervals on its own
- Ensures overdue questions are surfaced

--------

## MVP Notes
- Exact multipliers may be turned later
- No ML-based adaptation in MVP
- No cross-question dependency
- Each question is scheduled independently

--------

## Summary
Arca's spaced repetition system:
- Respond to user performance
- Gradually increases review intervals
- Reinforces weak araes
- Avoids uneccessary complexity

This logic provides a solid foundation for future learning analytics and adaptive improvements
