@echo off
title SmartSpend Launcher
echo ===================================================
echo             SmartSpend Launcher
echo ===================================================
echo.

echo [1/3] Starting Backend Server (Flask)...
cd /d "%~dp0\backend"
start "SmartSpend Backend" cmd /k "set PYTHONIOENCODING=utf-8 && python app.py"

echo.
echo [2/3] Waiting for backend to initialize...
ping 127.0.0.1 -n 4 > nul

echo.
echo [3/3] Starting Frontend Server (Vite)...
cd /d "%~dp0\frontend"
start "SmartSpend Frontend" cmd /k "npm run dev"

echo.
echo [4/4] Opening SmartSpend in your browser...
ping 127.0.0.1 -n 3 > nul
start http://localhost:5173

echo.
echo ===================================================
echo    SmartSpend is starting up!
echo.
echo    Backend running at:  http://localhost:5000
echo    Frontend running at: http://localhost:5173
echo ===================================================
echo.
echo You can close this window now. The servers will keep running in their own windows.
ping 127.0.0.1 -n 6 > nul
exit
