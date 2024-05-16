const express = require("express");
const router = express.Router();
const pool = require('../views/model/db.js');

// formateador de fecha 
// obtener miércoles, 15 de mayo de 2024, 20:13
const formatearDate = new Intl.DateTimeFormat("es-Mx", {
    dateStyle: "full",
    timeStyle: "short"
})

router.get("/", async (req, res) => {
    try {
        const infoMaestro = await pool.query(`SELECT * FROM maestros WHERE maestro_id = ?`, [1])

        const grupos = await pool.query(`SELECT g.grupo_id, g.nombre FROM grupos AS g
        INNER JOIN asignacion AS a ON  a.grupo_id = g.grupo_id
        INNER JOIN  maestros AS m ON m.maestro_id = a.maestro_id
        WHERE a.maestro_id = ?
        GROUP BY grupo_id, nombre 
        ORDER BY grupo_id, nombre;`, infoMaestro[0].maestro_id);

        res.render('components/inicio', { grupos, infoMaestro: infoMaestro[0] });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send("Error interno del servidor")
    }
});

router.get("/grupos/:sectionABS/:grupo_id/:SCD", async (req, res) => {
    try {
        const datoGrupo = req.params.grupo_id;
        const infoInicial = await pool.query(`SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion 
        FROM alumnos AS a
        LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
        WHERE grupo_id = ?
        GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion
        ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion;`, [datoGrupo])

        const grupoAlumnos = infoInicial.map((item) => {

            let formato
            if (item.fecha_calificacion > 0) {
                // obtener la forma de [ "miércoles", "15 de mayo de 2024", "20:13" ]
                // a miércoles, 15 de mayo de 2024
                formato = formatearDate.format(item.fecha_calificacion).split(",").slice(0, 2).join(",")
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
        const infoMaestro = await pool.query(`SELECT * FROM maestros WHERE maestro_id = ?`, [1])

        const grupos = await pool.query(`SELECT g.grupo_id, g.nombre FROM grupos AS g
        INNER JOIN asignacion AS a ON  a.grupo_id = g.grupo_id
        INNER JOIN  maestros AS m ON m.maestro_id = a.maestro_id
        WHERE a.maestro_id = ?
        GROUP BY grupo_id, nombre 
        ORDER BY grupo_id, nombre;`, infoMaestro[0].maestro_id);

        res.render('components/grupos', { grupos, grupoAlumnos });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send("Error interno del servidor")
    }
});

router.post("/grupos/:sectionABS/:grupo_id/:SCD", async (req, res) => {
    try {
        const uuid = req.body.uuid;
        const uuidGroup = req.body.uuidGroup;
        const $input = req.body.$input;


        const insercion = { alumno_id: uuid, valor: $input }
        const existeRegistro = await pool.query('SELECT * FROM calificaciones WHERE alumno_id = ?;', [uuid]);
        if (existeRegistro.length > 0) {
            await pool.query(`UPDATE calificaciones SET valor = ? WHERE calificacion_id = ?`, [$input, existeRegistro[0].calificacion_id])
        }
        else {
            await pool.query(`INSERT INTO calificaciones SET ?`, [insercion])
        }
        const grupoAlumnos = await pool.query(`SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor 
        FROM alumnos AS a
        LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
        WHERE grupo_id = ?
        GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor
        ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor;`, [uuidGroup])

        res.json({ success: true, message: 'Calificaciones guardadas correctamente', grupoAlumnos: grupoAlumnos })
    } catch (error) {
        console.error('Error', error);
        res.status(500).send("Error interno del servidor")
    }
});
router.get("/informacion/:uuidGroup", async (req, res) => {
    try {
        const uuidGroup = req.params.uuidGroup;
        const infoInicial = await pool.query(`SELECT a.alumno_id, a.nombre, a.apellido_paterno,a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion 
        FROM alumnos AS a
        LEFT JOIN calificaciones AS c ON c.alumno_id = a.alumno_id
        WHERE grupo_id = ?
        GROUP BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion
        ORDER BY a.nombre, a.apellido_paterno, a.apellido_materno, a.grupo_id, c.calificacion_id, c.valor, c.fecha_calificacion;`, [uuidGroup])

        const grupoAlumnos = infoInicial.map((item) => {

            let formato
            if (item.fecha_calificacion > 0) {

                formato = formatearDate.format(item.fecha_calificacion).split(",").slice(0, 2).join(",")
                console.log(formato);
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
});



module.exports = router;