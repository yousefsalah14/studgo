import { 
  Users, 
  Calendar, 
  BookOpen, 
  Briefcase,
  ArrowRight,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Heart,
  GraduationCap,
  Globe,
  Clock,
  CheckCircle2,
  User
} from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Active Students', value: '2,500+', icon: Users },
    { label: 'Upcoming Events', value: '15', icon: Calendar },
    { label: 'Available Workshops', value: '8', icon: BookOpen },
    { label: 'Internship Opportunities', value: '50+', icon: Briefcase }
  ];

  const features = [
    {
      title: "Comprehensive Learning Platform",
      description: "Access a wide range of educational resources, workshops, and training programs designed to enhance your skills.",
      icon: GraduationCap,
      benefits: [
        "Interactive learning modules",
        "Expert-led workshops",
        "Skill assessment tools",
        "Progress tracking"
      ]
    },
    {
      title: "Career Development",
      description: "Connect with industry professionals and explore various career paths through our extensive network.",
      icon: Target,
      benefits: [
        "Industry mentorship",
        "Career counseling",
        "Resume building",
        "Interview preparation"
      ]
    },
    {
      title: "Community Engagement",
      description: "Join a vibrant community of students and professionals to share experiences and grow together.",
      icon: Users,
      benefits: [
        "Student clubs",
        "Networking events",
        "Peer learning",
        "Collaborative projects"
      ]
    }
  ];

  const benefits = [
    {
      title: "Enhanced Learning Experience",
      description: "Access personalized learning paths and interactive content designed for your success.",
      icon: Star,
      color: "text-yellow-400"
    },
    {
      title: "Career Growth",
      description: "Connect with industry leaders and explore various career opportunities.",
      icon: Award,
      color: "text-blue-400"
    },
    {
      title: "Skill Development",
      description: "Develop in-demand skills through hands-on projects and real-world experience.",
      icon: Zap,
      color: "text-purple-400"
    },
    {
      title: "Professional Network",
      description: "Build a strong professional network with peers and industry experts.",
      icon: Globe,
      color: "text-green-400"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://via.placeholder.com/50",
      text: "StudGo has transformed my learning journey. The workshops and mentorship opportunities are invaluable!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Engineering Student",
      image: "https://via.placeholder.com/50",
      text: "The platform helped me secure my dream internship. The resources and guidance were exactly what I needed.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Business Student",
      image: "https://via.placeholder.com/50",
      text: "I love how StudGo connects students with industry professionals. It's been a game-changer for my career development.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Your Gateway to Student Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Connect, Learn, and Grow with StudGo - Your comprehensive platform for academic and professional development
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-transform duration-300">
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StudGo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-transform duration-300">
                  <Icon className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Using StudGo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-transform duration-300">
                  <Icon className={`w-12 h-12 mb-4 ${benefit.color}`} />
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <User className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Subscription Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated with New Activities</h2>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive updates about new workshops, events, internships, and more opportunities.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <p className="text-sm text-gray-300 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;