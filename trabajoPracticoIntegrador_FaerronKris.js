//El objetico del proyecto es desarrollar un sistema de gestión para una biblioteca
// que permita administrar libros y usuarios, aplicando los conceptos fundamentales
// de JavaScript vistos en el módulo.

///////////////////////////////////////////////////////////////////////////////////////////////////

//Entonces, para comenzar el proyecto, vamos a hacer:
//1. Estructura de Datos
//a)Crear un array de objetos llamado libros que contenga al menos 10 libros. Cada libro debe tener las siguientes propiedades:
//id (número), título (string), autor (string), año (número), género (string), disponible (booleano).

//Colocamos primero con el prompt-sync para poder solicitar datos al usuario en la consola, y luego creamos el array de libros con los objetos correspondientes:

const prompt = require("prompt-sync")({ sigint: true });

const libros = [
{ id: 1, titulo: "Last.FM", autor: "Kevin Román", anio: 2025, genero: "Autobiografía", disponible: true },
{ id: 2, titulo: "Indigno de ser humano", autor: "Osamu Dazai", anio: 1948, genero: "Novela", disponible: true },
{ id: 3, titulo: "Cumbres borrascosas", autor: "Emily Bronté", anio: 1847, genero: "Novela", disponible: false },
{ id: 4, titulo: "Roba como un artista", autor: "Austin Kleon", anio: 2012, genero: "No ficción", disponible: true },   
{ id: 5, titulo: "Marianela", autor: "Benito Pérez Galdós", anio: 1878, genero: "Novela", disponible: false },
{ id: 6, titulo: "Frankestein", autor: "Mary Shelley", anio: 1818, genero: "Ciencia Ficción", disponible: true },
{ id: 7, titulo: "El gato negro", autor: "Edgar Allan Poe", anio: 1843, genero: "Cuento", disponible: true },
{ id: 8, titulo: "Crepúsculo", autor: "Stephenie Meyer", anio: 2005, genero: "Novela", disponible: false },
{ id: 9, titulo: "Harry Potter y la Piedra Filosofal", autor: "J.K. Rowling", anio: 1997, genero: "Fantasía", disponible: true },
{ id: 10, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", anio: 1605, genero: "Novela", disponible: true }
];

// Ahora lo siguiente es crear un array de objetos llamado usuarios que contenga al menos 5 usuarios.
// Cada usuario debe tener las siguientes propiedades: id (número), nombre (string), email (string), librosPrestados (array de ids de libros).
//Entonces, vamos a crear el array de 5 usuarios:

const usuarios = [
{ id: 1, nombre: "Joseph Miranda", email: "micorreomiranda@gmail.com", librosPrestados: [2, 5] },
{ id: 2, nombre: "Joel Campbell", email: "micorreocampbell@gmail.com", librosPrestados: [3] },
{ id: 3, nombre: "Kris Faerron", email: "micorreofaerron@gmail.com", librosPrestados: [1] },
{ id: 4, nombre: "José Villalta", email: "micorreovillalta@gmail.com", librosPrestados: [8] },
{ id: 5, nombre: "Lola López", email: "micorreolopez@gmail.com", librosPrestados: [4,7] }
];

//Ahora que tenemos la estructura de datos, seguimos con otra parte del proyecto, que es la gestión de libros y usuarios.
//2.Funciones de Gestión de Libros //a) Implementar una función agregarLibro(id, titulo, autor, año, genero)
//que agregue un nuevo libro al array libros. //b) Crear una función buscarLibro(criterio, valor)
//que permita buscar libros por título, autor o género utilizando el algoritmo de búsqueda lineal.

function agregarLibro(id, titulo, autor, anio, genero) {
const existe = libros.some(libro => libro.id === id);
    if (existe) {
        console.log("Ya existe un libro con ese ID");
        return;
    }
const nuevoLibro = {
        id,
        titulo,
        autor,
        anio,
        genero,
        disponible: true
    };
libros.push(nuevoLibro);
}

// b)Crear una función buscarLibro(criterio, valor) que permita buscar libros por título,
//autor o género utilizando el algoritmo de búsqueda lineal.
// La función buscarLibro toma dos parámetros: criterio y valor.
// La función utiliza el método filter para recorrer el array de libros y comparar el valor
// del criterio con el valor proporcionado, ignorando mayúsculas y minúsculas en caso
// de que sea una cadena de texto. Devuelve un array con los libros que coinciden con el criterio de búsqueda.

function buscarLibro(criterio, valor) {
    return libros.filter(libro => {
        if (!(criterio in libro)) return false;
        const dato = libro[criterio];
        if (typeof dato === "string" && typeof valor === "string") {
            return dato.toLowerCase().includes(valor.toLowerCase());
        }
        return dato === valor;
    });
}

//c) Desarrollar una función ordenarLibros(criterio) que ordene los libros por título o año
// utilizando el algoritmo de ordenamiento burbuja (bubble sort) y luego muestre los libros ordenados en la consola.
//d) Desarrollar una función borrarLibro(id) que elimine el libro que se le pase por parámetro.
//Para lograr esto, se puede utilizar el método filter para crear un nuevo array de libros que
//excluya el libro con el id especificado.

function ordenarLibros(criterio) {
    const librosOrdenados = [...libros];
    for (let i = 0; i < librosOrdenados.length - 1; i++) {
        for (let j = 0; j < librosOrdenados.length - i - 1; j++) {
            if (librosOrdenados[j][criterio] > librosOrdenados[j + 1][criterio]) {
                const temp = librosOrdenados[j];
                librosOrdenados[j] = librosOrdenados[j + 1];
                librosOrdenados[j + 1] = temp;
            }
        }
    }
    console.log(librosOrdenados);
}
function borrarLibro(id) {
    const index = libros.findIndex(libro => libro.id === id);
    if (index !== -1) {
        libros.splice(index, 1);
    }
}

//La siguiente parte del proyecto es la gestión de usuarios, aquí se implementarán funciones para agregar usuarios,
// buscar usuarios por nombre o email, y eliminar usuarios por id:
//4. Sistema de Préstamos
//a) Desarrollar una función prestarLibro(idLibro, idUsuario) que marque un libro como no
//disponible y lo agregue a la lista de libros prestados del usuario.
//b)Implementar una función devolverLibro(idLibro, idUsuario) que marque un libro como
//disponible y lo elimine de la lista de libros prestados del usuario.

function prestarLibro(idLibro, idUsuario) {
    const libro = libros.find(libro => libro.id === idLibro);
    const usuario = usuarios.find(usuario => usuario.id === idUsuario);
    if (libro && usuario && libro.disponible) {
        libro.disponible = false;
        usuario.librosPrestados.push(idLibro);
    } else {
        console.log("Lo sentimos, libro no disponible o usuario no encontrado.");
    }
}
function devolverLibro(idLibro, idUsuario) {
    const libro = libros.find(libro => libro.id === idLibro);
    const usuario = usuarios.find(usuario => usuario.id === idUsuario);
    if (libro && usuario) {
        libro.disponible = true;
        usuario.librosPrestados = usuario.librosPrestados.filter(id => id !== idLibro);
    } else {
        console.log("Lo sentimos, libro o usuario no encontrado.");
    }
}
//La siguiente parte del proyecto es:
// 5. Reportes a) Crear una función generarReporteLibros() que utilice métodos avanzados de arrays
//(.map(), .filter(), .reduce()) para generar un reporte con la siguiente información:
//Cantidad total de libros.
//Cantidad de libros prestados.
//Cantidad de libros por género.
//Libro más antiguo y más nuevo.

function generarReporteLibros() {
    const totalLibros = libros.length;
    const librosPrestados = libros.filter(libro => !libro.disponible).length;
    const librosPorGenero = libros.reduce((acc, libro) => {
        acc[libro.genero] = (acc[libro.genero] || 0) + 1;
        return acc;
    }, {});
    const libroMasAntiguo = libros.reduce((antiguo, libro) => {
        return libro.anio < antiguo.anio ? libro : antiguo;
    }, libros[0]);
    const libroMasNuevo = libros.reduce((nuevo, libro) => {
        return libro.anio > nuevo.anio ? libro : nuevo;
    }, libros[0]);
    console.log({
        totalLibros,
        librosPrestados,
        librosPorGenero,
        libroMasAntiguo,
        libroMasNuevo
    });
}
//Lo que acabamos de hacer es crear la función generarReporteLibros que utiliza métodos avanzados
//de arrays para generar un reporte con información sobre los libros en la biblioteca. La función
//calcula la cantidad total de libros, la cantidad de libros prestados, la cantidad de libros por género,
// y encuentra el libro más antiguo y el más nuevo. Luego, imprime esta información en la consola.

//Ahora sigue 6. Identificación Avanzada de libros
//a)Implementar una función librosConPalabrasEnTitulo() que identifique y muestre
//todos los libros cuyo título contiene más de una palabra (no títulos que contengan
//números ni otros caracteres).
//b) La función debe devolver un array con los títulos de esos libros y mostrarlo en la consola.
//Vamos a hacer lo siguiente:

function librosConPalabrasEnTitulo() {
    const librosConPalabras = libros.filter(libro => {
        const palabras = libro.titulo.split(" ");
        return palabras.length > 1 && palabras.every(palabra => /^[a-zA-Z]+$/.test(palabra));
    }).map(libro => libro.titulo);
    console.log(librosConPalabras);
}

//7. Cálculos Estadísticos
//a) Desarrollar una función calcularEstadisticas() que utilice el objeto Math para calcular y mostrar:
//Promedio de años de publicación de los libros.
//Año de publicación más frecuente.
//Diferencia en años entre el libro más antiguo y el más nuevo.

function calcularEstadisticas() {
    const promedioAnios = libros.reduce((acc, libro) => acc + libro.anio, 0) / libros.length;
    const aniosFrecuentes = libros.reduce((acc, libro) => {
        acc[libro.anio] = (acc[libro.anio] || 0) + 1;
        return acc;
    }, {});
    const anioMasFrecuente = Object.keys(aniosFrecuentes).reduce((a, b) => aniosFrecuentes[a] > aniosFrecuentes[b] ? a : b);
    const libroMasAntiguo = libros.reduce((antiguo, libro) => {
        return libro.anio < antiguo.anio ? libro : antiguo;
    }, libros[0]);
    const libroMasNuevo = libros.reduce((nuevo, libro) => {
        return libro.anio > nuevo.anio ? libro : nuevo;
    }, libros[0]);
    const diferenciaAnios = libroMasNuevo.anio - libroMasAntiguo.anio;
    console.log({
        promedioAnios,
        anioMasFrecuente,
        diferenciaAnios
    });
}

//La función calcularEstadisticas utiliza el objeto Math para realizar cálculos estadísticos sobre los libros en la biblioteca.
// Calcula el promedio de años de publicación, encuentra el año de publicación más frecuente, y calcula
// la diferencia en años entre el libro más antiguo y el más nuevo. Luego, imprime esta información en la consola.

//Seguimos con el punto 8. Manejo de Cadenas
//a) Crear una función normalizarDatos() que utilice métodos de strings para:
//Convertir todos los títulos a mayúsculas.
//Eliminar espacios en blanco al inicio y final de los nombres de autores.
//Formatear los emails de los usuarios a minúsculas.

function normalizarDatos() {
    libros.forEach(libro => {
        libro.titulo = libro.titulo.toUpperCase();
        libro.autor = libro.autor.trim();
    });
    usuarios.forEach(usuario => {
        usuario.email = usuario.email.toLowerCase();
    });
}

//La función normalizarDatos utiliza métodos de strings para normalizar los datos de los libros y usuarios en la biblioteca.
// Convierte todos los títulos de los libros a mayúsculas, elimina espacios en blanco al inicio y final de los nombres de autores,
// y formatea los emails de los usuarios a minúsculas. Esto ayuda a mantener la consistencia en los datos y facilita las búsquedas y comparaciones.

//Finalmente:9. Interfaz de Usuario por Consola
//a) Implementar una función menuPrincipal() que muestre un menú de opciones al
//usuario y permita interactuar con el sistema utilizando prompt().
//b) El menú debe incluir opciones para todas las funcionalidades anteriores y utilizar
//estructuras de control (if, switch, ciclos) para manejar la lógica.

function menuPrincipal() {
    let opcion;
    do {
        console.log("1. Agregar Libro");
        console.log("2. Buscar Libro");
        console.log("3. Ordenar Libros");
        console.log("4. Borrar Libro");
        console.log("5. Prestar Libro");
        console.log("6. Devolver Libro");
        console.log("7. Generar Reporte de Libros");
        console.log("8. Identificar Libros con Palabras en el Título");
        console.log("0. Salir");
        opcion = prompt("Seleccione una opción: ");
        switch (opcion) {
            case "1":
                const id = parseInt(prompt("ID del libro: "));
                const titulo = prompt("Título del libro: ");
                const autor = prompt("Autor del libro: ");
                const anio = parseInt(prompt("Año de publicación: "));
                const genero = prompt("Género del libro: ");
                agregarLibro(id, titulo, autor, anio, genero);
                break;
            case "2":
                const criterio = prompt("Criterio de búsqueda (titulo, autor, genero): ");
                const valor = prompt("Valor de búsqueda: ");
                console.log(buscarLibro(criterio, valor));
                break;
            case "3":
                const criterioOrden = prompt("Criterio de ordenamiento (titulo, anio): ");
                ordenarLibros(criterioOrden);
                break;
            case "4":
                const idBorrar = parseInt(prompt("ID del libro a borrar: "));
                borrarLibro(idBorrar);
                break;
            case "5":

                const idLibroPrestar = parseInt(prompt("ID del libro a prestar: "));
                const idUsuarioPrestar = parseInt(prompt("ID del usuario: "));
                prestarLibro(idLibroPrestar, idUsuarioPrestar);
                break;
            case "6":
                const idLibroDevolver = parseInt(prompt("ID del libro a devolver: "));
                const idUsuarioDevolver = parseInt(prompt("ID del usuario: "));
                devolverLibro(idLibroDevolver, idUsuarioDevolver);
                break;
            case "7":
                generarReporteLibros();
                break;
            case "8":
                librosConPalabrasEnTitulo();
                break;
            case "0":
                console.log("Saliendo del sistema...");
                break;
            default:
                console.log("Opción no válida. Por favor, seleccione una opción del menú.");
        }
    } while (opcion !== "0");
}

//Lo que hicimos arriba fue crear la función menuPrincipal que muestra un menú de opciones al usuario y permite interactuar con el sistema utilizando prompt().
// El menú incluye opciones para todas las funcionalidades implementadas anteriormente, como agregar libros, buscar libros, ordenar libros, prestar y devolver libros, generar reportes, etc.
// La función utiliza un ciclo do-while para mostrar el menú repetidamente hasta que el usuario seleccione la opción de salir (0). Dentro del ciclo, se utiliza un switch para manejar la lógica de cada opción seleccionada por el usuario. Cada caso del switch llama a la función correspondiente según la opción elegida. Si el usuario ingresa una opción no válida, se muestra un mensaje de error.

//Finalmente, para ejecutar el menú principal, simplemente llamamos a la función menuPrincipal():
menuPrincipal();
//Y con esto, hemos implementado un sistema de gestión para una biblioteca utilizando JavaScript,
// que permite administrar libros y usuarios, y ofrece diversas funcionalidades para la gestión de la biblioteca.

