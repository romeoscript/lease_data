# Full-Stack Lease Data Extraction System

## 📋 Overview

This project demonstrates a full-stack implementation that extracts structured data from commercial real estate Offering Memorandum (OM) PDFs. Users can upload PDF documents, and the system will automatically extract key lease information and display it in an organized interface.

## 📊 Key Features

### Backend
- PDF validation to identify legitimate Offering Memorandums
- Extraction of property details, tenant information, lease terms, and financial data
- Confidence scoring for data reliability assessment
- Detailed extraction metadata and warnings for low-confidence data

### Frontend
- Intuitive PDF upload interface with drag-and-drop capability
- Real-time progress indicators for upload and processing
- Comprehensive error handling with specific error messages
- Visual confidence scoring for extraction quality

## 🚀 How to Run the Project

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/romeoscript/lease_data.git
cd lease-data-extractor
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📋 Using the Application

1. **Accessing the Upload Feature**:
   - The PDF upload component is located at the bottom of the main page, below the lease data display area
   - Look for the card titled "Upload Offering Memorandum"

2. **Uploading a PDF**:
   - Click the "Select PDF File" button or drag and drop a PDF onto the upload area
   - Select an Offering Memorandum PDF (like the provided 280 Richards OM.pdf)
   - Click "Extract Data" to begin processing

3. **Viewing Extracted Data**:
   - Once processing completes, the lease data tabs at the top will automatically update
   - The property name in the header will change to reflect the extracted property
   - You can view extraction quality metrics in the success summary

4. **Reviewing Extraction Quality**:
   - The system provides confidence scores for each extracted field
   - Any low-confidence extractions will be highlighted with warnings
   - You can view detailed extraction metadata to assess data reliability

## 🏗️ Architecture

- **Frontend**: React/Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes for PDF processing
- **PDF Processing**: pdf.js for extraction, with regex pattern matching for data identification
- **State Management**: React hooks with custom extraction logic in a dedicated hook

## 💡 Technical Approach

- Used a custom hook (`usePDFProcessor`) to separate business logic from UI components
- Implemented modular components for better maintainability
- Added comprehensive error handling for various failure scenarios
- Designed an intuitive UI with clear feedback mechanisms
- Structured code to handle the complexities of PDF extraction with graceful fallbacks