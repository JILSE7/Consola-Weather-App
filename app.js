const { leerInput, menuWather, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();
require('colors')


const main = async() => {

    const busquedas = new Busquedas();
let opt ="";
    do {
         opt = await menuWather();
         switch (opt) {
             case 1:
                 //Mostrar mensaje;
                 const ciudad = await leerInput('Que ciudad deseas buscar?: ');

                 //Buscar lugar;
                 const lugares = await busquedas.ciudad(ciudad);
                 
                 //Seleccionar el lugar
                 const id = await listarLugares(lugares);
                 if(id === '0' ) continue; // sigue la iteracion del ciclo, por eso nos saca
                 const lugarSelect = lugares.find(lugar => lugar.id === id);

                 //Agregandolo al historial
                 busquedas.agregarHistorial(lugarSelect.nombre);
                 

                 //Datos del clima
                const clima = await busquedas.clima(lugarSelect.lat,lugarSelect.lng)
                const {temp, temp_min, temp_max} = clima.main;
                
                 //Mostrar resultados
                 console.log('\nInformacion de la ciudad \n'.green);
                 console.log(`Ciudad: ${lugarSelect.nombre}`.blue);
                 console.log(`Actual: ${clima.weather[0].description}`.blue);
                 console.log(`Lng: ${lugarSelect.lng}`.blue);
                 console.log(`Lat: ${lugarSelect.lat}`.blue);
                 console.log(`Temperatura: ${temp}`.blue);
                 console.log(`Minima: ${temp_min}`.blue);
                 console.log(`Maxima: ${temp_max}`.blue);


                break;
            case 2 : 
               
                busquedas.capitalizarH.forEach((lugar,i) => {
                    const idx = `${i + 1 }`;
                    console.log(`${idx}.- ${lugar}`.blue);
                })
                break;
                
         
             default:
                 break;
         }

        if(opt !== 0 )await pausa()
        
    } while (opt !== 0);
    

   

}


 main(); 

