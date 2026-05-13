## Rename Scout Assistant → Scout AI Assistant

Replace all user-facing occurrences of "Scout Assistant" with "Scout AI Assistant" across the app and edge function.

### Files to change
- `src/components/scout/Sidebar.tsx` — Navigation label and `ViewKey` type value
- `src/pages/Index.tsx` — Conditional view render check
- `src/components/scout/views/ScoutAssistantView.tsx` — Page heading and input placeholder
- `supabase/functions/scout-assistant/index.ts` — System prompt name reference

### Result
Everywhere users see "Scout Assistant" will read "Scout AI Assistant" instead.