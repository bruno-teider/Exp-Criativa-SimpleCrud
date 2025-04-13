import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute/userroute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", userRoute);
app.listen(8080); // Porta do backend, fazer chamadas por ela
