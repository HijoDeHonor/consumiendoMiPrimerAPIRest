function nuevaPelicula() {
    let title = document.getElementById("title");
    let director = document.getElementById("director");
    let year = document.getElementById("year");
    let rating = document.getElementById("rating");
    let imgURL = document.getElementById("imgURL");
    let newMovie = {
        title: title,
        director: director,
        year: year,
        rating: rating,
        imgURL: imgURL
    };
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json.stringify(nuevaPelicula)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error: algo salio mal');
            }
            return res.json();
        })
        .then(data => {
            console.log('Nueva pelicula agregada', data);
        })
        .catch(err => {
            console.log(err)
        })
}