// ShareMeals.jsx
import { useEffect, useState } from 'react';
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import { motion } from "framer-motion";
import CardShareMeals from "../../../components/dashboard/sharemeals/CardShareMeals";
import { Link } from 'react-router-dom';

const ShareMeals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    fetch('/productData.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.filter((product) => product.category === 'Makanan'));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar without animation */}
      <Sidebar />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar />

          <motion.div
            className="p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Title */}
            <motion.h1
              className="text-[#45c517] text-3xl font-bold mb-6"
              variants={itemVariants}
            >
              Share Meals
            </motion.h1>

            {/* Products Section */}
            <motion.section variants={containerVariants}>
              <motion.h2
                className="text-xl font-semibold text-[#45c517] mb-6"
                variants={itemVariants}
              >
                Produk yang anda bagikan
              </motion.h2>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-64 bg-gray-200 rounded-xl animate-pulse"
                      variants={itemVariants}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  className="flex justify-start flex-wrap gap-8"
                  variants={containerVariants}
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <CardShareMeals product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>

            {/* Floating Button */}
            <motion.div
              className="fixed right-10 bottom-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
            >
              <Link to="/share-meals/form">
                <motion.button
                  className="bg-[#47cb18] hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(71, 203, 24, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bagikan Produk
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShareMeals;
