"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { loadDocs, saveDocs } from "@/lib/storage";
import type { PaymentDoc } from "@/lib/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const [docs, setDocs] = useState<PaymentDoc[]>([]);
  useEffect(() => { setDocs(loadDocs()); }, []);

  const totals = useMemo(() => {
    const ar = docs.filter(d => d.type === "AR" && d.status !== "Paid").reduce((a, d) => a + d.amount, 0);
    const ap = docs.filter(d => d.type === "AP" && d.status !== "Paid").reduce((a, d) => a + d.amount, 0);
    const unpaid = docs.filter(d => d.status !== "Paid").length;
    return { ar, ap, unpaid };
  }, [docs]);

  function markPaid(id: string) {
    const next = docs.map(d => d.id === id ? { ...d, status: "Paid" as const } : d);
    setDocs(next);
    saveDocs(next);
  }
  function remove(id: string) {
    const next = docs.filter(d => d.id !== id);
    setDocs(next); saveDocs(next);
  }

  return (
    <>
      <Nav />
      <main className="container-max py-10 space-y-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Stat label="Open AR" value={totals.ar} />
          <Stat label="Open AP" value={totals.ap} />
          <Stat label="Unpaid Docs" value={totals.unpaid} integer />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Documents</h2>
          <Link href="/documents/new" className="px-3 py-1.5 rounded-lg border bg-white hover:bg-neutral-50">Create</Link>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50">
              <tr className="[&>th]:py-2 [&>th]:px-3 text-left">
                <th>Type</th><th>Party</th><th>Amount</th><th>Status</th><th>Created</th><th>Due</th><th>Link</th><th></th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t">
              {docs.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-6 text-neutral-500">No documents yet. Create one to generate a shareable payment link.</td></tr>
              )}
              {docs.map(doc => (
                <tr key={doc.id} className="[&>td]:py-2 [&>td]:px-3">
                  <td><span className={`px-2 py-1 rounded-full text-xs ${doc.type === "AR" ? "bg-brand-100 text-brand-800" : "bg-emerald-100 text-emerald-800"}`}>{doc.type}</span></td>
                  <td>
                    <div className="font-medium">{doc.partyName}</div>
                    <div className="text-xs text-neutral-500">{doc.partyType} • {doc.email}</div>
                  </td>
                  <td>${doc.amount.toFixed(2)} {doc.currency}</td>
                  <td><span className={`px-2 py-1 rounded-full text-xs ${doc.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-800"}`}>{doc.status}</span></td>
                  <td className="text-xs text-neutral-600">{new Date(doc.createdAt).toLocaleString()}</td>
                  <td className="text-xs text-neutral-600">{doc.dueDate || "-"}</td>
                  <td className="max-w-[260px] truncate"><Link className="text-brand-700 underline" href={`/pay/${doc.token}`}>/pay/{doc.token}</Link></td>
                  <td className="whitespace-nowrap">
                    {doc.status !== "Paid" && (<button onClick={() => markPaid(doc.id)} className="mr-2 text-emerald-700 underline">Mark paid</button>)}
                    <button onClick={() => remove(doc.id)} className="text-neutral-600 underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, integer = false }: { label: string, value: number, integer?: boolean }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{integer ? Math.trunc(value) : `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
    </div>
  );
}
