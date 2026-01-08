@echo off
setlocal
echo ==========================================
echo      AI Lead Scoring Dashboard - Git Helper
echo ==========================================
echo.

:: 1. Initialize Git
echo [1/5] Initializing Git...
git init
if %errorlevel% neq 0 (
    echo Error: Git is not found. Please install Git and try again.
    pause
    exit /b
)

:: 2. Add Files
echo [2/5] Adding files...
git add .

:: 3. Commit
echo [3/5] Committing changes...
git commit -m "Initial commit of AI Lead Scoring Dashboard"

:: 4. Get Remote URL
echo.
echo ==========================================
echo Please go to your GitHub repository page.
echo Click the green "Code" button and copy the URL.
echo It should look like: https://github.com/username/repo.git
echo ==========================================
echo.
set /p REMOTE_URL="Paste your GitHub Repository URL here: "

:: 5. Add Remote and Push
echo [4/5] Linking to GitHub...
git remote remove origin 2>nul
git remote add origin %REMOTE_URL%

echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo SUCCESS! Your code is now on GitHub.
) else (
    echo.
    echo Something went wrong. Please check:
    echo 1. Did you paste the correct URL?
    echo 2. Do you have internet access?
    echo 3. Are you logged in to GitHub?
)

echo.
pause
