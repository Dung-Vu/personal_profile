# Auto Daily Checkin Rule

## Daily Log Auto-Update

During any session, update `memory/YYYY-MM-DD.md` at these natural checkpoints:
1. After completing a significant task (build verified, tests passed, feature done)
2. Before starting a new unrelated task
3. When user has been idle for a while and work is ongoing
4. At the end of any major decision or architectural change

Use `/daily` command when called. Otherwise follow the template in `memory/DAILY_LOG_TEMPLATE.md`.
Keep entries compact (1-2 lines each). Only record meaningful progress/decisions/blockers.
Update `docs/CHECK_IN.md` when active claims or status change.
