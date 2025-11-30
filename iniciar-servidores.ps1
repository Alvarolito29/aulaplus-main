# Script para iniciar Frontend (React) y Backend (Spring Boot)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   Iniciando AulaPlus" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si MongoDB está corriendo
Write-Host "Verificando MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✓ MongoDB está corriendo" -ForegroundColor Green
} else {
    Write-Host "✗ MongoDB NO está corriendo" -ForegroundColor Red
    Write-Host "  Inicia MongoDB antes de continuar" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Iniciando servidores..." -ForegroundColor Yellow
Write-Host ""

# Iniciar Backend en nueva ventana
Write-Host "1. Iniciando Backend (Spring Boot) en puerto 8080..." -ForegroundColor Cyan
$backendPath = "$PSScriptRoot\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Iniciando Backend...' -ForegroundColor Green; .\mvnw.cmd spring-boot:run"

Write-Host "   Esperando que el backend inicie..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# Iniciar Frontend en nueva ventana
Write-Host "2. Iniciando Frontend (React) en puerto 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host 'Iniciando Frontend...' -ForegroundColor Green; npm start"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "   Servidores iniciándose..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:8080/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Espera 20-30 segundos para que ambos servidores terminen de iniciar" -ForegroundColor Yellow
Write-Host "Luego abre http://localhost:3000 en tu navegador" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para detener los servidores, cierra las ventanas de PowerShell" -ForegroundColor Gray
