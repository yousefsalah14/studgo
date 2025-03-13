import { useNavigate } from "react-router-dom";

function Card({ type, count, isLoading }) {
  const navigate = useNavigate();

  // Define the navigation paths for each type
  const paths = {
    Events: "/student-activity/events",
    Talks: "/student-activity/talks",
    Workshops: "/student-activity/workshops",
    Members: "/student-activity/members",
  };

  return (
    <div
      className="text-white rounded-2xl even:bg-main odd:bg-sec p-4 flex-1 min-w-[130px] shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => navigate(paths[type])}
    >
      <span className="uppercase font-semibold">{type}</span>
      <h1 className="text-2xl font-semibold">{isLoading ? "Loading..." : count}</h1>
    </div>
  );
}

export default Card;
