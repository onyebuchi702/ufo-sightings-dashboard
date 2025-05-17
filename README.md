# UFO Sightings Dashboard

A next.js application that displays UFO sighting data in an interactive dashboard with weekly charts.

## Features

- Fetches and displays UFO sightings data from an external API
- Interactive bar chart showing daily sightings grouped by week
- Week-by-week navigation
- Responsive design
- Loading states and error handling
- TypeScript support
- Unit tests for components

## Tech Stack

- React 19
- Nextjs 15
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Jest & React Testing Library
- Fetch for API calls
- React Query for caching & sync'ing server state

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/onyebuchi702/ufo-sightings-dashboard
cd ufo-sightings-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following content:
```bash
API_URL=https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Running Tests

To run the test suite:

```bash
npm test
# or
yarn test
```

## Project Structure

```
src/
  ├── components/
  │   ├── atoms/        # Basic UI components
  │   ├── molecules/    # Composite components
  │   └── organisms/    # Complex components like the dashboard
  ├── lib/             # API, Context, type definitions, utility functions and helpers
  ├── providers        # React Query & Context providers
  └── app/             # Next.js app router files
```

## Available Scripts

- `dev`: Runs the app in development mode
- `build`: Builds the app for production
- `start`: Runs the built app in production mode
- `test`: Runs the test suite
- `lint`: Runs ESLint for code quality

## License

This project is licensed under the MIT License - see the LICENSE file for details