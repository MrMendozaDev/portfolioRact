import React, { useEffect, useRef, useState, FC } from 'react';
import { typeFaceDetector } from './types/faceDetector';
import {
  FaceDetector,
  FaceLandmarker,
  FilesetResolver 
} from '@mediapipe/tasks-vision';

import styles from "./styles/FaceDetection.module.scss"

const MediaPipeFace= ({ msg }: typeFaceDetector) => {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const pictureRef = useRef<any>(null);
  const faceDetector = useRef<any>(null);
  const faceLandmarker = useRef<any>(null);
  const [base64Image, setBase64Image] = useState('');
  const isCenterFace = useRef<Boolean>(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const timeCounter = useRef<number>(5);
  const [intervalId, setIntervalId] = useState(null);
  const animationIdRef = useRef<any>(null);
  const faceBox = useRef<any>(null);
  const runningMode = useRef<any>('VIDEO');
  const minZ = -0.1;
  const maxZ = -0.07;

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      console.warn('getUserMedia() is not supported by your browser');
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (intervalId) clearInterval(intervalId);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const initializeFaceDetector = async () => {
    const video = videoRef.current;

    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.20/wasm'
    );

    const detector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: 'CPU'
      },
      minDetectionConfidence: 0.5,
      minSuppressionThreshold: 0.5,
      runningMode: runningMode.current
    });

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'CPU'
      },
      outputFaceBlendshapes: true,
      numFaces: 1,
      runningMode: runningMode.current
    });
    faceDetector.current = detector;
    faceLandmarker.current = landmarker;

    startCamera();
  };

  const startCamera = () => {
    if (intervalId) return;

    const interval: any = setInterval(() => {
      timeCounter.current = isCenterFace.current
          ? timeCounter.current > 1
            ? timeCounter.current - 1
            : (captureFace(), 5)
          : 5
    }, 1000);
    setIntervalId(interval);

    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 }, audio: false })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.onloadeddata = predictWebcam;
        video.stop = () => {
          stream.getTracks().forEach((track) => track.stop());
        };
      })
      .catch((err) => {
        console.error('Error al acceder a la cámara: ', err);
      });
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.stop) {
      video.stop();
    }
  };

  const predictWebcam = async () => {
    if (!faceDetector.current || !faceLandmarker.current) return;

    if (faceDetector.current.runningMode !== 'VIDEO') {
      faceDetector.current.setOptions({ runningMode: 'VIDEO' });
    }

    if (faceLandmarker.current.runningMode !== 'VIDEO') {
      faceLandmarker.current.setOptions({ runningMode: 'VIDEO' });
    }

    const video = videoRef.current;
    const now = performance.now();

    if (!video.paused && !video.ended) {
      const detections = faceDetector.current.detectForVideo(video, now).detections;
      const landmarks = faceLandmarker.current.detectForVideo(video, now).faceLandmarks;
      try {
        displayVideoDetections(detections, landmarks);
        animationIdRef.current = requestAnimationFrame(predictWebcam);
      } catch (err) {
        console.log('Error: ', err);
      }
    } else {
      stopCamera();
      cancelAnimationFrame(animationIdRef.current);
    }
  };

  const displayVideoDetections = (detectorResults: any[], landmarkerResults: any[]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const rx = 210;
    const ry = 150;
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (!detectorResults.length || !landmarkerResults.length) return;

    const gradientBackground = ctx.createRadialGradient(
      canvasCenterX,
      canvasCenterY,
      Math.min(rx, ry) * 0.8,
      canvasCenterX,
      canvasCenterY,
      Math.max(rx, ry)
    );

    gradientBackground.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradientBackground.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
    ctx.fillStyle = gradientBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const detection of detectorResults) {
      const score = Math.round(parseFloat(detection.categories[0].score) * 100);
      const box = detection.boundingBox;

      faceBox.current = {
        x: Math.max(box.originX),
        y: Math.max(box.originY),
        width: Math.min(box.width),
        height: Math.min(box.height)
      };
      const positionBoxOval = {
        x: box.originX,
        y: box.originY,
        width: box.width,
        height: box.height
      };

      const lineRxBackground = rx - 5;
      const lineRyBackground = ry - 5;

      const faceCenterX = positionBoxOval.x + positionBoxOval.width / 2;
      const faceCenterY =
        positionBoxOval.y + positionBoxOval.height / 2 - positionBoxOval.height * 0.2;

      const secondRx = rx - 10;
      const secondRy = ry - 10;

      const dx = (faceCenterX - canvasCenterX) / secondRx;
      const dy = (faceCenterY - canvasCenterY) / secondRy;

      const isInOval = Math.hypot(dx, dy) <= 0.3;
      if (isInOval) setRotationAngle((prev) => prev + 0.2);

      const landmarks = landmarkerResults[0];
      const z = landmarks?.[1]?.z;

      const direction = detectHeadDirection(landmarks);
      const messageRotation = direction !== 'Centro' ? 'Mira al frente' : '';
      const message = 'Permanezca en el óvalo';

      let distanceWarning = false;
      let messageDistance = '';
      if (z < minZ) {
        distanceWarning = true;
        messageDistance = '¡Aléjate!';
      } else if (z > maxZ) {
        distanceWarning = true;
        messageDistance = '¡Acércate!';
      }

      const gradient = ctx.createLinearGradient(
        canvasCenterX - rx * Math.cos(rotationAngle),
        canvasCenterY - ry * Math.cos(rotationAngle),
        canvasCenterX + rx * Math.cos(rotationAngle),
        canvasCenterY + ry * Math.sin(rotationAngle)
      );

      gradient.addColorStop(0, 'aqua');
      gradient.addColorStop(0.5, 'rgb(90, 165, 165, 1)');
      gradient.addColorStop(1, 'aqua');

      const gradientWarning = ctx.createLinearGradient(
        canvasCenterX - rx * Math.cos(rotationAngle),
        canvasCenterY - ry * Math.cos(rotationAngle),
        canvasCenterX + rx * Math.cos(rotationAngle),
        canvasCenterY + ry * Math.sin(rotationAngle)
      );

      gradientWarning.addColorStop(0, 'yellow');
      gradientWarning.addColorStop(0.5, 'rgb(255, 255, 255, 1)');

      const centerFace =
        isInOval && !distanceWarning && score >= 85 && !messageRotation;

      isCenterFace.current = centerFace;

      ctx.beginPath();
      ctx.ellipse(
        canvasCenterX,
        canvasCenterY,
        lineRyBackground,
        lineRxBackground - 5,
        0,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = centerFace ? 'aqua' : 'gray';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(canvasCenterX, canvasCenterY, ry, rx, 0, 0, Math.PI * 2);
      ctx.strokeStyle = centerFace ? gradient : 'gray';
      ctx.lineWidth = 5;
      ctx.setLineDash([10, 10]);
      ctx.lineDashOffset = 10;
      ctx.stroke();

      ctx.save();
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (centerFace) {
        ctx.fillStyle = gradient;
        ctx.fillText(message, canvasCenterX, 15);
        ctx.font = '30px Arial';
        ctx.fillText(timeCounter.current.toString(), canvasCenterX, canvasCenterY);
      } else if (distanceWarning) {
        ctx.fillStyle = 'white';
        ctx.fillText(messageDistance, canvasCenterX, 15);
      } else if (messageRotation) {
        ctx.fillStyle = 'white';
        ctx.fillText(messageRotation, canvasCenterX, 15);
      } else if (score <= 85) {
        ctx.fillStyle = 'white';
        ctx.fillText('Descubre tu cara', canvasCenterX, 15);
      }

      ctx.restore();
    }
  };


  const detectHeadDirection = (landmarks: any[]) => {
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    const noseX = nose.x;
    const eyeCenterX = (leftEye.x + rightEye.x) / 2;

    if (noseX < eyeCenterX - 0.02) return 'Izquierda';
    if (noseX > eyeCenterX + 0.02) return 'Derecha';
    return 'Centro';
  };

  const captureFace = () => {
      const canvas = pictureRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;
      const { height, width, x, y } = faceBox.current;
      const { videoWidth, videoHeight } = video;

      // Configurar las dimensiones del canvas recortado
      const topOffset = height * 0.6; // 60% extra en la parte superior
      const bottomOffset = height * 0.3; // 30% extra en la parte inferior
      const sideOffset = width * 0.2; // 20% extra a los lados

      let adjustedX = Math.max(0, x - sideOffset);
      let adjustedY = Math.max(0, y - topOffset);
      let adjustedWidth = width + sideOffset * 2;
      let adjustedHeight = height + topOffset + bottomOffset;

      // Asegurar que los valores no excedan los límites del video
      if (adjustedX + adjustedWidth > videoWidth) {
        adjustedWidth = videoWidth - adjustedX;
      }
      if (adjustedY + adjustedHeight > videoHeight) {
        adjustedHeight = videoHeight - adjustedY;
      }

      // Establecer el tamaño del canvas
      canvas.width = adjustedWidth;
      canvas.height = adjustedHeight;
      context.imageSmoothingEnabled = true;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar la imagen en el canvas
      context.drawImage(
        video,
        adjustedX, adjustedY, adjustedWidth, adjustedHeight, // Origen
        0, 0, canvas.width, canvas.height // Destino
      );

      setBase64Image(canvas.toDataURL('image/jpeg', 0.99))
      console.log('CraeteJpegFace');

      // const link = document.createElement('a');
      // link.href = base64Image;
      // link.download = 'rostro.jpg';
      // link.click();
    }

  return (
    <div>
      <video ref={videoRef} autoPlay width="640" height="480" />
      <canvas ref={canvasRef} />
      <canvas ref={pictureRef} className={base64Image === '' ? styles.hidden : ''} />
      <button onClick={initializeFaceDetector}>Iniciar Detector</button>
      <p>{msg}</p>
    </div>
  );
};

export default MediaPipeFace;
