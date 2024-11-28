var isRecording = null;
var isStopped = null;

var timer = document.createElement('div');
timer.id = 'timer';
timer.className = `flex items-center text-md justify-center p-2 cursor-pointer w-28 text-white px-5`;
timer.innerHTML = `<p class="flex gap-2 items-center"><span>00:00:00</span>  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="10" height="10" rx="5" fill="#C00404"/>
        </svg> <span class="border-l border-white">&nbsp;</span>
        </p>`;

var recordButton = document.createElement('button');
recordButton.id = 'record';
recordButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white`;
var recordImg = document.createElement('img');
recordImg.src =
  'https://res.cloudinary.com/abiolafasanya/image/upload/v1696059301/pause_kn1q0u.svg';
recordImg.alt = 'pause';
recordImg.className = 'w-[16px] h-[16px]';
recordButton.appendChild(recordImg);

var stopButton = document.createElement('button');
stopButton.id = 'stop';
stopButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer ${
  isRecording ? 'bg-gray-500' : 'bg-white'
}`;
var stopImg = document.createElement('img');
stopImg.src =
  'https://res.cloudinary.com/abiolafasanya/image/upload/v1696059300/stop_eiqvni.svg';
stopImg.alt = '';
stopImg.className = 'w-[20px] h-[20px]';
stopButton.appendChild(stopImg);

var videoButton = document.createElement('button');
videoButton.id = 'video';
videoButton.className =
  'flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white';
var videoImg = document.createElement('img');
videoImg.src =
  'https://res.cloudinary.com/abiolafasanya/image/upload/v1696059299/video_bgajdt.svg';
videoImg.alt = '';
videoImg.className = 'w-[18px] h-[18px]';
videoButton.appendChild(videoImg);

var audioButton = document.createElement('button');
audioButton.id = 'audio';
audioButton.className =
  'flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white';
var audioImg = document.createElement('img');
audioImg.src =
  'https://res.cloudinary.com/abiolafasanya/image/upload/v1696059302/audio_fmh6js.svg';
audioImg.alt = '';
audioImg.className = 'w-[18px] h-[18px]';
audioButton.appendChild(audioImg);

var deleteButton = document.createElement('button');
deleteButton.id = 'delete';
deleteButton.className =
  'flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white/30';
var deleteImg = document.createElement('img');
deleteImg.src =
  'https://res.cloudinary.com/abiolafasanya/image/upload/v1696059301/delete_nnglbr.svg';
deleteImg.alt = '';
deleteImg.className = 'w-[18px] h-[18px]';
deleteButton.appendChild(deleteImg);

// Create a container div for the buttons
var controlButtonsContainer = document.createElement('div');
controlButtonsContainer.className =
  ' flex gap-4 py-4 px-5 justify-center items-center bottom-10  rounded-full mx-20 p-3';
controlButtonsContainer.style.background = '#141414';
// Append the buttons to the container
controlButtonsContainer.appendChild(timer);
controlButtonsContainer.appendChild(recordButton);
controlButtonsContainer.appendChild(stopButton);
controlButtonsContainer.appendChild(videoButton);
controlButtonsContainer.appendChild(audioButton);
controlButtonsContainer.appendChild(deleteButton);

controlButtonsContainer.classList.add('draggable');
controlButtonsContainer.draggable = true;

var videoCapture = document.createElement('div');
var videoSource = document.createElement('video');
videoSource.className = 'w-full h-full object-cover object-center';
videoCapture.className =
  'rounded-full h-40 w-40 overflow-hidden';
videoCapture.appendChild(videoSource);

var container = document.createElement('div');
container.appendChild(videoCapture);
container.appendChild(controlButtonsContainer);
container.className = 'flex mx-5 gap-2 items-center fixed bottom-8 z-50';

document.addEventListener('mouseup', () => {
  isDragging = false;
  controlButtonsContainer.style.cursor = 'grab';
});

var body = document.body.appendChild(container);

var constraints = {
  audio: true,
  video: true,
};

var apiEndpoint = 'https://tabitha-njoki.onrender.com/upload';

let recorder;
let recordedChunks = [];
let stream = null;
let audio = null;
var isCamera = null;
var cameraStream = null;

console.log({ isRecording, isStopped }, 'checking ');

async function startRecording() {
  isRecording = true;
  isStopped = false;
  console.log({ isRecording, isStopped }, 'checking ');
  if (recorder && recorder.state === 'recording') {
    recorder.pause();
    console.log('recording paused');
  } else {
    stream = navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    audio = navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    let audioInput = await audio;

    console.log('recording started');

    stream
      .then(async (mediaStream) => {
        let media = new MediaStream([
          ...mediaStream.getTracks(),
          ...audioInput.getAudioTracks(),
        ]);
        recorder = new MediaRecorder(media, {
          mimeType: 'video/webm;codecs=vp9,opus',
        });
        var audioTrack = mediaStream?.getAudioTracks();
        console.log(audioTrack, 'audio track');

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        recorder.start();
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }
}

async function stopRecording() {
  isStopped = true;
  isRecording = false;
  console.log({ isRecording, isStopped }, 'checking ');
  alert('capturing has ended');
  if (recorder && recorder.state !== 'inactive') {
    recorder.stop();
    recorder.onstop = () => {
      var blob = new Blob(recordedChunks, {
        mimeType: 'video/webm;codecs=vp9,opus',
      });
      console.log();
      recordedChunks = [];

      if (stream) {
        stream.then((stream) => {
          var tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        });
        stream = null;
      }

      if (audio) {
        audio.then((stream) => {
          console.log(stream, 'audio stream');
          var tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        });
        audio = null;
      }

      console.log(blob, 'blob  here');

      var formData = new FormData();
      formData.append(
        'video',
        blob,
        `untitled_video_${new Date().getTime()}.webm`
      );

      fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log('Screen recording sent to the API successfully.');
            var res = response.json();
            return res;
          } else {
            console.error('Error sending screen recording to the API.');
          }
        })
        .then(async (data) => {
          console.log(data);
          if (data) {
            var baseUrl = 'https://chrome-ext-five.vercel.app';
            window.open(
              `${baseUrl}/playback?recording=${data.url}&transcript=${data.transcribe_url}&filename=${data.video_name}`
            );
          } else throw new Error('An error occured');
        })
        .catch((error) => {
          console.error('Error sending screen recording to the API:', error);
        });
    };
  }
}

async function activateAudio() {
  try {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  } catch (e) {
    console.log('no audio');
  }
}

async function activateVideo() {
  try {
    await navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((vidStream) => {
        cameraStream = vidStream;
        videoSource.srcObject = vidStream;
        videoSource.addEventListener('loadedmetadata', () => {
          videoSource.play();
        });
      });
  } catch (e) {
    console.log('Error occured', e);
  }
}

function deactivateVideo() {
  if (!videoSource) return;
  let stream = videoSource.srcObject;
  let tracks = stream?.getTracks();
  typeof tracks !== 'undefined' && tracks?.forEach((track) => track.stop());
  videoSource.srcObject = null;
}

function uuid(len = 10) {
  let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij012345678'.split('');
  let id = '';
  for (let i = 0; i < len; i++) {
    const rand = Math.floor(Math.random() * char.length);
    id += char[rand];
  }
  return id;
}

audioButton.addEventListener('click', async (e) => {
  await activateAudio();
});

videoButton.addEventListener('click', async (e) => {
  if (!isCamera) {
    alert('activated');
    isCamera = true;
    await activateVideo();
  } else {
    isCamera = false
    deactivateVideo();
  }
});

recordButton.addEventListener('click', (e) => {
  // e.currentTarget.disabled = isRecording; // Disable the button
  if (isRecording) {
    recordButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-[#141414]`;
    recordButton.classList.add('disabled:bg-[#141414]');
  } else {
    recordButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white`;
  }
  startRecording();
});

stopButton.addEventListener('click', (e) => {
  e.currentTarget.disabled = isStopped;
  if (isStopped) {
    stopButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-[#141414]`;
  } else {
    stopButton.className = `flex items-center justify-center rounded-full p-2 h-10 w-10 cursor-pointer bg-white`;
  }
  setTimeout(() => {
    stopRecording();
  }, 1000); // Stop recording after 1 seconds (adjust as needed)
});