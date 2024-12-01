import { useState } from "react";
import SidebarAdmin from '../../../../components/dashboard/admin/SidebarAdmin';
import NavbarAdmin from '../../../../components/dashboard/admin/NavbarAdmin';
import articleData from '../../../../assets/blogarticle/articleData.json';
import { useNavigate } from "react-router-dom";



const BlogArticleVerif = () => {
    const [activeTab, setActiveTab] = useState("Draft");
    const navigate = useNavigate();

    const handleDetailClick = (article) => {
        navigate(`/article-detail-verif/${article.id}`, {
            state: {
                status: activeTab,
                showButtons: activeTab !== "Rejected"
            }
        });
    };

    const articles = {
        Draft: [articleData[0]],
        Accepted: [articleData[1]],
        Rejected: [articleData[2]],
    };

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarAdmin />
                    <h1 className="mt-5 mx-10 text-2xl font-bold text-[#45c517]">
                        Verifikasi Blog & Article
                    </h1>
                  
                    <section className="min-h-screen mx-10 my-5 p-5 rounded-md bg-white shadow-md">
                        {/* Tabs */}
                        <div className="font-semibold flex gap-7">
                            <p
                                className={`cursor-pointer ${activeTab === "Draft"
                                    ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => setActiveTab("Draft")}
                            >
                                Draft
                            </p>
                            <p
                                className={`cursor-pointer ${activeTab === "Accepted"
                                    ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => setActiveTab("Accepted")}
                            >
                                Accepted
                            </p>
                            <p
                                className={`cursor-pointer ${activeTab === "Rejected"
                                    ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => setActiveTab("Rejected")}
                            >
                                Rejected
                            </p>
                        </div>

                        {/* Table */}
                        <div className="p-4">
                            <table className="table-fixed w-full border-collapse">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-4 py-2 font-semibold w-2/6">Author</th>
                                        <th className="px-4 py-2 font-semibold w-1/12">ID</th>
                                        <th className="px-4 py-2 font-semibold w-1/6">Kategori</th>
                                        <th className="px-4 py-2 font-semibold w-1/4">Judul Artikel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles[activeTab].map((article, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 flex items-center gap-3">
                                                <img
                                                    src={article.author_profile}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="block truncate">{article.author_name}</span>
                                            </td>
                                            <td className="px-4 py-2">{article.id}</td>
                                            <td className="px-4 py-2">{article.category}</td>
                                            <td className="px-4 py-2">
                                                <span className="block truncate">{article.title}</span>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {activeTab !== "Rejected" ? (
                                                    <button
                                                        onClick={() => handleDetailClick(article)}
                                                        className="bg-[#45c517] text-white w-32 py-2 rounded-full hover:opacity-90 text-sm font-medium"
                                                    >
                                                        Lihat Detail
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500">Rejected</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default BlogArticleVerif;