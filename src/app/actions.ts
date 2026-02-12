'use server';

export async function fetchStreamDataXml() {
    const response = await fetch("https://test.tempfm.uz/nowonair/nowplaying.xml", {
        cache: 'no-store',
        headers: {
            'User-Agent': 'TempFM Website/1.0'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch stream data: ${response.status}`);
    }

    return response.text();
}
