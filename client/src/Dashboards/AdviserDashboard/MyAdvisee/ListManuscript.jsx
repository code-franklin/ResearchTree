import { useEffect, useState } from "react";
import { List, Typography, Button, Select, message } from "antd"; // Added message for notifications
import { EditOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import CkEditorDocuments from './CkEditorDocuments';
import axios from "axios"; // Importing axios for HTTP requests

const { Text } = Typography;
const { Option } = Select;

export default function NewTables() {
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // For filtering based on the course
  const [courses, setCourses] = useState([]); // To store all unique courses
  const [selectedCourse, setSelectedCourse] = useState(""); // For the selected course

  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/advicer/advisor-students/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAcceptedStudents(data.acceptedStudents);
          setFilteredStudents(data.acceptedStudents);

          // Extract unique courses from the students data
          const uniqueCourses = [
            ...new Set(data.acceptedStudents.map(student => student.course))
          ];
          setCourses(uniqueCourses);
        } else {
          const errorData = await response.json();
          console.error("Error fetching students:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };
    fetchStudents();
  }, [user._id]);

  // Handle course selection
  const handleCourseChange = (value) => {
    setSelectedCourse(value);

    if (value === "") {
      setFilteredStudents(acceptedStudents); // Show all students if no course is selected
    } else {
      setFilteredStudents(
        acceptedStudents.filter(student => student.course === value)
      );
    }
  };

  const handleViewManuscript = (studentId, channelId) => {
    setSelectedStudentId(studentId);
    setSelectedChannelId(channelId);
    setIsEditorOpen(true);
  };

  const updateManuscriptStatus = async (channelId, newStatus) => {
    try {
        const response = await axios.patch('http://localhost:5000/api/students/thesis/manuscript-status', {
            channelId, // Channel ID to find the manuscript
            manuscriptStatus: newStatus, // New status to set
        });
        
        console.log(response)
        // Handle success
    } catch (error) {
        console.error('Error updating manuscript status:', error);
    }
};

// baguhin mo
//patago
  // Function to update student status to 'ongoingrevision'
  const updateToOngoingRevision = async (studentId) => {
    try {
      const response = await fetch('http://localhost:5000/api/students/update-status/ongoingrevision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ studentId, status: 'ongoingrevision' }),
      });

      if (response.ok) {
        message.success('Status updated to Ongoing Revision');
        // Optionally, update state to reflect the status change
      } else {
        message.error('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
      message.error('Error updating status');
    }
  };

  // Function to update student status to 'onpanelist'
  const updateToOnPanelist = async (studentId) => {
    try {
      const response = await fetch('http://localhost:5000/api/students/update-status/onpanelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ studentId, status: 'onpanelist' }),
      });

      if (response.ok) {
        message.success('Status updated to On Panelist');
        // Optionally, update state to reflect the status change
      } else {
        message.error('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
      message.error('Error updating status');
    }
  };

  return (
    <div style={{ flex: '1', overflowX: 'hidden' }} className="">
      {/* Dropdown for course filtering */}
      <Select
        value={selectedCourse}
        onChange={handleCourseChange}
        style={{ marginBottom: "20px", width: "200px" }}
        placeholder="Select a course"
      >
        <Option value="">All Courses</Option>
        {courses.map(course => (
          <Option key={course} value={course}>
            {course}
          </Option>
        ))}
      </Select>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredStudents}
        renderItem={(student) => (
          <List.Item key={student._id}>
            <div
              style={{
                height: "117px",
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                backgroundColor: "#222222",
                width: "100%",
              }}
              className="hover:bg-[#2F2F2F]"
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#ffffff",
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {student.proposalTitle}
                </div>

                <Text style={{ color: "#ffffff" }}>
                  <span className="font-bold">Authors: </span>
                  {student.groupMembers
                    .map((member) =>
                      member.replace(/([a-z])([A-Z])/g, "$1 $2")
                    )
                    .join(", ")}
                </Text>

                <br />

                <Text style={{ color: "#ffffff" }}>
                  <span className="font-bold">Panelists: </span>
                  {student.panelists.join(", ")}
                </Text>
                <br />

                <div style={{ display: "flex" }}>
                  {student.submittedAt && (
                    <Text style={{ color: "#ffffff", marginRight: "10px" }}>
                      <span className="font-bold">Date Uploaded:</span>{" "}
                      {new Date(student.submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  )}

                  <Text style={{ color: "#ffffff" }}>
                    <span className="font-bold">Date Published:</span>{" "}
                    {student.datePublished || "N/A"}
                  </Text>

                  <p>Manuscript Status: {student.manuscriptStatus}</p>
                </div>
              </div>

              <div
                style={{
                  background: "#222222",
                  boxShadow: "-6px 0px 6.9px 0px rgba(0, 0, 0, 0.25)",
                  height: "117px",
                  width: "205px",
                  alignItems: "center",
                  paddingLeft: "44px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Button
                  icon={<EditOutlined />}
                  shape="circle"
                  onClick={() =>
                    handleViewManuscript(student._id, student.channelId)
                  }
                />
                <Button
                  icon={<LoadingOutlined />}
                  shape="circle"
                  onClick={() => updateManuscriptStatus(student._id)}
                />
                <Button
                  icon={<CheckOutlined />}
                  shape="circle"
                  onClick={() => updateManuscriptStatus(student._id)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* CKEditorDocuments component to view selected student document */}
      {isEditorOpen && selectedStudentId && (
        <CkEditorDocuments userId={user._id} channelId={selectedChannelId} onClose={() => setIsEditorOpen(false)} />
      )}
    </div>
  );
}
