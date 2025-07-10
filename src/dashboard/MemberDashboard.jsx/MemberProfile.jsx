import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';

const MemberProfile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/agreements/accepted/${user.email}`)
        .then(res => {
          setAgreement(res.data);
        })
        .catch(err => {
          console.error('No accepted agreement:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!agreement) {
    return <div className="text-center py-10 text-red-500">No accepted agreement found</div>;
  }

  const { userName, email, floor, block, apartmentNo, rent, createdAt } = agreement;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-[#D9822B] mb-4">My Profile</h2>
      <p><strong>Name:</strong> {userName}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Agreement Accepted:</strong> {new Date(createdAt).toLocaleDateString()}</p>
      <p><strong>Floor:</strong> {floor}</p>
      <p><strong>Block:</strong> {block}</p>
      <p><strong>Apartment No:</strong> {apartmentNo}</p>
      <p><strong>Rent:</strong> ৳{rent}</p>
    </div>
  );
};

export default MemberProfile;
