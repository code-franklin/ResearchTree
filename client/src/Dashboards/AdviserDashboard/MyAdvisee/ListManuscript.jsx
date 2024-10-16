import { useEffect, useState } from "react";
import { List, Typography, Button, message, Progress, Modal, Input } from "antd";
import { EditOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import CkEditorDocuments from './CkEditorDocuments';
import axios from "axios";

const { Text } = Typography;

export default function NewTables() {
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTaskStudent, setCurrentTaskStudent] = useState(null);
  const [taskInput, setTaskInput] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Move the fetchStudents function outside of useEffect
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
      } else {
        const errorData = await response.json();
        console.error("Error fetching students:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [user._id]);

  const handleViewManuscript = (studentId, channelId) => {
    setSelectedStudentId(studentId);
    setSelectedChannelId(channelId);
    setIsEditorOpen(true);
  };

  const addTask = async (studentId, taskTitle) => {
    try {
      const response = await fetch(`http://localhost:5000/api/advicer/add-task/${studentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskTitle }),
      });
      if (response.ok) {
        setIsModalVisible(false); // Close the modal after adding task
        setTaskInput(""); // Clear task input
        fetchStudents(); // Refresh the list after adding a task
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateManuscriptStatus = async (channelId, newStatus) => {
    try {
      const response = await axios.patch(
        'http://localhost:5000/api/students/thesis/manuscript-status',
        { channelId, manuscriptStatus: newStatus }
      );
      console.log(response);
      message.success('Manuscript status updated');
    } catch (error) {
      console.error('Error updating manuscript status:', error);
      message.error('Error updating status');
    }
  };

  // Function to open the task modal
  const openTaskModal = (student) => {
    setCurrentTaskStudent(student);
    setIsModalVisible(true);
  };

  // Function to handle task addition inside the modal
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput) {
      addTask(currentTaskStudent._id, taskInput);
    }
  };

  return (
    <div style={{ flex: 1, overflowX: 'hidden', padding: "20px", width: '1263px'}}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredStudents}
        renderItem={(student) => (
          <List.Item key={student._id}>
            <div
              style={{
                height: '200px',
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#2B2B2B",
                marginBottom: "16px",
              }}
            >

                {/* Manuscript Containers */}
              <div style={{ flex: 1 }}>

                {/* Research Title */}
                <Text style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>
                  {student.proposalTitle}
                </Text>
                <br />

                {/* Authors */}
                <Text style={{ color: "#ffffff" }}>
                  <strong>Authors:</strong> {student.groupMembers.join(", ")}
                </Text>
                <br />

                {/* Panelist */}
                <Text style={{ color: "#ffffff" }}>
                  <strong>Panelists:</strong> {student.panelists.join(", ")}
                </Text>
                <br />

                 {/* Date Uploaded */}
                <Text style={{ color: "#ffffff", marginRight: "10px" }}>
                      <span className="font-bold">Date Uploaded:</span>{" "}
                             {new Date(student.submittedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                      })}
                </Text>
                <br /><br />

                {/* Status */}
                <Text style={{ color: "#ffffff" }}>
                  <strong>Manuscript Status:</strong> {student.manuscriptStatus}
                </Text>
              </div>
              

                 {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
             
                 {/* View Manuscript Button */}
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleViewManuscript(student._id, student.channelId)}
                    style={{ marginBottom: "20px", width: "100px" }}
                />
                {/* In Progress Button */}
                <Button
                    icon={<LoadingOutlined />}
                    onClick={() => updateManuscriptStatus(student._id, 'in progress')}
                    style={{ marginBottom: "20px", width: "100px" }}
                />
                {/* Completed Button */}
                <Button
                    icon={<CheckOutlined />}
                    onClick={() => updateManuscriptStatus(student._id, 'completed')}
                    style={{ marginBottom: "20px", width: "100px" }}
                />
                {/* View Task */}
                <Button type="primary" onClick={() => openTaskModal(student)} style={{ marginBottom: "20px", width: "100px" }}>
                  View Task
                </Button>


              </div>
            </div>
          </List.Item>
        )}
      />



      {/* CK EDITOR */}
      {isEditorOpen && selectedStudentId && (
        <CkEditorDocuments
          userId={user._id}
          channelId={selectedChannelId}
          onClose={() => setIsEditorOpen(false)}
        />
      )}


      {/* Modal for task input */}
      <Modal
        title={`Add Task for ${currentTaskStudent?.proposalTitle}`}
        visible={isModalVisible}
        onOk={handleAddTask}
        onCancel={() => setIsModalVisible(false)}
        okText="Add Task"
      >
        <Input
          placeholder="Enter a task"
          value={taskInput}
          onChange={handleTaskInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTask();
          }}
        />
      </Modal>
    </div>
  );
}
