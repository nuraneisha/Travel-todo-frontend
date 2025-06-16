import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addTodo, addCategory } from "../features/todos/todoSlice";


export default function AddTodo() {
    //current category for the input todo
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    //to store the categories
    const [custom, setCustom] = useState(false);

    const dispatch = useDispatch();
    const savedCategories = useSelector(state => state.todo.categories);


    const handleCategories = (event) => {
        // get option value 
        const value = event.target.value;
        if (value == "custom") {
            //change the state to open the input form
            setCustom(true);
            // clear previous category
            setCategory("")
        }
        else {
            //safety net when user suddenly change their mind and choose the selection from the dropdown
            //so it will hide the input
            setCustom(false)
            //get whatever value from the dropdown
            setCategory(value);
        }
    }

    function reset() {
        setCategory("");
        setDescription("");
        setCompleted(false);
    }

    function addTodos(event) {
        event.preventDefault();
        dispatch(addTodo({ category, description, completed }));
        //check if the category exist
        if (!savedCategories.includes(category)) {
            // this updates localStorage automatically
            dispatch(addCategory(category));

        }
        navigate("/")
    }

    return (
        <Container className="my-3">
            <h2>Add Todo</h2>
            <Form onSubmit={addTodos}>
                {/* ---------------Form Catgory-------------- */}
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={category} onChange={handleCategories} required>
                        <option>----Select a category</option>

                        {/* //choose a category   */}
                        {
                            savedCategories.map((cat, index) => {
                                return <option key={index} value={cat}>{cat}</option>
                            })
                        }
                        <option value="custom">-- Add New Category --</option>

                    </Form.Select>
                    {custom && (
                        <Form.Control type="text" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Enter a new Category" required className="mt-2" />
                    )}
                </Form.Group>

                {/* ---------------Form Description-------------- */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Desctiption</Form.Label>
                    <Form.Control value={description} as="textarea" rows={3} onChange={(event) => setDescription(event.target.value)} placeholder={`1.Passport \n2.Itineary \n3.Flights`} required ></Form.Control>
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