import Router from "express";
import requestController from "../controllers/request/request.controller.js";

const searchStatisticsRouter = new Router();

searchStatisticsRouter.get("/getNewId", requestController.getNewId.bind(requestController));
searchStatisticsRouter.post("/sendRequest", requestController.sendRequest.bind(requestController));
searchStatisticsRouter.get("/getRequests", requestController.getRequests.bind(requestController));
// for tests
searchStatisticsRouter.delete("/deleteRequests", requestController.deleteRequests.bind(requestController));
searchStatisticsRouter.delete("/deleteLastIssuedId", requestController.deleteLastIssuedId.bind(requestController));

// db init
searchStatisticsRouter.post("/createTables", requestController.createTables.bind(requestController));

export default searchStatisticsRouter;
