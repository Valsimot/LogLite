import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

interface Event {
  timestamp: number;
  duration: number;
}

interface StatsViewProps {
  events: Event[];
  onExport: () => void;
}

export const StatsView = ({ events, onExport }: StatsViewProps) => {
  const getDailyData = () => {
    const dailyMap = new Map<string, number>();
    events.forEach(event => {
      const day = format(event.timestamp, 'yyyy-MM-dd');
      dailyMap.set(day, (dailyMap.get(day) || 0) + 1);
    });
    
    return Array.from(dailyMap.entries()).map(([date, count]) => ({
      date: format(new Date(date), 'MMM dd'),
      count
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      <div className="h-[400px] bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getDailyData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Today"
          value={events.filter(e => format(e.timestamp, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length}
        />
        <StatCard
          title="This Week"
          value={events.filter(e => {
            const eventDate = new Date(e.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return eventDate > weekAgo;
          }).length}
        />
        <StatCard
          title="This Month"
          value={events.filter(e => format(e.timestamp, 'yyyy-MM') === format(new Date(), 'yyyy-MM')).length}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <p className="text-3xl font-semibold text-gray-800">{value}</p>
  </div>
);