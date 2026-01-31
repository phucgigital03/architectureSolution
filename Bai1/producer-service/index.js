const express = require("express");
const { connectRabbitMQ, sendOrderCreated } = require("./rabbitmq");

const app = express();
app.use(express.json());

app.post("/orders/:id", (req, res) => {
  const order = {
    orderId: req.params.id,
    createdAt: new Date()
  };

  sendOrderCreated(order);
  res.send("Order created: " + order.orderId);
});

const PORT = 3000;

connectRabbitMQ().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Producer running on port ${PORT}`)
  );
});
