# BeyondChats – AI-Powered Article Automation Platform

This repository contains a complete solution for the **BeyondChats Technical Product Manager Assignment**.

The system automates article collection, competitor analysis, AI-based rewriting, and presents everything in a clean dashboard.

---

## 📌 What This Project Does

1. Scrapes articles from the BeyondChats blog
2. Stores articles in a backend database
3. Finds competitor articles via Google search
4. Rewrites content using AI (OpenAI)
5. Updates rewritten content back into the database
6. Displays everything in a frontend dashboard

---

## 🏗️ System Architecture

┌────────────────┐

│ React Frontend │

│ (Dashboard) │

└───────▲────────┘

│

│ REST API

▼

┌────────────────┐

│ Laravel Backend│

│ (Articles) │

└───────▲────────┘

│

│ HTTP API

▼

┌────────────────┐

│ Node Automation│

│ Scrape + AI │

└────────────────┘


---

## 🧩 Tech Stack

### Backend
- Laravel 12
- SQLite (local dev)
- REST APIs

### Automation
- Node.js
- Axios
- Cheerio
- OpenAI API
- dotenv

### Frontend
- React + Vite
- TypeScript
- Minimal inline styling

---

## ✨ Features Implemented

### Laravel Backend
- Article model & migrations
- REST endpoints:
  - `GET /api/articles`
  - `PUT /api/articles/{id}`
- Custom scraping logic
- Clean data schema

### Node Automation
- Fetches articles from backend
- Searches competitor articles
- Scrapes competitor content
- Rewrites content using OpenAI
- Updates backend automatically
- **Graceful fallback** if OpenAI quota is exceeded

### React Dashboard
- View all articles
- Status indicator (Processed / Pending)
- Search by title
- Filter by processing status
- Toggle updated content visibility
- Responsive layout

---

## ⚠️ Error Handling & Real-World Constraints

- OpenAI quota limits are handled gracefully
- If AI fails, the pipeline skips without crashing
- Errors are logged clearly for debugging

This reflects **real production behavior**.

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
Backend deployed on Render

Frontend deployed on Vercel

## 👤 Author
Subhadeep Saha

Fullstack Developer