// src/controllers/receiptController.js

class ReceiptController {
  constructor(pdfService, generateReceiptId) {
    this.pdfService = pdfService;
    this.generateReceiptId = generateReceiptId;
  }

  generateReceipt = async (req, res) => {
    try {
      const data = req.body;
      const { buffer, receiptId } = await this.pdfService.generatePDF(data);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="receipt.pdf"',
      });

      res.send(buffer); // 👈 this is the key line that sends the PDF
    } catch (err) {
      console.error("Error generating receipt:", err);
      res.status(500).send("Failed to generate PDF");
    }
  };
}

module.exports = ReceiptController;
