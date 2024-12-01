import { Link, useLocation } from 'react-router-dom';

const SidebarMitra = () => {
    const location = useLocation();
    const isActive = (patterns) => {
        const pathArray = Array.isArray(patterns) ? patterns : [patterns];
        return pathArray.some(pattern =>
            location.pathname === pattern ||
            location.pathname.startsWith(`${pattern}/`)
        );
    };

    const ROUTE_PATTERNS = {
        HOME: ['/mitra'],
        SHARE_MEALS: ['/sharemeals-mitra', '/share-meals-form'],
      
    };

    return (
        <section className="shadow-lg fixed h-screen bg-white">
            <nav className="w-60 flex flex-col my-3 p-5 min-h-screen">
                <Link className='hover:scale-110 duration-300' to="/">
                    <h1 className="text-3xl text-[#47cb18] font-bold mb-5">
                        Care<span className="text-black">Bites</span>
                    </h1>
                </Link>


                <ul className="text-md flex flex-col gap-3 justify-between">
                    
                    <div className='text-md flex flex-col gap-3'>
                        {/* Home Link */}
                        <Link to="/mitra" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive(ROUTE_PATTERNS.HOME) ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            <h1>Home</h1>
                        </Link>

            

                        {/* Share Meals Link */}
                        <Link to="/sharemeals-mitra" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive(ROUTE_PATTERNS.SHARE_MEALS) ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                            </svg>
                            <h1>Share Meals</h1>
                        </Link>

        
                    
                       
                    </div>

                    <Link to="/profile" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive('/profile') ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <h1>My Profile</h1>
                    </Link>
                </ul>
            </nav>
        </section>
    );
};

export default SidebarMitra;
