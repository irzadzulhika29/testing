import { useState } from 'react';
import Navbar from '../../../components/dashboard/Navbar';
import Sidebar from '../../../components/dashboard/Sidebar';

const ArticleForm = () => {

    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [imagePreview, setImagePreview] = useState('');



    const categories = [
        'Technology',
        'Health',
        'Business',
        'Lifestyle',
        'Education'
    ];

    // Add preview update function
    const updatePreview = (form) => {
        const previewTitle = document.getElementById('previewTitle');
        const previewContent = document.getElementById('previewContent');
        const previewCategory = document.getElementById('previewCategory');

        if (previewTitle) previewTitle.textContent = form.title.value || 'Judul Artikel';
        if (previewContent) previewContent.textContent = form.content.value || 'Konten artikel akan ditampilkan di sini...';
        if (previewCategory) previewCategory.textContent = form.category.value || 'Kategori';
    };


    const handleInputChange = (e) => {
        const input = e.target;
        clearError(input);
        
        if (input.name === 'title' && input.value.length > 25) {
            document.getElementById('titleError').textContent = 'Judul tidak boleh lebih dari 25 karakter';
        }
        
        updatePreview(input.form);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            clearError(e.target);
        }
    };

    // Update the showSuccess function
    const showSuccess = (message) => {
        const formError = document.getElementById('formError');
        formError.textContent = message;
        formError.className = 'text-[#45c517] text-md font-medium line-clamp-2';
    };


    const clearError = (element) => {
        const errorElement = document.getElementById(`${element.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.className = 'text-red-500 text-sm';
        }
    };

    const validateForm = (form) => {
        let isValid = true;
        const title = form.title.value;
        const content = form.content.value;
        const category = form.category.value;
        const imageFile = form.image.files[0];
    
        // Reset error messages
        document.getElementById('titleError').textContent = '';
        document.getElementById('titleError').className = 'text-red-500 text-sm';
        document.getElementById('contentError').textContent = '';
        document.getElementById('contentError').className = 'text-red-500 text-sm';
        document.getElementById('categoryError').textContent = '';
        document.getElementById('categoryError').className = 'text-red-500 text-sm';
        document.getElementById('imageError').textContent = '';
        document.getElementById('imageError').className = 'text-red-500 text-sm';
        document.getElementById('formError').textContent = '';
    
        if (!title.trim()) {
            document.getElementById('titleError').textContent = 'Judul harus diisi';
            isValid = false;
        } else if (title.length > 25) {
            document.getElementById('titleError').textContent = 'Judul tidak boleh lebih dari 25 karakter';
            isValid = false;
        }
        
        // Validasi lainnya tetap sama
        if (!content.trim()) {
            document.getElementById('contentError').textContent = 'Konten harus diisi';
            isValid = false;
        }
        if (!category) {
            document.getElementById('categoryError').textContent = 'Kategori harus dipilih';
            isValid = false;
        }
        if (!imageFile && !imagePreview) {
            document.getElementById('imageError').textContent = 'Foto harus diunggah';
            isValid = false;
        }
    
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const errorMessage = document.getElementById('formError');

        if (!validateForm(form)) {
            errorMessage.textContent = 'Mohon lengkapi semua field yang diperlukan';
            errorMessage.className = 'text-red-500 text-md line-clamp-2';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';
        errorMessage.textContent = '';

        // Get image URL from preview
        const imageUrl = document.querySelector('#imagePreview img')?.src || '';

        // Set preview data
        setPreviewData({
            title: form.title.value,
            content: form.content.value,
            category: form.category.value,
            imageUrl: imageUrl
        });
        setShowPreview(true);

        // Simulate successful upload
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Upload Artikel';
            showSuccess('Artikel berhasil diupload');
        });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <h1 className="mt-5 text-[#45c517] mx-10 text-2xl font-bold">Blog & Article</h1>

                    <div className="mt-5 p-3 rounded-md bg-white mb-5 shadow-md mx-10 flex flex-row gap-8">
                        {/* Form Section */}
                        <div className="flex-1">
                            <h1 className='text-xl text-[#45c517] font-semibold'>Form Artikel</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">


                                {/* input foto */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Foto Artikel</label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                                    />
                                    <h2 id="imageError" className="text-red-500 text-sm"></h2>
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-w-[300px] rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>


                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Judul Artikel</label>
                                    <input
                                        type="text"
                                        name="title"
                                        onInput={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                                        placeholder="Masukkan judul artikel"
                                    />
                                    <h2 id="titleError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Konten Artikel</label>
                                    <textarea
                                        name="content"
                                        onInput={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300 min-h-[200px] resize-y"
                                        placeholder="Tulis konten artikel"
                                    />
                                    <h2 id="contentError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Kategori</label>
                                    <select
                                        name="category"
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300 appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="" disabled>Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <h2 id="categoryError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="  bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-[#3ba913] transition-colors duration-300 font-medium whitespace-nowrap"
                                    >
                                        Upload Artikel
                                    </button>
                                    <div className="flex-1 grid grid-cols-1 gap-2">
                                        <h2 id="formError" className="text-red-500 text-md line-clamp-2"></h2>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Preview Card Section */}
                        <div className="flex-1">
                            <h1 className='text-xl text-[#45c517] font-semibold mb-6'>Preview Artikel</h1>
                            <div className={`border rounded-lg shadow-md p-4 ${!showPreview ? 'blur-sm' : ''}`}>
                                <div className="w-full h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                                    {previewData && previewData.imageUrl ? (
                                        <img
                                            src={previewData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        {previewData ? previewData.title : 'Judul Artikel'}
                                    </h2>
                                    <span className="inline-block bg-[#45c517] text-white px-3 py-1 rounded-full text-sm">
                                        {previewData ? previewData.category : 'Kategori'}
                                    </span>
                                    <div className="max-h-[150px] overflow-y-auto pr-2">
                                        <p className="text-gray-600">
                                            {previewData ? previewData.content : 'Konten artikel akan ditampilkan di sini setelah Anda mengunggah.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleForm;