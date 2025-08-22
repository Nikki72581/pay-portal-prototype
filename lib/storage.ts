import type { PaymentDoc } from "./types";
const KEY = "nuvei-documents-v1";

export function loadDocs(): PaymentDoc[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PaymentDoc[];
  } catch {
    return [];
  }
}

export function saveDocs(docs: PaymentDoc[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(docs));
}
