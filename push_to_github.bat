@echo off
echo ========================================
echo GitHub Push Script
echo ========================================
echo.

REM Initialize git if not already initialized
git init

REM Add all files
echo Adding all files...
git add .

REM Commit
echo Committing changes...
git commit -m "Event Management System - Complete project with new features"

REM Add remote (ignore error if already exists)
echo Adding remote repository...
git remote add origin https://github.com/sindhu10914/Event-Management.git 2>nul

REM Set branch to main
echo Setting branch to main...
git branch -M main

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Check for any errors above.
echo ========================================
pause
