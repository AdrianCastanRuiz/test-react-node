import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/api';

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1>User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <div className="user-info">
              <span className="user-name">
                {user.first_name} {user.last_name}
              </span>
              <Link to={`/users/${user.id}`} className="view-details">
                View Details →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
