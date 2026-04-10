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

## IMPORTANT
 **This project is maintained at [sunzhenyu/CleanMark](https://github.com/sunzhenyu/CleanMark). Please visit that repository for the latest updates, issues, and contributions.**


> This project provides an elegant way to remove the sora watermark in the sora2 generated videos. 

<table>
  <tr>
    <td width="20%">
      <strong>Case1(25s)</strong>
    </td>
    <td width="80%">
      <video src="https://github.com/user-attachments/assets/55f4e822-a356-4fab-a372-8910e4cb3c28" 
             width="100%" controls></video>
    </td>
  </tr>
  <tr>
    <td>
      <strong>Case2(10s)</strong>
    </td>
    <td>
      <video src="https://github.com/user-attachments/assets/2773df41-62dc-4876-bd2f-4dd3ccac4b9e" 
             width="100%" controls></video>
    </td>
  </tr>
  <tr>
    <td>
      <strong>Case3(10s)</strong>
    </td>
    <td>
      <video src="https://github.com/user-attachments/assets/2bdba310-6379-48f2-a93c-6de857c4df3d" 
             width="100%" controls></video>
    </td>
  </tr>
</table>

**Online Service**

>  Try the free online version at [CleanMark.org](https://cleanmark.org/sora-watermark-remover) — no installation required.

⭐️: 

- **I'm excited to release [DeMark-World](https://github.com/linkedlist771/DeMark-World) – to the best of my knowledge, the first model capable of removing any watermark from AI-generated videos.**

- **We have provided another model which could preserve time consistency without flicker!**

- **We support batch processing now.**

- **For the new watermark with username,  the Yolo weights has been updated, try the new version watermark detect model, it should work better.**

- **We have uploaded the labelled datasets into huggingface, check this [dataset](https://huggingface.co/datasets/LLinked/sora-watermark-dataset) out. Free free to train your custom detector model or improve our model!**

- **One-click portable build is available** — [Download here](#3-one-click-portable-version) for Windows users! No installation required.

- **Docker Compose deployment is now supported** — [Get started](#6-docker-compose-deployment) with a single command. Note: the image requires CUDA and is large (~20 GB) due to NVIDIA libraries and PyTorch.

---

💝 If you find this project helpful, please consider [buying me a coffee](mds/reward.md) to support the development!

## 1. Method

The SoraWatermarkCleaner(we call it `SoraWm` later) is composed of two parsts:

- SoraWaterMarkDetector: We trained a yolov11s version to detect the sora watermark. (Thank you yolo!)

- WaterMarkCleaner: We refer iopaint's implementation for watermark removal using the lama model.
  
  (This codebase is from https://github.com/Sanster/IOPaint#, thanks for their amazing work!)

Our SoraWm is purely deeplearning driven and yields good results in many generated videos.

## 2. Installation

[FFmpeg](https://ffmpeg.org/) is needed for video processing, please install it first. Clone from [sunzhenyu/CleanMark](https://github.com/sunzhenyu/CleanMark) and enter the `sora_watermark_cleaner` directory. We highly recommend using `uv` to install the environments:

1. installation:

```bash
uv sync
```

> now the envs will be installed at the `.venv`, you can activate the env using:
> 
> ```bash
> source .venv/bin/activate
> ```

2. Downloaded the pretrained models:

The trained yolo weights will be stored in the `resources` dir as the `best.pt`.  And it will be automatically download from https://github.com/linkedlist771/SoraWatermarkCleaner/releases/download/V0.0.1/best.pt . The `Lama` model is downloaded from https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt, and will be stored in the torch cache dir. Both downloads are automatic, if you fail, please check your internet status.

3. Batch processing
   Use the cli.py for batch processing

```
python cli.py [-h] -i INPUT -o OUTPUT [-p PATTERN] [-m MODEL] [--quiet]
```

examples:

```
# Process all .mp4 files in input folder
python cli.py -i /path/to/input -o /path/to/output
# Process all .mov files
python cli.py -i /path/to/input -o /path/to/output --pattern "*.mov"
# Process all video files (mp4, mov, avi)
python cli.py -i /path/to/input -o /path/to/output --pattern "*.{mp4,mov,avi}"
# Use e2fgvi_hq model for time-consistent results (slower, requires CUDA)
python cli.py -i /path/to/input -o /path/to/output --model e2fgvi_hq
# Without displaying the Tqdm bar inside sorawm procrssing.
python cli.py -i /path/to/input -o /path/to/output --quiet
```

## 3. One-Click Portable Version

For users who prefer a ready-to-use solution without manual installation, we provide a **one-click portable distribution** that includes all dependencies pre-configured.

### Download Links

**Google Drive:**

- [Download from Google Drive](https://drive.google.com/file/d/1ujH28aHaCXGgB146g6kyfz3Qxd-wHR1c/view?usp=share_link)

**Baidu Pan (百度网盘) - For users in China:**

- Link: https://pan.baidu.com/s/1onMom81mvw2c6PFkCuYzdg?pwd=jusu
- Extract Code (提取码): `jusu`

### Features

- ✅ No installation required
- ✅ All dependencies included
- ✅ Pre-configured environment
- ✅ Ready to use out of the box

Simply download, extract, and run!

## 4. Performance Optimization

We provide several options to speed up processing:

| Detector | Batch | Cleaner | TorchCompile | Bf16 | Time (s) | Speedup |
|:--------:|:-----:|:-------:|:------------:|:----:|:--------:|:-------:|
| YOLO     | ×     | LAMA    | ×            | ×    | 44.33    | -       |
| YOLO     | ×     | E2FGVI  | ×            | ×    | 142.42   | 1.00×   |
| YOLO     | ×     | E2FGVI  | ✓            | ×    | 117.19   | 1.22×   |
| YOLO     | 4     | E2FGVI  | ✓            | ×    | 82.63    | 1.72×   |
| YOLO     | 4     | E2FGVI  | ✓            | ✓    | 58.60    | 2.43×   |

> Speedup is calculated relative to the E2FGVI baseline. LAMA uses a different cleaning approach and is not directly comparable.

- **YOLO Batch Detection**: Default batch size is 4 (`detect_batch_size=4`), enables batch inference for watermark detection, provides ~40% speedup
- **TorchCompile** (E2FGVI only): Enabled by default (`enable_torch_compile=True`), provides ~22% speedup
- **Bf16 Inference** (E2FGVI only): Enable with `use_bf16=True`(Default False), provides up to **2.43× speedup**. Note: quality may slightly decrease, and the first inference will be slow (~90s) due to compilation overhead; subsequent runs will be much faster (~58s) as artifacts are cached.

You can customize these settings when initializing `SoraWM`:

```python
from sorawm.core import SoraWM
from sorawm.schemas import CleanerType

# LAMA with batch detection (fast)
sora_wm = SoraWM(
    cleaner_type=CleanerType.LAMA,
    detect_batch_size=4  # default: 4
)

# E2FGVI_HQ with all optimizations (time-consistent)
sora_wm = SoraWM(
    cleaner_type=CleanerType.E2FGVI_HQ,
    enable_torch_compile=True,  # default: True
    detect_batch_size=8         # custom batch size
)

# E2FGVI_HQ with bf16 for maximum speed (may have slight quality loss)
sora_wm = SoraWM(
    cleaner_type=CleanerType.E2FGVI_HQ,
    enable_torch_compile=True,
    detect_batch_size=4,
    use_bf16=True  # enables bfloat16 inference
)
```

## 5.  Demo

To have a basic usage, just try the `example.py`:

> We provide two models to remove watermark. LAMA is fast but may have flicker on the cleaned area, which E2FGVI_HQ compromise this only requires cuda otherwise very slow on CPU or MPS.

```python
from pathlib import Path

from sorawm.core import SoraWM
from sorawm.schemas import CleanerType

if __name__ == "__main__":
    input_video_path = Path("resources/dog_vs_sam.mp4")
    output_video_path = Path("outputs/sora_watermark_removed")

    # 1. LAMA is fast and good quality, but not time consistent.
    sora_wm = SoraWM(cleaner_type=CleanerType.LAMA)
    sora_wm.run(input_video_path, Path(f"{output_video_path}_lama.mp4"))

    # 2. E2FGVI_HQ ensures time consistency, but will be very slow on no-cuda device.
    sora_wm = SoraWM(cleaner_type=CleanerType.E2FGVI_HQ)
    sora_wm.run(input_video_path, Path(f"{output_video_path}_e2fgvi_hq.mp4"))
```

We also provide you with a `streamlit` based interactive web page, try it with:

> We also provide the switch here.

```bash
streamlit run app.py
```

<img src="assests/model_switch.png" style="zoom: 25%;" />

Batch processing is also supported, now you can drag a folder or select multiple files to process.
<img src="assests/streamlit_batch.png" style="zoom: 50%;" />

## 6. Docker Compose Deployment

The easiest way to deploy SoraWatermarkCleaner is via Docker Compose.

> **Note:** The Docker image (`llinkedlist/sorawm:latest`) requires CUDA and includes NVIDIA libraries and PyTorch, making it quite large (~20 GB). The initial pull may take a significant amount of time depending on your network speed.

**Prerequisites:**

- [Docker](https://docs.docker.com/get-docker/) with [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installed
- A CUDA-capable GPU

**Start the service:**

```bash
docker compose up -d
```

This will:

- Pull the image from Docker Hub (first time only — be patient, ~20 GB)
- Mount the current directory to `/workspace` inside the container
- Cache model weights in `./.cache` to avoid re-downloading on restart
- Expose the Streamlit UI on port **8501**

Access the Streamlit UI at `http://localhost:8501`.

## 7. WebServer

Here, we provide a **FastAPI-based web server** that can quickly turn this watermark remover into a service.

We also have a frontUI for the webserver, to try this:

```bash
cd frontend && bun install && bun run build
```

And then start the server, the frontend UI will be just ready in root route:

> The task statuses are recoreded and can resume when server is down.

![image](assests/frontend.png)

Simply run:

```
python start_server.py
```

The web server will start on port **5344**.

You can view the FastAPI [documentation](http://localhost:5344/docs) for more details.

There are three routes available:

1. **submit_remove_task**
   
   > After uploading a video, a task ID will be returned, and the video will begin processing immediately.

<img src="resources/53abf3fd-11a9-4dd7-a348-34920775f8ad.png" alt="image" style="zoom: 25%;" />

2. **get_results**

You can use the task ID obtained above to check the task status.

It will display the percentage of video processing completed.

Once finished, the returned data will include a **download URL**.

3. **download**

You can use the **download URL** from step 2 to retrieve the cleaned video.

## 8. Datasets

We have uploaded the labelled datasets into huggingface, check this out https://huggingface.co/datasets/LLinked/sora-watermark-dataset. Free free to train your custom detector model or improve our model!

## 9. API

Packaged as a Cog and [published to Replicate](https://replicate.com/uglyrobot/sora2-watermark-remover) for simple API based usage.

## 10. License

 Apache License

## 11. Citation

If you use this project, please cite:

```bibtex
@misc{sorawatermarkcleaner2025,
  author = {linkedlist771},
  title = {SoraWatermarkCleaner},
  year = {2025},
  url = {https://github.com/linkedlist771/SoraWatermarkCleaner}
}
```

## 12. Acknowledgments

- [IOPaint](https://github.com/Sanster/IOPaint) for the LAMA implementation
- [Ultralytics YOLO](https://github.com/ultralytics/ultralytics) for object detection
- [SoraWatermarkCleaner](https://github.com/linkedlist771/SoraWatermarkCleaner) for the original project this is based on
