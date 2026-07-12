// Botão de teste
document.getElementById("botao").addEventListener("click", () => {
    alert("Parabéns!\nSeu JavaScript está funcionando.");
});

// Referências
const updateBanner = document.getElementById("update-banner");
const updateButton = document.getElementById("update-button");

let newWorker;

// Registrar o Service Worker
if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        const registration = await navigator.serviceWorker.register("service-worker.js");

        console.log("Service Worker registrado!");

        // Verifica imediatamente se já existe atualização pendente
        if (registration.waiting) {
            newWorker = registration.waiting;
            updateBanner.classList.remove("hidden");
        }

        // Detecta instalação de um novo Service Worker
        registration.addEventListener("updatefound", () => {

            newWorker = registration.installing;

            newWorker.addEventListener("statechange", () => {

                if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                ) {

                    updateBanner.classList.remove("hidden");

                }

            });

        });

    });

}

// Clique no botão Atualizar
updateButton.addEventListener("click", () => {

    if (newWorker) {

        newWorker.postMessage({
            action: "skipWaiting"
        });

    }

});

navigator.serviceWorker.addEventListener("controllerchange", () => {

    window.location.reload();

});

await registration.update();