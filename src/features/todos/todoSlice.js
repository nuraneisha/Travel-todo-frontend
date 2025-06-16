import { createSlice } from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        //data you want to store in redux
        todos: [],
        categories: [],
    },
    reducers: {
        addTodo: (state, action) => {
            //adds a new task 
            state.todos.push({
                id: Date.now(),
                category: action.payload.category,
                description: action.payload.description,
                completed: action.payload.completed
            });
        },
        // add a new category if exist it wont duplicate
        addCategory: (state, action) => {
            const newCategory = action.payload;
            if (!state.categories.includes(newCategory)) {
                state.categories.push(newCategory);
            }
        },
        //find todo by id
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                //access the index 
                state.todos[index] = {
                    //Keep all existing fields, overwrite any fields provided
                    ...state.todos[index],
                    ...action.payload
                }
            }
        },
        //remove todo by id
        deleteTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos.splice(index, 1);
            }
        },
    },
});

export const { addTodo, addCategory, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;