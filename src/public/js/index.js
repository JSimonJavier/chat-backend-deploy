//front
const socket = io()

//!CHAT
/*
    1) un front/usuario envia un msj, - FRONT EMITE
    2) el back lo atrapa, lo guarda en un array y lo devuelve todo - BACK ATAJA Y EMITE
    3) atajar el array de msj en el front y mostrarlo en pantalla - FRONT ATAJA
*/

let nombreUsuario = ''
async function pedirNombre(){
    const{value:nombre} = await Swal.fire({
        title: 'Enter your name',
        input: 'text',
        inputLabel: 'Your name',
        inputValue: '',
        showCancelButton: false,
        inputValidator: (value) => {
            if(!value){
                return 'you need to write something'
            }
        }
    })
    nombreUsuario = nombre 
}

pedirNombre()

//esta funcion atrapa el mje del back al front
//!front emite
// setInterval(()=>{
//     socket.emit('msg_front_to_back', {
//         user: nombreUsuario,
//         msg: 'mje ' + Date.now(), 
//     })
// }, 3000) //cada tres segundo le mande un mje el front al back

const chatBox = document.getElementById('chat-box')
chatBox.addEventListener('keyup', ({key}) => {
    if(key == 'Enter') {
        socket.emit('msg_front_to_back', {
            user: nombreUsuario,
            msg: chatBox.value
        });
        chatBox.value = ''
    }
})

//!front recibe
socket.on('msg_back_to_front', (mjes) => {
    console.log('recibe del back ' + JSON.stringify(mjes))
    let mjesFormateados = ''
    mjes.forEach((mje)=>{
        let div = ''
        div += `
        <div style='border: 2px red solid'>
            <p>${mje.user}</p>
            <p>${mje.msg}</p>
        </div>
        `
        mjesFormateados += div
    })
    const divMjes = document.getElementById('div-mjes')
    divMjes.innerHTML = mjesFormateados
})

