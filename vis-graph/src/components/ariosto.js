import React from 'react'
import Graph from 'react-vis-network-graph'
import {edges, nodes} from './ariosto_data'

export default function Ariosto() {

    var options = {
        nodes:{
            shape: "dot",
            scaling: {
                min: 10,
                max: 30,
                label: {
                    min: 12,
                    max: 30,
                    drawThreshold: 12,
                    maxVisible: 20
                }
            },
            font: {
                size: 9,
                face: "Tahoma"
            }
        },
        edges: {
            width: 0.15,
            color: {inherit: "from"},
            smooth: {
                type: "continuous"
            }
        },
        groups: {
            //Christian
            1: { color: { background: '#FC5B3F', border: 'black' }, font: { color: 'black' } },
            //Saracen
            2: { color: { background: '#1A4F63', border: 'black' }, font: { color: 'black' } },
            //Other
            3: { color: { background: '#6FB07F', border: 'black' }, font: { color: 'black' } },

        },
        physics: false,
        interaction: {
            navigationButtons: true,
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true
        },
        height: "900px"
    }

    var data = {nodes: nodes, edges: edges}
  return (
    <div className='container'>
        <Graph
            graph = {data}
            options={options}
        />
    </div>
  )
}
