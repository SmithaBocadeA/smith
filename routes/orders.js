const express = require('express');
const orders = require('../models/orders');
const menuItems = require('../models/menu');
const { validateOrder } = require('../utils/validation');
const router = express.Router();

router.post('/orders', (req, res) => {
  const error = validateOrder(req.body.items, menuItems);
  if (error) return res.status(400).send(error);

  const newOrder = {
    id: orders.length + 1,
    status: 'Preparing',
    items: req.body.items.map(item => {
      const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
      return { ...menuItem, quantity: item.quantity };
    }),
    totalPrice: req.body.items.reduce((total, item) => {
      const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
      return total + menuItem.price * item.quantity;
    }, 0),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.get('/orders/:id', (req, res) => {
  const order = orders.find(order => order.id === parseInt(req.params.id));
  if (!order) return res.status(404).send("Order not found");
  res.status(200).json(order);
});

module.exports = router;
