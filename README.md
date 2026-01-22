# TA Analytics Dashboard - Next.js

A modern Talent Acquisition Analytics Dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Data Processing:** Papa Parse, date-fns

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add your CSV file:
Place `TA Tracker - HM Sheet.csv` in the `public/data/` directory.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Real-time candidate analytics
- Advanced filtering (cascading filters)
- Interactive data visualizations
- KPI tracking and metrics
- Responsive design

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utility functions and data processing
├── store/           # Zustand state management
├── hooks/           # Custom React hooks
└── public/          # Static assets
```
