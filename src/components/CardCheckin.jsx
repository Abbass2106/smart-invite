import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Flashlight, FlashlightOff } from "lucide-react";


const CardCheckin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }, // Rear camera
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", true);
          videoRef.current.play();
        }

        requestAnimationFrame(tick);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    const tick = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code && !scannedCode) {
          setScannedCode(code.data);
          console.log("Scanned QR:", code.data);
        }
      }
      requestAnimationFrame(tick);
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scannedCode]);

  const toggleTorch = async () => {
    if (!videoRef.current) return;
    const stream = videoRef.current.srcObject;
    if (!stream) return;

    const [track] = stream.getVideoTracks();
    const capabilities = track.getCapabilities();

    if (capabilities.torch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !torchOn }],
        });
        setTorchOn(!torchOn);
      } catch (err) {
        console.error("Torch toggle failed:", err);
      }
    } else {
      alert("Torch not supported on this device");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-sm rounded-3">
            <div className="card-header">
              <h5 className="mb-0">Manual Card Check-in</h5>
            </div>
            <div className="card-body">
              {/* Manual check-in form */}
              <form className="d-flex mb-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Enter code.."
                  aria-label="Search"
                />
                <input className="btn btn-outline-primary" type="submit"
                  value="Check-in"
                />
              </form>

              {/* Instructions */}
              <p className="text-muted small">
                Point your rear camera at a QR code to scan automatically.
              </p>

              {/* QR Scanner Video */}
              <div className="mb-3">
                <video
                  ref={videoRef}
                  className="w-100 rounded bg-dark"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {/* Torch Button */}
              <div className="d-grid">
                <button
                  type="button"
                  onClick={toggleTorch}
                  className={`btn ${
                    torchOn ? "btn-primary" : "btn-secondary"
                  } d-flex align-items-center justify-content-center gap-2`}
                >
                  {torchOn ? <FlashlightOff size={18} /> : <Flashlight size={18} />}
                  {torchOn ? "Torch off" : "Torch on"}
                </button>
              </div>

              {/* Display scanned code */}
              {scannedCode && (
                <div className="alert alert-success mt-3">
                  ✅ Scanned Code: <strong>{scannedCode}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCheckin;
