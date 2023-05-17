import BooksServices from "./BooksServices.js";

const cont = document.querySelector('.contenedor')
const subirBtn = document.querySelector('#submit-btn')
const buscador=document.querySelector('#buscar')
const botonActualizar = document.querySelector('#btn-insert')
const botonCancelar = document.querySelector('#btn-cancel')
const form=document.querySelector('#formulario')

let bookSeleccionado=null // se neccesita para modificar 
let datosBooks=[];

const obtenerDatos = () =>{         // añade la informacion que tenemos en la base de datos
    BooksServices.getBooksList().then(datos=>{datosBooks=datos
        pintarContenedor(datosBooks);
        console.log(datosBooks);
  })}

const pintarContenedor = (datosInfo)=>{         // pintar el html
    cont.innerHTML=""
    datosInfo.forEach(dat => {
        cont.innerHTML+=
        `
        <article>
            <td>${dat.ISBN}</td>
            <td>${dat.title}</td>
            <td>${dat.year}</td>
            <td>${dat.description}</td>
        </article>

        `
    });
    const botonEliminar = document.querySelectorAll('.btn-delete'); // no tocar
    botonEliminar.forEach(button => {
    button.addEventListener("click", function (e) {
        const idArticle = e.target.id.split("-")[2];
        deleteBook(idArticle);
        })
    });

    const botonEditar = document.querySelectorAll('.btn-edit') // no tocar
    botonEditar.forEach(button =>{ 
    button.addEventListener('click' , function(e){
            const idBook = e.target.id.split("-")[2]
            editBook(idBook);
            console.log(idBook);
        })
    })
}

const deleteBook = (id) => {  // no tocar
    BooksServices.delete(id).then(data=>{
        obtenerDatos(); 
    });
}

const editBook = (id) => { // pfunion para mostrar
    BooksServices.getBookById(id).then(data =>{  // para coger la informacion del id
        // console.log(data);
        bookSeleccionado=data; // para poder comprobar datos
        document.querySelector('#input1').value=data.ISBN
        document.querySelector('#input2').value=data.title
        document.querySelector('#input3').value=data.year
        document.querySelector('#input4').value=data.description
    })

    botonActualizar.classList.replace("d-nover","d-ver"); // no tocar
    subirBtn.classList.replace("d-ver", "d-nover"); // no tocar
    botonCancelar.classList.replace("d-nover", "d-ver");    // no tocar
}


const actualizarBook = () => { // Esto equivale a PUT par modificr el contenido de la base de datos
    const id = bookSeleccionado.id // no tocar
    const ISBN = document.querySelector('#input1').value // editar por los parametros que tengamos ennuestra base de datos
    const title = document.querySelector('#input2').value
    const year = document.querySelector('#input3').value
    const description = document.querySelector('#input4').value
    const book = { id , ISBN, title, year, description};

    BooksServices.update(book).then((data) => {
        obtenerDatos()
        form.reset();
        botonActualizar.classList.replace("d-ver", "d-nover");
        subirBtn.classList.replace("d-nover", "d-ver");
        botonCancelar.classList.replace("d-ver", "d-nover");
    });

}

const nuevoBook=()=>{  // para añadir un nuev lemento  a la base de datos equivale a POST
    const ISBN = document.querySelector('#input1').value
    const title = document.querySelector('#input2').value
    const year = document.querySelector('#input3').value
    const description = document.querySelector('#input4').value
    const book = {ISBN, title, year, description };
    BooksServices.insert(book).then(data => {
        form.reset();
    })

}


const buscarBook = (title) => { // no tocar
    BooksServices.searchBooksByName(title).then(books=>{
        pintarContenedor(books)
        // console.log(books);
    })   
}

function init(){ // no tocar
    obtenerDatos()
    subirBtn.addEventListener('click',nuevoBook)
    
    buscador.addEventListener('keyup' , ()=>{
        let searchName = buscador.value;
        // console.log(searchName)
        if(searchName.length>=3){
            buscarBook(searchName);
        }else if (searchName.length<=2){
            pintarContenedor(datosBooks)
        }
    })

    botonCancelar.addEventListener("click", function (e) { // hacemos cambio al hacaer click en el boton cancelar
        bookSeleccionado = null;
        botonCancelar.classList.replace("d-ver", "d-nover");
        botonActualizar.classList.replace("d-ver", "d-nover");
        subirBtn.classList.replace("d-nover", "d-ver");
        form.reset();
    });

    botonActualizar.addEventListener('click', actualizarBook)

  }
init()