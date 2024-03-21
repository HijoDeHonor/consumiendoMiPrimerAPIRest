const URL = "http://localhost:3000/api/movies"
const movieList = []

//refresca la lista de peliculas
function updateList(list) {
    updateVisualList(list);
    addListeners();
    movieList.length = 0; // Limpia 'movieList' si hay elementos previos
    movieList.push(...list);
    return movieList
}

function addListeners() {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.addEventListener("click", () => {
            const modal = document.getElementById('modal')
            modal.showModal();
            deleteBtn.dataset.Id = item.dataset.id;
            modifyBtn.dataset.Id = item.dataset.id;
        });
    });
}





//muestra la lista de peliculas 
function updateVisualList(data) {
    console.log(data, 'data updateVisuallist');
    let moviesArr = data;
    let poster = '';

    moviesArr.forEach((element) => {
        const { Title, Director, Year, Rating, ImgURL, Id } = element
        poster +=
            `<div class="item" data-id="${Id}" data-title="${Title}" data-director="${Director}" data-year="${Year}" data-rating="${Rating}" data-imgURL="${ImgURL}">
                        <img src="${ImgURL}" alt="${Title}">
                        <h2>${Title}</h2>
                        <small>${Director}</small>
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
    const itemID = deleteBtn.dataset.Id;
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
    itemID = modifyBtn.dataset.Id;
    const index = movieList.findIndex(movie => movie.Id === itemID);
    if (index !== -1) {
        const preTitle = movieList[index].Title
        const preDirector = movieList[index].Director
        const preYear = movieList[index].Year
        const preRating = movieList[index].Rating
        const preImgURL = movieList[index].ImgURL
        const form = document.createElement('form');
        form.id = ('modifyForm')
        form.innerHTML = `
            <label for="newTitulo">Título:</label>
            <input type="text" id="newTitulo" name="titulo" value="${preTitle}" required><br>

            <label for="newDirector">Director:</label>
            <input type="text" id="newDirector" name="director" value="${preDirector}" required><br>

            <label for="newYear">Año:</label>
            <input type="number" id="newYear" name="year" value="${preYear}" required><br> 

            <label for="newRating">Rating:</label>
            <input type="number" id="newRating" name="rating" min="0" max="10" step="0.1" value="${preRating}" required><br>

            <label for="newImgURL">URL de la imagen:</label>
            <input type="url" id="newImgURL" name="imgURL" value="${preImgURL}" required><br>

            <button type="submit">Guardar cambios</button>
            `;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const movieId = modifyBtn.dataset.Id
            const Title = document.getElementById('newTitulo').value;
            const Director = document.getElementById('newDirector').value;
            const Year = document.getElementById('newYear').value;
            const Rating = document.getElementById('newRating').value;
            const ImgURL = document.getElementById('newImgURL').value;
            let lista = await modifyMovie(movieId, Title, Director, Year, Rating, ImgURL);
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
