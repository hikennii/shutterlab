const cameras = [
    {
      name: "Sony ZV-E10",
      use: ["Vlog"],
      iso: 32000,
      mp: 24.2,
      frame: "APS-C",
      manufacturer: "Sony",
      features: ["Log", "4K"]
    },
    {
      name: "Canon EOS R50",
      use: ["Photo"],
      iso: 32000,
      mp: 24.2,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["4K"]
    },
    {
      name: "Sony a6400",
      use: ["Photo","Video"],
      iso: 32000,
      mp: 24.2,
      frame: "APS-C",
      manufacturer: "Sony",
      features: ["Log", "4K"]
    },
    {
      name: "Sony A7II",
      use: ["Photo"],
      iso: 25600,
      mp: 24.3,
      frame: "Full Frame",
      manufacturer: "Sony",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS R100",
      use: ["Photo"],
      iso: 12800,
      mp: 24.1,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["4K"]
    },
    {
      name: "Fujifilm X-T3",
      use: ["Photo", "Video"],
      iso: 12800,
      mp: 26.1,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["Film Emulation", "4K", "Log"]
    },
    {
      name: "Fujifilm X-T2",
      use: ["Photo", "Video"],
      iso: 12800,
      mp: 24.3,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["Film Emulation", "4K", "Log"]
    },
    {
      name: "Sony A7C",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 24.2,
      frame: "Full Frame",
      manufacturer: "Sony",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Sony A7C II",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 33,
      frame: "Full Frame",
      manufacturer: "Sony",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Sony A6600",
      use: ["Photo", "Video"],
      iso: 32000,
      mp: 24.2,
      frame: "APS-C",
      manufacturer: "Sony",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Sony ZV-1",
      use: ["Vlog"],
      iso: 12800,
      mp: 20.1,
      frame: "1 Inch",
      manufacturer: "Sony",
      features: ["4K"]
    },
    {
      name: "Sony ZV-1 II",
      use: ["Vlog"],
      iso: 12800,
      mp: 20.1,
      frame: "1 Inch",
      manufacturer: "Sony",
      features: ["4K"]
    },
    {
      name: "Sony FX3",
      use: ["Video"],
      iso: 102400,
      mp: 12.1,
      frame: "Full Frame",
      manufacturer: "Sony",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS R7",
      use: ["Photo", "Video"],
      iso: 32000,
      mp: 32.5,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS R10",
      use: ["Photo", "Video"],
      iso: 32000,
      mp: 24.2,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["4K"]
    },
    {
      name: "Canon EOS R5",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 45,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS R6 Mark II",
      use: ["Photo", "Video"],
      iso: 102400,
      mp: 24.2,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS M50 Mark II",
      use: ["Photo", "Video"],
      iso: 25600,
      mp: 24.1,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["4K"]
    },
    {
      name: "Fujifilm X100V",
      use: ["Photo"],
      iso: 12800,
      mp: 26.1,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["Film Emulation", "4K"]
    },
    {
      name: "Fujifilm X100VI",
      use: ["Photo"],
      iso: 12800,
      mp: 40.2,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["Film Emulation", "IBIS", "4K"]
    },
    {
      name: "Fujifilm X-H2",
      use: ["Photo", "Video"],
      iso: 12800,
      mp: 40.2,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["IBIS", "Film Emulation", "4K"]
    },
    {
      name: "Fujifilm X-H2S",
      use: ["Photo", "Video"],
      iso: 12800,
      mp: 26.1,
      frame: "APS-C",
      manufacturer: "Fujifilm",
      features: ["IBIS", "Film Emulation", "4K", "Log"]
    },

    {
      name: "Nikon Z30",
      use: ["Vlog"],
      iso: 51200,
      mp: 20.9,
      frame: "APS-C",
      manufacturer: "Nikon",
      features: ["4K"]
    },
    {
      name: "Nikon Z50",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 20.9,
      frame: "APS-C",
      manufacturer: "Nikon",
      features: ["4K"]
    },
    {
      name: "Nikon Z7 II",
      use: ["Photo"],
      iso: 25600,
      mp: 45.7,
      frame: "Full Frame",
      manufacturer: "Nikon",
      features: ["IBIS", "4K"]
    },
    {
      name: "Nikon Z8",
      use: ["Photo", "Video"],
      iso: 25600,
      mp: 45.7,
      frame: "Full Frame",
      manufacturer: "Nikon",
      features: ["IBIS", "4K", "Log"]
    },

    {
      name: "Panasonic Lumix S5",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 24.2,
      frame: "Full Frame",
      manufacturer: "Panasonic",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Panasonic Lumix S5 II",
      use: ["Photo", "Video"],
      iso: 51200,
      mp: 24.2,
      frame: "Full Frame",
      manufacturer: "Panasonic",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Panasonic G85",
      use: ["Photo", "Video"],
      iso: 25600,
      mp: 16,
      frame: "Micro Four Thirds",
      manufacturer: "Panasonic",
      features: ["IBIS", "4K"]
    },
    {
      name: "Panasonic G9",
      use: ["Photo", "Video"],
      iso: 25600,
      mp: 20.3,
      frame: "Micro Four Thirds",
      manufacturer: "Panasonic",
      features: ["IBIS", "4K"]
    },
    {
      name: "Canon EOS R8",
      use: ["Photo", "Video"],
      iso: 102400,
      mp: 24.2,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["4K", "Log"]
    },
    {
      name: "Canon EOS RP",
      use: ["Photo"],
      iso: 40000,
      mp: 26.2,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["4K"]
    },
    {
      name: "Canon EOS R",
      use: ["Photo", "Video"],
      iso: 40000,
      mp: 30.3,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["4K", "Log"]
    },
    {
      name: "Canon EOS R3",
      use: ["Photo", "Video"],
      iso: 102400,
      mp: 24.1,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["IBIS", "4K", "Log"]
    },
    {
      name: "Canon EOS R5 C",
      use: ["Video"],
      iso: 102400,
      mp: 45,
      frame: "Full Frame",
      manufacturer: "Canon",
      features: ["8K", "Log"]
    },
    {
      name: "Canon EOS R7",
      use: ["Photo", "Video"],
      iso: 32000,
      mp: 32.5,
      frame: "APS-C",
      manufacturer: "Canon",
      features: ["IBIS", "4K", "Log"]
    }
      ];

export default cameras;