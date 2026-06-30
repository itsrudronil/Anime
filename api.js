export async function getChannels() {
    try {
        const response = await fetch('channels.json?t=' + new Date().getTime());
        return await response.json();
    } catch (error) {
        console.error("JSON লোড করতে সমস্যা:", error);
        return [];
    }
}
