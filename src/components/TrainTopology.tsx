import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface TrainTopologyProps {
  trafficLights: Array<{
    id: number;
    location: string;
    status: string;
    lastChange: string;
  }>;
  trains: Array<{
    id: string;
    route: string;
    platform: string;
    status: string;
    speed: number;
    nextStop: string;
  }>;
}

const TrainTopology = ({ trafficLights, trains }: TrainTopologyProps) => {
  const initialNodes: Node[] = useMemo(() => [
    // Stations
    {
      id: 'station-1',
      type: 'default',
      position: { x: 200, y: 50 },
      data: { 
        label: 'Platform 1\nNorth Station' 
      },
      style: { 
        background: '#1e293b', 
        color: 'white', 
        border: '2px solid #0d9488',
        borderRadius: '8px',
        width: 120,
        height: 60
      }
    },
    {
      id: 'station-2',
      type: 'default',
      position: { x: 400, y: 200 },
      data: { 
        label: 'Platform 2\nEast Station' 
      },
      style: { 
        background: '#1e293b', 
        color: 'white', 
        border: '2px solid #0d9488',
        borderRadius: '8px',
        width: 120,
        height: 60
      }
    },
    {
      id: 'station-3',
      type: 'default',
      position: { x: 200, y: 350 },
      data: { 
        label: 'Platform 3\nSouth Station' 
      },
      style: { 
        background: '#1e293b', 
        color: 'white', 
        border: '2px solid #0d9488',
        borderRadius: '8px',
        width: 120,
        height: 60
      }
    },
    {
      id: 'station-4',
      type: 'default',
      position: { x: 0, y: 200 },
      data: { 
        label: 'Platform 4\nWest Station' 
      },
      style: { 
        background: '#1e293b', 
        color: 'white', 
        border: '2px solid #0d9488',
        borderRadius: '8px',
        width: 120,
        height: 60
      }
    },
    // Traffic Lights
    {
      id: 'traffic-1',
      type: 'default',
      position: { x: 300, y: 120 },
      data: { 
        label: `🚦\n${trafficLights[0]?.status?.toUpperCase() || 'GREEN'}\nMain Junction` 
      },
      style: { 
        background: getTrafficLightColor(trafficLights[0]?.status || 'green'), 
        color: 'white',
        border: '2px solid #374151',
        borderRadius: '50%',
        width: 80,
        height: 80,
        fontSize: '12px'
      }
    },
    {
      id: 'traffic-2',
      type: 'default',
      position: { x: 100, y: 280 },
      data: { 
        label: `🚦\n${trafficLights[3]?.status?.toUpperCase() || 'YELLOW'}\nDepot Exit` 
      },
      style: { 
        background: getTrafficLightColor(trafficLights[3]?.status || 'yellow'), 
        color: 'white',
        border: '2px solid #374151',
        borderRadius: '50%',
        width: 80,
        height: 80,
        fontSize: '12px'
      }
    },
    // Train (positioned dynamically based on status)
    {
      id: 'train-active',
      type: 'default',
      position: getTrainPosition(trains),
      data: { 
        label: `🚂\n${trains.find(t => t.status === 'En Route')?.id || 'T003'}\n${trains.find(t => t.status === 'En Route')?.speed || 80} km/h` 
      },
      style: { 
        background: '#dc2626', 
        color: 'white',
        border: '2px solid #fbbf24',
        borderRadius: '8px',
        width: 100,
        height: 60,
        fontSize: '11px'
      }
    }
  ], [trafficLights, trains]);

  const initialEdges: Edge[] = useMemo(() => [
    // Circular track connections
    {
      id: 'track-1-2',
      source: 'station-1',
      target: 'station-2',
      type: 'smoothstep',
      style: { stroke: '#0d9488', strokeWidth: 4 },
      animated: true
    },
    {
      id: 'track-2-3',
      source: 'station-2',
      target: 'station-3',
      type: 'smoothstep',
      style: { stroke: '#0d9488', strokeWidth: 4 },
      animated: true
    },
    {
      id: 'track-3-4',
      source: 'station-3',
      target: 'station-4',
      type: 'smoothstep',
      style: { stroke: '#0d9488', strokeWidth: 4 },
      animated: true
    },
    {
      id: 'track-4-1',
      source: 'station-4',
      target: 'station-1',
      type: 'smoothstep',
      style: { stroke: '#0d9488', strokeWidth: 4 },
      animated: true
    }
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{ backgroundColor: '#0f172a' }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b" />
        <MiniMap 
          style={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #0d9488'
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

function getTrafficLightColor(status: string): string {
  switch (status) {
    case 'green': return '#16a34a';
    case 'yellow': return '#eab308';
    case 'red': return '#dc2626';
    default: return '#16a34a';
  }
}

function getTrainPosition(trains: any[]): { x: number; y: number } {
  const movingTrain = trains.find(t => t.status === 'En Route');
  if (movingTrain) {
    // Position train between stations based on speed
    const progress = (movingTrain.speed / 100) * 0.5;
    return { x: 250 + progress * 100, y: 150 + progress * 50 };
  }
  return { x: 250, y: 150 };
}

export default TrainTopology;