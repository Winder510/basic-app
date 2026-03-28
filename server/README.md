# Backend Server - Cinema API

Node.js + Express + MongoDB

---

## 🚀 Quick Start

### Local Development

```bash
npm install
npm start           # Run with nodemon (auto-reload)
```

Server runs at `http://localhost:3000`

### Production Docker

```bash
docker build -t cinema-backend .
docker run -p 8000:8000 --env-file .env cinema-backend
```

---

## 📁 Directory Structure

```
src/
├── controllers/           # Request handlers
│   └── user.controller.js
├── models/               # MongoDB schemas
│   └── user.model.js
├── services/             # Business logic
│   └── user.service.js
├── routes/               # API endpoints
│   ├── index.js
│   └── user.route.js
├── middleware/           # Middleware
│   └── basic-authen.js
├── dbs/                  # Database config
│   └── init.mongo.js
├── metrics/              # Prometheus
│   └── prometheus.js
├── core/                 # Response handlers
│   ├── success.response.js
│   └── error.response.js
├── helper/               # Helper functions
│   └── index.js
├── utils/                # Utilities
│   ├── statusCode.js
│   ├── reasonPhrases.js
│   └── index.js
├── tests/                # Tests
│   └── dbCheck.test.js
└── server.js             # Main entry

```

---

## 🔌 API Endpoints

### Health Check

```
GET /
Response: OK
```

### Users

```
GET    /api/users           # List all users
POST   /api/users           # Create user
GET    /api/users/:id       # Get user
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

### Metrics

```
GET /metrics               # Prometheus metrics
```

---

## ⚙️ Configuration

### .env file

```env
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
NODE_ENV=development
```

### Docker config

- **Port**: 8000 (exposed in docker-compose)
- **Internal Port**: 3000 (configured in app)

---

## 🧪 Testing

```bash
npm run db-check    # Test database connection
```

---

## 📊 Monitoring

Prometheus metrics endpoint: `/metrics`

**Metrics collected**:

- HTTP request count
- Request duration
- Error rates
- Custom application metrics

---

## 📦 Dependencies

- `express`: ^4.21.1 - Web server
- `mongoose`: ^8.7.0 - MongoDB ODM
- `mongodb`: ^6.9.0 - MongoDB driver
- `cors`: ^2.8.5 - CORS handling
- `morgan`: ^1.10.0 - HTTP logging
- `prom-client`: ^15.1.3 - Prometheus metrics
- `dotenv`: ^17.3.1 - Environment variables
- `dayjs`: ^1.11.20 - Date utility
- `nodemon`: ^3.1.7 - Auto-reload (dev)

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
# Using docker: docker-compose up

# Verify MONGODB_URI in .env
echo $MONGODB_URI
```

### Process already listening

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module not found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🔐 Security

- CORS enabled for all origins (\*)
- Basic authentication middleware included
- Error handling with proper status codes

---

## 📝 Code Style

- ESM module system
- Async/await for asynchronous operations
- Middleware pattern for request processing

---

**Server running? Routes should be working! ✅**
