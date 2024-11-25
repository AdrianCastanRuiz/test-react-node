import React from 'react';
import { Link } from 'react-router-dom';
import { useMachine } from '@xstate/react'; 
import { userListMachine } from '../machines/userListMachine';

const UserListPage: React.FC = () => {
  const [state, send] = useMachine(userListMachine);

  const { users, error } = state.context;

  console.log('State:', state.value, 'Context:', state.context);

  if (state.matches('loading')) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  if (state.matches('failure')) {
    return (
      <div className="error">
        <p>{error || 'Something went wrong'}</p>
        <button style={{padding: "0.5rem"}} onClick={() => send({ type: 'RETRY' })}>Retry</button>
      </div>
    );
  }

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
