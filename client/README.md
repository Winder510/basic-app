# Frontend Client - Cinema UI

React + Vite + Bootstrap + Tailwind CSS

---

## 🚀 Quick Start

### Local Development

```bash
npm install
npm run dev           # Run Vite dev server
```

Access at `http://localhost:5173`

### Production Build

```bash
npm run build         # Build optimized
npm run preview       # Preview production
```

### Docker Production

```bash
docker build -t cinema-frontend .
docker run -p 80:80 cinema-frontend
```

Access at `http://localhost`

---

## 📁 Directory Structure

```
src/
├── main.jsx          # Entry point
├── HomePage.jsx      # Main page component
├── config.js         # Frontend config
├── App.jsx           # Root component (if exists)
└── assets/           # Images, styles (if exists)

public/
└── config.js         # Public config

Dockerfile           # Production build
nginx.conf           # Nginx configuration
.env                 # Environment variables
```

---

## 🎨 Technologies

- **React 18**: UI library
- **Vite 5**: Build tool (super fast)
- **Bootstrap 5**: CSS framework
- **React-Bootstrap**: Bootstrap React components
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client
- **ESLint**: Code quality

---

## ⚙️ Configuration

### .env file

```env
VITE_API_URL=http://localhost:3000
```

### vite.config.js

- React plugin enabled
- Port: 5173 (default Vite)

---

## 🔧 Commands

### Development

```bash
npm run dev           # Start dev server (http://localhost:5173)
npm run lint          # ESLint check code
```

### Production

```bash
npm run build         # Create optimized build
npm run preview       # Preview build locally
```

---

## 📦 Dependencies

- `react`: ^18.3.1 - UI library
- `react-dom`: ^18.3.1 - React DOM rendering
- `vite`: ^5.4.8 - Build tool
- `bootstrap`: ^5.3.8 - CSS framework
- `react-bootstrap`: ^2.10.10 - Bootstrap components
- `tailwindcss`: ^4.2.1 - Utility CSS
- `axios`: ^1.13.6 - HTTP client
- `eslint`: ^9.11.1 - Code linting

---

## 🌐 API Integration

### Calling Backend API

```javascript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get users
const response = await axios.get(`${API_URL}/api/users`);

// Create user
await axios.post(`${API_URL}/api/users`, {
  name: "John",
  email: "john@example.com",
});
```

### Environment Variables

- `VITE_API_URL`: Backend API endpoint
- Variables must start with `VITE_` to be exposed to browser

---

## 🎯 Pages

### HomePage.jsx

- Main landing/dashboard page
- Displays cinema information
- User interactions

---

## 🐳 Docker Production Setup

### Dockerfile

- Multi-stage build for optimization
- Node build stage
- Nginx serve stage
- Exposed on port 80

### nginx.conf

- Serves static files
- SPA routing (all requests to index.html)
- Gzip compression

---

## 🧪 Linting

```bash
npm run lint          # Check code style
```

---

## 🐛 Troubleshooting

### Port 5173 already in use

```bash
# Kill process or specify different port
npm run dev -- --port 3001
```

### API calls failing

- Check `VITE_API_URL` in .env
- Backend must be running
- Check CORS settings in backend

### Build errors

```bash
# Clean reinstall
rm -rf node_modules
npm install
npm run build
```

### Vite not compiling JSX

- All files with React should be `.jsx`
- Check vite.config.js has React plugin

---

## 📱 Responsive Design

- Bootstrap Grid system for layout
- Tailwind for utility styling
- Mobile-first approach
- React-Bootstrap components are mobile-ready

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Creates `dist/` folder with optimized files

### Serve with Nginx

```bash
docker build -t cinema-frontend .
docker run -p 80:80 cinema-frontend
```

---

## 📝 Code Style

- React Functional Components
- Hooks for state management (if needed)
- ESLint rules enforced
- ES6+ syntax

---

## 🔗 Links

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Bootstrap**: https://getbootstrap.com
- **Tailwind**: https://tailwindcss.com

---

**UI looks good? Let's ship it! 🎬**
