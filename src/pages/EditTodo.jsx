import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateTodo, addCategory } from "../features/todos/todoSlice";

export default function EditTodo({ show, handleClose, todoId }) {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();
    //to store the categories
    const [custom, setCustom] = useState(false);
    const savedCategories = useSelector(state => state.todo.categories);

    //fetch the selected task
    const todo = useSelector((state) => state.todo.todos.find((t) => t.id === todoId));
    console.log("todoId:", todoId);
    console.log("found todo:", todo);

    useEffect(() => {
        //only run if todo is not undefined
        if (todo) {
            //pre-fills the form 
            setCategory(todo.category);
            setDescription(todo.description);
            setCompleted(todo.completed);
            setCustom(false);
        }
        //ony run if the todo value changes
    }, [todo])

    const handleSubmit = (event) => {
        event.preventDefault();
        //todo item exist
        if (todo) {
            if (!savedCategories.includes(category)) {
                //saving a new category to redux when the user enter a new category during editing
                dispatch(addCategory(category));
            }
            // update the todo with the latest changes 
            dispatch(updateTodo({ id: todoId, category, description, completed }));
            setCategory("");
            setDescription("");
            setCompleted(false);
            handleClose();
        }
    };
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
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
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
        </Modal>
    )

}