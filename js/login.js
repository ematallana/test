  import {fncIrPagina, fncIrPantallaPrincipal, fncPresentAlert, fncPresentLoading, fncPresentToast, fncIsEmpty} from './utilidades.js';
  import {urlSecretConsulta} from './module.js';

  const btnIngresar = document.querySelector("#btnIngresar");
  const btnRegistrar = document.querySelector("#btnRegistrar");
  const txtDocumento = document.querySelector("#txtDocumento");
  const txtPassword = document.querySelector("#txtPassword");
  const divMensaje = document.querySelector("#divMensaje");

  const validarIngreso = () => {
      let doc = txtDocumento.value;
      let pas = txtPassword.value;
      if((doc==undefined)||(doc==null)||(doc=='')){
          fncPresentToast('Por favor dijite el Documento!!!');
      }else{        
          consultarAfiliado(doc);
      }
  };  
   
  const consultarAfiliado = (docSearch) => {          
      let url= urlSecretConsulta + docSearch;   
      console.log(url);
      let dato= url.includes('null'); 
      if(dato==false){ 
        fetch(url)
          .then(response => response.json())
          .then(data => {        
            let codestado = 'INDEFINIDO';
            if (data['ESTADO'] != undefined){
                codestado = data['ESTADO'] ='A' ? 'ACTIVO': data['ESTADO'] ='I' ? 'INACTIVO' : data['ESTADO'] ='M' ? 'FALLECIDO' : 'INDEFINIDO';
            }   
            console.log(codestado);             
            if(codestado=='INDEFINIDO'){            
                fncPresentToast('El Usuario NO está registrado!!!');
            }else{
                localStorage.setItem("appDoc", docSearch);            
                sessionStorage.setItem("appDoc", docSearch);            
                fncPresentToast('Bienvenido a Comfacauca App!!!');
                window.location.href = '../index.html';
            }
          })    
      }
    }

  window.addEventListener("click", function(e){
      switch(e.target.id){
        case "btnIngresar": validarIngreso();
              break; 
        case "btnRegistrar": fncIrPagina('registro.html');
              break;                         
        default: 
              break;      
      }
  });

  window.addEventListener('load', function () {    
    let documento = localStorage.getItem("appDoc");         
    let docsec = sessionStorage.getItem("appDoc");                   
    if((documento != '') && (documento != null) ){
      window.location.href = '../index.html';
    }
  });

