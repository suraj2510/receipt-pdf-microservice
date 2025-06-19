// src/routes/receiptRoutes.js
const express = require("express");
const ReceiptController = require("../controllers/receiptController");
const PDFService = require("../services/pdfService");
const generateReceiptId = require("../utils/generateReceiptId");

function setReceiptRoutes(app) {
  const router = express.Router();
  const receiptController = new ReceiptController(PDFService, generateReceiptId);

  router.post("/generate", receiptController.generateReceipt);

  app.use("/api/receipts", router);
}

module.exports = setReceiptRoutes; // ✅ Exporting the function
