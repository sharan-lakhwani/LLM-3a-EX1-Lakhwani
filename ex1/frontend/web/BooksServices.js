
export default class BooksServices {
    
    static URL_API='http://localhost:8800/api/books/';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    static getBooksList() {                 // para añadir los elementos a la pagina
        return fetch(this.URL_API)
            .then(res => res.json())
            .catch(error => error);
    }

    static searchBooksByName(nombre) {      // para buscar por el nombre
        return fetch(`${this.URL_API}search/${nombre}`)
            .then(res => res.json())
            .catch(error => error);
    }

    static getBookById(id) {                // para que nos de la referencia de objeto por la id
        return fetch(`${this.URL_API}${id}`)
            .then(res => res.json())
            .catch(error => error);
    }
    
    static async insert(params) {          // para insertar un nuevo elemento 
        const options = {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(this.URL_API, options)
        .then(response => response.json())
        .catch(error => error);
    }

    static delete(id) {                 // para borrar un elemento
        const options = { method: 'DELETE' };
        return fetch(`${this.URL_API}${id}`, options)
            .then(response => response.json())
            // .catch(error => error);
    }

    static update(params) {                 // para actualizar un elemento
        const options = {
            method: 'PUT',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(`${this.URL_API}`, options)
            .then(response => response.json())
            .catch(error => error);
    }

}