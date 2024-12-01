import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleImageError = useCallback((e) => {
        setError(`Failed to load image: ${e.target.src}`);
        setIsLoading(false);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    }, [handleNext, handlePrev]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener("keydown", handleKeyDown);
            return () => carousel.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);

    useEffect(() => {
        if (!isPaused) {
            const autoSlide = setInterval(handleNext, interval);
            return () => clearInterval(autoSlide);
        }
    }, [currentIndex, interval, isPaused, handleNext]);

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div
            ref={carouselRef}
            className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            tabIndex={0}
            role="region"
            aria-label="Image carousel"
        >
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={image.id || index}
                        className="relative flex-none w-full h-[18rem] sm:h-[20rem]" // Tinggi slide dikurangi
                        aria-hidden={currentIndex !== index}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div>
                            </div>
                        )}
                        <img
                            src={image.url}
                            alt={image.alt || image.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-black/30">
                            <div className="absolute top-4 left-4 right-4 text-white">
                                <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                                <p className="text-sm">{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous slide"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next slide"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                            currentIndex === index
                                ? "bg-white"
                                : "bg-gray-400 hover:bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={currentIndex === index}
                    />
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            alt: PropTypes.string,
        })
    ).isRequired,
    interval: PropTypes.number,
};

export default Carousel;
