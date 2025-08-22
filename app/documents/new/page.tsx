"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { encodeToken } from "@/lib/token";
import { loadDocs, saveDocs } from "@/lib/storage";
import type { PaymentDoc, DocType, PartyType } from "@/lib/types";
import Link from "next/link";
import { useMemo, useState } from "react";

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function NewDocPage() {
  const [type, setType] = useState<DocType>("AR");
  const [partyType, setPartyType] = useState<PartyType>("Customer");
  const [partyName, setPartyName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("USD");
  const [dueDate, setDueDate] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [doc, setDoc] = useState<PaymentDoc | null>(null);

  const valid = useMemo(() => partyName && email && amount > 0, [partyName, email, amount]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      id: uid(),
      type, partyType, partyName, email,
      amount: Number(amount),
      currency, dueDate, memo,
      createdAt: new Date().toISOString()
    };
    const token = encodeToken(payload);
    const newDoc: PaymentDoc = { ...payload, status: "Unpaid", token };
    const existing = loadDocs();
    const next = [newDoc, ...existing];
    saveDocs(next);
    setDoc(newDoc);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = doc ? `${origin}/pay/${doc.token}` : "";

  return (
    <>
      <Nav />
      <main className="container-max py-10">
        <h1 className="text-2xl font-semibold">Create Payment Request</h1>
        <p className="mt-1 text-sm text-neutral-600">Generate a shareable link for a customer or vendor to pay.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Document Type</label>
                <select value={type} onChange={e => setType(e.target.value as DocType)} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white">
                  <option value="AR">AR (Customer)</option>
                  <option value="AP">AP (Vendor)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Party Type</label>
                <select value={partyType} onChange={e => setPartyType(e.target.value as PartyType)} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white">
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Name</label>
              <input value={partyName} onChange={e => setPartyName(e.target.value)} placeholder="Acme Co." className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ap@acme.co" className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <input type="number" step="0.01" value={amount} onChange={e => setAmount(parseFloat(e.target.value || "0"))} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium">Currency</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white">
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
            </div>

            <div>
              <label className="text-sm font-medium">Memo (optional)</label>
              <textarea value={memo} onChange={e => setMemo(e.target.value)} placeholder="Invoice #12345" className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" rows={3} />
            </div>

            <button disabled={!valid} className="px-4 py-2 rounded-xl bg-brand-600 text-white disabled:opacity-50">Generate Link</button>
          </div>

          <div className="rounded-2xl border bg-white p-5 h-fit">
            <h3 className="font-medium">Share Link</h3>
            {!doc && <p className="mt-2 text-sm text-neutral-600">Fill in the form and click Generate to get a unique payment link.</p>}
            {doc && (
              <div className="mt-3 space-y-2">
                <div className="text-sm text-neutral-700">Send this link to {doc.partyName}:</div>
                <div className="p-2 border rounded-lg bg-neutral-50 text-xs break-all select-all">{shareUrl}</div>
                <div className="text-xs text-neutral-500">Also available in the <Link href="/dashboard" className="underline">Dashboard</Link>.</div>
              </div>
            )}
            <div className="mt-6 text-xs text-neutral-500">
              Note: This prototype encodes document details in the link itself. No backend or real payment processing.
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
