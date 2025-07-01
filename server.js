const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, "db.json");

// CORS 設定
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(',');

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Helper function to read the database
const readDb = () => {
  const dbJson = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(dbJson);
};

// Helper function to write to the database
const writeDb = (db) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
};

// Get all blog data
app.get("/api/blog", (req, res) => {
  const db = readDb();
  res.json(db);
});

// Get all enrollment events
app.get("/api/enrollmentEvents", (req, res) => {
  const db = readDb();
  res.json(db.enrollmentEvents);
});

// Get a single enrollment event by id
app.get("/api/enrollmentEvents/:id", (req, res) => {
  const db = readDb();
  const event = db.enrollmentEvents.find(
    (e) => e.id === parseInt(req.params.id)
  );
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

// Get all news
app.get("/api/news", (req, res) => {
  const db = readDb();
  res.json(db.news);
});

// Get a single news item by id
app.get("/api/news/:id", (req, res) => {
  const db = readDb();
  const newsItem = db.news.find((n) => n.id === parseInt(req.params.id));
  if (newsItem) {
    res.json(newsItem);
  } else {
    res.status(404).send("News not found");
  }
});

// Create a new enrollment event
app.post("/api/enrollmentEvents", (req, res) => {
  const db = readDb();
  const newEvent = {
    id:
      db.enrollmentEvents.length > 0
        ? Math.max(...db.enrollmentEvents.map((e) => e.id)) + 1
        : 1,
    ...req.body,
  };
  db.enrollmentEvents.push(newEvent);
  writeDb(db);
  res.status(201).json(newEvent);
});

// Create a new news item
app.post("/api/news", (req, res) => {
  const db = readDb();
  const newNews = {
    id: db.news.length > 0 ? Math.max(...db.news.map((n) => n.id)) + 1 : 1,
    ...req.body,
  };
  db.news.push(newNews);
  writeDb(db);
  res.status(201).json(newNews);
});

// Update an enrollment event
app.put("/api/enrollmentEvents/:id", (req, res) => {
  const db = readDb();
  const index = db.enrollmentEvents.findIndex(
    (e) => e.id === parseInt(req.params.id)
  );
  if (index !== -1) {
    db.enrollmentEvents[index] = { ...db.enrollmentEvents[index], ...req.body };
    writeDb(db);
    res.json(db.enrollmentEvents[index]);
  } else {
    res.status(404).send("Event not found");
  }
});

// Update a news item
app.put("/api/news/:id", (req, res) => {
  const db = readDb();
  const index = db.news.findIndex((n) => n.id === parseInt(req.params.id));
  if (index !== -1) {
    db.news[index] = { ...db.news[index], ...req.body };
    writeDb(db);
    res.json(db.news[index]);
  } else {
    res.status(404).send("News not found");
  }
});

// Delete an enrollment event
app.delete("/api/enrollmentEvents/:id", (req, res) => {
  const db = readDb();
  const newEnrollmentEvents = db.enrollmentEvents.filter(
    (e) => e.id !== parseInt(req.params.id)
  );
  if (newEnrollmentEvents.length < db.enrollmentEvents.length) {
    db.enrollmentEvents = newEnrollmentEvents;
    writeDb(db);
    res.status(204).send();
  } else {
    res.status(404).send("Event not found");
  }
});

// Delete a news item
app.delete("/api/news/:id", (req, res) => {
  const db = readDb();
  const newNews = db.news.filter((n) => n.id !== parseInt(req.params.id));
  if (newNews.length < db.news.length) {
    db.news = newNews;
    writeDb(db);
    res.status(204).send();
  } else {
    res.status(404).send("News not found");
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});
