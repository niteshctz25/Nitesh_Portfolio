import { useState, useEffect } from "react";
import "./App.css";
import "./styles/professional.css";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { portfolioAPI } from "./services/api";

import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import TechnologiesSection from "./components/TechnologiesSection";
import RoadmapSection from "./components/RoadmapSection";
import CertificatesSection from "./components/CertificatesSection";
import Footer from "./components/Footer";
import CertificateCategory from "./components/CertificateCategory";
import LoadingSpinner from "./components/common/LoadingSpinner";

import {
  mockProjects,
  technologies as mockTechnologies,
  roadmapEvents as mockRoadmapEvents,
  certificates as mockCertificates,
  personalInfo as mockPersonalInfo
} from "./mock";

const PortfolioPage = ({ dataLoading, projects, portfolioData }) => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <main>
          <HeroSection personalInfo={portfolioData.personalInfo} />
          <AboutSection personalInfo={portfolioData.personalInfo} />
          <ProjectsSection projects={projects} />
          <TechnologiesSection technologies={portfolioData.technologies} />
          <RoadmapSection roadmapEvents={portfolioData.roadmapEvents} />
          <CertificatesSection />
        </main>
      )}

      <Footer personalInfo={portfolioData.personalInfo} />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        
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
    <div className="App min-h-screen bg-gray-950 text-white">
      <Router basename="/Nitesh_Portfolio">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <AnimatePresence>
                  {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
                </AnimatePresence>

                {!isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PortfolioPage 
                      dataLoading={dataLoading}
                      projects={projects}
                      portfolioData={portfolioData}
                    />
                  </motion.div>
                )}
              </>
            } 
          />
          
          <Route 
            path="/certificates/:category" 
            element={<CertificateCategory />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
