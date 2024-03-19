// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
    // Verificare se esistono clienti registrati nello storage locale
    let clientesRegistrados = JSON.parse(localStorage.getItem("clientesRegistrados")) || [];

    // Array di clienti registrati con un utente di prova
    const clienteDiProva = { email: "usuario@example.com", password: "contraseña123" };

    // Verificare se il cliente di prova è già presente nell'array
    const clienteExistente = clientesRegistrados.find(cliente => cliente.email === clienteDiProva.email);

    // Aggiungere il cliente di prova all'array se non esiste
    if (!clienteExistente) {
        clientesRegistrados.push(clienteDiProva);
    }

    // Ottenere i riferimenti agli elementi del DOM
    const formNuevoCliente = document.getElementById("formNuevoCliente");
    const correoInput = document.getElementById("validCorreoNuevoCliente");
    const passwordInput = document.getElementById("ValidPwdNuevoCliente");
    const paisInput = document.getElementById("validPais");
    const condicionesInput = document.getElementById("invalidNuevoCliente");
    const errorMailNuevoCliente = document.getElementById("errorMailNuevoCliente");
    const errorPwdNuevoCliente = document.getElementById("errorPwdNuevoCliente");
    const errorPais = document.getElementById("errorPais");
    const dropdown = document.getElementById("dropdown2");

    // Aggiungere un event listener per inviare il modulo del nuovo cliente
    formNuevoCliente.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitare il comportamento predefinito di invio del modulo

        // Validare l'email, la password, il paese e le condizioni
        const correoValido = validarCampo(correoInput, errorMailNuevoCliente, "Inserisci un indirizzo email valido.");
        const passwordValido = validarCampo(passwordInput, errorPwdNuevoCliente, "Inserisci una password valida.");
        const paisValido = validarCampo(paisInput, errorPais, "Seleziona un paese.");
        const condicionesAceptadas = condicionesInput.checked;

        // Verificare se tutti i campi sono validi
        if (correoValido && passwordValido && paisValido && condicionesAceptadas) {
            // Ottenere i dati dal modulo
            const correoNuevoCliente = correoInput.value;
            const passwordNuevoCliente = passwordInput.value;
            const paisNuevoCliente = paisInput.value;

            // Aggiungere il nuovo cliente all'array di clienti registrati
            clientesRegistrados.push({ email: correoNuevoCliente, password: passwordNuevoCliente, pais: paisNuevoCliente });

            // Salvare l'array di clienti registrati aggiornato nello storage locale
            localStorage.setItem("clientesRegistrados", JSON.stringify(clientesRegistrados));

            // Mostrare un messaggio di successo
            alert("Nuovo cliente registrato con successo!");

            // Pulire il modulo
            formNuevoCliente.reset();
        }
    });

    // Funzione per validare un campo e mostrare un messaggio di errore
    function validarCampo(input, errorElement, mensajeError) {
        if (!input.validity.valid) {
            input.classList.add("is-invalid");
            errorElement.textContent = mensajeError;
            return false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            errorElement.textContent = "";
            return true;
        }
    }

    // Aggiungere un listener di eventi per aprire il menu del dropdown
    dropdown.addEventListener("show.bs.dropdown", function () {
        // Rimuovere il listener di eventi per inviare il modulo quando il menu del dropdown viene aperto
        formNuevoCliente.removeEventListener("submit", function () {});
    });

    // Aggiungere un listener di eventi per chiudere il menu del dropdown
    dropdown.addEventListener("hidden.bs.dropdown", function () {
        // Aggiungere nuovamente il listener di eventi per inviare il modulo quando il menu del dropdown viene chiuso
        formNuevoCliente.addEventListener("submit", function (event) {
            event.preventDefault(); // Evitare il comportamento predefinito di invio del modulo
            // La logica di validazione e invio del modulo è stata mantenuta qui
        });
    });
});

  