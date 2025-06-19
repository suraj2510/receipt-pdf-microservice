// src/services/pdfService.js

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const generateReceiptId = require("../utils/generateReceiptId");

class PDFService {
  async generatePDF(data) {
    const receiptId = generateReceiptId(); // Generate a new receipt ID
    const htmlContent = this.renderHTML({ ...data, receiptId });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return { buffer: pdfBuffer, receiptId };
  }

  renderHTML(data) {
    const templatePath = path.join(__dirname, "..", "templates", "receiptTemplate.html");
    let html = fs.readFileSync(templatePath, "utf-8");

    html = html
      .replace("{{receiptId}}", data.receiptId)
      .replace("{{date}}", data.date)
      .replace("{{customerName}}", data.customerName)
      .replace("{{customerEmail}}", data.customerEmail)
      .replace("{{customerPhone}}", data.customerPhone)
      .replace("{{total}}", data.total);

    const itemRows = data.items
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
        </tr>`
      )
      .join("");

    html = html.replace(/<tbody>.*<\/tbody>/s, `<tbody>${itemRows}</tbody>`);

    return html;
  }
}

module.exports = new PDFService(); // ✅ Exporting an instance
