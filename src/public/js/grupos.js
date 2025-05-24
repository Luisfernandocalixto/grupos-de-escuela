document.addEventListener('DOMContentLoaded', function () {

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
                /* Realizar el envio de la evaluación */
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
                                // Mostrar mensaje de exito;
                                Swal.fire('Éxito', "<p style='color:#fff;'>" + responseData.message + "</p>", 'success');
                            } else {
                                Swal.fire('Error', "<p style='color:#fff;'>Hubo un problema al enviar los datos</p>", 'error');
                            }
                            // Realizando fetch para consultar la informacion actualizada
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

    const itemsGroup = document.querySelector('.sectionGroups');
    const items = itemsGroup.querySelectorAll('.mark-as-read');
    const localItems = Array.from(items).map(item => `      <div class="mark-as-read">
${item.innerHTML}
      </div>
`).join('');

    localStorage.setItem('showGroups', JSON.stringify(localItems));




});