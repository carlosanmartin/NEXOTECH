param(
    [string]$WorkerUrl = "https://nexotech-ai.nexotech-cartagena.workers.dev",
    [int]$DelaySeconds = 8,
    [int]$Start = 1,
    [int]$End = 20
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

$document = Join-Path $root "docs/pruebas.md"

$outputDirectory = Join-Path $root "docs/evidencias/chatbot"

New-Item -ItemType Directory -Force $outputDirectory | Out-Null

$content = Get-Content $document -Raw -Encoding UTF8

$pattern = '(?ms)^### (PR-\d{2})\s*\r?\n\s*Pregunta:\s*\r?\n(.*?)\r?\n\s*Resultado esperado:'

$matches = [regex]::Matches($content, $pattern)

$results = @()

foreach ($match in $matches) {
    $number = [int]$match.Groups[1].Value.Substring(3)

    if ($number -lt $Start -or $number -gt $End) {
        continue
    }
    $id = $match.Groups[1].Value
    $question = $match.Groups[2].Value.Trim()

    Write-Host "Ejecutando $id..." -ForegroundColor Cyan

    $payload = @{
        message = $question
    } | ConvertTo-Json -Compress

    try {
        $response = Invoke-RestMethod `
            -Uri $WorkerUrl `
            -Method POST `
            -ContentType "application/json; charset=utf-8" `
            -Body ([System.Text.Encoding]::UTF8.GetBytes($payload)) `
            -TimeoutSec 30

        $answer = $response.answer

        $status = "Revisar manualmente"

    } catch {
        $answer = $_.Exception.Message
        $status = "Error HTTP"
    }

    $results += [PSCustomObject]@{
        ID = $id
        Fecha = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        Pregunta = $question
        Respuesta = $answer
        Estado = $status
        Evidencia = "$id.png"
    }

    Write-Host "$id finalizada." -ForegroundColor Green

    Start-Sleep -Seconds $DelaySeconds
}

$output = Join-Path $outputDirectory "resultados.csv"

$previousResults = @()

if (Test-Path $output) {
    $previousResults = @(Import-Csv $output -Encoding UTF8)
}

$combined = @(
    $previousResults | Where-Object {
        $existingId = $_.ID
        -not ($results | Where-Object { $_.ID -eq $existingId })
    }

    $results
)

$combined |
    Sort-Object ID |
    Export-Csv `
        -Path $output `
        -NoTypeInformation `
        -Encoding UTF8

Write-Host ""
Write-Host "Resultados guardados en:" -ForegroundColor Green
Write-Host $output
