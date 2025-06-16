import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import AddTodo from "./pages/AddTodo";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import DeleteTrip from "./pages/DeleteTrip";
import EditTodo from "./pages/EditTodo";
import DeleteTodo from "./pages/DeleteTodo";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ListTrip from "./pages/ListTrip";
import ListTodo from "./pages/ListTodo";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage"

//check if the user login, if correct show dashboard
function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/" />;
}


function ListTripWrapper() {
    const trips = useSelector((state) => state.trips);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState(null);

    const handleEdit = (id) => {
        setSelectedTripId(id);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setSelectedTripId(id);
        setShowDeleteModal(true);
    };

    return (
        <>
            <ListTrip trips={trips} onEdit={handleEdit} onDelete={handleDelete} />
            <EditTrip show={showEditModal} handleClose={() => setShowEditModal(false)} tripId={selectedTripId} />
            <DeleteTrip show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} tripId={selectedTripId} />
        </>
    );
}


function ListTodoWrapper() {
    const todos = useSelector((state) => state.todo.todos);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const handleEdit = (id) => {
        setSelectedTodoId(id);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setSelectedTodoId(id);
        setShowDeleteModal(true);
    };

    return (
        <>
            <ListTodo todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
            <EditTodo show={showEditModal} handleClose={() => setShowEditModal(false)} todoId={selectedTodoId} />
            <DeleteTodo show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} todoId={selectedTodoId} />
        </>
    );
}


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Landing page is now the default root route */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected dashboard routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="add" element={<AddTodo />} />
                        <Route path="addTrip" element={<AddTrip />} />
                        <Route path="listTrip" element={<ListTripWrapper />} />
                        <Route path="listTodo" element={<ListTodoWrapper />} />

                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
