# 🌍 EcoLens: Real-time Global Environment Monitoring and Sustainability Metrics

A high-performance environmental analytics dashboard and sustainability scoring platform designed to visualize the health of every nation on Earth in real-time.

---

## ✨ Key Features

* **Dynamic Sustainability Scoring**: Proprietary algorithm that ranks 250+ jurisdictions based on live ecological data.
* **Real-time API Integration**: Fetches environmental metrics from OpenWeather, REST Countries, and the World Air Quality Project.
* **Adaptive Branding**: Intelligent navbar and footer logos that switch between light and dark based on active themes.
* **Ultra-Responsive UI**: Custom-built layouts that eliminate horizontal "ghost scrolling" on mobile devices through viewport locking.

---

## 🎨 Frontend Architecture & UI Features

The frontend is built with **Next.js**, **Tailwind CSS**, and **Framer Motion**, focusing on a "Mobile-First" experience.

### 1. Smart Navigation
* **Glassmorphism**: The navbar utilizes `backdrop-blur-md` and `bg-opacity` transitions when the user scrolls.
* **Responsive Scaling**: Logos are sized using physical responsive units (`w-32 md:w-44`) rather than CSS transforms to ensure layout stability.
* **Animated Mobile Menu**: A custom dropdown menu using `AnimatePresence` to prevent layout jumping during toggle.

### 2. Immersive Hero Section
* **Layered Visuals**: Combines high-resolution `.avif` background imagery with floating "Glow Effects."
* **Overflow Protection**: All background decorations use `max-w-[100vw]` to ensure users cannot "pinch-to-zoom" into empty whitespace.

### 3. Integrated Branding Footer
* **Layered Brand Column**: A modern design where description text sits as a semi-transparent overlay on an enlarged brand logo.
* **Watermark Effect**: High-resolution PNGs are rendered with reduced opacity and `mix-blend-mode` for a professional aesthetic.

### 4. Time-based Background
* **LiveClock Background Color Switch**: UI changes background color based on the time shown on a country.

EcoLens features an atmospheric UI engine that synchronizes the application's aesthetic with the local time of the selected country. This goes beyond a simple toggle, offering four distinct visual states based on the 24-hour clock.
| Phase | Time Range | Experience Description | Key Color Palette |
| :--- | :--- | :--- | :--- |
| Sunrise | 05:00 – 08:59 | Soft morning glow with peach-tinted cards. | orange-200 → rose-100 |
| Day | 09:00 – 16:59 | High-clarity, crisp light mode for readability. | bg-[#f0fdf4] (Nature White) |
| Sunset | 17:00 – 19:59 | Vibrant purple/pink gradients and deep blurs. | indigo-600 → pink-400 |
| Night | 20:00 – 04:59 | Deep immersion mode with high-contrast text. | bg-[#0a0f1e] (Midnight Blue) |

### 5. Error and Loading Pages
EcoLens have a fallback page in case if there is an error fetching from API due to slow connection or anything. 

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide-React |
| **Data Fetching** | Client-side Fetch / API Routes |

---
