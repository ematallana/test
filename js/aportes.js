import {fncPresentAlert, fncPresentLoading, fncIrPantallaPrincipal, fncPresentToast, fncIsEmpty} from '../js/utilidades.js';
import {urlSecretAportes} from '../js/module.js';

const listaGirados = document.querySelector("#listaGirados");
const tablaGirados = document.querySelector("#tablaGirados");
const contentGirados = document.querySelector("#contentAportes");
const btnBack = document.querySelector("#btnBack");

const createLineaPagado = (periodo,nit,nombre,salbas,diatra) => {
    const ionItem = document.createElement('ion-item');
    const ionIcon = document.createElement('ion-icon');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const e = document.createElement('p');
    ionIcon.name ="logo-usd";   

    const item1 = document.createElement('ion-item');
    const item2 = document.createElement('ion-item');
    const ionLabelRazon = document.createElement('ion-label');
    const ionLabelNit = document.createElement('ion-label');
    const ionLabelPeriodo = document.createElement('ion-label');
    const ionLabelSalario = document.createElement('ion-label');
    const ionLabelDias = document.createElement('ion-label');
    ionLabelRazon.textContent = nombre;
    ionLabelRazon.style ='font-size:10px;';
    ionLabelRazon.color ='primary';    
    ionLabelNit.textContent = nit;
    ionLabelNit.style ='font-size:10px;';
    ionLabelNit.color ='primary';
    ionLabelNit.slot = "end";
    ionLabelPeriodo.textContent = periodo;
    ionLabelSalario.textContent = ' $' +salbas;
    ionLabelDias.textContent = '# ' +diatra;    
    ionLabelDias.slot = "end";
    item1.appendChild(ionLabelRazon);    
    item1.appendChild(ionLabelNit);    
    item2.appendChild(ionLabelPeriodo);    
    item2.appendChild(ionLabelSalario);   
    item2.appendChild(ionLabelDias);       
    contentAportes.appendChild(item1); 
    contentAportes.appendChild(item2);     
  };  


const consultarGirados = (docSearch) => {      
    let url= urlSecretAportes+docSearch; 
    fetch(url)
      .then(response => response.json())
      .then(data => {     
          contentGirados.innerHTML = '';
          for (let i in data) {
            for (let j in data[i]) {
                let objeto = data[i][j];                
                let periodo = objeto["PERAPO"];
                let nit = objeto["NIT"];
                let nombre = objeto["RAZPLA"];
                let salbas = objeto["SALBAS"];
                let diatra = objeto["DIATRA"];
                createLineaPagado(periodo,nit,nombre,salbas,diatra);              
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
}); 