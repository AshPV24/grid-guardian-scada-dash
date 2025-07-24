import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Power, Plane, Train, Waves } from "lucide-react";

const MainPage = () => {
  const navigate = useNavigate();

  const scenarios = [
    {
      id: "grid",
      title: "Grid Control Center",
      description: "Monitor and control electrical power distribution networks",
      icon: Power,
      path: "/grid-control",
      gradient: "from-primary to-primary-glow"
    },
    {
      id: "airport",
      title: "Airport Control Centre",
      description: "Manage airport power systems and flight operations",
      icon: Plane,
      path: "/airport-control",
      gradient: "from-accent to-accent-glow"
    },
    {
      id: "train",
      title: "Train Control Centre", 
      description: "Control railway traffic lights and train movements",
      icon: Train,
      path: "/train-control",
      gradient: "from-secondary to-secondary-glow"
    },
    {
      id: "oil-rig",
      title: "Oil Rig Control Centre",
      description: "Monitor drilling operations and fluid level balancing",
      icon: Waves,
      path: "/oil-rig-control",
      gradient: "from-warning to-warning-glow"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Industrial Control Systems
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a control center to monitor and manage critical infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            return (
              <Card 
                key={scenario.id} 
                className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${scenario.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(scenario.path)}
                    className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300"
                    size="lg"
                  >
                    Access Control Center
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            ⚠️ These are simulation environments for training and demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;