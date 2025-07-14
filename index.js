/* lessons-api/index.js */
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// ---- Logger middleware ---------------------------------
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.url}`);
  next();
});

// ---- Static‑file middleware (lesson images) -------------
app.use("/images", express.static("images", {
  fallthrough: false
}));

// ---- Mongo connection ----------------------------------
const uri = process.env.MONGODB_URI || "mongodb+srv://uumoh022:lavender@cluster.qmny91x.mongodb.net/fullstackdb?retryWrites=true&w=majority&appName=Cluster";
const client = new MongoClient(uri);
let lessons, orders;

async function connectDB() {
  await client.connect();
  const db = client.db("fullstackdb");
  lessons = db.collection("lesson");
  orders  = db.collection("order");
}
connectDB();

// ---- REST API routes -----------------------------------
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await client
      .db("fullstackdb")
      .collection("lesson")
      .find()
      .toArray();
    res.json(lessons);
  } catch (err) {
    console.error("GET /lessons error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/orders", async (req, res) => {
  const order = req.body;              // { name, phone, lessonIDs, space }
  const result = await orders.insertOne(order);
  res.json({ insertedId: result.insertedId });
});

app.put("/lessons/:id", async (req, res) => {
  const { id }   = req.params;
  const updates  = req.body;           // e.g. { space: 4 }
  await lessons.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  res.json({ updated: true });
});

// ---- (optional) SEARCH route ----------------------------
app.get("/search", async (req, res) => {
  const q = req.query.q || "";
  const regex = new RegExp(q, "i");
  res.json(await lessons.find({
    $or: [
      { topic: regex },
      { location: regex },
      { price:   regex },
      { space:   regex }
    ]
  }).toArray());
});

// ---- start server --------------------------------------
app.listen(process.env.PORT || 3000, () =>
  console.log("API running on port 3000"));
