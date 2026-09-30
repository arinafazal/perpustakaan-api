import express from "express";
import dotenv from "dotenv";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Root endpoint test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Library API" });
});

// Routes
app.use("/api/loans", loanRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
