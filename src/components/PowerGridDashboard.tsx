import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Power, Zap, AlertCircle, Activity, Shield, Database, Cpu, Building2, Car, Fuel, Train, Factory } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PowerLoad {
  id: string;
  name: string;
  power: number;
  status: 'online' | 'offline' | 'emergency_shutdown';
  substation: 'A' | 'B';
  priority: 'critical' | 'high' | 'normal';
}

interface Substation {
  id: string;
  name: string;
  voltage: number;
  frequency: number;
  status: 'online' | 'offline' | 'emergency_shutdown';
  load: number;
  temperature: number;
  efficiency: number;
}

const PowerGridDashboard = () => {
  const { toast } = useToast();
  const [isBreachActive, setIsBreachActive] = useState(false);
  const [shutdownTimer, setShutdownTimer] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [substations, setSubstations] = useState<Substation[]>([
    {
      id: 'SUB-A',
      name: 'Alpha Primary',
      voltage: 138000,
      frequency: 60.0,
      status: 'online',
      load: 75,
      temperature: 42,
      efficiency: 98.7
    },
    {
      id: 'SUB-B',
      name: 'Beta Secondary',
      voltage: 138000,
      frequency: 60.0,
      status: 'online',
      load: 82,
      temperature: 38,
      efficiency: 97.2
    }
  ]);

  const [powerLoads, setPowerLoads] = useState<PowerLoad[]>([
    { id: 'LOAD-1', name: 'Metro City Grid', power: 45.2, status: 'online', substation: 'A', priority: 'high' },
    { id: 'LOAD-2', name: 'EV Charging Station', power: 28.7, status: 'online', substation: 'B', priority: 'normal' },
    { id: 'LOAD-3', name: 'Gas Station Complex', power: 15.3, status: 'online', substation: 'A', priority: 'normal' },
    { id: 'LOAD-4', name: 'Central Train Station', power: 31.8, status: 'online', substation: 'B', priority: 'high' },
    { id: 'LOAD-5', name: 'Industrial Factory Plant', power: 58.9, status: 'online', substation: 'A', priority: 'critical' }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for remote breach commands
  useEffect(() => {
    const checkForRemoteBreach = () => {
      const remoteCommand = localStorage.getItem('remoteBreach');
      if (remoteCommand === 'trigger' && !isBreachActive) {
        localStorage.removeItem('remoteBreach');
        simulateBreach();
      }
    };
    
    const interval = setInterval(checkForRemoteBreach, 500);
    return () => clearInterval(interval);
  }, [isBreachActive]);

  const simulateBreach = () => {
    setIsBreachActive(true);
    setShutdownTimer(10);
    
    toast({
      title: "🚨 CYBERSECURITY BREACH DETECTED",
      description: "Initiating emergency grid isolation protocol. T-minus 10 seconds.",
      variant: "destructive"
    });

    const interval = setInterval(() => {
      setShutdownTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Emergency shutdown sequence
          setSubstations(prev => prev.map(sub => ({ 
            ...sub, 
            status: 'emergency_shutdown',
            voltage: 0,
            frequency: 0,
            load: 0,
            temperature: 25,
            efficiency: 0
          })));
          setPowerLoads(prev => prev.map(load => ({ 
            ...load, 
            status: 'emergency_shutdown',
            power: 0
          })));
          
          toast({
            title: "⚡ GRID ISOLATION COMPLETE",
            description: "All power systems safely disconnected. Threat contained.",
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
    
    // System restoration sequence
    setSubstations([
      {
        id: 'SUB-A',
        name: 'Alpha Primary',
        voltage: 138000,
        frequency: 60.0,
        status: 'online',
        load: 75,
        temperature: 42,
        efficiency: 98.7
      },
      {
        id: 'SUB-B',
        name: 'Beta Secondary',
        voltage: 138000,
        frequency: 60.0,
        status: 'online',
        load: 82,
        temperature: 38,
        efficiency: 97.2
      }
    ]);

    setPowerLoads([
      { id: 'LOAD-1', name: 'Metro City Grid', power: 45.2, status: 'online', substation: 'A', priority: 'high' },
      { id: 'LOAD-2', name: 'EV Charging Station', power: 28.7, status: 'online', substation: 'B', priority: 'normal' },
      { id: 'LOAD-3', name: 'Gas Station Complex', power: 15.3, status: 'online', substation: 'A', priority: 'normal' },
      { id: 'LOAD-4', name: 'Central Train Station', power: 31.8, status: 'online', substation: 'B', priority: 'high' },
      { id: 'LOAD-5', name: 'Industrial Factory Plant', power: 58.9, status: 'online', substation: 'A', priority: 'critical' }
    ]);

    toast({
      title: "✅ GRID RESTORATION COMPLETE",
      description: "All power systems restored to normal operation.",
    });
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'emergency_shutdown': return 'status-emergency';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': 
        return <Badge className="bg-grid-online/20 text-grid-online border-grid-online/30 hover:bg-grid-online/20">● ONLINE</Badge>;
      case 'offline': 
        return <Badge className="bg-grid-offline/20 text-grid-offline border-grid-offline/30 hover:bg-grid-offline/20">● OFFLINE</Badge>;
      case 'emergency_shutdown': 
        return <Badge className="bg-grid-emergency/20 text-grid-emergency border-grid-emergency/30 animate-pulse hover:bg-grid-emergency/20">⚠ EMERGENCY</Badge>;
      default: 
        return <Badge variant="outline">● UNKNOWN</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs">CRITICAL</Badge>;
      case 'high':
        return <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">HIGH</Badge>;
      case 'normal':
        return <Badge className="bg-muted/20 text-muted-foreground border-muted/30 text-xs">NORMAL</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">UNKNOWN</Badge>;
    }
  };

  const totalLoad = powerLoads.reduce((sum, load) => sum + load.power, 0);
  const onlineCount = powerLoads.filter(load => load.status === 'online').length;

  const getStationIcon = (stationName: string) => {
    if (stationName.includes('City')) return Building2;
    if (stationName.includes('EV')) return Car;
    if (stationName.includes('Gas')) return Fuel;
    if (stationName.includes('Train')) return Train;
    if (stationName.includes('Factory')) return Factory;
    return Power;
  };

  return (
    <div className="h-screen bg-background text-foreground p-4 relative overflow-hidden flex flex-col">
      {/* Holographic background effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary-glow to-foreground bg-clip-text text-transparent">
                  SCADA Grid Control Center
                </h1>
                <p className="text-foreground-muted text-lg">Enterprise Power Distribution Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-foreground-muted">System Time:</span>
                <span className="text-foreground font-semibold">{currentTime.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-foreground-muted">Security:</span>
                <span className={`font-semibold ${isBreachActive ? 'text-destructive' : 'text-secondary'}`}>
                  {isBreachActive ? 'BREACH DETECTED' : 'SECURE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={simulateBreach}
              disabled={isBreachActive}
              variant="destructive"
              className="scada-button flex items-center gap-2 bg-gradient-to-r from-destructive to-destructive-dark hover:from-destructive-dark hover:to-destructive"
            >
              <AlertTriangle className="w-4 h-4" />
              Simulate Cyber Attack
            </Button>
            <Button 
              onClick={restoreSystem}
              disabled={!isBreachActive && shutdownTimer === 0}
              className="scada-button flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary"
            >
              <Power className="w-4 h-4" />
              Emergency Restore
            </Button>
          </div>
        </div>
      </div>

      {/* Breach Alert */}
      {isBreachActive && shutdownTimer > 0 && (
        <Card className="mb-4 border-destructive/50 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 breach-alert holographic-border flex-shrink-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-destructive mb-2">CYBERSECURITY BREACH DETECTED</h3>
                <p className="text-destructive/80 text-lg">Emergency grid isolation protocol activated</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="text-3xl font-mono font-bold text-destructive">
                    T-{shutdownTimer.toString().padStart(2, '0')}s
                  </div>
                  <div className="flex-1 bg-destructive/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-destructive transition-all duration-1000 ease-linear"
                      style={{ width: `${(10 - shutdownTimer) * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Left Side - Substations */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Substations
          </h2>
          {substations.map((substation) => (
            <Card key={substation.id} className="scada-card border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary">{substation.name}</h3>
                    {getStatusBadge(substation.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Voltage:</span>
                      <span className="font-mono">{substation.voltage.toLocaleString()}V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Load:</span>
                      <span className="font-mono">{substation.load}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Efficiency:</span>
                      <span className="font-mono">{substation.efficiency}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Center - Network Topology */}
        <div className="col-span-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-accent" />
            Network Topology
          </h2>
          <Card className="scada-card border-accent/20 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative z-10 h-full flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-12">
                {/* Substations at top */}
                <div className="flex justify-center gap-32">
                  {substations.map((substation) => (
                    <div key={substation.id} className="flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-xl transition-all duration-300 ${substation.status === 'emergency_shutdown' ? 'opacity-30 grayscale' : 'hover:scale-105'}`}>
                        <Zap className="w-12 h-12 text-background" />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-bold text-primary-glow text-lg">{substation.name}</div>
                        <div className="text-sm text-foreground-muted font-mono">{substation.id}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Power transmission lines */}
                <div className="relative flex justify-center">
                  <svg width="700" height="150" className="absolute">
                    <defs>
                      <linearGradient id="powerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    
                    {/* Alpha to Distribution Hub */}
                    <path 
                      d="M 140 20 Q 300 60 350 100" 
                      stroke="url(#powerFlow)" 
                      strokeWidth="6" 
                      fill="none"
                      className={`${substations[0]?.status === 'emergency_shutdown' ? 'opacity-30' : ''} transition-opacity duration-300`}
                    />
                    
                    {/* Beta to Distribution Hub */}
                    <path 
                      d="M 560 20 Q 400 60 350 100" 
                      stroke="url(#powerFlow)" 
                      strokeWidth="6" 
                      fill="none"
                      className={`${substations[1]?.status === 'emergency_shutdown' ? 'opacity-30' : ''} transition-opacity duration-300`}
                    />

                     {/* Power flow animation */}
                     {!isBreachActive && (
                       <>
                         <circle r="4" fill="hsl(var(--accent))" className="animate-pulse">
                           <animateMotion dur="3s" repeatCount="indefinite">
                             <path d="M 140 20 Q 300 60 350 100" />
                           </animateMotion>
                         </circle>
                         <circle r="4" fill="hsl(var(--accent))" className="animate-pulse">
                           <animateMotion dur="3s" repeatCount="indefinite">
                             <path d="M 560 20 Q 400 60 350 100" />
                           </animateMotion>
                         </circle>
                       </>
                     )}
                   </svg>
                 </div>

                 {/* Distribution Hub */}
                 <div className="relative z-10">
                   <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-2xl transition-all duration-300 ${isBreachActive ? 'opacity-30 grayscale' : 'hover:scale-105'}`}>
                     <Activity className="w-14 h-14 text-background" />
                   </div>
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-secondary/30">
                     <div className={`w-4 h-4 rounded-full ${onlineCount === 5 ? 'bg-secondary-glow' : 'bg-destructive'} animate-pulse`}></div>
                   </div>
                   <div className="mt-3 text-center">
                     <div className="font-bold text-accent text-lg">Distribution Hub</div>
                     <div className="text-sm text-foreground-muted">Load: {totalLoad.toFixed(1)} MW</div>
                   </div>
                 </div>

                 {/* Distribution lines to loads */}
                 <div className="flex justify-center gap-6 mt-8">
                   {powerLoads.map((load, index) => {
                     const IconComponent = getStationIcon(load.name);
                     return (
                       <div key={load.id} className="flex flex-col items-center relative">
                         <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center shadow-xl transition-all duration-300 ${load.status === 'emergency_shutdown' ? 'opacity-30 grayscale' : 'hover:scale-110 hover:shadow-2xl'}`}>
                           <IconComponent className="w-8 h-8 text-background" />
                         </div>
                         <div className="mt-2 text-center max-w-20">
                           <div className="font-semibold text-secondary text-xs leading-tight">{load.name}</div>
                           <div className="text-xs text-foreground-muted mt-1">{load.power} MW</div>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>

         {/* Right Side - Network Status */}
         <div className="col-span-3 space-y-4">
           <h2 className="text-lg font-semibold flex items-center gap-2">
             <Activity className="w-5 h-5 text-secondary" />
             Network Status
           </h2>
           <Card className="scada-card border-secondary/20">
             <CardContent className="p-4">
               <div className="space-y-3">
                 <div className="grid grid-cols-2 gap-4 text-sm">
                   <div className="flex justify-between">
                     <span className="text-foreground-muted">Total Load:</span>
                     <span className="font-mono">{totalLoad.toFixed(1)} MW</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-foreground-muted">Active Loads:</span>
                     <span className="font-mono">{onlineCount}/5</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-foreground-muted">Grid Efficiency:</span>
                     <span className="font-mono">97.9%</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-foreground-muted">System Status:</span>
                     <span className={`font-semibold ${isBreachActive ? 'text-destructive' : 'text-secondary'}`}>
                       {isBreachActive ? 'COMPROMISED' : 'OPTIMAL'}
                     </span>
                   </div>
                 </div>
                 <div className="border-t border-border pt-3">
                   <h3 className="font-semibold mb-2 text-sm">Power Loads</h3>
                   <div className="space-y-2">
                     {powerLoads.map((load) => (
                       <div key={load.id} className="flex justify-between items-center text-sm">
                         <span className="text-foreground-muted">{load.name}</span>
                         <div className="flex items-center gap-2">
                           <span className="font-mono">{load.power} MW</span>
                           <div className={`w-2 h-2 rounded-full ${
                             load.status === 'online' ? 'bg-secondary' : 'bg-destructive'
                           }`}></div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
       </div>

    </div>
  );
};

export default PowerGridDashboard;