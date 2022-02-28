import { tableGroups } from '../stores/rows.store.js';

export function updateTableGroups(value, key, rowId, groupId) {
  tableGroups.update((v) => {
    v
      .find((g) => g.groupId == groupId)
      .rows.find((r) => r.id === rowId)
      .cells.find((c) => c.columnId === key).value = value;
    return v;
  });
}
