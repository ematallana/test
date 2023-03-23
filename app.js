import {fncIrPagina,fncPresentToast} from './js/utilidades.js';
import {urlSecretConsulta} from './js/module.js';

let documento ='';
const btnQueryCategoria = document.querySelector("#btnQueryCategoria");
const buttonQueryCuota = document.querySelector("#btnQueryCuota");
const buttonQueryGrupo = document.querySelector("#btnQueryGrupo");
const btnQueryAportes = document.querySelector("#btnQueryAportes");
const btnMensajes = document.querySelector("#btnMensajes");
const btnServicios = document.querySelector("#btnServicios");
const btnCerrarSesion = document.querySelector("#btnCerrarSesion");
const txtTrabajadorDoc = document.querySelector("#txtTrabajadorDoc");
const txtTrabajadorNom = document.querySelector("#txtTrabajadorNom");
const txtTrabajadorEst = document.querySelector("#txtTrabajadorEst");

const consultarAfiliado = (docSearch) => {  
      let url= urlSecretConsulta+docSearch;      
      let dato= url.includes('null'); 
      if(dato==false){
      fetch(url)
        .then(response => response.json())
        .then(data => {
          txtTrabajadorDoc.textContent = data['TIPDOC'] + ' ' + data['CEDTER'];
          txtTrabajadorNom.textContent = data['NOMBRE'] + ' ' + data['APELLIDO'];    
          let codestado = data['ESTADO'] ='A' ? 'ACTIVO': data['ESTADO'] ='I' ? 'INACTIVO' : data['ESTADO'] ='M' ? 'FALLECIDO' : 'INDEFINIDO';
          txtTrabajadorEst.textContent = codestado;
        })       
      }
}

window.addEventListener('load', function () {    
    documento = localStorage.getItem("appDoc");         
    let docsec = sessionStorage.getItem("appDoc");   
    if((documento == '') || (documento == null) || (documento.length == 0) ){
      fncIrPagina('vistas/login.html');
    }else{
      consultarAfiliado(documento);
    }
  });

window.addEventListener("click", function(e){
    switch(e.target.id){
      case "btnQueryCuota": fncIrPagina('vistas/cuotamonetaria.html');
            break; 
      case "btnQueryCategoria": fncIrPagina('vistas/categoria.html');
            break;       
      case "btnQueryGrupo": fncIrPagina('vistas/grupofamiliar.html');
            break;       
      case "btnQueryAportes": fncIrPagina('vistas/aportes.html');
            break;             
      case "btnMensajes": fncIrPagina('vistas/mensajes.html');
            break;                   
      case "btnServicios": fncIrPagina('vistas/servicios.html');
            break;
      case "btnCerrarSesion": fncCerrarSession();
            break;
      default: fncIrPagina('vistas/login.html');
            break;      
    }
});


const fncCerrarSession = () => {
   fncPresentAlertConfirm();  
};
  
function fncPresentAlertConfirm() {
  const alert = document.createElement('ion-alert');
  //alert.cssClass = 'my-custom-class';
  alert.header = 'Comfacauca App';
  alert.message = '<strong>Desea Finalizar la Sessión?</strong>';
  alert.buttons = [
    {
      text: 'Cancelar',
      //role: 'Cancelar',
      cssClass: 'primary',      
      id: 'cancel-button',
      handler: (blah) => {
        //console.log('Confirm Cancel: blah');
        //fncPresentToast('Voy a nada');                 
      }
    }, {
      text: 'Confirmar',
      id: 'confirm-button',
      handler: () => {
        localStorage.setItem("appDoc","");                   
        sessionStorage.setItem("appDoc","");  
          
        //fncIrPagina('/vistas/login.html');
      }
    }
  ];
document.body.appendChild(alert);
  return alert.present();
}  

