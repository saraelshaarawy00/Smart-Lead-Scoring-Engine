@echo off
echo Initializing Git repository...
git init
if %errorlevel% neq 0 goto :error

echo Adding files...
git add .
if %errorlevel% neq 0 goto :error

echo Committing...
git commit -m "Initial commit of AI Lead Scoring Dashboard"
if %errorlevel% neq 0 goto :error

echo.
echo Success! Repository initialized and committed.
echo To push to GitHub, run:
echo git remote add origin <YOUR_REPO_URL>
echo git push -u origin main
echo.
pause
exit /b 0

:error
echo.
echo Error: Git command failed. Please ensure Git is installed and in your PATH.
pause
exit /b 1
