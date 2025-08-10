import axios from "./Utils/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TestPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("/api/v1/admin/test");
        setMessage(response.data);
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          setError("Unauthorized. Please login again.");
          navigate("/login");
        } else {
          setError("Something went wrong while fetching message.");
          console.error(err);
        }
      }
    };

    fetchMessage();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/admin/users");
        setUsers(response.data.users);
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
        console.error("Error fetching user data:", err);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Test Page</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="container">
        {Array.isArray(users) && users.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email.toLowerCase()}</td>
                    <td>{user.role}</td>
                    <td>{user.verified ? "Verified" : "Not Verified"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default TestPage;
