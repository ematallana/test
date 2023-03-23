import {fncPresentAlert, fncPresentLoading, fncIrPantallaPrincipal, fncPresentToast, fncIsEmpty} from '../js/utilidades.js';
import {urlSecretGrupoFamiliar} from '../js/module.js';

const listaGirados = document.querySelector("#listaGirados");
const tablaGirados = document.querySelector("#tablaGirados");
const contentBeneficiarios = document.querySelector("#contentBeneficiarios");
const btnBack = document.querySelector("#btnBack");


  const createLineaBeneficiario = (parentezco, codRua, documento, estado, nombre) => {
    const ionCard = document.createElement('ion-card');
    const ionCardContent = document.createElement('ion-card-content');
    const ionItem1 = document.createElement('ion-item');
    const ionItem2 = document.createElement('ion-item');
    const ionItem3 = document.createElement('ion-item');
    const ionIcon = document.createElement('ion-icon');
    const ionLabel1 = document.createElement('ion-label');
    const ionLabel2 = document.createElement('ion-label');
    const ionLabel3 = document.createElement('ion-label');
    ionIcon.name ="logo-person";
    ionLabel1.textContent = codRua + ' ' + documento + ' ' + estado;
    ionLabel2.textContent = nombre;
    ionLabel3.textContent = parentezco;       
    ionLabel1.style ='font-size:10px;';
    ionLabel2.style ='font-size:10px;';
    ionLabel3.style ='color:green; font-size:10px;';
    ionItem1.appendChild(ionLabel1);
    ionItem2.appendChild(ionLabel2);
    ionItem3.appendChild(ionLabel3);
    ionCardContent.appendChild(ionItem3);    
    ionCardContent.appendChild(ionItem1);    
    ionCardContent.appendChild(ionItem2);        
    ionCard.appendChild(ionCardContent);
    contentBeneficiarios.appendChild(ionCard);  
    
  };  


const consultarGrupoFamiliar = (docSearch) => {      
  let url= urlSecretGrupoFamiliar+docSearch;        
  let respuesta =[]; 
	let beneficiarios = [];
    fetch(url)
      .then(response => response.json())
      .then(data => {                
          console.log(data);
          console.log('=====================================');
          contentBeneficiarios.innerHTML = '';
		  //respuesta = data;
			for(let beneficiario of data["beneficiarios"]){
					let parentezco = beneficiario["PARENTEZCO"];               
					let codRua = beneficiario["CODRUA"];
					let documento = beneficiario["DOCUMENTO"];
					let estado = beneficiario["ESTADO"];
					let nombre = beneficiario["PRINOM"] + ' ' + beneficiario["SEGNOM"] + ' ' + beneficiario["PRIAPE"]+ ' ' + beneficiario["SEGAPE"];
					console.log( beneficiario);                
					createLineaBeneficiario(parentezco,codRua,documento,estado,nombre);        
			}
			for(let beneficiario of data["conyugues"]){
					let parentezco = beneficiario["PARENTEZCO"];               
					let codRua = beneficiario["CODRUA"];
					let documento = beneficiario["DOCUMENTO"];
					let estado = beneficiario["ESTADO"];
					let nombre = beneficiario["PRINOM"] + ' ' + beneficiario["SEGNOM"] + ' ' + beneficiario["PRIAPE"]+ ' ' + beneficiario["SEGAPE"];
					console.log( beneficiario);                
					createLineaBeneficiario(parentezco,codRua,documento,estado,nombre);        
			}		  		  
    })   
}    


btnBack.addEventListener("click", fncIrPantallaPrincipal);

window.addEventListener('load', function () {
    fncPresentLoading();
    const docConsulta = this.localStorage.getItem("appDoc");
    if (fncIsEmpty(docConsulta)) {
      fncPresentAlert();
      return;
    }
    consultarGrupoFamiliar(docConsulta);
  }); 