const carrito = []
const obras = [{ imagen: "obras/1.jpg", codigo: 1, artista: "David Hocken", obra: "Man in Shower in Beverly Hills", año: 1964, tecnica: "Oleo sobre lienzo", precio: 50000000 },
{ imagen: "obras/2.jpg", codigo: 2, artista: "Keith Haring", obra: "Lucky Strike", año: 1987, tecnica: "Oleo sobre lienzo", precio: 70000000 },
{ imagen: "obras/3.jpg", codigo: 3, artista: "Andy Warhol", obra: "Queen Elizabeth II", año: 1985, tecnica: "Collage", precio: 50600000 },
{ imagen: "obras/4.jpg", codigo: 4, artista: "Francis Bacon", obra: "Nimes Féria 92", año: 1992, tecnica: "Poster", precio: 32000000 },
{ imagen: "obras/5.jpg", codigo: 5, artista: "Josef Albers", obra: "Hommage au Carré", año: 1965, tecnica: "Oleo sobre lienzo", precio: 74000000 },
{ imagen: "obras/6.jpg", codigo: 6, artista: "Invader", obra: "Led", año: 2007, tecnica: "Led", precio: 65000000 },
{ imagen: "obras/7.jpg", codigo: 7, artista: "Alexander Calder", obra: "Sin titulo", año: 1967, tecnica: "Oleo sobre lienzo", precio: 34100000 },
{ imagen: "obras/8.jpg", codigo: 8, artista: "James Rosenquist", obra: "While the Earth Revolves...", año: 1968, tecnica: "Oleo sobre lienzo", precio: 86500000 },
{ imagen: "obras/9.jpg", codigo: 9, artista: "Keith Haring", obra: "Radiant Baby", año: 1987, tecnica: "Oleo sobre lienzo", precio: 5400000 },
{ imagen: "obras/10.jpg", codigo: 10, artista: "Andy Warhol", obra: "Banana", año: 1965, tecnica: "Oleo sobre lienzo", precio: 300000000 }
]

function retornoCardHtml(producto) {
    return `
    <div class="max-w-xs rounded-lg outline outline-offset-0 m-5 ">
    <p class="bg-white p-2 border-b-2 border-black font-mono text-s text-center">Obra: ${producto.obra}</p>
    <div class="bg-orange-100 text-center p-5">
        
        <img class="border border-black border-2 mx-auto" src= ${producto.imagen}
            alt="${producto.obra}">
            <div class="font-bold text-2xl text-orange-500 pt-2 font-mono">
            ${producto.artista}
        </div>
        <div class="px-6 py-2 bg">
         <p class="text-gray-700 boldfont-mono text-2xl mb-2">
                Código: ${producto.codigo}
            </p>
            <p class="text-gray-700 text-m">Año: ${producto.año}</p>
            <p class="text-gray-700 mb-2 text-m">
                Tecnica: ${producto.tecnica}
            </p>
            <p class="text-gray-700 text-2xl font-bold">
            $ ${producto.precio}
            </p>
        </div>
        
    </div>
</div>
            `
}

const container = document.getElementById("productos-container");

function cargarProductos() {
  container.innerHTML = "";
  obras.forEach((producto) => {
    container.innerHTML += retornoCardHtml(producto);
  });
}

cargarProductos();

class Compra {
    constructor(carrito) {
      this.carrito = carrito;
    }
  
    obtenerSubtotal() {
      let subtotal = 0;
      this.carrito.forEach((obra) => {
        subtotal += obra.precio;
      });
      return subtotal;
    }
  }
  
function buscarObras(codigo) {
  let resultado = obras.find((obra) => obra.codigo === parseInt(codigo));
  return resultado;
}

function finalizarCompra() {
    const shopping = new Compra(carrito);
    Swal.fire({
      title: "¡Compra finalizada!",
      text: "El costo total de tu compra es $" + shopping.obtenerSubtotal() + ". Muchas gracias por tu compra!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#FFA500",

    });
  }
  
  function comprar() {
    Swal.fire({
      title: "Ingresar código",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un código";
        }
      },
      confirmButtonColor: "#FFA500",
      
    }).then((result) => {
      if (result.isConfirmed) {
        let codigo = result.value;
        let obraElegida = buscarObras(codigo);
        if (obraElegida !== undefined) {
          carrito.push(obraElegida);
          Swal.fire({
            title: "✅ Obra agregada",
            text: obraElegida.obra + " se agregó al carrito.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#FFA500",
            
          }).then((response) => {
            if (response.isConfirmed) {
              Swal.fire({
                title: "¿Deseas otra obra?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí",
                confirmButtonColor: "#FFA500",
                cancelButtonText: "No",
                
              }).then((response) => {
                if (response.isConfirmed) {
                  comprar();
                } else {
                  finalizarCompra();
                }
              });
            }
          });
        } else {
          Swal.fire({
            title: "⛔️ Error en el código",
            text: "Error en el código ingresado. Refresca para comenzar de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#FFA500",
          });
        }
      }
    });
  }
  
  document.getElementById("btn-comprar").addEventListener("click", comprar);
  