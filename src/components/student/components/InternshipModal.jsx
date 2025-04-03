import PropTypes from 'prop-types';
import { X, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';

const InternshipModal = ({ internship, onClose }) => {
  if (!internship) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <img src={internship.logo} alt={internship.company} className="w-16 h-16 rounded-lg" />
          <div>
            <h2 className="text-2xl font-bold text-white">{internship.title}</h2>
            <p className="text-gray-400">{internship.company}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Description</h3>
            <p className="text-gray-300">{internship.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>{internship.duration}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-300">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span>{internship.stipend}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>{internship.type}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {internship.requirements.map((req, index) => (
                <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {req}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Application Deadline: {internship.deadline}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

InternshipModal.propTypes = {
  internship: PropTypes.shape({
    company: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    stipend: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default InternshipModal; 