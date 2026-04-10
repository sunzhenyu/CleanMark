---
title: Sora Watermark Cleaner
emoji: 🎬
colorFrom: purple
colorTo: blue
sdk: docker
pinned: false
app_port: 8501
---

# SoraWatermarkCleaner

> AI-powered tool to remove watermarks from Sora-generated videos. Part of the [CleanMark](https://github.com/sunzhenyu/CleanMark) project.

🌐 **Free online version**: [cleanmark.org/sora-watermark-remover](https://cleanmark.org/sora-watermark-remover) — no installation required.

---

## Demo

The following videos show before/after results of watermark removal:

<table>
  <tr>
    <td width="20%"><strong>Case 1 (25s)</strong></td>
    <td width="80%">
      <video src="https://github.com/user-attachments/assets/55f4e822-a356-4fab-a372-8910e4cb3c28"
             width="100%" controls></video>
    </td>
  </tr>
  <tr>
    <td><strong>Case 2 (10s)</strong></td>
    <td>
      <video src="https://github.com/user-attachments/assets/2773df41-62dc-4876-bd2f-4dd3ccac4b9e"
             width="100%" controls></video>
    </td>
  </tr>
  <tr>
    <td><strong>Case 3 (10s)</strong></td>
    <td>
      <video src="https://github.com/user-attachments/assets/2bdba310-6379-48f2-a93c-6de857c4df3d"
             width="100%" controls></video>
    </td>
  </tr>
</table>

---

## Features

- ✅ **Fully automatic** — YOLOv11-based watermark detection, no manual masking needed
- ✅ **Two inpainting models** — LAMA (fast) or E2FGVI-HQ (time-consistent, best quality)
- ✅ **Audio preserved** — original audio track is merged back after processing
- ✅ **Batch processing** — process entire folders via CLI
- ✅ **Docker support** — one-command deployment

---

## 1. How It Works

SoraWatermarkCleaner (`SoraWm`) has two stages:

1. **Detection** — A fine-tuned YOLOv11s model locates the Sora watermark region in each frame.
2. **Inpainting** — The masked region is filled using either:
   - **LAMA** (Large Mask Inpainting) — fast, good quality, recommended for most use cases
   - **E2FGVI-HQ** — flow-based video inpainting with temporal consistency; slower on CPU, best results on GPU

---

## 2. Installation

Requires [FFmpeg](https://ffmpeg.org/) — install it first.

```bash
# Clone the repo
git clone https://github.com/sunzhenyu/CleanMark.git
cd CleanMark/sora_watermark_cleaner

# Install dependencies with uv (recommended)
uv sync
source .venv/bin/activate
```

Model weights are downloaded automatically on first run:
- YOLO weights → `resources/best.pt`
- LAMA model → torch cache dir

---

## 3. Usage

### Streamlit UI

```bash
streamlit run app.py
```

Opens an interactive web UI at `http://localhost:8501`. Supports single file upload and batch folder processing.

### CLI (Batch Processing)

```bash
python cli.py -i /path/to/input -o /path/to/output
```

Options:

```
-i INPUT      Input folder
-o OUTPUT     Output folder
-p PATTERN    File glob pattern (default: *.mp4)
-m MODEL      Model: lama (default) or e2fgvi_hq
--quiet       Suppress progress bars
```

Examples:

```bash
# Process all .mp4 files
python cli.py -i ./input -o ./output

# Use E2FGVI-HQ for time-consistent results (requires CUDA for reasonable speed)
python cli.py -i ./input -o ./output --model e2fgvi_hq

# Process .mov files
python cli.py -i ./input -o ./output --pattern "*.mov"
```

### Python API

```python
from pathlib import Path
from sorawm.core import SoraWM
from sorawm.schemas import CleanerType

sora_wm = SoraWM(cleaner_type=CleanerType.LAMA)
sora_wm.run(Path("input.mp4"), Path("output.mp4"))
```

---

## 4. Docker Deployment

```bash
docker compose up -d
```

Starts the Streamlit UI on port **8501**. The image (`llinkedlist/sorawm:latest`) requires CUDA and is ~20 GB.

**Prerequisites:** Docker + [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)

---

## 5. Performance

| Detector | Batch | Cleaner  | TorchCompile | Bf16 | Time (s) | Speedup |
|:--------:|:-----:|:--------:|:------------:|:----:|:--------:|:-------:|
| YOLO     | ×     | LAMA     | ×            | ×    | 44.33    | —       |
| YOLO     | ×     | E2FGVI   | ×            | ×    | 142.42   | 1.00×   |
| YOLO     | ×     | E2FGVI   | ✓            | ×    | 117.19   | 1.22×   |
| YOLO     | 4     | E2FGVI   | ✓            | ×    | 82.63    | 1.72×   |
| YOLO     | 4     | E2FGVI   | ✓            | ✓    | 58.60    | 2.43×   |

Tips:
- **LAMA** is the fastest option and works well for most videos
- **E2FGVI-HQ** with `use_bf16=True` gives up to 2.43× speedup over baseline (slight quality trade-off; first run is slow ~90s due to compilation)
- Increase `detect_batch_size` for faster YOLO inference on GPU

---

## 6. Web Server (FastAPI)

A FastAPI-based server is included for programmatic access:

```bash
python start_server.py
```

Starts on port **5344**. API docs at `http://localhost:5344/docs`.

Three endpoints:
1. `POST /api/v1/submit_remove_task` — upload video, get `task_id`
2. `GET /api/v1/get_results?remove_task_id=<id>` — poll status and progress
3. `GET /api/v1/download/<id>` — download cleaned video

---

## 7. Datasets

Labelled training data is available on Hugging Face:
[LLinked/sora-watermark-dataset](https://huggingface.co/datasets/LLinked/sora-watermark-dataset)

---

## 8. License

Apache License 2.0

---

## 9. Citation

```bibtex
@misc{sorawatermarkcleaner2025,
  author = {linkedlist771},
  title  = {SoraWatermarkCleaner},
  year   = {2025},
  url    = {https://github.com/linkedlist771/SoraWatermarkCleaner}
}
```

---

## 10. Acknowledgments

- [SoraWatermarkCleaner](https://github.com/linkedlist771/SoraWatermarkCleaner) — original project by linkedlist771, the foundation this work is built on
- [IOPaint](https://github.com/Sanster/IOPaint) — LAMA inpainting implementation
- [Ultralytics YOLO](https://github.com/ultralytics/ultralytics) — object detection framework
