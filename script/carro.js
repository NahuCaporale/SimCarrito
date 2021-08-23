let carrito = {};

//constante para llamar a el footer del carrito
const templateFooter = document.getElementById("template-footer").content;

//constante para llamar a el header del carrito
const templateCarrito = document.getElementById("template-carrito").content;

//capturo donde se van a mostrar el nombre de los items en el carrito
const items = document.getElementById("items");

//capturo donde se va a poder vaciar el carrito y donde va a decir el total del carrito
const footer = document.getElementById("carrito-footer");

const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carro")) {
    carrito = JSON.parse(localStorage.getItem("carro"));
    pintarCarrito();
  }
});

//funcion para dejar el storage vacio
const actualizarStorage = () => {
  localStorage.setItem("carro", JSON.stringify(carrito));
};

//creo el evento para que se muestren los items en el carrito
cards.addEventListener("click", (e) => {
  addCarrito(e);
});
//evento para boton sumar y disminuir la cantidad de productos en el carrito
items.addEventListener("click", (e) => {
  btnSuma(e);
});

//creo una funcion para imprimir cada propiedad en el carrito
const setCarrito = (objeto) => {
  //console.log(objeto);
  const producto = {
    id: objeto.querySelector(`button`).id,
    title: objeto.querySelector("p.card-marca").textContent,
    precio: objeto.querySelector("p.card-price").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  pintarCarrito();
};

const pintarCarrito = () => {
  removeAllChildNodes(items);
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    //btn
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.append(fragment);

  imprimirFooter();
};

//funcion para que no se agregue otra vez el mismo array
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//funcion para imprimir el footer del carrito, sumar y restarle cantidad y tambien vaciarlo
const imprimirFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
      <th scope="row" colspan="5" style="text-align:center;">Carrito vacío</th>
      `;
    return;
  }
  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  console.log(nPrecio);

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const Vaciar = document.getElementById("vaciar-carrito");

  Vaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    //Actualizo el localstorage vacio
    actualizarStorage();
  
  });
  const comprar = document.getElementById('comprar-carrito')
  comprar.addEventListener('click', () => {
    let confirmar = confirm(`Deseas confirmar tu compra por $${nPrecio}?`)
    if(confirmar === true){
      alert(`Gracias por tu compra en Drip's Land que la disfrutes.`)
      carrito = {};
    pintarCarrito();
    //Actualizo el localstorage vacio
    actualizarStorage();
    }
    
  }
  )
};

//funcion para sumar y restar en el carrito
const btnSuma = (e) => {
  console.log(e.target);
  //aumentar cantidad
  if (e.target.classList.contains("btn-info")) {
    carrito[e.target.dataset.id];
    console.log(carrito[e.target.dataset.id]);
    const product = carrito[e.target.dataset.id];
    product.cantidad++;
    carrito[e.target.dataset.id] = { ...product };
    //Actualizo el storage para asi agregar la cantidad
    actualizarStorage();

    pintarCarrito();
  }
  //disminuir cantidad
  if (e.target.classList.contains("btn-menos")) {
    const product = carrito[e.target.dataset.id];
    product.cantidad--;
    actualizarStorage();
    if (product.cantidad === 0) {
      delete carrito[e.target.dataset.id];
      //Actualizo el storage para que quede vacio
      actualizarStorage();
    }
    pintarCarrito();
  }
  e.stopPropagation;
};
