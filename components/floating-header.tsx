"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Zap } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export function FloatingHeader() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const springConfig = { damping: 25, stiffness: 300 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/tester", label: "API Tester" },
    ];

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-4 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2",
                "rounded-xl border border-white/10 bg-black/50 backdrop-blur-md shadow-lg"
            )}
        >
            <div className="h-16 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-blue-400" />
                    <span className="text-xl font-semibold text-white">PingLab</span>
                </Link>

                <nav 
                    ref={navRef}
                    className="hidden md:flex items-center space-x-6 relative"
                    onMouseMove={(e) => {
                        if (navRef.current) {
                            const rect = navRef.current.getBoundingClientRect();
                            mouseX.set(e.clientX - rect.left);
                            mouseY.set(e.clientY - rect.top);
                        }
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {hoveredIndex !== null && (
                        <motion.div
                            className="absolute -z-10 rounded-md bg-white/10"
                            style={{
                                x: x,
                                y: y,
                                width: "auto",
                                height: "2rem",
                                translateX: "-50%",
                                translateY: "-50%",
                            }}
                            layoutId="hover-highlight"
                            transition={{ type: "spring", ...springConfig }}
                        />
                    )}
                    
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setHoveredIndex(index)}
                            className="text-sm text-gray-300 hover:text-white transition-colors relative px-4 py-2 rounded-md"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.header>
    )
}
