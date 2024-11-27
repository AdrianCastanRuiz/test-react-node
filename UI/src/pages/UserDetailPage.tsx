import React from "react";
import { useActor } from "@xstate/react";
import { Link, useParams } from "react-router-dom";
import { userDetailMachine } from "../machines/userDetailMachine";


import React from "react";
import { useActor } from "@xstate/react";
import { Link, useParams } from "react-router-dom";
import { userDetailMachine } from "../machines/userDetailMachine";







const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, send] = useActor(userDetailMachine, {
    input: { id: id || '' }
  });

  if (!id) {
    return <div>Invalid user ID</div>;
  }

  const { user, error } = state.context;

  if (state.matches("loading")) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  if (state.matches("failure")) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => send({ type: "RETRY" })}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/">
        <span className="back-link">← Home</span>
      </Link>
      <h1>User Details</h1>
      <div className="user-details">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="user-avatar"
          />
        )}
        <ul>
          <li>
            <strong>ID:</strong> {user!.id}
          </li>
          <li>
            <strong>First Name:</strong> {user!.first_name}
          </li>
          <li>
            <strong>Last Name:</strong> {user!.last_name}
          </li>
          <li>
            <strong>Email:</strong> {user!.email}
          </li>
          <li>
            <strong>Email Verified:</strong> {user!.emailVerified ? "Yes" : "No"}
          </li>
          <li>
            <strong>Date of Birth:</strong> {user!.dob}
          </li>
          <li>
            <strong>Company:</strong> {user!.company!.name} - {user!.company!.department}
          </li>
        </ul>
        <h2>Skills</h2>
        <ul className="skills-list">
          {user!.skills!.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailPage;
