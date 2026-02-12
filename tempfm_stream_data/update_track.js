const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');
const visualizer = document.getElementById('visualizer');
let isPlaying = false;
let audioContext;
let analyser;
let dataArray;
let bars;
let animationFrameId;
let lastTrackTitle = '';
let lastTrackArtist = '';

const nonAppleStreamUrl = 'https://tempradio-live.uz/live';
const appleStreamUrl = 'https://tempradio-live.uz/streamaac';

function isAppleDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod|mac/.test(userAgent);
    console.log(`Device detected: ${isApple ? 'Apple' : 'Non-Apple'}`);
    return isApple;
}

function setAudioSource() {
    const streamUrl = isAppleDevice() ? appleStreamUrl : nonAppleStreamUrl;
    if (audioPlayer.src !== streamUrl) {
        audioPlayer.src = streamUrl;
        console.log(`Audio stream set to: ${streamUrl}`);
    }
}

document.addEventListener('DOMContentLoaded', setAudioSource);

const barCount = 23;
for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    visualizer.appendChild(bar);
}
bars = document.querySelectorAll('.bar');

audioPlayer.addEventListener('error', (e) => {
    console.error("Error with audio player:", e);
});

playButton.addEventListener('click', async () => {
    if (!audioContext) {
        await setupAudioContext();
    }

    if (isPlaying) {
        audioPlayer.pause();
        console.log('Audio player paused'); // Log for pause event
        playButton.querySelector('.play-icon').style.display = 'block';
        playButton.querySelector('.pause-icon').style.display = 'none';
        cancelAnimationFrame(animationFrameId);
        console.log('Visualizer animation paused');
    } else {
        try {
            await audioContext.resume();
            if (audioPlayer.paused) {  // Check if it's already playing
                await audioPlayer.play();
                console.log('Audio player started playing'); // Log for play event
            }
            playButton.querySelector('.play-icon').style.display = 'none';
            playButton.querySelector('.pause-icon').style.display = 'block';
            animateVisualizer();
            console.log(`Audio playing from: ${audioPlayer.src}`);
        } catch (e) {
            console.error("Error playing audio:", e);
        }
    }
    isPlaying = !isPlaying;
});

async function setupAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audioPlayer);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            console.log('Audio context setup complete');
        } catch (e) {
            console.error("Error setting up audio context:", e);
        }
    }
}

function animateVisualizer() {
    if (!audioContext || !analyser || !isPlaying) {
        animationFrameId = requestAnimationFrame(animateVisualizer);
        return;
    }

    analyser.getByteFrequencyData(dataArray);

    const hasData = dataArray.some(value => value > 0);
    if (!hasData) {
        animationFrameId = requestAnimationFrame(animateVisualizer);
        return;
    }

    const halfLength = Math.floor(dataArray.length / 2);

    bars.forEach((bar, index) => {
        let dataIndex;
        if (index < barCount / 2) {
            dataIndex = halfLength - Math.floor(index / (barCount / 2) * halfLength);
        } else {
            dataIndex = Math.floor((index - barCount / 2) / (barCount / 2) * halfLength);
        }
        const barHeight = dataArray[dataIndex] / 255 * 100;
        bar.style.height = `${Math.max(barHeight, 5)}%`;
    });

    animationFrameId = requestAnimationFrame(animateVisualizer);
}

function unlockAudioContext(audioCtx) {
    if (audioCtx.state === 'suspended') {
        const unlock = function () {
            audioCtx.resume().then(() => {
                document.body.removeEventListener('touchstart', unlock);
                document.body.removeEventListener('touchend', unlock);
                document.body.removeEventListener('click', unlock);
            });
            console.log('Audio context unlocked'); // Log for unlock event
        };
        document.body.addEventListener('touchstart', unlock, false);
        document.body.addEventListener('touchend', unlock, false);
        document.body.addEventListener('click', unlock, false);
    }
}

// Added 'beforeunload' event to log when the page is unloading
window.addEventListener('beforeunload', () => {
    console.log('Unloading page - pausing audio and closing audio context');
    audioPlayer.pause();   // Pause audio to close connection
    if (audioContext) {
        audioContext.close();  // Release audio context
        console.log('Audio context closed'); // Log for context close
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateTrackInfo();
    setInterval(updateTrackInfo, 5000);
    setupAudioContext().then(() => {
        if (audioContext) {
            unlockAudioContext(audioContext);
            // РђРІС‚РѕР·Р°РїСѓСЃРє РїР»РµРµСЂР°
            setTimeout(() => {
                playButton.click();
            }, 1000);
        }
    });
});

function updateTrackInfo() {
    console.log('РќР°С‡РёРЅР°РµРј Р·Р°РіСЂСѓР·РєСѓ XML...');
    fetch('nowonair/nowplaying.xml')
        .then(response => {
            console.log('РџРѕР»СѓС‡РµРЅ РѕС‚РІРµС‚ РѕС‚ СЃРµСЂРІРµСЂР°:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('РџРѕР»СѓС‡РµРЅС‹ РґР°РЅРЅС‹Рµ XML:', data);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // РўРµРєСѓС‰РёР№ С‚СЂРµРє
            const currentTrack = xmlDoc.querySelector('TRACK');
            if (currentTrack) {
                const title = currentTrack.getAttribute('TITLE') || 'Unknown Title';
                const artist = currentTrack.getAttribute('ARTIST') || 'Unknown Artist';

                // РћР±РЅРѕРІР»СЏРµРј С‚РѕР»СЊРєРѕ РµСЃР»Рё С‚СЂРµРє РёР·РјРµРЅРёР»СЃСЏ
                if (title !== lastTrackTitle || artist !== lastTrackArtist) {
                    console.log('РўСЂРµРє РёР·РјРµРЅРёР»СЃСЏ, РѕР±РЅРѕРІР»СЏРµРј РёРЅС„РѕСЂРјР°С†РёСЋ');
                    lastTrackTitle = title;
                    lastTrackArtist = artist;

                    const coverImage = document.querySelector('.track-cover');
                    if (coverImage) {
                        // РЎРЅР°С‡Р°Р»Р° РѕР±РЅРѕРІР»СЏРµРј РѕР±Р»РѕР¶РєСѓ
                        const timestamp = new Date().getTime();
                        coverImage.src = `nowonair/images/artwork.png?t=${timestamp}`;

                        // Р–РґРµРј Р·Р°РіСЂСѓР·РєРё РѕР±Р»РѕР¶РєРё
                        coverImage.onload = () => {
                            // РџРѕСЃР»Рµ Р·Р°РіСЂСѓР·РєРё РѕР±Р»РѕР¶РєРё РѕР±РЅРѕРІР»СЏРµРј С‚РµРєСЃС‚
                            const titleElement = document.querySelector('.track-title');
                            const artistElement = document.querySelector('.track-artist');

                            if (titleElement) titleElement.textContent = title;
                            if (artistElement) artistElement.textContent = artist;
                        };
                    }
                }
            }

            // РЎР»РµРґСѓСЋС‰РёР№ С‚СЂРµРє
            const nextTrack = xmlDoc.querySelector('NEXTTRACK TRACK');
            if (nextTrack) {
                const nextTitle = nextTrack.getAttribute('TITLE') || 'Unknown Title';
                const nextArtist = nextTrack.getAttribute('ARTIST') || 'Unknown Artist';

                const nextTitleElement = document.querySelector('.next-title');
                const nextArtistElement = document.querySelector('.next-artist');

                if (nextTitleElement) nextTitleElement.textContent = nextTitle;
                if (nextArtistElement) nextArtistElement.textContent = nextArtist;
            }
        })
        .catch(error => {
            console.error('РћС€РёР±РєР° РїСЂРё РѕР±РЅРѕРІР»РµРЅРёРё РёРЅС„РѕСЂРјР°С†РёРё Рѕ С‚СЂРµРєРµ:', error);
        });
}
