import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Award, FolderOpen } from 'lucide-react';
import certificatesData from '../data/certificates.json';
import CertificateCard from './certificate/CertificateCard';

const CertificateCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (certificatesData[category]) {
      setCategoryData(certificatesData[category]);
    }
  }, [category]);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-400">Category not found</h2>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-6 text-gray-400 hover:text-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-3">
            {categoryData.title}
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            {categoryData.description}
          </p>

          <Button
            onClick={() => window.open(categoryData.folderUrl, '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            View All in Google Drive
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {categoryData.certificates.length === 0 && (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No certificates available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCategory;
