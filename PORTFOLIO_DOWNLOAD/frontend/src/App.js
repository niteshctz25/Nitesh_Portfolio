import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles/jarvis.css";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioAPI } from "./services/api";

// Import all components
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import TechnologiesSection from "./components/TechnologiesSection";
import RoadmapSection from "./components/RoadmapSection";
import CertificatesSection from "./components/CertificatesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Import mock data as fallback
import {
  mockProjects,
  technologies as mockTechnologies,
  roadmapEvents as mockRoadmapEvents,
  certificates as mockCertificates,
  personalInfo as mockPersonalInfo
} from "./mock";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  
  // State for portfolio data
  const [projects, setProjects] = useState([]);
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: mockPersonalInfo,
    technologies: [],
    roadmapEvents: [],
    certificates: []
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        
        // Fetch projects and portfolio data in parallel
        const [projectsData, portfolioDataResponse] = await Promise.all([
          portfolioAPI.getProjects().catch(() => mockProjects),
          portfolioAPI.getPortfolioData().catch(() => ({
            personalInfo: mockPersonalInfo,
            technologies: mockTechnologies,
            roadmapEvents: mockRoadmapEvents,
            certificates: mockCertificates
          }))
        ]);

        setProjects(projectsData);
        setPortfolioData(portfolioDataResponse);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use mock data as fallback
        setProjects(mockProjects);
        setPortfolioData({
          personalInfo: mockPersonalInfo,
          technologies: mockTechnologies,
          roadmapEvents: mockRoadmapEvents,
          certificates: mockCertificates
        });
      } finally {
        setDataLoading(false);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className="App min-h-screen bg-black text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollProgress />
          <Navbar />
          
          {dataLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Loading portfolio data...
                </p>
              </div>
            </div>
          ) : (
            <main>
              <HeroSection personalInfo={portfolioData.personalInfo} />
              <AboutSection personalInfo={portfolioData.personalInfo} />
              <ProjectsSection projects={projects} />
              <TechnologiesSection technologies={portfolioData.technologies} />
              <RoadmapSection roadmapEvents={portfolioData.roadmapEvents} />
              <CertificatesSection certificates={portfolioData.certificates} />
              <ContactSection personalInfo={portfolioData.personalInfo} />
            </main>
          )}

          <Footer personalInfo={portfolioData.personalInfo} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
