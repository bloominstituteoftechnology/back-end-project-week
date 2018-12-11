export const URL = "http://localhost:3333/api";

export const DEFAULT_NOTE_VALUES = {
  title: "",
  content: ""
};

export const DEFAULT_USER_VALUES = {
  username: "",
  password: ""
};

export const HEADER = {
  headers: {
    authorization: localStorage.getItem("token")
  }
};
