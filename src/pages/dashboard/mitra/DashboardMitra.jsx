import SidebarMitra from '../../../components/dashboard/mitra/SidebarMitra';
import NavbarMitra from '../../../components/dashboard/mitra/NavbarMitra';

const DashboardMitra = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar akan selalu fixed di sebelah kiri */}
            <SidebarMitra />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20"> {/* Tambahkan padding-top agar konten tidak tertutup */}
                <div className="flex-grow">
                    <NavbarMitra />

                </div>
            </section>
        </div>
    )
}

export default DashboardMitra
