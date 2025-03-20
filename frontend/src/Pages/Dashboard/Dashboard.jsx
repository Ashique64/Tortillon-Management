import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

    useEffect(() => {
        setItems([
            { id: 1, date: "2024-03-20", client: "John Doe", amount: "$500", service: "Web Development" },
            { id: 2, date: "2024-03-18", client: "Alice Smith", amount: "$750", service: "UI/UX Design" },
            { id: 3, date: "2024-03-15", client: "Bob Johnson", amount: "$300", service: "SEO Optimization" },
            { id: 4, date: "2024-03-10", client: "Emma Davis", amount: "$650", service: "App Development" },
        ]);
    }, []);

    const handleEdit = (id) => {
        alert(`Edit item with ID: ${id}`);
    };

    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleAddItem = () => {
        alert("Add item functionality will be implemented!");
    };

    const filteredItems = items.filter((item) => item.client.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="user-info">
                    <i className="bx bxs-user icon"></i>
                    <span>{user.username}</span>
                </div>
                <div className="item2">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by client name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="add-btn" onClick={handleAddItem}>
                        <i className="bx bx-plus-circle"></i>
                    </div>
                </div>
            </nav>

            {/* Item Listing Section */}
            <div className="table-container">
                <table className="item-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Client Name</th>
                            <th>Amount</th>
                            <th>Service</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td>{item.client}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.service}</td>
                                    <td className="action-icons">
                                        <FaEdit className="edit-icon" onClick={() => handleEdit(item.id)} />
                                        <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-results">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
