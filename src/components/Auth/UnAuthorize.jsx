import { useAuthStore } from "../../store/authStore.js";

function UnAuthorize() {
  const { currentUser } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12">
      {/* Image centered and responsive */}
      <img 
        className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px]" 
        src="./../../../unAuth.png" 
        alt="Unauthorized"
      />

      {/* Text content */}
      <div className="text-center flex flex-col items-center gap-y-4">
        <p className="font-semibold text-gray-900 text-6xl">401</p>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Unauthorized Error !!
        </h1>
        <p className="text-lg font-medium text-gray-500 sm:text-xl">
          Sorry, you are not authorized to access this page.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-x-4">
          <a
            href="/login"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back To Login
          </a>
          <a
            href={currentUser?.role === "StudentActivity" ? "/student-activity" : "/"}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back To Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorize;
