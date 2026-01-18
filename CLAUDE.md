# Project Notes

## What is This?

See [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) for full context. In short: an AI-powered sales workspace with interconnected widgets that communicate with each other, enabling fluid workflows like select client → view context → draft email → send.

## Development Environment

This project runs in Docker. Do not run `npm install`, `npm run dev`, or other npm commands directly on the host machine.

### To start the development server:
```bash
docker compose up
```

### The app will be available at:
- http://localhost:3000
