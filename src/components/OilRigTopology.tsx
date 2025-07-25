import { useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface OilRigTopologyProps {
  fluidLevels: Array<{
    id: number;
    name: string;
    level: number;
    capacity: number;
    status: string;
  }>;
}

const OilRigTopology = ({ fluidLevels }: OilRigTopologyProps) => {
  const initialNodes: Node[] = useMemo(() => {
    const topTanks = fluidLevels.slice(0, 4);
    const bottomTanks = fluidLevels.slice(4, 8);
    
    const nodes: Node[] = [];
    
    // Top row tanks
    topTanks.forEach((tank, index) => {
      nodes.push({
        id: `tank-top-${tank.id}`,
        type: 'default',
        position: { x: index * 150 + 50, y: 50 },
        data: { 
          label: `${tank.name}\n${tank.level.toFixed(1)}%\n${tank.capacity}L`,
        },
        style: {
          background: getTankColor(tank.level, tank.status),
          color: 'white',
          border: '3px solid #0d9488',
          borderRadius: '12px',
          width: 120,
          height: 100,
          fontSize: '11px',
          position: 'relative',
          overflow: 'hidden'
        }
      });
    });
    
    // Bottom row tanks
    bottomTanks.forEach((tank, index) => {
      nodes.push({
        id: `tank-bottom-${tank.id}`,
        type: 'default',
        position: { x: index * 150 + 50, y: 250 },
        data: { 
          label: `${tank.name}\n${tank.level.toFixed(1)}%\n${tank.capacity}L`,
        },
        style: {
          background: getTankColor(tank.level, tank.status),
          color: 'white',
          border: '3px solid #0d9488',
          borderRadius: '12px',
          width: 120,
          height: 100,
          fontSize: '11px',
          position: 'relative',
          overflow: 'hidden'
        }
      });
    });

    // Control Center
    nodes.push({
      id: 'control-center',
      type: 'default',
      position: { x: 275, y: 150 },
      data: { 
        label: '🏭\nControl Center\nMonitoring All Tanks'
      },
      style: {
        background: '#1e293b',
        color: 'white',
        border: '3px solid #fbbf24',
        borderRadius: '8px',
        width: 150,
        height: 80,
        fontSize: '12px'
      }
    });

    // Pumping Station
    nodes.push({
      id: 'pump-station',
      type: 'default',
      position: { x: 50, y: 400 },
      data: { 
        label: '⚙️\nPumping Station\nFluid Transfer'
      },
      style: {
        background: '#7c2d12',
        color: 'white',
        border: '3px solid #ea580c',
        borderRadius: '8px',
        width: 120,
        height: 80,
        fontSize: '12px'
      }
    });

    // Processing Unit
    nodes.push({
      id: 'processing-unit',
      type: 'default',
      position: { x: 480, y: 400 },
      data: { 
        label: '🔬\nProcessing Unit\nRefinement'
      },
      style: {
        background: '#581c87',
        color: 'white',
        border: '3px solid #a855f7',
        borderRadius: '8px',
        width: 120,
        height: 80,
        fontSize: '12px'
      }
    });

    return nodes;
  }, [fluidLevels]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    // Connect control center to all tanks
    for (let i = 1; i <= 8; i++) {
      const isTop = i <= 4;
      const targetId = isTop ? `tank-top-${i}` : `tank-bottom-${i}`;
      
      edges.push({
        id: `control-to-tank-${i}`,
        source: 'control-center',
        target: targetId,
        type: 'smoothstep',
        style: { 
          stroke: '#64748b', 
          strokeWidth: 2,
          strokeDasharray: '5,5'
        },
        animated: false
      });
    }

    // Connect pumping station to bottom tanks
    edges.push({
      id: 'pump-to-tank-5',
      source: 'pump-station',
      target: 'tank-bottom-5',
      type: 'smoothstep',
      style: { stroke: '#ea580c', strokeWidth: 3 },
      animated: true
    });

    // Connect top tanks to processing unit
    edges.push({
      id: 'tank-1-to-processing',
      source: 'tank-top-1',
      target: 'processing-unit',
      type: 'smoothstep',
      style: { stroke: '#a855f7', strokeWidth: 3 },
      animated: true
    });

    // Inter-tank connections
    edges.push({
      id: 'tank-transfer-1',
      source: 'tank-top-2',
      target: 'tank-bottom-6',
      type: 'smoothstep',
      style: { stroke: '#0d9488', strokeWidth: 2 },
      animated: true
    });

    return edges;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '500px' }}>
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

function getTankColor(level: number, status: string): string {
  if (status === 'critical') return '#dc2626';
  if (status === 'warning' || level > 80 || level < 20) return '#eab308';
  return '#16a34a';
}

export default OilRigTopology;