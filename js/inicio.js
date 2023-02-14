const listaUsers = buscarDadosLocalStorage('usuarios');
const formularioEntrar = document.getElementById('form-entrar');
const toastDiv = document.getElementById('toast-app');
const toastBS = new bootstrap.Toast(toastDiv);


formularioEntrar.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if(!email || !senha || !email.includes('@')) {
        formularioEntrar.classList.add('was-validated')
        return
    }

    const usuarioEncontrado = listaUsers.find((valor) => valor.email === email && valor.senha === senha);

    if(!usuarioEncontrado) {
        mostrarAlerta('danger', 'E-mail e senha incorretos ou não existem. Tente novamente!')
        return
    } else {
        guardarLocalStorage('usuarioLogado', usuarioEncontrado);
        window.location.href = './tarefas.html'
    }
})



function guardarLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor);

    localStorage.setItem(chave, valorJSON);

}

function buscarDadosLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON);
        return listaDados
    } else {
        return []
    }
}

function mostrarAlerta(tipo, mensagem) {

    toastDiv.classList.add(`text-bg-${tipo}`)

    const espacoMensagem = document.getElementById('espaco-mensagem')
    espacoMensagem.innerHTML = mensagem

    toastBS.show()

    setTimeout(() => {
        toastBS.hide()

        toastDiv.classList.remove(`text-bg-${tipo}`)
    }, 5000)

}