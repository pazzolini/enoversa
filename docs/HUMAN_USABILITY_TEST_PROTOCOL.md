---
title: "Enoversa human usability test protocol"
updated: "2026-07-21"
status: "Ready to run"
---

# Enoversa human usability test protocol

## Purpose

This lightweight test checks whether a first-time reader understands Enoversa, can move between its editorial sections and can complete the site's primary discovery tasks without prompting. It complements automated accessibility and browser testing; it does not replace either.

Do not mark this protocol complete without real participants and recorded observations. Use anonymous participant identifiers and do not collect personal data that is unnecessary for the test.

## Participants and setup

- Recruit at least three people who have not worked on the current site.
- Include at least one mobile and one desktop session.
- Include a keyboard-only session in at least one test.
- Use the production build or a preview of the exact release candidate.
- Allow 10–15 minutes per participant.
- Ask participants to think aloud, but do not explain the interface or wine terminology during a task.

## Five-second test

Show the homepage for five seconds, then hide it and ask:

1. What is this site about?
2. What kind of material would you expect to find?
3. What do you remember most clearly?

Pass when every participant identifies it as an independent wine publication or journal, and at least two recall a specific editorial cue rather than only “a dark website”.

## Tasks

Give one task at a time:

1. Find the most recently tasted wine and explain what the score represents.
2. Filter Selections to wines from Spain, then return to the complete list.
3. Find a recommended wine bar and open its external map link.
4. Find the current Portrait and identify the person, place and nature of the article.
5. Return to the homepage and find the Legacy Archive.
6. With keyboard only, open and close the Index, move to Essays and return using browser Back.

For each task, record completion, time, wrong turns, hesitation, language used by the participant and any facilitator prompt.

## Comprehension questions

- How are Selections different from Portraits and Essays?
- Are the Addresses paid placements or ranked recommendations?
- What would you expect “Volume II” and “Legacy Archive” to contain?
- Was anything visually interactive that did not behave as expected?

## Acceptance criteria

- At least 80% of all tasks are completed without a facilitator prompt.
- Every participant completes tasks 1, 3 and 6.
- No participant reports a keyboard trap, unreadable text or loss of orientation.
- Every participant distinguishes at least three of the four editorial sections.
- No false affordance is observed by more than one participant.
- Any issue that blocks a primary task is fixed and retested before release.

## Results record

| Participant | Device/input | Five-second result | Tasks completed without help | Critical issue | Notes |
| --- | --- | --- | ---: | --- | --- |
| P01 |  |  |  |  |  |
| P02 |  |  |  |  |  |
| P03 |  |  |  |  |  |

## Issue log

| Priority | Observation | Evidence | Decision | Retest |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Sign-off

```text
Release candidate:
Test dates:
Facilitator:
Participants completed:
Acceptance criteria met: yes / no
Open critical issues:
Decision:
```
