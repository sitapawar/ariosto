// These variables will be injected into a page that will use them.
/* eslint no-unused-vars: "off" */
// Const won't work here, only var.
/* eslint no-var: "off" */

export var nodes = [
    {
      id: 1,
      label: "Bradamante",
      title: "Christian Lady night",
      value: 26,
      group: 1,
    },
    {
      id: 2,
      label: "Ruggiero",
      title: "Bradamante's husband",
      value: 24,
      group: 2,
    },
    {
      id: 3,
      label: "Orlando",
      title: "Looses his mind",
      value: 26,
      group: 1,
    },
    {
      id: 4,
      label: "Angelica",
      title: "Too hot to handle",
      value: 26,
      group: 3,
    },
    {
      id: 5,
      label: "Rinaldo",
      title: "Bradamante's brother",
      value: 24,
      group: 1,
    },
    {
      id: 6,
      label: "Medoro",
      title: "bain of orlando's existance",
      value: 20,
      group: 2,
    },
    {
      id: 7,
      label: "Pinabello",
      title: "bitch",
      value: 17,
      group: 1,
    },
  ];
  // create an array with edges
export var edges = [
  //Bradamante  1
    //Ruggiero 2
    { from: 1, to: 2, label:"marriage", arrows: { to: true, from: true }},
    //rinaldo 5
    { from: 1, to: 5, label:"siblings", arrows: { to: true, from: true }},
    //Pinabello 7
    { from: 1, to: 7, label:"murder" ,  smooth: { type: 'curvedCW', roundness: 0.2 }},
  // Ruggiero 2
    { from: 2, to: 4, label:"lust" },
  //Orlando 3
    { from: 3, to: 4, label:"love" },
  //Rinaldo 5
    { from: 5, to: 4, label:"love" ,  smooth: { type: 'curvedCW', roundness: 0.2 }},
  //Angelica' 4
    { from: 4, to: 5, label:"hate",  smooth: { type: 'curvedCW', roundness: 0.2 }},
    //medoro 6
    { from: 4, to: 6, label:"marriage", arrows: { to: true, from: true }},
  //Pinabello
    { from: 7, to: 1, label:"attempted murder" ,  smooth: { type: 'curvedCW', roundness: 0.2 }},

  ];