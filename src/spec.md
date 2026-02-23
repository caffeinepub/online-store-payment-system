# Specification

## Summary
**Goal:** Add item deletion functionality to the admin panel.

**Planned changes:**
- Add deleteItem method to backend that removes items from storage
- Create useDeleteItem React Query mutation hook in the frontend
- Add delete buttons with confirmation dialogs to each item in the admin ItemList component

**User-visible outcome:** Admin users can delete items from the store inventory by clicking a delete button on each item, with a confirmation dialog to prevent accidental deletions.
