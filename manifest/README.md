# Kubernetes Manifests - Cinema Deployment

Kubernetes configuration files for deploying Cinema application

---

## 📁 Files Overview

```
├── namespace.yaml      # Kubernetes namespace "cinema"
├── configmap.yaml      # Environment configuration
├── secret.yaml         # Sensitive data (API keys, credentials)
├── be.yaml            # Backend deployment
├── fe.yaml            # Frontend deployment
└── service.yaml       # Services (if needed)
```

---

## 🚀 Quick Start

### 1. Deploy All Manifests

```bash
kubectl apply -f manifest/
```

### 2. Check Deployment Status

```bash
kubectl get pods -n cinema
kubectl get services -n cinema
kubectl get deployments -n cinema
```

### 3. View Logs

```bash
# Backend logs
kubectl logs -f deployment/backend -n cinema

# Frontend logs
kubectl logs -f deployment/frontend -n cinema
```

### 4. Delete Deployment

```bash
kubectl delete -f manifest/
```

---

## 📋 Files Explanation

### namespace.yaml

Creates isolated namespace for cinema application

```yaml
Kind: Namespace
name: cinema
```

**Purpose**: Isolate cinema app from other workloads

---

### configmap.yaml

Stores non-sensitive environment variables

```yaml
data:
  MONGODB_URI: "mongodb://..."
  NODE_ENV: "production"
```

**Usage**: Referenced by pods as environment variables

---

### secret.yaml

Stores sensitive data (encrypted at rest)

```yaml
data:
  DB_PASSWORD: "base64-encoded-value"
  API_KEY: "base64-encoded-value"
```

**Usage**: Referenced by pods as environment variables

⚠️ **Note**: Update base64 encoded values before deployment

```bash
# Encode secret
echo -n "my-password" | base64

# Decode (for verification)
echo "bXktcGFzc3dvcmQ=" | base64 -d
```

---

### be.yaml (Backend Deployment)

Node.js Express server deployment

```yaml
Kind: Deployment
spec:
  replicas: 1
  containers:
    - image: cinema-backend:latest
      port: 3000
```

**Spec**:

- **Port**: 3000 (internal)
- **Exposed**: Via service
- **Environment**: Uses ConfigMap & Secret
- **Restart Policy**: Always

---

### fe.yaml (Frontend Deployment)

React Nginx frontend deployment

```yaml
Kind: Deployment
spec:
  replicas: 1
  containers:
    - image: cinema-frontend:latest
      port: 80
```

**Spec**:

- **Port**: 80 (http)
- **Static files**: Served by Nginx
- **Replicas**: 1 (can increase for load balancing)
- **Restart Policy**: Always

---

## 🔄 Workflow

### Deploy to K8s Cluster

```bash
# 1. Build images
docker build -t cinema-backend:latest ./server
docker build -t cinema-frontend:latest ./client

# 2. Push to registry (if using remote registry)
docker tag cinema-backend:latest registry.com/cinema-backend
docker push registry.com/cinema-backend

# 3. Update image in manifest
# Edit be.yaml and fe.yaml with correct image names

# 4. Deploy
kubectl apply -f manifest/

# 5. Verify
kubectl get all -n cinema
```

---

## 🔍 Debugging

### Check Pod Status

```bash
kubectl describe pod <pod-name> -n cinema
```

### Get Pod Logs

```bash
kubectl logs <pod-name> -n cinema -f
```

### Execute Commands in Pod

```bash
kubectl exec -it <pod-name> -n cinema -- /bin/bash
```

### Check Events

```bash
kubectl get events -n cinema
```

---

## 🌐 Accessing Application

### Port Forwarding (Local Testing)

```bash
# Backend
kubectl port-forward service/backend 3000:3000 -n cinema

# Frontend
kubectl port-forward service/frontend 80:80 -n cinema
```

Access: `http://localhost`

### Using Ingress (Production)

If ingress is configured:

```bash
kubectl get ingress -n cinema
```

---

## 📊 Resource Management

### Check Resource Usage

```bash
kubectl top pods -n cinema
kubectl top nodes
```

### Set Resource Limits

Edit be.yaml and fe.yaml:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

---

## 🔄 Scaling

### Scale Backend

```bash
kubectl scale deployment backend --replicas=3 -n cinema
```

### Scale Frontend

```bash
kubectl scale deployment frontend --replicas=2 -n cinema
```

### Auto-Scaling (HPA)

Create HPA manifest:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    kind: Deployment
    name: backend
  minReplicas: 1
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 80
```

---

## 🔒 Security Best Practices

1. **Never commit secrets** - Use sealed-secrets or external secret management
2. **Use image pull secrets** - For private registries
3. **Set resource limits** - Prevent resource exhaustion
4. **Use RBAC** - Restrict pod permissions
5. **Network policies** - Control traffic flow

---

## 🔄 Updating Deployment

### Update Image

```bash
kubectl set image deployment/backend \
  backend=cinema-backend:v1.1 -n cinema
```

### Rollback

```bash
kubectl rollout undo deployment/backend -n cinema
kubectl rollout history deployment/backend -n cinema
```

### Check Rollout Status

```bash
kubectl rollout status deployment/backend -n cinema
```

---

## 📝 Readiness & Liveness Probes

Add health checks to pod spec:

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

---

## 🛠️ Common Tasks

### Restart Pods

```bash
kubectl rollout restart deployment/backend -n cinema
```

### Export Manifest

```bash
kubectl get deployment backend -n cinema -o yaml > backup.yaml
```

### Dry-Run (Check Before Deploy)

```bash
kubectl apply -f manifest/ --dry-run=client
```

---

## 📊 Monitoring

### Check All Resources

```bash
kubectl get all -n cinema
```

### Watch Status

```bash
kubectl get pods -n cinema -w
```

### Detailed Info

```bash
kubectl describe deployment backend -n cinema
```

---

## ⚠️ Troubleshooting

### Pod Stuck in Pending

```bash
kubectl describe pod <pod-name> -n cinema
# Check events and resource availability
```

### Pod CrashLoopBackOff

```bash
kubectl logs <pod-name> -n cinema
# Check application logs
```

### Image Pull Errors

- Verify image exists
- Check image pull secrets
- Verify registry connectivity

### DNS Issues

```bash
# Test DNS from pod
kubectl exec -it <pod-name> -n cinema -- nslookup kubernetes.default
```

---

## 📚 Resources

- [Kubernetes Docs](https://kubernetes.io/docs)
- [kubectl Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Deployment Spec](https://kubernetes.io/docs/api-resources/apps-v1-Deployment/)

---

**Ready to cruise the cloud! ☁️**
