import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteTrip } from "../features/todos/tripSlice";

export default function DeleteTrip({ show, handleClose, tripId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTrip({ id: tripId }));
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body> Are you sure you want to delete this trip? This action cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )

}