
---
name: test-and-repair
description: Design and execute unit, integration, UI and end-to-end tests for existing code, investigate failures systematically, fix root causes, add regression coverage, and verify results. Use after implementation, when a bug is reported, or before release.
---

# Test and Repair

## Preparation

Read project instructions and memory.
Inspect the actual test scripts and framework.
Check Git changes before running commands that may alter files.
Use Superpowers test-driven-development and systematic-debugging
when available and applicable.

## Test design

Build tests around observable behavior and acceptance criteria.

Include relevant cases for:
- Normal success paths.
- Invalid and missing input.
- Boundary values.
- Empty data.
- Loading and asynchronous transitions.
- API failures, timeouts and rejected responses.
- Authentication and authorization.
- State transitions and persistence.
- Navigation and browser refresh.
- Responsive behavior and keyboard interaction.
- Regression of existing functionality.

Do not create unnecessary tests for irrelevant implementation details.

## Execution order

1. Run the smallest relevant test.
2. Verify that a regression test fails when the defect is present,
   if the failure can be reproduced safely.
3. Implement the fix.
4. Rerun the failing test.
5. Run related unit and integration tests.
6. Run end-to-end tests for critical flows when available.
7. Run lint, typecheck and build as applicable.
8. Inspect the final diff and rerun checks affected by later edits.

Use commands from the actual project configuration.
Do not assume a particular language, package manager or test runner.

## Failure investigation

For every failure:
- Preserve the exact failing command and useful error output.
- Reproduce the failure.
- Separate product defects from environment and configuration issues.
- Trace the failure to its root cause.
- Make one focused change where practical.
- Add regression coverage.
- Rerun the test and verify the outcome.

Do not:
- Delete assertions to get green tests.
- Skip failing tests without a justified, documented reason.
- Mock the behavior that the test is supposed to verify.
- Change production behavior solely to satisfy a flawed test.
- Claim a failure is fixed without a successful recheck.

## Browser testing

If browser automation exists:
- Start the real application.
- Exercise the actual user flow.
- Inspect visible results and browser errors.
- Test success, validation and failure paths.
- Verify important viewport sizes.
- Check that UI state and persisted data agree.

Do not treat a successful HTTP response or page load as proof
that the entire feature works.

## Reporting

Record each executed command, its outcome and any relevant counts.
Separate PASS, FAIL, BLOCKED and NOT RUN.

For a failure:
- Describe the symptom.
- Record the root cause if established.
- Describe the change made.
- Link the regression test.
- Record the post-fix result.

Update docs/TEST_REPORT.md and relevant feature statuses.
