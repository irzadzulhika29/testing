import { IoMdCreate } from "react-icons/io";
import { useState } from "react";
import ShareActivityCard from "../../../components/dashboard/shareactivity/ShareActivityCard";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import activityData from "../../../assets/shareyouractivity/activityData.json";

const ShareYourActivity = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
        if (!showModal) {
            setSelectedImage(null);
            setImagePreview(null);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow relative">
                    <Navbar showSearchBar={false} />

                    {/* Header Section */}
                    <div className="mx-10 h-16 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#45c517]">Feeds</h1>
                        <div className="flex gap-5">
                            <p className="hover:cursor-pointer font-semibold text-lg text-black">Terbaru</p>
                            <p className="hover:cursor-pointer text-gray-500 text-lg">Popular</p>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="mt-5 flex justify-center items-center w-full">
                        <div className="w-3/5">
                            {activityData.map((activity) => (
                                <ShareActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                    </div>

                    {/* Floating Action Button */}
                    <button
                        onClick={toggleModal}
                        className="fixed bottom-8 right-8 p-4 bg-[#45c517] rounded-full shadow-lg hover:bg-[#3ba513] transition-colors"
                    >
                        <IoMdCreate className="text-white text-2xl" />
                    </button>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-[500px] relative z-60">
                                <h2 className="text-xl font-bold mb-4">Buat Postingan Baru</h2>
                                <textarea
                                    className="w-full h-32 p-2 border rounded mb-4"
                                    placeholder="Apa yang ingin Anda bagikan?"
                                />
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-100 file:text-gray-700
                        hover:file:bg-gray-200"
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mt-4 w-full h-40 object-cover rounded border"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={toggleModal}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#45c517] text-white rounded-full hover:bg-[#3ba513]"
                                    >
                                        Posting
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ShareYourActivity;
