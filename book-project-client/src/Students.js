import React from 'react'

const Students = ({students,onDelete}) => {
    const studentsList = students.length ? (
       students 
    ) : (
        []
    )
    // const StudentsList = students.length ? (
    //     students.map((student) => {
    //         return (
    //             <li>{student.name}</li>
    //         )
    //     })
    // ) : (null)
    return (
       <ul>       
           { studentsList.map((student) => (
               <li onClick={() => onDelete(student.id)}>{student.name}</li>
           ) ) }
       </ul> 
    )
}

export default Students