import { Request, Response, Router } from "express";

const route = Router();

route.get("/", (req: Request, res: Response) => {
  console.log("initial route /APIs");
  res.status(200).send("APIs route");
});

export default route;
