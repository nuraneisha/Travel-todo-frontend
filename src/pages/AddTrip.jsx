import { useDispatch } from "react-redux";
import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../features/todos/tripSlice";


export default function AddTrip() {
    //current category for the input todo
    const [trip, setTrip] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    function reset() {
        setTrip("");
        setDate("");
        setCompleted(false);
    }

    function addTrips(event) {
        event.preventDefault();
        dispatch(addTrip({ trip, date, completed }));
        console.log('Submitted!')
        navigate("/")
    }

    return (
        <Container className="my-3">
            <h2>Add Trip</h2>
            <Form onSubmit={addTrips}>
                {/* ---------------Form Trip-------------- */}
                <Form.Group className="mb-3" controlId="trip">
                    <Form.Label>Trip</Form.Label>
                    <Form.Control value={trip} type="text" onChange={(event) => setTrip(event.target.value)} placeholder="Japan" required ></Form.Control>
                </Form.Group>

                {/* ---------------Form Date-------------- */}
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control value={date} type="date" onChange={(event) => setDate(event.target.value)} required ></Form.Control>
                </Form.Group>


                {/* ---------------Form Checkbox-------------- */}
                <Form.Group className="mb-3" controlId="checkbox">
                    <Form.Check checked={completed} onChange={(event) => setCompleted(event.target.checked)} id="completed" type="checkbox" label="Mark as Completed"></Form.Check>
                </Form.Group>

                {/* ---------------Form Button-------------- */}
                <Form.Group className="mb-3" controlId="button">
                    <Button variant="primary" type="submit">Submit</Button>
                    <Button className="mx-3" variant="danger" onClick={reset}>Reset</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}