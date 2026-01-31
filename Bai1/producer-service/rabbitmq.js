const amqp = require("amqplib");

const QUEUE = "order.queue";
const EXCHANGE = "order.exchange";
const ROUTING_KEY = "order.created";

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

  console.log("🐰 Producer connected to RabbitMQ");
}

function sendOrderCreated(order) {
  channel.publish(
    EXCHANGE,
    ROUTING_KEY,
    Buffer.from(JSON.stringify(order))
  );
  console.log("📤 Sent event:", order);
}

module.exports = { connectRabbitMQ, sendOrderCreated };
