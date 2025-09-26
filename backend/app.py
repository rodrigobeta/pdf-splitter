import os
import io
import zipfile
from pypdf import PdfReader, PdfWriter, errors
from flask import Flask, request, send_file
from flask_cors import CORS
from pypdf import PdfReader, PdfWriter

app = Flask(__name__)
CORS(app)

@app.route("/api/upload", methods=['POST'])
def upload_file():
    """
    Handles the PDF file upload, splits it into individual pages,
    zips them, and sends the zip file back for download.
    """
    # 1. Validate the incoming request
    if 'pdfFile' not in request.files:
        return "No file part in the request.", 400

    file = request.files['pdfFile']
    if file.filename == '':
        return "No file selected.", 400

    try:
        # 2. Process the PDF file from the request stream
        reader = PdfReader(file.stream)
        total_pages = len(reader.pages)
        base_filename = os.path.splitext(file.filename)[0]

        output_filenames = []
        temp_files = []

        # 3. Create individual PDF pages
        for i in range(total_pages):
            writer = PdfWriter()
            writer.add_page(reader.pages[i])

            output_filename = f"{base_filename}_page_{i + 1}.pdf"
            temp_files.append(output_filename)

            # Write each page to a temporary file on disk
            with open(output_filename, "wb") as output_pdf:
                writer.write(output_pdf)

        # 4. Create a ZIP file in memory to hold the individual pages
        memory_file = io.BytesIO()
        with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zf:
            for f in temp_files:
                zf.write(f)
        # Reset the pointer of the in-memory file to the beginning
        memory_file.seek(0)

    except errors.PdfReadError:
        return "Invalid or corrupted PDF file.", 400
    except Exception as e:
        # General error handling for unexpected issues during processing
        return f"An error occurred while processing the PDF: {str(e)}", 500
    finally:
        # 5. Clean up the temporary PDF files created on disk
        # This block executes whether the try block succeeded or failed
        for f in temp_files:
            if os.path.exists(f):
                os.remove(f)

    # 6. Send the in-memory ZIP file to the user for download
    return send_file(
        memory_file,
        download_name=f'{base_filename}_split.zip',
        as_attachment=True,
        mimetype='application/zip'
    )

if __name__ == "__main__":
    # Runs the Flask application on port 5001 with debug mode enabled.
    # Debug mode should be turned off in a production environment.
    app.run(debug=True, port=5001)