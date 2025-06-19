// src/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const setReceiptRoutes = require('./routes/receiptRoutes'); // ✅ should be the function

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
setReceiptRoutes(app); // ✅ Works if properly exported

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
