import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Power, Zap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PowerLoad {
  id: string;
  name: string;
  power: number;
  status: 'online' | 'offline' | 'emergency_shutdown';
  substation: 'A' | 'B';
}

interface Substation {
  id: string;
  name: string;
  voltage: number;
  frequency: number;
  status: 'online' | 'offline' | 'emergency_shutdown';
  load: number;
}

const PowerGridDashboard = () => {
  const { toast } = useToast();
  const [isBreachActive, setIsBreachActive] = useState(false);
  const [shutdownTimer, setShutdownTimer] = useState(0);

  const [substations, setSubstations] = useState<Substation[]>([
    {
      id: 'SUB-A',
      name: 'Substation Alpha',
      voltage: 138000,
      frequency: 60.0,
      status: 'online',
      load: 75
    },
    {
      id: 'SUB-B',
      name: 'Substation Beta',
      voltage: 138000,
      frequency: 60.0,
      status: 'online',
      load: 82
    }
  ]);

  const [powerLoads, setPowerLoads] = useState<PowerLoad[]>([
    { id: 'LOAD-1', name: 'Industrial Complex A', power: 45.2, status: 'online', substation: 'A' },
    { id: 'LOAD-2', name: 'Residential Area North', power: 28.7, status: 'online', substation: 'A' },
    { id: 'LOAD-3', name: 'Commercial District', power: 52.1, status: 'online', substation: 'B' },
    { id: 'LOAD-4', name: 'Hospital & Emergency', power: 31.8, status: 'online', substation: 'B' },
    { id: 'LOAD-5', name: 'Water Treatment Plant', power: 22.5, status: 'online', substation: 'A' }
  ]);

  const simulateBreach = () => {
    setIsBreachActive(true);
    setShutdownTimer(10);
    
    toast({
      title: "🚨 SECURITY BREACH DETECTED",
      description: "Emergency shutdown initiated. All systems will be offline in 10 seconds.",
      variant: "destructive"
    });

    // Countdown timer
    const interval = setInterval(() => {
      setShutdownTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Shutdown all systems
          setSubstations(prev => prev.map(sub => ({ 
            ...sub, 
            status: 'emergency_shutdown',
            voltage: 0,
            frequency: 0,
            load: 0
          })));
          setPowerLoads(prev => prev.map(load => ({ 
            ...load, 
            status: 'emergency_shutdown',
            power: 0
          })));
          
          toast({
            title: "⚡ EMERGENCY SHUTDOWN COMPLETE",
            description: "All power systems have been safely disconnected.",
            variant: "destructive"
          });
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const restoreSystem = () => {
    setIsBreachActive(false);
    setShutdownTimer(0);
    
    // Restore all systems
    setSubstations([
      {
        id: 'SUB-A',
        name: 'Substation Alpha',
        voltage: 138000,
        frequency: 60.0,
        status: 'online',
        load: 75
      },
      {
        id: 'SUB-B',
        name: 'Substation Beta',
        voltage: 138000,
        frequency: 60.0,
        status: 'online',
        load: 82
      }
    ]);

    setPowerLoads([
      { id: 'LOAD-1', name: 'Industrial Complex A', power: 45.2, status: 'online', substation: 'A' },
      { id: 'LOAD-2', name: 'Residential Area North', power: 28.7, status: 'online', substation: 'A' },
      { id: 'LOAD-3', name: 'Commercial District', power: 52.1, status: 'online', substation: 'B' },
      { id: 'LOAD-4', name: 'Hospital & Emergency', power: 31.8, status: 'online', substation: 'B' },
      { id: 'LOAD-5', name: 'Water Treatment Plant', power: 22.5, status: 'online', substation: 'A' }
    ]);

    toast({
      title: "✅ SYSTEM RESTORED",
      description: "All power grid systems are back online and operational.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'emergency_shutdown': return 'bg-red-600 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ONLINE</Badge>;
      case 'offline': return <Badge variant="secondary">OFFLINE</Badge>;
      case 'emergency_shutdown': return <Badge variant="destructive" className="animate-pulse">EMERGENCY SHUTDOWN</Badge>;
      default: return <Badge variant="outline">UNKNOWN</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Power Grid SCADA Dashboard</h1>
            <p className="text-slate-400">Real-time monitoring and control system</p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={simulateBreach}
              disabled={isBreachActive}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Simulate Breach
            </Button>
            <Button 
              onClick={restoreSystem}
              disabled={!isBreachActive && shutdownTimer === 0}
              className="flex items-center gap-2"
            >
              <Power className="w-4 h-4" />
              Restore System
            </Button>
          </div>
        </div>
      </div>

      {/* Breach Alert */}
      {isBreachActive && shutdownTimer > 0 && (
        <Card className="mb-6 border-red-500 bg-red-950">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-red-400 animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-red-400">SECURITY BREACH DETECTED</h3>
                <p className="text-red-300">Emergency shutdown in {shutdownTimer} seconds...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Substations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Substations
          </h2>
          {substations.map((substation) => (
            <Card key={substation.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{substation.name}</CardTitle>
                  {getStatusBadge(substation.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Voltage</p>
                    <p className="text-xl font-mono">{substation.voltage.toLocaleString()} V</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Frequency</p>
                    <p className="text-xl font-mono">{substation.frequency} Hz</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Load</p>
                    <p className="text-xl font-mono">{substation.load}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(substation.status)} mt-1`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Power Loads */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Power className="w-5 h-5" />
            Power Loads
          </h2>
          {powerLoads.map((load) => (
            <Card key={load.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{load.name}</CardTitle>
                  {getStatusBadge(load.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Power Draw</p>
                    <p className="text-lg font-mono">{load.power} MW</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Source</p>
                    <p className="text-lg font-mono">SUB-{load.substation}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(load.status)} mt-1`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Grid Visualization */}
      <Card className="mt-8 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Grid Topology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-slate-900 rounded-lg p-6 overflow-hidden">
            {/* Substations */}
            <div className="absolute top-6 left-8">
              <div className={`w-16 h-16 rounded-lg ${getStatusColor(substations[0].status)} flex items-center justify-center text-black font-bold text-sm`}>
                SUB-A
              </div>
            </div>
            <div className="absolute top-6 right-8">
              <div className={`w-16 h-16 rounded-lg ${getStatusColor(substations[1].status)} flex items-center justify-center text-black font-bold text-sm`}>
                SUB-B
              </div>
            </div>

            {/* Transmission Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Substation A to loads */}
              <line x1="64" y1="38" x2="150" y2="120" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
              <line x1="64" y1="38" x2="150" y2="200" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
              <line x1="64" y1="38" x2="150" y2="280" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
              
              {/* Substation B to loads */}
              <line x1="calc(100% - 64px)" y1="38" x2="calc(100% - 150px)" y2="120" stroke="currentColor" strokeWidth="2" className="text-green-400" />
              <line x1="calc(100% - 64px)" y1="38" x2="calc(100% - 150px)" y2="200" stroke="currentColor" strokeWidth="2" className="text-green-400" />
            </svg>

            {/* Loads */}
            <div className="absolute top-24 left-36">
              <div className={`w-12 h-12 rounded ${getStatusColor(powerLoads[0].status)} flex items-center justify-center text-black font-bold text-xs`}>
                L1
              </div>
              <p className="text-xs mt-1 text-center">Industrial</p>
            </div>
            <div className="absolute top-32 left-36">
              <div className={`w-12 h-12 rounded ${getStatusColor(powerLoads[1].status)} flex items-center justify-center text-black font-bold text-xs`}>
                L2
              </div>
              <p className="text-xs mt-1 text-center">Residential</p>
            </div>
            <div className="absolute top-40 left-36">
              <div className={`w-12 h-12 rounded ${getStatusColor(powerLoads[4].status)} flex items-center justify-center text-black font-bold text-xs`}>
                L5
              </div>
              <p className="text-xs mt-1 text-center">Water Plant</p>
            </div>
            <div className="absolute top-24 right-36">
              <div className={`w-12 h-12 rounded ${getStatusColor(powerLoads[2].status)} flex items-center justify-center text-black font-bold text-xs`}>
                L3
              </div>
              <p className="text-xs mt-1 text-center">Commercial</p>
            </div>
            <div className="absolute top-32 right-36">
              <div className={`w-12 h-12 rounded ${getStatusColor(powerLoads[3].status)} flex items-center justify-center text-black font-bold text-xs`}>
                L4
              </div>
              <p className="text-xs mt-1 text-center">Hospital</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerGridDashboard;