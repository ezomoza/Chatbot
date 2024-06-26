const chatInput = document.querySelector('.chat-input textarea')
const sendChatBtn = document.querySelector('.chat-input span')
const chatbox = document.querySelector('.chatbox')

let userMessage;
const API_KEY = "";

const createChatLi = (message, className) => {
  // crea el LI de chat con el mensaje escrito
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className)
  let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi
}

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector('p')

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
     messages: [{"role": "user", "content": userMessage}],
    })
  }

    // envia POST request al API, devuelve respuesta
  fetch(API_URL, requestOptions).then(res =>res.json()).then(data => {
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.textContent = "Oops! hubo un problema. Porfavor intenta nuevamente.";
  })
}

const handleChat = () => {
  userMessage = chatInput.value.trim()
  if(!userMessage) return

  // append mensaje del usuario al box
  chatbox.appendChild(createChatLi(userMessage, "outgoing")) ;

  setTimeout(() => {
    // Muestra "pensando" miesntras se espera por la respuesta del bot
    const incomingChatLi = createChatLi("Pensando...", "incoming")
    chatbox.appendChild(incomingChatLi) ;
    generateResponse(incomingChatLi);
  },600)
}

sendChatBtn.addEventListener('click', handleChat)