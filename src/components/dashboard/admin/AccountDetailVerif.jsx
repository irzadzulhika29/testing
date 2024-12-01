import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SidebarAdmin from "../../../components/dashboard/admin/SidebarAdmin";
import NavbarAdmin from "../../../components/dashboard/admin/NavbarAdmin";

const AccountDetailVerif = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        } else {
            fetchUserData();
        }
    }, [id, location.state]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleVerification = (status) => {
        console.log(`User ${id} ${status}`);
        navigate('/admin/verification-requests');
    };

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarAdmin />
                    <h1 className="mt-5 mx-10 text-2xl font-bold text-[#45c517]">
                        Detail Verifikasi Akun
                    </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        className="text-green-500 hover:cursor-pointer mx-10 bi bi-arrow-left-short"
                        viewBox="0 0 16 16"
                        onClick={() => window.history.back()}
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                        />
                    </svg>
                    <section className="min-h-screen mx-10 my-5 p-6 rounded-md bg-white shadow-md">
                        {userData ? (
                            <div className="space-y-8">
                                {/* Profile Section */}
                                <div className="flex items-start gap-8">
                                    <div className="w-48 h-48 overflow-hidden border-2 border-[#45c517] rounded-full">
                                        <img
                                            src={userData.image_url}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                                        <p className="text-gray-600">Username: {userData.username}</p>
                                        <p className="text-gray-600">Email: {userData.email}</p>
                                        <p className="text-gray-600">Phone: {userData.phone_number}</p>
                                        <p className="text-gray-600">Role: {userData.role}</p>
                                        <p className="text-gray-600">Status: {userData.status}</p>
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Informasi Lokasi</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Lokasi</p>
                                            <p className="font-medium">{userData.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Alamat</p>
                                            <p className="font-medium">{userData.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Informasi Perusahaan</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Nama Pendiri</p>
                                            <p className="font-medium">{userData.nama_pendiri}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Nomor Rekening</p>
                                            <p className="font-medium">{userData.nomor_rekening_perusahaan}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Deskripsi</h3>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {userData.deskripsi}
                                    </p>
                                </div>

                                {/* Documents */}
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Dokumen</h3>
                                    <div className="border p-4 rounded-lg">
                                        <p className="text-gray-600 mb-2">Surat Izin</p>
                                        <img
                                            src={userData.surat_izin}
                                            alt="Surat Izin"
                                            className="w-full h-48 object-cover rounded"
                                        />
                                    </div>
                                </div>

                                {/* Verification Buttons */}
                                <div className="border-t pt-6 flex justify-end space-x-4">
                                    <button
                                        onClick={() => handleVerification('ditolak')}
                                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Tolak Verifikasi
                                    </button>
                                    <button
                                        onClick={() => handleVerification('diterima')}
                                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Terima Verifikasi
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Data tidak ditemukan</p>
                            </div>
                        )}
                    </section>
                </div>
            </section>
        </div>
    );
};

export default AccountDetailVerif;