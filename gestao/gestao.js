async function carregarAvaliacoes() {
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
            </li>
            <a href="#" onclick="excluirAvaliacao(${feedback.id})"> <img class="excluir" src="../imagens/excluir.png" alt=""> </a>
        `;
        lista.appendChild(div);
    });
}

carregarAvaliacoes()

function excluirAvaliacao(id) {

    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    

    fetch(`https://rainhadasprogressivas.onrender.com/avaliacoes/${id}`, {
        method: "DELETE"
    })

        .then(response => {
            if (response.ok) {
                alert("Avaliação excluída com sucesso!");
                window.location.reload();

            } else {
                alert("Erro ao excluir avaliação.");
            }
        })

        .catch(error => {
            console.error("Erro:", error);
        });

}