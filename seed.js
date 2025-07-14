const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://uumoh022:lavender@cluster.qmny91x.mongodb.net/fullstackdb?retryWrites=true&w=majority&appName=Cluster"; // Add your real URI here
const client = new MongoClient(uri);

async function seedLessons() {
  try {
    await client.connect();
    const db = client.db("fullstackdb"); // or whatever database name you're using
    const lessons = db.collection("lesson");

    const sampleLessons = [
      {
        subject: "Math",
        location: "Hendon",
        price: 100,
        space: 35,
        image: "math.jpg"
      },
      {
        subject: "English",
        location: "Colindale",
        price: 80,
        space: 35,
        image: "english.jpg"
      },
      {
        subject: "Science",
        location: "Golders Green",
        price: 95,
        space: 25,
        image: "science.jpg"
      },
      {
        subject: "Further Mathematics",
        location: "Colindale",
        price: 125,
        space: 15,
        image: "further_mathematics.jpg"
      },
      {
        subject: "Physics",
        location: "Golders Green",
        price: 95,
        space: 15,
        image: "physics.jpg"
      },
      {
        subject: "Chemistry",
        location: "Golders Green",
        price: 135,
        space: 15,
        image: "chemistry.jpg"
      },
      {
        subject: "Biology",
        location: "Golders Green",
        price: 95,
        space: 20,
        image: "biology.jpg"
      },
      {
        subject: "Photograpy",
        location: "Golders Green",
        price: 125,
        space: 15,
        image: "photography.jpg"
      },
      {
        subject: "Arts & Craft",
        location: "Hendon",
        price: 195,
        space: 30,
        image: "arts.jpg"
      },
      {
        subject: "Food and Nutrition",
        location: "Golders Green",
        price: 220,
        space: 30,
        image: "fnut.jpg"
      },
    ];

    const result = await lessons.insertMany(sampleLessons);
    console.log(`${result.insertedCount} lessons inserted.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedLessons();
