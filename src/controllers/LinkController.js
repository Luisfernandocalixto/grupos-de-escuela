const { queryStudentWithNote, queryGroups, queryGroup } = require("../data/links.js");
const { showDate } = require("../lib/utils.js");
const { client } = require("../views/model/db.js");
// pool --> pool.query
// client --> client.execute

class LinkController {

    static async index(req, res) {
        try {
            const infoTeacher = await client.execute({
                sql: `SELECT id, name, fatherLastName, motherLastName FROM teachers LIMIT 1;`,
                args: []
            });
            
            const groups = await client.execute({
                sql: queryGroups,
                args: [infoTeacher.rows[0].id]
            });

            
            res.render('components/index', { groups: groups.rows, infoTeacher: infoTeacher.rows[0] });
        } catch (error) {
            
            res.status(500).send("Error show page home!")
        }
    }

    static async getGroup(req, res) {
        try {
            const { id } = req.params;

            const infoTeacher = await client.execute({
                sql: `SELECT id, name, fatherLastName, motherLastName FROM teachers LIMIT 1;`,
                args: []
            });


            const infoInitial = await client.execute({
                sql: queryGroup,
                args: [id]
            });


            const infoIterable = infoInitial.rows;
            const groupStudents = infoIterable.map((item) => {
                let format
                if (item.dateOfNote != null) {
                    
                    let isDate = showDate({date:item.dateOfNote});
                    format = isDate;
                }
                else {
                    format = null
                }

                return {
                    ...item,
                    dateOfNote: format
                }
            })

            res.render('components/groups', { groupStudents,infoTeacher: infoTeacher.rows[0] });
        } catch (error) {
            
            res.status(500).send("Error show view of group!")
        }
    }



    static async postGroup(req, res) {
        try {
            const { id, note } = req.body;



            const insertNoteValue = { student_id: id, note_value: note }
            const existsRegister = await client.execute({
                sql: 'SELECT * FROM notes WHERE student_id = ?;',
                args: [id]
            });

            if (existsRegister.rows.length > 0) {

                await client.execute({
                    sql: `UPDATE notes SET note_value = ?, dateOfNote = (datetime('now')) WHERE note_id = ?`,
                    args: [note, existsRegister.rows[0].note_id]
                });
                const queryStudent = await client.execute({
                    sql: queryStudentWithNote,
                    args: [id]
                })
                const isStudent = queryStudent.rows.map(e => {
                    return {
                        ...e,
                        dateOfNote: showDate({ date: e.dateOfNote })

                    }
                });


                return res.status(200).json({ student: isStudent[0] });
            }
            else {
                await client.execute({
                    sql: `INSERT INTO notes (note_value, student_id, dateOfNote) VALUES (?,?,(datetime('now')))`,
                    args: [insertNoteValue.note_value, insertNoteValue.student_id]
                })
                const queryStudent = await client.execute({
                    sql: queryStudentWithNote,
                    args: [id]
                });
                const isStudent = queryStudent.rows.map(e => {
                    return {
                    ...e,
                    dateOfNote: showDate({ date: e.dateOfNote })

                    }
                });

                
               return res.status(200).json({student: isStudent[0] });
            }

        } catch (error) {
            res.status(500).send("Error show data of group!")
        }
    }



}

module.exports = {
    LinkController
};
