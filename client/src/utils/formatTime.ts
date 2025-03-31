export function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) {
    return "0:00";
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
