//Load education and experience records when /curriculum page is loaded
window.addEventListener("load", educ_expert);
window.addEventListener("load", press);

function press(){
    document.getElementById('years').addEventListener("change", educ_expert)
}

async function educ_expert(){
    //Función fetch que llama a /auth de flask_JWT en la API para obtener token
    async function postAuth(credentials){
        try{
            let response = await fetch(`https://fgromano.com/wp_api/auth`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'}
            })
            const data = await response.json();
            console.log("Success auth:", data);
            console.log('Headers', data.access_token)
            return data.access_token;
            //Se extrae el token en string para usar en siguientes peticiones a la API
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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Authorization': 'JWT ' + token
                }
            })

            response = await response.json();
            console.log("Success experience:", response);
            return response;
        }catch(error){
            console.error("Error:", error);
        }
    }

    let respuesta_exp = await get_experience(token);

    async function print_exp(resp, element_id){
        while(document.getElementById(element_id).lastChild) {
            document.getElementById(element_id).innerHTML = "";
        }
        let ul = document.createElement("ul");
        ul.setAttribute('class', 'lista exp')
        document.getElementById(element_id).appendChild(ul);
        for (let line in resp){
            let li = document.createElement('li');
            let show = resp[line].puesto + " en " + resp[line].empresa + " durante " + resp[line].duracion + " año/s";
            li.innerHTML = show;
            ul.appendChild(li);
        }
    }

    print_exp(respuesta_exp, 'cont_exp');

    async function get_education(token){
        try{
            var year = document.getElementById('years').value;
            console.log("Year", year);
            console.log("Token dentro", token);
            let response = await fetch(`https://fgromano.com/wp_api/education/`+ year.toString(), {
                method: "GET",
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
            return response;
        }catch(error){
            console.error("Error:", error);
        }
    }

    var respuesta_educ = await get_education(token);

    async function print_educ(resp, element_id){
        while(document.getElementById(element_id).lastChild) {
            document.getElementById(element_id).innerHTML = "";
        }
        let ul = document.createElement('ul');
        ul.setAttribute('class', 'lista educ')
        document.getElementById(element_id).appendChild(ul);
        while(ul.lastElementChild) {
            ul.removeChild(ul.lastElementChild);
        }
        for (let line in resp){
            let li = document.createElement('li');
            let show = resp[line].titulo + " en " + resp[line].centro + " durante " + resp[line].duracion + " año/s";
            li.innerHTML = show;
            ul.appendChild(li);
        }
    }

    print_educ(respuesta_educ, 'cont_educ');
}