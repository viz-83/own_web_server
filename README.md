# 🔒 Own Web Server – Node.js HTTPS Server (No Framework)

This project is a custom HTTPS web server built from scratch using **Node.js and ES modules**, with no external frameworks like Express. It supports static file serving, API routing, POST form handling, custom 404 pages, and SSL/TLS encryption using a self-signed certificate.

---

## 🚀 Features

- ✅ HTTPS support using self-signed certificates
- ✅ Serve static files (HTML, CSS, JS, images)
- ✅ Custom routing (`/`, `/api`, etc.)
- ✅ Handle POST requests and parse form data
- ✅ Custom 404 error page
- ✅ Minimal logging for each request
- ✅ No third-party dependencies

---

## 📁 Project Structure

```
own_web_server/
├── cert/
│   ├── cert.pem         # Self-signed SSL certificate
│   └── key.pem          # SSL private key
├── public/
│   ├── index.html       # Homepage
│   ├── style.css        # CSS file
├── server.js            # Main server code
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/viz-83/own_web_server.git
cd own_web_server
```

### 2. Generate SSL Certificates

```bash
mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem
```

Fill out the form (can use dummy info) — this creates the key and certificate files.

### 3. Run the Server

```bash
node server.js
```

Now open your browser and go to:

```
https://localhost:3000
```

> ⚠️ You will see a browser warning about the certificate — this is expected for self-signed certs.

---

## 🌐 Routes

| Route       | Method | Description                          |
|-------------|--------|--------------------------------------|
| `/`         | GET    | Serves `index.html` from `/public`   |
| `/api`      | GET    | Returns a JSON object                |
| `/submit`   | POST   | Handles form submission              |
| Any other   | GET    | Returns a custom 404 error page      |

---

## 📄 Example Form

```html
<form method="POST" action="/submit">
  <input type="text" name="username" placeholder="Your name" required />
  <button type="submit">Send</button>
</form>
```

The submitted data will be printed in the server console.

---

## 📦 .gitignore

```
cert/
node_modules/
.env
.DS_Store
```

Make sure not to commit sensitive files like SSL keys.

---

## 🧑‍💻 Author

**Vishnu K V**  
[🌐 Portfolio](https://viz-83.github.io/portfolio-website)  
📍 Bangalore, India

---

## 🪪 License

MIT License – feel free to use, modify, and share.

---

## 🙌 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.
