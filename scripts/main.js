const recurso = 'https://reqres.in/api/users/';
const section = document.querySelector('section');
console.log(section);


//helper
function traerUser(id, metodo = 'get') {
    const promesa = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(metodo, recurso + id);
        console.log(`Peticion a: ${recurso + id}`);
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let respuesta = JSON.parse(xhr.response);
                resolve(respuesta);
            } else {
                console.log('Error en peticion ajax', xhr.status);
                reject(xhr.status);
            }
        })
        xhr.send();
    })
    return promesa;
}

function appendUser(user) {
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let div = document.createElement('div');
    img.src = user.data.avatar;
    p.textContent = user.data.email;
    h2.textContent = user.data.first_name + ' ' + user.data.last_name;
    h3.textContent = user.data.id;
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);
    return div;
}

async function traer10User() {
    try {
        let frag = new DocumentFragment();
        let div = appendUser(await traerUser(1));
        frag.appendChild(div)
        div = appendUser(await traerUser(2));
        frag.appendChild(div)
        div = appendUser(await traerUser(3));
        frag.appendChild(div)
        div = appendUser(await traerUser(4));
        frag.appendChild(div)
        div = appendUser(await traerUser(5));
        frag.appendChild(div)
        div = appendUser(await traerUser(6));
        frag.appendChild(div)
        div = appendUser(await traerUser(7));
        frag.appendChild(div)
        div = appendUser(await traerUser(8));
        frag.appendChild(div)
        div = appendUser(await traerUser(9));
        frag.appendChild(div)
        div = appendUser(await traerUser(10));
        frag.appendChild(div)
        return frag;
    } catch (err) { //failed request
        console.log(`Peticion ajax fallida: `, err);
        return false
    }
}

const promesaTerminar = new Promise((resolve, reject)=>{
    retorno = traer10User();
    if (retorno === false){
        reject(retorno);
    }else{
        resolve(retorno);
    }
});

promesaTerminar
    .then((data)=>{
        section.appendChild(data);
    })
    .catch((err)=>{
        console.log('Fallo en peticion ajax', err);
    })
