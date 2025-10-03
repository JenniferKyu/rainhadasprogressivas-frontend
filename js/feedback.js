function enviarComentario() {

    var nome = document.getElementById("nome").value;
    var comentario = document.getElementById("comentario").value;
    var estrelas = getEstrelasSelecionadas();

    if (!nome || !comentario || !estrelas) {
        alert("Por favor, preencha seu nome, comentário e selecione uma nota.");
        return;
    }

    if (estrelas == "" || estrelas == null || isNaN(estrelas)){
        alert("Por favor selecione uma nota válida.");
        return;
    }

    if (nome == "" || nome == null || !isNaN(nome)){
        alert("Nome inválido.");
        return;
    }

    if (comentario == "" || comentario == null || !isNaN(comentario)){
        alert("Comentário inválido.");
        return;
    }

    fetch("https://rainhadasprogressivas.onrender.com/avaliacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, comentario, estrelas })
    })

    .then(msg => {
        alert("Avaliação enviada com sucesso!");

        window.location.reload();

        // Limpa os campos após o envio
        document.getElementById("nome").value = "";
        document.getElementById("comentario").value = "";
        const radios = document.querySelectorAll('input[name="radio-examples"]');
        radios.forEach(r => r.checked = false);
    })

    .catch(error => {
        alert("Erro ao enviar avaliação.");
        console.error(error);
    });
}

function getEstrelasSelecionadas() {
    const selecionado = document.querySelector('input[name="radio-examples"]:checked');
    if (selecionado) {
        return selecionado.value; // Retorna o número de estrelas
    }
    return null; // Nenhuma estrela selecionada
}

async function carregarAvaliacoes(){

    const lista = document.getElementById("lista");
    const response = await fetch("https://rainhadasprogressivas.onrender.com/avaliacoes");
    const feedbacks = await response.json();

    feedbacks.forEach(feedback => {
        const div = document.createElement("div");
        div.classList.add("cartao");
        div.innerHTML = `
            <li class="emotion">
                <h6>${feedback.nome}</h6>
                <p>${feedback.comentario}</p>
                <p>${'⭐'.repeat(feedback.estrelas)}</p>
            </li>
        `;
        lista.appendChild(div);
    });
}

carregarAvaliacoes()