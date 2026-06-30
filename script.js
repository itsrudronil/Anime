// script.js
const M3U_PATH = 'channels.m3u'; // তোমার রিপোর ফাইলের নাম
let allChannels = [];
const channelSelect = document.getElementById('channelSelect');
const video = document.getElementById('video');

async function loadM3U() {
    const response = await fetch(M3U_PATH + '?t=' + new Date().getTime());
    const data = await response.text();
    const lines = data.split('\n');
    
    let currentName = '';
    lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
            currentName = line.split(',')[1];
        } else if (line.startsWith('http')) {
            allChannels.push({ name: currentName, url: line });
            currentName = '';
        }
    });
    renderSelect(allChannels);
}

function renderSelect(channels) {
    channelSelect.innerHTML = '<option>চ্যানেল সিলেক্ট করুন</option>';
    channels.forEach(ch => {
        let opt = document.createElement('option');
        opt.value = ch.url;
        opt.innerHTML = ch.name;
        channelSelect.appendChild(opt);
    });
}

// সার্চ ফাংশন
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allChannels.filter(ch => ch.name.toLowerCase().includes(query));
    renderSelect(filtered);
});

// ভিডিও প্লেয়ার
channelSelect.addEventListener('change', () => {
    const url = channelSelect.value;
    if (Hls.isSupported()) {
        if (window.hls) window.hls.destroy();
        window.hls = new Hls();
        window.hls.loadSource(url);
        window.hls.attachMedia(video);
        window.hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }
});

loadM3U();
