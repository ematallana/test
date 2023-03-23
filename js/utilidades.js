export const fncPresentAlert = () => {
    const alert = document.createElement("ion-alert");
    alert.header = "Invalid Data";
    alert.subHeader = "Please verify your input";
    alert.message = "Incorrect Name or Price";
    alert.buttons = ["OK"];
  
    document.body.appendChild(alert);
    return alert.present();
  };

export async function fncPresentLoading() {
  const loading = document.createElement('ion-loading');

  loading.cssClass = 'my-custom-class';
  loading.message = 'Por Favor Espere...Estoy trabajando, aunque no me creas!';
  loading.duration = 1000;
  document.body.appendChild(loading);
  await loading.present();
  const { role, data } = await loading.onDidDismiss();
  //console.log('Loading dismissed!');
}      

export const fncIrPantallaPrincipal = () => {
    window.location.href = '../index.html';
};    

export const fncIrPagina = (pagina) => {
  window.location.href = pagina;
};

export const fncPresentToast = (mensaje) => {         
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2000;
    toast.position = 'top'; 
    document.body.appendChild(toast);
    return toast.present();
}  

//export const fncIsEmpty = str => !str.trim().length;
export const fncIsEmpty = (dato) => {    
        console.log('dato '+ dato); 
    if(dato==null)
       return false
    else       
       return !dato.trim().length;
}  