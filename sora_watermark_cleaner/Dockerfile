FROM python:3.12-slim

# System dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    curl \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install uv

WORKDIR /app

# Copy project files
COPY pyproject.toml .
COPY sorawm/ sorawm/
COPY app.py .
COPY start_server.py .
COPY .streamlit/ .streamlit/
COPY model_version.json .

# Create required directories and placeholder frontend
RUN mkdir -p resources/checkpoint output working_dir logs data frontend/dist/assets && \
    echo '<!DOCTYPE html><html><body><p>API server</p></body></html>' > frontend/dist/index.html

# Install Python dependencies
RUN uv pip install --system --no-cache \
    aiofiles \
    aiosqlite \
    diffusers \
    einops \
    "fastapi==0.108.0" \
    ffmpeg-python \
    fire \
    greenlet \
    httpx \
    huggingface-hub \
    loguru \
    omegaconf \
    opencv-python-headless \
    pandas \
    pydantic \
    python-multipart \
    requests \
    rich \
    ruptures \
    scikit-learn \
    sqlalchemy \
    streamlit \
    "torch>=2.5.0" \
    "torchvision>=0.20.0" \
    tqdm \
    transformers \
    ultralytics \
    uvicorn

# Download YOLO weights and E2FGVI checkpoint at build time
RUN python -c "\
import os, requests; \
os.makedirs('resources/checkpoint', exist_ok=True); \
print('Downloading YOLO weights...'); \
import json; \
mv = json.load(open('model_version.json')); \
url = mv.get('url', 'https://github.com/linkedlist771/SoraWatermarkCleaner/releases/download/V0.0.1/best.pt'); \
r = requests.get(url, stream=True); \
open('resources/best.pt', 'wb').write(r.content); \
print('YOLO weights downloaded.') \
" || echo "YOLO download skipped, will download at runtime"

# Expose ports: 8501 (Streamlit UI), 5344 (FastAPI)
EXPOSE 8501 5344

# Start both Streamlit and FastAPI
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
