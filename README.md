# 🚀 VyomGarud - Blog (Strapi v5 + Next.js)

A fast, modern, full-stack blogging platform built with Strapi v5 (backend CMS) and Next.js (frontend).
Designed with clean UI, dark mode, smooth filtering, and rich-text rendering.


## 🛠 Tech Stack
### Frontend: 
- Next.js, TailwindCSS, ShadCN UI,

### Backend: 
- Strapi v5, SQLite, REST API (Strapi auto-generated)


## ✨ Features
### 🔹 Core Features
- Blog Homepage showing all posts
- Single Post Page with full rich-text content
- Category/Author filters

### 🔹 Enhanced Features
- Dark Mode with Tailwind
- ShadCN UI components for polished design
- Custom rich-text rendering using @strapi/blocks-react-renderer

## 📁 Project Structure
### Backend (Strapi v5)
```swift
/backend
 ├── src/
 │    ├── api/
 │    │    ├── author/
 │    │    ├── category/
 │    │    └── post/
 │    ├── plugins/
 │    └── extensions/
 ├── .env
 ├── package.json
 └── README.md
 ```

### Frontend
```swift
/frontend
 ├── app/
 │    ├── page.tsx
 │    ├── post/[slug]/page.tsx
 │    └── layout.tsx
 ├── components/
 │    ├── RichTextRenderer.tsx
 │    ├── Navbar.tsx
 │    └── ui/
 ├── lib/
 │    ├── api.ts
 │    └── utils.ts
 ├── public/
 └── package.json
 ```

## 📡 Strapi Content Types
### 📌 Post

| Field       | Type               |
|-------------|--------------------|
| title       | Text               |
| slug        | UID                |
| coverImage  | Media              |
| content     | Rich Text          |
| author      | Relation (many-to-one) |
| category    | Relation (many-to-one) |


### 📌 Author

| Field  | Type     |
|--------|----------|
| name   | Text     |
| avatar | Media    |
| bio    | Rich Text |
| posts  | Relation |


### 📌 Category

| Field       | Type     |
|-------------|----------|
| name        | Text     |
| description | Text     |
| posts       | Relation |

## 🌐 REST API Endpoints (Auto-Generated)
### Posts

- GET /api/posts
- GET /api/posts?populate=*
- GET /api/posts?filters[slug][$eq]=${slug}&populate=*

## 🖥️ Local Development Setup
### Backend (Strapi v5)
```bash
cd backend
npm install
npm run develop
```

Strapi Admin will run at:
👉 http://localhost:1337/admin


### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

Next.js will run at:
👉 http://localhost:3000