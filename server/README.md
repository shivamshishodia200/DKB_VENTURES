# DKB VENTURES — Backend & API Server

Production REST API engine for **DKB VENTURES** (Trading, Wholesale, Distribution and Retail Marketing).

---

## 🛠️ Stack
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **CORS & Environment:** cors, dotenv

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `MONGODB_URI` with your MongoDB Atlas or local connection string:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dkb_ventures?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:5000/`.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health and platform status check |
| `POST`| `/api/orders` | Create a customer retail order |
| `GET` | `/api/orders` | Fetch customer orders (for admin dashboard) |
| `POST`| `/api/enquiries` | Submit B2B wholesale enquiry & catalogue request |
| `GET` | `/api/enquiries` | Fetch wholesale enquiries |
| `POST`| `/api/distribution` | Submit regional distribution / stockist application |
| `GET` | `/api/distribution` | Fetch distribution applications |
| `GET` | `/api/products` | Fetch multi-brand product catalog |

