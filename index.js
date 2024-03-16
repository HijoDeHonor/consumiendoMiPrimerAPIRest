const URL = "http://localhost:3000/api/movies"
function startWeb(){
fetch(URL, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',

    }
})
    .then(responce => responce.json())   //con el resolve de esta promesa consigo el arreglo con los objetos dentro del json
    .then(data => {
        const moviesArr = data;
        let poster = '';

        moviesArr.forEach((element) => {
            const title = element.title;
            const image = element.imgURL;
            const director = element.director;
            const id = element.id;
            poster +=
                `<div class="item" data-id="${id}">
                        <img src="${image}" alt="${title}">
                        <h2>${title}</h2>
                        <small>${director}</small>
                </div>`;
        });
        document.getElementById('container').innerHTML = poster;

        const items = document.querySelectorAll(".item");

        items.forEach((item, index) => {
            item.addEventListener("click", () => {
                const modal = document.getElementById('modal')
                modal.showModal();
                deleteBtn.dataset.id = item.dataset.id;
                modifyBtn.dataset.id = item.dataset.id;
            });
        });
        //cambios de hoy
        const closeBtns = document.querySelectorAll(".close");
        closeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const modal = btn.closest("dialog");
                modal.close();
            });
        });
        window.addEventListener("click", () => {
            const modals = document.querySelectorAll("dialog");
            modals.forEach(function (modal) {
                if (event.target === modal) {
                    modal.close();
                }
            });
        });
        const deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.addEventListener("click", () => {
            const itemID = deleteBtn.dataset.id;
            deleteMovie(itemID);
        });
        const modal1 = document.getElementById('modal')
        const modifyBtn = document.getElementById('modifyBtn');
        modifyBtn.addEventListener('click', () => {
            modal1.showModal();
            const form = document.createElement('form');
            form.innerHTML = `
                <label for= "titulo"> Título:</label>
                <input type="text" id="newTitulo" name="titulo" required><br>

                <label for="year">Año:</label>
                <input type="number" id="newYear" name="year" required><br>

                <label for="director">Director:</label>
                <input type="text" id="newDirector" name="director" required><br>

                <label for="rating">Rating:</label>
                <input type="number" id="newRating" name="rating" min="0" max="10" step="0.1" required><br>

                <label for="imgURL">URL de la imagen:</label>
                <input type="url" id="newImgURL" name="imgURL" required><br>

                <button type="submit">Guardar cambios</button>
            `;
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const movieId = modifyBtn.dataset.id
                const title = document.getElementById('newTitulo').value;
                const director = document.getElementById('newDirector').value;
                const year = document.getElementById('newYear').value;
                const rating = document.getElementById('newRating').value;
                const imgURL = document.getElementById('newImgURL').value;
                modifyMovie(movieId, title, director, year, rating, imgURL);
                modal1.close();
            });
            modal1.appendChild(form);
        });
    })

        //hasta aca
    .catch(err => {
        console.log(err)
    });
}
function desplegar() {
    document.getElementById("nuevaPelicula").classList.toggle("show");
}
startWeb();