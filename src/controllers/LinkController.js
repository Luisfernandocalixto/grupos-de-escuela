const { client } = require("../views/model/db.js");
// pool --> pool.query
// client --> client.execute

// formateador de fecha 
// obtener miércoles, 15 de mayo de 2024, 20:13
const formatearDate = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short"
})

const formatoLocalFecha = new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
})

class LinkController {

    static async index(req, res) {
        try {
            const infoMaestro = await client.execute({
                sql: `SELECT * FROM maestros WHERE maestro_id = ?`,
                args: [1],
            })
            const grupos = await client.execute({
                sql: `SELECT g.grupo_id, g.nombre FROM grupos AS g
        INNER JOIN asignacion AS a ON  a.grupo_id = g.grupo_id
        INNER JOIN  maestros AS m ON m.maestro_id = a.maestro_id
        WHERE a.maestro_id = ?
        GROUP BY g.grupo_id, g.nombre 
        ORDER BY g.grupo_id, g.nombre;`,
                args: [infoMaestro.rows[0].maestro_id]
            });

            res.render('components/inicio', { grupos: grupos.rows, infoMaestro: infoMaestro.rows[0] });
        } catch (error) {
            console.error('Error', error);
            res.status(500).send("Error interno del servidor")
        }
    }

    static async getGroup(req, res) {
        try {
            const datoGrupo = req.params.grupo_id;
            const infoInicial = await client.execute({
                sql: `SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion 
        FROM alumnos AS a
        LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
        WHERE grupo_id = ?
        GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion
        ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion;`,
                args: [datoGrupo]
            });


            const infoIterable = infoInicial.rows;
            const grupoAlumnos = infoIterable.map((item) => {
                let formato
                if (item.fecha_calificacion != null) {
                    // obtener la forma de [ "miércoles", "15 de mayo de 2024", "20:13" ]
                    // a miércoles, 15 de mayo de 2024
                    // formato = formatearDate.format(item.fecha_calificacion).split(",").slice(0, 1).join(",")
                    let fecha = item.fecha_calificacion.split("/").reverse().join("-")
                    // obtener 2024-05-18 23:13
                    // const fechaObtenida = new Date(fecha)
                    // console.log(fecha);
                    // const formatoFecha = formatearDate.format(Date(fecha))
                    // obtener sábado, 18 de mayo de 2024, 23:13
                    // formato = formatoFecha.split(",").slice(0, 2).join(",")
                    formato = fecha;
                    // mostrar sábado, 18 de mayo de 2024
                }
                else {
                    formato = null
                }

                return {
                    alumno_id: item.alumno_id,
                    nombre: item.nombre,
                    apellido_paterno: item.apellido_paterno,
                    apellido_materno: item.apellido_materno,
                    grupo_id: item.grupo_id,
                    calificacion_id: item.calificacion_id,
                    valor: item.valor,
                    fecha_calificacion: formato
                }
            })

            res.render('components/grupos', { grupoAlumnos });
        } catch (error) {
            console.error('Error', error);
            res.status(500).send("Error interno del servidor")
        }
    }



    static async postGroup(req, res) {
        try {
            const uuid = req.body.uuid;
            const uuidGroup = req.body.uuidGroup;
            const $input = req.body.$input;
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            const fechaAsignacion = formatoLocalFecha.format(hoy)


            const insercion = { alumno_id: uuid, valor: $input }
            const existeRegistro = await client.execute({
                sql: 'SELECT * FROM calificaciones WHERE alumno_id = ?;',
                args: [uuid]
            });

            if (existeRegistro.rows.length > 0) {
                await client.execute({
                    sql: `UPDATE calificaciones SET valor = ?, fecha_calificacion = ? WHERE calificacion_id = ?`,
                    args: [$input, fechaAsignacion, existeRegistro.rows[0].calificacion_id]
                })
            }
            else {
                await client.execute({
                    sql: `INSERT INTO calificaciones (valor, alumno_id, fecha_calificacion) VALUES (?,?,?)`,
                    args: [insercion.valor, insercion.alumno_id, fechaAsignacion]
                })
            }
            const grupoAlumnos = await client.execute({
                sql: `SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor 
            FROM alumnos AS a
            LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
            WHERE grupo_id = ?
            GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor
            ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor;`,
                args: [uuidGroup]
            })

            res.json({ success: true, message: 'Calificaciones guardadas correctamente', grupoAlumnos: grupoAlumnos.rows })
        } catch (error) {
            console.error('Error', error);
            res.status(500).send("Error interno del servidor")
        }
    }

    static async getInformation(req, res) {
        try {
            const uuidGroup = req.params.uuidGroup;
            const infoInicial = await client.execute({
                sql: `SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion 
        FROM alumnos AS a
        LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
        WHERE grupo_id = ?
        GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion
        ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion;`,
                args: [uuidGroup]
            })



            const grupoAlumnos = infoInicial.rows.map((item) => {

                let formato
                if (item.fecha_calificacion != null) {

                    // formato = formatearDate.format(item.fecha_calificacion).split(",").slice(0, 2).join(",")
                    let fecha = item.fecha_calificacion.split("/").reverse().join("-")
                    // obtener 2024-05-18 23:13

                    // const fechaObtenida = new Date(fecha)
                    // const formatoFecha = formatearDate.format(fechaObtenida)
                    // obtener sábado, 18 de mayo de 2024, 23:13
                    formato = fecha

                }
                else {
                    formato = null
                }

                return {
                    alumno_id: item.alumno_id,
                    nombre: item.nombre,
                    apellido_paterno: item.apellido_paterno,
                    apellido_materno: item.apellido_materno,
                    grupo_id: item.grupo_id,
                    calificacion_id: item.calificacion_id,
                    valor: item.valor,
                    fecha_calificacion: formato
                }
            })

            const seccionar = true;
            res.render('components/gruposAlter', { grupoAlumnos, seccionar: seccionar })
        } catch (error) {
            console.error('Error', error);
            res.status(500).send("Error interno del servidor")
        }
    }


}

module.exports = {
    LinkController
};
