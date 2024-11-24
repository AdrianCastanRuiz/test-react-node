// src/pages/UserListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMachine } from '@xstate/react'; // Import XState's React integration
import { userListMachine } from '../machines/userListMachine';

const UserListPage: React.FC = () => {
  // Use the userListMachine with the `useMachine` hook
  const [state, send] = useMachine(userListMachine);

  // Extract context values
  const { users, error } = state.context;

  // Display loading spinner while in the `loading` state
  if (state.matches('loading')) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  // Display error message if in the `failure` state
  if (state.matches('failure')) {
    return (
      <div className="error-message">
        <h2>Error</h2>
        <p>{error || 'An unknown error occurred.'}</p>
        {/* <button onClick={() => send('RETRY')}>Retry</button> */}
      </div>
    );
  }

  // Display user list when in the `success` state
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

