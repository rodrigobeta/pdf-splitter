# PDF Splitter

PDF Splitter is a simple and efficient web tool designed to split a PDF file into multiple documents, generating one file for each page of the original.

## How It Works

The application uses a modern architecture with an interactive frontend and a robust backend:

*   **Frontend**: Built with React, it provides a clean user interface for you to select and upload your PDF file.
*   **Backend**: Developed in Python with the Flask micro-framework, it handles receiving the file, processing it, and returning the result.

The workflow is as follows:

1.  The user selects a PDF file on the web page.
2.  The frontend sends the file to the server.
3.  The backend uses the `pypdf` library to read the document and create a new PDF for each page.
4.  All generated files are compressed into a single `.zip` file.
5.  The server sends this `.zip` file back to the browser, automatically starting the download.

## Installation and Setup

To run this project in your local environment, you will need **Python 3** and **Node.js** installed. The project is divided into two parts: `backend` and `frontend`.

### 1. Backend Setup (Python/Flask)

First, set up the server that will process the files.

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create and activate a virtual environment
# On Windows:
python -m venv venv
.\\venv\\Scripts\\activate

# On macOS/Linux:
python -m venv venv
source venv/bin/activate

# 3. Install the necessary dependencies
# (Flask, Flask-CORS, pypdf)
pip install -r requirements.txt

# 4. Start the server
python app.py
```

> **Nota**: Si aún no tienes un archivo `requirements.txt`, puedes crearlo fácilmente en tu terminal (con el entorno virtual activo) usando el comando: `pip freeze > requirements.txt`.

El servidor backend estará corriendo en `http://localhost:5001`.

### 2. Configuración del Frontend (React)

Ahora, en una nueva terminal, configura la interfaz de usuario.

```bash
# 1. Navega a la carpeta del frontend
cd pdf-splitter-frontend

# 2. Instala todas las dependencias del proyecto
npm install

# 3. Inicia la aplicación de React
npm run dev
```

La aplicación frontend estará visible en tu navegador, usualmente en `http://localhost:5173`.

¡Y eso es todo! Con ambos servidores en ejecución, ya puedes abrir la dirección del frontend en tu navegador y empezar a dividir tus archivos PDF.