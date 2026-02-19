# 🎬 Movie Explorer – React Practice Project

A **React practice project** built to revise and strengthen core React concepts such as **state management, effects, debouncing, pagination, and component structuring**, while integrating real-world APIs and a lightweight backend for analytics.

🔗 **Live Demo:** https://react-movie-recomendation-project-6bik8mnda.vercel.app/

---

## 📌 Purpose of This Project

This project was built **purely for practice and revision of React**, not as a resume or production-grade project.

Main goals:
- Revise React hooks (`useState`, `useEffect`)
- Practice debounced search
- Understand pagination & lazy loading concepts
- Learn how frontend apps can store analytics using a backend (Appwrite)

---

## ✨ Features

- 🔍 **Debounced Movie Search**
  - Search movies using TMDB API
  - Uses debouncing to avoid excessive API calls

- 📊 **Trending Movies (Analytics-Based)**
  - Tracks what users search
  - Stores search counts in Appwrite Database
  - Displays most searched movies as “Trending”

- 🎞️ **Movie Discovery**
  - Shows popular movies when no search term is entered

- ⏳ **Loading & Error Handling**
  - Spinners for loading states
  - Graceful error messages

- ➕ **Pagination / Load More**
  - Incrementally loads movies for better UX and performance

---

## 🧠 How Trending Movies Are Calculated

1. User searches for a movie
2. The first search result is stored in Appwrite with:
   - `SearchTerm`
   - `movie_id`
   - `poster_url`
   - `count`
3. If the same search term appears again:
   - `count` is incremented
4. Trending movies are fetched by:
   - Sorting documents by `count` (descending)
   - Limiting the result set

This mimics **basic analytics tracking** used in real applications.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- react-use (`useDebounce`)

### Backend / Services
- TMDB API – Movie data
- Appwrite Database – Search analytics & trending logic

---

## 🗃️ Appwrite Database Schema

**Collection:** `metric`

| Field Name   | Type    | Description |
|-------------|---------|-------------|
| SearchTerm  | string  | User search keyword |
| count       | integer | Number of times searched |
| movie_id    | integer | TMDB movie ID |
| poster_url  | url     | Movie poster |
| $createdAt | datetime | Auto-generated |

- Indexed on `SearchTerm`
- Used only for analytics (not user data)

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE=your_database_id
VITE_APPWRITE_COLLECTION_ID=metric
