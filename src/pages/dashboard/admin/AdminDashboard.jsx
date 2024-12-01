import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SidebarAdmin from '../../../components/dashboard/admin/SidebarAdmin';
import NavbarAdmin from '../../../components/dashboard/admin/NavbarAdmin';
import newUserData from '../../../assets/user/newUser.json';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDetailClick = (request) => {
    navigate(`/account-verif/${request.id}`, { state: { userData: request } });
  };

  const [verificationRequests, setVerificationRequests] = useState([]);
  useEffect(() => {
    // Filter only pending verification requests from newUser.json
    const pendingRequests = newUserData.filter(user => user.status === 'pending');
    setVerificationRequests(pendingRequests);
  }, []);

  // Variants for animations
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar akan selalu fixed di sebelah kiri */}
      <SidebarAdmin />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20"> {/* Tambahkan padding-top agar konten tidak tertutup */}
        <div className="flex-grow">
          <NavbarAdmin />
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-5 mx-10 text-2xl font-bold"
          >
            Dashboard
          </motion.h1>
          <section className="min-h-screen mx-10 my-5 ">
            <div className='flex w-full gap-5 '>
              <motion.div
                className='w-2/3 flex flex-wrap gap-5 justify-between'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >

                <motion.div variants={cardVariants} className='group p-3 w-[48%] bg-white rounded-xl hover:cursor-pointer hover:bg-[#45c517] shadow-md'>
                  <svg width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="mb-3 p-2 bg-[#f4fef1] rounded-full" fill="green">
                    <path d="M14 1.33v13.34h-1.33v-4.67H10V5.33c0-2.21 1.79-4 4-4zM12.67 3c-.55.31-1.33 1.1-1.33 2.33v3.34h1.33V3zM6 9.27v5.4H4.67v-5.4A3.33 3.33 0 012 6V2h1.33v4.67h1.34V2H6v4.67h1.33V2H8.67v4c0 1.61-1.15 2.96-2.67 3.27z" />
                  </svg>
                  <h1 className='text-2xl font-semibold mb-2 text-[#45c517] group-hover:text-white'>68</h1>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-xs group-hover:text-white'>Active Meals</p>
                    <p className='font-semibold text-xs text-[#45c517] group-hover:text-white'>+32%</p>
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className='group p-3 w-[48%] bg-white rounded-xl hover:cursor-pointer hover:bg-[#45c517] shadow-md'>
                  <svg width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mb-3 p-2 bg-[#f4fef1] rounded-full" fill="green">
                    <path d="M5.00488 9.00281C5.55717 9.00281 6.00488 9.45052 6.00488 10.0028C7.63965 10.0028 9.14352 10.5632 10.3349 11.5023L12.5049 11.5028C13.8375 11.5028 15.0348 12.0821 15.8588 13.0025L19.0049 13.0028C20.9972 13.0028 22.7173 14.1681 23.521 15.8542C21.1562 18.9748 17.3268 21.0028 13.0049 21.0028C10.2142 21.0028 7.85466 20.3996 5.944 19.3449C5.80557 19.7284 5.43727 20.0028 5.00488 20.0028H2.00488C1.4526 20.0028 1.00488 19.5551 1.00488 19.0028V10.0028C1.00488 9.45052 1.4526 9.00281 2.00488 9.00281H5.00488ZM6.00589 12.0028L6.00488 17.0248L6.05024 17.0573C7.84406 18.3177 10.183 19.0028 13.0049 19.0028C16.0089 19.0028 18.8035 17.8472 20.84 15.8734L20.9729 15.7398L20.8537 15.6394C20.3897 15.2764 19.8205 15.0512 19.2099 15.0097L19.0049 15.0028L16.8934 15.0028C16.9664 15.3244 17.0049 15.6591 17.0049 16.0028V17.0028H8.00488V15.0028L14.7949 15.0018L14.7605 14.9233C14.38 14.1297 13.593 13.5681 12.6693 13.5081L12.5049 13.5028L9.57547 13.5027C8.66823 12.5773 7.40412 12.0031 6.00589 12.0028ZM4.00488 11.0028H3.00488V18.0028H4.00488V11.0028ZM18.0049 5.00281C19.6617 5.00281 21.0049 6.34595 21.0049 8.00281C21.0049 9.65966 19.6617 11.0028 18.0049 11.0028C16.348 11.0028 15.0049 9.65966 15.0049 8.00281C15.0049 6.34595 16.348 5.00281 18.0049 5.00281Z" />
                  </svg>
                  <h1 className='text-2xl font-semibold mb-2 text-[#45c517] group-hover:text-white'>14</h1>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-xs group-hover:text-white'>Active Campaign</p>
                    <p className='font-semibold text-xs text-[#45c517] group-hover:text-white'>+12%</p>
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className='group p-3 w-[48%] bg-white rounded-xl hover:cursor-pointer hover:bg-[#45c517] shadow-md'>
                  <svg width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mb-3 p-2 bg-[#f4fef1] rounded-full" fill="green">
                    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" />
                  </svg>
                  <h1 className='text-2xl font-semibold mb-2 text-[#45c517] group-hover:text-white'>176</h1>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-xs group-hover:text-white'>Total Users</p>
                    <p className='font-semibold text-xs text-[#45c517] group-hover:text-white'>+15%</p>
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className='group p-3 w-[48%] bg-white rounded-xl hover:cursor-pointer hover:bg-[#45c517] shadow-md'>
                  <svg width="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mb-3 p-2 bg-[#f4fef1] rounded-full" fill="green">
                    <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z" />
                  </svg>
                  <h1 className='text-2xl font-semibold mb-2 text-[#45c517] group-hover:text-white'>54</h1>
                  <div className='flex justify-between'>
                    <p className='font-semibold text-xs group-hover:text-white'>Active Articles</p>
                    <p className='font-semibold text-xs text-[#45c517] group-hover:text-white'>+7%</p>
                  </div>
                </motion.div>

              </motion.div>
              <motion.div
                className='w-1/2 flex flex-col gap-5'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {/* Product Transactions */}
                <div className='w-full p-5 bg-white shadow-md rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold'>Total Transaksi Produk</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#45c517" viewBox="0 0 16 16">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                  </div>
                  <div className='flex items-end justify-between'>
                    <div>
                      <p className='text-gray-500 text-sm'>Total Revenue</p>
                      <h3 className='text-2xl font-bold text-[#45c517]'>Rp2.450.000</h3>
                    </div>
                    <div className='flex items-center gap-1 text-[#45c517] text-sm'>
                      <span>+24%</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 12l-4.5-4.5 1.06-1.06L8 9.88l3.44-3.44 1.06 1.06z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Charity Transactions */}
                <div className='w-full p-5 bg-white  shadow-md rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold'>Total Donasi Charity</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#45c517" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </div>
                  <div className='flex items-end justify-between'>
                    <div>
                      <p className='text-gray-500 text-sm'>Total Donasi</p>
                      <h3 className='text-2xl font-bold text-[#45c517]'>Rp5.670.000</h3>
                    </div>
                    <div className='flex items-center gap-1 text-[#45c517] text-sm'>
                      <span>+35%</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 12l-4.5-4.5 1.06-1.06L8 9.88l3.44-3.44 1.06 1.06z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Table for account verification requests */}
            <motion.div
              className='w-full mt-5'
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              <div className='w-full p-5 bg-white shadow-md rounded-xl'>
                <h2 className='text-lg font-semibold mb-4 text-[#45c517]'>Permintaan Verifikasi Akun</h2>
                <div className='overflow-x-auto'>
                  <table className='min-w-full text-left table-fixed'>
                    <thead>
                      <tr>
                        <th className='px-4 py-2 w-16'>No</th>
                        <th className='px-4 py-2 w-28 truncate'>Nama</th> {/* Set fixed width and truncate */}
                        <th className='px-4 py-2'>Email</th>
                        <th className='px-4 py-2'>Role</th>
                        <th className='px-4 py-2'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verificationRequests.map((request, index) => (
                        <tr key={request.id} className='hover:bg-gray-100'>
                          <td className='px-4 py-2'>{index + 1}</td>
                          <td className='px-4 py-2 truncate'>{request.name}</td> {/* Removed width here */}
                          <td className='px-4 py-2'>{request.email}</td>
                          <td className='px-4 py-2'>{request.role}</td>
                          <td className='px-4 py-2'>
                            <span className={`px-3 text-sm py-1 rounded-full text-white 
            ${request.status === 'pending' ? 'bg-yellow-500' :
                                request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                              {request.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDetailClick(request)}
                              className='px-5 text-sm py-1 bg-[#45c517] text-white rounded-full hover:bg-[#3ba913]'
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>


                </div>
              </div>
            </motion.div>

          </section>
        </div>
      </section >

    </div >
  )
}

export default AdminDashboard
