import React, { useState } from 'react';
import Graph from 'react-vis-network-graph';

const generateColorPalette = (numColors) => {
    const colors = [
        '#ED5E5E', '#81C0D4', '#1D5A6D', '#1D256D', '#6D1D3F', '#9C80B0'
    ];
    return colors.slice(0, numColors);
};

// Generate groups configuration based on nodes
const generateGroupsConfig = (nodes) => {
    const groups = {};
    const uniqueGroups = Array.from(new Set(nodes.map(node => node.group)));
    const colors = generateColorPalette(uniqueGroups.length);

    uniqueGroups.forEach((group, index) => {
        groups[group] = { 
            color: { background: colors[index], border: colors[index]}, 
            font: { color: 'black' } 
        };
    });

    return groups;
};

// Takes in the uploaded nodes and edges from that file upload
export default function TestGraph({ nodes, edges }) {
    const [networkInstance, setNetworkInstance] = useState(null);

    // Generate groups configuration
    const groupsConfig = generateGroupsConfig(nodes);

    const options = {
        nodes: {
            shape: "dot",
            scaling: {
                min: 10,
                max: 30,
                label: {
                    enabled: true, 
                    min: 12,
                    max: 30,
                    drawThreshold: 1,
                    maxVisible: 30
                }
            },
            font: {
                size: 17,
                face: "Tahoma",
                align: 'center',
                vadjust: 1
            },
            labelHighlightBold: true
        },
        edges: {
            width: 0.15,
            color: { color: 'black', highlight: 'black', hover: 'black' },
            smooth: {
                type: "continuous"
            },
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 1
                }
            },
            font: {
                size: 12,
                align: 'middle',
                vadjust: -10
            },
            scaling: {
                label: true,
                customScalingFunction: function(min, max, total, value) {
                    return Math.pow(value / total, 0.5);
                }
            }
        },
        groups: groupsConfig,
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -30000,
                centralGravity: 0.3,
                springLength: 200,
                springConstant: 0.04,
                avoidOverlap: 1
            },
            stabilization: {
                enabled: true,
                iterations: 1000 // Adjust the number of iterations for stabilization
            }
        },
        interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: true,
            navigationButtons: true,
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true
        },
        height: "900px"
    };

    // Callback for when stabilization is finished
    const events = {
        stabilized: () => {
            if (networkInstance) {
                networkInstance.setOptions({ physics: false }); // Disable physics after stabilization
            }
        }
    };

    return (
        <div className='container'>
            <Graph
                graph={{ nodes, edges }}
                options={options}
                events={events}
                getNetwork={setNetworkInstance} // Store the network instance for later use
            />
        </div>
    );
}



//ANIMATED WOBBLE PHYSICS GRAPH!

// import React from 'react';
// import Graph from 'react-vis-network-graph';

// const generateColorPalette = (numColors) => {
//     const colors = [
//         '#ED5E5E', '#81C0D4', '#1D5A6D', '#1D256D', '#6D1D3F', '#9C80B0'
//     ];
//     return colors.slice(0, numColors);
// };

// // Generate groups configuration based on nodes
// const generateGroupsConfig = (nodes) => {
//     const groups = {};
//     const uniqueGroups = Array.from(new Set(nodes.map(node => node.group)));
//     const colors = generateColorPalette(uniqueGroups.length);

//     uniqueGroups.forEach((group, index) => {
//         groups[group] = { 
//             color: { background: colors[index], border: colors[index]}, 
//             font: { color: 'black' } 
//         };
//     });

//     return groups;
// };

// //Takes in the uploaded nodes and edges from that file upload
// export default function TestGraph({nodes, edges}) {

//     // Generate groups configuration
//     const groupsConfig = generateGroupsConfig(nodes);

//     var options = {
//         nodes: {
//             shape: "dot",
//             scaling: {
//                 min: 10,
//                 max: 30,
//                 label: {
//                     enabled: true, // Ensure labels are enabled
//                     min: 12,
//                     max: 30,
//                     drawThreshold: 1, // Set to a low value to ensure visibility
//                     maxVisible: 30
//                 }
//             },
//             font: {
//                 size: 17, // Ensures node labels are visible
//                 face: "Tahoma",
//                 align: 'center', // Adjust alignment as needed
//                 vadjust: 1 // Adjust vertical alignment as needed
//             },
//             labelHighlightBold: true // Ensures labels remain visible and bold on hover
//         },
//         edges: {
//             width: 0.15,
//             color: { color: 'black', highlight: 'black', hover: 'black' }, // Set edge color to black
//             smooth: {
//                 type: "continuous"
//             },
//             arrows: {
//                 to: {
//                     enabled: true,
//                     scaleFactor: 1 // Adjust this to control the initial size of arrows
//                 }
//             },
//             font: {
//                 size: 12,
//                 align: 'middle', // Ensure the label is centered on the edge
//                 vadjust: -10 // Adjust vertical alignment as needed
//             },
//             scaling: {
//                 label: true, // Allow labels to scale with the zoom level
//                 customScalingFunction: function(min, max, total, value) {
//                     // Scale the arrow size based on zoom level
//                     return Math.pow(value / total, 0.5);
//                 }
//             }
//         },
//         groups: groupsConfig,
//         physics: {
//             enabled: true,
//             barnesHut: {
//                 gravitationalConstant: -30000, // Increase repulsion between nodes
//                 centralGravity: 0.3,
//                 springLength: 200, // Increase distance between nodes
//                 springConstant: 0.04,
//                 avoidOverlap: 1 // Ensures nodes do not overlap
//             },
//             stabilization: false // Disable full stabilization to allow node maneuverability
//         },
//         interaction: {
//             dragNodes: true, // Enable dragging of nodes
//             dragView: true,  // Allow panning of the view
//             zoomView: true,  // Allow zooming in and out
//             navigationButtons: true, // Enable navigation buttons for better control
//             tooltipDelay: 200,
//             hideEdgesOnDrag: true,
//             hideEdgesOnZoom: true
//         },
//         height: "900px"
//     }

//     var data = {nodes: nodes, edges: edges}
//     return (
//         <div className='container'>
//             <Graph
//                 graph={data}
//                 options={options}
//             />
//         </div>
//     )
// }
