window.STRI_DATA = {
  // Location being analyzed
  location: {
    name: 'Ambala (Cantt & City)',
    from: 'Ambala City',
    to: 'Ambala Cantt',
    totalOpinions: 248,
    safetyPatterns: 17,
    safetyAspects: 8
  },

  // Overall safety index
  safetyIndex: {
    score: 72,
    maxScore: 100,
    status: 'Moderately Positive',
    statusColor: 'mixed',
    trend: '+8%',
    trendDirection: 'up',
    trendText: 'more positive than previous period',
    disclaimer: 'This index represents reported/perceived safety sentiment, not an objective prediction of crime or physical safety.'
  },

  // Community sentiment breakdown
  sentimentBreakdown: {
    positive: { percentage: 48, count: 119 },
    neutral: { percentage: 27, count: 67 },
    negative: { percentage: 25, count: 62 }
  },

  // Safety aspects - 8 aspects
  aspects: [
    { id: 'lighting', icon: '💡', name: 'Street Lighting', sentiment: 'negative', mentions: 42, score: 35 },
    { id: 'crowd', icon: '👥', name: 'Crowd Density', sentiment: 'positive', mentions: 67, score: 82 },
    { id: 'night', icon: '🌙', name: 'Night Safety', sentiment: 'negative', mentions: 31, score: 38 },
    { id: 'road', icon: '🛣️', name: 'Road Condition', sentiment: 'positive', mentions: 54, score: 79 },
    { id: 'traffic', icon: '🚗', name: 'Traffic', sentiment: 'mixed', mentions: 38, score: 55 },
    { id: 'walkability', icon: '🚶', name: 'Walkability', sentiment: 'mixed', mentions: 29, score: 58 },
    { id: 'crossing', icon: '🚧', name: 'Crossing Safety', sentiment: 'negative', mentions: 24, score: 40 },
    { id: 'activity', icon: '🏪', name: 'Public Activity', sentiment: 'positive', mentions: 46, score: 78 }
  ],

  // Safety index breakdown (how the score is computed)
  indexBreakdown: [
    { factor: 'Positive community sentiment', impact: +18 },
    { factor: 'Street lighting concerns', impact: -8 },
    { factor: 'Night safety concerns', impact: -12 },
    { factor: 'Active crowd presence', impact: +10 },
    { factor: 'Road condition reports', impact: +7 },
    { factor: 'Traffic concerns', impact: -3 }
  ],

  // AI Insight
  aiInsight: {
    summary: 'Across Ambala Cantt & Ambala City, daytime sentiment is strongly positive in bustling trade hubs like Sadar Bazar and Cloth Market. However, key transit junctions—especially Jagadhri Road Bus Stand and outer Sector 7 stretches—face repeated night-time lighting and pedestrian crossing safety concerns.',
    concerns: [
      'Jagadhri Road Bus Stand crossing hazard — 32 mentions',
      'Poor lighting in Ambala back-lanes & underpasses — 42 mentions',
      'Night-time isolation in outer Sector 7 — 24 mentions',
      'Chaotic peak hour traffic near Cantt Station — 23 mentions'
    ],
    positives: [
      'High footfall & vibrancy in Sadar Bazar — 46 mentions',
      'Busy retail presence in Cloth Market — 38 mentions',
      'Well-maintained GT Road corridor — 54 mentions',
      '24/7 auto availability near Cantt Railway Junction — 31 mentions'
    ],
    emergingTrend: 'Positive daytime sentiment across Ambala markets has risen by 8%, while evening transit areas near the Cantt Bus Stand remain comparatively negative due to ongoing crossing maintenance and dim lighting.',
    recommendation: 'Installing high-mast LED lighting along Jagadhri Road and establishing pedestrian-controlled signal crossings near Ambala Cantt Bus Stand will directly resolve the top community-reported safety bottlenecks.'
  },

  // Time-based safety
  timeSafety: [
    { period: 'Morning', time: '6 AM – 12 PM', icon: '🌅', score: 84, sentiment: 'positive', description: 'Active school and market movement across Ambala. High perceived safety and open shops.' },
    { period: 'Afternoon', time: '12 PM – 5 PM', icon: '☀️', score: 88, sentiment: 'positive', description: 'Peak commercial hours in Cloth Market & Sadar Bazar. Highest reported comfort levels.' },
    { period: 'Evening', time: '5 PM – 8 PM', icon: '🌆', score: 67, sentiment: 'mixed', description: 'Heavy commuter rush along GT Road. Lighting concerns begin as shops start closing.' },
    { period: 'Night', time: '8 PM – 6 AM', icon: '🌙', score: 43, sentiment: 'negative', description: 'Transit areas deserted except railway station. Dim lighting and low foot traffic dominant.' }
  ],
  timeSafetyExplanation: 'Community sentiment across Ambala drops sharply after 8 PM, driven by reduced pedestrian presence on connecting roads and inadequate lighting around underpasses and bus terminals.',

  // Full Haryana State GPS Bounds & Statewide Hotspots
  haryanaBounds: {
    center: [29.4500, 76.7500],
    zoom: 8,
    minZoom: 7,
    maxZoom: 19,
    bounds: [
      [27.4500, 74.2500], // Southwest (Sirsa/Rajasthan border)
      [31.1500, 77.8500]  // Northeast (Panchkula/Himachal/Yamunanagar border)
    ]
  },

  // Haryana Statewide Safety Hotspots with exact GPS Coordinates
  hotspots: [
    {
      id: 'sadar-bazar-ambala',
      name: 'Sadar Bazar (Ambala Cantt)',
      city: 'Ambala',
      score: 86,
      sentiment: 'positive',
      lat: 30.3448,
      lng: 76.8415,
      x: 580, y: 190,
      opinions: 68,
      description: 'Major bustling commercial hub in Ambala Cantt with vibrant shops and constant police patrol.',
      concerns: ['Congested parking during festive hours — 11 mentions'],
      positives: ['Dense foot traffic & active shops — 34 mentions', 'Bright streetlights — 29 mentions', 'Frequent PCR van patrols — 20 mentions']
    },
    {
      id: 'panchkula-sec5',
      name: 'Sector 5 & Town Park (Panchkula)',
      city: 'Panchkula',
      score: 88,
      sentiment: 'positive',
      lat: 30.6942,
      lng: 76.8606,
      x: 560, y: 110,
      opinions: 74,
      description: 'Well-planned administrative and recreation hub with bright LED avenues, regular police beats, and safe evening walkability.',
      concerns: ['MDC back-roads quiet after 10 PM — 9 mentions'],
      positives: ['Wide well-lit avenues — 41 mentions', 'High CCTV coverage — 35 mentions', 'Active evening family crowd — 32 mentions']
    },
    {
      id: 'kurukshetra-univ',
      name: 'University Road & Brahma Sarovar (Kurukshetra)',
      city: 'Kurukshetra',
      score: 84,
      sentiment: 'positive',
      lat: 29.9695,
      lng: 76.8344,
      x: 530, y: 220,
      opinions: 59,
      description: 'Vibrant academic and cultural hub with continuous student presence, well-lit tourist avenues, and police assistance booths.',
      concerns: ['Dim lighting on third gate bypass — 12 mentions'],
      positives: ['Safe walking environment — 38 mentions', 'Heavy student foot traffic — 31 mentions']
    },
    {
      id: 'karnal-modeltown',
      name: 'Model Town & Mall Road (Karnal)',
      city: 'Karnal',
      score: 79,
      sentiment: 'positive',
      lat: 29.6857,
      lng: 76.9905,
      x: 540, y: 260,
      opinions: 52,
      description: 'Clean smart-city commercial corridor with active cafes, bright storefront illumination, and PCR surveillance.',
      concerns: ['Traffic bottlenecks near Committee Chowk — 14 mentions'],
      positives: ['Excellent daytime and evening illumination — 28 mentions', 'Family-friendly environment — 25 mentions']
    },
    {
      id: 'panipat-gt',
      name: 'GT Road & Textile Hub (Panipat)',
      city: 'Panipat',
      score: 56,
      sentiment: 'mixed',
      lat: 29.3909,
      lng: 76.9635,
      x: 520, y: 310,
      opinions: 65,
      description: 'High-density industrial and textile transit corridor with heavy heavy-vehicle traffic and dark underpass pockets.',
      concerns: ['Dim underpass crossings — 26 mentions', 'Chaotic truck and auto movement — 22 mentions'],
      positives: ['Bustling wholesale market — 21 mentions']
    },
    {
      id: 'sonipat-murthal',
      name: 'Murthal NH-44 Hub (Sonipat)',
      city: 'Sonipat',
      score: 78,
      sentiment: 'positive',
      lat: 28.9931,
      lng: 77.0151,
      x: 510, y: 370,
      opinions: 61,
      description: 'Famous 24/7 highway culinary corridor on NH-44 with non-stop illumination, heavy commuter movement, and active private security.',
      concerns: ['High-speed highway crossings — 17 mentions'],
      positives: ['Round-the-clock footfall & eateries — 39 mentions', 'Bright highway floodlights — 33 mentions']
    },
    {
      id: 'gurugram-cyber',
      name: 'Cyber City & DLF Phase 2 (Gurugram)',
      city: 'Gurugram',
      score: 73,
      sentiment: 'mixed',
      lat: 28.4897,
      lng: 77.0890,
      x: 520, y: 440,
      opinions: 98,
      description: 'Massive modern corporate hub with top-tier daytime security, rapid metro connectivity, though isolated service lanes at late hours.',
      concerns: ['Dark unlit service lane stretches — 34 mentions', 'Late night cab stand congestion — 28 mentions'],
      positives: ['High private security & CCTV density — 48 mentions', 'Active Rapid Metro corridors — 37 mentions']
    },
    {
      id: 'faridabad-nit',
      name: 'NIT Market & Metro Corridor (Faridabad)',
      city: 'Faridabad',
      score: 62,
      sentiment: 'mixed',
      lat: 28.3970,
      lng: 77.3100,
      x: 560, y: 460,
      opinions: 67,
      description: 'Dense commercial market area with metro connectivity, though inner lanes face low night-time lighting.',
      concerns: ['Dim lighting in sector market lanes — 23 mentions', 'Congested pedestrian footpaths — 19 mentions'],
      positives: ['Active metro station perimeter — 27 mentions']
    },
    {
      id: 'rohtak-mdu',
      name: 'MDU Campus & Delhi Road (Rohtak)',
      city: 'Rohtak',
      score: 68,
      sentiment: 'mixed',
      lat: 28.8955,
      lng: 76.6066,
      x: 430, y: 360,
      opinions: 54,
      description: 'Major student university belt with lively daytime foot traffic, but bypass connector roads become deserted after dark.',
      concerns: ['Sparse lighting on outer bypass — 18 mentions', 'Quiet campus perimeter after 8:30 PM — 15 mentions'],
      positives: ['Safe daytime student movement — 31 mentions', 'Security checkpoints — 19 mentions']
    },
    {
      id: 'hisar-hau',
      name: 'CCS HAU Campus Road & Auto Market (Hisar)',
      city: 'Hisar',
      score: 66,
      sentiment: 'mixed',
      lat: 29.1492,
      lng: 75.7217,
      x: 290, y: 320,
      opinions: 49,
      description: 'Wide planned avenues with lush university campus, though outer industrial bypass stretches lack consistent lighting.',
      concerns: ['Vacant outer plots at night — 19 mentions', 'Inconsistent streetlights — 14 mentions'],
      positives: ['Wide paved roads — 24 mentions', 'Peaceful daytime walkability — 18 mentions']
    },
    {
      id: 'bus-stand-ambala',
      name: 'Jagadhri Road / Cantt Bus Stand (Ambala)',
      city: 'Ambala',
      score: 42,
      sentiment: 'negative',
      lat: 30.3345,
      lng: 76.8370,
      x: 520, y: 330,
      opinions: 87,
      description: 'Major transit crossing with heavy interstate bus traffic, poor zebra crossings, and dim lighting.',
      concerns: ['Dangerous unregulated pedestrian crossing — 32 mentions', 'Chaotic interstate buses — 27 mentions', 'Dark underpass stretch — 21 mentions'],
      positives: ['Dhabas open till 10:30 PM — 18 mentions']
    },
    {
      id: 'cloth-market-ambala',
      name: 'Cloth Market (Ambala City)',
      city: 'Ambala',
      score: 81,
      sentiment: 'positive',
      lat: 30.3804,
      lng: 76.7725,
      x: 210, y: 170,
      opinions: 56,
      description: 'Famous wholesale textile market in Ambala City with high daytime family and women shopper presence.',
      concerns: ['Narrow lanes for two-wheelers — 18 mentions'],
      positives: ['Very safe daytime shopping vibe — 36 mentions', 'Merchant community surveillance — 24 mentions']
    }
  ],

  // 30+ Community reviews with authentic Ambala context
  reviews: [
    {
      id: 1,
      text: 'Sadar Bazar in Ambala Cantt is crowded during the day and there are shops everywhere, so it feels very safe. I walk here almost every day without any concerns.',
      sentiment: 'positive',
      confidence: 94,
      aspects: [{ name: 'Crowd Density', sentiment: 'positive' }, { name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Daytime',
      area: 'Sadar Bazar (Cantt)',
      memberId: 128
    },
    {
      id: 2,
      text: 'There are barely any streetlights after the Jagadhri Road crossing near the bus stand. Walking here at night doesn\'t feel safe at all. I always try to avoid this stretch after dark.',
      sentiment: 'negative',
      confidence: 96,
      aspects: [{ name: 'Street Lighting', sentiment: 'negative' }, { name: 'Night Safety', sentiment: 'negative' }],
      timePeriod: 'Night',
      area: 'Jagadhri Road / Bus Stand',
      memberId: 54
    },
    {
      id: 3,
      text: 'The road itself is in good condition, but traffic becomes chaotic during peak hours. Crossing the road near the bus stand is particularly difficult.',
      sentiment: 'mixed',
      confidence: 91,
      aspects: [{ name: 'Road Condition', sentiment: 'positive' }, { name: 'Traffic', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 203
    },
    {
      id: 4,
      text: 'It\'s usually busy and there are people around, but the crossing near the market is difficult to navigate. Vehicles don\'t slow down.',
      sentiment: 'mixed',
      confidence: 89,
      aspects: [{ name: 'Crowd Density', sentiment: 'positive' }, { name: 'Crossing Safety', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Main Market',
      memberId: 77
    },
    {
      id: 5,
      text: 'I use this road regularly in the afternoon and have generally had a good experience. At night, however, it becomes very quiet and I feel uneasy.',
      sentiment: 'mixed',
      confidence: 92,
      aspects: [{ name: 'Daytime Safety', sentiment: 'positive' }, { name: 'Night Safety', sentiment: 'negative' }],
      timePeriod: 'Evening',
      area: 'College Road',
      memberId: 156
    },
    {
      id: 6,
      text: 'Love how well-maintained this road is. The footpath is clean and walkable. During the day, I always feel comfortable here.',
      sentiment: 'positive',
      confidence: 95,
      aspects: [{ name: 'Road Condition', sentiment: 'positive' }, { name: 'Walkability', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'College Road',
      memberId: 91
    },
    {
      id: 7,
      text: 'The bus stand area is extremely chaotic. Cars, autos, and buses all compete for space. I\'ve seen near-accidents multiple times.',
      sentiment: 'negative',
      confidence: 97,
      aspects: [{ name: 'Traffic', sentiment: 'negative' }, { name: 'Crossing Safety', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 42
    },
    {
      id: 8,
      text: 'During morning hours, there are plenty of people walking, cycling, and commuting. It\'s one of the safer times to travel through this area.',
      sentiment: 'positive',
      confidence: 93,
      aspects: [{ name: 'Crowd Density', sentiment: 'positive' }, { name: 'Daytime Safety', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'Main Market',
      memberId: 189
    },
    {
      id: 9,
      text: 'I avoid this road after 8 PM. There\'s almost no one around and the streetlights are either broken or missing. It\'s genuinely scary.',
      sentiment: 'negative',
      confidence: 98,
      aspects: [{ name: 'Night Safety', sentiment: 'negative' }, { name: 'Street Lighting', sentiment: 'negative' }],
      timePeriod: 'Night',
      area: 'Residential Road',
      memberId: 215
    },
    {
      id: 10,
      text: 'The market area has good visibility with plenty of shops and vendors. I feel safe walking here even in the early evening.',
      sentiment: 'positive',
      confidence: 90,
      aspects: [{ name: 'Public Activity', sentiment: 'positive' }, { name: 'Street Lighting', sentiment: 'positive' }],
      timePeriod: 'Evening',
      area: 'Main Market',
      memberId: 33
    },
    {
      id: 11,
      text: 'Honestly, crossing the road near the bus stand is a nightmare. There\'s no proper zebra crossing and drivers don\'t care about pedestrians.',
      sentiment: 'negative',
      confidence: 96,
      aspects: [{ name: 'Crossing Safety', sentiment: 'negative' }, { name: 'Traffic', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 167
    },
    {
      id: 12,
      text: 'Nice wide road with decent footpaths. The only issue is that it gets deserted after sunset, which is a bit uncomfortable.',
      sentiment: 'mixed',
      confidence: 88,
      aspects: [{ name: 'Road Condition', sentiment: 'positive' }, { name: 'Night Safety', sentiment: 'negative' }],
      timePeriod: 'Evening',
      area: 'College Road',
      memberId: 82
    },
    {
      id: 13,
      text: 'I take this route for my daily walk and it\'s great in the mornings. Fresh air, clean road, and always some activity around.',
      sentiment: 'positive',
      confidence: 91,
      aspects: [{ name: 'Walkability', sentiment: 'positive' }, { name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'Residential Road',
      memberId: 245
    },
    {
      id: 14,
      text: 'The lighting situation is terrible on the stretch between the college and the bus stand. Multiple bulbs are out and it\'s been weeks.',
      sentiment: 'negative',
      confidence: 95,
      aspects: [{ name: 'Street Lighting', sentiment: 'negative' }],
      timePeriod: 'Night',
      area: 'College Road',
      memberId: 19
    },
    {
      id: 15,
      text: 'Traffic is manageable during off-peak hours. The road is smooth and well-maintained. Would recommend this route for daytime travel.',
      sentiment: 'positive',
      confidence: 87,
      aspects: [{ name: 'Traffic', sentiment: 'positive' }, { name: 'Road Condition', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'Main Market',
      memberId: 134
    },
    {
      id: 16,
      text: 'Walking alone after dark here is something I\'d never recommend. The area becomes very isolated and there are no emergency helplines visible.',
      sentiment: 'negative',
      confidence: 97,
      aspects: [{ name: 'Night Safety', sentiment: 'negative' }, { name: 'Crowd Density', sentiment: 'negative' }],
      timePeriod: 'Night',
      area: 'Residential Road',
      memberId: 201
    },
    {
      id: 17,
      text: 'The presence of auto-rickshaws and public transport makes it easy to get out of the area if needed. I feel relatively secure.',
      sentiment: 'positive',
      confidence: 85,
      aspects: [{ name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 110
    },
    {
      id: 18,
      text: 'There\'s a stretch near the residential colony where stray dogs gather at night. Combined with poor lighting, it\'s quite intimidating.',
      sentiment: 'negative',
      confidence: 93,
      aspects: [{ name: 'Night Safety', sentiment: 'negative' }, { name: 'Street Lighting', sentiment: 'negative' }],
      timePeriod: 'Night',
      area: 'Residential Road',
      memberId: 63
    },
    {
      id: 19,
      text: 'The market area is well-lit and vibrant during evening hours. Shops stay open till 9 PM which adds to the sense of safety.',
      sentiment: 'positive',
      confidence: 94,
      aspects: [{ name: 'Street Lighting', sentiment: 'positive' }, { name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Evening',
      area: 'Main Market',
      memberId: 178
    },
    {
      id: 20,
      text: 'Footpaths are practically non-existent near the bus stand. You have to walk on the road itself which feels dangerous with all the traffic.',
      sentiment: 'negative',
      confidence: 96,
      aspects: [{ name: 'Walkability', sentiment: 'negative' }, { name: 'Traffic', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 7
    },
    {
      id: 21,
      text: 'I feel comfortable during college hours as there are always students around. The campus security also adds a layer of safety.',
      sentiment: 'positive',
      confidence: 90,
      aspects: [{ name: 'Crowd Density', sentiment: 'positive' }, { name: 'Daytime Safety', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'College Road',
      memberId: 229
    },
    {
      id: 22,
      text: 'The road surface has deteriorated significantly after the monsoon. Several potholes near the crossing make it risky, especially for two-wheelers.',
      sentiment: 'negative',
      confidence: 88,
      aspects: [{ name: 'Road Condition', sentiment: 'negative' }, { name: 'Crossing Safety', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 144
    },
    {
      id: 23,
      text: 'Generally a pleasant route during daytime. The tree-lined stretch near the college is especially nice for walking.',
      sentiment: 'positive',
      confidence: 86,
      aspects: [{ name: 'Walkability', sentiment: 'positive' }, { name: 'Road Condition', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'College Road',
      memberId: 58
    },
    {
      id: 24,
      text: 'There have been incidents of eve-teasing reported near the bus stand in the evening. The area lacks proper surveillance.',
      sentiment: 'negative',
      confidence: 94,
      aspects: [{ name: 'Night Safety', sentiment: 'negative' }, { name: 'Public Activity', sentiment: 'negative' }],
      timePeriod: 'Evening',
      area: 'Bus Stand Crossing',
      memberId: 192
    },
    {
      id: 25,
      text: 'I appreciate the recent installation of speed breakers near the school zone. It has made the crossing much safer during school hours.',
      sentiment: 'positive',
      confidence: 89,
      aspects: [{ name: 'Crossing Safety', sentiment: 'positive' }, { name: 'Traffic', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'Residential Road',
      memberId: 116
    },
    {
      id: 26,
      text: 'The residential stretch is peaceful during the day but transforms completely at night. I wouldn\'t walk here alone post 9 PM.',
      sentiment: 'mixed',
      confidence: 92,
      aspects: [{ name: 'Daytime Safety', sentiment: 'positive' }, { name: 'Night Safety', sentiment: 'negative' }],
      timePeriod: 'Evening',
      area: 'Residential Road',
      memberId: 37
    },
    {
      id: 27,
      text: 'This route has good connectivity. Multiple bus stops and auto stands mean you\'re never stranded. Feels safe knowing transport is accessible.',
      sentiment: 'positive',
      confidence: 87,
      aspects: [{ name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Afternoon',
      area: 'Main Market',
      memberId: 159
    },
    {
      id: 28,
      text: 'The underpass near the railway crossing is poorly lit and has no CCTV. I always feel anxious passing through it.',
      sentiment: 'negative',
      confidence: 95,
      aspects: [{ name: 'Street Lighting', sentiment: 'negative' }, { name: 'Night Safety', sentiment: 'negative' }],
      timePeriod: 'Evening',
      area: 'Bus Stand Crossing',
      memberId: 84
    },
    {
      id: 29,
      text: 'Weekday mornings here are quite pleasant. Good amount of foot traffic and the chai stalls create a welcoming atmosphere.',
      sentiment: 'positive',
      confidence: 88,
      aspects: [{ name: 'Crowd Density', sentiment: 'positive' }, { name: 'Public Activity', sentiment: 'positive' }],
      timePeriod: 'Morning',
      area: 'Main Market',
      memberId: 221
    },
    {
      id: 30,
      text: 'There are a lot of heavy vehicles on this road during the afternoon. The dust and noise make walking unpleasant and somewhat unsafe.',
      sentiment: 'negative',
      confidence: 90,
      aspects: [{ name: 'Traffic', sentiment: 'negative' }, { name: 'Walkability', sentiment: 'negative' }],
      timePeriod: 'Afternoon',
      area: 'Bus Stand Crossing',
      memberId: 148
    }
  ],

  // Reporting categories
  reportCategories: [
    'Poor lighting',
    'Unsafe crossing',
    'Traffic',
    'Road condition',
    'Low visibility',
    'Harassment concern',
    'Other'
  ]
};
