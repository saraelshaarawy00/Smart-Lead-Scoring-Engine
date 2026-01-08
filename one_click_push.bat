@echo off
setlocal
echo ==========================================
echo      AI Lead Scoring Dashboard - One Click Push
echo ==========================================
echo.

echo [1/5] Initializing Git...
git init

echo [2/5] Adding files...
git add .

echo [3/5] Committing changes...
git commit -m "Initial commit of AI Lead Scoring Dashboard"

echo [4/5] Linking to GitHub...
:: Remove origin if it exists to avoid errors
git remote remove origin 2>nul
git remote add origin https://github.com/saraelshaarawy00/Smart-Lead-Scoring-Engine.git

echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo SUCCESS! Your code has been pushed to:
    echo https://github.com/saraelshaarawy00/Smart-Lead-Scoring-Engine
) else (
    echo.
    echo Something went wrong. Please check your internet connection.
)

echo.
pause
