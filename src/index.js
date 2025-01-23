// Importamos las dependencias necesarias
import express, { urlencoded } from 'express'; // Importamos Express y la función `urlencoded` para manejar datos de formularios
import { engine } from 'express-handlebars'; // Importamos el motor de plantillas Handlebars
import __dirname from './utils.js'; // Importamos la ruta del directorio actual desde el archivo utils.js
import * as path from 'path'; // Importamos el módulo path para manejar rutas de archivos
import { title } from 'process';

// Creamos una instancia de la aplicación Express
const app = express();
// Definimos el puerto en el que se ejecutará el servidor
const PORT = 4000;
// Usamos path.resolve para obtener la ruta completa a la carpeta 'views' en base a __dirname
const viewspath = path.resolve(__dirname, "views");
//console.log(`ruta completa ${viewspath}`)

// Middleware para analizar los datos JSON del cuerpo de las solicitudes HTTP
app.use(express.json());
// Middleware para procesar datos enviados desde formularios (application/x-www-form-urlencoded)
app.use(urlencoded({ extended: true }));
// Configuramos el motor de plantillas Handlebars para usarlo en nuestras vistas
app.engine("handlebars", engine());
// Le decimos a Express que el motor de vistas será Handlebars
app.set("view engine", "handlebars");
// Establecemos la carpeta donde se encuentran las vistas de nuestra aplicación
app.set("views", viewspath);


//Archivos estáticos
app.use("/", express.static(path.join(__dirname, "public")));

// Definimos la ruta de la raíz ("/") para enviar una respuesta simple
app.get("/", (req, res) => {
    res.render("home", {
        title: "Backend |  mensaje desde handlebars"
    })
});

// Iniciamos el servidor y escuchamos en el puerto 4000
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
});