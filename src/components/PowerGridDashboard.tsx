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

      {/* System Status Bar */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <div className="flex items-center gap-6 text-sm font-mono bg-card/50 p-4 rounded-lg border">
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
          <div className="flex items-center gap-2">
            <Power className="w-4 h-4 text-primary" />
            <span className="text-foreground-muted">Grid Status:</span>
            <span className={`font-semibold ${isBreachActive ? 'text-destructive' : 'text-secondary'}`}>
              {isBreachActive ? 'OFFLINE' : 'OPERATIONAL'}
            </span>
          </div>
          <div className="ml-auto">
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
                {/* Enterprise SCADA HMI Substations */}
                <div className="flex justify-center gap-40">
                  {substations.map((substation) => (
                    <div key={substation.id} className="flex flex-col items-center">
                      <div className={`w-32 h-24 rounded-lg border-2 ${
                        substation.status === 'online' 
                          ? 'border-secondary bg-secondary/10' 
                          : 'border-destructive bg-destructive/10'
                      } flex flex-col items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-300`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-3 h-3 rounded-full ${
                            substation.status === 'online' ? 'bg-secondary animate-pulse' : 'bg-destructive animate-pulse'
                          }`}></div>
                          <Cpu className={`w-5 h-5 ${substation.status === 'online' ? 'text-secondary' : 'text-destructive'}`} />
                        </div>
                        <div className="text-xs font-mono font-bold text-center">
                          <div>{substation.voltage.toLocaleString()}V</div>
                          <div>{substation.frequency}Hz</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-bold text-foreground text-sm">{substation.name}</div>
                        <div className="text-xs text-foreground-muted font-mono">{substation.id}</div>
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

                  {/* Enterprise Distribution Control Center */}
                  <div className="relative z-10">
                    <div className={`w-36 h-28 rounded-lg border-2 border-primary bg-primary/5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-300 ${isBreachActive ? 'opacity-30 grayscale' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${onlineCount === 5 ? 'bg-secondary animate-pulse' : 'bg-destructive animate-pulse'}`}></div>
                        <Database className="w-6 h-6 text-primary" />
                        <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-mono font-bold text-primary">MAIN CONTROL</div>
                        <div className="text-xs font-mono text-foreground-muted">{totalLoad.toFixed(1)} MW</div>
                        <div className={`text-xs font-mono ${isBreachActive ? 'text-destructive' : 'text-secondary'}`}>
                          {isBreachActive ? 'OFFLINE' : 'ONLINE'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="font-bold text-foreground text-sm">Distribution Control</div>
                      <div className="text-xs text-foreground-muted">Load: {totalLoad.toFixed(1)} MW</div>
                    </div>
                  </div>

                  {/* Enterprise Load Management Terminals */}
                  <div className="flex justify-center gap-4 mt-8">
                    {powerLoads.map((load) => {
                      const IconComponent = getStationIcon(load.name);
                      return (
                        <div key={load.id} className="flex flex-col items-center relative">
                          <div className={`w-20 h-16 rounded-lg border-2 ${
                            load.status === 'online' 
                              ? 'border-accent bg-accent/10' 
                              : 'border-destructive bg-destructive/10'
                          } flex flex-col items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-300`}>
                            <div className="flex items-center gap-1 mb-1">
                              <div className={`w-2 h-2 rounded-full ${
                                load.status === 'online' ? 'bg-accent animate-pulse' : 'bg-destructive'
                              }`}></div>
                              <IconComponent className={`w-4 h-4 ${load.status === 'online' ? 'text-accent' : 'text-destructive'}`} />
                            </div>
                            <div className="text-xs font-mono font-bold text-center">
                              {load.power}MW
                            </div>
                          </div>
                          <div className="mt-1 text-center max-w-20">
                            <div className="font-semibold text-foreground text-xs leading-tight">{load.name}</div>
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