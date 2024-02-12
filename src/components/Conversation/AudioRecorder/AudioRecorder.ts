export class AudioRecorder {
  private mediaStream: MediaStream | undefined;
  private mediaRecorder: MediaRecorder | undefined;
  private recordedChunks: Blob[] = [];
  private speech: string | undefined;
  private preview = "";

  public startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true }) // Request access to the microphone
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  private handleSuccess = (stream: MediaStream) => {
    this.mediaStream = stream;
    this.mediaRecorder = new MediaRecorder(this.mediaStream);

    // Event handler for dataavailable event --> when it records sth
    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    });

    // Event handler for stop event
    this.mediaRecorder.addEventListener("stop", () => {
      this.saveSpeech();
    });

    this.mediaRecorder.start();
  };

  private handleError = (error: Error) => {
    console.error("Error accessing microphone:", error);
  };

  private async saveSpeech() {
    const blob = new Blob(this.recordedChunks, { type: "audio/wav" });
    this.preview = URL.createObjectURL(blob);
    this.speech = await blobToBase64(blob);
    this.speech = this.speech.substring("data:audio/wav;base64,".length);
    this.recordedChunks = []; //reset temporary chunks
  }

  public async getSpeech() {
    return this.speech;
  }

  public async stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.mediaStream?.getTracks().forEach((track) => track.stop());
    }
  }

  public playRecordingPreview() {
    if (this.preview) {
      const audio = new Audio();
      audio.src = this.preview;
      audio.play();
    } else {
      console.error("No recorded speech available.");
    }
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result as string);
  });
}
