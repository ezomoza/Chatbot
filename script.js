const chatInput = document.querySelector('.chat-input textarea')
const sendChatBtn = document.querySelector('.chat-input span')
const chatbox = document.querySelector('.chatbox')

let userMessage;

const createChatLi = (message, className) => {
  // crea el LI de chat con el mensaje escrito
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className)
  let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi
}

const handleChat = () => {
  userMessage = chatInput.value.trim()
  if(!userMessage) return

  // append mensaje del usuario al box
  chatbox.appendChild(createChatLi(userMessage, "outgoing")) ;

  setTimeout(() => {
    // Muestra "pensando" miesntras se espera por la respuesta del bot
    chatbox.appendChild(createChatLi("thinking...", "incoming")) ;
  },600)
}

sendChatBtn.addEventListener('click', handleChat)