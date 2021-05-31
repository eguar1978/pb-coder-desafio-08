const express = require('express');
const fs = require('fs');


function obtenerRandom(min, max) {
    return ((Math.random() * (max - min)) + min);
}

const ruta = "./productos.txt";


const app = express();
const puerto = 8080;
const visitas = new Object();
visitas.items = 0;
visitas.items_random = 0;


app.get('/items', (req, res) => {

    visitas.items++;
    async function read(ruta) {
        try {
            const archivo = await fs.promises.readFile(ruta);
            res.send(JSON.parse(archivo));
        } catch (err) {
            res.send("No hay productos en este momento");
        }
    }
    read(ruta);

});

app.get('/items-random', (req, res) => {
    visitas.items_random++;
    async function read(ruta) {
        try {
            const archivo = await fs.promises.readFile(ruta);
            largoArray = JSON.parse(archivo).length - 1;
            res.send(JSON.parse(archivo)[obtenerRandom(0, largoArray).toFixed(0)]);
        } catch (err) {
            res.send("No hay productos en este momento");
        }
    }
    read(ruta);
});



app.get('/visitas', (req, res) => {
    //const fechaHora = moment().format('YYYY/MM/DD h:mm:ss');
    res.send(visitas);
});

const server = app.listen(puerto, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:${puerto}`)
})