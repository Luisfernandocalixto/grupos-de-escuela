export const contentOfForm = ({ name, fatherLastName, motherLastName, maxValor }) => {
    return (
        `
<div class="d-grid justify-content-center align-items-center">
       <h4 class="mt-3 text-white">${name} ${fatherLastName} ${motherLastName}</h4>
       <h4 class="text-center text-white">Ingrese la calificación : </h4>
       <input type="number" step="0.1" min="0" max="${maxValor}" id="swal-input-1" class="swal2-input" value=""
              placeholder="Ejemplo:10" required>
       <div id="swal-validation-message" class="text-danger mt-2"></div>
</div>    `
    );

}

export const isTable = ({ data }) => {
    
    return (
        `
        <table class="table">
            <thead align="center">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido paterno</th>
                    <th scope="col">Apellido materno</th>
                    <th scope="col">Calificación</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody align="center">
                ${
                    data.map(s => `<tr>${s}</tr>`).join("\n")
                }
            </tbody>
        </table>
`
    );

}
export const isFragmentTr = ({ data }) => {

    return (
        `      <tr>
               <th scope="row"></th>
               <td>${data.name}</td>
               <td>${data.fatherLastName}</td>
               <td>${data.motherLastName}</td>
               <td>${data.note_value}</td>
               <td>${data.dateOfNote}</td>
               <td>
                   <button class="btn btn-primary addNote swal2-styled swal2-confirm" data-id="${data.id}"
                       data-name="${data.name}" data-fatherlastname="${data.fatherLastName}"
                            data-motherlastname="${data.motherLastName}" data-note_id="${data.note_id}"
                            data-group_id="${data.group_id}">
                       Calificar
                   </button>
               </td>
           </tr>
`
    );

}


