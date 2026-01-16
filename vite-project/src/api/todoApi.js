const API_URL = "http://localhost:3000/api/todos";

const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchTodos = async () =>{
    const res = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });
    return res.json();
};

export const addTodoApi = async (title) =>{
    const res =  await fetch (API_URL,{
        method:"POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({title}),
    });
    return res.json();
};

export const toggleTodoApi = async (id) => {
     const res = await fetch(`$(API_URL)/$(id)`,{
        method:"PUT",
        headers: getAuthHeaders(),
     });
     return res.json();
};

export const updateTodoApi = async (id, title) => {
  const res = await fetch(`${API_URL}/${id}/title`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const deleteTodoApi = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};