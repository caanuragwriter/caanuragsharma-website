"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "/#services" },
    { name: "Books", href: "/#books" },
    { name: "Mentorship Program", href: "/mentorship" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold text-blue-900">
              CA Anurag Sharma
            </span>

            <span className="text-sm text-gray-500">
              Chartered Accountant
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition"
              >
                {item.name}
              </a>
            ))}
          </nav>

          

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-blue-900"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">

          <div className="flex flex-col p-6 gap-5">

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium"
              >
                {item.name}
              </a>
            ))}

            

          </div>

        </div>
      )}
    </header>
  );
}