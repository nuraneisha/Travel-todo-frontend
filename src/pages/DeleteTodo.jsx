import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteTodo } from "../features/todos/todoSlice";

export default function DeleteTodo({ show, handleClose, todoId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo({ id: todoId }));
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body> Are you sure you want to delete this post? This action cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )

}