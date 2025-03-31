exports.handler = async function(event, context) {
  // Simple API endpoint for potential future use
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Music Player API is running!",
      timestamp: new Date().toISOString()
    })
  };
}