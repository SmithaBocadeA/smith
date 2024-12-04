const express = require('express');
const menuItems = require('../models/menu');
const { validateMenuItem } = require('../utils/validation');
const router = express.Router();

router.post('/menu', (req, res) => {
  const error = validateMenuItem(req.body);
  if (error) return res.status(400).send(error);

  const newItem = { id: menuItems.length + 1, ...req.body };
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

router.get('/menu', (req, res) => {
  res.status(200).json(menuItems);
});

module.exports = router;



