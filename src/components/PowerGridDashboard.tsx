import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Wind, Zap, Calendar, Factory, Train, Building2, Cpu, Battery, Gauge, Wrench } from 'lucide-react';

const PowerGridDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return `${month} ${day} ${year} ${time}`;
  };

  return (
    <div className="h-screen bg-gray-800 text-white p-6 relative overflow-hidden font-mono">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <h1 className="text-2xl font-bold text-center text-green-400 mb-4">
          Power System Physical World Simulator
        </h1>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 grid grid-cols-12 gap-4 h-full">
        
        {/* Left Column - Power Generation */}
        <div className="col-span-4 space-y-4">
          
          {/* Solar Panel Generators */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-sm mb-3">Solar-Panel-Generators</h3>
              <div className="bg-green-500/20 border border-green-500 rounded p-4 mb-3">
                <div className="flex items-center justify-center mb-2">
                  <Sun className="w-6 h-6 text-yellow-400 mr-2" />
                  <div className="w-8 h-8 bg-green-600 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-green-400">State: Running</div>
                    <div className="text-green-400">Voltage: 50V</div>
                    <div className="text-green-400">Current: 0.0A</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-8 bg-gray-600 rounded border" />
                  </div>
                </div>
              </div>
              <div className="text-xs text-green-400">Solar-Panels-SW-ON</div>
            </CardContent>
          </Card>

          {/* Wind Turbine Generators */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-sm mb-3">Wind-Turbine-Generators</h3>
              <div className="bg-green-500/20 border border-green-500 rounded p-4 mb-3">
                <div className="flex items-center justify-center mb-2">
                  <Wind className="w-6 h-6 text-blue-400 mr-2" />
                  <div className="text-green-400 text-lg font-bold">~20</div>
                </div>
                <div className="text-xs">
                  <div className="text-green-400">State: Running</div>
                  <div className="text-green-400">Voltage: 33kV</div>
                  <div className="text-green-400">Current: 0.0A</div>
                </div>
              </div>
              <div className="text-xs text-green-400">Wind-Turbines-SW-ON</div>
            </CardContent>
          </Card>

          {/* Power Storage */}
          <Card className="bg-gray-900/80 border-orange-500/50">
            <CardContent className="p-4">
              <h3 className="text-orange-400 font-bold text-sm mb-3">Power Storage</h3>
              <div className="bg-orange-500/20 border border-orange-500 rounded p-4">
                <div className="flex items-center justify-center mb-2">
                  <Battery className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-xs text-orange-400">
                  DC-AC-StepUp-Transformer[Solar]
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generators */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="bg-gray-900/80 border-green-500/50">
              <CardContent className="p-2">
                <div className="text-xs text-green-400 mb-2">Gen-Driver-Motor_01</div>
                <div className="bg-green-500/20 border border-green-500 rounded p-2 mb-1">
                  <Cpu className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xs text-green-400">Motor_1-SW-ON</div>
                <div className="text-xs text-green-400">RPM: 5883</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/80 border-green-500/50">
              <CardContent className="p-2">
                <div className="text-xs text-green-400 mb-2">Generator_01</div>
                <div className="bg-green-500/20 border border-green-500 rounded p-2 mb-1">
                  <Gauge className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xs text-green-400">Gen_1-SW-ON</div>
                <div className="text-xs text-green-400">State: Running</div>
                <div className="text-xs text-green-400">Voltage: 10kV</div>
                <div className="text-xs text-green-400">Current: 241.7A</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Center Column - Power Transmission */}
        <div className="col-span-4 space-y-4">
          
          {/* High Voltage Transmission */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-sm mb-3">High Voltage Power Transmission Towers</h3>
              <div className="bg-green-500/20 border border-green-500 rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <Zap className="w-6 h-6 text-green-400" />
                  <div className="text-green-400 text-xs">Transmission-SW-ON</div>
                </div>
                <div className="flex justify-center gap-4 mb-2">
                  <div className="w-8 h-12 bg-green-600 rounded-t-full" />
                  <div className="w-8 h-12 bg-green-600 rounded-t-full" />
                  <div className="w-8 h-12 bg-green-600 rounded-t-full" />
                  <div className="w-8 h-12 bg-green-600 rounded-t-full" />
                </div>
                <div className="text-xs text-green-400 text-center">
                  <div>Voltage: 138kV</div>
                  <div>Current: 51.4A</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Power Transmission */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-center text-lg mb-4">Power Transmission</h3>
              
              {/* Power Substation */}
              <div className="bg-green-500/20 border border-green-500 rounded p-4 mb-4">
                <div className="text-green-400 text-sm font-bold mb-2">Power-Substation</div>
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-xs text-green-400 text-center">
                  <div>Substation-SW-ON</div>
                  <div>Voltage: 138kV</div>
                  <div>Current: 50.5A</div>
                </div>
              </div>

              {/* AC Transformers */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Card className="bg-gray-900/80 border-green-500/50">
                  <CardContent className="p-2">
                    <div className="text-xs text-green-400 mb-1">AC-AC-StepUp-Transformer[Wind]</div>
                    <div className="bg-green-500/20 border border-green-500 rounded p-2">
                      <Wrench className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      <div>Voltage: 33kV</div>
                      <div>Current: 85.6A</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 border-green-500/50">
                  <CardContent className="p-2">
                    <div className="text-xs text-green-400 mb-1">Lvl0-AC-AC-StepDown-Transformer</div>
                    <div className="bg-green-500/20 border border-green-500 rounded p-2">
                      <Wrench className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      <div>Railway-SW-ON</div>
                      <div>Voltage: 60kV</div>
                      <div>Current: 95.1A</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Power Control PLC */}
              <Card className="bg-gray-900/80 border-blue-500/50 mb-2">
                <CardContent className="p-2">
                  <div className="text-blue-400 text-xs font-bold mb-1">Power Control PLC Set</div>
                  <div className="bg-blue-500/20 border border-blue-500 rounded p-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs text-red-400 mt-1">
                    [MSG] PLC 01, PLC 02
                  </div>
                </CardContent>
              </Card>

              {/* Power Monitor RTU */}
              <Card className="bg-gray-900/80 border-blue-500/50">
                <CardContent className="p-2">
                  <div className="text-blue-400 text-xs font-bold mb-1">Power Monitor RTU Set</div>
                  <div className="bg-blue-500/20 border border-blue-500 rounded p-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs text-red-400 mt-1">
                    [RTU] All PID
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Power Customers */}
        <div className="col-span-4 space-y-4">
          
          {/* Power Distribution */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-center text-lg mb-4">Power Distribution</h3>
              
              {/* More Transformers */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Card className="bg-gray-900/80 border-green-500/50">
                  <CardContent className="p-2">
                    <div className="text-xs text-green-400 mb-1">Lvl1-AC-AC-StepDown-Transformer</div>
                    <div className="bg-green-500/20 border border-green-500 rounded p-2">
                      <Wrench className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      <div>Factory-SW-ON</div>
                      <div>Voltage: 13kV</div>
                      <div>Current: 82.1A</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 border-green-500/50">
                  <CardContent className="p-2">
                    <div className="text-xs text-green-400 mb-1">Lvl2-AC-AC-StepDown-Transformer</div>
                    <div className="bg-green-500/20 border border-green-500 rounded p-2">
                      <Wrench className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      <div>Transformer-SW-ON</div>
                      <div>Voltage: 220V</div>
                      <div>Current: 16.2A</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Power Customers */}
          <Card className="bg-gray-900/80 border-green-500/50">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-bold text-center text-lg mb-4">Power Customers</h3>
              
              {/* Railway Customer */}
              <Card className="bg-blue-500/20 border border-blue-500 mb-3">
                <CardContent className="p-3">
                  <div className="text-blue-400 text-sm font-bold mb-2">Substation Customer: Railway</div>
                  <div className="bg-blue-600/30 rounded p-2">
                    <Train className="w-6 h-6 text-blue-400 mx-auto" />
                  </div>
                </CardContent>
              </Card>

              {/* Factory Customer */}
              <Card className="bg-orange-500/20 border border-orange-500 mb-3">
                <CardContent className="p-3">
                  <div className="text-orange-400 text-sm font-bold mb-2">Primary Customer: Factory</div>
                  <div className="bg-orange-600/30 rounded p-2">
                    <Factory className="w-6 h-6 text-orange-400 mx-auto" />
                  </div>
                </CardContent>
              </Card>

              {/* Smart Home Customer */}
              <Card className="bg-green-500/20 border border-green-500">
                <CardContent className="p-3">
                  <div className="text-green-400 text-sm font-bold mb-2">Secondary Customer: City Smart Home</div>
                  <div className="bg-green-600/30 rounded p-2">
                    <Building2 className="w-6 h-6 text-green-400 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Time Display */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-green-400">
        <Calendar className="w-4 h-4" />
        <span className="font-mono">TIME : {formatDateTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default PowerGridDashboard;