<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Project Setup Guide</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2rem;
      background-color: #f7f7f7;
      color: #333;
    }
    h1 {
      color: #2563eb;
    }
    code {
      background-color: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.95rem;
    }
    pre {
      background-color: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    img {
      margin-top: 1rem;
      width: 100%;
      max-width: 100%;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>

  <h1>🚀 Project Setup Guide</h1>

  <h2>1. Create Project Structure</h2>
  <p>Create two folders: <code>Frontend</code> and <code>Backend</code>.</p>

  <h2>2. Frontend Setup</h2>
  <p>Open a terminal inside the <code>Frontend</code> folder and run the following commands:</p>
  <pre>
npm create vite@latest .
# Select: React (JavaScript variant)

npm install
npm run dev
  </pre>

  <h2>3. Backend Setup</h2>
  <p>Inside the <code>Backend</code> folder, open a terminal and run:</p>
  <pre>
npm init -y

npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io

npm i nodemon -D
  </pre>
  <p>Create an entry file named <code>index.js</code>.</p>

  <h2>4. Install Tailwind CSS v3 and DaisyUI v4</h2>
  <p>Follow official instructions or use:</p>
  <pre>
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install daisyui
  </pre>

  <h2>5. Add Environment Variables</h2>
  <p>Add your Cloudinary keys and MongoDB URI in a <code>.env</code> file inside <code>Backend</code>:</p>
  <pre>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_uri
  </pre>

  <h2>6. Run the Project</h2>
  <p>Start both frontend and backend:</p>
  <pre>
# For Backend
npm start

# For Frontend
npm run dev
  </pre>

  <h2>📸 Output Screens</h2>
  <img src="https://github.com/user-attachments/assets/f54530de-7f5a-49a5-a44b-06d5d550e1e2" alt="App Screenshot 1">
  <img src="https://github.com/user-attachments/assets/d21b054f-27a3-4840-879b-33062668793a" alt="App Screenshot 2">
  <img src="https://github.com/user-attachments/assets/cd22a96b-c9c7-4333-8c78-dc0b47b65432" alt="App Screenshot 3">

</body>
</html>
