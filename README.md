# PDF Splitter

PDF Splitter is a simple and efficient web tool designed to split a PDF file into multiple documents, generating one file for each page of the original.

## How It Works

The application uses a modern architecture with an interactive frontend and a robust backend:

- **Frontend**: Built with React, it provides a clean user interface for you to select and upload your PDF file.
- **Backend**: Developed in Python with the Flask micro-framework, it handles receiving the file, processing it, and returning the result.

### Workflow

1. The user selects a PDF file on the web page.  
2. The frontend sends the file to the server.  
3. The backend uses the `pypdf` library to read the document and create a new PDF for each page.  
4. All generated files are compressed into a single `.zip` file.  
5. The server sends this `.zip` file back to the browser, automatically starting the download.  

---

## Installation and Setup

To run this project in your local environment, you will need **Python 3** and **Node.js** installed. The project is divided into two parts: **backend** and **frontend**.

### Backend Setup (Python/Flask)

First, set up the server that will process the files.

1. Navigate to the backend folder.  
2. Create and activate a virtual environment.  
   - On Windows: `python -m venv venv` and then `.\\venv\\Scripts\\activate`  
   - On macOS/Linux: `python -m venv venv` and then `source venv/bin/activate`  
3. Install the necessary dependencies (Flask, Flask-CORS, pypdf) using `pip install -r requirements.txt`.  
4. Start the server with `python app.py`.  

**Note:** If you don't already have a `requirements.txt` file, you can easily create one in your terminal (with the virtual environment activated) using the command: `pip freeze > requirements.txt`.  

The backend server will be running at **http://localhost:5001**.  

---

### Frontend Setup (React)

Now, in a new terminal, set up the user interface.

1. Navigate to the frontend directory (`cd pdf-splitter-frontend`).  
2. Install the project dependencies (`npm install`).  
3. Start the React development server (`npm run dev`).  

The frontend application will be available in your browser, usually at **http://localhost:5173**.  

---

## Usage

And that's it! With both servers running, you can now open the frontend URL in your browser and start splitting your PDF files. 🎉
