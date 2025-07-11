import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MakeAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/announcements', { title, description });
            toast.success('Announcement created successfully!');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating announcement:', error);
            toast.error('Failed to create announcement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter announcement title"
                    disabled={loading}
                />

                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter announcement description"
                    rows={5}
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
