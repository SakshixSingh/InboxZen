const suggestReplies = async (summary) => {
  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "InboxZen",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates short, polite, professional replies to summarized emails.",
        },
        {
          role: "user",
          content: `Suggest 3 concise email replies to this summary:\n\n"${summary}"`,
        },
      ],
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content.split("\n").filter((line) => line.trim()) || [];
};

export default suggestReplies;
