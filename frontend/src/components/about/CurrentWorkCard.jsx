import { Card, CardContent } from '../ui/card';

const CurrentWorkCard = () => {
  return (
    <Card className="bg-gradient-to-br from-sky-500/10 to-sky-400/5 border-sky-400/30">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Currently Working On
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          Building AI-powered test automation using LLMs and AI agents to increase QA productivity and coverage for driver and connector testing.
        </p>
      </CardContent>
    </Card>
  );
};

export default CurrentWorkCard;
