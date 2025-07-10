import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members
  useEffect(() => {
    axios.get('http://localhost:5000/users/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveMember = (email) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Remove ${email} from members?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/member-to-user/${email}`, {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(() => {
            setMembers(prev => prev.filter(member => member.email !== email));
            Swal.fire('Removed!', 'Member has been removed.', 'success');
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to remove member.', 'error');
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center">Loading members...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#D9822B]">Manage Members</h1>

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id}>
                <td className="py-2 px-4 border">{member.name || 'N/A'}</td>
                <td className="py-2 px-4 border">{member.email}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleRemoveMember(member.email)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMembers;
