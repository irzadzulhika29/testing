// ShareMealsForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import kotaData from "../../../assets/sharemeals/kotaData.json";
import categoryList from "../../../../public/categoryList.json";

const ShareMealsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productImage: null,
    description: "",
    price: "",
    stock: "",
    category: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    alamatLengkap: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" }); // type can be 'success' or 'error'

  const setMessageAndScroll = (text, type) => {
    setMessage({ text, type });
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing again
    setMessage({ text: "", type: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        productImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Check if any field is empty
    const fields = [
      formData.productName,
      formData.productImage,
      formData.description,
      formData.price,
      formData.stock,
      formData.category,
      formData.kota,
      formData.kecamatan,
      formData.kelurahan,
      formData.alamatLengkap
    ];

    if (fields.some(field => !field)) {
      setMessageAndScroll("Mohon isi seluruh form terlebih dahulu", "error");
      return false;
    }

    if (formData.price < 0) {
      setMessageAndScroll("Harga produk tidak boleh negatif", "error");
      return false;
    }

    if (formData.stock < 0) {
      setMessageAndScroll("Stok produk tidak boleh negatif", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log(formData);
      setMessageAndScroll("Produk berhasil ditambahkan!", "success");
      
      // Reset form
      setFormData({
        productName: "",
        productImage: null,
        description: "",
        price: "",
        stock: "",
        category: "",
        kota: "",
        kecamatan: "",
        kelurahan: "",
        alamatLengkap: ""
      });
      setImagePreview(null);
    }
  };

  // Simplified location data handling
  const cities = Object.keys(kotaData);
  const districts = formData.kota ? Object.keys(kotaData[formData.kota]) : [];
  const subDistricts = formData.kota && formData.kecamatan ? kotaData[formData.kota][formData.kecamatan] : [];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />
          <div className="mt-5 pb-10 mx-10">
            <h1 className="text-[#45c517] text-2xl font-bold mb-6">Bagikan Produk</h1>
            
            {/* Message Display */}
            {message.text && (
              <div 
                className={`mb-4 p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-400' 
                    : 'bg-red-100 text-red-700 border border-red-400'
                }`}
              >
                {message.text}
              </div>
            )}
            
            <div className="flex gap-6">
              <form onSubmit={handleSubmit} className="flex-1 bg-white p-6 rounded-lg shadow-md">
                {/* Product Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    autoComplete="off"
                  />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                    Foto Produk
                  </label>
                  <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Deskripsi Produk
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    rows="4"
                    autoComplete="off"
                  />
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Harga Produk
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    autoComplete="off"
                  />
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                    Jumlah Stok
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    autoComplete="off"
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Kategori Produk
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryList.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kota */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kota">
                    Kota
                  </label>
                  <select
                    id="kota"
                    name="kota"
                    value={formData.kota}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  >
                    <option value="">Pilih Kota</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kecamatan */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kecamatan">
                    Kecamatan
                  </label>
                  <select
                    id="kecamatan"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    disabled={!formData.kota}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kelurahan */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kelurahan">
                    Kelurahan
                  </label>
                  <select
                    id="kelurahan"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                    disabled={!formData.kecamatan}
                  >
                    <option value="">Pilih Kelurahan</option>
                    {subDistricts.map((subDistrict, index) => (
                      <option key={index} value={subDistrict}>
                        {subDistrict}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Alamat Lengkap */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamatLengkap">
                    Alamat Lengkap
                  </label>
                  <textarea
                    id="alamatLengkap"
                    name="alamatLengkap"
                    value={formData.alamatLengkap}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    placeholder="Masukkan alamat lengkap..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#45c517] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#3ba714] transition-colors"
                >
                  Upload Produk
                </button>
              </form>

              {/* Preview Card */}
              <div className="w-80 bg-white p-4 rounded-lg shadow-md h-fit sticky top-28">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview Produk</h2>
                
                {/* Product Image Preview */}
                <div className="mb-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image uploaded</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {formData.productName || "Nama Produk"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-green-600 font-semibold text-lg">
                      {formData.price ? `Rp ${Number(formData.price).toLocaleString('id-ID')}` : "Rp 0"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Stok: {formData.stock || "0"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      {formData.description || "Deskripsi produk akan muncul di sini"}
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-600">Kategori:</p>
                    <p className="text-sm text-gray-800">{formData.category || "-"}</p>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm font-medium text-gray-600">Lokasi:</p>
                    <p className="text-sm text-gray-800">
                      {formData.kelurahan && formData.kecamatan && formData.kota
                        ? `${formData.kelurahan}, ${formData.kecamatan}, ${formData.kota}`
                        : "Lokasi belum dipilih"}
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

export default ShareMealsForm;