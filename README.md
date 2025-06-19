# Receipt PDF Microservice

This project is a Node.js API microservice that generates PDF receipts from provided data. It utilizes Express for routing and `pdftoolkit` for PDF generation. The receipts are styled to fit A4 size and are generated using HTML and CSS templates.

## Project Structure

```
receipt-pdf-microservice
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers
│   │   └── receiptController.js # Handles receipt generation logic
│   ├── routes
│   │   └── receiptRoutes.js     # Defines API routes for receipt generation
│   ├── services
│   │   └── pdfService.js        # Contains methods for PDF generation
│   ├── templates
│   │   ├── receipt.html         # HTML structure for the receipt
│   │   └── styles.css           # CSS styles for the receipt
│   └── utils
│       └── idGenerator.js       # Generates unique receipt IDs
├── package.json                 # npm configuration file
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd receipt-pdf-microservice
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. API Endpoint:
   - **POST /api/receipts**: Generates a PDF receipt.
     - **Request Body**: JSON object containing receipt data.
     - **Response**: Returns a JSON object with `receiptId` and `filePath`.

## Example Request

```json
POST /api/receipts
{
  "customerName": "John Doe",
  "items": [
    {
      "description": "Product 1",
      "quantity": 2,
      "price": 10.00
    },
    {
      "description": "Product 2",
      "quantity": 1,
      "price": 20.00
    }
  ],
  "total": 40.00
}
```

## Example Response

```json
{
  "receiptId": "123456789",
  "filePath": "/path/to/receipt.pdf"
}
```

## License

This project is licensed under the MIT License.