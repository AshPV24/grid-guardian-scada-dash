import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train, CircleDot, AlertTriangle, Shield, MapPin } from "lucide-react";
import TrainTopology from "@/components/TrainTopology";
import { useNavigate } from "react-router-dom";

const TrainControl = () => {
  const navigate = useNavigate();
  const [isBreached, setIsBreached] = useState(false);
  const [trafficLights, setTrafficLights] = useState([
    { id: 1, location: "Platform 1 Entry", status: "green", lastChange: "14:28" },
    { id: 2, location: "Platform 2 Entry", status: "green", lastChange: "14:25" },
    { id: 3, location: "Main Junction", status: "red", lastChange: "14:30" },
    { id: 4, location: "Depot Exit", status: "yellow", lastChange: "14:29" },
    { id: 5, location: "Bridge Crossing", status: "green", lastChange: "14:27" }
  ]);
  
  const [trains, setTrains] = useState([
    { id: "T001", route: "North Line", platform: "1", status: "Arrived", speed: 0, nextStop: "Central Station" },
    { id: "T002", route: "East Line", platform: "3", status: "Departing", speed: 15, nextStop: "Industrial Zone" },
    { id: "T003", route: "South Line", platform: "2", status: "En Route", speed: 80, nextStop: "Platform 2" },
    { id: "T004", route: "West Line", platform: "-", status: "Maintenance", speed: 0, nextStop: "Depot" },
    { id: "T005", route: "Express", platform: "4", status: "Boarding", speed: 0, nextStop: "Airport Terminal" }
  ]);

  useEffect(() => {
    const checkBreach = () => {
      const breachStatus = localStorage.getItem('trainBreach');
      if (breachStatus === 'true' && !isBreached) {
        setIsBreached(true);
        // Simulate system compromise
        setTrafficLights(prev => prev.map(light => ({
          ...light,
          status: Math.random() > 0.7 ? 'red' : 'yellow'
        })));
        setTrains(prev => prev.map(train => ({
          ...train,
          status: Math.random() > 0.5 ? 'Emergency Stop' : 'Signal Failure',
          speed: 0
        })));
        localStorage.removeItem('trainBreach');
      }
    };

    const interval = setInterval(checkBreach, 1000);
    return () => clearInterval(interval);
  }, [isBreached]);

  const resetSystems = () => {
    setIsBreached(false);
    setTrafficLights([
      { id: 1, location: "Platform 1 Entry", status: "green", lastChange: "14:28" },
      { id: 2, location: "Platform 2 Entry", status: "green", lastChange: "14:25" },
      { id: 3, location: "Main Junction", status: "red", lastChange: "14:30" },
      { id: 4, location: "Depot Exit", status: "yellow", lastChange: "14:29" },
      { id: 5, location: "Bridge Crossing", status: "green", lastChange: "14:27" }
    ]);
    setTrains([
      { id: "T001", route: "North Line", platform: "1", status: "Arrived", speed: 0, nextStop: "Central Station" },
      { id: "T002", route: "East Line", platform: "3", status: "Departing", speed: 15, nextStop: "Industrial Zone" },
      { id: "T003", route: "South Line", platform: "2", status: "En Route", speed: 80, nextStop: "Platform 2" },
      { id: "T004", route: "West Line", platform: "-", status: "Maintenance", speed: 0, nextStop: "Depot" },
      { id: "T005", route: "Express", platform: "4", status: "Boarding", speed: 0, nextStop: "Airport Terminal" }
    ]);
  };

  const getLightColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-online';
      case 'yellow': return 'bg-warning';
      case 'red': return 'bg-offline';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Arrived': case 'Departing': case 'Boarding':
        return 'bg-online text-online-foreground';
      case 'En Route':
        return 'bg-accent text-accent-foreground';
      case 'Maintenance':
        return 'bg-warning text-warning-foreground';
      case 'Emergency Stop': case 'Signal Failure':
        return 'bg-offline text-offline-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-slate-900 to-teal-900 p-6 overflow-hidden">
      {isBreached && (
        <div className="fixed inset-0 bg-destructive/20 backdrop-blur-sm z-40 pointer-events-none animate-pulse" />
      )}
      
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Train className="w-8 h-8 text-secondary" />
              Train Control Centre
            </h1>
            <p className="text-muted-foreground">Managing railway traffic signals and train movements</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Main
            </Button>
            <Button onClick={resetSystems} variant="secondary">
              Reset Systems
            </Button>
            <a href="/breach-control.html?target=train" target="_blank" rel="noopener noreferrer">
              <Button variant="destructive" className="bg-destructive hover:bg-destructive/80">
                <Shield className="w-4 h-4 mr-2" />
                Remote Breach Control
              </Button>
            </a>
          </div>
        </div>

        {isBreached && (
          <Card className="border-destructive bg-destructive/10 mb-4 animate-breach-alert">
            <CardHeader className="pb-2">
              <CardTitle className="text-destructive flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" />
                SECURITY BREACH DETECTED
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-destructive-foreground text-sm">
                Critical railway systems compromised! All trains emergency stopped for safety.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {/* Left Side - Topology */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
              <Train className="w-5 h-5 text-secondary" />
              Railway Network Topology
            </h2>
            <Card className="bg-card/80 backdrop-blur-sm flex-1">
              <CardContent className="p-4 h-full">
                <TrainTopology trafficLights={trafficLights} trains={trains} />
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Traffic Signals and Train Info */}
          <div className="flex flex-col space-y-6">
            {/* Traffic Signals Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <CircleDot className="w-5 h-5 text-secondary" />
                Traffic Signals
              </h2>
              <div className="grid grid-cols-1 gap-4 h-full">
                {trafficLights.slice(2, 4).map((light) => (
                  <Card key={light.id} className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <CircleDot className="w-4 h-4 text-secondary" />
                          {light.location}
                        </CardTitle>
                        <div className={`w-3 h-3 rounded-full ${getLightColor(light.status)} animate-pulse`} />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Status</span>
                          <Badge className={`${getLightColor(light.status)} text-white text-xs`}>
                            {light.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last changed: {light.lastChange}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Train Trajectory Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Train className="w-5 h-5 text-secondary" />
                Train Trajectory
              </h2>
              <Card className="bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {trains.slice(0, 3).map((train) => (
                      <div key={train.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/30">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">{train.id}</Badge>
                          <span className="font-medium text-sm">{train.route}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-muted-foreground text-right">
                            <div>Speed: {train.speed} km/h</div>
                            <div>Next: {train.nextStop}</div>
                          </div>
                          <Badge className={`${getStatusColor(train.status)} text-xs`}>
                            {train.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainControl;