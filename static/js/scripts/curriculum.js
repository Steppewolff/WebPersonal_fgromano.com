//Load education and experience records when /curriculum page is loaded
window.addEventListener("load", press);

// function prueba(){
//     var year = document.getElementById('years').value;
//     var x = document.getElementById('years').value;
//     document.getElementById("prueba").innerHTML = '*****************PRUEBA OK ' + year + x;
// }

function press(){
    document.getElementById('years').addEventListener("click", educ_expert)
}

async function educ_expert(){  
    document.getElementById('prueba').innerHTML = '*****************PRUEBA 2OK ';
    //Función fetch que llama a /auth de flask_JWT en la API para obtener token
    async function postAuth(credentials){
        try{
            let response = await fetch(`https://fgromano.com/wp_api/auth`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': '*',
                    'Access-Control-Allow-Origin': 'https://fgromano.com',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'}
            })
            const data = await response.json();
            console.log("Success auth:", data);
            console.log('Headers', data.access_token)
            return data.access_token;
            //Se extrae el token en string para usar en siguientes peticiones a la API
            // token = response['access_token']
        }catch(error){
            console.error("Error:", error);
        }
    }

    //Usuario y contraseña para conexión con API
    let credentials = {
        username :"fgomezr",
        password :"Castorp"
    }

    //Llamada a función potAuth con credenciales
    var token = await postAuth(credentials);
    console.log("Token", token);

    //Función fetch que llama a API para obtener datos de formación y experiencia
    async function get_experience(token){
        try{
            var year = document.getElementById('years').value;
            console.log("Year", year);
            console.log("Token dentro", token);
            let response = await fetch(`https://fgromano.com/wp_api/resumee/`+ year.toString(), {
                method: "GET",
                // body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*',
                    'Access-Control-Allow-Origin': 'https://fgromano.com',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Authorization': 'JWT ' + token
                }
            })

            response = await response.json();
            console.log("Success experience:", response);
        }catch(error){
            console.error("Error:", error);
        }
    }

    //Función fetch que llama a API para obtener datos de experiencia
    async function get_education(token){
        try{
            var year = document.getElementById('years').value;
            console.log("Year", year);
            console.log("Token dentro", token);
            let response = await fetch(`https://fgromano.com/wp_api/education/`+ year.toString(), {
                method: "GET",
                // body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*',
                    'Access-Control-Allow-Origin': 'https://fgromano.com',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Authorization': 'JWT ' + token
                }
            })

            response = await response.json();
            console.log("Success experience:", response);
        }catch(error){
            console.error("Error:", error);
        }
    }

    let respuesta_exp = await get_experience(token);
    console.log('Respuesta: ', respuesta_exp)

    let show = respuesta_exp["fecha_final"] + " - " + respuesta_exp["puesto"] + " - " + respuesta_exp["empresa"] + " - " + respuesta_exp["duracion"];
    document.getElementById('cont_exp').innerHTML = show

    let respuesta_educ = await get_education(token);
    console.log('Respuesta: ', respuesta_educ)

    show = respuesta_educ["fecha_final"] + " - " + respuesta_exp["titulo"] + " - " + respuesta_exp["duracion"];
    document.getElementById('cont_educ')
}