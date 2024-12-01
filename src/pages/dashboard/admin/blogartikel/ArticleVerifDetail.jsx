
import Navbar from '../../../../components/dashboard/Navbar';
import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import articleData from "../../../../assets/blogarticle/articleData.json";

const ArticleVerifDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const article = {
        ...articleData.find(item => item.id === parseInt(id)),
        status: location.state?.status || "Draft"
    };

    if (!article) return <div>Article not found</div>;

    const handleDelete = (id) => {
        console.log("Deleting article:", id);
        // Add delete logic here
    };

    const handleReject = (id) => {
        console.log("Rejecting article:", id);
        // Add reject logic here
    };

    const handleAccept = (id) => {
        console.log("Accepting article:", id);
        // Add accept logic here
    };

    const showButtons = location.state?.showButtons ?? true;


    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    
                    <div className="mx-10 mt-5  items-center gap-4">
                       
                        <h1 className="text-2xl font-bold text-[#45c517]">Detail Article</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            className="text-green-500 hover:cursor-pointer bi bi-arrow-left-short transition-transform hover:scale-110"
                            viewBox="0 0 16 16"
                            onClick={() => navigate(-1)}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                            />
                        </svg>
                    </div>

                    <section className="mx-10 my-5 bg-white rounded-xl shadow-md p-6">
                        {/* Article Image */}
                        <img
                            src={article.img_content}
                            alt={article.title}
                            className="w-full h-64 object-cover rounded-xl mb-6"
                        />

                        {/* Article Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Author
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={article.author_profile}
                                            alt={article.author_name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="text-gray-800">{article.author_name}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        value={article.title}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <input
                                        value={article.category}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Created At
                                    </label>
                                    <input
                                        value={article.created_at}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Reading Time
                                    </label>
                                    <input
                                        value={article.read_min}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                value={article.content}
                                className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50 min-h-[100px]"
                                readOnly
                            />
                        </div>

                        {/* Status Indicator */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Status
                            </label>
                            <div className={`inline-block px-4 py-2 rounded-full ${article.status === "Rejected"
                                ? "bg-red-100 text-red-600"
                                : article.status === "Accepted"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}>
                                {article.status}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end gap-4">
                            {showButtons && (
                                <>
                                    {article.status === "Accepted" && (
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="px-6 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                                        >
                                            Hapus
                                        </button>
                                    )}

                                    {article.status === "Draft" && (
                                        <>
                                            <button
                                                onClick={() => handleReject(article.id)}
                                                className="px-6 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                                            >
                                                Tolak
                                            </button>
                                            <button
                                                onClick={() => handleAccept(article.id)}
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
                                    Article ini telah ditolak
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default ArticleVerifDetail
