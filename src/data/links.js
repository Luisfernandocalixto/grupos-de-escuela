const queryStudentWithNote = `
SELECT
  a.id,
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.id AS note_id,
  c.note_value,
  c.dateOfNote
FROM
  students AS a
  LEFT JOIN notes AS c ON c.student_id = a.id
WHERE
  a.id = ?
GROUP BY
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.note_id,
  c.note_value,
  c.dateOfNote
ORDER BY
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.note_id,
  c.note_value,
  c.dateOfNote;`;

// by index 
const queryGroups = `SELECT
                g.id,
                g.name
                FROM
                groupsOfStudents AS g
              INNER JOIN assignment AS a ON a.group_id = g.id
              INNER JOIN teachers AS m ON m.id = a.teacher_id
              WHERE
              a.teacher_id = ?
              GROUP BY
              g.group_id,
              g.name
            ORDER BY
            g.group_id,
            g.name;`;
const queryGroup = `SELECT
  a.id AS id,
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.id AS note_id,
  c.note_value,
  c.dateOfNote
FROM
  students AS a
  LEFT JOIN notes AS c ON c.student_id = a.id
WHERE
  a.group_id = ?
GROUP BY
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.note_id,
  c.note_value,
  c.dateOfNote
ORDER BY
  a.name,
  a.fatherLastName,
  a.motherLastName,
  a.group_id,
  c.note_id,
  c.note_value,
  c.dateOfNote;`;


module.exports = {
  queryStudentWithNote,
  queryGroups,
  queryGroup,
};
