# Dog Grooming Client

A Next.js application for managing dog grooming appointments.

## Prerequisites

- Node.js 18+
- npm or yarn
- Running instance of the Dog Grooming API

## Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/dennis1232/DogsGroomManagment.git
cd dog-grooming
npm install
```

2. Create a `.env.local` file in the root directory:

```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5035
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- User authentication
- Appointment scheduling
- Appointment management (view, edit, cancel)
- Responsive design with Material-UI

## Tech Stack

- Next.js 14
- TypeScript
- Material-UI
- NextAuth.js
- Axios
- TailwindCSS

## Project Structure

- `/src/app` - Application pages and components
- `/src/context` - React context providers
- `/src/lib` - Utilities and configurations
- `/src/models` - TypeScript interfaces
- `/src/styles` - Global styles and theme

## API Integration

The client connects to the Dog Grooming API. Ensure the API is running at `http://localhost:5035` or update the `NEXT_PUBLIC_API_URL` accordingly.

```

This README provides essential information for setting up and running the client project while keeping it concise and focused on the key details.
```

![Logo](public/photo1.png)
![Logo](public/photo2.png)
![Logo](public/photo3.png)
![Logo](public/photo4.png)
![Logo](public/photo5.png)
