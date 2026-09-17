"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Manage Readings",
    href: "/manage",
  },
  {
    name: "View Readings",
    href: "/readings",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#174a7e] px-6 py-5">
      <div className="mx-auto max-w-[1400px]">
        <nav className="flex flex-wrap items-center justify-between gap-6 rounded-xl bg-white px-7 py-4 shadow-lg">

          {/* LOGO / PORTAL NAME */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#174a7e] text-lg font-bold text-white">
              CC
            </div>

            <div>
              <p className="font-bold text-[#174a7e]">
                Cold Chain
              </p>

              <p className="text-xs text-gray-500">
                Operations Portal
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}

          <div className="flex flex-wrap items-center gap-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={
                    isActive
                      ? "border-b-4 border-[#159fbd] px-4 py-3 font-bold text-[#174a7e]"
                      : "border-b-4 border-transparent px-4 py-3 font-semibold text-[#174a7e] transition hover:border-[#159fbd] hover:text-[#159fbd]"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

        </nav>
      </div>
    </header>
  );
}