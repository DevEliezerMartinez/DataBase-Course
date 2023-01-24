

console.log("hola mundo");

const api = "http://localhost:8080/modelos"


const consultar = () => {
  fetch(api)
    .then(response => response.json())
    .then(data => render(data))
    .catch((err) => { console.error(err); });
}

insertar =()=> {
let conteinerInputs = document.getElementsByClassName('add');
let valores = []
for (const myelement of conteinerInputs) {
  valores.push(myelement.value)
}
console.log(valores);
let apiPOST = `http://localhost:8080/motocicletas?id=${valores[0]}&modelo=${valores[1]}&año=${valores[2]}&variante=${valores[3]}`


fetch(apiPOST, {
  method: "POST",
  //headers: { "Content-type": "application/json; charset=UTF-8" }
})
  .then(response => response)
  .then(json => console.log(json))
  .catch ((err) => console.log(err));



}

modificar = () => {

 


  let idObjetivo = document.getElementById('floatingSelectGrid').value;
  let nuevaVariante = document.getElementById('exampleFormControlInput1').value;

  if (idObjetivo == 0 || nuevaVariante == "") { return alert("Ingrese valores correctos en el formulario"); }

 
  let apiPatch =`http://localhost:8080/modelos/${idObjetivo}/${nuevaVariante}`;
 
  console.log("Turbo: --- apiPatch", apiPatch);

  fetch(apiPatch, {
    method: "PATCH",
    //headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => response)
    .then(json => console.log(json))
    .catch ((err) => console.log(err));

}

eliminar = () =>{

 
  let contenedorRadius=document.getElementsByClassName('form-check-input me-1');
  let selectedSize = "";
   for (const radius of contenedorRadius) {
      
       if (radius.checked) {
           selectedSize = radius.value;
           console.log("Turbo: --- selectedSize", selectedSize);
            break;
         }
            }

    if (selectedSize == "") {console.error("No se selecciono ninguno");}

    let apiDelete =`http://localhost:8080/modelos/${selectedSize}`;

    

    fetch(apiDelete, {
      method: "DELETE",
      //headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response)
      .then(json => console.log(json))
      .catch ((err) => console.log(err));
 
            
}

render = (datos) => {
  console.log(datos);

  let conteinerSelect = document.getElementById('floatingSelectGrid');
  let container = document.getElementById('olConsulta');
  let containerDelete = document.getElementById('ulDelete')


  datos.forEach(unidad => {

    let option = new Option(`${unidad.id}`, `${unidad.id}`);
    conteinerSelect.appendChild(option);

    let element = document.createElement('li');
    let classe = document.createAttribute("class");
    classe.value = "objetivoLista list-group-item d-flex justify-content-between align-items-start";
    element.setAttributeNode(classe);

    element.innerHTML = `
      <div class="ms-2 me-auto">
      <div class="fw-bold"><span class="modelo">${unidad.modelo}</span></div>
      <span class="id">ID: ${unidad.id}</span>
      <span class="variante">Variante: ${unidad.variante}</span><br>
      <span class="marca">Año: ${unidad.año} </span>
      </div>
      `;

      // ** ------------

      let elementRadius = document.createElement('li');
      let classeRadius = document.createAttribute("class");
      classeRadius.value = "list-group-item list-group-item-action list-group-item-danger";
      elementRadius.setAttributeNode(classeRadius);

      elementRadius.innerHTML = `
      <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${unidad.id}" id="firstRadio" >
      <label class="form-check-label" for="firstRadio">ID: ${unidad.id} Modelo: ${unidad.modelo}</label>
      `;

    container.appendChild(element);
    containerDelete.appendChild(elementRadius);
  });











}


consultar();

