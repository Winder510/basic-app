# QUICK REFERENCE - Cinema DevOps

Tài liệu tham khảo nhanh cho Cinema Application

---

## 🎯 Chế độ chạy ứng dụng

### 1️⃣ Cách Dễ Nhất: Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost (port 80)
- Backend: http://localhost:8000

### 2️⃣ Local Development

```bash
# Terminal 1: Backend
cd server && npm install && npm start

# Terminal 2: Frontend
cd client && npm install && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### 3️⃣ Kubernetes Deployment

```bash
# Push images
scp -r ./manifest/ devops@192.168.1.121:~/projects
kubectl apply -f manifest/
```

---

## 📦 Installation

### Prerequisites

```bash
# Option 1: Docker (Recommended)
docker --version
docker-compose --version

# Option 2: Local Node
node --version        # v18+
npm --version
# + MongoDB running locally
```

---

## 🗂️ Project Structure

```
├── server/           Backend (Node.js + Express)
├── client/           Frontend (React + Vite)
├── manifest/         Kubernetes configs
├── docker-compose.yml
└── README.md         Full docs
```

---

## ⚡ Commands Cheat Sheet

### Backend

```bash
cd server
npm install              # Install dependencies
npm start                # Start server (port 3000)
npm run db-check         # Test MongoDB connection
```

### Frontend

```bash
cd client
npm install              # Install dependencies
npm run dev              # Start dev (port 5173)
npm run build            # Build for production
npm run lint             # Check code style
npm run preview          # Preview production build
```

### Docker

```bash
docker-compose up --build       # Start all services
docker-compose down             # Stop all services
docker-compose logs             # View logs
docker-compose logs -f service  # Follow service logs
```

### Kubernetes

```bash
kubectl apply -f manifest/          # Deploy
kubectl get all -n cinema           # Check status
kubectl logs -f deployment/backend   # View logs
kubectl delete -f manifest/         # Delete
```

---

## 🌐 Endpoints

| Service      | URL                           | Port |
| ------------ | ----------------------------- | ---- |
| Frontend     | http://localhost              | 80   |
| Backend      | http://localhost:3000         | 3000 |
| Metrics      | http://localhost:3000/metrics | 3000 |
| Health Check | http://localhost:3000/        | 3000 |

---

## 📡 API Examples

### Get Health Status

```bash
curl http://localhost:3000/
```

### List Users

```bash
curl http://localhost:3000/api/users
```

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

### Get User

```bash
curl http://localhost:3000/api/users/123
```

### Update User

```bash
curl -X PUT http://localhost:3000/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane"}'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/123
```

---

## 🔧 Configuration Files

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## 🐛 Quick Troubleshooting

| Issue                    | Solution                                       |
| ------------------------ | ---------------------------------------------- |
| MongoDB connection error | Ensure MongoDB is running or use Docker        |
| Port already in use      | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Dependencies not found   | `rm -rf node_modules && npm install`           |
| Static files not loading | Check nginx.conf and frontend build            |
| Backend not responding   | Check CORS settings and port                   |
| API calls failing        | Verify VITE_API_URL and backend is running     |

---

## 📊 Monitoring

### Prometheus Metrics

```bash
curl http://localhost:3000/metrics
```

### Check Resource Usage

```bash
# Docker
docker stats

# Kubernetes
kubectl top pods -n cinema
```

---

## 🚀 Deployment Checklist

- [ ] Backend environment variables set (.env)
- [ ] Frontend API URL configured (.env)
- [ ] MongoDB connection working
- [ ] Docker images built
- [ ] Kubernetes manifests updated
- [ ] Port mappings correct
- [ ] CORS properly configured
- [ ] Logs accessible
- [ ] Health checks responsive

---

## 📞 Need Help?

1. Check **main README.md** for full documentation
2. Check **server/README.md** for backend docs
3. Check **client/README.md** for frontend docs
4. Check **manifest/README.md** for Kubernetes docs
5. Review docker-compose.yml for service configs

---

## 🔄 Common Workflows

### Start Development

```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev
```

### Build for Production

```bash
docker build -t cinema-backend ./server
docker build -t cinema-frontend ./client
```

### Deploy to Kubernetes

```bash
kubectl apply -f manifest/
kubectl get pods -n cinema
```

### Deploy with Docker Compose

```bash
docker-compose up -d
docker-compose logs -f
```

---

## 📚 Documentation Links

- [Main README](README.md)
- [Backend Docs](server/README.md)
- [Frontend Docs](client/README.md)
- [Kubernetes Docs](manifest/README.md)

---

**Everything ready? Let's ship it! 🚀**
