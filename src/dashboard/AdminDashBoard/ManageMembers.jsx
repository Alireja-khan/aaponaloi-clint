import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageMembers = () => {
  const [members, setMembers] = useState([]); // ✅ default to empty array
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      console.log('✅ All users fetched:', res.data);
      if (Array.isArray(res.data)) {
        const members = res.data.filter(user => user.role === 'member');
        setMembers(members);
      } else {
        setMembers([]);
        toast.error('Invalid data format from server');
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);


  const handleRemove = async (email) => {
    try {
      await axios.patch(`http://localhost:5000/users/${email}`);
      toast.success('Member demoted to user');
      fetchMembers(); // Refresh list
    } catch (error) {
      console.error('❌ Role update error:', error);
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      {loading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-t">
                  <td className="px-4 py-2 border">{member.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{member.email}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
