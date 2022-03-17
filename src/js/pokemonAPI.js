let pokemon = {
    name: "alfa",
    tipo: "beta",
    imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
}

const muestraEstadisticas = estadisticas => {
    let miDIV = document.getElementById("estadisticas")
    while(miDIV.childElementCount){
        miDIV.removeChild(miDIV.firstChild)
    }
    for(let item of estadisticas){
        let temp = document.createElement('span')
        temp.className = "estadistica-elemento"
        temp.innerHTML = `${item.nombre}: ${item.valor}`
        miDIV.appendChild(temp)
    }
}

const muestraMovimientos = movimientos => {
    let miDIV = document.getElementById("movimientos")
    while(miDIV.childElementCount){
        miDIV.removeChild(miDIV.firstChild)
    }
    for(let item of movimientos){
        let temp = document.createElement('span')
        temp.className = "movimientos-elemento"
        temp.innerHTML = `${item}`
        miDIV.appendChild(temp)
    }
}

const actualiza = miPokemon => {
    let imagen = document.getElementById("imagen-value")
    let nombre = document.getElementById("name")
    let tipo = document.getElementById("tipo-value")
    imagen.src = miPokemon.imagen
    nombre.value = miPokemon.nombre
    tipo.innerHTML = miPokemon.tipo
    muestraEstadisticas(miPokemon.estadisticas)
    muestraMovimientos(miPokemon.movimientos)
}

const procesaMovimientos = (movimientos) => {
    const resultado = []
    for(let item of movimientos){
        resultado.push(item.move.name)
    }
    return resultado
}

const procesaEstadisticas = (estadisticas) => {
    const resultado = []
    const nombres = ["HP", "Ataque", "Defensa", "Ataque especial", "Defensa especial", "Velocidad", "Presición", "Evasión"]
    for(let item of estadisticas){
        let temp = {}
        let url = item.stat.url.split('/')
        temp.valor = item.base_stat
        temp.nombre = nombres[url[url.length-2]]
        resultado.push(temp)
    }
    return resultado
}

const consultaAPI = async (pokemon = "pikachu") => {
    const miPokemon = {}
    let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(respuesta.status !== 200){
        console.error("verificar nombre")
        throw new Error("Error al consultar el API")
    }
    let objeto = await respuesta.json() 
    const {name, moves, sprites, stats, types} = objeto
    miPokemon.nombre = name
    miPokemon.tipo = types[0].type.name
    miPokemon.imagen = sprites.front_default
    miPokemon.movimientos = procesaMovimientos(moves)
    miPokemon.estadisticas = procesaEstadisticas(stats)
    console.log(miPokemon)    
    return miPokemon
}

const busca = async() => {
    let nombre = document.getElementById("name")
    let pokemon = await consultaAPI(nombre.value.toLowerCase() )
    actualiza(pokemon)
}

const main = async() => {
    let pokemon = await consultaAPI()
    actualiza(pokemon)
}

main()
