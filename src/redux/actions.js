import axios from "axios";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL_LOCAL}auth/register`, userData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL_LOCAL}auth/login`, credentials);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    });

    // Store the token in localStorage
    localStorage.setItem("token", response.data.user.token);
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

export const fetchBooks = (token) => async (dispatch) => {
  dispatch({ type: "FETCH_BOOKS_REQUEST" });

  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}book/get-books`, {
      headers: { Authorization: `${token}` },
    });

    dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_BOOKS_FAILURE", payload: error.message });
  }
};

export const addBook = (bookData, token) => async (dispatch) => {
  dispatch({ type: "ADD_BOOK_REQUEST" });
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL_LOCAL}book/add-book`, bookData, {
      headers: { Authorization: `${token}` },
    });
    dispatch({ type: "ADD_BOOK_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ADD_BOOK_FAILURE", payload: error.message });
  }
};

export const deleteBook = (id, token) => async (dispatch) => {
  dispatch({ type: "DELETE_BOOK_REQUEST" });
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL_LOCAL}book/delete-book/${id}`, {
      headers: { Authorization: `${token}` },
    });
    dispatch({ type: "DELETE_BOOK_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_BOOK_FAILURE", payload: error.message });
  }
};

export const updateBook = (id, bookData, token) => async (dispatch) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL_LOCAL}book/edit-book/${id}`, bookData, {
      headers: { Authorization: `${token}` },
    });
    dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_BOOK_FAILURE", payload: error.message });
  }
};


