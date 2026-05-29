# CineScope

A responsive movie discovery dashboard built using HTML, CSS, and Vanilla JavaScript, powered by the TMDB API. CineScope allows users to browse trending movies, search titles in real time, filter movies by genre, and explore detailed movie information through an interactive modal interface.

The project is being developed in two phases:
- Part 1 → Vanilla HTML, CSS, and JavaScript
- Part 2 → React + Vite implementation

---
# Live Features
## Features Built

- Trending movie hero banner
- Real-time movie search with debounce optimization
- Genre-based movie filtering
- Responsive popular movie card grid
- Interactive movie detail modal
- Dark/light theme toggle

---
# Tech Stack

### Part 1
- HTML5
- CSS3
- Vanilla JavaScript
- TMDB API

### Part 2
- React
- Vite
- React Router
- CSS Modules
- TMDB API
---
# Screenshots
## Desktop View

## Mobile View

## Movie Detail Modal

---
# Public API Used
This project uses the TMDB (The Movie Database) API.
- API Website: https://developer.themoviedb.org/docs/getting-started

## Endpoints Used
- /movie/popular
- /trending/movie/day
- /search/movie
- /discover/movie
- /genre/movie/list
- /movie/{id}
- /movie/{id}/credits

---
# Project Structure

```plaintext
internship-srisha-das/
├── index.html
├── style.css
├── app.js
├── config.example.js
└── screenshots/

├── README.md
├── part-1/
└── part-2/
```
---
# Setup Instructions
## 1. Clone the Repository
    git clone <your-repository-url>
## 2. Navigate Into the Project Folder
    cd CineScope
---
# What I Struggled With

---
# What I Learned
Through this project, I gained practical experience with:
- asynchronous JavaScript
- working with REST APIs
- request optimization techniques
- responsive frontend design
- accessibility improvements
- UI state management </br>
I also learned how important perceived performance is in frontend applications through loading states, skeleton screens, and request management.
---
# What I Would Add Next
Some more features that I would like to implement:
- Pagination
- Movie trailers integration   
- Watchlist functionality using localStorage
- Advanced filtering (rating, year, language)
- Similar movie recommendations
---
# Reflection  
This project helped me move beyond static frontend development and think more about user experience, responsiveness, and frontend architecture.
The biggest shift for me was learning that frontend development is not just about making interfaces look good, since it also involves:
- performance optimization
- accessibility
- asynchronous data handling
- state management
- responsive behavior across devices. </br>
One of the most rewarding parts was seeing how relatively small improvements like debouncing, caching, and skeleton loaders significantly improved the overall user experience.
---