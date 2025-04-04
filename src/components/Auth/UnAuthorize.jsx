import { useAuthStore } from "../../store/authStore.js";

function UnAuthorize() {
  const { currentUser } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Image with reduced size */}
      <img 
        className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mb-8" 
        src="./../../../unAuth.png" 
        alt="Unauthorized"
      />

      {/* Text content */}
      <div className="text-center flex flex-col items-center gap-y-2">
        <p className="font-semibold text-gray-900 text-4xl sm:text-5xl">401</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Unauthorized Error !!
        </h1>
        <p className="text-base sm:text-lg font-medium text-gray-500">
          Sorry, you are not authorized to access this page.
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-x-4">
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
