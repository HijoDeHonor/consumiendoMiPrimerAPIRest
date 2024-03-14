const URL = "http://localhost:3000/api/movies"

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

            poster +=
                `
                <div>
                    <img src="${image}">
                    <h2>${title}</h2>
                    <small>${director}</small>
                </div>`;

        });
        document.getElementById('container').innerHTML = poster;
    })

    .catch(err => {
        console.log(err)
    });

function desplegar() {
    document.getElementById("nuevaPelicula").classList.toggle("show");
}



document.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbutton')) {
        var droptiene = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < droptiene.length; i++) {
            var opendroptiene = droptiene[i];
            if (opendroptiene.classList.contains('show')) {
                opendroptiene.classList.remove('show');
            }
        }
    }
});
