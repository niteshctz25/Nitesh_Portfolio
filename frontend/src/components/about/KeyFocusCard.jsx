import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

const KeyFocusCard = () => {
  const tags = [
    'QA Engineering',
    'Driver & Connector Testing',
    'AI Automation',
    'OAuth/JWT',
    'Test Frameworks',
    'CI/CD Integration'
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded" />
          Key Focus Areas
        </h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 transition-all duration-200 px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyFocusCard;
