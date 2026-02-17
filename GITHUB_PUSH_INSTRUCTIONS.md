# 🚀 GitHub Push Instructions

## Method 1: Using Batch File (Easiest)

1. **Double-click** `push_to_github.bat` file in your project folder
2. Enter your GitHub credentials when asked:
   - **Username:** sindhu10914
   - **Password:** Your Personal Access Token (NOT your GitHub password)
3. Done! ✅

---

## Method 2: Using Git Bash (Recommended)

### Step 1: Open Git Bash
- Right-click in project folder → "Git Bash Here"

### Step 2: Run These Commands

```bash
# Navigate to project
cd /c/Users/umamaheshwari/Desktop/event

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Event Management System - Complete project"

# Add remote
git remote add origin https://github.com/sindhu10914/Event-Management.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🔐 GitHub Authentication

### Generate Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Event Management"
4. Select scope: ✅ **repo** (full control)
5. Click "Generate token"
6. **COPY THE TOKEN** immediately!
7. Use this token as password when Git asks

---

## ⚠️ If Repository Already Has Files

If you see error "failed to push some refs":

```bash
# Pull first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

---

## ✅ What Will Be Pushed

### Included:
- ✅ Backend code (Django)
- ✅ Frontend code (React)
- ✅ Documentation files
- ✅ Configuration files
- ✅ .gitignore file

### Excluded (by .gitignore):
- ❌ node_modules/ (too large)
- ❌ __pycache__/ (Python cache)
- ❌ .env files (contains passwords)
- ❌ db.sqlite3 (database file)
- ❌ media/ (uploaded files)

---

## 📋 Files Summary

**Total files:** ~60-70 files
**Main changes:** 14 files (5 new + 9 updated)

### New Features Added:
1. About Us page
2. Contact page
3. Reviews & Ratings system
4. Email notifications
5. Currency updated (₹)

---

## 🎯 Quick Start

**Easiest way:**
1. Double-click `push_to_github.bat`
2. Enter credentials
3. Done!

**Alternative:**
1. Open Git Bash
2. Copy-paste commands from Method 2
3. Done!

---

## 🆘 Troubleshooting

### Error: "git is not recognized"
- Install Git from: https://git-scm.com/download/win
- Restart terminal after installation

### Error: "Authentication failed"
- Use Personal Access Token, NOT password
- Generate new token from GitHub settings

### Error: "failed to push"
- Run: `git pull origin main --allow-unrelated-histories`
- Then: `git push -u origin main`

---

## 📞 Repository URL

https://github.com/sindhu10914/Event-Management

---

**Ready to push! Choose Method 1 or Method 2 above.** 🚀
