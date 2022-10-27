const nomeUsuario = prompt('Qual seu nome?')

const login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nomeUsuario})
login.then(buscarMensagens)
login.catch(alertError)

function buscarMensagens() {
    const mensages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

mensages.then(renderMensages)
mensages.catch(alertError)

}

let chat = document.querySelector('.chat')



function renderMensages(response) {
    const mensages = response.data
    console.log(mensages)
    for ( i = 0; i < mensages.length; i++) {
        if (mensages[i].text === 'entra na sala...' || mensages[i].text === 'sai da sala...') {
        chat.innerHTML += `<li> (${mensages[i].time})  <strong> ${mensages[i].from} </strong> ${mensages[i].text}
        </li>`
    } else {
        chat.innerHTML += `<li> (${mensages[i].time}) <strong>${mensages[i].from}</strong> para <strong>${mensages[i].to}:</strong> ${mensages[i].text}</li>`
    }
}
let lastMensage = document.querySelector('ul :nth-last-child(3)')

lastMensage.scrollIntoView()
}

function alertError(erro) {
    if(erro.response.status === 404 )  {
    alert('Erro ao carregar mensagens')
    }
    if(erro.response.status === 400) {
        alert('Nome de usuário já existe')
    }
}



