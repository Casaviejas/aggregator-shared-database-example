import dotenv from "dotenv";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";

import profileRoutes from "./routes/profile";

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/profile", profileRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Aggregator running on port ${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/docs`);
});