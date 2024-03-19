document.addEventListener("DOMContentLoaded", function () {
  // Ottenere il riferimento all'elemento dove vuoi visualizzare il nome del cliente
  const nombreClienteElement = document.getElementById("nombreCliente");

  // Ottenere il nome del cliente dal localStorage
  const clienteRegistrato = JSON.parse(
    localStorage.getItem("clienteRegistrato")
  );
  const nombreCliente = clienteRegistrato ? clienteRegistrato.email : "Cliente";

  // Aggiungere il nome del cliente all'elemento HTML
  if (nombreClienteElement) {
    nombreClienteElement.textContent = "Hola, " + nombreCliente;
  }

  /* -------------------------------------------carrito---------------------------------------------------- */

  // Dato il seguente array di oggetti Servicios
  const serviciosArray = [
    { nombre: "Estética", precio: 200 },
    { nombre: "Hospedaje", precio: 300 },
    { nombre: "Paseo", precio: 150 },
    { nombre: "Guardería del día", precio: 400 },
    { nombre: "Visita en casa", precio: 150 },
    { nombre: "Buscar Veterinario", precio: 1000 },
  ];

  // Seleziona tutti gli elementi HTML con classe "nombreServicio" e "precios"
  const nombreServicios = document.querySelectorAll(".nombreServicio");
  const precios = document.querySelectorAll(".precios");

  // Itera su ciascun elemento e aggiorna il testo con i dati dei servizi corrispondenti
  for (let i = 0; i < serviciosArray.length; i++) {
    nombreServicios[i].innerText = serviciosArray[i].nombre;
    precios[i].innerText = `$${serviciosArray[i].precio}`;
  }

  // Inicializa el array del carrito leyendo los datos de localStorage si están presentes
  let carritoServicios = localStorage.getItem("carritoServicios");
  carritoServicios = carritoServicios ? JSON.parse(carritoServicios) : [];

  // Selecciona el elemento del carrito
  const carritoElement = document.getElementById("carrito");

  // Función para actualizar el contenido del carrito y guardar los datos en localStorage
  function actualizarCarrito() {
    // Reinicia el contenido del carrito
    carritoElement.innerHTML = "";

    // Crea una lista no ordenada para mostrar los servicios en el carrito
    const listaCarrito = document.createElement("ul");

    // Agrega cada servicio en el carrito a la lista
    carritoServicios.forEach((servicio) => {
      const servicioElement = document.createElement("li");
      servicioElement.textContent = servicio;
      listaCarrito.appendChild(servicioElement);
    });

    // Agrega la lista al div del carrito
    carritoElement.appendChild(listaCarrito);

    // Calcula y actualiza el total del carrito
    const totalCarritoElement = document.getElementById("totalCarrito");
    const totalCarrito = carritoServicios.reduce((total, servicio) => {
      // Utilizza un'espressione regolare per estrarre il valore del prezzo
      const regex = /\$(\d+(\.\d+)?)/;
      const matches = servicio.match(regex);
      if (matches && matches.length > 1) {
        // Se trova il prezzo, lo converte in un numero e lo aggiunge al totale
        const precio = parseFloat(matches[1]);
        return total + precio;
      } else {
        // Se non trova il prezzo, ritorna il totale senza aggiungere nulla
        return total;
      }
    }, 0);
    totalCarritoElement.textContent = `Total de los servicios: $ ${totalCarrito.toFixed(
      2
    )}`;

    // Guarda los datos del carrito en localStorage
    localStorage.setItem("carritoServicios", JSON.stringify(carritoServicios));
  }

  // Agrega un manejador de eventos a cada botón de servicio
  const serviciosButtons = document.querySelectorAll(".btn-servicio");
  serviciosButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const servicio = `${serviciosArray[index].nombre}: $${serviciosArray[index].precio}`;
      carritoServicios.push(servicio); // Agrega el servicio seleccionado al array del carrito
      actualizarCarrito(); // Actualiza el carrito y guarda los datos en localStorage
    });
  });

  // Aggiunge un gestore di eventi a ogni radio button di tipo mascota
  const radioButtons = document.querySelectorAll('input[name="btnradio"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", function () {
      const mascotaSeleccionada = document.querySelector(
        'input[name="btnradio"]:checked'
      ).id;
      // Aggiunge la descrizione della mascota al carrello
      carritoServicios.push(`Tamaño mascota: ${mascotaSeleccionada}`);
      actualizarCarrito();
    });
  });

  // Aggiunge un gestore di eventi a ogni pulsante di servizio

  serviciosButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const servicio = `${serviciosArray[index].nombre}: $${serviciosArray[index].precio}`;
      // Concatena la descrizione del servizio con la taglia della mascota
      const mascotaSeleccionada = document.querySelector(
        'input[name="btnradio"]:checked'
      );
      if (mascotaSeleccionada) {
        const tallaMascota = mascotaSeleccionada.id;
        carritoServicios.push(`${servicio}, Tamaño mascota: ${tallaMascota}`);
      } else {
        carritoServicios.push(servicio);
      }
      // Aggiorna il carrello e salva i dati in localStorage
    });
  });

  // Actualiza el carrito al inicio para cargar los datos de localStorage
  actualizarCarrito();
});
