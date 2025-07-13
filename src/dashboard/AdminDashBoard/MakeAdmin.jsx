// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion } from 'framer-motion';
// import { HiUserGroup } from 'react-icons/hi2';
// import { VscEmptyWindow } from 'react-icons/vsc';
// import noFound from '../../assets/images/Empty-cuate.png';

// const MakeAdmin = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchUsers = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/users');
//             const usersArray = Array.isArray(res.data) ? res.data : res.data.users || [];
//             setUsers(usersArray);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             setUsers([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
//         fetchUsers();
//     }, []);

//     const handleMakeAdmin = async (id) => {
//         try {
//             const res = await axios.patch(`http://localhost:5000/users/admin/${id}`);
//             if (res.data.modifiedCount > 0) {
//                 Swal.fire('Success!', 'User promoted to admin.', 'success');
//                 fetchUsers();
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to make admin.', 'error');
//         }
//     };

//     const handleRemoveAdmin = async (id) => {
//         try {
//             const res = await axios.patch(`http://localhost:5000/users/remove-admin/${id}`);
//             if (res.data.modifiedCount > 0) {
//                 Swal.fire('Success!', 'Admin demoted to user.', 'success');
//                 fetchUsers();
//             }
//         } catch (error) {
//             Swal.fire('Error', 'Failed to remove admin.', 'error');
//         }
//     };

//     return (
//         <div className="pt-15 pl-10 max-w-5xl">
//             <h2
//                 className="text-4xl pb-9 font-bold flex items-center gap-3"
//                 data-aos="fade-down"
//             >
//                 <HiUserGroup className="text-secondary" />
//                 Manage <span className="text-secondary">Admins</span>
//             </h2>

//             {loading ? null : users.length === 0 ? (
//                 <div className="text-center" data-aos="fade-up">
//                     <div className="flex items-center justify-center gap-4 mb-4">
//                         <VscEmptyWindow className="text-4xl text-gray-400" />
//                         <h1 className="text-3xl font-semibold text-gray-500">
//                             No Users Found
//                         </h1>
//                     </div>
//                     <div className="flex justify-center items-center" data-aos="zoom-in" data-aos-delay="100">
//                         <img className="w-150" src={noFound} alt="Not Found" />
//                     </div>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="overflow-x-auto rounded-lg shadow-sm"
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                 >
//                     <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
//                         <thead className="bg-gray-100 text-gray-700">
//                             <tr>
//                                 <th className="py-3 px-4 text-left">#</th>
//                                 <th className="py-3 px-4 text-left">Name</th>
//                                 <th className="py-3 px-4 text-left">Email</th>
//                                 <th className="py-3 px-4 text-left">Role</th>
//                                 <th className="py-3 px-4 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {users.map((user, idx) => (
//                                 <motion.tr
//                                     key={user._id}
//                                     className="hover:bg-gray-50 transition-colors"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: idx * 0.05 }}
//                                 >
//                                     <td className="py-2 px-4">{idx + 1}</td>
//                                     <td className="py-2 px-4">{user.name || 'N/A'}</td>
//                                     <td className="py-2 px-4">{user.email}</td>
//                                     <td className="py-2 px-4 capitalize">{user.role}</td>
//                                     <td className="py-2 px-4 text-center space-x-2">
//                                         {user.role !== 'admin' ? (
//                                             <button
//                                                 onClick={() => handleMakeAdmin(user._id)}
//                                                 className="px-5 py-1 bg-primary hover:bg-secondary hover:text-white rounded-md text-sm"
//                                             >
//                                                 Make Admin
//                                             </button>
//                                         ) : (
//                                             <button
//                                                 onClick={() => handleRemoveAdmin(user._id)}
//                                                 className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm"
//                                             >
//                                                 Remove Admin
//                                             </button>
//                                         )}
//                                     </td>
//                                 </motion.tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default MakeAdmin;
