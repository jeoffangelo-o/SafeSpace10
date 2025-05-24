$port = 8000
Write-Host "Starting server on http://localhost:$port"
Write-Host "Press Ctrl+C to stop the server"
python -m http.server $port
