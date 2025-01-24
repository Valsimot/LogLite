import React, { useState, useEffect } from 'react';
import { RecordButton } from '@/components/RecordButton';
import { StatsView } from '@/components/StatsView';
import { ChartBar } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Event {
  timestamp: number;
  duration: number;
}

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleRecord = (duration: number) => {
    const newEvent = {
      timestamp: Date.now(),
      duration,
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Recorded",
      description: `Duration: ${(duration / 1000).toFixed(1)}s`,
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Duration (ms)'],
      ...events.map(event => [
        new Date(event.timestamp).toISOString(),
        event.duration.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `events-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your data has been exported to CSV",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <ChartBar size={20} />
            {showStats ? 'Record' : 'Statistics'}
          </button>
        </div>

        <div className="animate-fade-in">
          {showStats ? (
            <StatsView events={events} onExport={handleExport} />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8 py-12">
              <h1 className="text-2xl font-semibold text-gray-800 mb-8">Record Event</h1>
              <RecordButton onRecord={handleRecord} />
              <p className="text-gray-500 mt-4">Press and hold to record an event</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;