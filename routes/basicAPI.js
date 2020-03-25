const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    `<h1 style="text-align:center; margin-top:40vh">Welcome to Utriao API</h1>`
  );
});

module.exports = router;
