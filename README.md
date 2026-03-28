# DevOps Programming Test - Cinema Application

Ứng dụng Quản lý Rạp Chiếu Phim với Backend Node.js + Frontend React

---

## 📋 Mục Lục

1. [Giới thiệu](#giới-thiệu)
2. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
3. [Cài đặt và chạy ở local](#cài-đặt-và-chạy-ở-local)
4. [Cấu trúc dự án](#cấu-trúc-dự-án)
5. [API Documentation](#api-documentation)
6. [Docker & Kubernetes](#docker--kubernetes)
7. [Troubleshooting](#troubleshooting)

---

## 🎬 Giới thiệu

Dự án này bao gồm:

- **Backend**: Express.js server với MongoDB
- **Frontend**: React + Vite UI
- **Monitoring**: Prometheus metrics
- **Deployment**: Docker & Kubernetes

---

## 💻 Yêu cầu hệ thống

- Node.js v18+ (hoặc Docker)
- MongoDB (hoặc sử dụng container)
- Docker & Docker Compose (tùy chọn)

---

## 🚀 Cài đặt và chạy ở local

### Cách 1: Chạy với Docker Compose (Dễ nhất)

```bash
docker-compose up --build
```

- **Frontend**: http://localhost (port 80)
- **Backend**: http://localhost:8000
- **Metrics**: http://localhost:8000/metrics

### Cách 2: Chạy trên máy local

#### 1. Backend Setup

```bash
cd server
npm install

# Tạo file .env
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
EOF

npm start
```

Backend chạy tại `http://localhost:3000`

#### 2. Frontend Setup

```bash
cd client
npm install

# Tạo file .env (nếu cần)
npm run dev
```

Frontend chạy tại `http://localhost:5173` (Vite dev server)

---

## 📁 Cấu trúc dự án

```
├── server/                    # Backend Node.js
│   ├── src/
│   │   ├── controllers/       # Xử lý logic request
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
├── client/                    # Frontend React
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

Lấy danh sách tất cả users

```bash
curl http://localhost:3000/api/users
```

#### POST `/api/users`

Tạo user mới

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

#### GET `/api/users/:id`

Lấy thông tin user theo ID

```bash
curl http://localhost:3000/api/users/123
```

#### PUT `/api/users/:id`

Cập nhật user

```bash
curl -X PUT http://localhost:3000/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane"}'
```

#### DELETE `/api/users/:id`

Xóa user

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

Chạy toàn bộ ứng dụng:

```bash
docker-compose up --build          # Khởi động
docker-compose down                # Dừng
docker-compose logs -f             # Xem logs
```

### Docker Individual Build

```bash
# Build backend
docker build -t cinema-backend ./server

# Build frontend
docker build -t cinema-frontend ./client
```

### Kubernetes Deployment

**Deploy**: Gửi manifest sang server K8s

```bash
scp -r ./manifest/ devops@192.168.1.121:~/projects
kubectl apply -f manifest/
```

**Kiểm tra pods**:

```bash
kubectl get pods -n cinema
kubectl logs -f deployment/backend -n cinema
```

**Xóa deployment**:

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
- **Metrics cung cấp**:
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

### 1. Lỗi kết nối MongoDB

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Giải pháp**:

- Chắc chắn MongoDB đang chạy
- Kiểm tra MONGODB_URI trong .env
- Nếu dùng Docker: `docker-compose up`

### 2. Port đã được sử dụng

```
Error: listen EADDRINUSE :::3000
```

**Giải pháp**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9         # macOS/Linux
netstat -ano | findstr :3000          # Windows
```

### 3. CORS Error

**Giải pháp**: Backend đã cấu hình CORS cho tất cả origin (`*`)

### 4. Vite Frontend không tìm thấy Backend

**Giải pháp**: Cập nhật `VITE_API_URL` trong `client/.env`

---

## 📝 Scripts chính

### Backend

```bash
npm start           # Chạy server (nodemon auto-reload)
npm run db-check    # Test database connection
```

### Frontend

```bash
npm run dev      # Chạy dev server (Vite)
npm run build    # Build production
npm run lint     # ESLint check
npm run preview  # Preview production build
```

---

## 📦 Dependencies chính

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

Nếu có vấn đề, vui lòng:

1. Kiểm tra logs: `docker-compose logs`
2. Xem file `.env` configuration
3. Kiểm tra network connectivity

**Happy Coding! 🚀**
