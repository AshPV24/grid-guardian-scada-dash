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
    <div className="min-h-screen bg-background text-foreground p-6 relative">
      {/* Holographic background effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
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
        <Card className="mb-8 border-destructive/50 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 breach-alert holographic-border">
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

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="scada-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm font-medium">Total Load</p>
                <p className="metric-display text-primary">{totalLoad.toFixed(1)} MW</p>
              </div>
              <Database className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="scada-card border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm font-medium">Active Loads</p>
                <p className="metric-display text-secondary">{onlineCount}/5</p>
              </div>
              <Activity className="w-8 h-8 text-secondary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="scada-card border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm font-medium">Grid Efficiency</p>
                <p className="metric-display text-accent">97.9%</p>
              </div>
              <Cpu className="w-8 h-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="scada-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm font-medium">System Status</p>
                <p className={`text-lg font-semibold ${isBreachActive ? 'text-destructive' : 'text-secondary'}`}>
                  {isBreachActive ? 'COMPROMISED' : 'OPTIMAL'}
                </p>
              </div>
              <Shield className={`w-8 h-8 ${isBreachActive ? 'text-destructive/60' : 'text-secondary/60'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Topology - Modern Design */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Database className="w-6 h-6 text-accent" />
          Real-Time Network Topology
        </h2>
        <Card className="scada-card border-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col items-center space-y-8">
              {/* Substations at top */}
              <div className="flex justify-center gap-16">
                {substations.map((substation) => (
                  <div key={substation.id} className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-xl transition-all duration-300 ${substation.status === 'emergency_shutdown' ? 'opacity-30 grayscale' : 'hover:scale-105'}`}>
                      <Zap className="w-10 h-10 text-background" />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-bold text-primary-glow text-lg">{substation.name}</div>
                      <div className="text-sm text-foreground-muted font-mono">{substation.id}</div>
                      <div className="text-xs text-accent">{substation.voltage.toLocaleString()}V</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Power transmission lines with SVG - Fixed connections */}
              <div className="relative flex justify-center">
                <svg width="600" height="120" className="absolute">
                  <defs>
                    <linearGradient id="powerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="powerFlowReverse" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Alpha Primary (left) to Distribution Hub (center) */}
                  <path 
                    d="M 120 20 Q 250 40 300 80" 
                    stroke="url(#powerFlow)" 
                    strokeWidth="4" 
                    fill="none"
                    className={`${substations[0]?.status === 'emergency_shutdown' ? 'opacity-30' : ''} transition-opacity duration-300`}
                  />
                  
                  {/* Beta Secondary (right) to Distribution Hub (center) */}
                  <path 
                    d="M 480 20 Q 350 40 300 80" 
                    stroke="url(#powerFlowReverse)" 
                    strokeWidth="4" 
                    fill="none"
                    className={`${substations[1]?.status === 'emergency_shutdown' ? 'opacity-30' : ''} transition-opacity duration-300`}
                  />

                  {/* Power flow animation circles */}
                  {!isBreachActive && (
                    <>
                      <circle r="4" fill="hsl(var(--accent))" className="animate-pulse">
                        <animateMotion dur="2s" repeatCount="indefinite">
                          <path d="M 120 20 Q 250 40 300 80" />
                        </animateMotion>
                      </circle>
                      <circle r="4" fill="hsl(var(--accent))" className="animate-pulse">
                        <animateMotion dur="2s" repeatCount="indefinite">
                          <path d="M 480 20 Q 350 40 300 80" />
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

              {/* Distribution lines to stations - Properly connected */}
              <div className="relative">
                <div className="flex justify-center gap-6 mt-16 relative">
                  {/* SVG overlay positioned to match stations exactly */}
                  <svg 
                    width="100%" 
                    height="150" 
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ top: '-100px' }}
                  >
                    <defs>
                      <linearGradient id="distributionFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                        <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Distribution hub position (center) */}
                    {powerLoads.map((load, index) => {
                      // Calculate exact positions based on flex layout
                      const containerWidth = 800; // Approximate container width
                      const gapSize = 24; // gap-6 = 24px
                      const stationWidth = 64; // w-16 = 64px
                      const totalStations = 5;
                      const totalGaps = (totalStations - 1) * gapSize;
                      const totalStationWidth = totalStations * stationWidth;
                      const availableSpace = containerWidth - totalStationWidth - totalGaps;
                      const startOffset = availableSpace / 2;
                      
                      const centerX = containerWidth / 2; // Distribution hub center
                      const centerY = 100; // Distribution hub Y position
                      
                      const stationX = startOffset + (index * (stationWidth + gapSize)) + (stationWidth / 2);
                      const stationY = 200; // Station Y position
                      
                      const controlX = (centerX + stationX) / 2;
                      const controlY = centerY + 40;
                      
                      return (
                        <g key={load.id}>
                          <path 
                            d={`M ${centerX} ${centerY} Q ${controlX} ${controlY} ${stationX} ${stationY}`}
                            stroke="url(#distributionFlow)" 
                            strokeWidth="3" 
                            fill="none"
                            className={`${load.status === 'emergency_shutdown' ? 'opacity-30' : ''} transition-opacity duration-300`}
                          />
                          
                          {/* Power flow animation for active stations */}
                          {load.status !== 'emergency_shutdown' && (
                            <circle r="4" fill="hsl(var(--secondary-glow))" className="animate-pulse">
                              <animateMotion dur="3s" repeatCount="indefinite">
                                <path d={`M ${centerX} ${centerY} Q ${controlX} ${controlY} ${stationX} ${stationY}`} />
                              </animateMotion>
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Stations positioned exactly where lines connect */}
                  {powerLoads.map((load, index) => {
                    const IconComponent = getStationIcon(load.name);
                    return (
                      <div key={load.id} className="flex flex-col items-center relative">
                        {/* Station */}
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center shadow-xl transition-all duration-300 ${load.status === 'emergency_shutdown' ? 'opacity-30 grayscale' : 'hover:scale-110 hover:shadow-2xl'}`}>
                          <IconComponent className="w-8 h-8 text-background" />
                        </div>
                        <div className="mt-3 text-center max-w-24">
                          <div className="font-semibold text-secondary text-sm leading-tight">{load.name}</div>
                          <div className="text-xs text-foreground-muted mt-1">{load.power} MW</div>
                          <div className={`text-xs font-mono mt-1 px-2 py-1 rounded-full ${load.status === 'online' ? 'text-secondary bg-secondary/20' : 'text-destructive bg-destructive/20'}`}>
                            {load.status === 'online' ? '● ACTIVE' : '● OFFLINE'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Substations */}
        <div className="xl:col-span-1 space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            Power Generation
          </h2>
          {substations.map((substation) => (
            <Card key={substation.id} className="scada-card border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-primary-glow">{substation.name}</CardTitle>
                  {getStatusBadge(substation.status)}
                </div>
                <div className="text-sm text-foreground-muted font-mono">{substation.id}</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-foreground-muted text-sm">Voltage</p>
                      <p className="metric-display text-lg">{substation.voltage.toLocaleString()}</p>
                      <p className="text-xs text-foreground-muted">Volts</p>
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Load</p>
                      <p className="metric-display text-lg text-accent">{substation.load}%</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-foreground-muted text-sm">Frequency</p>
                      <p className="metric-display text-lg">{substation.frequency}</p>
                      <p className="text-xs text-foreground-muted">Hz</p>
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Efficiency</p>
                      <p className="metric-display text-lg text-secondary">{substation.efficiency}%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className={`status-indicator ${getStatusIndicator(substation.status)}`}></div>
                  <span className="text-sm text-foreground-muted">
                    Temp: {substation.temperature}°C
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Power Distribution */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <Power className="w-6 h-6 text-secondary" />
            Power Distribution Network
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {powerLoads.map((load) => {
              const IconComponent = getStationIcon(load.name);
              return (
                <Card key={load.id} className="scada-card border-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center ${load.status === 'emergency_shutdown' ? 'opacity-30' : ''}`}>
                          <IconComponent className="w-5 h-5 text-background" />
                        </div>
                        <CardTitle className="text-lg text-secondary-dark">{load.name}</CardTitle>
                      </div>
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(load.status)}
                        {getPriorityBadge(load.priority)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-foreground-muted text-sm">Power Draw</p>
                        <p className="metric-display text-base">{load.power}</p>
                        <p className="text-xs text-foreground-muted">MW</p>
                      </div>
                      <div>
                        <p className="text-foreground-muted text-sm">Source</p>
                        <p className="font-mono text-lg font-semibold">SUB-{load.substation}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-foreground-muted text-sm">Status</p>
                        <div className={`status-indicator ${getStatusIndicator(load.status)} mt-2`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default PowerGridDashboard;