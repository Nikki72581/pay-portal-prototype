export type DocType = "AR" | "AP";
export type PartyType = "Customer" | "Vendor";

export interface PaymentDoc {
  id: string;
  type: DocType;
  partyType: PartyType;
  partyName: string;
  email: string;
  amount: number;
  currency: string;
  dueDate?: string;
  memo?: string;
  status: "Unpaid" | "Paid";
  createdAt: string;
  token: string;
}
