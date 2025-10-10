# TaskFlow - Professional Task Management

A sophisticated, production-ready task management application built with React, Vite, and Tailwind CSS. TaskFlow helps you organize your daily work with lists, priorities, and due dates, featuring a clean interface and satisfying completion animations.

## Features

- ✅ Create, edit, and delete tasks with rich details
- 📋 Organize tasks into custom color-coded lists
- 🎯 Set priority levels (High, Medium, Low) with visual badges
- 📅 Track due dates with calendar integration
- 🔍 Real-time search and advanced filtering
- ✨ Satisfying task completion animations
- 💾 Automatic localStorage persistence
- 📱 Fully responsive design for all devices

## Tech Stack

- React 18 + Vite
- Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- date-fns for date formatting
- React Toastify for notifications

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex feature components
│   ├── pages/          # Page components
│   ├── ui/             # State components
│   └── ApperIcon.jsx   # Icon component
├── services/
│   ├── api/            # Service layer
│   └── mockData/       # JSON data files
├── router/             # Route configuration
├── utils/              # Utility functions
└── App.jsx
```

## License

MIT