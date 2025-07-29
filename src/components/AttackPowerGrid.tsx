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

const AttackPowerGrid = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Attack scenario - all systems compromised
  const [substations] = useState<Substation[]>([
    {
      id: 'SUB-A',
      name: 'Alpha Primary',
      voltage: 0,
      frequency: 0,
      status: 'emergency_shutdown',
      load: 0,
      temperature: 25,
      efficiency: 0
    },
    {
      id: 'SUB-B',
      name: 'Beta Secondary',
      voltage: 0,
      frequency: 0,
      status: 'emergency_shutdown',
      load: 0,
      temperature: 25,
      efficiency: 0
    }
  ]);

  const [powerLoads] = useState<PowerLoad[]>([
    { id: 'LOAD-1', name: 'Metro City Grid', power: 0, status: 'emergency_shutdown', substation: 'A', priority: 'high' },
    { id: 'LOAD-2', name: 'EV Charging Station', power: 0, status: 'emergency_shutdown', substation: 'B', priority: 'normal' },
    { id: 'LOAD-3', name: 'Gas Station Complex', power: 0, status: 'emergency_shutdown', substation: 'A', priority: 'normal' },
    { id: 'LOAD-4', name: 'Central Train Station', power: 0, status: 'emergency_shutdown', substation: 'B', priority: 'high' },
    { id: 'LOAD-5', name: 'Industrial Factory Plant', power: 0, status: 'emergency_shutdown', substation: 'A', priority: 'critical' }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    toast({
      title: "🚨 SYSTEM COMPROMISED",
      description: "All power systems have been brought offline by cyber attack.",
      variant: "destructive"
    });
  }, [toast]);

  const getStatusBadge = (status: string) => {
    return <Badge className="bg-grid-emergency/20 text-grid-emergency border-grid-emergency/30 animate-pulse hover:bg-grid-emergency/20">⚠ OFFLINE</Badge>;
  };

  const totalLoad = 0;
  const onlineCount = 0;

  const getStationIcon = (stationName: string) => {
    if (stationName.includes('City')) return Building2;
    if (stationName.includes('EV')) return Car;
    if (stationName.includes('Gas')) return Fuel;
    if (stationName.includes('Train')) return Train;
    if (stationName.includes('Factory')) return Factory;
    return Power;
  };

  const restoreSystem = () => {
    window.location.href = '/grid-control';
  };

  return (
    <div className="h-screen bg-background text-foreground p-4 relative overflow-hidden flex flex-col">
      {/* Holographic background effect - darker for attack mode */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 via-transparent to-destructive/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-destructive to-destructive-dark rounded-lg flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-destructive via-destructive-dark to-destructive bg-clip-text text-transparent">
                  GRID UNDER ATTACK
                </h1>
                <p className="text-destructive text-lg">⚠ CRITICAL SYSTEM FAILURE - ALL POWER OFFLINE</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-destructive" />
                <span className="text-foreground-muted">System Time:</span>
                <span className="text-foreground font-semibold">{currentTime.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-destructive" />
                <span className="text-foreground-muted">Security:</span>
                <span className="font-semibold text-destructive animate-pulse">COMPROMISED</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={restoreSystem}
              className="scada-button flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary"
            >
              <Power className="w-4 h-4" />
              Return to Grid Control
            </Button>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <Card className="mb-4 border-destructive/50 bg-gradient-to-r from-destructive/20 via-destructive/10 to-destructive/20 breach-alert holographic-border flex-shrink-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-destructive/30 rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-destructive mb-2">CYBER ATTACK IN PROGRESS</h3>
              <p className="text-destructive/80 text-lg">Complete grid shutdown - All power generation and distribution offline</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="text-xl font-mono font-bold text-destructive">
                  STATUS: CRITICAL FAILURE
                </div>
                <div className="flex-1 bg-destructive/30 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-destructive w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Left Side - Substations */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-destructive" />
            Substations
          </h2>
          {substations.map((substation) => (
            <Card key={substation.id} className="scada-card border-destructive/30 opacity-60">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-destructive">{substation.name}</h3>
                    {getStatusBadge(substation.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Voltage:</span>
                      <span className="font-mono text-destructive">0V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Load:</span>
                      <span className="font-mono text-destructive">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Efficiency:</span>
                      <span className="font-mono text-destructive">0%</span>
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
            <Database className="w-5 h-5 text-destructive" />
            Network Topology
          </h2>
          <Card className="scada-card border-destructive/30 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent pointer-events-none"></div>
            <CardContent className="p-6 relative z-10 h-full flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-12">
                {/* Substations at top - offline */}
                <div className="flex justify-center gap-32">
                  {substations.map((substation) => (
                    <div key={substation.id} className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-destructive/30 to-destructive/20 flex items-center justify-center shadow-xl opacity-30 grayscale">
                        <Zap className="w-12 h-12 text-destructive" />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-bold text-destructive text-lg">{substation.name}</div>
                        <div className="text-sm text-destructive font-mono">{substation.id}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Power transmission lines - offline */}
                <div className="relative flex justify-center">
                  <svg width="700" height="150" className="absolute">
                    <defs>
                      <linearGradient id="deadFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="hsl(var(--destructive))" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    
                    {/* Dead power lines */}
                    <path 
                      d="M 140 20 Q 300 60 350 100" 
                      stroke="url(#deadFlow)" 
                      strokeWidth="6" 
                      fill="none"
                      className="opacity-30"
                    />
                    <path 
                      d="M 560 20 Q 400 60 350 100" 
                      stroke="url(#deadFlow)" 
                      strokeWidth="6" 
                      fill="none"
                      className="opacity-30"
                    />
                  </svg>
                </div>

                {/* Distribution Hub - offline */}
                <div className="relative z-10">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-destructive/30 to-destructive/20 flex items-center justify-center shadow-2xl opacity-30 grayscale">
                    <Activity className="w-14 h-14 text-destructive" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-destructive/30">
                    <div className="w-4 h-4 rounded-full bg-destructive animate-pulse"></div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-bold text-destructive text-lg">Distribution Hub</div>
                    <div className="text-sm text-destructive">Load: 0.0 MW</div>
                  </div>
                </div>

                {/* Distribution lines to loads - offline */}
                <div className="flex justify-center gap-6 mt-8">
                  {powerLoads.map((load) => {
                    const IconComponent = getStationIcon(load.name);
                    return (
                      <div key={load.id} className="flex flex-col items-center relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-destructive/30 to-destructive/20 flex items-center justify-center shadow-xl opacity-30 grayscale">
                          <IconComponent className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="mt-2 text-center max-w-20">
                          <div className="font-semibold text-destructive text-xs leading-tight">{load.name}</div>
                          <div className="text-xs text-destructive mt-1">0 MW</div>
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
            <Activity className="w-5 h-5 text-destructive" />
            Network Status
          </h2>
          <Card className="scada-card border-destructive/30">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Total Load:</span>
                    <span className="font-mono text-destructive">0.0 MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Active Loads:</span>
                    <span className="font-mono text-destructive">0/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Grid Efficiency:</span>
                    <span className="font-mono text-destructive">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">System Status:</span>
                    <span className="font-semibold text-destructive animate-pulse">
                      OFFLINE
                    </span>
                  </div>
                </div>
                <div className="border-t border-destructive/30 pt-3">
                  <h3 className="font-semibold mb-2 text-sm">Power Loads</h3>
                  <div className="space-y-2">
                    {powerLoads.map((load) => (
                      <div key={load.id} className="flex justify-between items-center text-sm">
                        <span className="text-foreground-muted">{load.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-destructive">0 MW</span>
                          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse"></div>
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

export default AttackPowerGrid;