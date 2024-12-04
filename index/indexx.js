const cron = require('node-cron');
const orders = require('./models/orders');

// CRON job: Update order statuses
cron.schedule('*/5 * * * *', () => {
  orders.forEach(order => {
    if (order.status === 'Preparing') order.status = 'Out for Delivery';
    else if (order.status === 'Out for Delivery') order.status = 'Delivered';
  });
  console.log('Order statuses updated');
});
const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(bodyParser.json());

// Routes
app.use(menuRoutes);
app.use(orderRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
