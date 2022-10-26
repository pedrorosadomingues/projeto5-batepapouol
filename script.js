const mensages = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

mensages.then(renderMensages)

let chat = document.querySelector('.chat')

function renderMensages(response) {
    const mensages = response.data
    console.log(mensages)
    for ( i = 0; i < mensages.length; i++) {
        if (mensages[i].text === 'entra na sala...' || mensages[i].text === 'sai da sala...') {
        chat.innerHTML += `<li> (${mensages[i].time}) <strong>${mensages[i].from}</strong> ${mensages[i].text}</li>`
    } else {
        chat.innerHTML += `<li> (${mensages[i].time}) <strong>${mensages[i].from}</strong> para <strong>${mensages[i].to}</strong>: ${mensages[i].text}</li>`
    }
}
}