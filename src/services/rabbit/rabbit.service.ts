import * as amqp from "amqplib";
const sendMessage = async (message: string = "") => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    const queue = "testQueue";
    await channel.assertQueue(queue, {
      durable: false,
    });

    // Send a message to the queue
    const isAlreadyAddQueue = channel.sendToQueue(queue, Buffer.from(message));

    console.log(`[x] Sent: ${message}`);

    if (isAlreadyAddQueue) {
      connection.close;
    }

    // await connection.close();
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
  }
};

const receivedMessage = async (queueName: string) => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    await channel.assertQueue(queueName, {
      durable: false,
    });

    console.log(`[x] Waiting for messages in ${queueName}`);

    // Receive messages
    await channel.consume(
      queueName,
      (message) => {
        if (!message) {
          console.log("[x] Received null message");
        } else {
          console.log(`[x] Received: ${message.content.toString()}`);
        }
      },
      {
        noAck: true,
      }
    );
    connection.close;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getOneMessage = async (queue: string) => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    await channel.assertQueue(queue, {
      durable: false,
    });

    console.log(`[x] Waiting for messages in ${queue}`);

    //  Receive message
    const message = await channel.get(queue, { noAck: true });
    if (!message) {
      console.log("[x] Received null message");
    } else {
      console.log(`[x] Received: ${message}`);
    }
    connection.close;
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(error.message);
  }
};

export default {
  sendMessage,
  receivedMessage,
  getOneMessage,
};
