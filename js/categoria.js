import {fncPresentAlert, fncPresentLoading, fncIrPantallaPrincipal, fncPresentToast, fncIsEmpty} from '../js/utilidades.js';
import {urlSecretCategoria} from '../js/module.js';

const documento = document.querySelector("#documento");
const btnCategoriaBack = document.querySelector("#btnCategoriaBack");
const categoria = document.querySelector("#categoria");
const estado = document.querySelector("#estado");


const clearInputs = () => {
    documento.value = "";
    categoria.textContent = '';
    estado.textContent = '';
  };
 
const consultarAfiliado = (docSearch) => {
      let url= urlSecretCategoria +docSearch; 
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data['CODCAT']);
          categoria.textContent = data['CODCAT'];
          let codestado = data['ESTADO'] ='A' ? 'ACTIVO': data['ESTADO'] ='I' ? 'INACTIVO' : data['ESTADO'] ='M' ? 'FALLECIDO' : 'INDEFINIDO';
          estado.textContent = codestado;
        })
}
   
  
window.addEventListener('load', function () {
  fncPresentLoading(); 
  const docConsulta = this.localStorage.getItem("appDoc");
	if(docConsulta.length > 0){
		if (fncIsEmpty(docConsulta)) {
		  fncPresentAlert();
		  return;
		}
	}
    consultarAfiliado(docConsulta);
  }); 
  
btnCategoriaBack.addEventListener("click", fncIrPantallaPrincipal);
 

  