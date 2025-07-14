const summarizeEmail = async (text) => {
 
  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

  


  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, 
        "X-Title": "InboxZen"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku", 
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes long and messy email threads into short, clear summaries with bullet points and action items."
          },
          {
            role: "user",
            content: `Please summarize this email:\n\n${text}`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("🧠 OpenRouter API response:", data);

    // Check for error object
    if (data.error) {
      return `❌ Error: ${data.error.message || "Unknown error"}`;
    }

    return data?.choices?.[0]?.message?.content.trim() || "No summary found.";
  } catch (error) {
    console.error("🔥 API call failed:", error);
    return "❌ Failed to reach summarizer service.";
  }
};

export default summarizeEmail;
