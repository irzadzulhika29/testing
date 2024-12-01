// CardShareMeals.jsx
import { Link } from "react-router-dom";

const ShareMealsCardMitra = ({ product }) => {
  return (
    <div className='hover:cursor-pointer w-52 bg-white shadow-md rounded-xl overflow-hidden'>
      <img 
        className="object-cover w-full h-28" 
        src={product.image_url} 
        alt={product.productName} 
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.productName}</h3>
        <p className="text-sm mb-4">Sisa Stok: <span className="text-[#45c517]">{product.stok}</span></p>
        <div className="flex justify-between gap-2">
          <Link to={`/mitra/update-product/${product.id}`} className="flex-1">
            <button className="w-full duration-300 transition hover:bg-green-600 bg-[#45c517] text-white py-1 rounded-full">
              Edit
            </button>
          </Link>
          <button className="flex-1 duration-300 transition hover:bg-[#45c517] hover:text-white bg-white border border-[#45c517] text-[#45c517] py-1 rounded-full">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareMealsCardMitra;