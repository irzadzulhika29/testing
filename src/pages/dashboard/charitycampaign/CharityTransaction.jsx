import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import charityData from '../../../assets/charitycampaign/lembagaSosialData.json';
import Sidebar from '../../../components/dashboard/Sidebar';
import Navbar from '../../../components/dashboard/Navbar';

const CharityTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [charity, setCharity] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');

    useEffect(() => {
        const selectedCharity = charityData.find((item) => item.id === parseInt(id));
        setCharity(selectedCharity);
    }, [id]);

    const handleDonationClick = (amount) => {
        setDonationAmount(amount);
    };

    const handleConfirm = () => {
        // Navigate to payment method page with ID and donation amount
        navigate(`/payment-charity/${id}`, {
            state: {
                total: Number(donationAmount),
                isCharity: true // Optional flag to identify charity payments
            }
        });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <section className="min-h-screen mx-10 my-5 rounded-md bg-white shadow-md p-6">
                        {charity && (
                            <div>
                                <h2 className="text-2xl font-bold">{charity.name}</h2>
                                <p className="mt-4">{charity.description}</p>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Pilih Jumlah Donasi</h3>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => handleDonationClick(50000)}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Rp50.000
                                </button>
                                <button
                                    onClick={() => handleDonationClick(100000)}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Rp100.000
                                </button>
                                <button
                                    onClick={() => handleDonationClick(200000)}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Rp200.000
                                </button>
                                <button
                                    onClick={() => handleDonationClick(500000)}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Rp500.000
                                </button>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Atau masukkan jumlah donasi:
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Masukkan jumlah donasi dalam Rupiah"
                                    value={donationAmount}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value >= 0) {
                                            setDonationAmount(value);
                                        }
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleConfirm}
                                className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
                                disabled={!donationAmount}
                            >
                                Konfirmasi
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default CharityTransaction;