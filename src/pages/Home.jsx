import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ListTrip from "./ListTrip";
import ListTodo from "./ListTodo";
import EditTrip from "./EditTrip";
import EditTodo from "./EditTodo";
import DeleteTrip from "./DeleteTrip";
import DeleteTodo from "./DeleteTodo";
import { useState } from "react";


export default function Home() {
    const trips = useSelector((state) => state.trips) || [];
    const todos = useSelector((state) => state.todo.todos) || [];

    const navigate = useNavigate();


    // --- Trip modal state ---
    const [showEditTripModal, setShowEditTripModal] = useState(false);
    const [showDeleteTripModal, setShowDeleteTripModal] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState(null);

    // --- Todo modal state ---
    const [showEditTodoModal, setShowEditTodoModal] = useState(false);
    const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    // --- Handlers for Trips ---
    const handleEditTrip = (tripId) => {
        setSelectedTripId(tripId);
        setShowEditTripModal(true);
    };

    const handleDeleteTrip = (tripId) => {
        setSelectedTripId(tripId);
        setShowDeleteTripModal(true);
    };

    // --- Handlers for Todos ---
    const handleEditTodo = (todoId) => {
        setSelectedTodoId(todoId);
        setShowEditTodoModal(true);
    };

    const handleDeleteTodo = (todoId) => {
        setSelectedTodoId(todoId);
        setShowDeleteTodoModal(true);
    };



    return (
        <>
            <Row style={{ backgroundColor: "lightblue" }}>
                <Col md={12}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="m-2 p-0">✈️ Top 5 Trips</h3>
                        <div className="d-flex gap-2 me-4">

                            <Button onClick={() => navigate("/addTrip")} variant="primary">
                                <i className="bi bi-plus-square"></i>
                            </Button>
                        </div>
                    </div>

                    <ListTrip
                        trips={trips}
                        limit={5}
                        onEdit={handleEditTrip}
                        onDelete={handleDeleteTrip}
                        showButton={false}
                    />
                </Col>

                <Col md={12}>
                    <div className="my-4 d-flex justify-content-between align-items-center">
                        <h3 className="m-2 p-0">📝 Top 5 Tasks</h3>
                        <Button
                            className="me-4"
                            onClick={() => navigate("/add")}
                            variant="primary"
                        >
                            <i className="bi bi-plus-square"></i>
                        </Button>
                    </div>

                    <ListTodo
                        todos={todos}
                        limit={5}
                        onEdit={handleEditTodo}
                        onDelete={handleDeleteTodo}
                        showButton={false}
                    />
                </Col>
            </Row>

            {/* Trip Modals */}
            <EditTrip
                show={showEditTripModal}
                handleClose={() => setShowEditTripModal(false)}
                tripId={selectedTripId}
            />
            <DeleteTrip
                show={showDeleteTripModal}
                handleClose={() => setShowDeleteTripModal(false)}
                tripId={selectedTripId}
            />

            {/* Todo Modals */}
            <EditTodo
                show={showEditTodoModal}
                handleClose={() => setShowEditTodoModal(false)}
                todoId={selectedTodoId}
            />
            <DeleteTodo
                show={showDeleteTodoModal}
                handleClose={() => setShowDeleteTodoModal(false)}
                todoId={selectedTodoId}
            />

            <Outlet />
        </>
    );
}