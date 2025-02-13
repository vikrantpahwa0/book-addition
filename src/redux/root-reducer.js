import { combineReducers } from "redux";
import { bookReducer,authReducer,authLoginReducer,addBook } from "./reducer"; 

const rootReducer = combineReducers({
    books: bookReducer,
    auth: authReducer,
    login:authLoginReducer,
    addBook:addBook
    
});

export default rootReducer;
