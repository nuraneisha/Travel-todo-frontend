import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListTodo({ todos, limit, onEdit, onDelete, showButton = true }) {
    const todosFromRedux = useSelector((state) => state.todo.todos) || [];
    const allTodos = todos ?? todosFromRedux;

    const limitedTodos = limit ? [...allTodos].slice(0, limit) : allTodos;
    const navigate = useNavigate();

    return (
        <>
            {showButton && (
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="m-2 p-0">All Todos</h3>
                    <div className="d-flex gap-1">
                        <Button
                            className="me-4"
                            onClick={() => navigate("/add")}
                            type="button"
                            variant="primary"
                        >
                            <i className="bi bi-plus-square "></i>
                        </Button>
                    </div>
                </div>
            )}

            <table
                className="m-2"
                border="1"
                cellPadding="8"
                cellSpacing={0}
                style={{ borderCollapse: "collapse", width: "97%" }}
            >
                <thead style={{ background: "#f0f0f0" }}>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedTodos.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No todos found.</td>
                        </tr>
                    ) : (
                        limitedTodos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.category}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <div className="d-flex ms-4 align-items-center">
                                        <input type="checkbox" checked={todo.completed} readOnly />
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onEdit(todo.id)}
                                            disabled={!onEdit}

                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(todo.id)}
                                            disabled={!onDelete}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}