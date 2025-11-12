# Backend API

Express.js backend for the contact form functionality.

## Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables in `.env`:**
   ```env
   PORT=3000
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=your-email-password
   CLIENT_ORIGIN=http://localhost:5173
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

## Deployment on Render

### Prerequisites
- GitHub account
- Render account (free tier available)

### Steps

1. **Push your code to GitHub** ✅ (Already done!)

2. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `NabeehaMahmood/hawktok`
   - Configure the service:
     - **Name:** `hawktok-backend` (or your preferred name)
     - **Region:** Choose closest to your users
     - **Branch:** `main`
     - **Root Directory:** `backend`
     - **Runtime:** `Node`
     - **Build Command:** `pnpm install`
     - **Start Command:** `pnpm start`

3. **Set Environment Variables:**
   In the Render dashboard, go to "Environment" and add:
   - `NODE_ENV` = `production`
   - `EMAIL_USER` = Your Hostinger email (e.g., `info@yourdomain.com`)
   - `EMAIL_PASS` = Your Hostinger email password
   - `CLIENT_ORIGIN` = Your Hostinger frontend URL (e.g., `https://yourdomain.com`)

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - You'll get a URL like: `https://hawktok-backend.onrender.com`

5. **Update Frontend:**
   - Update your frontend code to use the Render API URL
   - Replace API endpoint from `http://localhost:3000` to your Render URL

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here"
  }
  ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (set automatically by Render) | No (default: 3000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `CLIENT_ORIGIN` | Allowed CORS origin (your frontend domain) | Yes |
| `EMAIL_USER` | SMTP email address | Yes |
| `EMAIL_PASS` | SMTP email password | Yes |

## CORS Configuration

The API is configured to accept requests only from the domain specified in `CLIENT_ORIGIN`. For development, you can use `*` to allow all origins, but for production, always specify your exact domain.

## Notes

- The free tier on Render may spin down after inactivity (takes ~1 minute to wake up)
- For production, consider upgrading to a paid plan for better performance
- Make sure to keep your `.env` file secure and never commit it to git
