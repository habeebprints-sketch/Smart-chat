const API_KEY = "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";

async function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  addMessage(message, "user");

  input.value = "";

  try {

    addMessage("Typing...", "bot");

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    document.querySelector(".bot:last-child").remove();

    if (data.error) {
      addMessage("ERROR: " + data.error.message, "bot");
      return;
    }

    const reply = data.choices[0].message.content;

    addMessage(reply, "bot");

  } catch (error) {

    addMessage("FAILED: " + error.message, "bot");
  }
}

function addMessage(text, sender) {

  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");

  msg.classList.add(sender);

  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}
