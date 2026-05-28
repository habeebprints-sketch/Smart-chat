const API_KEY = "PASTE_YOUR_OPENAI_KEY";

async function sendMessage(){

  const input = document.getElementById("userInput");
  const message = input.value;

  if(message === "") return;

  addMessage(message, "user");

  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + API_KEY
    },
    body:JSON.stringify({
      model:"gpt-4.1-mini",
      messages:[
        {
          role:"user",
          content:message
        }
      ]
    })
  });

  const data = await response.json();

  const reply = data.choices[0].message.content;

  addMessage(reply, "bot");
}

function addMessage(text, sender){

  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");

  msg.classList.add(sender);

  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}
