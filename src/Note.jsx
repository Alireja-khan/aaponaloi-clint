// import { AuthContext } from '../../contexts/AuthContext/AuthContext';
// import {
//   FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBed,
//   FaDoorOpen, FaDoorClosed, FaUsers, FaUserCheck,
//   FaTicketAlt, FaUserShield, FaIdCard, FaBriefcase,
//   FaMoneyBillWave, FaShieldAlt, FaFileSignature, FaClock
// } from 'react-icons/fa';
// import { MdSecurity, MdWork, MdPayment, MdAdminPanelSettings } from 'react-icons/md';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const AdminProfile = () => {
//   const { user } = useContext(AuthContext);
//   const [adminData, setAdminData] = useState(null);
//   const [stats, setStats] = useState({
//     totalRooms: 0,
//     availableRooms: 0,
//     availableRoomsPercentage: '0.00',
//     unavailableRoomsPercentage: '0.00',
//     users: 0,
//     members: 0,
//     coupons: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('personal');

//   console.log(user);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [apartmentsRes, usersRes, membersRes, couponsRes, adminRes] = await Promise.all([
//           axios.get('https://aaponaloi-server.vercel.app/apartments'),
//           axios.get('https://aaponaloi-server.vercel.app/users'),
//           axios.get('https://aaponaloi-server.vercel.app/members'),
//           axios.get('https://aaponaloi-server.vercel.app/coupons'),
//           axios.get(`https://aaponaloi-server.vercel.app/users/${user?.email}`)
//         ]);

//         // Process stats data
//         const allRooms = apartmentsRes.data;
//         const availableRooms = allRooms.filter(room => !room.isBooked);

//         const totalRooms = allRooms.length;
//         const availableCount = availableRooms.length;
//         const unavailableCount = totalRooms - availableCount;

//         const availableRoomsPercentage = totalRooms
//           ? ((availableCount / totalRooms) * 100).toFixed(2)
//           : '0.00';

//         const unavailableRoomsPercentage = totalRooms
//           ? ((unavailableCount / totalRooms) * 100).toFixed(2)
//           : '0.00';

//         setStats({
//           totalRooms,
//           availableRooms: availableCount,
//           availableRoomsPercentage,
//           unavailableRoomsPercentage,
//           users: usersRes.data.length,
//           members: membersRes.data.length,
//           coupons: couponsRes.data.length,
//         });

//         // Set admin data
//         setAdminData(adminRes.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchData();
//     }
//   }, [user]);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-bars loading-xl"></span>
//       </div>
//     );
//   }

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'personal':
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <FaIdCard className="text-blue-500" /> Basic Information
//                 </h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Name:</span> {adminData?.name || adminData.personalInformation?.name || 'N/A'}</p>
//                   <p><span className="font-medium">Email:</span> {adminData?.personalInformation?.email || 'N/A'}</p>
//                   <p><span className="font-medium">Phone:</span> {adminData?.personalInformation?.phone || 'N/A'}</p>
//                   <p><span className="font-medium">Date of Birth:</span> {adminData?.personalInformation?.dateOfBirth || 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <FaMapMarkerAlt className="text-green-500" /> Address
//                 </h3>
//                 <div className="space-y-2">
//                   <p>{adminData?.personalInformation?.address?.street || 'N/A'}</p>
//                   <p>{adminData?.personalInformation?.address?.city}, {adminData?.personalInformation?.address?.state}</p>
//                   <p>{adminData?.personalInformation?.address?.zipCode}, {adminData?.personalInformation?.address?.country}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                 <FaUsers className="text-purple-500" /> Emergency Contact
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p><span className="font-medium">Name:</span> {adminData?.personalInformation?.emergencyContact?.name || 'N/A'}</p>
//                   <p><span className="font-medium">Relationship:</span> {adminData?.personalInformation?.emergencyContact?.relationship || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Phone:</span> {adminData?.personalInformation?.emergencyContact?.phone || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
        
//       case 'professional':
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <FaBriefcase className="text-orange-500" /> Position Details
//                 </h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Role:</span> {adminData?.professionalInformation?.role || 'N/A'}</p>
//                   <p><span className="font-medium">Position:</span> {adminData?.professionalInformation?.position || 'N/A'}</p>
//                   <p><span className="font-medium">Department:</span> {adminData?.professionalInformation?.department || 'N/A'}</p>
//                   <p><span className="font-medium">Employee ID:</span> {adminData?.professionalInformation?.employeeId || 'N/A'}</p>
//                   <p><span className="font-medium">Hire Date:</span> {adminData?.professionalInformation?.hireDate || 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <MdAdminPanelSettings className="text-red-500" /> Permissions
//                 </h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Access Level:</span> {adminData?.professionalInformation?.accessLevel || 'N/A'}</p>
//                   <div>
//                     <p className="font-medium mb-1">Permissions:</p>
//                     <ul className="list-disc list-inside">
//                       {adminData?.professionalInformation?.permissions?.map((perm, index) => (
//                         <li key={index}>{perm}</li>
//                       )) || <li>No permissions listed</li>}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                 <FaClock className="text-blue-500" /> Work Schedule
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p><span className="font-medium">Working Hours:</span> {adminData?.professionalInformation?.workingHours || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Work Schedule:</span> {adminData?.professionalInformation?.workSchedule || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
        
//       case 'security':
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <MdSecurity className="text-green-500" /> Account Security
//                 </h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Last Login:</span> {new Date(adminData?.accountSettings?.lastLogin).toLocaleString() || 'N/A'}</p>
//                   <p><span className="font-medium">Two-Factor Enabled:</span> {adminData?.accountSettings?.twoFactorEnabled ? 'Yes' : 'No'}</p>
//                   <p><span className="font-medium">Password Last Changed:</span> {adminData?.accountSettings?.passwordLastChanged || 'N/A'}</p>
//                   <p><span className="font-medium">Account Status:</span> <span className="capitalize">{adminData?.accountSettings?.accountStatus || 'N/A'}</span></p>
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                   <FaShieldAlt className="text-blue-500" /> System Access
//                 </h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">VPN Required:</span> {adminData?.systemAccess?.vpnRequired ? 'Yes' : 'No'}</p>
//                   <div>
//                     <p className="font-medium mb-1">IP Whitelist:</p>
//                     <ul className="list-disc list-inside">
//                       {adminData?.systemAccess?.ipWhitelist?.map((ip, index) => (
//                         <li key={index}>{ip}</li>
//                       )) || <li>No IPs whitelisted</li>}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
        
//       case 'activity':
//         return (
//           <div className="space-y-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
//                 <FaUserShield className="text-purple-500" /> Admin Activities
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <p><span className="font-medium">Listings Approved:</span> {adminData?.adminActivities?.totalListingsApproved || 0}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Users Managed:</span> {adminData?.adminActivities?.totalUsersManaged || 0}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Tickets Resolved:</span> {adminData?.adminActivities?.ticketsResolved || 0}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Avg Response Time:</span> {adminData?.adminActivities?.averageResponseTime || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-semibold text-lg mb-2">Recent Actions</h3>
//               <div className="space-y-2">
//                 {adminData?.adminActivities?.recentActions?.length > 0 ? (
//                   adminData.adminActivities.recentActions.map((action, index) => (
//                     <div key={index} className="border-b pb-2 last:border-0">
//                       <p><span className="font-medium">Action:</span> {action.action.replace(/_/g, ' ')}</p>
//                       <p><span className="font-medium">Target ID:</span> {action.propertyId || action.ticketId}</p>
//                       <p><span className="font-medium">Time:</span> {new Date(action.timestamp).toLocaleString()}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No recent actions found</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="px-4 py-10 sm:px-6 lg:px-10">
//       <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3 mb-6" data-aos="fade-down">
//         <FaUserShield className="text-secondary" />
//         Admin <span className="text-secondary">Profile</span>
//       </h1>

//       {/* Profile Card */}
//       <div className="bg-white text-gray-800 items-center rounded-xl overflow-hidden max-w-5xl my-10 shadow-lg flex flex-col md:flex-row">
//         {/* Left: Image Section */}
//         <div className="w-full md:w-1/3 bg-gray-50 p-6 flex items-center justify-center" data-aos="fade-right">
//           <img
//             src={adminData?.photo || adminData?.personalInformation?.photo || 'https://via.placeholder.com/200'}
//             alt="Admin"
//             className="w-64 h-64 rounded-lg object-cover border-4 border-gray-200"
//           />
//         </div>

//         {/* Right: Info Section */}
//         <div className="w-full md:w-2/3 p-6 flex flex-col justify-between" data-aos="fade-left">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold mb-1">
//               {adminData?.name || adminData?.personalInformation?.name || 'Admin Name'}
//             </h1>
//             <h2 className="text-md text-slate-600 mb-4">
//               {adminData?.professionalInformation?.position || 'Admin'} / {adminData?.professionalInformation?.department || 'Management'}
//             </h2>

//             <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
//               {adminData?.bio || adminData?.professionalInformation?.bio ||
//                 "This admin manages core operations, oversees system performance, and ensures platform stability and efficiency for all users."}
//             </p>

//             <div className="space-y-2 text-sm md:text-base">
//               <p className="flex items-center gap-2 text-slate-700">
//                 <FaMapMarkerAlt className="text-slate-500" />
//                 <span>Location:</span> {adminData?.personalInformation?.address?.city || 'City'}, {adminData?.personalInformation?.address?.country || 'Country'}
//               </p>
//               <p className="flex items-center gap-2 text-slate-700">
//                 <FaPhoneAlt className="text-slate-500" />
//                 <span>Phone:</span> {adminData?.phone || adminData?.personalInformation?.phone || 'Not provided'}
//               </p>
//               <p className="flex items-center gap-2 text-slate-700">
//                 <FaEnvelope className="text-slate-500" />
//                 <span>Email:</span> {adminData?.email || adminData?.personalInformation?.email || 'Not provided'}
//               </p>
//               <p className="flex items-center gap-2 text-slate-700">
//                 <FaIdCard className="text-slate-500" />
//                 <span>Employee ID:</span> {adminData?.professionalInformation?.employeeId || 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs Navigation */}
//       <div className="max-w-5xl flex border-b border-gray-200 mb-6" data-aos="fade-up">
//         <button
//           className={`py-2 px-4 font-medium ${activeTab === 'personal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => setActiveTab('personal')}
//         >
//           Personal Info
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${activeTab === 'professional' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => setActiveTab('professional')}
//         >
//           Professional
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => setActiveTab('security')}
//         >
//           Security
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//           onClick={() => setActiveTab('activity')}
//         >
//           Activity
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="max-w-5xl" data-aos="fade-up">
//         {renderTabContent()}
//       </div>

//       {/* Stats Grid */}
//       <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
//         {[
//           { label: 'Total Rooms', value: stats.totalRooms, icon: <FaBed className="text-blue-600 text-2xl" /> },
//           { label: 'Available Rooms', value: stats.availableRooms, icon: <FaDoorOpen className="text-green-600 text-2xl" /> },
//           { label: 'Available Rooms (%)', value: `${stats.availableRoomsPercentage}%`, icon: <FaDoorOpen className="text-green-600 text-2xl" /> },
//           { label: 'Unavailable Rooms', value: stats.totalRooms - stats.availableRooms, icon: <FaDoorClosed className="text-red-600 text-2xl" /> },
//           { label: 'Unavailable Rooms (%)', value: `${stats.unavailableRoomsPercentage}%`, icon: <FaDoorClosed className="text-red-600 text-2xl" /> },
//           { label: 'Users', value: stats.users, icon: <FaUsers className="text-indigo-600 text-2xl" /> },
//           { label: 'Members', value: stats.members, icon: <FaUserCheck className="text-teal-600 text-2xl" /> },
//           { label: 'Total Coupons', value: stats.coupons, icon: <FaTicketAlt className="text-yellow-600 text-2xl" /> },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 rounded-md p-4 shadow flex items-center justify-between gap-4 hover:scale-[1.02] transition duration-300"
//             data-aos="fade-up"
//             data-aos-delay={index * 100}
//           >
//             <div>
//               <p className="text-sm font-medium text-slate-500">{item.label}</p>
//               <p className="text-xl font-bold text-gray-800">{item.value}</p>
//             </div>
//             {item.icon}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;