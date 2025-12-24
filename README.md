# BeyondChats – AI-Powered Article Automation Platform

This repository contains a complete solution for the **BeyondChats Technical Product Manager Assignment**.

The system automates article collection, competitor analysis, AI-based rewriting, and presents everything in a clean dashboard.

---

## 📌 What This Project Does

1. Stores articles in a backend database
2. Exposes articles via REST APIs
3. Fetches competitor articles via search
4. Scrapes competitor content
5. Rewrites content using AI
6. Updates rewritten content back into the database
7. Displays article status and content in a frontend dashboard

---

## 🏗️ System Architecture

┌────────────────┐

│ React Frontend │

│ (Dashboard UI) │

└───────▲────────┘

│

│ REST API

▼

┌────────────────┐

│ Laravel Backend│

│ (Articles API) │

└───────▲────────┘

│

│ HTTP API

▼

┌────────────────┐

│ Node Automation│

│ Scrape + AI Rewrite│

└────────────────┘


---

## 🧩 Tech Stack

### Backend
- Laravel 12
- Database migrations & models
- REST APIs

### Automation
- Node.js
- Axios
- Cheerio (HTML scraping)
- OpenAI API (content rewriting)
- dotenv

### Frontend
- React + Vite
- TypeScript
- Minimal, readable dashboard UI

---

## ✨ Features Implemented

### Laravel Backend
- Article model & migrations
- Database schema with processing state
- REST endpoints:
  - `GET /api/articles`
  - `PUT /api/articles/{id}`
- Clean and scalable API design

### Node Automation
- Fetches articles from backend
- Searches competitor sources
- Scrapes competitor article content
- Rewrites content using OpenAI
- Updates rewritten content back into backend
- **Graceful fallback** if OpenAI quota is exceeded

> Note: Automation is demonstrated via code and local execution.

### React Dashboard
- View all articles
- Status indicator (Processed / Pending)
- Search articles by title
- Filter by processing status
- Toggle updated content visibility
- Responsive layout

---

## ⚠️ Error Handling & Real-World Constraints

- OpenAI quota limits are handled gracefully
- If AI fails, the pipeline skips without crashing
- Errors are logged clearly for debugging
- Automation layer is intentionally not exposed publicly

This reflects **real production behavior** and cost-aware design.

---

## 🛠️ Local Setup

### 1️⃣ Backend (Laravel)

```powershell
cd backend-laravel
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```
Backend runs at:
```cpp
http://127.0.0.1:8000
```

### 2️⃣ Node Automation
```powershell
cd node-automation
npm install
node src/index.js
```
Environment variables (node-automation/.env):
```env
LARAVEL_API_BASE=http://127.0.0.1:8000/api
OPENAI_API_KEY=your_openai_key
```
### 3️⃣ Frontend (React)
```powershell
cd frontend-react
npm install
npm run dev
```
Frontend runs at:
```arduino
http://localhost:5173
```
## 📊 API Example
```json
{
  "id": 1,
  "title": "AI in Healthcare: Future Trends",
  "original_content": "...",
  "updated_content": "...",
  "source_url": "https://beyondchats.com/..."
}
```

## 🚀 Deployment
### Backend (Render)
```bash
https://beyondchats-assignment-33th.onrender.com/api/articles
```

### Frontend (Vercel)
```arduino
https://beyondchats-frontend-4yl67mowj-subhadeep2609s-projects.vercel.app/
```
Note: Node automation is not deployed due to free-tier limitations and OpenAI quota requirements. This mirrors real-world systems where automation runs as protected background jobs.

---
## Future Improvements
- Scheduled automation (cron jobs)

- Retry queues for failed AI calls

- Admin-triggered reprocessing

- Authentication & role-based access

- Cost & usage monitoring


## 👤 Author
Subhadeep Saha

Fullstack Developer