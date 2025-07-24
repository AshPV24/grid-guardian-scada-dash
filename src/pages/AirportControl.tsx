import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Power, AlertTriangle, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AirportControl = () => {
  const navigate = useNavigate();
  const [isBreached, setIsBreached] = useState(false);
  const [powerSystems, setPowerSystems] = useState([
    { id: 1, name: "Terminal A Power", status: "online", load: 85 },
    { id: 2, name: "Terminal B Power", status: "online", load: 72 },
    { id: 3, name: "Runway Lighting", status: "online", load: 95 },
    { id: 4, name: "Control Tower", status: "online", load: 60 },
    { id: 5, name: "Baggage Systems", status: "online", load: 78 }
  ]);
  
  const [flights, setFlights] = useState([
    { id: "AA101", type: "Arrival", gate: "A12", status: "On Time", eta: "14:30" },
    { id: "UA205", type: "Departure", gate: "B7", status: "Boarding", eta: "15:15" },
    { id: "DL342", type: "Arrival", gate: "A8", status: "Delayed", eta: "14:45" },
    { id: "SW128", type: "Departure", gate: "B12", status: "On Time", eta: "15:45" },
    { id: "BA891", type: "Arrival", gate: "A15", status: "Landing", eta: "14:25" }
  ]);

  useEffect(() => {
    const checkBreach = () => {
      const breachStatus = localStorage.getItem('airportBreach');
      if (breachStatus === 'true' && !isBreached) {
        setIsBreached(true);
        // Simulate system compromise
        setPowerSystems(prev => prev.map(system => ({
          ...system,
          status: Math.random() > 0.5 ? 'offline' : 'warning',
          load: Math.random() * 100
        })));
        setFlights(prev => prev.map(flight => ({
          ...flight,
          status: Math.random() > 0.5 ? 'Delayed' : 'Cancelled'
        })));
        localStorage.removeItem('airportBreach');
      }
    };

    const interval = setInterval(checkBreach, 1000);
    return () => clearInterval(interval);
  }, [isBreached]);

  const resetSystems = () => {
    setIsBreached(false);
    setPowerSystems([
      { id: 1, name: "Terminal A Power", status: "online", load: 85 },
      { id: 2, name: "Terminal B Power", status: "online", load: 72 },
      { id: 3, name: "Runway Lighting", status: "online", load: 95 },
      { id: 4, name: "Control Tower", status: "online", load: 60 },
      { id: 5, name: "Baggage Systems", status: "online", load: 78 }
    ]);
    setFlights([
      { id: "AA101", type: "Arrival", gate: "A12", status: "On Time", eta: "14:30" },
      { id: "UA205", type: "Departure", gate: "B7", status: "Boarding", eta: "15:15" },
      { id: "DL342", type: "Arrival", gate: "A8", status: "Delayed", eta: "14:45" },
      { id: "SW128", type: "Departure", gate: "B12", status: "On Time", eta: "15:45" },
      { id: "BA891", type: "Arrival", gate: "A15", status: "Landing", eta: "14:25" }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': case 'On Time': case 'Boarding': case 'Landing':
        return 'bg-online text-online-foreground';
      case 'warning': case 'Delayed':
        return 'bg-warning text-warning-foreground';
      case 'offline': case 'Cancelled':
        return 'bg-offline text-offline-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      {isBreached && (
        <div className="fixed inset-0 bg-destructive/20 backdrop-blur-sm z-40 pointer-events-none animate-pulse" />
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Plane className="w-10 h-10 text-accent" />
              Airport Control Centre
            </h1>
            <p className="text-muted-foreground">Managing airport power systems and flight operations</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Main
            </Button>
            <Button onClick={resetSystems} variant="secondary">
              Reset Systems
            </Button>
            <a href="/breach-control.html?target=airport" target="_blank" rel="noopener noreferrer">
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
                Unauthorized access detected! Multiple systems compromised. Take immediate action.
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="power" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="power">Power Systems</TabsTrigger>
            <TabsTrigger value="flights">Flight Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="power" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {powerSystems.map((system) => (
                <Card key={system.id} className="bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        {system.name}
                      </CardTitle>
                      <Badge className={getStatusColor(system.status)}>
                        {system.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Load</span>
                        <span>{system.load.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            system.status === 'online' ? 'bg-online' :
                            system.status === 'warning' ? 'bg-warning' : 'bg-offline'
                          }`}
                          style={{ width: `${system.load}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flights" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-accent" />
                  Flight Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flights.map((flight) => (
                    <div key={flight.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{flight.id}</Badge>
                        <Badge variant="secondary">{flight.type}</Badge>
                        <span className="font-medium">Gate {flight.gate}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{flight.eta}</span>
                        <Badge className={getStatusColor(flight.status)}>
                          {flight.status}
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

export default AirportControl;