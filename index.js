import express, { json } from "express";
import searchStatisticsRouter from "./routes/searchStatistics.router.js";

if (! process.env.NODE_ENV){
  const dotenv = await import('dotenv');
  dotenv.config()
}

console.log(
  process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD,
  process.env.DB_HOST,process.env.DB_PORT, process.env.POSTGRES_DB
);

const PORT = process.env.PORT || 8080;

const app = express();

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.use(json());
app.use("/searchStatistics", searchStatisticsRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
