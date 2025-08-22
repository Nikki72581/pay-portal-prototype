"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/documents/new", label: "Create" }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-brand-600" />
          <span className="font-semibold tracking-tight">Nuvei Pay</span>
          <span className="text-xs ml-2 rounded-full bg-neutral-100 px-2 py-0.5 border">Prototype</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full border ${pathname === l.href ? "bg-neutral-900 text-white border-neutral-900" : "bg-white hover:bg-neutral-50"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
