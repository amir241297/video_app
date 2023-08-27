import React, { useEffect, useState } from 'react'

export const ScreenRecording = () => {

  const [stream, setStream] = useState();
  const [recording, setRecording] = useState(false);
  const [videoRef, setVideoRef] = useState();
  const [permission,setPermission]=useState(false)

  const handleCam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((webcamStream) => {
        // Get user media for screen sharing
        navigator.mediaDevices.getDisplayMedia({ video: true })
          .then((screenStream) => {
            const combinedStream = new MediaStream([...webcamStream.getTracks(), ...screenStream.getTracks()]);
            setStream(combinedStream);
          })
          .catch((error) => {
            console.error('Error accessing screen sharing:', error);
          });
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }
  useEffect(() => {
    // Get user media for webcam
    handleCam()

  }, [permission]);

  const handleRecording = () => {
    setPermission(true)
    if (!stream) return;
    if (!recording) {
      videoRef.srcObject = stream;
      videoRef.play();
    } else {
      videoRef.srcObject = null;
    }
    setRecording(!recording);
  };

  return (
    <div>
      <h1>Screen and Webcam Recorder</h1>
      <video ref={setVideoRef} style={{ width: '100%', maxWidth: '800px' }} muted controls />
      <button onClick={handleRecording}>{recording ? 'Stop Recording' : 'Start Recording'}</button>
    </div>
  );
};

