import { writable } from 'svelte/store';

export const tableGroups = writable([]);
export const selectedRow = writable('');
export const dataLoading = writable('');