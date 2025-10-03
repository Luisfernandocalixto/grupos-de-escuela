import { contentOfForm, isFragmentTr, isTable } from "/js/template/groups.js";
document.addEventListener('DOMContentLoaded', function () {
    const contentTable = document.querySelector('.contentTable');

    document.addEventListener('click', function (event) {
        const addNote = event.target.closest('.addNote');


        if (addNote) {

            const name = addNote.dataset.name;
            const fatherLastName = addNote.dataset.fatherlastname;
            const motherLastName = addNote.dataset.motherlastname;
            const id = addNote.dataset.id;
            const note_id = addNote.dataset.note_id;
            const group_id = addNote.dataset.group_id;
            const maxValor = 10;


            Swal.fire({
                title: "Asignando calificación",
                html: contentOfForm({ name, fatherLastName, motherLastName, maxValor }),
                focusConfirm: false,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Guardar",
                denyButtonText: `No guardar`,
                preConfirm: () => {
                    const note = document.getElementById('swal-input-1').value;
                    const validationMessage = document.getElementById('swal-validation-message');
                    let message = {
                        messageNull: "Debe ingresar un valor entre 0-10",
                        messageMin: "La calificación no debe ser menor a 0",
                        messageMax: "La calificación no deber ser mayor a 10",
                    }
                    if (note.trim() === "" || note < 0 || note > maxValor) {
                        validationMessage.innerHTML = "Calificación ingresada no válida", message.messageNull, message.messageMin, message.messageMax
                        return false;
                    }
                    validationMessage.innerHTML = "";

                    return { id, note, note_id, group_id }
                }
            }).then((result) => {
                /* send evaluation */
                if (result.isConfirmed) {
                    fetch('/group', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result.value),
                    })
                        .then((response) => {
                            if (response.ok) {
                                // Show message of exit or error
                                Swal.fire('Éxito', "<p class='text-white'>Calificaciones guardadas correctamente</p>", 'success');
                            } else {
                                Swal.fire('Error', "<p class='text-white' >Hubo un problema al enviar los datos</p>", 'error');
                            }

                            return response.json()
                        })
                        .then((responseData) => {
                            const { student } = responseData;
                            if (student) {
                                const cellsOfTable = document.querySelectorAll('tbody tr');
                                const isData = Array.from(cellsOfTable).map(s => s.innerHTML);
                                const prop = `data-id="${id}"`;
                                const searchElem = isData.find(e => e.includes(prop));
                                const isElem = `${isFragmentTr({ data: student })}`;
                                const updateElem = searchElem.replace(searchElem, isElem);
                                const updateData = isData.map(s => {
                                    if (s.includes(`data-id="${id}"`)) {
                                        return updateElem;
                                    }
                                    return s;
                                });

                                contentTable.innerHTML = isTable({ data: updateData })


                            }
                        })
                } else if (result.isDenied) {
                    Swal.fire('Cancelado', '<p class="text-white" >No se guardaron los cambios</p>', 'info');
                }
            });
        }
    });

    const item_groups = JSON.parse(localStorage.getItem('showGroups'));
    document.querySelector('.sectionGroups').innerHTML = item_groups;





});

