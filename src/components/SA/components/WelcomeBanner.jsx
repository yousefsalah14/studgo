import { useContext } from "react";

import { useAuthStore } from "../../../store/authStore.js";

function WelcomeBanner() {
    const{currentUser}=useAuthStore();

    return (
        <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-center text-center w-full">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                Welcome Back <span className="text-sky-300 uppercase">{currentUser?.UserName || "Guest"}!</span> 👋
            </h1>
            <p className="text-lg md:text-xl leading-tight">
                Ready to manage events, workshops, and talks with ease! 🚀
            </p>
        </div>
    );
}

export default WelcomeBanner;
