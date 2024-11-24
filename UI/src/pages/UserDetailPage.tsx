import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById } from '../services/api';
import { User } from '../types/User';


const UserDetailPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetchUserById(Number(id))
        .then((data) => {
          if (data) setUser(data);
          else setError('User Not Found');
        })
        .catch(() => setError('Error fetching user'))
        .finally(() => setLoading(false));

    }, 1000)

  }, [id]);

  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <Link to="/">
        <span className='back-link'>  ← Home</span>

      </Link>
      <h1>User Details</h1>
      <div className="user-details">
        {user?.avatar && <img
          src={user!.avatar}
          alt={`${user!.first_name} ${user!.last_name}`}
          className="user-avatar"
        />}


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
            <strong>Email Verified:</strong> {user!.emailVerified ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Date of Birth:</strong> {user!.dob}
          </li>
          <li>
            <strong>Company:</strong> {user!.company.name} - {user!.company.department}
          </li>
        </ul>

        <h2>Skills</h2>
        <ul className="skills-list">
          {user!.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailPage;
