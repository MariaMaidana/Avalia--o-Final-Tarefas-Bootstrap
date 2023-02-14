const listaUsers = buscarDadosLocalStorage('usuarios');
const toastCadastro = document.getElementById('toast-app');
const toastBS = new bootstrap.Toast(toastCadastro);
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

    setTimeout(() => {
        window.location.href = './inicio.html'
    }, 5000)
    

    guardarLocalStorage('usuarios', listaUsers);

    formularioCadastro.reset();
    
})

function mostrarAlerta(tipo, mensagem) {

    toastCadastro.classList.add(`text-bg-${tipo}`)

    const espacoMensagem = document.getElementById('espaco-mensagem')
    espacoMensagem.innerHTML = mensagem

    toastBS.show()

    setTimeout(() => {
        toastBS.hide()

       toastCadastro.classList.remove(`text-bg-${tipo}`)
    }, 4000)

}


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


