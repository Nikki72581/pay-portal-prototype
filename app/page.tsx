import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="container-max py-12">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Nuvei Pay Portal</h1>
            <p className="mt-3 text-lg text-neutral-600 max-w-prose">
              Create AR and AP payment requests, share secure payment links, and let customers or vendors pay via a simple portal.
              This is a prototype for design and workflow validation.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/documents/new" className="px-4 py-2 rounded-xl bg-brand-600 text-white shadow hover:bg-brand-700">Create Payment Link</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-xl border bg-white hover:bg-neutral-50">View Dashboard</Link>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-neutral-700">
              <li>• AR for customers, AP for vendors</li>
              <li>• Shareable payment links with tokenized payload</li>
              <li>• Simple portal-style payment page</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-brand-100 to-white border p-4">
                <div className="text-2xl font-semibold">$42,120</div>
                <div className="text-xs text-neutral-500 mt-1">Open AR</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-white border p-4">
                <div className="text-2xl font-semibold">$18,640</div>
                <div className="text-xs text-neutral-500 mt-1">Open AP</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-neutral-100 to-white border p-4">
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-neutral-500 mt-1">Unpaid Docs</div>
              </div>
            </div>
            <div className="mt-6 rounded-xl border p-4">
              <div className="text-sm text-neutral-700">Try creating a payment request, then open the shared link to simulate a payment.</div>
              <div className="mt-3">
                <Link href="/documents/new" className="text-brand-700 underline">Start a new document →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
