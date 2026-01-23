"use client";

/**
 * PageTransition Component
 * 
 * This component wraps page content to provide smooth enter/exit animations
 * when navigating between routes in the application.
 * 
 * Animation Behavior:
 * 
 * ENTRY (initial → animate):
 * - opacity: 0 → 1 (fades in from invisible to visible)
 * - y: 10 → 0 (slides up from 10px below final position)
 * - Creates a smooth "fade in and slide up" entrance effect
 * 
 * EXIT (animate → exit):
 * - opacity: 1 → 0 (fades out from visible to invisible)
 * - y: 0 → -10 (slides up past final position)
 * - Creates a smooth "fade out and slide up" exit effect
 * 
 * Timing:
 * - duration: 0.4 seconds (400ms) for the complete animation
 * - ease: "easeOut" for a natural deceleration (starts fast, ends slow)
 * 
 * How It Works:
 * - Uses Framer Motion's motion.div to apply CSS animations
 * - The component wraps all children content
 * - When a page mounts, content fades and slides in
 * - When a page unmounts, content fades and slides up before disappearing
 * - Creates visual continuity between page changes
 * 
 * Usage:
 * - Wrap layout.js or individual pages with this component to enable transitions
 * - Works seamlessly with Next.js routing
 * - Requires AnimatePresence from Framer Motion at the layout level to work with exit animations
 * 
 * This enhances user experience by providing visual feedback during navigation,
 * making the app feel more polished and responsive.
 */

import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}