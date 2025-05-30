import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://bookmydoc-xi.vercel.app",
      "https://bookmydoc-admin.vercel.app",
    ],
    credentials: true, // if you're using cookies or sessions
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);

// GET Reviews
app.get("/api/reviews", async (req, res) => {
  const demoReviews = (await Review.find().sort({ date: -1 })) || [
    {
      name: "Alice",
      rating: 5,
      comment: "Excellent service!",
    },
    {
      name: "Bob",
      rating: 4,
      comment: "Good, but could be faster.",
    },
    {
      name: "Charlie",
      rating: 3,
      comment: "Average experience.",
    },
    {
      name: "Diana",
      rating: 2,
      comment: "Not very satisfied.",
    },
    {
      name: "Ethan",
      rating: 1,
      comment: "Very poor experience.",
    },
  ];

  res.json(demoReviews);
});

// POST Review
app.post("/api/reviews", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json({ message: "Review added" });
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
