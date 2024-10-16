import { useEffect, useState } from "react";
import { List, Typography, Button } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

import CkEditorDocuments from './CkEditorDocuments'

export default function NewTables() {
  const [acceptedStudents, setAcceptedStudents] = useState([]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null); // Store channelId

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
        } else {
          const errorData = await response.json();
          console.error("Error fetching students:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };
    fetchStudents();
  }, []);

  const handleViewManuscript = (studentId, channelId) => {
    setSelectedStudentId(studentId);
    setSelectedChannelId(channelId); // Set the correct channelId for the student's manuscript
    setIsEditorOpen(true);
  };

  return (
    <div style={{ flex: '1', overflowX: 'hidden' }} className="">
      {/* Grid configuration: 2 columns, with spacing (gutter) of 16px */}
      <List
        grid={{ gutter: 16, column: 1 }} // Adjust column count for grid
        dataSource={acceptedStudents}
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
                {/* Render title */}
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

                {/* Render authors */}
                <Text style={{ color: "#ffffff" }}>
                  <span className="font-bold">Authors: </span>
                  {student.groupMembers
                    .map((member) =>
                      member.replace(/([a-z])([A-Z])/g, "$1 $2")
                    )
                    .join(", ")}
                </Text>

                <br />

                {/* Render panelists */}
                <Text style={{ color: "#ffffff" }}>
                  <span className="font-bold">Panelists: </span>
                  {student.panelists.join(", ")}
                </Text>

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
             
              </div>
            </div>
          </List.Item>
        )}
        
      />
        {isEditorOpen && selectedStudentId && (
          <CkEditorDocuments userId={user._id} channelId={selectedChannelId} onClose={() => setIsEditorOpen(false)} />
        )}
    </div>
  );
}
