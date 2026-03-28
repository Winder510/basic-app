# DevOps Programming Test - Cinema Application

Cinema Management Application with Node.js Backend + React Frontend

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Local Setup and Run](#local-setup-and-run)
4. [Project Structure](#project-structure)
5. [API Documentation](#api-documentation)
6. [Docker & Kubernetes](#docker--kubernetes)
7. [Troubleshooting](#troubleshooting)

---

## 🎬 Introduction

This project includes:

- **Backend**: Express.js server with MongoDB
- **Frontend**: React + Vite UI
- **Monitoring**: Prometheus metrics
- **Deployment**: Docker & Kubernetes

---

## 💻 System Requirements

- Node.js v18+ (or Docker)
- MongoDB (or use container)
- Docker & Docker Compose (optional)

---

## 🚀 Local Setup and Run

### Option 1: Run with Docker Compose (Easiest)

```bash
docker-compose up --build
```

- **Frontend**: http://localhost (port 80)
- **Backend**: http://localhost:8000
- **Metrics**: http://localhost:8000/metrics

### Option 2: Run on Local Machine

#### 1. Backend Setup

```bash
cd server
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
EOF

npm start
```

Backend runs at `http://localhost:3000`

#### 2. Frontend Setup

```bash
cd client
npm install

# Create .env file (if needed)
npm run dev
```

Frontend runs at `http://localhost:5173` (Vite dev server)

---

## 📁 Project Structure

```
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Middleware (auth, etc)
│   │   ├── dbs/               # Database connections
│   │   ├── metrics/           # Prometheus metrics
│   │   ├── tests/             # Unit tests
│   │   └── utils/             # Helper functions
│   ├── server.js              # Entry point
│   └── package.json
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── HomePage.jsx       # Main page
│   │   ├── main.jsx           # Entry point
│   │   └── config.js
│   ├── public/
│   │   └── config.js
│   ├── nginx.conf             # Nginx config for production
│   └── package.json
│
├── manifest/                  # Kubernetes manifests
│   ├── be.yaml               # Backend deployment
│   ├── fe.yaml               # Frontend deployment
│   ├── configmap.yaml        # Environment config
│   ├── secret.yaml           # Sensitive data
│   └── namespace.yaml        # K8s namespace
│
└── docker-compose.yml        # Docker Compose config
```

---

## 🔌 API Documentation

### Base URL

- **Local**: `http://localhost:3000`
- **Docker**: `http://localhost:8000`

### User APIs

#### GET `/api/users`

Get all users list

```bash
curl http://localhost:3000/api/users
```

#### POST `/api/users`

Create new user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

#### GET `/api/users/:id`

Get user by ID

```bash
curl http://localhost:3000/api/users/123
```

#### PUT `/api/users/:id`

Update user

```bash
curl -X PUT http://localhost:3000/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane"}'
```

#### DELETE `/api/users/:id`

Delete user

```bash
curl -X DELETE http://localhost:3000/api/users/123
```

### Health Check

```bash
curl http://localhost:3000/     # Returns "OK"
```

### Metrics

```bash
curl http://localhost:3000/metrics    # Prometheus metrics
```

---

## 🐳 Docker & Kubernetes

### Docker Compose

Run entire application:

```bash
docker-compose up --build          # Start
docker-compose down                # Stop
docker-compose logs -f             # View logs
```

### Docker Individual Build

```bash
# Build backend
docker build -t cinema-backend ./server

# Build frontend
docker build -t cinema-frontend ./client
```

### Kubernetes Deployment

**Deploy**: Send manifest to K8s server

```bash
scp -r ./manifest/ devops@192.168.1.121:~/projects
kubectl apply -f manifest/
```

**Check pods**:

```bash
kubectl get pods -n cinema
kubectl logs -f deployment/backend -n cinema
```

**Delete deployment**:

```bash
kubectl delete -f manifest/
```

---

## 🧪 Testing

### Database Connection Test

```bash
cd server
npm run db-check
```

### Lint Check (Frontend)

```bash
cd client
npm run lint
```

---

## 📊 Monitoring

### Prometheus Metrics

- **Endpoint**: `http://localhost:3000/metrics`
- **Metrics provided**:
  - Request count
  - Request duration
  - Error rates
  - Custom application metrics

---

## 🔑 Environment Variables

### Backend (server/.env)

```env
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
NODE_ENV=development
```

### Frontend (client/.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## 🐛 Troubleshooting

### 1. MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:

- Ensure MongoDB is running
- Check MONGODB_URI in .env
- If using Docker: `docker-compose up`

### 2. Port Already in Use

```
Error: listen EADDRINUSE :::3000
```

**Solution**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9         # macOS/Linux
netstat -ano | findstr :3000          # Windows
```

### 3. CORS Error

**Solution**: Backend is configured with CORS for all origins (`*`)

### 4. Frontend can't find Backend

**Solution**: Update `VITE_API_URL` in `client/.env`

---

## 📝 Main Scripts

### Backend

```bash
npm start           # Run server (nodemon auto-reload)
npm run db-check    # Test database connection
```

### Frontend

```bash
npm run dev      # Run dev server (Vite)
npm run build    # Build production
npm run lint     # ESLint check
npm run preview  # Preview production build
```

---

## 📦 Main Dependencies

### Backend

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-Origin Resource Sharing
- **morgan**: HTTP request logger
- **prom-client**: Prometheus metrics
- **dotenv**: Environment variables

### Frontend

- **react**: UI library
- **vite**: Build tool
- **bootstrap**: CSS framework
- **react-bootstrap**: Bootstrap React components
- **axios**: HTTP client

---

## 👤 Author

DevOps Programming Test

## 📄 License

ISC

---

## 📞 Support

If you have issues, please:

1. Check logs: `docker-compose logs`
2. Review `.env` configuration
3. Check network connectivity

**Happy Coding! 🚀**
