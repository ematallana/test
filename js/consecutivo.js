const btnBack = document.querySelector("#btnBack");
const selectuis = document.querySelector("#selectuis");
const btnSincronizar = document.querySelector("#btnSincronizar");

const isEmpty = str => !str.trim().length;
var codigoPunto = null;
var nombrePunto = null;


const consultarGirados = () => {      
    let url= "http://enlinea.comfacauca.com/accesoweb/wbs/wsConsecutivosEM.php/";      
    console.log(url);
    

    fetch(url)
      .then(response => response.json())
      .then(data => {                
          //console.log(data);
          //codigoPunto = data;
          console.log('=====================================');
          selectuis.innerHTML = '';
          for (let i in data) {
            for (let j in data[i]) {
                //console.log( data[i][j]);
                let objeto = data[i][j]; 
                let tam = Object.keys(objeto).length;
                if(tam == 3){
                	let punto = objeto["PUNTO"];
                	let nompunto = objeto["DETALLE"];                
                	//console.log( objeto);                
                	createItemInfraestructura(punto,nompunto);              
            	}

            }
          }      
    })   
}    

const sincronizarConsecutivo = (codPunto) => {      
    let url= "http://enlinea.comfacauca.com/accesoweb/wbs/wsConsecutivosEM.php/"+codPunto;      
    console.log(url);    

    fetch(url)
      .then(response => response.json())
      .then(data => {                                    
          //alert(data["codPunto"]);
              let punto = data["codPunto"];
              alert("PUNTO SINCRONIZADO : " + punto );
  	     })   
}    


const createItemInfraestructura = (punto,nompunto) => {
    const ionItemSelectOption = document.createElement('ion-select-option');   
    ionItemSelectOption.value = punto;
    ionItemSelectOption.textContent = nompunto;
    ionItemSelectOption.style ='font-size:4px;';
    selectuis.appendChild(ionItemSelectOption);
    
  };  

const irAtras = () => {
    window.location.href = 'index.html';
  };   
  
async function presentLoading() {
  const loading = document.createElement('ion-loading');

  loading.cssClass = 'my-custom-class';
  loading.message = 'Por Favor Espere...';
  loading.duration = 2000;

  document.body.appendChild(loading);
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}

  
selectuis.addEventListener("ionChange", function ($event) {	
    codigoPunto = $event.target.value;
    nombrePunto = $event.target.textContent;
    btnSincronizar.disabled  = false;
});

btnBack.addEventListener("click", irAtras);

window.addEventListener('load', function () {
    presentLoading();
    const docConsulta = this.localStorage.getItem("appDoc");
    if (isEmpty(docConsulta)) {
      presentAlert();
      return;
    }
    consultarGirados();
    btnSincronizar.disabled  = true;
    console.log(codigoPunto);

  }); 

btnSincronizar.addEventListener('click', function ($event) { 
    presentLoading();
    sincronizarConsecutivo(codigoPunto);
});
 

  