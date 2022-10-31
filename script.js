
let nomeUsuario = ""
function userLogin(){
   
  nomeUsuario = document.querySelector('.userName').value
 const login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nomeUsuario })
 login.then(searchMessages)
 login.catch(alertError)
 console.log(nomeUsuario)

}



function alertError(erro) {
    if (erro.response.status === 404) {
        alert('Erro ao carregar mensagens')
    }
    if (erro.response.status === 400) {
        alert('Nome de usuário já existe')
    }
}

function searchMessages() {
    let initialScreen = document.querySelector('.initialScreen')
    initialScreen.classList.add('hidden')
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

    messages.then(renderMessages)
    messages.catch(alertError)
}
function renderMessages(response) {
    const messages = response.data
   
    for (i = 0; i < messages.length; i++) {
        if (messages[i].type === "status") {
            chat.innerHTML += `<li class="enter-message">
            <span class="messageTime">(${messages[i].time})</span><span class="messageFrom">${messages[i].from}</span>${messages[i].text}
        </li>`
        } else if ( messages[i].type === "private_message" && messages[i].to === nomeUsuario  && messages[i].to !==  "Todos" || messages[i].from === nomeUsuario  && messages[i].to !==  "Todos" && messages[i].type === "private_message") {
            chat.innerHTML += `<li class="private-message"> <span class="messageTime">(${messages[i].time})</span> <span class="messageFrom">${messages[i].from}</span> reservadamente para <span class="messageFrom">${messages[i].to}:</span> ${messages[i].text}
        </li>`
        }else if ( messages[i].type === "message" ){
            chat.innerHTML += ` <li class="normal-message"> 
            <span class="messageTime">(${messages[i].time})</span>  <span class="messageFrom">${messages[i].from}</span> para <span class="messageFrom">${messages[i].to}:</span> ${messages[i].text}
             </li>`
        }
    }
    let lastMessage = document.querySelector('.chat :nth-last-child(4)')

    lastMessage.scrollIntoView()
    console.log(messages)
}

function checkStatus() {
    const keepOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nomeUsuario })
    keepOnline.then(searchMessages)
    keepOnline.catch(alertError)
    console.log('keepOnline')
}
function sendMessage() {
    let message = document.querySelector('.text-msg').value
    let cleanMessage = document.querySelector('.text-msg')

    const sendingMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', { from: nomeUsuario, to: messageDestiny, text: message, type: messageType })

    sendingMessage.then(searchMessages)
    sendingMessage.catch(alertError)
    cleanMessage.value = ''
    console.log(`sendMessage`)
}


/* INICIO BONUS */
let messageDestiny = "Todos"
let messageType = "message"

function showSidebar() {
    let sidebar = document.querySelector('.sidebar')
    let shadowbar = document.querySelector('.shadowbar')
    sidebar.classList.toggle('hidden')
    shadowbar.classList.toggle('hidden')


}
function getParticipants(){
const participants = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants') 
participants.then(renderParticipants)
participants.catch(alertError)
}

getParticipants()
setInterval(getParticipants, 5000)
setInterval(checkStatus, 5000)


let chat = document.querySelector('.chat')

function renderParticipants(response) {
    const participants = response.data
    let list = document.querySelector('.participants')
    list.innerHTML = '<li  onclick="messageDestinySend(this)" class="hiddenIcon pointer"><div><img src="./assets/profileIcon.svg"></img>  Todos</div> <ion-icon name="checkmark"></ion-icon></li>'
    for (i = 0; i < participants.length; i++) {
        list.innerHTML += `<li onclick="messageDestinySend(this)" class="hiddenIcon pointer" ><div><img src="./assets/profileIcon.svg"></img>  ${participants[i].name}</div> <ion-icon name="checkmark"></ion-icon> </li>`
}
}
function messageDestinySend (name){
    let selectedName = document.querySelector('.showIcon')
    if ( selectedName !== null){
        selectedName.classList.remove('showIcon')
        selectedName.classList.add('hiddenIcon')
    }
   name.classList.toggle('hiddenIcon')
   name.classList.toggle('showIcon')
    messageDestiny = name.innerHTML

   
}
function messageTypeSend (div,type){
    let selectedType = document.querySelector('.showIconTypeMsg')
    if ( selectedType !== null){
        selectedType.classList.remove('showIconTypeMsg')
        selectedType.classList.add('hiddenIconTypeMsg')
    }
    messageType = type
    console.log(type)
    div.classList.toggle('hiddenIconTypeMsg')
   div.classList.toggle('showIconTypeMsg')

}
function sendEnter(event) {
    if (event.key === "Enter") {
        sendMessage()
        
    }
 
}
function loginEnter(event) {
    if (event.key === "Enter") {
        userLogin()
    }
}
