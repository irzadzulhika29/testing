import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../../components/dashboard/home/Carousel";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import ProductCard from "../../components/dashboard/grabmeals/ProductCard";
import CharityCard from "../../components/dashboard/charitycampaign/CharityCard";
import charityData from '../../assets/charitycampaign/lembagaSosialData.json';
import ArticleCard from "../../components/dashboard/article/ArticleCard";
import articleData from "../../assets/blogarticle/articleData.json";
import { Link } from "react-router-dom";

const HomeDashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products
        const productResponse = await fetch('/productData.json');
        if (!productResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productData = await productResponse.json();
        setProducts(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const images = [
    {
      id: 1,
      url: "https://img.freepik.com/free-vector/hand-drawn-flat-charity-event-facebook-cover_23-2149398134.jpg?t=st=1732439489~exp=1732443089~hmac=50213c3b89dcf8e4995ec9c15cea57e5d35214f06d3c02790b7a4b9030fbbad9&w=1380",
      title: "Support Our Cause",
      description: "Join us in making a difference in our community",
      alt: "Charity promotion banner showing community support"
    },
    {
      id: 2,
      url: "https://img.freepik.com/free-vector/flat-minimal-charity-event-facebook-cover_23-2149497669.jpg?t=st=1732439524~exp=1732443124~hmac=38d69818fa71872932d7d1403556e48016f69dcc471eb8e0cddd9618e77cbfea&w=1380",
      title: "Donate Today",
      description: "Your contribution can change lives",
      alt: "Donation campaign banner with helping hands"
    },
    {
      id: 3,
      url: "https://img.freepik.com/premium-vector/fundraising-event-sale-banner-template_23-2150894190.jpg?w=996",
      title: "Volunteer With Us",
      description: "Be part of our mission to help others",
      alt: "Volunteer recruitment banner"
    }
  ];

  return (
    <motion.div
      className="flex min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Sidebar />

      <main className="bg-[#f4fef1] w-full pl-60 pt-20">
        <Navbar />

        <motion.div
          className="px-10 py-8"
          variants={containerVariants}
        >
          {/* Carousel Section */}
          <motion.section
            className="bg-white shadow-lg rounded-2xl p-6 mb-10 hover:shadow-xl transition-shadow duration-300"
            variants={fadeInVariants}
          >
            <Carousel images={images} interval={5000} />
          </motion.section>

          {/* Products Section */}
          <motion.section
            className="mb-10"
            variants={containerVariants}
          >
            <motion.div
              className="flex justify-between items-center mb-3"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-[#45c517]">
                Featured Products
              </h2>
              <motion.a
                href="/products"
                className="text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.a>
            </motion.div>

            {error && (
              <motion.div
                className="bg-red-100 text-red-600 p-4 rounded-lg mb-4"
                variants={itemVariants}
              >
                {error}
              </motion.div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
              >
                {products.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Charity Section */}
          <motion.section
            className="mb-10"
            variants={containerVariants}
          >
            <motion.div
              className="flex justify-between items-center mb-3"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-[#45c517]">
                Charity Campaigns
              </h2>
              <motion.a
                href="/charity"
                className="text-primary-600 hover:text-primary-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.a>
            </motion.div>

            <motion.div
              className="flex justify-between gap-8"
              variants={containerVariants}
            >
              {charityData.slice(0, 4).map((lembaga) => (
                <motion.div
                  key={lembaga.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  <CharityCard
                    id={lembaga.id}
                    name={lembaga.name}
                    location={lembaga.location}
                    image_url={lembaga.image_url}
                    campaign={{
                      title: lembaga.campaign_title,
                      collected: lembaga.collected,
                      target: lembaga.target,
                      campaign_image_url: lembaga.campaign_image_url,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>


          <section className="">
            <h2 className="mb-3text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-[#45c517]">
              Baca Artikel Terbaru
            </h2>

            <div className="flex flex-wrap justify-start gap-7">


              {articleData.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link to={`/article/${article.id}`}>
                    <ArticleCard article={article} />
                  </Link>
                </motion.div>
              ))}
            </div>

          </section>
        </motion.div>
      </main>
    </motion.div>
  );
}
export default HomeDashboard;
