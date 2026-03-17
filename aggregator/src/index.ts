import express from "express";
import profileRoutes from "./routes/profile.js";

const app = express();

app.use(express.json());

app.use("/profile", profileRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Aggregator running on port ${PORT}`);
});