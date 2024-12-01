import { useParams, useNavigate, useLocation } from "react-router-dom";

import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import Navbar from "../../../../components/dashboard/Navbar";
import lembagaSosialData from "../../../../assets/charitycampaign/lembagaSosialData.json";

const CampaignDetailVerif = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // Add default status if not present
    const campaign = {
        ...lembagaSosialData.find(item => item.id === parseInt(id)),
        status: location.state?.status || "Draft" // Get status from navigation state
    };
    if (!campaign) return <div>Campaign not found</div>;


    const handleDelete = (id) => {
        console.log("Deleting campaign:", id);
        // Add delete logic here
    };

    const handleReject = (id) => {
        console.log("Rejecting campaign:", id);
        // Add reject logic here
    };

    const handleAccept = (id) => {
        console.log("Accepting campaign:", id);
        // Add accept logic here
    };
    // Get showButtons flag from location state
    const showButtons = location.state?.showButtons ?? true;

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <div className="mx-10 mt-5 gap-4">

                        <h1 className="text-2xl font-bold text-[#45c517]">Detail Campaign</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            className="text-green-500 hover:cursor-pointer bi bi-arrow-left-short"
                            viewBox="0 0 16 16"
                            onClick={() => window.history.back()}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                            />
                        </svg>
                    </div>

                    <section className="mx-10 my-5 bg-white rounded-xl shadow-md p-6">
                        {/* Campaign Image */}
                        <img
                            src={campaign.campaign_image_url}
                            alt={campaign.campaign_title}
                            className="w-full h-64 object-cover rounded-xl mb-6"
                        />

                        {/* Campaign Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Nama Lembaga
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={campaign.image_url}
                                            alt={campaign.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="text-gray-800">{campaign.name}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Judul Campaign
                                    </label>
                                    <input
                                        value={campaign.campaign_title}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <input
                                        value={campaign.category}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Target Donasi
                                    </label>
                                    <input
                                        value={`Rp${campaign.target.toLocaleString('id-ID')}`}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Periode Campaign
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            value={campaign.start_date}
                                            className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                            readOnly
                                        />
                                        <input
                                            value={campaign.end_date}
                                            className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Deskripsi Campaign
                            </label>
                            <textarea
                                value={campaign.description}
                                className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50 min-h-[100px]"
                                readOnly
                            />
                        </div>

                        {/* Status Indicator */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Status Campaign
                            </label>
                            <div className={`inline-block px-4 py-2 rounded-full ${campaign.status === "Rejected"
                                ? "bg-red-100 text-red-600"
                                : campaign.status === "Accepted"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}>
                                {campaign.status}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            {showButtons && (
                                <>
                                    {campaign.status === "Accepted" && (
                                        <button
                                            onClick={() => handleDelete(campaign.id)}
                                            className="px-6 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                                        >
                                            Hapus
                                        </button>
                                    )}

                                    {campaign.status === "Draft" && (
                                        <>
                                            <button
                                                onClick={() => handleReject(campaign.id)}
                                                className="px-6 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                                            >
                                                Tolak
                                            </button>
                                            <button
                                                onClick={() => handleAccept(campaign.id)}
                                                className="px-6 py-2 rounded-full bg-[#45c517] text-white hover:bg-green-600"
                                            >
                                                Terima
                                            </button>
                                        </>
                                    )}
                                </>
                            )}

                            {!showButtons && (
                                <div className="text-gray-500 italic">
                                    Campaign ini telah ditolak
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default CampaignDetailVerif;