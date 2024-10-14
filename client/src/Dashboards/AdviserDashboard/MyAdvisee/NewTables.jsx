import { useEffect, useState } from "react"


export default function NewTables() {
    const [acceptedStudents, setAcceptedStudents] = useState([]);
    
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchStudents = async () => {
            try {
              const response = await fetch(`http://localhost:5000/api/advicer/advisor-students/${user._id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              if (response.ok) {
                const data = await response.json();
                setAcceptedStudents(data.acceptedStudents);
                
              } else {
                const errorData = await response.json();
                console.error('Error fetching students:', errorData.message);
              }
            } catch (error) {
              console.error('Error fetching students:', error.message);
            }
          };
            fetchStudents();
    }, [])


    return(
        <div className="">
            {acceptedStudents?.map((item) => (
                <div className=""key={item.id} >
                    <p>{item.proposalTitle}</p>
                </div>
            ))}
        </div>
    )
}