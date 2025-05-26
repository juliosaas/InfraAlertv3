import PinoHttp from "pino-http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

export const logger = PinoHttp({
  transport: {
    level: "debug",
    target: "pino-pretty",
    options: {
      destination: 2,
      all: true,
      translateTime: true,
    }
  },
});

const app = express();

app.use(cors());
app.use(logger);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.clear()
  console.log("Servidor da API está rondando na porta http://localhost:3000\n")
})

app.get("/", ((req, res) => { return res.json({ message: "Seja bem vindo ao INFRAALERT" }) }))

export default app;