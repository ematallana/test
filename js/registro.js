import {fncIrPagina, fncIrPantallaPrincipal, fncPresentAlert, fncPresentLoading, fncPresentToast, fncIsEmpty} from './utilidades.js';
import {urlSecretBasicos} from './module.js';

const btnBack = document.querySelector("#btnBack");
const btnBuscar = document.querySelector("#btnBuscar");
const btnActivar = document.querySelector("#btnActivar");
const txtDocumento = document.querySelector("#txtDocumento");
const txtNombre = document.querySelector("#txtNombre");
const txtEmail = document.querySelector("#txtEmail");
const txtCelular = document.querySelector("#txtCelular");
const txtDireccion = document.querySelector("#txtDireccion");
const txtPassword = document.querySelector("#txtPassword");
const txtConfirm = document.querySelector("#txtConfirm");


const irBuscar = () => {
  let doc = txtDocumento.value;
  if(doc==undefined || doc.length <=0){
        fncPresentToast('Por favor dijite el Documento!!!');
  }else{
    consultarAfiliado(doc);
  }
};

const irActivar = () => {
  let pass = txtPassword.value;
  let conf = txtConfirm.value;
  if ((pass==undefined)||(pass="")||(conf==undefined)||(conf=="")) {
      fncPresentToast('Por favor Digite Contraseña y Confirmación!!!');
  }else{
      fncPresentToast('Por favor Active la Cuenta desde su email registrado!!!');
      window.location.href = '../index.html';
  }
};


const consultarAfiliado = (docSearch) => {    
    let codestado = 'INDEFINIDO';
    console.log('docSearch: '+docSearch);
    let url= urlSecretBasicos +docSearch;    
    fetch(url)
      .then(response => response.json())
      .then(data => {     

            console.log(data['ESTADO'] ); 
            if (data['ESTADO'] != undefined){
                    codestado = data['ESTADO'];
                }
            console.log(codestado);             
            if(codestado=='INDEFINIDO'){            
                fncPresentToast('El Usuario NO está registrado!!!');
            }else{                          
                txtNombre.textContent = data['PRINOM'] + ' ' + data['SEGNOM'] + ' ' + data['PRIAPE'] + ' ' + data['SEGAPE']; 
                txtEmail.textContent = data['EMAIL'];
                txtCelular.textContent = data['CELULAR'];
                txtDireccion.textContent = data['DIRECCION'];
                btnActivar.disabled = false;                
                }     
      })    
    }

window.addEventListener('load', function () {
    btnActivar.disabled = true;    
    
  });



window.addEventListener("click", function(e){
    console.log(e.target.id);
    switch(e.target.id){
      case "btnBuscar": irBuscar();
            break; 
      case "btnActivar": irActivar();
            break;                         
      case "btnBack": window.location.href = '../index.html';
            break;
      default: 
            break;      
    }
});