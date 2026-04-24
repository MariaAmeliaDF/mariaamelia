document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-opiniao");
    const textarea = document.querySelector("textarea");
    const button = document.querySelector("button");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const mensagem = textarea.value.trim();

        if(mensagem === ""){
            alert("Escreva sua opinião primeiro 💚");
            return;
        }

        button.innerText = "Enviando...";
        button.disabled = true;

        setTimeout(() => {

            alert("Mensagem enviada com sucesso 💚");

            textarea.value = "";
            button.innerText = "Enviar";
            button.disabled = false;

        }, 1200);
    });

    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.04)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
    });

});
