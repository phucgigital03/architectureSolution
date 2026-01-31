const amqp = require("amqplib");

const QUEUE = "order.queue";

async function startConsumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  console.log("🐰 Consumer waiting for messages...");

  channel.consume(QUEUE, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log("📥 Received order:", order);

      // xử lý nghiệp vụ ở đây
      channel.ack(msg);
    }
  });
}

startConsumer();
