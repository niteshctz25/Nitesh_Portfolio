import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Award, BookOpen, Briefcase } from 'lucide-react';

const CertificatesSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'seminars',
      title: 'Seminar Certificates',
      description: 'Technical seminars and workshops attended',
      icon: BookOpen,
      color: '#3b82f6',
      count: '6',
      path: '/certificates/seminars'
    },
    {
      id: 'internships',
      title: 'Internship Certificates',
      description: 'Professional internship completion certificates',
      icon: Briefcase,
      color: '#8b5cf6',
      count: '6',
      path: '/certificates/internships'
    },
    {
      id: 'courses',
      title: 'Courses & Training',
      description: 'Online courses and training programs',
      icon: Award,
      color: '#10b981',
      count: '10',
      path: '/certificates/courses'
    }
  ];

  return (
    <section id="certificates" className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-3 text-gray-100">
            Certificates
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Professional certifications, training programs, and achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 h-full"
                  onClick={() => navigate(category.path)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: category.color }} />
                      </div>
                      <span 
                        className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${category.color}20`,
                          color: category.color
                        }}
                      >
                        {category.count}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-gray-100">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
