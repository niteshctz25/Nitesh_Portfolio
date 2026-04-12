import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Star, ExternalLink } from 'lucide-react';

const ProjectsSection = ({ projects }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const languageColors = {
    Python: '#0099cc',
    JavaScript: '#0099cc',
    Java: '#00cc88',
    'C++': '#ff00ff'
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 jarvis-bg" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0099cc] to-transparent mx-auto mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className={`glass glow-border h-full smooth-transition hover-lift ${
                hoveredCard === project.id ? 'hover-glow' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-[#0099cc] mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: languageColors[project.language] || '#0099cc',
                              boxShadow: `0 0 10px ${languageColors[project.language] || '#0099cc'}`
                            }}
                          />
                          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{project.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass glow-border rounded-lg hover:bg-[#0099cc]/10 smooth-transition"
                    >
                      <Github className="w-5 h-5 text-[#0099cc]" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {project.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-[#0099cc]/10 text-[#0099cc] border border-[#0099cc]/30 hover:bg-[#0099cc]/20 smooth-transition"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-transparent border-2 border-[#0099cc] text-[#0099cc] hover:bg-[#0099cc]/10 smooth-transition"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Repository
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
