import {fncPresentAlert, fncPresentLoading, fncIrPantallaPrincipal, fncPresentToast, fncIsEmpty} from '../js/utilidades.js';
import {urlSecretCuotaMonetaria} from '../js/module.js';

const listaGirados = document.querySelector("#listaGirados");
const tablaGirados = document.querySelector("#tablaGirados");
const contentGirados = document.querySelector("#contentGirados");
const btnBack = document.querySelector("#btnBack");

const createLineaPagado = (periodo, valor, motivo) => { 

    const item = document.createElement('ion-item');
    const ionIconX = document.createElement('ion-icon');    
    ionIconX.name ="logo-buffer";
    const ionLabel1 = document.createElement('ion-label');
    const ionLabel2 = document.createElement('ion-label');
    const ionLabel3 = document.createElement('ion-label');
    const ionBadge = document.createElement('ion-badge');
    const ionButton = document.createElement('ion-button');
    if(motivo == "PAGADO"){
        ionBadge.color="success";
        ionBadge.textContent = motivo;
        ionButton.color="success";
        ionButton.textContent = motivo;
    }else{
        ionButton.id ="btnMotivo";
        ionButton.name ="btnMotivo";
        ionButton.color="warning";
        ionButton.textContent = 'NO PAGADO';
        ionButton.title = motivo;
    }
    ionLabel1.textContent = periodo;
    ionLabel2.textContent = "$ "+valor;    
    ionLabel3.style ='font-size:6px;';
    ionLabel3.textContent = motivo;
    item.appendChild(ionIconX);
    item.appendChild(ionLabel1);
    item.appendChild(ionLabel2);
    //item.appendChild(ionLabel3);
    item.appendChild(ionButton);    
    contentGirados.appendChild(item);     
  };  

const consultarGirados = (docSearch) => {      
    let url= urlSecretCuotaMonetaria +docSearch;      
    fetch(url)
      .then(response => response.json())
      .then(data => {                
          //console.log(data);
          contentGirados.innerHTML = '';
          for (let i in data) {
            for (let j in data[i]) {
                //console.log( data[i][j]);
                let objeto = data[i][j];                
                let periodo = objeto["PERIODO"];
                let valor = objeto["VALOR"];
                let motivo = objeto["MOTIVO"];
                //console.log( objeto);                
                createLineaPagado(periodo,valor,motivo);              
            }
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
    consultarGirados(docConsulta);
    const btnMotivo = document.querySelector("#btnMotivo");
}); 

window.addEventListener('click', function ($event) { 
  if($event.srcElement.id == "btnMotivo"){
      fncPresentToast($event.srcElement.title);
  }
});