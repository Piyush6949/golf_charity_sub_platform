"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        setMobileOpen(false);
        router.push("/");
    };

    const links = [
        { href: "#how-it-works", label: "How It Works" },
        { href: "#prizes", label: "Prizes" },
        { href: "#charities", label: "Charities" },
        { href: "#pricing", label: "Pricing" },
    ];

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">
                <a href="#" className="nav-logo">
                    <div className="nav-logo-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </div>
                    <span className="nav-logo-text">
                        Golf<span className="gradient-text">Charity</span>
                    </span>
                </a>

                <div className="nav-links">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="nav-cta">
                    {loading ? (
                        <span
                            className="inline-block h-9 w-28 rounded-md bg-surface/80 animate-pulse"
                            aria-hidden
                        />
                    ) : user ? (
                        <>
                            <Link href="/dashboard" className="nav-signin">
                                Dashboard
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn-primary btn-sm"
                            >
                                <span>Sign out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="nav-signin">Login</a>
                            <a href="#pricing" className="btn-primary btn-sm"><span>Get Started</span></a>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
                <div className="mobile-menu-inner">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                            {link.label}
                        </a>
                    ))}
                    {loading ? (
                        <div className="h-11 rounded-lg bg-surface/80 animate-pulse" aria-hidden />
                    ) : user ? (
                        <>
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileOpen(false)}
                                className="text-center py-3 font-medium"
                            >
                                Dashboard
                            </Link>
                            <button
                                type="button"
                                className="btn-primary w-full"
                                onClick={handleLogout}
                            >
                                <span>Sign out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" onClick={() => setMobileOpen(false)}>Login</a>
                            <a href="#pricing" className="btn-primary" onClick={() => setMobileOpen(false)}>
                                <span>Get Started</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
