import { queryOptions, useQuery } from "@tanstack/react-query";
import { contactKeys } from "../keys";
import type { IContact } from "../types";

export type { IContact } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchContacts(): Promise<IContact[]> {
  const res = await fetch("/api/contact");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /contact`);
  return res.json() as Promise<IContact[]>;
}

export const contactQuery = queryOptions({
  queryKey: contactKeys.all,
  queryFn: fetchContacts,
});

export function useContacts() {
  return useQuery(contactQuery);
}
