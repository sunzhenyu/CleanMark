---
title: Sora Watermark Cleaner
emoji: 🎬
colorFrom: purple
colorTo: blue
sdk: docker
pinned: false
app_port: 8501
---

# Sora Watermark Cleaner

Remove watermarks from Sora-generated videos using AI-powered inpainting.

## Models

- **LAMA** — Fast, good quality
- **E2FGVI-HQ** — Slower, best quality with temporal consistency

## API Endpoints

The FastAPI server runs on port 5344:

- `POST /api/v1/submit_remove_task` — Upload video, returns `task_id`
- `GET /api/v1/get_results?remove_task_id={id}` — Poll task status
- `GET /api/v1/download/{task_id}` — Download processed video
- `GET /api/v1/get_queue_status` — Queue metrics
