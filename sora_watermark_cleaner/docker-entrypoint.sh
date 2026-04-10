#!/bin/bash
set -e

# Start FastAPI server in background
python start_server.py --host 0.0.0.0 --port 5344 &

# Start Streamlit (primary app, HF Spaces routes to app_port 8501)
streamlit run app.py \
  --server.port 8501 \
  --server.address 0.0.0.0 \
  --server.headless true \
  --server.enableCORS false \
  --server.enableXsrfProtection false
