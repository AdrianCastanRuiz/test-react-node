export const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    console.log(response)
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  };
  
  export const fetchUserById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (!response.ok) return null;
    return response.json();
  };
  