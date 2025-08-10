## Exercise App

A responsive React app to discover exercises, view details, and watch related videos.

### Features
- Search exercises by name, muscle, equipment, or body part
- Filter by body part with a drag-to-pan horizontal selector
- Exercise list with responsive grid and pagination
- Detail page with description, key info, and top YouTube videos
- Similar exercises by target muscle and by equipment

### Tech Stack
- React 18, React Router 6, Material UI
- RapidAPI: ExerciseDB and YouTube Search & Download

### Getting Started
1) Install dependencies
```
npm install
```
2) Create `.env` in the project root with your RapidAPI keys
```
REACT_APP_RAPID_API_KEY=your_exercisedb_rapidapi_key
REACT_APP_YOUTUBE_API_KEY=your_youtube_search_rapidapi_key
```
3) Run the app
```
npm start
```

### Scripts
- `npm start`: run dev server
- `npm run build`: production build
- `npm test`: run tests

### Project Structure
```
src/
  Components/
    BodyPart.js           # Body-part selector card
    Detail.js             # Exercise detail header (uses YouTube thumbnail)
    ExerciseCard.js       # Exercise card (uses YouTube thumbnail)
    Exercises.js          # Grid + pagination
    ExerciseVideos.js     # Top YouTube videos
    HorizontalScrollBar.js# Drag-to-pan horizontal list
    Navbar.js, Footer.js
  Pages/
    Home.js               # Search + list
    ExerciseDetail.js     # Detail + videos + similar
  Utils/
    fetchData.js          # API helpers (ExerciseDB & YouTube)
```

### Environment Variables
- `REACT_APP_RAPID_API_KEY`: used for ExerciseDB requests
- `REACT_APP_YOUTUBE_API_KEY`: used for YouTube search (RapidAPI). If only one key is available, set both to the same value.

### Notes
- ExerciseDB detail responses may not include `gifUrl`. This app uses YouTube thumbnails for imagery and falls back gracefully if none found.
- If search shows no results, verify your RapidAPI keys/subscriptions and check the browser console for request errors.

### License
MIT
