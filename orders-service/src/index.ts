import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ordersRoutes from "./routes/orders";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuración - Permitir todos los orígenes en desarrollo
app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/orders", ordersRoutes);

// Iniciar conexión a BD
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Swagger disponible en http://localhost:${PORT}/docs`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  });
