# GitHub Repository Setup Instructions

Your backend code is ready to be pushed to a new GitHub repository!

## Current Status ✅
- ✅ Git repository initialized in the backend folder
- ✅ All backend files committed
- ✅ Remote repository configured: `https://github.com/NabeehaMahmood/hawktok-backend.git`
- ✅ Branch renamed to `main`

## Next Steps

### Option 1: Create Repository via GitHub Website (Recommended)

1. **Go to GitHub and create a new repository:**
   - Visit: https://github.com/new
   - Repository name: `hawktok-backend`
   - Description: `Express.js backend API for Hawktok contact form`
   - Choose: **Public** or **Private** (your choice)
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)

2. **Push your code:**
   ```bash
   git push -u origin main
   ```

### Option 2: Create Repository via GitHub CLI (if installed)

```bash
# Create the repository
gh repo create hawktok-backend --public --source=. --remote=origin

# Push the code
git push -u origin main
```

## After Pushing

Once pushed, your repository will be available at:
**https://github.com/NabeehaMahmood/hawktok-backend**

## Deploy to Render

After the repository is on GitHub:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account (if not already connected)
4. Select the `hawktok-backend` repository
5. Configure:
   - **Name:** `hawktok-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** Leave empty (since the entire repo is the backend)
   - **Runtime:** Node
   - **Build Command:** `pnpm install`
   - **Start Command:** `pnpm start`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `EMAIL_USER` = Your Hostinger email
   - `EMAIL_PASS` = Your Hostinger email password
   - `CLIENT_ORIGIN` = Your frontend domain (e.g., `https://yourdomain.com`)
7. Click "Create Web Service"

## Files Included

- `server.js` - Express server with contact form API
- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Lockfile for consistent installs
- `.gitignore` - Files to exclude from git
- `.env.example` - Example environment variables
- `README.md` - Full documentation

## Important Notes

- Your `.env` file is NOT included (it's in .gitignore for security)
- You'll need to set environment variables in Render's dashboard
- The repository is configured for Render's automatic deployments
