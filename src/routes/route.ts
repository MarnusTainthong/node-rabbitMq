import { Router } from "express";
import apiRoutes from "./apis.route";
import rabbitRoute from "./rabbit.route";

const route = Router();

route.use("/apis", apiRoutes);
route.use("/rabbit", rabbitRoute);

export default route;
