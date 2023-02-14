let indiceAtualizacao = -1;
const listaTarefas = [];

const usuarioLogado = buscarDadosStorage('usuarioLogado');

document.addEventListener('DOMContentLoaded', () => {
    if(!usuarioLogado.email) {
        window.location.href = './inicio.html'
    } else {
        mostrarTarefas()
    }
})  


const modalCadastro = new bootstrap.Modal('#modalCreate');
const modalExcluir = new bootstrap.Modal('#modal-excluir');
const modalAtualizar = new bootstrap.Modal('#modal-editar');

const toastDiv = document.getElementById('toast-app');
const toastBS = new bootstrap.Toast(toastDiv);


const formTarefas = document.getElementById('form-tarefa');
const formAtualizar = document.getElementById('form-editar');

formTarefas.addEventListener('submit', (event) => {
    event.preventDefault();

    if(!formTarefas.checkValidity()) {
        formTarefas.classList.add('was-validated')
        return
    }

    const tarefa = document.getElementById('tarefa').value;
    const descricao = document.getElementById('descricao').value;

    const novaTarefa = {
        id: gerarId(),
        tarefa: tarefa,
        descricao: descricao,
    }

    listaTarefas.push(novaTarefa)
    salvarDadosStorage('tarefas', listaTarefas)
    modalCadastro.hide()

    console.log(listaTarefas)

    formTarefas.classList.remove('was-validated')
    formTarefas.reset()
    mostrarTarefas()
    mostrarAlerta('success', 'Tarefa cadastrado com sucesso!')
})


formAtualizar.addEventListener('submit', (ev) => {
    ev.preventDefault()

    if(!formAtualizar.checkValidity()) {
        formAtualizar.classList.add('was-validated')
        return
    }

    const tarefaEditada = document.getElementById('nova-tarefa').value
    const descricaoEditada = document.getElementById('nova-descricao').value


   listaTarefas[indiceAtualizacao].tarefa = tarefaEditada
   listaTarefas[indiceAtualizacao].descricao = descricaoEditada


    salvarDadosStorage('tarefas',listaTarefas)
    mostrarTarefas()

    modalAtualizar.hide()
    formAtualizar.classList.remove('was-validated')
    formAtualizar.reset()
    mostrarAlerta('success', 'Tarefa atualizada!')
    indiceAtualizacao = -1

})


function mostrarTarefas() {
    const tbody = document.getElementById('lista-tarefas')

    tbody.innerHTML = ''

    listaTarefas.forEach((tarefa, indice) => {
        tbody.innerHTML += `
            <tr id="${tarefa.id}">
                <td>${indice + 1}</td>
                <td>${tarefa.tarefa}</td>
                <td>${tarefa.descricao}</td>
                <td>
                    <button class="btn btn-success m-1" aria-label="Editar" onclick="mostrarModalAtualizar(${indice})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger m-1" aria-label="Apagar" onclick="mostrarModalExcluir(${indice}, ${tarefa.id})">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
        `
    })
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


function mostrarModalExcluir(indiceTarefa, idTarefa) {
    console.log(idTarefa)
    modalExcluir.show()
    const botaoExcluir = document.getElementById('btn-delete')

    botaoExcluir.setAttribute('onclick', `apagarTarefa(${indiceTarefa}, ${idTarefa})`)

}


function apagarTarefa(indiceTarefa, idTarefa) {
    
    listaTarefas.splice(indiceTarefa, 1)
    salvarDadosStorage('tarefas', listaTarefas)

    const trExcluir = document.getElementById(idTarefa)
    trExcluir.remove()

    modalExcluir.hide()
    mostrarAlerta('success', 'Tarefa excluida com sucesso!')
     
}


function mostrarModalAtualizar(indiceTarefa) {
    console.log(indiceTarefa)
    const todoEditar = listaTarefas[indiceTarefa]

    modalAtualizar.show()
    const tarefaAtualizar = document.getElementById('nova-tarefa')
    const descricaoAtualizar = document.getElementById('nova-descricao')

    tarefaAtualizar.value = todoEditar.tarefa
    descricaoAtualizar.value = todoEditar.descricao

    indiceAtualizacao = indiceTarefa
}

function sairDaConta() {
    salvarT()
    localStorage.removeItem("usuarioLogado")
    window.location.href = './inicio.html'
}


function salvarT() {
    const listaUsers = buscarDadosStorage('usuarios')

    const acharUser = listaUsers.findIndex((valor) => valor.email === usuarioLogado.email)

    listaUsers[acharUser].tarefas = usuarioLogado.tarefas

    salvarDadosStorage('usuarios', listaUsers)

}


function gerarId() {
    return new Date().getTime()
}

function salvarDadosStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor))
}

function buscarDadosStorage(chave) {
    const resultado = localStorage.getItem(chave)
     
    return JSON.parse(resultado) ?? []
}
