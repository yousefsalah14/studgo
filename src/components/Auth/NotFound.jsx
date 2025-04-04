import { useAuthStore } from "../../store/authStore.js";

export default function NotFound() {
  const { currentUser } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Image with reduced size */}
      <img 
        className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mb-8" 
        src="./../../../notfound.png" 
        alt="Not Found"
      />
      
      {/* Text content */}
      <div className="text-center flex flex-col items-center gap-y-2">
        <p className="font-semibold text-gray-900 text-4xl sm:text-5xl">404</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          This Page is Lost in Space !!
        </h1>
        <p className="text-base sm:text-lg font-medium text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Button to navigate home */}
        <div className="mt-4">
          <a
            href={currentUser?.role === "StudentActivity" ? "/student-activity" : "/"}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
