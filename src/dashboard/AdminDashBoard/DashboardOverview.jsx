import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  FiUsers,
  FiHome,
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiCalendar,
  FiPieChart
} from 'react-icons/fi';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalAgreements: 0,
    totalApartments: 0,
    totalRevenue: 0,
    recentBookings: [],
    occupancyRate: 0
  });

  const [agreementsData, setAgreementsData] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0
  });

  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');



  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersRes, agreementsRes, apartmentsRes] = await Promise.all([
          axios.get('https://aaponaloi-server.vercel.app/users'),
          axios.get('https://aaponaloi-server.vercel.app/all-agreements'),
          axios.get('https://aaponaloi-server.vercel.app/apartments'),
          axios.get('https://aaponaloi-server.vercel.app/members'),
          axios.get('https://aaponaloi-server.vercel.app/coupons'),
        ]);

        const members = usersRes.data.filter(u => u.role === 'member').length;
        const totalRevenue = agreementsRes.data.reduce(
          (sum, a) => (a.status === 'accepted' ? sum + Number(a.rent) : sum),
          0
        );

        const pending = agreementsRes.data.filter(a => a.status === 'pending').length;
        const accepted = agreementsRes.data.filter(a => a.status === 'checked').length;
        const rejected = agreementsRes.data.filter(a => a.status === 'checked' && !a.approve).length;

        // Calculate occupancy rate (example calculation)
        const occupiedApartments = agreementsRes.data.filter(a => {
          if (a.status !== "checked") return false;

          // If no endDate, consider it still occupied
          if (!a.endDate) return true;

          const end = new Date(a.endDate);
          return !isNaN(end) && end > new Date();
        }).length;

        const occupancyRate = apartmentsRes.data.length > 0
          ? Math.round((occupiedApartments / apartmentsRes.data.length) * 100)
          : 0;


        // Get recent bookings
        const recentBookings = agreementsRes.data
          .filter(a => a.status === 'checked')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setStats({
          totalMembers: members,
          totalAgreements: agreementsRes.data.length,
          totalApartments: apartmentsRes.data.length,
          totalRevenue,
          recentBookings,
          occupancyRate
        });

        setAgreementsData({ pending, accepted, rejected });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  const barData = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Agreements',
        data: [agreementsData.pending, agreementsData.accepted, agreementsData.rejected],
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [stats.occupancyRate, 100 - stats.occupancyRate],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(200, 200, 200, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(200, 200, 200, 1)'
        ],
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  };

  const statCards = [
    {
      label: 'Total Members',
      value: stats.totalMembers,
      icon: <FiUsers className="" size={24} />,
      trend: '+12%',
      trendPositive: true,
    },
    {
      label: 'Total Apartments',
      value: stats.totalApartments,
      icon: <FiHome className="" size={24} />,
      trend: '+5%',
      trendPositive: true,
    },
    {
      label: 'Active Bookings',
      value: stats.totalAgreements,
      icon: <FiFileText className="" size={24} />,
      trend: '+8%',
      trendPositive: true,
    },
    {
      label: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign className="" size={24} />,
      trend: '+18%',
      trendPositive: true,
    },

  ];

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };



  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your properties.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 bg-primary/20 p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'font-semibold' : 'text-gray-600'}`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'font-semibold' : 'text-gray-600'}`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'font-semibold' : 'text-gray-600'}`}
            >
              Year
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-primary/20 p-6 rounded-xl shadow-sm h-32 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="bg-primary/20 p-6 rounded-xl shadow-md  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{card.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs font-medium ${card.trendPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {card.trend}
                        </span>
                        <FiTrendingUp
                          className={`ml-1 ${card.trendPositive ? 'text-green-500' : 'text-red-500'}`}
                          size={14}
                        />
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/50">
                      {card.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Agreements Chart */}
                <motion.div
                  className="bg-primary/20 p-6 rounded-xl shadow-md  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Booking Status</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1" size={14} />
                      {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}
                    </div>
                  </div>
                  <div className="h-64">
                    <Bar
                      data={barData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              drawBorder: false,
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </motion.div>

                {/* Recent Bookings */}
                <motion.div
                  className="bg-primary/20 p-6 rounded-xl shadow-md  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {stats.recentBookings.length > 0 ? (
                      stats.recentBookings.map((booking, i) => (
                        <div key={i} className="flex items-center p-3 hover:bg-primary/20 rounded-lg transition-colors">
                          <div className="p-2 rounded-full font-semibold mr-4">
                            <FiFileText size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Apartment #{booking.apartmentId}</p>
                            <p className="text-sm text-gray-500">{formatDate(booking.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">৳{booking.rent}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'accepted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-primary/50'
                              }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No recent bookings</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Occupancy Rate */}
                <motion.div
                  className="bg-primary/20 p-6 rounded-xl shadow-md  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Rate</h3>
                  <div className="h-48 mb-4 relative">
                    <Doughnut
                      data={doughnutData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
                        <p className="text-sm text-gray-500">Current occupancy</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-primary/500 mr-2"></span>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
                      <span>Available</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="bg-primary/20 p-6 rounded-xl shadow-md  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FiPieChart className="text-gray-500 mr-2" size={16} />
                        <span className="text-sm text-gray-600">Avg. Booking Duration</span>
                      </div>
                      <span className="text-sm font-medium">12 months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-500 mr-2" size={16} />
                        <span className="text-sm text-gray-600">Avg. Monthly Rent</span>
                      </div>
                      <span className="text-sm font-medium">৳25,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FiUsers className="text-gray-500 mr-2" size={16} />
                        <span className="text-sm text-gray-600">New Members</span>
                      </div>
                      <span className="text-sm font-medium">24 this month</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;