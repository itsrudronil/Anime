import { getChannels } from './api.js';

let allChannels = [];
const channelSelect = document.getElementById('channelSelect');
const searchInput = document.getElementById('searchInput');
const video = document.getElementById('video');

async function init() {
    allChannels = await getChannels();
    renderSelect(allChannels);
}

function renderSelect(channels) {
    channelSelect.innerHTML = '<option>চ্যানেল সিলেক্ট করুন</option>';
    channels.forEach(ch => {
        let opt = document.createElement('option');
        opt.value = ch.stream_id;
        opt.innerHTML = ch.name;
        channelSelect.appendChild(opt);
    });
}

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allChannels.filter(ch => ch.name.toLowerCase().includes(query));
    renderSelect(filtered);
});

channelSelect.addEventListener('change', () => {
    const streamId = channelSelect.value;
    if (!streamId) return;
    
    const videoUrl = `http://starter.nvisionbd.net/live/talukderrudronil/talRudronil8/${streamId}.m3u8`;
    
    if (Hls.isSupported()) {
        if (window.hls) window.hls.destroy();
        window.hls = new Hls();
        window.hls.loadSource(videoUrl);
        window.hls.attachMedia(video);
        window.hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }
});

init();
