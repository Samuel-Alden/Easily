async function askAI() {
  const question = document.getElementById("userQuestion").value.trim();
  const responseBox = document.getElementById("aiResponse");

  if (!question) {
    alert("Please enter a question.");
    return;
  }

  responseBox.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await res.json();

    if (data && data.reply) {
      responseBox.innerHTML = `<strong>Answer:</strong><br>${data.reply}`;
    } else {
      responseBox.innerHTML = "⚠️ No response from AI.";
    }
  } catch (error) {
    responseBox.innerHTML = `❌ Error: ${error.message}`;
  }
}