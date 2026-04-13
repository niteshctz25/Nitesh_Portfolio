import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExternalLink, Award } from 'lucide-react';

const CertificateCard = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col">
        <CardHeader>
          <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-blue-500" />
          </div>
          <CardTitle className="text-lg text-gray-100 leading-snug">
            {cert.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
            <p className="text-xs text-gray-500">{cert.date}</p>
          </div>
          <Button
            onClick={() => window.open(cert.url, '_blank')}
            variant="outline"
            className="w-full border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Certificate
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificateCard;
