const URL = "http://localhost:3000/api/movies"
let moviesArr = []

//refresca la lista de peliculas
function updateList(list) {
    updateVisualList(list);
    addListeners();

}

function addListeners() {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.addEventListener("click", () => {
            const modal = document.getElementById('modal')
            modal.showModal();
            deleteBtn.dataset.id = item.dataset.id;
            modifyBtn.dataset.id = item.dataset.id;

        });
    });
}




//muestra la lista de peliculas 
function updateVisualList(data) {
    console.log(data);
    moviesArr = data
    let poster = '';

    moviesArr.forEach((element) => {
        const { title, director, year, rating, imgURL, id } = element
        poster +=
            `<div class="item" data-id="${id}" data-title="${title}" data-director="${director}" data-year="${year}" data-rating="${rating}" data-imgURL="${imgURL}">
                        <img src="${imgURL}" alt="${title}">
                        <h2>${title}</h2>
                        <small>${director}</small>
                </div>`;
    });

    document.getElementById('container').innerHTML = poster;

}

//funcion que arranca la pagina y refresca la pagina
function startWeb() {
    fetch(URL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',

        }
    })
        .then(responce => responce.json())   //con el resolve de esta promesa consigo el arreglo con los objetos dentro del json
        .then(data => {
            console.log("start")
            updateList(data)
            closeModal()
            //escucha los click y si uno se hace en alguna "pelicula" asigna la id a deletebtn y modifybtn.           
        })
        .catch(err => {
            console.log(err)
        });
}
startWeb();
// cierra el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.close();
}
// cierra el modal cuando presiono cerrar
const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest("dialog");
        closeModal();
    });
});
//cierra el modal y elimina el form si fue creado al hacer click fuera del dialog.
window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll("dialog");
    modals.forEach(function (modal) {
        if (event.target === modal) {
            closeModal();
            removeModifyForm();
        }
    });
});
//espera el click en newMovie para agregar la pelicula nueva
const newMovie = document.getElementById('newMovie');
newMovie.addEventListener('click', async () => {
    let lista = await nuevaPelicula();
    updateList(lista)
    desplegar();
})

//borra una pelicula usando el id con el que viene deleteBtn.dataset.id , y cierra el modal.
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", async () => {
    const itemID = deleteBtn.dataset.id;
    let lista = await deleteMovie(itemID);
    updateList(lista);
    closeModal();
});
//Elimina el form
function removeModifyForm() {
    const form = document.getElementById('modifyForm');
    if (form) {
        let nodoform = form.parentNode;
        nodoform.removeChild(form);
    } return;
}
//crea el formulario con los datos sacados con el index sacado comparando el id con modifybtn.dataset.id
const modal = document.getElementById('modal')
const modifyBtn = document.getElementById('modifyBtn');
modifyBtn.addEventListener('click', () => {
    modal.showModal();
    itemID = modifyBtn.dataset.id;
    console.log(itemID);
    console.log(moviesArr);
    const index = moviesArr.findIndex(movie => movie.id === itemID);
    console.log(index);
    if (index !== -1) {
        const preTitle = moviesArr[index].title
        const preDirector = moviesArr[index].director
        const preYear = moviesArr[index].year
        const preRating = moviesArr[index].rating
        const preImgURL = moviesArr[index].imgURL
        const form = document.createElement('form');
        form.id = ('modifyForm')
        console.log(preDirector)
        console.log(preImgURL)
        console.log(preRating)
        console.log(preTitle)
        console.log(preYear)
        form.innerHTML = `
            <label for="newTitulo">Título:</label>
            <input type="text" id="newTitulo" name="titulo" value="${preTitle}" required><br>

            <label for="newYear">Año:</label>
            <input type="number" id="newYear" name="year" value="${preYear}" required><br>

            <label for="newDirector">Director:</label>
            <input type="text" id="newDirector" name="director" value="${preDirector}" required><br>

            <label for="newRating">Rating:</label>
            <input type="number" id="newRating" name="rating" min="0" max="10" step="0.1" value="${preRating}" required><br>

            <label for="newImgURL">URL de la imagen:</label>
            <input type="url" id="newImgURL" name="imgURL" value="${preImgURL}" required><br>

            <button type="submit">Guardar cambios</button>
            `;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const movieId = modifyBtn.dataset.id
            const title = document.getElementById('newTitulo').value;
            const director = document.getElementById('newDirector').value;
            const year = document.getElementById('newYear').value;
            const rating = document.getElementById('newRating').value;
            const imgURL = document.getElementById('newImgURL').value;
            let lista = await modifyMovie(movieId, title, director, year, rating, imgURL);
            updateList(lista)
            modal.close();
        });
        modal.appendChild(form);
    }
});
//alterna el estado mostrar/show o ocultar/hide.
function desplegar() {
    document.getElementById("nuevaPelicula").classList.toggle("show");
}
