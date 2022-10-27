const nomeUsuario = prompt('Qual seu nome?')



const login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nomeUsuario })
login.then(searchMessages)
login.catch(alertError)

function searchMessages() {
    const messages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

    messages.then(renderMessages)
    messages.catch(alertError)
}

function checkStatus() {
    const keepOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nomeUsuario })
    keepOnline.then(searchMessages)
    keepOnline.catch(alertError)
    console.log('keepOnline')
}

setInterval(checkStatus, 5000)

let chat = document.querySelector('.chat')

function renderMessages(response) {
    const messages = response.data
    console.log(messages)
    for (i = 0; i < messages.length; i++) {
        if (messages[i].text === 'entra na sala...' || messages[i].text === 'sai da sala...') {
            chat.innerHTML += `<li> (${messages[i].time})  <strong> ${messages[i].from} </strong> ${messages[i].text}
        </li>`
        } else {
            chat.innerHTML += `<li> (${messages[i].time}) <strong>${messages[i].from}</strong> para <strong>${messages[i].to}:</strong> ${messages[i].text}</li>`
        }
    }
    let lastMessage = document.querySelector('ul :nth-last-child(3)')

    lastMessage.scrollIntoView()
}

function alertError(erro) {
    if (erro.response.status === 404) {
        alert('Erro ao carregar mensagens')
    }
    if (erro.response.status === 400) {
        alert(erro.message)

    }
    console.log(erro)
}

function sendMessage() {
    let message = document.querySelector('input').value
    let cleanMessage = document.querySelector('input')


    console.log(message)
    const sendingMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', { from: nomeUsuario, to: 'Todos', text: message, type: 'message' })

    sendingMessage.then(searchMessages)
    sendingMessage.catch(alertError)
    cleanMessage.value = ''
}

