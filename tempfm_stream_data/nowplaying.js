let lastTrackTitle = '';
let lastTrackArtist = '';

function updateTrackInfo() {
    console.log('Начинаем загрузку XML...');
    fetch('nowonair/nowplaying.xml')
        .then(response => {
            console.log('Получен ответ от сервера:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Получены данные XML:', data);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            
            // Текущий трек
            const currentTrack = xmlDoc.querySelector('TRACK');
            if (currentTrack) {
                const title = currentTrack.getAttribute('TITLE') || 'Unknown Title';
                const artist = currentTrack.getAttribute('ARTIST') || 'Unknown Artist';
                
                // Обновляем только если трек изменился
                if (title !== lastTrackTitle || artist !== lastTrackArtist) {
                    console.log('Трек изменился, обновляем информацию');
                    lastTrackTitle = title;
                    lastTrackArtist = artist;
                    
                    const coverImage = document.querySelector('.track-cover');
                    if (coverImage) {
                        // Сначала обновляем обложку
                        const timestamp = new Date().getTime();
                        coverImage.src = `nowonair/images/artwork.png?t=${timestamp}`;
                        
                        // Ждем загрузки обложки
                        coverImage.onload = () => {
                            // После загрузки обложки обновляем текст
                            const titleElement = document.querySelector('.track-title');
                            const artistElement = document.querySelector('.track-artist');
                            
                            if (titleElement) titleElement.textContent = title;
                            if (artistElement) artistElement.textContent = artist;
                        };
                    }
                }
            }

            // Следующий трек
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
            console.error('Ошибка при обновлении информации о треке:', error);
        });
}

// Обновляем информацию сразу при загрузке и каждые 5 секунд
document.addEventListener('DOMContentLoaded', () => {
    updateTrackInfo();
    setInterval(updateTrackInfo, 5000);
}); 