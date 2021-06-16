const fs = require('fs');
const  axios  =  require ( 'axios' );

class Busquedas {

        historial = [];
        dbPath = './db/database.json';
    constructor(){
        this.historias = this.leerDB();
    }

    get paramsMapBox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit' : 5 ,
            'language':'es'
        }
    }

    get paramasWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es'
        }
    }

    get capitalizarH(){
        return this.historial.map(lugar => {
            //Separando cada lugar por espacios
            let palabras = lugar.split(' ');
            //Agregando capitalizacion a las palabras
            palabras = palabras.map(p => p[0].toLocaleUpperCase() + p.substring(1));

            //Uniendo las palabras por un espacio
            return palabras.join(' ')
        })
    }

    async ciudad(lugar = "") {
        try {
            const axiosIntancia = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox,
            })
            
            const resp = await axiosIntancia();
            const lugares =  resp.data.features;

            return lugares.map(element => (
                {   id: element.id,
                    nombre :  element.place_name,
                    lng: element.center[0],
                    lat: element.center[1] 
                }
            ));

    
        } catch (error) {
            console.log(error);
        }
        
        
        
    };


    async clima(lat, lon){

        try {
            //Instace
            const intanciaClima = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    appid: process.env.OPENWEATHER_KEY,
                    units:'metric',
                    lang:'es',
                }
            })

            const resp = await intanciaClima.get();
            return resp.data
        } catch (error) {
            
        }

    }


    agregarHistorial(lugar = ""){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        //Mantener solo las 5 posiciones
        this.historial = this.historial.splice(0,5)
        //Agregando al historial
        this.historial.unshift(lugar.toLocaleLowerCase());

        //Guardar en bd
        this.guardarBD();
    }


    guardarBD(){
        const payload = {

            historial : this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){

        //Verificando si no existe el archivo
        if(!fs.readFileSync(this.dbPath)){
            return;
        }

        //Extrayendo el archivo
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        //Parseandolo
        const data = JSON.parse(info);
        //Guardando en el historial
        this.historial = data.historial;





    }
}


module.exports = Busquedas;