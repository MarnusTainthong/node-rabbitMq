import { Request, Response } from "express";
import rabbitService from "../services/rabbit/rabbit.service";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const message: string = body.message;
    const result = await rabbitService.sendMessage(message);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getMessage = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const queue: string = body.queue;
    const result = await rabbitService.receivedMessage(queue);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneMessage = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const queue: string = body.queue;
    await rabbitService.getOneMessage(queue);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
export default {
  sendMessage,
  getMessage,
  getOneMessage,
};
