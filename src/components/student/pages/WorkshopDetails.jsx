import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Calendar, Clock, MapPin, Users, BookOpen, ChevronDown, ChevronUp, Loader2, ExternalLink } from 'lucide-react';
import { axiosInstance } from '../../../lib/axios';
import WorkshopMap from '../components/Workshops/WorkshopMap';
import { toast } from 'react-hot-toast';

const WorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    agenda: true
  });

  // Format date to a more readable format
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date TBD';
      
      // Parse the ISO date string
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      // Format the date with options
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date TBD';
    }
  };

  // Extract time from ISO date string
  const extractTimeFromDate = (dateString) => {
    try {
      if (!dateString) return 'TBD';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'TBD';
      
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error extracting time from date:', error);
      return 'TBD';
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle workshop application
  const handleApply = async () => {
    try {
      // Call the API directly to apply for the workshop
      await axiosInstance()({
        method: 'post',
        url: `/activity/${workshop.id}/apply`
      });
      
      toast.success('Successfully applied to the workshop!');
      navigate('/workshops');
    } catch (error) {
      console.error('Error applying to workshop:', error);
      
      // Handle 400 error response with validation errors
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
        // Display each error message in a separate toast
        error.response.data.errors.forEach(errMsg => {
          toast.error(errMsg);
        });
      } else {
        // Generic error message for other types of errors
        toast.error(error.response?.data?.message || 'Failed to apply to the workshop. Please try again later.');
      }
    }
  };

  // Fetch workshop details and content
  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance()({
          method: 'get',
          url: `/activity/${id}`
        });
        
        if (response.data && response.data.data) {
          setWorkshop(response.data.data);
        } else {
          setError('Workshop not found');
        }
      } catch (err) {
        console.error('Error fetching workshop details:', err);
        setError('Failed to load workshop details. Please try again later.');
      }
    };

    const fetchContent = async () => {
      try {
        const response = await axiosInstance()({
          method: 'get',
          url: `/content/activity/${id}`
        });
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          // The content is now an array, take the first item
          setContent(response.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching workshop content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkshopDetails();
      fetchContent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="mt-4 text-gray-400">Loading workshop details...</p>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{error || 'Workshop not found'}</p>
          <button 
            onClick={() => navigate('/workshops')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header with back button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">{workshop.title}</h2>
            <button 
              onClick={() => navigate('/workshops')}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6">
              {/* Main content with image and details side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left side - Image */}
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                  <img 
                    src={workshop.posterUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} 
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                      {workshop.activityCategory || 'Workshop'}
                    </span>
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>{formatDate(workshop.startDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>
                      {extractTimeFromDate(workshop.startDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>{workshop.address || 'Location TBD'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>
                      {workshop.numberOfSeats 
                        ? (workshop.numberOfSeats === "TBD" 
                            ? "Capacity TBD" 
                            : `${workshop.numberOfSeats} spots available`)
                        : "Unlimited spots available"}
                    </span>
                  </div>

                  {/* Workshop Content Tags */}
                  {content?.title && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Workshop Content</h4>
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          {content.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Host Name */}
                  {content?.hostName && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Host</h4>
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                        >
                          {content.hostName}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Date Range */}
                  {content?.startDate && content?.endDate && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Date Range</h4>
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                        >
                          {formatDate(content.startDate)} - {formatDate(content.endDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Requirements Tags */}
                  {content?.requirements && content.requirements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Requirements</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.requirements.map((req, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits Tags */}
                  {content?.benefits && content.benefits.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.benefits.map((benefit, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map for location */}
                  {workshop.address && (
                    <div className="h-48 rounded-lg overflow-hidden border border-gray-700">
                      <WorkshopMap 
                        workshops={[workshop]} 
                        onWorkshopClick={() => {}} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description section */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('description')}
                  className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Description</h3>
                  </div>
                  {expandedSections.description ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.description && (
                  <div className="p-4 mt-2 bg-gray-800 rounded-lg">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-line">
                        {content?.description || workshop.description || 'No description available.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Agenda section */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleSection('agenda')}
                  className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Agenda</h3>
                  </div>
                  {expandedSections.agenda ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.agenda && (
                  <div className="p-4 mt-2 bg-gray-800 rounded-lg">
                    {workshop.agendaUrl ? (
                      <div className="space-y-4">
                        <a 
                          href={workshop.agendaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Agenda Document</span>
                        </a>
                        {content?.agenda && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Agenda Overview</h4>
                            <ul className="space-y-3">
                              {content.agenda.map((item, index) => (
                                <li key={index} className="flex gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-white">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.time}</p>
                                    <p className="text-gray-300 mt-1">{item.description}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400">No agenda available for this workshop.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with apply button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleApply}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails; 