// document.addEventListener('click', async function (event) {
//     const addNote = event.target.closest('.addNote');

//     const name = addNote.dataset.name;
//     const lastname = addNote.dataset.lastname;
//     const lastnamemattern = addNote.dataset.lastnamemattern;
//     const uuid = addNote.dataset.uuid;
//     const uuidCalificacion = addNote.dataset.uuidCalificacion;
//     const uuidGroup = addNote.dataset.uuidg;
//     const maxValor = 10;



//     if (addNote) {
//         const swalHTML = `
//                 <div style="display:grid; justify-content:center; color:#fff !important; align-items:center;">
//                 <h4 class="mt-3">${name} ${lastname} ${lastnamemattern}</h4>
//                 <h4 style="text-align:center;" >Ingrese la calificación  : </h4>
//                 <input type="number" step="0.1" min="0" max="${maxValor}" id="swal-input-1" class="swal2-input" value="" placeholder="Ejemplo:10" required>
//                 <div id="swal-validation-message" style="color: red; margin-top: 5px;"></div>
//                 </div>`;

//                 Swal.fire({
//                     title: "Asignando calificación",
//                     html: swalHTML,
//                     focusConfirm: false,
//                     showDenyButton: true,
//                     background: '#31313a',
//                     showCancelButton: false,
//                     confirmButtonText: "Guardar",
//                     denyButtonText: `No guardar`,
//                     preConfirm: () => {
//                         const $input = document.getElementById('swal-input-1').value;
//                         const validationMessage = document.getElementById('swal-validation-message');
//                         let message = {
//                             messageNull: "Debe ingresar un valor entre 0-10",
//                             messageMin: "La calificación no debe ser menor a 0",
//                             messageMax: "La calificación no deber ser mayor a 10",
//                 }
//                 if ($input.trim() === "" || $input < 0 || $input > maxValor) {
//                     validationMessage.innerHTML = "Calificación ingresada no válida", message.messageNull, message.messageMin, message.messageMax
//                     return false;
//                 }
//                 validationMessage.innerHTML = "";

//                 return { uuid, $input, uuidCalificacion, uuidGroup }
//             }
//         }).then((result) => {
//             /* Read more about isConfirmed, isDenied below */
//             if (result.isConfirmed) {
//                 fetch('/grupos/:sectionABS/:grupo_id/:SCD', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(result.value),
//                 })
//                 .then((response) => response.json())
//                 .then((responseData) => {
//                     if (responseData.success) {

//                             let tablaHTML = `
//                                 <div class="table-responsive">
//                                 <table class="table" align="center">
//                                 <thead>
//                                 <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Nombre</th>
//                                 <th scope="col">Apellido paterno</th>
//                                 <th scope="col">Apellido materno</th>
//                                 <th scope="col">Calificación</th>
//                                 <th scope="col">Opciones</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>`;

//                             responseData.grupoAlumnos.forEach((alumno, index) => {
//                                 tablaHTML += `<tr>
//                                 <th scope="row"></th>
//                                 <td>${alumno.nombre}</td>
//                                 <td>${alumno.apellido_paterno}</td>
//                                 <td>${alumno.apellido_materno}</td>
//                                 <td>${alumno.valor ? alumno.valor : '' || alumno.valor === null ? '': alumno.valor }</td>
//                                 <td>
//                                 <button class="btn btn-primary addNote" data-uuid="${alumno.alumno_id}" data-name="${alumno.nombre}"
//                                 data-lastname="${alumno.apellido_paterno}" data-lastnamemattern="${alumno.apellido_materno}"
//                                 data-uuidCalificacion="${alumno.calificacion_id}" data-uuidg="${alumno.grupo_id}">Calificar</button>
//                                 </td>
//                                 </tr>`;
//                             });

//                             tablaHTML += `
//                                 </tbody>
//                                 </table>
//                                 </div>`;

//                             document.getElementById('tabla-alumnos').innerHTML = tablaHTML;

//                             Swal.fire('Éxito', "<p style='color:#fff;'>" + responseData.message + "</p>", 'success');
//                         } else {
//                             Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error al enviar los datos al servidor', error);
//                         Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
//                     })
//             } else if (result.isDenied) {
//                 Swal.fire('Cancelado', '<p style="color:#fff;">No se guardaron los cambios</p>', 'info');
//             }
//         });
//     }
// });

document.addEventListener('click', async function (event) {
    const addNote = event.target.closest('.addNote');

    const name = addNote.dataset.name;
    const lastname = addNote.dataset.lastname;
    const lastnamemattern = addNote.dataset.lastnamemattern;
    const uuid = addNote.dataset.uuid;
    const uuidCalificacion = addNote.dataset.uuidCalificacion;
    const uuidGroup = addNote.dataset.uuidg;
    const maxValor = 10



    if (addNote) {
        const swalHTML = `
                <div style="display:grid; justify-content:center; color:#fff !important; align-items:center;">
                    <h4 class="mt-3">${name} ${lastname} ${lastnamemattern}</h4>
                    <h4 style="text-align:center;" >Ingrese la calificación  : </h4>
                    <input type="number" step="0.1" min="0" max="${maxValor}" id="swal-input-1" class="swal2-input" value="" placeholder="Ejemplo:10" required>
                    <div id="swal-validation-message" style="color: red; margin-top: 5px;"></div>
                </div>`;

        Swal.fire({
            title: "Asignando calificación",
            html: swalHTML,
            focusConfirm: false,
            showDenyButton: true,
            background: '#31313a',
            showCancelButton: false,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
            preConfirm: () => {
                const $input = document.getElementById('swal-input-1').value;
                const validationMessage = document.getElementById('swal-validation-message');
                let message = {
                    messageNull: "Debe ingresar un valor entre 0-10",
                    messageMin: "La calificación no debe ser menor a 0",
                    messageMax: "La calificación no deber ser mayor a 10",
                }
                if ($input.trim() === "" || $input < 0 || $input > maxValor) {
                    validationMessage.innerHTML = "Calificación ingresada no válida", message.messageNull, message.messageMin, message.messageMax
                    return false;
                }
                validationMessage.innerHTML = "";

                return { uuid, $input, uuidCalificacion, uuidGroup }
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch('/grupos/:sectionABS/:grupo_id/:SCD', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result.value),
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.success) {
                            // document.getElementById('tabla-alumnos').innerHTML = tablaHTML;
                            Swal.fire('Éxito', "<p style='color:#fff;'>" + responseData.message + "</p>", 'success');
                        } else {
                            Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
                        }
                        // 
                        fetch(`/informacion/${uuidGroup}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Error al obtener datos del servidor');
                                }
                                return response.text();
                            })
                            .then(data => {
                                document.getElementById('tabla-alumnos').innerHTML = data;
                            })
                            .catch(error => {
                                console.error('Error en la solicitud Fetch:', error);
                            });

                        // 

                    })
                    .catch((error) => {
                        console.error('Error al enviar los datos al servidor', error);
                        Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
                    })
            } else if (result.isDenied) {
                Swal.fire('Cancelado', '<p style="color:#fff;">No se guardaron los cambios</p>', 'info');
            }
        });
    }
});


// document.addEventListener('click', async function (event) {
//     const addNote = event.target.closest('.addNote');

//     const name = addNote.dataset.name;
//     const lastname = addNote.dataset.lastname;
//     const lastnamemattern = addNote.dataset.lastnamemattern;
//     const uuid = addNote.dataset.uuid;
//     const uuidCalificacion = addNote.dataset.uuidCalificacion;
//     const uuidGroup = addNote.dataset.uuidg;
//     const maxValor = 10

//     console.table(name);


//     if (addNote) {
//         const swalHTML = `
//                 <div style="display:grid; justify-content:center; color:#fff !important; align-items:center;">
//                     <h4 class="mt-3">${name} ${lastname} ${lastnamemattern}</h4>
//                     <h4 style="text-align:center;" >Ingrese la calificación  : </h4>
//                     <input type="number" step="0.1" min="0" max="${maxValor}" id="swal-input-1" class="swal2-input" value="" placeholder="Ejemplo:10" required>
//                     <div id="swal-validation-message" style="color: red; margin-top: 5px;"></div>
//                 </div>`;

//         Swal.fire({
//             title: "Asignando calificación",
//             html: swalHTML,
//             focusConfirm: false,
//             showDenyButton: true,
//             background: '#31313a',
//             showCancelButton: false,
//             confirmButtonText: "Guardar",
//             denyButtonText: `No guardar`,
//             preConfirm: () => {
//                 const $input = document.getElementById('swal-input-1').value;
//                 const validationMessage = document.getElementById('swal-validation-message');
//                 let message = {
//                     messageNull: "Debe ingresar un valor entre 0-10",
//                     messageMin: "La calificación no debe ser menor a 0",
//                     messageMax: "La calificación no deber ser mayor a 10",
//                 }
//                 if ($input.trim() === "" || $input < 0 || $input > maxValor) {
//                     validationMessage.innerHTML = "Calificación ingresada no válida", message.messageNull, message.messageMin, message.messageMax
//                     return false;
//                 }
//                 validationMessage.innerHTML = "";

//                 return { uuid, $input, uuidCalificacion, uuidGroup }
//             }
//         }).then((result) => {
//             /* Read more about isConfirmed, isDenied below */
//             if (result.isConfirmed) {
//                 fetch('/grupos/:sectionABS/:grupo_id/:SCD', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(result.value),
//                 })
//                     .then((response) => response.json())
//                     .then((responseData) => {
//                         if (responseData.success) {
//                             let tablaHTML = `
//                                 <div class="table-responsive">
//                                 <table class="table" align="center">
//                                 <thead>
//                                 <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Nombre</th>
//                                 <th scope="col">Apellido paterno</th>
//                                 <th scope="col">Apellido materno</th>
//                                 <th scope="col">Calificación</th>
//                                 <th scope="col">Opciones</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>`;

//                             responseData.grupoAlumnos.forEach((alumno, index) => {
//                                 tablaHTML += `<tr>
//                                 <th scope="row"></th>
//                                 <td>${alumno.nombre}</td>
//                                 <td>${alumno.apellido_paterno}</td>
//                                 <td>${alumno.apellido_materno}</td>
//                                 <td>${alumno.valor ? alumno.valor : ''}</td>
//                                 <td>
//                                 <button class="btn btn-primary addNote" data-uuid="${alumno.alumno_id}" data-name="${alumno.nombre}"
//                                 data-lastname="${alumno.apellido_paterno}" data-lastnamemattern="${alumno.apellido_materno}"
//                                 data-uuidCalificacion="${alumno.calificacion_id}" data-uuidg="${alumno.grupo_id}">Calificar</button>
//                                 </td>
//                                 </tr>`;
//                             });

//                             tablaHTML += `
//                                 </tbody>
//                                 </table>
//                                 </div>`;

//                             document.getElementById('tabla-alumnos').innerHTML = tablaHTML;

//                             Swal.fire('Éxito', "<p style='color:#fff;'>" + responseData.message + "</p>", 'success');
//                         } else {
//                             Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error al enviar los datos al servidor', error);
//                         Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
//                     })
//             } else if (result.isDenied) {
//                 Swal.fire('Cancelado', '<p style="color:#fff;">No se guardaron los cambios</p>', 'info');
//             }
//         });
//     }
// });
