import { Request, Response, Router } from "express";
import rabbitController from "../controllers/rabbit.controller";

const route = Router();
console.log(`initial Rabbit Route`);
route.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200);
});

route.post("/sendMessage", rabbitController.sendMessage);
route.post("/getMessage", rabbitController.getMessage);
route.post("/getOneMessage", rabbitController.getOneMessage);

export default route;
