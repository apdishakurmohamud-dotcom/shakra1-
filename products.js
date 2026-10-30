// Technical & Electronic - Macluumaadka Alaabta (Products Data)
const productsData = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    category: "laptops",
    categoryName: "Laptops & Kumbuyuutar",
    price: 2499.00,
    oldPrice: 2799.00,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Cusub",
    badgeType: "new",
    description: "MacBook Pro awood badan leh oo wata chip-ka M3 Max, 36GB Unified Memory, iyo 1TB SSD xawaare sare leh. Ku habboon barnaamijyada culus iyo naqshadeynta.",
    specs: {
      "Processor": "Apple M3 Max 14-Core",
      "RAM": "36GB Unified Memory",
      "Storage": "1TB SSD NVMe",
      "Shaashadda": "16.2\" Liquid Retina XDR 120Hz",
      "Batteriga": "Ilaa 22 Saacadood"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 5G",
    category: "smartphones",
    categoryName: "Taleefannada & Tablets",
    price: 1199.00,
    oldPrice: 1350.00,
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    badge: "Qiimo Dhimis",
    badgeType: "sale",
    description: "Taleefanka casriga ah ee Samsung oo leh Galaxy AI, 200MP Camera xirfadle ah, qalin S-Pen ah, iyo processor-ka Snapdragon 8 Gen 3.",
    specs: {
      "Shaashadda": "6.8\" Dynamic AMOLED 2X 120Hz",
      "Kamerada": "200MP + 50MP + 12MP + 10MP",
      "RAM & Kayd": "12GB RAM / 512GB Storage",
      "Batteriga": "5000 mAh (45W Fast Charge)",
      "System-ka": "Android 14, One UI 6.1"
    }
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "audio",
    categoryName: "Qalabka Dhawaqa",
    price: 349.00,
    oldPrice: 399.00,
    rating: 4.9,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Ugu Caansan",
    badgeType: "hot",
    description: "Headphones-ka ugu fiican dhinaca jareynta buuqa (Industry-Leading Active Noise Cancelling) oo leh 30 saac oo batteri ah iyo dhawaq cad.",
    specs: {
      "Noise Cancellation": "Auto NC Optimizer (2 processors)",
      "Batteriga": "30 Saacadood (Qiimo degdeg ah)",
      "Xiriirinta": "Bluetooth 5.2, Multipoint",
      "Miisaanka": "250g aad u fudud"
    }
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G16 Gaming Laptop",
    category: "laptops",
    categoryName: "Laptops & Kumbuyuutar",
    price: 1899.00,
    oldPrice: 2099.00,
    rating: 4.7,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    badge: "Gaming",
    badgeType: "hot",
    description: "Laptop loogu talagalay cayaaraha iyo graphics-ka heerka sare ah, oo wata Intel Core Ultra 9 iyo NVIDIA RTX 4080.",
    specs: {
      "Processor": "Intel Core Ultra 9 185H",
      "Graphics": "NVIDIA GeForce RTX 4080 12GB",
      "Shaashadda": "16\" OLED 2.5K 240Hz",
      "RAM/Kayd": "32GB LPDDR5X / 1TB SSD"
    }
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max 256GB Titanium",
    category: "smartphones",
    categoryName: "Taleefannada & Tablets",
    price: 1249.00,
    oldPrice: 1399.00,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "Ugu Iibinta Badan",
    badgeType: "hot",
    description: "Jir titanium ah oo aad u adag uguna fudud, chip-ka A17 Pro ee cajiibka ah, iyo Action button wax kasta qaban kara.",
    specs: {
      "Chipset": "A17 Pro 3nm Bionic",
      "Shaashadda": "6.7\" Super Retina XDR OLED ProMotion",
      "Kamerada": "48MP Main oo leh 5x Telephoto optical",
      "Connector": "USB-C xawaare 10Gbps ah"
    }
  },
  {
    id: 6,
    name: "DJI Mini 4 Pro Drone Fly More Combo",
    category: "gadgets",
    categoryName: "Qalabka Casriga ah",
    price: 999.00,
    oldPrice: 1120.00,
    rating: 4.8,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    badge: "Cusub",
    badgeType: "new",
    description: "Diyaarad yar oo tayo sare leh (Drone) duubeysa 4K/60fps HDR video, leh dareemayaal ka ilaaliya shilalka dhan walba (Omnidirectional).",
    specs: {
      "Miisaanka": "< 249 garaam (Uma baahna liisan caalami ah)",
      "Kamerada": "4K/60fps HDR & True Vertical Shooting",
      "Masaafada Duulimaadka": "Ilaa 20 KM (O4 Video)",
      "Waqtiga Batteriga": "34 Daqiiqo x 3 Battery"
    }
  },
  {
    id: 7,
    name: "Arduino Complete Ultimate Starter Kit",
    category: "electronics",
    categoryName: "Qeybaha Elektaroonigga",
    price: 65.00,
    oldPrice: 85.00,
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80",
    badge: "Tartan & Barasho",
    badgeType: "sale",
    description: "Xirmo dhameystiran oo loogu talagalay barashada iyo samaynta mashaariicda Robotikada iyo IoT. Wuxuu ka kooban yahay in ka badan 200 qaybood.",
    specs: {
      "Board-ka": "Arduino Uno R3 Compatible Board",
      "Qeybaha": "Sensors, LCD 1602, Stepper Motor, Servo, Relay, LEDs",
      "Casharro": "Buug tababar & 30+ mashruuc code ah",
      "Xiriirinta": "USB Cable & Breadboard weyn"
    }
  },
  {
    id: 8,
    name: "Raspberry Pi 5 Model B (8GB RAM)",
    category: "electronics",
    categoryName: "Qeybaha Elektaroonigga",
    price: 115.00,
    oldPrice: 130.00,
    rating: 4.9,
    reviews: 182,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
    badge: "Awood Sare",
    badgeType: "new",
    description: "Kumbuyuutar yar oo awood badan leh oo wata 64-bit quad-core Arm Cortex-A76 processor, 2-3 jeer ka dheereeya noocyadii hore.",
    specs: {
      "Processor": "Broadcom BCM2712 2.4GHz Quad-Core",
      "RAM": "8GB LPDDR4X SDRAM",
      "Video": "Laba shaashadood oo 4K60p ah (Micro HDMI)",
      "Wireless": "Wi-Fi Dual-band 802.11ac & Bluetooth 5.0"
    }
  },
  {
    id: 9,
    name: "Digital Intelligent Multimeter Smart Pro",
    category: "electronics",
    categoryName: "Qeybaha Elektaroonigga",
    price: 45.00,
    oldPrice: 59.00,
    rating: 4.7,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    badge: "Qalabka Farsamada",
    badgeType: "sale",
    description: "Mitirka korontada casriga ah oo si toos ah u garta Volts, Amps, Resistance iyo Continuty adigoon badalin channels.",
    specs: {
      "Shaashadda": "Color LCD Backlight 6000 Counts",
      "Cabirka": "AC/DC Voltage, Resistance, Capacitance, Frequency",
      "Nabadgelyo": "CAT III 600V Overload Protection",
      "Tilmaame": "Non-contact Voltage (NCV) Detector"
    }
  },
  {
    id: 10,
    name: "Apple AirPods Pro 2nd Gen (USB-C)",
    category: "audio",
    categoryName: "Qalabka Dhawaqa",
    price: 219.00,
    oldPrice: 249.00,
    rating: 4.8,
    reviews: 230,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    badgeType: "hot",
    description: "Dhagaha wireless-ka Apple oo leh chip-ka H2, Adaptive Audio, iyo xeedhada USB-C ee cusub oo biyaha u adkeysata.",
    specs: {
      "Audio": "Spatial Audio oo leh madax raadraac firfircoon",
      "Dheg-xirid": "2x ka awood badan Noise Cancellation-kii hore",
      "Bateriga": "6 saac qof walba (30 saac oo kiiska la socota)",
      "Case": "MagSafe Case (USB-C) oo leh speaker iyo loop"
    }
  },
  {
    id: 11,
    name: "Samsung 49\" Odyssey OLED G9 Gaming Monitor",
    category: "laptops",
    categoryName: "Laptops & Kumbuyuutar",
    price: 1299.00,
    oldPrice: 1599.00,
    rating: 4.9,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    badge: "Qiimo Dhimis",
    badgeType: "sale",
    description: "Shaashad aad u ballaaran oo qaloocan (Curved OLED), 240Hz refresh rate iyo 0.03ms response time, cajiib u ah shaqada iyo cayaaraha.",
    specs: {
      "Xajmiga": "49 Inch Curved 1800R",
      "Resolution": "Dual QHD (5120 x 1440)",
      "Xawaaraha": "240Hz Refresh Rate, 0.03ms Response",
      "Midabka": "DisplayHDR True Black 400"
    }
  },
  {
    id: 12,
    name: "Anker 737 Power Bank (PowerCore 24K)",
    category: "accessories",
    categoryName: "Agabka & Accessories",
    price: 99.00,
    oldPrice: 139.00,
    rating: 4.8,
    reviews: 177,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80",
    badge: "Awood Badan",
    badgeType: "hot",
    description: "Xeedhada moobiilka iyo laptop-ka ee 24,000mAh oo leh awood buuxda oo 140W ah labada dhinacba, iyo shaashad smart ah oo muujisa awoodda.",
    specs: {
      "Awoodda (Capacity)": "24,000 mAh High-density Battery",
      "Xawaaraha Output": "140W Max Fast Charge (Laptops & Phones)",
      "Shaashadda": "Smart Digital Display wata xogta waqtiga dhabta ah",
      "Ports": "2x USB-C + 1x USB-A"
    }
  },
  {
    id: 13,
    name: "Soldering Station 80W LCD Display Kit",
    category: "electronics",
    categoryName: "Qeybaha Elektaroonigga",
    price: 52.00,
    oldPrice: 68.00,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    badge: "Alxanka",
    badgeType: "sale",
    description: "Qalabka alxanka elektaroonigga (Soldering Iron Station) oo heerkulkiisu si sax ah u maamulmo (180°C - 480°C) lehna qalab dhowr ah oo dheeraad ah.",
    specs: {
      "Awoodda": "80W Awood kuleyl degdeg ah",
      "Heerkulka": "180°C ilaa 480°C oo digital ah",
      "Kala nooca": "Waxaa la socda 5 nooc oo madax alxan ah (tips)",
      "Nabadgelyada": "ESD Safe & Auto Sleep mode"
    }
  },
  {
    id: 14,
    name: "Logitech MX Master 3S Wireless Mouse",
    category: "accessories",
    categoryName: "Agabka & Accessories",
    price: 89.00,
    oldPrice: 109.00,
    rating: 4.9,
    reviews: 240,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    badge: "Xafiiska & Naqshadeynta",
    badgeType: "hot",
    description: "Jiirka (Mouse) ugu raaxada badan adduunka ee loogu talagalay barnaamijyada iyo xafiiska, oo leh MagSpeed electromagnetic wheel aamusan.",
    specs: {
      "Sensor": "8,000 DPI Darkfield Glass Tracking",
      "Dhawaqa": "Quiet Clicks (90% buuq yareyn)",
      "Xiriirinta": "Bluetooth & Logi Bolt Receiver",
      "Batteriga": "Ilaa 70 Maalmood hal xeedhayn"
    }
  },
  {
    id: 15,
    name: "Apple Watch Ultra 2 (GPS + Cellular)",
    category: "gadgets",
    categoryName: "Qalabka Casriga ah",
    price: 749.00,
    oldPrice: 799.00,
    rating: 4.9,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    badge: "Titanium",
    badgeType: "new",
    description: "Saacad adag oo titanium ah, loogu talagalay ciyaaraha fudud, dabaasha gunta dheer, iyo socodka buuraha leh shaashad 3000 nits ah.",
    specs: {
      "Jirka": "49mm Aerospace-grade Titanium Case",
      "Shaashadda": "Always-On Retina display ilaa 3000 nits",
      "Biyaha": "100m Water resistant & Dive computer",
      "Batteriga": "Ilaa 36 saacadood (72 saac low power)"
    }
  },
  {
    id: 16,
    name: "SanDisk 2TB Extreme Portable SSD",
    category: "accessories",
    categoryName: "Agabka & Accessories",
    price: 159.00,
    oldPrice: 189.00,
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    badge: "Xawaare Sare",
    badgeType: "sale",
    description: "Hard drive SSD ah oo aad u fudud, xawaarihiisu gaarayo 1050MB/s, u adkeysanaya biyaha, boodhka iyo dhicidda (IP55).",
    specs: {
      "Xajmiga": "2 Terabyte (2000GB)",
      "Xawaaraha Akhriska": "Ilaa 1050 MB/s",
      "Difaaca": "IP55 Water & Dust Resistant, 2m Drop protection",
      "Xiriirka": "USB 3.2 Gen 2 (Type-C & Type-A adapter)"
    }
  }
];

// Qaybaha Alaabta (Categories List)
const categoriesData = [
  { id: "all", name: "Dhammaan Alaabta", icon: "fa-th-large" },
  { id: "laptops", name: "Laptops & Kumbuyuutar", icon: "fa-laptop" },
  { id: "smartphones", name: "Taleefanno & Tablets", icon: "fa-mobile-alt" },
  { id: "audio", name: "Qalabka Dhawaqa & Sound", icon: "fa-headphones" },
  { id: "electronics", name: "Qeybaha Elektaroonigga & Tools", icon: "fa-microchip" },
  { id: "gadgets", name: "Qalabka Casriga ah (Gadgets)", icon: "fa-clock" },
  { id: "accessories", name: "Agabka & Accessories", icon: "fa-plug" }
];
