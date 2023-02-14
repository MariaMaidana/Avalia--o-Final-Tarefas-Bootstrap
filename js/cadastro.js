const listaUsers = buscarDadosLocalStorage('usuarios');
const toastDiv = document.getElementById('toast-app');
const toastBS = new bootstrap.Toast(toastDiv);
const formularioCadastro = document.getElementById('form-cadastro');

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if(!email || !senha || !confirmaSenha || !email.includes('@')) {
        formularioCadastro.classList.add('was-validated')
        return
    }


    if(senha !== confirmaSenha) {
        mostrarAlerta('danger', 'As senhas não são iguais. Tente novamente!')
        formularioCadastro.classList.add('was-validated')
        return
    }


    const existe = listaUsers.some((valor) => valor.email === email);

    if(existe) {

        mostrarAlerta('danger', 'Esse email já possui cadastro. Tente novamente!');
        formularioCadastro.reset();
        return
    }

    const novoUser = {
        email: email,
        senha: senha,
        tarefas: []
    };

    listaUsers.push(novoUser);


    mostrarAlerta('success', 'Conta criada com sucesso!')

    // TEM Q COISAR PRA APARECER PRIMEIRO O ALERTA E DPS MANDAR P LOGIN

    window.location.href = './inicio.html'

    guardarLocalStorage('usuarios', listaUsers);

    formularioCadastro.reset();
    
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
