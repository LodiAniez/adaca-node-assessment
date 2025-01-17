import express from "express";
import cors from "cors";
import { json } from "body-parser";
import userRoutes from "./routes/user.route";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/users", userRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

export default app;
