import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Users, 
  User,
  BadgeInfo,
  CheckCircle2,
  ChevronRight,
  Calendar,
  FileText,
  CheckCircle,
  Tag,
  AlertCircle,
  Lock,
  Unlock
} from 'lucide-react';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

function ActivityCard({ activity, onApply, isApplied }) {
  const navigate = useNavigate();
  const {
    title,
    description,
    startDate,
    endDate,
    deadlineDate,
    isOpened,
    address,
    activityCategory,
    activityType,
    posterUrl,
    agendaUrl,
    latitude,
    longitude,
  } = activity;

  // Format dates
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Format time
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Default image if posterUrl is null or empty
  const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const imageUrl = posterUrl && posterUrl.trim() !== '' ? posterUrl : defaultImage;

  // Check if agendaUrl exists and is not empty
  const hasAgenda = agendaUrl && agendaUrl.trim() !== '';

  // Format category display
  const formatCategory = (categoryValue) => {
    console.log("Category value:", categoryValue);
    
    if (!categoryValue) return "Category";
    
    // Handle specific category values (case-insensitive)
    if (categoryValue.toLowerCase() === "technical") return "Technical";
    if (categoryValue.toLowerCase() === "nontechnical") return "Non-Technical";
    
    // Return the original value if it doesn't match any specific case
    return categoryValue;
  };

  // Check if deadline has passed
  const isDeadlinePassed = () => {
    if (!deadlineDate) return false;
    return isAfter(new Date(), parseISO(deadlineDate));
  };

  // Check if activity is open for applications
  const isActivityOpen = () => {
    return isOpened === true;
  };

  // Check if activity has started
  const hasActivityStarted = () => {
    if (!startDate) return false;
    return isBefore(new Date(), parseISO(startDate));
  };

  const handleViewDetails = () => {
    navigate(`/activities/${activity.id}`);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300">
      <div className="h-48 relative">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {activityType || "Activity"}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {formatCategory(activityCategory)}
          </span>
          {isActivityOpen() ? (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
              <Unlock className="w-3 h-3" />
              Open
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Closed
            </span>
          )}
        </div>
        {isApplied && (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Applied
          </div>
        )}
        {isDeadlinePassed() && (
          <div className={`absolute top-3 ${isApplied ? 'right-3 translate-x-[-120px]' : 'right-3'} bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium`}>
            <AlertCircle className="w-4 h-4" />
            Deadline Passed
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm">Organized by {activity.studentActivityName}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{formatDate(startDate)} - {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{formatTime(startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{address || "Location TBA"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{activity.numberOfSeats || "Unlimited"} seats available</span>
          </div>
          {deadlineDate && (
            <div className="flex items-center gap-2 text-gray-300 col-span-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm">Deadline: {formatDate(deadlineDate)}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            View Details
            <BadgeInfo className="w-4 h-4" />
          </button>
          
          {hasAgenda && (
            <a
              href={agendaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
            >
              View Agenda
              <FileText className="w-4 h-4" />
            </a>
          )}
          
          {!isApplied && isActivityOpen() && !isDeadlinePassed() && !hasActivityStarted() && (
            <button
              onClick={() => onApply(activity.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              Apply
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          
          {!isApplied && (!isActivityOpen() || isDeadlinePassed() || hasActivityStarted()) && (
            <button
              disabled
              className="px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed flex items-center gap-2"
            >
              {!isActivityOpen() ? 'Closed' : isDeadlinePassed() ? 'Deadline Passed' : 'Already Started'}
              <AlertCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCard; 