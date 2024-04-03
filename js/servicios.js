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

  /*  const serviciosArray = [
    {
      nombre: "Estética",
      precio: 200,
      descripcion: "Corte de pelo, baño e higiene",
      imagen: "image/estetica.png",
    },
    {
      nombre: "Hospedaje",
      precio: 300,
      descripcion: "Hospedaje para tu mascota",
      imagen: "image/hospedaje.png",
    },
    {
      nombre: "Paseo",
      precio: 150,
      descripcion: "Paseo de 30 minutos",
      imagen: "image/paseo.png",
    },
    {
      nombre: "Guardería del día",
      precio: 400,
      descripcion: "Cuidado de tu mascota durante el día",
      imagen: "image/guarderia.png",
    },
    {
      nombre: "Visita en casa",
      precio: 150,
      descripcion: "Visita a domicilio",
      imagen: "image/casa.png",
    },
    {
      nombre: "Buscar Veterinario",
      precio: 1000,
      descripcion: "Búsqueda de veterinario para tu mascota",
      imagen: "image/veterinario.png",
    },
  ]; */

  // Fetch de los datos desde el archivo JSON
  fetch("js/servicios.json")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Error al cargar los datos");
      }
      return resp.json();
    })
    .then((datosJson) => {
      // Iteración sobre los datos obtenidos del JSON
      datosJson.forEach((servicio) => {
        // Construcción del marcado HTML de la tarjeta del servicio utilizando los datos actuales
        const cardServicio = `
      <div class="col-lg-4 col-md-6 pb-3 pt-3">
        <div class="bg-light border overflow-hidden p-3 rounded-3">
          <img class="image-fit img-fluid w-25" src="${servicio.imagen}" />
          <div class="align-items-center row">
            <div class="col-sm pb-2 pt-2 text-dark text-center">
              <h3 class="nombreServicio h5 mb-1">${servicio.nombre}</h3>
              <p class="shortDesc mb-0 small">${servicio.descripcion}</p>
            </div>
            <div class="col-sm-auto pb-2 pt-2">
              <p class="precios fw-light h4 mb-0">$${servicio.precio}</p>
            </div>
          </div>
          <div class="pb-2 pt-2">
            <button
              class="btn btn-danger btn-servicio btn-sm pe-3 ps-3 rounded-pill"
              type="button"
              style="box-shadow: none"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    `;

        // Agregar la tarjeta del servicio al contenedor de servicios
        cajaServicios.insertAdjacentHTML("beforeend", cardServicio);
      });
    })
    .catch((error) => {
      console.error("Se ha producido el siguiente error: ", error.message);
      // Visualizza il toast di SweetAlert per mostrare un messaggio di errore
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Error al cargar los datos",
      });
    });

  /* buscador de servicios */
  // Seleccionar el elemento de entrada de la barra de búsqueda utilizando el ID
  const inputBusqueda = document.getElementById("buscadorServicios");

  // Seleccionar el elemento de retroalimentación de error
  const errorBusqueda = document.getElementById("errorBusqueda");

  // Agregar un controlador de eventos "input" a la barra de búsqueda
  inputBusqueda.addEventListener("input", () => {
    // Obtener el valor ingresado en la barra de búsqueda y convertirlo a minúsculas
    const busqueda = inputBusqueda.value.trim().toLowerCase();

    // Seleccionar todos los elementos de las tarjetas de servicios
    const tarjetasServicios = document.querySelectorAll(
      ".bg-light.border.overflow-hidden.p-3.rounded-3"
    );

    // Variable para controlar si se encontró un servicio que coincida con la búsqueda
    let servicioEncontrado = false;

    // Iterar sobre cada tarjeta de servicio
    tarjetasServicios.forEach((tarjetaServicio) => {
      // Obtener el nombre del servicio de la tarjeta de servicio actual y convertirlo a minúsculas
      const nombreServicio = tarjetaServicio
        .querySelector(".nombreServicio")
        .textContent.toLowerCase();

      // Obtener la descripción del servicio de la tarjeta de servicio actual y convertirla a minúsculas
      const descripcionServicio = tarjetaServicio
        .querySelector(".shortDesc")
        .textContent.toLowerCase();

      /* Comprobar si el nombre del servicio comienza con la palabra o letra buscada,
     o si la descripción contiene la palabra o letra buscada*/

      if (
        nombreServicio.startsWith(busqueda) ||
        descripcionServicio.includes(busqueda)
      ) {
        tarjetaServicio.style.display = "block"; // Mostrar la tarjeta de servicio
        servicioEncontrado = true; // Indicar que se encontró al menos un servicio
      } else {
        tarjetaServicio.style.display = "none"; // Ocultar la tarjeta de servicio
      }
    });

    // Si se encontró algún servicio que coincida con la búsqueda, quitar la clase de error y agregar la clase de validación
    if (servicioEncontrado) {
      inputBusqueda.classList.remove("is-invalid");
      inputBusqueda.classList.add("is-valid");
      errorBusqueda.textContent = ""; // Borrar el mensaje de error si se encontró al menos un servicio
    } else {
      // Si no se encontró ningún servicio que coincida con la búsqueda, agregar la clase de error y quitar la clase de validación
      inputBusqueda.classList.remove("is-valid");
      inputBusqueda.classList.add("is-invalid");
      errorBusqueda.textContent =
        "No se encontraron servicios que coincidan con la búsqueda.";
    }
  });

  //Seleccion de talla
  // Fetch de los datos desde el archivo JSON
  let tallasYprecios;

  fetch("js/tallasYprecios.json")
    .then((respTalla) => {
      if (!respTalla.ok) {
        throw new Error("Error al cargar los datos de tallas y precios");
      }
      return respTalla.json();
    })
    .then((data) => {
      tallasYprecios = data;
      // Seleccionar el contenedor de los botones de opción
      const tipoMascotaContainer = document.getElementById("tipoMascota");

      // Iterar sobre los datos JSON para crear los botones de opción
      data.forEach((item) => {
        // Crear el input para el radio button
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.classList.add("btn-check");
        radioInput.name = "btnradio";
        radioInput.id = item.talla;
        radioInput.autocomplete = "off";

        // Crear la etiqueta para el radio button
        const label = document.createElement("label");
        label.classList.add("btn", "text-black", "btn-outline-warning");
        label.htmlFor = item.talla;
        label.textContent = item.talla;

        // Si hay un precio, añadirlo a la etiqueta
        if (item.precio) {
          label.innerHTML += `<br>+${item.precio}$`;
        }

        // Crear el div contenedor y añadir los radio button y las etiquetas
        const radioDiv = document.createElement("div");
        radioDiv.classList.add("btn-group", "w-100");
        radioDiv.appendChild(radioInput);
        radioDiv.appendChild(label);

        // Añadir el div contenedor al contenedor principal
        tipoMascotaContainer.appendChild(radioDiv);
      });
    })
    .catch((error) => {
      console.error("Se ha producido el siguiente error: ", error.message);
      // Visualizza il toast di SweetAlert per mostrare un messaggio di errore
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Error al cargar los datos",
      });
    });

  // Seleccion de los dias
  // Obtener los elementos de entrada de fecha
  const inputInicio = document.getElementById("inicioServicios");
  const inputFin = document.getElementById("finServicios");

  // Obtener la fecha actual
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  let mes = fechaActual.getMonth() + 1;
  let dia = fechaActual.getDate();

  // Agregar ceros principales si es necesario
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }

  // Formato de fecha para el valor mínimo y el valor inicial
  const fechaActualFormato = año + "-" + mes + "-" + dia;

  // Establecer la fecha mínima para el input de inicio como la fecha actual
  inputInicio.min = fechaActualFormato;

  // Agregar un evento de escucha para el cambio en el input de inicio
  inputInicio.addEventListener("change", function () {
    // Obtener la fecha seleccionada en el input de inicio
    const fechaInicioSeleccionada = inputInicio.value;

    // Si la fecha seleccionada es anterior a la fecha actual, establecerla como la fecha actual
    if (fechaInicioSeleccionada < fechaActualFormato) {
      inputInicio.value = fechaActualFormato;
    }

    // Establecer la fecha mínima para el input de fin como la fecha seleccionada en el input de inicio
    inputFin.min = fechaInicioSeleccionada;

    // Obtener la fecha límite permitida para el input de fin (6 meses a partir de la fecha de inicio)
    const fechaLimiteFin = new Date(fechaInicioSeleccionada);
    fechaLimiteFin.setMonth(fechaLimiteFin.getMonth() + 6);

    // Verificar si la fecha actual es después de la fecha límite permitida para el input de fin
    if (fechaActual > fechaLimiteFin) {
      // Establecer la fecha máxima permitida para el input de fin como la fecha actual
      inputFin.max = fechaActualFormato;
    } else {
      // Establecer la fecha máxima permitida para el input de fin como la fecha límite
      inputFin.max = fechaLimiteFin.toISOString().split("T")[0];
    }
  });

  // Agregar un evento de escucha para el cambio en el input de fin
  inputFin.addEventListener("change", function () {
    // Obtener la fecha seleccionada en el input de fin
    const fechaFinSeleccionada = new Date(inputFin.value);

    // Obtener la fecha límite permitida para el input de fin (6 meses a partir de la fecha de inicio)
    const fechaInicioSeleccionada = new Date(inputInicio.value);
    const fechaLimiteFin = new Date(fechaInicioSeleccionada);
    fechaLimiteFin.setMonth(fechaLimiteFin.getMonth() + 6);

    // Verificar si la fecha seleccionada en el input de fin excede la fecha límite permitida
    if (fechaFinSeleccionada > fechaLimiteFin) {
      // Restablecer el valor del input de fin
      inputFin.value = "";
      // Mostrar un mensaje de error
      document.getElementById("errorFecha").innerText =
        "La fecha de fin no puede exceder los 6 meses a partir de la fecha de inicio.";
    } else {
      // Limpiar el mensaje de error si la fecha seleccionada es válida
      document.getElementById("errorFecha").innerText = "";
    }
  });

  // Inicializar el carrito
  let carrito = [];

  // LocalStorage del carrito
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
  const carritoJSON2 = JSON.parse(localStorage.getItem("carrito"));

  // Escuchar el clic en el botón "Vaciar carrito"
  const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  btnVaciarCarrito.addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
  });

  // Escuchar el clic en los botones de servicio
  document.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-servicio")) {
      const tarjetaServicio = evento.target.closest(
        ".bg-light.border.overflow-hidden.p-3.rounded-3"
      );
      const nombreServicio =
        tarjetaServicio.querySelector(".nombreServicio").textContent;
      const descripcionServicio =
        tarjetaServicio.querySelector(".shortDesc").textContent;
      const precioServicio = parseFloat(
        tarjetaServicio.querySelector(".precios").textContent.replace("$", "")
      );

      // Verificar si se ha seleccionado la talla
      const tallaSeleccionada = document.querySelector(
        '#tipoMascota input[name="btnradio"]:checked'
      );
      if (!tallaSeleccionada) {
        // Mostrar el toast de SweetAlert para la falta de selección de talla
        mostrarToast("Debes seleccionar una talla", "error");
        return; // Detener la ejecución de la función en caso de error
      }

      // Obtener las fechas seleccionadas
      const fechaInicio = document.getElementById("inicioServicios").value;
      const fechaFin = document.getElementById("finServicios").value;

      // Verificar si se han seleccionado las fechas de inicio y fin
      if (!fechaInicio || !fechaFin) {
        // Mostrar el toast de SweetAlert para la falta de selección de fechas
        mostrarToast(
          "Debes seleccionar la fecha de inicio y la fecha de fin",
          "error"
        );
        return; // Detener la ejecución de la función en caso de error
      }

      // Calcular el número de días seleccionados
      const numDias = Math.ceil(
        (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)
      );

      // Calcular el precio total del servicio considerando el precio de la talla y el número de días seleccionados
      let tallaPrecio = 0; // Precio por la talla, predeterminado a cero si no se especifica
      if (tallaSeleccionada) {
        const tallaId = tallaSeleccionada.id; // ID de la talla seleccionada
        // Encontrar el precio correspondiente en el JSON
        const precioTalla = tallasYprecios.find((t) => t.talla === tallaId);
        if (precioTalla && precioTalla.precio !== "") {
          tallaPrecio = parseFloat(precioTalla.precio);
        }
      }
      const precioTotal = precioServicio * numDias + tallaPrecio;

      // Construir el objeto servicio con toda la información
      const servicio = {
        nombre: nombreServicio,
        descripcion: descripcionServicio,
        precio: precioTotal.toFixed(2),
        talla: tallaSeleccionada ? tallaSeleccionada.id : "No especificada",
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      };
      carrito.push(servicio);
      actualizarCarrito();
    }
  });

  // Función para mostrar el toast de SweetAlert
  function mostrarToast(mensaje, tipo) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: tipo,
      title: mensaje,
    });
  }

  // Función para eliminar un servicio del carrito
  function eliminarServicio(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  // Función para guardar el carrito en localStorage
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Actualizar el carrito
  function actualizarCarrito() {
    const elementoCarrito = document.getElementById("carrito");
    elementoCarrito.innerHTML = "";

    carrito.forEach(function (servicio, index) {
      const servicioHTML = `
      <li class="mt-3">
          ${servicio.nombre} - Precio: $${servicio.precio} - Talla: ${servicio.talla} - Inicio: ${servicio.fechaInicio} - Fin: ${servicio.fechaFin} 
          <button
              class="btn btn-danger mx-3 btn-sm pe-3 ps-3 rounded-pill eliminar-servicio"
              type="button"
              style="box-shadow: none"
              data-index="${index}">Eliminar
          </button>
      </li>`;
      elementoCarrito.insertAdjacentHTML("beforeend", servicioHTML);
    });

    // Agregar evento para eliminar un servicio
    elementoCarrito
      .querySelectorAll(".eliminar-servicio")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          const index = parseInt(button.getAttribute("data-index"));
          eliminarServicio(index);
        });
      });

    // Calcular el total del carrito
    const totalCarrito = carrito.reduce((total, servicio) => {
      const precioSinSimbolo = parseFloat(servicio.precio.replace("$", ""));
      return total + precioSinSimbolo;
    }, 0);

    document.getElementById(
      "totalCarrito"
    ).textContent = `Total: $ ${totalCarrito.toFixed(2)}`;

    // Guardar el carrito actualizado en localStorage
    guardarCarritoEnLocalStorage();
  }

  // Función para guardar el carrito en localStorage antes de cerrar la ventana
  window.addEventListener("beforeunload", guardarCarritoEnLocalStorage);

  // Llamar a la función para inicializar y actualizar el carrito al cargar la página
  actualizarCarrito();

  // Agregar evento click al botón "Finalizar Compra"
  const btnFinalizarCarrito = document.getElementById("btnFinalizarCarrito");
  btnFinalizarCarrito.addEventListener("click", function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "w-100 btn btn-success",
        cancelButton: "w-100 btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Quieres finalizar tu compra?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          carrito = [];
          actualizarCarrito();
          swalWithBootstrapButtons.fire(
            "¡Compra finalizada!",
            "Tu carrito ha sido vaciado.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "¡Ok, esperamos!",
            "Tu carrito está seguro :)",
            "error"
          );
        }
      });
  });
  // Función para guardar el carrito en localStorage antes de cerrar la ventana
  window.addEventListener("beforeunload", guardarCarritoEnLocalStorage);
});
