const inquirer = require('inquirer');
require('colors')

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {value: 1, name: `${"1.-".cyan} Buscar Ciudad`},
            {value: 2, name: `${"2.-".cyan} Historial`},
            {value: 0, name: `${"0.-".cyan} Salir`}
        ]
    }
]


const menuWather = async()=> {
    console.clear();
    console.log('========================'.cyan);
    console.log('Seleccione una opcion'.cyan);
    console.log('========================\n'.cyan);

    const {opcion} = await inquirer.prompt(questions);

    return opcion
};


const pausa = async() => {
    const question = [
        {type: 'input', name: 'enter', message:`${'Enter'.cyan} para continuar: `}
    ]

    console.log('\n');
    await inquirer.prompt(question)
};

const leerInput = async(message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value) { 
            //Error
            if(value.length === 0){
                return 'Por Favor Ingrese un valor'.cyan
            }
            //Good
            return true
        }
    };

    const {desc} = await inquirer.prompt(question);
    return desc
}



const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${(i + 1).toString().blue}`
        return {
            value : lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: "0",
        name: '0'.cyan + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name : 'id',
            message: 'Seleccione lugar',
            choices

        }
    ];

    const {id} = await inquirer.prompt(questions);
    
    return id;
};

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);

    return ok;
};

const mostrarCheckLIst = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${(i + 1).toString().cyan}`
        return {
            value : tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });



    const question = [
        {
            type: 'checkbox',
            name : 'ids',
            message: 'Seleccione',
            choices

        }
    ];

    const {ids} = await inquirer.prompt(question);
    
    return ids;
};



module.exports = {
    menuWather,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarCheckLIst
}