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
    // Stations (Red dots) - Adjusted positions to fit in frame
    {
      id: 'station-1',
      type: 'default',
      position: { x: 250, y: 80 },
      data: { label: '' },
      style: { 
        background: '#dc2626', 
        border: '2px solid #dc2626',
        borderRadius: '50%',
        width: 20,
        height: 20,
        padding: 0
      }
    },
    {
      id: 'station-2',
      type: 'default',
      position: { x: 380, y: 180 },
      data: { label: '' },
      style: { 
        background: '#dc2626', 
        border: '2px solid #dc2626',
        borderRadius: '50%',
        width: 20,
        height: 20,
        padding: 0
      }
    },
    {
      id: 'station-3',
      type: 'default',
      position: { x: 250, y: 280 },
      data: { label: '' },
      style: { 
        background: '#dc2626', 
        border: '2px solid #dc2626',
        borderRadius: '50%',
        width: 20,
        height: 20,
        padding: 0
      }
    },
    {
      id: 'station-4',
      type: 'default',
      position: { x: 120, y: 180 },
      data: { label: '' },
      style: { 
        background: '#dc2626', 
        border: '2px solid #dc2626',
        borderRadius: '50%',
        width: 20,
        height: 20,
        padding: 0
      }
    },
    // Traffic Lights (Green dots)
    {
      id: 'traffic-1',
      type: 'default',
      position: { x: 315, y: 130 },
      data: { label: '' },
      style: { 
        background: '#16a34a', 
        border: '2px solid #16a34a',
        borderRadius: '50%',
        width: 16,
        height: 16,
        padding: 0
      }
    },
    {
      id: 'traffic-2',
      type: 'default',
      position: { x: 185, y: 230 },
      data: { label: '' },
      style: { 
        background: '#16a34a', 
        border: '2px solid #16a34a',
        borderRadius: '50%',
        width: 16,
        height: 16,
        padding: 0
      }
    },
    // Train (Blue line/rectangle)
    {
      id: 'train-active',
      type: 'default',
      position: getTrainPosition(trains),
      data: { label: '' },
      style: { 
        background: '#2563eb', 
        border: '2px solid #2563eb',
        borderRadius: '4px',
        width: 40,
        height: 8,
        padding: 0
      }
    }
  ], [trafficLights, trains]);

  const initialEdges: Edge[] = useMemo(() => [
    // Circular track connections (Black lines)
    {
      id: 'track-1-2',
      source: 'station-1',
      target: 'station-2',
      type: 'smoothstep',
      style: { stroke: '#000000', strokeWidth: 4 }
    },
    {
      id: 'track-2-3',
      source: 'station-2',
      target: 'station-3',
      type: 'smoothstep',
      style: { stroke: '#000000', strokeWidth: 4 }
    },
    {
      id: 'track-3-4',
      source: 'station-3',
      target: 'station-4',
      type: 'smoothstep',
      style: { stroke: '#000000', strokeWidth: 4 }
    },
    {
      id: 'track-4-1',
      source: 'station-4',
      target: 'station-1',
      type: 'smoothstep',
      style: { stroke: '#000000', strokeWidth: 4 }
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
    // Move train along circular track based on time - adjusted for new coordinates
    const time = Date.now() / 2000; // Slow down animation
    const angle = (time % (2 * Math.PI));
    const centerX = 250;
    const centerY = 180;
    const radius = 100;
    
    return { 
      x: centerX + Math.cos(angle) * radius - 20, 
      y: centerY + Math.sin(angle) * radius - 4
    };
  }
  return { x: 280, y: 140 }; // Default position between stations
}

export default TrainTopology;