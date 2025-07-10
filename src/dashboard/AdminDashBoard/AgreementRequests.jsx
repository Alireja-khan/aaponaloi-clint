import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AgreementRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/all-agreements')
            .then(res => {
                const pending = res.data.filter(req => req.status === 'pending');
                setRequests(pending);
            })
            .catch(err => console.error('Error fetching agreements:', err));
    }, []);


    const handleDecision = async (id, email, action) => {
        const status = 'checked';
        const approve = action === 'accept';

        try {
            await axios.patch(`http://localhost:5000/agreements/respond/${id}`, {
                status,
                userEmail: email,
                approve
            });

            Swal.fire('Success', `Agreement ${approve ? 'accepted' : 'rejected'}`, 'success');

            // Remove the processed request
            setRequests(prev => prev.filter(req => req._id !== id));
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-3xl font-bold mb-6 text-[#D9822B]">Agreement Requests</h2>

            {requests.length === 0 ? (
                <p className="text-gray-500">No pending requests.</p>
            ) : (
                <table className="w-full text-left border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Floor</th>
                            <th className="p-3 border">Block</th>
                            <th className="p-3 border">Apartment No</th>
                            <th className="p-3 border">Rent</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td className="p-3 border">{req.name || 'N/A'}</td>
                                <td className="p-3 border">{req.email}</td>
                                <td className="p-3 border">{req.floor}</td>
                                <td className="p-3 border">{req.block}</td>
                                <td className="p-3 border">{req.apartmentNo}</td>
                                <td className="p-3 border">${req.rent}</td>
                                <td className="p-3 border">{new Date(req.createdAt).toLocaleDateString()}</td>
                                <td className="p-3 border flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDecision(req._id, req.email, 'accept')}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDecision(req._id, req.email, 'reject')}
                                    >
                                        Reject
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

export default AgreementRequests;
