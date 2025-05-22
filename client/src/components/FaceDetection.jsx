import React, { useEffect, useRef, useState } from 'react';
import {
  FaceDetector,
  FaceLandmarker,
  FilesetResolver
} from '@mediapipe/tasks-vision';

const MediaPipeFace = ({ msg }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const pictureRef = useRef(null);
  const faceDetector = useRef(null);
  const faceLandmarker = useRef(null);
  // const [faceDetector, setFaceDetector] = useState(null);
  // const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [isCenterFace, setIsCenterFace] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [timeCounter, setTimeCounter] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  const animationIdRef = useRef(null);
  const [faceBox, setFaceBox] = useState(null);
  const runningMode = 'VIDEO';
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
      runningMode
    });

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'CPU'
      },
      outputFaceBlendshapes: true,
      numFaces: 1,
      runningMode
    });
    faceDetector.current = detector;
    faceLandmarker.current = landmarker;
    // setFaceDetector(detector);
    // setFaceLandmarker(landmarker);

    startCamera();
  };

  const startCamera = () => {
    if (intervalId) return;

    const interval = setInterval(() => {
      setTimeCounter((prev) => (isCenterFace ? (prev > 1 ? prev - 1 : 5) : 5));
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
    console.log('faceDetector: ', faceDetector);
    console.log('faceLandmarker: ', faceLandmarker);
    
    if (!faceDetector || !faceLandmarker) return;

    if (faceDetector.runningMode !== 'VIDEO') {
      faceDetector.current.setOptions({ runningMode: 'VIDEO' });
    }

    if (faceLandmarker.runningMode !== 'VIDEO') {
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

  const displayVideoDetections = (detections, landmarksArray) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (!detections.length || !landmarksArray.length) return;

    const box = detections[0].boundingBox;
    const landmark = landmarksArray[0];
    console.log('landmark: ', landmark);
    
    const z = landmark?.[1]?.z;

    setFaceBox({
      x: box.originX,
      y: box.originY,
      width: box.width,
      height: box.height
    });

    const direction = detectHeadDirection(landmark);
    const isCentered = direction === 'Centro' && z >= minZ && z <= maxZ;

    setIsCenterFace(isCentered);
    if (isCentered) setRotationAngle((prev) => prev + 0.2);

    // Aquí puedes continuar agregando el dibujo de óvalos y mensajes si lo necesitas
  };

  const detectHeadDirection = (landmarks) => {
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    const noseX = nose.x;
    const eyeCenterX = (leftEye.x + rightEye.x) / 2;

    if (noseX < eyeCenterX - 0.02) return 'Izquierda';
    if (noseX > eyeCenterX + 0.02) return 'Derecha';
    return 'Centro';
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width="640" height="480" />
      <canvas ref={canvasRef} />
      <canvas ref={pictureRef} style={{ display: 'none' }} />
      <button onClick={initializeFaceDetector}>Iniciar Detector</button>
      <p>{msg}</p>
    </div>
  );
};

export default MediaPipeFace;
