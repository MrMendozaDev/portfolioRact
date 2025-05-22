import React, { useEffect, useRef, useState } from "react";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import styles from "../styles/FaceDetection.module.scss"
export default function FaceDetectionComponent() {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const liveViewRef = useRef<any>(null);
  const faceDetector = useRef<any>(null);
  //   const [faceDetector, setFaceDetector] = useState<FaceDetector>();
  const [runningMode, setRunningMode] = useState("VIDEO");
  const [base64Image, setBase64Image] = useState("");
  const [faceBox, setFaceBox] = useState<any>({});

  const hasGetUserMedia = !!navigator.mediaDevices?.getUserMedia;

  useEffect(() => {
    if (!hasGetUserMedia) {
      console.warn("getUserMedia() is not supported by your browser");
    }
  }, []);

  const initializeFaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    const detector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
    });
    faceDetector.current = detector;
  };

  const predictWebcam = async () => {
    if (!faceDetector.current || !videoRef.current) return;

    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      await faceDetector.current.setOptions({ runningMode: "VIDEO" });
    }

    const startTimeMs = performance.now();

    if (videoRef.current.currentTime !== videoRef.current.lastVideoTime) {
      videoRef.current.lastVideoTime = videoRef.current.currentTime;

      const detections = await faceDetector.current.detectForVideo(
        videoRef.current,
        startTimeMs
      );
      console.log("detections: ", detections);

      displayVideoDetections(detections.detections);
    }

    requestAnimationFrame(predictWebcam);
  };

  const enableCam = async () => {
    if (!faceDetector.current) {
      await initializeFaceDetector();
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    videoRef.current.srcObject = stream;
    videoRef.current.addEventListener("loadeddata", predictWebcam);
  };

  const captureFace = () => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      videoRef.current,
      faceBox.x,
      faceBox.y,
      faceBox.width,
      faceBox.height,
      0,
      0,
      faceBox.width,
      faceBox.height
    );

    const base64 = canvas.toDataURL("image/png");
    console.log("base64: ", base64);

    setBase64Image(base64);
  };

  const displayVideoDetections = (detections: any) => {
    const canvas: any = canvasRef.current;

    if (!liveViewRef.current || !canvas) return;

    for (const child of liveViewRef.current.children) {
      if (
        child.classList.contains("highlighter") ||
        child.classList.contains("key-point")
      ) {
        liveViewRef.current.removeChild(child);
      }
    }
    console.log("detections: ", detections);

    for (let detection of detections) {
      const box = detection.boundingBox;

      setFaceBox({
        x: box.originX * canvas.width,
        y: box.originY * canvas.height,
        width: box.width * canvas.width,
        height: box.height * canvas.height,
      });

      const highlighter = document.createElement("div");
      highlighter.className = "highlighter";
      highlighter.style.left = `${box.originX * canvas.width}px`;
      highlighter.style.top = `${box.originY * canvas.height}px`;
      highlighter.style.width = `${box.width * canvas.width}px`;
      highlighter.style.height = `${box.height * canvas.height}px`;
      liveViewRef.current.appendChild(highlighter);
    }
  };

  return (
    <section id="demos">
      <h2>Demo: Webcam continuous face detection--s</h2>
      <div id="liveView" className={styles.videoView} ref={liveViewRef}>
        <button onClick={enableCam}>ENABLE WEBCAM</button>
        <button onClick={captureFace}>Capture Image</button>

        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          playsInline
          style={{ transform: "rotateY(180deg)", display: "block" }}
        ></video>
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className={styles.output_canvas}
        ></canvas>

        {base64Image && (
          <div>
            <p>Imagen del rostro en Base64:</p>
            <img src={base64Image} alt="Captured Face" />
          </div>
        )}
      </div>
    </section>
  );
}
