# BloomTask — Your Cozy Little Workspace 🌸
# Live Website Link - https://task-management-app-swart-psi.vercel.app/
A full-stack, multi-user Task Management Web Application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). Designed with a warm stationery aesthetic inspired by journals, scrapbook planners, and gentle little gardens to keep productivity calm, focused, and delightful.

---

## 📌 Technology Stack

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite 8 | Ultra-fast SPA, responsive desktop/tablet/mobile layouts |
| **Styling** | Tailwind CSS v4 | CSS variables, warm cream light mode (`#fdfbf7`), cozy night sky dark mode (`#17151e`) |
| **Aesthetic** | Stationery & Garden Desks | Pastel palettes (Lavender, Blush, Sage, Peach, Butter), gentle washi tape badges |
| **Icons** | Custom Modular SVG Suite | Zero-overhead, lightweight SVG motifs (`Sprout`, `Flower`, `Heart`, `Sparkles`, etc.) |
| **Client Auth & State**| React Context + API Service | Session restoration on reload, HttpOnly cookie support, Bearer token fallback |
| **Backend API** | Node.js + Express.js (ESM) | RESTful API with route protection, cookie parser, rate limiting |
| **Database** | MongoDB Atlas / Local MongoDB | Mongoose schemas with compound indexes and strict ownership |
| **Authentication** | bcryptjs + JSON Web Tokens (JWT) | Salted password hashing (10 rounds), HttpOnly cookie transmission |
| **Deployment Ready** | Vercel (Client) + Render (API) | Dual-cloud deployment with CORS and Cross-Site cookie support |

---

## 🔒 Multi-Tenant Data Isolation & Security

BloomTask enforces strict multi-user privacy:
1. **Empty Workspace Guarantee**: Every new registered user starts with an empty workspace (`0` tasks). No fake tasks, sample seeds, or placeholder records are injected into user accounts.
2. **Database-Level Ownership**: Every task references its owner (`user: { type: ObjectId, ref: 'User', required: true, index: true }`).
3. **Zero Cross-User Leakage**: All task queries (`GET /api/tasks`, `POST /api/tasks`, etc.) filter strictly by `req.user._id`.
4. **Tampering Protection**: Modifying or deleting another user's task ID immediately returns `403 Forbidden`.
5. **Password Security**: Passwords are never stored in plaintext. Hashed with bcrypt before saving to MongoDB, and stripped from query projections (`select: false`).

---

## 📁 Directory Structure

```text
Task-Management-App/
├── README.md                           # Comprehensive documentation & setup guide
├── .gitignore                          # Root Git ignore rules
│
├── backend/                            # Express.js REST API Server
│   ├── .env.example                    # Template environment variables
│   ├── .env                            # Local development environment configuration
│   ├── package.json                    # Backend dependencies & npm scripts
│   ├── server.js                       # Express application bootstrap & route mounting
│   ├── config/
│   │   └── db.js                       # MongoDB Atlas / local database connection manager
│   ├── models/
│   │   ├── User.js                     # User Mongoose model with bcrypt hashing & validation
│   │   └── Task.js                     # Task model with status, priority, and user reference
│   ├── controllers/
│   │   ├── authController.js           # Registration, login, logout, me, and profile handlers
│   │   └── taskController.js           # Multi-tenant task CRUD operations & authorization
│   ├── routes/
│   │   ├── authRoutes.js               # Rate-limited auth routes (/api/auth)
│   │   └── taskRoutes.js               # Protected task routes (/api/tasks)
│   ├── middleware/
│   │   ├── auth.js                     # JWT verification (cookie + Bearer header)
│   │   └── errorHandler.js             # Centralized Mongoose & JWT error handler
│   └── utils/
│       └── generateToken.js            # JWT signing and HttpOnly cookie generation
│
└── frontend/                           # React + Vite Client Application
    ├── .env.example                    # Client environment template (VITE_API_URL)
    ├── .env                            # Client environment configuration
    ├── index.html                      # HTML template with Google Fonts (Fredoka, Patrick Hand)
    ├── package.json                    # Frontend dependencies & build commands
    ├── vite.config.js                  # Vite configuration with Tailwind CSS plugin
    └── src/
        ├── App.jsx                     # Application root with Auth & Theme context routing
        ├── index.css                   # Tailwind theme fonts, dark variant, cozy colors
        ├── main.jsx                    # React DOM entry point
        ├── context/
        │   ├── AuthContext.jsx         # User session, login, register, logout state
        │   └── ThemeContext.jsx        # Light/Dark mode & 5 pastel palette customizer
        ├── services/
        │   └── api.js                  # Centralized fetch API client with credentials & token
        ├── data/
        │   └── sampleTasks.js          # Metric calculation and date formatting utilities
        └── components/
            ├── auth/
            │   ├── WelcomePage.jsx     # Landing page for unauthenticated visitors
            │   ├── LoginPage.jsx       # Stationery login card with password visibility toggle
            │   └── RegisterPage.jsx    # Registration card with validation & matching checks
            ├── layout/
            │   ├── Sidebar.jsx         # Desktop sidebar & mobile drawer with garden growth
            │   └── Header.jsx          # Top navigation with user profile menu & theme control
            ├── dashboard/
            │   ├── DashboardView.jsx   # Metric cards, growth meters, recent blooms, health ping
            │   ├── StatCards.jsx       # 4 dynamic stat cards (Total, Bloomed, Sprouting, Urgent)
            │   └── TaskOverview.jsx    # Growth stages breakdown & urgency petals
            ├── tasks/
            │   ├── TaskListView.jsx    # Filterable list view with cute empty garden state
            │   ├── TaskCard.jsx        # Stationery card with bloom checkbox & action buttons
            │   ├── BoardView.jsx       # Seedling Board (To Do, Sprouting, Bloomed)
            │   ├── TaskModal.jsx       # Plant / Tend to Task dialog with validations
            │   └── DeleteConfirmModal.jsx # Destructive confirmation modal
            ├── calendar/
            │   └── CalendarView.jsx    # Monthly planner with scheduled task markers
            ├── settings/
            │   └── ThemeSettings.jsx   # Cozy studio for pastel palettes & JSON theme export
            └── common/
                ├── Badge.jsx           # Washi tape style status and priority tags
                ├── Icons.jsx           # Handcrafted SVG icons suite
                └── ThemeModal.jsx      # Quick theme modal dialog
```

---

## 🎨 Design System & Theme Customization

BloomTask features 5 customizable pastel accent palettes:
1. **Soft Lavender** (`#8b7bc9`) — Default calm and dreamy mood.
2. **Blush Blossom** (`#e87a90`) — Sweet floral stationery feel.
3. **Sage Garden** (`#65a382`) — Fresh herbs and leafy seedlings.
4. **Peach Sorbet** (`#f09070`) — Warm, sunny, cheerful energy.
5. **Buttercup Gold** (`#e5a93b`) — Golden honey and sunflowers.

Switch between **Sunny Desk (Light Mode)** and **Cozy Night Sky (Dark Mode)** anytime from the header or settings. Your chosen preference persists across page refreshes and browser restarts.

---

## 🚀 Running the Application Locally

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` OR a free MongoDB Atlas cluster)

### Step 1: Start the Backend API Server
Open a terminal in the project directory:
```powershell
cd backend
npm install
npm run dev
```
> Server runs at `http://localhost:5000`  
> Health check: `http://localhost:5000/api/health`

### Step 2: Start the Frontend React Client
Open a second terminal in the project directory:
```powershell
cd frontend
npm install
npm run dev
```
> Open your browser at `http://localhost:5173`

---

## 🌐 Deploying to Production (Render + Vercel)

### 1. Database: MongoDB Atlas
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere).
3. Under **Database Access**, create a database user and password.
4. Under **Clusters > Connect > Drivers**, copy the connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/bloomtask?retryWrites=true&w=majority
   ```

### 2. Backend: Render (Web Service)
1. Push your repository to GitHub.
2. Create a **New Web Service** on [Render](https://render.com).
3. Connect your repository and configure:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `CLIENT_URL`: `https://your-frontend.vercel.app` (your Vercel domain)
   - `MONGODB_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `your_long_random_jwt_secret_key`
   - `JWT_EXPIRES_IN`: `7d`

### 3. Frontend: Vercel
1. Import your repository into [Vercel](https://vercel.com).
2. Configure project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
3. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com` (your Render URL without trailing slash)
4. Click **Deploy**.

---

## 🧪 Automated End-to-End Verification Results

All 14 comprehensive E2E tests have been verified:
- [x] **Check 1: Health Check** — Express API responded with HTTP 200 and healthy Mongoose status.
- [x] **Check 2: Registration** — New user created with bcrypt password hashing and signed JWT.
- [x] **Check 3: Empty Workspace** — Confirmed new user account begins with exactly 0 tasks.
- [x] **Check 4: Task Creation** — User successfully planted a task with priority, due date, and category.
- [x] **Check 5: User Tasks Fetch** — User workspace accurately retrieved their 1 task.
- [x] **Check 6: Second User Registration** — User B registered with separate credentials.
- [x] **Check 7: Strict Data Isolation** — User B saw 0 tasks; User A's task was completely invisible.
- [x] **Check 8: Cross-User Read Protection** — User B requesting User A's task was blocked with 403 Forbidden.
- [x] **Check 9: Cross-User Delete Protection** — User B deleting User A's task was blocked with 403 Forbidden.
- [x] **Check 10: Independent Task Creation** — User B created their own private task.
- [x] **Check 11: Task Update** — User B updated their task status to "Completed".
- [x] **Check 12: Task Deletion** — User B removed their task from their garden.
- [x] **Check 13: Data Integrity** — User A's task remained completely intact and untouched.
- [x] **Check 14: Session Restoration** — `/api/auth/me` restored authenticated profile seamlessly.
- [x] **Production Frontend Build** — `vite build` completed with 0 errors and 0 warnings.
