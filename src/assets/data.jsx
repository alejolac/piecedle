// Lugar Nacimiento: "Este, Sur, Oeste, Norte, Grand Line, Otro, Desconocido"
// Ocupacion: "Pirata, Marine, Revolucionario, Capitan, Navegante"
// Especie: "Humano, Animal, Gyojin, Desconocido"
// Fruta Diablo: "Paramencia, Logia, Zoan, No tiene, Desconocido"

const data = {
    "personajes": [
        {
            "label": "Luffy",
            "imagen": "luffy.jpeg",
            "genero": "Masculino",
            "especie": "Humano",
            "blue": "East Blue",
            "fruta": "Zoan",
            "recompensa": 3000000000,
            "edad": 19,
            "ocupacion": ["Pirata", "Capitan"]
        },
        {
            "label": "Roronoa Zoro",
            "imagen": "zoro.jpg",
            "genero": "Masculino",
            "especie": "Humano",
            "blue": "West Blue",
            "fruta": "No tiene",
            "recompensa": 1111000000,
            "edad": 21,
            "ocupacion": ["Espadachin", "Comandante"]
        },
        {
            "label": "Chopper",
            "imagen": "chopper.webp",
            "genero": "Masculino",
            "especie": "Animal",
            "blue": "Grand Line",
            "fruta": "Zoan",
            "recompensa": 1000,
            "edad": 17,
            "ocupacion": ["Pirata", "Médico"]
        },
        {
            "label": "Nami",
            "imagen": "nami.jpg",
            "genero": "Femenino",
            "especie": "Humano",
            "blue": "East Blue",
            "Fruta": "No Tiene",
            "recompensa": 366000000,
            "edad": 20,
            "ocupacion": ["Navegante", "Pirata"]
        },
        {
            "label": "Jinbe",
            "imagen": "jinbe.jpg",
            "genero": "Masculino",
            "especie": "Gyojin",
            "blue": "Grand Line",
            "fruta": "No Tiene",
            "recompensa": 1100000000,
            "edad": 46,
            "ocupacion": ["Pirata"]
        },
        {
            "label": "Brook",
            "imagen": "brook.jpg",
            "genero": "Masculino",
            "especie": "Humano",
            "blue": "West Blue",
            "fruta": "Paramecia",
            "recompensa": 383000000,
            "edad": 90,
            "ocupacion": ["Pirata", "Musico"]
        },
        {
            "label": "Sanji",
            "imagen": "sanji.jpg",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "North Blue",
            "fruta": "No tiene",
            "recompensa": 1032000000,
            "edad": 21,
            "ocupacion": ["Pirata", "Cocinero"]
        },
        {
            "label": "Usopp",
            "imagen": "usopp.jpeg",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "East Blue",
            "fruta": "No tiene",
            "recompensa": 500000000,
            "edad": 19,
            "ocupacion": ["Pirata", "Francotirador"]
        },
        {
            "label": "Nico Robin",
            "imagen": "nico_robin.jpg",
            "genero": "Femenino",
            "especie": "Humana",
            "mar": "West Blue",
            "fruta": "Paramencia",
            "recompensa": 930000000,
            "edad": 30,
            "ocupacion": ["Pirata"]
        },
        {
            "label": "Eustass Kid",
            "imagen": "eustass_kid.jpg",
            "genero": "Masculino",
            "especie": ["Humano", "Cyborg"],
            "mar": "South Blue",
            "fruta": "Paramecia",
            "recompensa": 3000000000,
            "edad": 23,
            "ocupacion": ["Pirata", "Capitán"]
        },
        {
            "label": "Shanks",
            "imagen": "shanks.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "West Blue",
            "fruta": "No tiene",
            "recompensa": 4048900000,
            "edad": 39,
            "ocupacion": ["Pirata", "Capitán"]
        },
        {
            "label": "Garp",
            "imagen": "garp.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "East Blue",
            "fruta": "No tiene",
            "recompensa": "No tiene",
            "edad": 78,
            "ocupacion": ["Marine"]
        },
        {
            "label": "Monkey D. Dragon",
            "imagen": "monkey_d_dragon.jpg",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "East Blue",
            "fruta": "Desconocida",
            "recompensa": "Desconocida",
            "edad": 55,
            "ocupacion": ["Revolucionario"]
        },
        {
            "label": "Franky",
            "imagen": "franky.webp",
            "genero": "Masculino",
            "especie": ["Humano", "Cyborg"],
            "mar": "South Blue",
            "fruta": "No tiene",
            "recompensa": 394000000,
            "edad": 36,
            "ocupacion": ["Pirata"]
        },
        {
            "label": "Sabo",
            "imagen": "sabo.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "East Blue",
            "fruta": "Logia",
            "recompensa": 602000000,
            "edad": 22,
            "ocupacion": ["Revolucionario"]
        },
        {
            "label": "Ace",
            "imagen": "ace.jpg",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "South Blue",
            "fruta": "Logia",
            "recompensa": 550000000,
            "edad": 20,
            "ocupacion": ["Pirata"]
        },
        {
            "label": "Vivi",
            "imagen": "vivi.jpg",
            "genero": "Femenino",
            "especie": "Humana",
            "mar": "Grand Line",
            "fruta": "No tiene",
            "recompensa": "No Tiene",
            "edad": 18,
            "ocupacion": ["Princesa"]
        },
        {
            "label": "Katakuri",
            "imagen": "katakuri.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "Grand Line",
            "fruta": "Paramecia",
            "recompensa": 1057000000,
            "edad": 48,
            "ocupacion": ["Pirata", "Comandante"]
        },
        {
            "label": "Kaido",
            "imagen": "kaido.webp",
            "genero": "Masculino",
            "especie": "Oni",
            "mar": "Grand Line",
            "fruta": "Zoan",
            "recompensa": 4600000000,
            "edad": 59,
            "ocupacion": ["Pirata", "Capitan"]
        },
        {
            "label": "Big Mom",
            "imagen": "big_mom.webp",
            "genero": "Femenino",
            "especie": "Humana",
            "mar": "Grand Line",
            "fruta": "Paramecia",
            "recompensa": 4700000000,
            "edad": 68,
            "ocupacion": ["Pirata", "Capitana", "Emperatriz"]
        },
        {
            "label": "Barbablanca",
            "imagen": "barbablanca.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "Grand Line",
            "fruta": "Paramecia",
            "recompensa": "5046000000",
            "edad": 72,
            "ocupacion": ["Pirata", "Capitán"]
        },
        {
            "label": "Barbanegra",
            "imagen": "barbanegra.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "Grand Line",
            "fruta": "Paramecia",
            "recompensa": 3996000000,
            "edad": 40,
            "ocupacion": ["Pirata", "Capitán"]
        },
        {
            "label": "Buggy",
            "imagen": "buggy.webp",
            "genero": "Masculino",
            "especie": "Humano",
            "mar": "East Blue",
            "fruta": "Paramecia",
            "recompensa": 3189000000,
            "edad": 39,
            "ocupacion": ["Pirata", "Capitán"]
        }
    ]
}

export default data