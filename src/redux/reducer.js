const initialUserState = {
    loading: false,
    user: null,
    error: null,
  };
  
  export const authReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case "REGISTER_REQUEST":
        return { ...state, loading: true };
      case "REGISTER_SUCCESS":
        return { ...state, loading: false, user: action.payload };
      case "REGISTER_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const initialLoginState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  };
  
  export const authLoginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "LOGIN_SUCCESS": // Debugging log
        return {
          ...state,
          loading: false,
          user: action.payload.user.user, // Extracting the user object
          token: action.payload.user.token, // Extracting the token correctly
        };
  
      case "LOGIN_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  const initialBookState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export const bookReducer = (state = initialBookState, action) => {
    switch (action.type) {
      case "FETCH_BOOKS_REQUEST":
        return { ...state, loading: true, error: null };
      case "FETCH_BOOKS_SUCCESS":
        return { ...state, loading: false, books: action.payload };
      case "FETCH_BOOKS_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const addBookInitialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export const addBook = (state = addBookInitialState, action) => {
    switch (action.type) {
      case "ADD_BOOK_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "ADD_BOOK_SUCCESS":
        return { ...state, loading: false, books: [...state.books, action.payload] };
  
      case "ADD_BOOK_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  const initialDeleteState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export const booksReducer = (state = initialDeleteState, action) => {
    switch (action.type) {
      case "DELETE_BOOK_REQUEST":
        return { ...state, loading: true, error: null };
      case "DELETE_BOOK_SUCCESS":
        return {
          ...state,
          loading: false,
          books: state.books.book.filter((book) => book.id !== action.payload),
        };
      case "DELETE_BOOK_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const initialUpdationState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export const booksUpdationReducer = (state = initialUpdationState, action) => {
    switch (action.type) {
      case "FETCH_BOOKS_SUCCESS":
        return { ...state, books: action.payload, loading: false };
  
      case "FETCH_BOOKS_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      case "UPDATE_BOOK_SUCCESS":
        return {
          ...state,
          books: state.books.map((book) =>
            book.id === action.payload.id ? action.payload : book
          ),
        };
  
      case "UPDATE_BOOK_FAILURE":
        return { ...state, error: action.payload };
  
      default:
        return state;
    }
  };
  