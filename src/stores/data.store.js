import { writable } from "svelte/store";

export const tableData = writable();
export const dataLoading = writable(false);