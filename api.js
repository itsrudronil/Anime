
// api.js
const API_BASE = 'http://starter.nvisionbd.net/player_api.php?username=talukderrudronil&password=talRudronil8';

export async function getChannels() {
    const url = `${API_BASE}&action=get_live_streams`;
    // CORS বাইপাস করার জন্য প্রক্সি ব্যবহার
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    return JSON.parse(data.contents);
}
