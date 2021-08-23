        //VARIABLES
//linkeo datos.json que contiene mi array de objetos
const urlJSON = "./script/datos.json";

//Selecciono donde voy a imprimir las cards
const cards = document.getElementById("cards");

//Creo el carrito vacio donde se van a empujar los items
let carrito = {};

const fragment = document.createDocumentFragment();

//creo el evento para que se muestren los items en el carrito
cards.addEventListener("click", (e) => {
  //Tomo el storage para ver si esta vacio o tiene algun producto
  carrito = JSON.parse(localStorage.getItem("carro"));

  addCarrito(e);
});

        //FUNCIONES
//parseo el json y hago un for of para imprimir las tarjetas
$.getJSON(urlJSON, function Tarjetas(respuesta, estado) {
  if (estado === "success") {
    let misdatos = respuesta;
    for (const dato of misdatos) {
      cards.innerHTML += `
            <div class="col-lg-3 mb-3 col-md-6">
            <div id="prenda" class="card">
            <img src= ${dato.img} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title"> ${dato.modelo} </h5>
                <p class="card-text card-marca">${dato.cat}</p>
                <p class="card-text"> ${dato.color}</p>
                <p class="card-text card-price">${dato.price}</p>
                <button href="#" id="${dato.id}" class="btn btn-dark add-cart" style="background-color:black; border-color:#171C3D">Agregar al carrito
                </div>
        </div>`;
    }
    estiloCards();
    console.log(misdatos);
  }
});

//funcion para darle estilo a las cards
function estiloCards() {
  let cards = document.getElementsByClassName("card");
  for (const card of cards) {
    card.setAttribute(
      `style`,
      `width: 19.5rem; text-align: center; background-color: black; color: white; margin: 4.8rem`
    );
  }
}

//Creo una constante que utilizar el event listener anterior creado para ver si lo que presiono es true
const addCarrito = (e) => {
  //console.log(e.target);
  //console.log(e.target.classList.contains('btn-dark'));

  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

//creo una funcion para imprimir cada propiedad en el carrito
const setCarrito = (objeto) => {
  //console.log(objeto);
  const producto = {
    id: objeto.querySelector(`button`).id,
    title: objeto.querySelector("h5.card-title").textContent,
    precio: objeto.querySelector("p.card-price").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };

  //seteo el localstorage con los items en el carrito
  localStorage.setItem("carro", JSON.stringify(carrito));
};

        ////USO DE JQUERY   btn para scrollear arriba
scrollTopButton(".scroll-top-btn");

//funcion para scrollear arriba
function scrollTopButton(btn) {
  const $ScrollBtn = $(btn);

  $(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    console.log(scrollTop);
    scrollTop >= 200
      ? $ScrollBtn.removeClass("hidden")
      : $ScrollBtn.addClass("hidden");
  });

  $ScrollBtn.click(function () {
    window.scrollTo({
      behaviour: "smooth",
      top: 0,
    });
  });
}
