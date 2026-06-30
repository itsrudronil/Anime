export async function getChannels() {
    const response = await fetch('channels.json'); // তোমার লোকাল ফাইল
    return await response.json();
}
