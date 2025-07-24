import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Waves, Gauge, AlertTriangle, Shield, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OilRigControl = () => {
  const navigate = useNavigate();
  const [isBreached, setIsBreached] = useState(false);
  const [fluidLevels, setFluidLevels] = useState([
    { id: 1, name: "Crude Oil Tank 1", level: 78, capacity: 1000, status: "normal" },
    { id: 2, name: "Crude Oil Tank 2", level: 65, capacity: 1000, status: "normal" },
    { id: 3, name: "Water Separator", level: 42, capacity: 500, status: "normal" },
    { id: 4, name: "Mud Circulation", level: 88, capacity: 800, status: "high" },
    { id: 5, name: "Fuel Reserve", level: 35, capacity: 600, status: "low" }
  ]);
  
  const [drillingOps, setDrillingOps] = useState([
    { id: 1, well: "Well-A1", depth: 2450, target: 3000, pressure: 2800, status: "Active" },
    { id: 2, well: "Well-B2", depth: 1875, target: 2500, pressure: 2200, status: "Active" },
    { id: 3, well: "Well-C3", depth: 3200, target: 3200, pressure: 3100, status: "Complete" },
    { id: 4, well: "Well-D4", depth: 890, target: 2800, pressure: 1200, status: "Drilling" },
    { id: 5, well: "Well-E5", depth: 0, target: 2200, pressure: 0, status: "Standby" }
  ]);

  useEffect(() => {
    const checkBreach = () => {
      const breachStatus = localStorage.getItem('oilRigBreach');
      if (breachStatus === 'true' && !isBreached) {
        setIsBreached(true);
        // Simulate system compromise
        setFluidLevels(prev => prev.map(fluid => ({
          ...fluid,
          level: Math.random() * 100,
          status: Math.random() > 0.6 ? 'critical' : 'warning'
        })));
        setDrillingOps(prev => prev.map(well => ({
          ...well,
          status: Math.random() > 0.5 ? 'Emergency Stop' : 'System Failure',
          pressure: Math.random() * 4000
        })));
        localStorage.removeItem('oilRigBreach');
      }
    };

    const interval = setInterval(checkBreach, 1000);
    return () => clearInterval(interval);
  }, [isBreached]);

  const resetSystems = () => {
    setIsBreached(false);
    setFluidLevels([
      { id: 1, name: "Crude Oil Tank 1", level: 78, capacity: 1000, status: "normal" },
      { id: 2, name: "Crude Oil Tank 2", level: 65, capacity: 1000, status: "normal" },
      { id: 3, name: "Water Separator", level: 42, capacity: 500, status: "normal" },
      { id: 4, name: "Mud Circulation", level: 88, capacity: 800, status: "high" },
      { id: 5, name: "Fuel Reserve", level: 35, capacity: 600, status: "low" }
    ]);
    setDrillingOps([
      { id: 1, well: "Well-A1", depth: 2450, target: 3000, pressure: 2800, status: "Active" },
      { id: 2, well: "Well-B2", depth: 1875, target: 2500, pressure: 2200, status: "Active" },
      { id: 3, well: "Well-C3", depth: 3200, target: 3200, pressure: 3100, status: "Complete" },
      { id: 4, well: "Well-D4", depth: 890, target: 2800, pressure: 1200, status: "Drilling" },
      { id: 5, well: "Well-E5", depth: 0, target: 2200, pressure: 0, status: "Standby" }
    ]);
  };

  const getFluidStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-online text-online-foreground';
      case 'low': case 'high': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-offline text-offline-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDrillingStatusColor = (status: string) => {
    switch (status) {
      case 'Active': case 'Drilling': case 'Complete':
        return 'bg-online text-online-foreground';
      case 'Standby':
        return 'bg-warning text-warning-foreground';
      case 'Emergency Stop': case 'System Failure':
        return 'bg-offline text-offline-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getFluidLevelColor = (level: number, status: string) => {
    if (status === 'critical') return 'bg-offline';
    if (level > 80 || level < 20) return 'bg-warning';
    return 'bg-online';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-warning/10 p-6">
      {isBreached && (
        <div className="fixed inset-0 bg-destructive/20 backdrop-blur-sm z-40 pointer-events-none animate-pulse" />
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Waves className="w-10 h-10 text-warning" />
              Oil Rig Control Centre
            </h1>
            <p className="text-muted-foreground">Monitoring drilling operations and fluid level management</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Main
            </Button>
            <Button onClick={resetSystems} variant="secondary">
              Reset Systems
            </Button>
            <a href="/breach-control.html?target=oilrig" target="_blank" rel="noopener noreferrer">
              <Button variant="destructive" className="bg-destructive hover:bg-destructive/80">
                <Shield className="w-4 h-4 mr-2" />
                Remote Breach Control
              </Button>
            </a>
          </div>
        </div>

        {isBreached && (
          <Card className="border-destructive bg-destructive/10 mb-6 animate-breach-alert">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                SECURITY BREACH DETECTED
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">
                Critical drilling systems compromised! Fluid levels destabilized. Emergency protocols activated.
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="fluids" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fluids">Fluid Levels</TabsTrigger>
            <TabsTrigger value="drilling">Drilling Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="fluids" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fluidLevels.map((fluid) => (
                <Card key={fluid.id} className="bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-warning" />
                        {fluid.name}
                      </CardTitle>
                      <Badge className={getFluidStatusColor(fluid.status)}>
                        {fluid.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Level</span>
                        <span>{fluid.level.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${getFluidLevelColor(fluid.level, fluid.status)}`}
                          style={{ width: `${fluid.level}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Capacity: {fluid.capacity}L
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drilling" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-warning" />
                  Active Wells
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drillingOps.map((well) => (
                    <div key={well.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{well.well}</Badge>
                        <div className="text-sm">
                          <div>Depth: {well.depth}m / {well.target}m</div>
                          <div className="w-32 bg-muted rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-warning transition-all duration-300"
                              style={{ width: `${(well.depth / well.target) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground text-right">
                          <div>Pressure: {well.pressure} PSI</div>
                          <div className="text-xs">Progress: {((well.depth / well.target) * 100).toFixed(1)}%</div>
                        </div>
                        <Badge className={getDrillingStatusColor(well.status)}>
                          {well.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OilRigControl;