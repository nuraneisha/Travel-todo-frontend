import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateTrip } from "../features/todos/tripSlice";

export default function EditTrip({ show, handleClose, tripId }) {
    const [trip, setTrip] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();

    const selectedTrip = useSelector((state) =>
        state.trips.find((t) => t.id === tripId)
    );

    useEffect(() => {
        if (selectedTrip) {
            setTrip(selectedTrip.trip);
            // Format date to YYYY-MM-DD
            setDate(new Date(selectedTrip.date).toISOString().split("T")[0]);
            setCompleted(selectedTrip.completed);
        }
    }, [selectedTrip]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedTrip) {
            dispatch(updateTrip({ id: tripId, trip, date, completed }));
            reset();
            handleClose();
        }
    };

    function reset() {
        setTrip("");
        setDate("");
        setCompleted(false);
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Trip</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="trip">
                    <Form.Label>Trip</Form.Label>
                    <Form.Control
                        value={trip}
                        type="text"
                        onChange={(e) => setTrip(e.target.value)}
                        placeholder="Japan"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        value={date}
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="checkbox">
                    <Form.Check
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        id="completed"
                        type="checkbox"
                        label="Mark as Completed"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="button">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button className="mx-3" variant="danger" onClick={reset}>
                        Reset
                    </Button>
                </Form.Group>
            </Form>
        </Modal>
    );
}