import { useEffect, useState } from "react";
import { List, Typography, Button, message, Modal, Input, Checkbox, ConfigProvider, Select } from "antd";
import { EditOutlined, CheckOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import CkEditorDocuments from './CkEditorDocuments';
import axios from "axios";

const { Text } = Typography;
const { Option } = Select;

export default function NewTables() {
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const [courses, setCourses] = useState([]); // To store all unique courses
  const [filteredStudents, setFilteredStudents] = useState([]); // For filtering based on the course
  const [selectedCourse, setSelectedCourse] = useState(""); // For the selected course

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTaskStudent, setCurrentTaskStudent] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]); // To store tasks

  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
  // Fetch students
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

  const handleViewManuscript = (studentId, channelId) => {
    setSelectedStudentId(studentId);
    setSelectedChannelId(channelId);
    setIsEditorOpen(true);
  };

  // Task for Student

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
        setTasks([...tasks, { title: taskTitle, completed: false }]); // Add new task
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
        'http://localhost:5000/api/advicer/thesis/manuscript-status',
        { channelId, manuscriptStatus: newStatus }  // Send student ID and new status
      );

      message.success('Manuscript status updated');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        message.error(`Error: ${error.response.data.message || 'Failed to update status'}`);
      } else {
        console.error('Error:', error.message);
        message.error('Error updating status');
      }
    }
  };
  
  
  
  const openTaskModal = (student) => {
    setCurrentTaskStudent(student);
    setIsModalVisible(true);
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput) {
      addTask(currentTaskStudent._id, taskInput);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // Update task list after deletion
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks); // Update task completion status
  };

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

    

  return (
    <div style={{ flex: 1, overflowX: 'hidden', padding: "20px", width: '1263px' }}>

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
        dataSource={filteredStudents.filter(student => student.manuscriptStatus === "reviseOnAdvicer")}
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
              <div style={{ flex: 1 }}>
                <Text style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>
                  {student.proposalTitle}
                </Text>
                <br />
                <Text style={{ color: '#ffffff' }}>
                  <span className="font-bold">Authors: </span>
                  {student.groupMembers
                    .map(member => member.replace(/([a-z])([A-Z])/g, '$1 $2')) // Insert space between lowercase and uppercase letters
                    .join(', ')}
                </Text>
                <br />
                <Text style={{ color: "#ffffff" }}>
                  <span className="font-bold">Panelists: </span>
                  {student.panelists.join(", ")}
                </Text>

                <br />
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
                <br /><br />
                <p style={{ color: "#ffffff" }}>Course: {student.course}</p>
                <p style={{ color: "#ffffff" }}>USer: {student.name}</p>
                <br />

                <Text style={{ color: "#ffffff" }}>
                  <strong>Manuscript Status:</strong> {student.manuscriptStatus}
                </Text>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "10px" }}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleViewManuscript(student._id, student.channelId)}
                  style={{ marginBottom: "20px", width: "100px" }}
                />
                <Button
                  icon={<LoadingOutlined />}  
                  onClick={() => updateManuscriptStatus(student._id, 'reviseOnAdvicer')}
                  style={{ marginBottom: "20px", width: "100px" }}
                />
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => updateManuscriptStatus(student._id, 'readyToDefense')}
                  style={{ marginBottom: "20px", width: "100px" }}
                />
                <Button type="primary" onClick={() => openTaskModal(student)} style={{ marginBottom: "20px", width: "100px" }}>
                  View Task
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      {isEditorOpen && selectedStudentId && (
        <CkEditorDocuments
          userId={user._id}
          channelId={selectedChannelId}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

 <ConfigProvider
      theme={{
        components: {
          Modal: {
          
            algorithm: true, // Enable algorithm
          },
       
        },
      }}
    >
<Modal
  visible={isModalVisible}

  onCancel={() => setIsModalVisible(false)}  // Ensures modal can close
  footer={[
    <Button key="close" onClick={() => setIsModalVisible(false)}>
      Close
    </Button>,
    <Button key="add" type="primary" onClick={handleAddTask}>
      Add Task
    </Button>,
  ]}
 
>
  <Input
    placeholder="Enter a task"
    value={taskInput}
    onChange={handleTaskInputChange}
    onKeyDown={(e) => {
      if (e.key === 'Enter') handleAddTask();
    }}
  />
  <br /><br />
  <List
    dataSource={tasks}
    renderItem={(task, index) => (
      <List.Item
        key={index}
        actions={[
          <Checkbox checked={task.completed} onChange={() => handleCompleteTask(index)}>
            {task.completed ? "Completed" : "Pending"}
          </Checkbox>,
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(index)}
          />,
        ]}
      >
        <Text delete={task.completed}>{task.title}</Text>
      </List.Item>
    )}
  />
</Modal>
</ConfigProvider>
    </div>
  );
}
