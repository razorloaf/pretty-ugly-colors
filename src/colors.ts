export interface Shades {
    [key: string]: string;
  }
  
  export interface Color {
    [key: string]: string | Shades;
    a: Shades;
    oklch: Shades;
    p3a: Shades;
  }

  export const neutral: Color = {
    "0": "#FFFFFF",
    "1": "#080808",
    "100": "#FAFAFA",
    "200": "#F3F2F2",
    "300": "#E6E5E5",
    "400": "#D5D3D3",
    "500": "#C3C1C1",
    "600": "#535150",
    "700": "#444241",
    "800": "#343332",
    "900": "#1F1E1E",
    "1000": "#151414",
    a: {
      "0": "#FFFFFFFF",
      "100": "#00000005",
      "200": "#1400000D",
      "300": "#0A00001A",
      "400": "#0C00002C",
      "500": "#0800003E",
      "600": "#040100AF",
      "700": "#040100BE",
      "800": "#020100CD",
      "900": "#010000E1",
      "1000": "#010000EB",
      "1": "#000000F7",
    },
    oklch: {
      "0": "oklch(100.0% 0.0001 263.4)",
      "100": "oklch(98.5% 0.0001 263.3)",
      "200": "oklch(96.2% 0.0010 13.0)",
      "300": "oklch(92.3% 0.0011 13.2)",
      "400": "oklch(86.8% 0.0022 15.4)",
      "500": "oklch(81.3% 0.0022 15.5)",
      "600": "oklch(43.6% 0.0031 48.3)",
      "700": "oklch(38.1% 0.0032 48.4)",
      "800": "oklch(32.2% 0.0022 67.6)",
      "900": "oklch(23.6% 0.0015 16.6)",
      "1000": "oklch(19.2% 0.0016 16.8)",
      "1": "oklch(13.4% 0.0000 298.1)",
    },
    p3a: {
      "0": "color(display-p3 1 0.9263 0 / 0.000)",
      "100": "color(display-p3 0.0076 0.0044 0 / 0.020)",
      "200": "color(display-p3 0.0648 0.0029 0 / 0.051)",
      "300": "color(display-p3 0.0323 0.0014 0 / 0.102)",
      "400": "color(display-p3 0.0374 0.0012 0 / 0.172)",
      "500": "color(display-p3 0.0265 0.0008 0 / 0.243)",
      "600": "color(display-p3 0.0145 0.0054 0 / 0.686)",
      "700": "color(display-p3 0.0134 0.005 0 / 0.745)",
      "800": "color(display-p3 0.0084 0.0045 0 / 0.804)",
      "900": "color(display-p3 0.0036 0.0001 0 / 0.882)",
      "1000": "color(display-p3 0.0035 0.0001 0 / 0.922)",
      "1": "color(display-p3 0 0 0 / 0.969)",
    },
  };
  
  export const purple: Color = {
    "100": "#F6F0FE",
    "200": "#E9DDFD",
    "300": "#DCCAFC",
    "400": "#C9ADFB",
    "500": "#B38BF9",
    "600": "#511FA8",
    "700": "#3E1881",
    "800": "#2E115F",
    "900": "#250E4E",
    "1000": "#15082B",
    a: {
      "100": "#6600EE0F",
      "200": "#5A00F022",
      "300": "#5700F135",
      "400": "#5700F352",
      "500": "#5800F274",
      "600": "#39009CE0",
      "700": "#2A0074E7",
      "800": "#1F0054EE",
      "900": "#180044F1",
      "1000": "#0D0024F7",
    },
    oklch: {
      "100": "oklch(96.4% 0.0197 305.1)",
      "200": "oklch(91.7% 0.0449 302.5)",
      "300": "oklch(87.0% 0.0708 301.3)",
      "400": "oklch(80.0% 0.1120 300.4)",
      "500": "oklch(71.9% 0.1593 299.1)",
      "600": "oklch(40.6% 0.1973 291.4)",
      "700": "oklch(33.9% 0.1603 291.9)",
      "800": "oklch(27.8% 0.1269 293.1)",
      "900": "oklch(24.5% 0.1086 293.0)",
      "1000": "oklch(17.9% 0.0675 296.1)",
    },
    p3a: {
      "100": "color(display-p3 0.3218 0 0.8555 / 0.058)",
      "200": "color(display-p3 0.2838 0 0.8663 / 0.132)",
      "300": "color(display-p3 0.2736 0 0.8717 / 0.205)",
      "400": "color(display-p3 0.2765 0 0.8842 / 0.318)",
      "500": "color(display-p3 0.2814 0 0.8872 / 0.449)",
      "600": "color(display-p3 0.185 0 0.577 / 0.867)",
      "700": "color(display-p3 0.1358 0 0.4273 / 0.897)",
      "800": "color(display-p3 0.1003 0 0.307 / 0.927)",
      "900": "color(display-p3 0.0784 0 0.2485 / 0.940)",
      "1000": "color(display-p3 0.0431 0 0.1322 / 0.966)",
    },
  };
  
  export const blue: Color = {
    "100": "#F2F5FD",
    "200": "#E0E7FA",
    "300": "#C6D2F6",
    "400": "#ACBDF1",
    "500": "#89A1EC",
    "600": "#1C40AB",
    "700": "#153184",
    "800": "#102665",
    "900": "#0C1C4B",
    "1000": "#081230",
    a: {
      "100": "#003BD80D",
      "200": "#003AD61F",
      "300": "#0036D739",
      "400": "#0034D453",
      "500": "#0034D676",
      "600": "#0028A1E3",
      "700": "#001F79EA",
      "800": "#00175BEF",
      "900": "#001142F3",
      "1000": "#000A29F7",
    },
    oklch: {
      "100": "oklch(97.0% 0.0112 269.5)",
      "200": "oklch(92.8% 0.0269 269.6)",
      "300": "oklch(86.6% 0.0518 270.8)",
      "400": "oklch(80.4% 0.0763 270.5)",
      "500": "oklch(72.1% 0.1131 269.9)",
      "600": "oklch(42.0% 0.1761 265.1)",
      "700": "oklch(35.1% 0.1434 265.2)",
      "800": "oklch(29.6% 0.1146 265.2)",
      "900": "oklch(24.7% 0.0900 265.8)",
      "1000": "oklch(19.4% 0.0617 266.6)",
    },
    p3a: {
      "100": "color(display-p3 0 0.1887 0.7771 / 0.049)",
      "200": "color(display-p3 0 0.1848 0.7728 / 0.117)",
      "300": "color(display-p3 0 0.1716 0.7787 / 0.215)",
      "400": "color(display-p3 0 0.1664 0.771 / 0.313)",
      "500": "color(display-p3 0 0.1643 0.7821 / 0.445)",
      "600": "color(display-p3 0 0.1193 0.5853 / 0.854)",
      "700": "color(display-p3 0 0.0895 0.4363 / 0.890)",
      "800": "color(display-p3 0 0.0688 0.3243 / 0.916)",
      "900": "color(display-p3 0 0.0495 0.2354 / 0.938)",
      "1000": "color(display-p3 0 0.0311 0.1468 / 0.960)",
    },
  };
  
  export const green: Color = {
    "100": "#F6FCF2",
    "200": "#EAF9E1",
    "300": "#D9F4C8",
    "400": "#C7EFAF",
    "500": "#A7E580",
    "600": "#326114",
    "700": "#295010",
    "800": "#203F0D",
    "900": "#182F0A",
    "1000": "#0D1905",
    a: {
      "100": "#4EC4000D",
      "200": "#4DCC001E",
      "300": "#4FCC0037",
      "400": "#4DCC0050",
      "500": "#4ECB007F",
      "600": "#215400EB",
      "700": "#1B4400EF",
      "800": "#143500F2",
      "900": "#0F2700F5",
      "1000": "#081400FA",
    },
    oklch: {
      "100": "oklch(98.4% 0.0145 132.7)",
      "200": "oklch(96.5% 0.0353 133.6)",
      "300": "oklch(93.6% 0.0647 133.4)",
      "400": "oklch(90.8% 0.0944 134.1)",
      "500": "oklch(85.7% 0.1461 134.4)",
      "600": "oklch(44.3% 0.1178 136.1)",
      "700": "oklch(38.8% 0.1018 135.9)",
      "800": "oklch(33.2% 0.0844 136.0)",
      "900": "oklch(27.6% 0.0667 135.7)",
      "1000": "oklch(19.6% 0.0418 133.8)",
    },
    p3a: {
      "100": "color(display-p3 0.3525 0.7381 0 / 0.048)",
      "200": "color(display-p3 0.3492 0.7687 0 / 0.110)",
      "300": "color(display-p3 0.3567 0.7684 0 / 0.200)",
      "400": "color(display-p3 0.3489 0.7675 0 / 0.290)",
      "500": "color(display-p3 0.3521 0.7603 0 / 0.453)",
      "600": "color(display-p3 0.1267 0.2817 0 / 0.869)",
      "700": "color(display-p3 0.1034 0.2286 0 / 0.894)",
      "800": "color(display-p3 0.0788 0.1762 0 / 0.918)",
      "900": "color(display-p3 0.058 0.1291 0 / 0.939)",
      "1000": "color(display-p3 0.0345 0.0709 0 / 0.972)",
    },
  };
  
  export const yellow: Color = {
    "100": "#FBF9E4",
    "200": "#F9F5D2",
    "300": "#F5EFB7",
    "400": "#F0E793",
    "500": "#E8DA59",
    "600": "#5E560D",
    "700": "#4C460A",
    "800": "#3A3508",
    "900": "#2D2906",
    "1000": "#161503",
    a: {
      "100": "#D9C6001B",
      "200": "#DDC6002D",
      "300": "#DCC60048",
      "400": "#DCC6006C",
      "500": "#DCC600A6",
      "600": "#554D00F2",
      "700": "#453E00F5",
      "800": "#342E00F7",
      "900": "#282400F9",
      "1000": "#131200FC",
    },
    oklch: {
      "100": "oklch(97.8% 0.0275 102.5)",
      "200": "oklch(96.4% 0.0457 101.9)",
      "300": "oklch(94.3% 0.0722 102.6)",
      "400": "oklch(91.7% 0.1053 103.0)",
      "500": "oklch(87.6% 0.1483 103.1)",
      "600": "oklch(44.7% 0.0881 102.7)",
      "700": "oklch(38.8% 0.0760 103.3)",
      "800": "oklch(32.5% 0.0616 102.8)",
      "900": "oklch(27.7% 0.0515 102.8)",
      "1000": "oklch(19.1% 0.0339 106.5)",
    },
    p3a: {
      "100": "color(display-p3 0.8264 0.7626 0 / 0.098)",
      "200": "color(display-p3 0.8388 0.7622 0 / 0.163)",
      "300": "color(display-p3 0.8327 0.7605 0 / 0.259)",
      "400": "color(display-p3 0.8307 0.7576 0 / 0.383)",
      "500": "color(display-p3 0.8251 0.7484 0 / 0.569)",
      "600": "color(display-p3 0.2815 0.2533 0 / 0.886)",
      "700": "color(display-p3 0.2249 0.2043 0 / 0.911)",
      "800": "color(display-p3 0.1695 0.1528 0 / 0.934)",
      "900": "color(display-p3 0.1326 0.1195 0 / 0.953)",
      "1000": "color(display-p3 0.0674 0.0642 0 / 0.981)",
    },
  };
  
  export const orange: Color = {
    "100": "#FEF5F0",
    "200": "#FEECE2",
    "300": "#FCD3BA",
    "400": "#FAB68E",
    "500": "#F89054",
    "600": "#893606",
    "700": "#712C05",
    "800": "#582304",
    "900": "#451B03",
    "1000": "#311302",
    a: {
      "100": "#EE55000F",
      "200": "#F658001D",
      "300": "#F45C0045",
      "400": "#F45A0071",
      "500": "#F55900AB",
      "600": "#863100F9",
      "700": "#6E2800FA",
      "800": "#551F00FB",
      "900": "#431800FC",
      "1000": "#2F1100FD",
    },
    oklch: {
      "100": "oklch(97.6% 0.0117 51.1)",
      "200": "oklch(95.5% 0.0237 51.1)",
      "300": "oklch(89.5% 0.0570 53.1)",
      "400": "oklch(83.0% 0.0956 51.4)",
      "500": "oklch(75.3% 0.1465 49.1)",
      "600": "oklch(44.3% 0.1250 43.9)",
      "700": "oklch(38.7% 0.1079 44.2)",
      "800": "oklch(32.9% 0.0879 45.9)",
      "900": "oklch(28.1% 0.0732 46.9)",
      "1000": "oklch(22.9% 0.0566 49.5)",
    },
    p3a: {
      "100": "color(display-p3 0.8228 0.3271 0 / 0.057)",
      "200": "color(display-p3 0.8539 0.3382 0 / 0.109)",
      "300": "color(display-p3 0.8537 0.3534 0 / 0.258)",
      "400": "color(display-p3 0.8575 0.3435 0 / 0.419)",
      "500": "color(display-p3 0.8671 0.3338 0 / 0.624)",
      "600": "color(display-p3 0.4482 0.1557 0 / 0.910)",
      "700": "color(display-p3 0.3658 0.1278 0 / 0.930)",
      "800": "color(display-p3 0.2832 0.1042 0 / 0.949)",
      "900": "color(display-p3 0.2236 0.0841 0 / 0.966)",
      "1000": "color(display-p3 0.1603 0.0622 0 / 0.980)",
    },
  };
  
  export const red: Color = {
    "100": "#FFF0F0",
    "200": "#FFDBDB",
    "300": "#FFC7C7",
    "400": "#FFA3A3",
    "500": "#FF7A7A",
    "600": "#A50D0D",
    "700": "#840B0B",
    "800": "#630808",
    "900": "#4B0606",
    "1000": "#2A0303",
    a: {
      "100": "#FF00000F",
      "200": "#FF000024",
      "300": "#FF000038",
      "400": "#FF00005C",
      "500": "#FF000085",
      "600": "#A00000F2",
      "700": "#7E0000F4",
      "800": "#5E0000F7",
      "900": "#470000F9",
      "1000": "#270000FC",
    },
    oklch: {
      "100": "oklch(96.7% 0.0162 17.2)",
      "200": "oklch(92.1% 0.0401 17.8)",
      "300": "oklch(87.9% 0.0640 18.4)",
      "400": "oklch(80.7% 0.1096 19.7)",
      "500": "oklch(73.5% 0.1626 21.8)",
      "600": "oklch(45.8% 0.1809 28.4)",
      "700": "oklch(39.1% 0.1522 28.1)",
      "800": "oklch(32.0% 0.1225 27.8)",
      "900": "oklch(26.6% 0.0996 27.4)",
      "1000": "oklch(18.6% 0.0665 26.6)",
    },
    p3a: {
      "100": "color(display-p3 0.8263 0.0185 0 / 0.058)",
      "200": "color(display-p3 0.8336 0.0187 0 / 0.139)",
      "300": "color(display-p3 0.8412 0.0197 0 / 0.215)",
      "400": "color(display-p3 0.8549 0.0225 0 / 0.352)",
      "500": "color(display-p3 0.8703 0.0277 0 / 0.506)",
      "600": "color(display-p3 0.5464 0.0367 0 / 0.898)",
      "700": "color(display-p3 0.4276 0.0274 0 / 0.920)",
      "800": "color(display-p3 0.3159 0.0192 0 / 0.944)",
      "900": "color(display-p3 0.2381 0.0137 0 / 0.961)",
      "1000": "color(display-p3 0.1338 0.0047 0 / 0.983)",
    },
  };
  
  export const colors = {
    neutral,
    purple,
    blue,
    green,
    yellow,
    orange,
    red,
  };