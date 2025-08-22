"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { decodeToken } from "@/lib/token";
import Link from "next/link";
import { useMemo, useState } from "react";

interface TokenPayload {
  id: string;
  type: "AR" | "AP";
  partyType: "Customer" | "Vendor";
  partyName: string;
  email: string;
  amount: number;
  currency: string;
  dueDate?: string;
  memo?: string;
  createdAt: string;
}

export default function PayPage({ params }: { params: { token: string } }) {
  const payload = useMemo<TokenPayload | null>(() => {
    try { return decodeToken(params.token) as TokenPayload; } catch { return null; }
  }, [params.token]);

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!payload) {
    return (
      <>
        <Nav />
        <main className="container-max py-10">
          <div className="rounded-xl border bg-white p-6">
            <h1 className="text-xl font-semibold">Invalid or expired link</h1>
            <p className="mt-2 text-sm text-neutral-600">Please contact the sender for a new payment link.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setSuccess(true); }, 1200);
  }

  return (
    <>
      <Nav />
      <main className="container-max py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-6 space-y-1">
            <div className="text-sm text-neutral-500">{payload.type === "AR" ? "Payable to" : "Paying from"}</div>
            <h1 className="text-2xl font-semibold">{payload.partyName}</h1>
            <div className="text-sm text-neutral-500">{payload.email}</div>
            <div className="mt-4 text-neutral-700">
              <div className="text-sm">Amount</div>
              <div className="text-3xl font-semibold">${payload.amount.toFixed(2)} {payload.currency}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="p-3 rounded-lg bg-neutral-50 border">
                <div className="text-neutral-500">Created</div>
                <div>{new Date(payload.createdAt).toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 border">
                <div className="text-neutral-500">Due</div>
                <div>{payload.dueDate || "-"}</div>
              </div>
            </div>
            {payload.memo && (
              <div className="mt-4 text-sm">
                <div className="text-neutral-500">Memo</div>
                <div className="whitespace-pre-wrap">{payload.memo}</div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-6">
            {!success ? (
              <form onSubmit={pay} className="space-y-4">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div>
                  <label className="text-sm font-medium">Card number</label>
                  <input required placeholder="4242 4242 4242 4242" className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Expiry</label>
                    <input required placeholder="MM/YY" className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVC</label>
                    <input required placeholder="123" className="mt-1 w-full border rounded-lg px-3 py-2 bg-white" />
                  </div>
                </div>
                <button disabled={processing} className="px-4 py-2 rounded-xl bg-brand-600 text-white disabled:opacity-50">
                  {processing ? "Processing..." : `Pay ${payload.currency} ${payload.amount.toFixed(2)}`}
                </button>
                <div className="text-xs text-neutral-500">Simulated payment for prototype. No real charges.</div>
              </form>
            ) : (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-emerald-700">Payment successful</h2>
                <p className="text-sm text-neutral-700">Thanks. A receipt has been emailed to {payload.email} (pretend).</p>
                <Link className="underline text-brand-700" href="/dashboard">Back to dashboard</Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
