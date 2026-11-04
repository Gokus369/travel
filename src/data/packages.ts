import type { PhotoKey } from "@/data/photos";

export type RegionId = "south" | "north" | "west" | "himalaya" | "east" | "islands";

export const regions: { id: RegionId; name: string; blurb: string; photo: PhotoKey }[] = [
  { id: "south", name: "South India", blurb: "Backwaters, tea hills, temple towns", photo: "munnar-rays" },
  { id: "north", name: "North India", blurb: "The Taj, the Ganga, the old capitals", photo: "dashashwamedh" },
  { id: "west", name: "Rajasthan & Goa", blurb: "Desert forts and Konkan beaches", photo: "jaisalmer-fort" },
  { id: "himalaya", name: "The Himalaya", blurb: "Kashmir, Ladakh, Himachal, Sikkim", photo: "nubra-dunes" },
  { id: "east", name: "East & Northeast", blurb: "Root bridges, rhinos, clear rivers", photo: "nohkalikai" },
  { id: "islands", name: "The Islands", blurb: "White sand and reef in the Andamans", photo: "havelock-huts" },
];

export type Package = {
  slug: string;
  title: string;
  tagline: string;
  region: RegionId;
  states: string;
  route: string[];
  nights: number;
  days: number;
  months: number[];
  pace: "Easy" | "Moderate" | "Active";
  goodFor: string[];
  cover: PhotoKey;
  gallery: PhotoKey[];
  story: string;
  highlights: string[];
  itinerary: { title: string; body: string }[];
  note: string;
  /** Per-person starting price in rupees. Leave out to show "quote on request". */
  priceFrom?: number;
};

export const packages: Package[] = [
  {
    slug: "kerala-cliff-to-tea-hill",
    title: "Kerala, Cliff to Tea Hill",
    tagline: "Our home state, end to end: spice port, tea country, backwater and sea cliff.",
    region: "south",
    states: "Kerala",
    route: ["Kochi", "Munnar", "Thekkady", "Alappuzha", "Varkala"],
    nights: 8,
    days: 9,
    months: [9, 10, 11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["Couples", "Families", "First time in Kerala"],
    cover: "houseboat",
    gallery: ["munnar-tea", "kochi-nets"],
    story:
      "This is the Kerala trip we would plan for a friend. It starts in the old port of Kochi, climbs into the cool tea country of the Western Ghats, drops through spice gardens to the backwaters, and ends on the red cliffs of Varkala with your feet in the Arabian Sea. Nine days is enough to change altitude, climate and pace twice over without feeling rushed.",
    highlights: [
      "A night on a kettuvallam houseboat on the Alappuzha backwaters",
      "Tea estates and cool mornings in Munnar",
      "A morning boat on Periyar Lake in Thekkady",
      "Fort Kochi's Chinese fishing nets at sunset",
      "Two slow days on the Varkala cliff, our home ground",
    ],
    itinerary: [
      { title: "Arrive in Kochi", body: "Pick-up at Kochi airport or Ernakulam station. Walk Fort Kochi in the late afternoon, then watch the fishing nets lift against the sunset." },
      { title: "Up into the Western Ghats", body: "About four hours by road to Munnar, with waterfalls and spice stalls along the way as the air cools and the tea begins." },
      { title: "Munnar tea country", body: "Visit the Tea Museum, walk the estates, and head to Eravikulam National Park for the rolling grassland and, with luck, Nilgiri tahr." },
      { title: "To Thekkady", body: "About three hours through cardamom hills. A guided spice garden walk in the afternoon, then a Kathakali or Kalaripayattu performance in the evening." },
      { title: "Periyar Lake, then the lowlands", body: "An early boat on Periyar Lake inside the tiger reserve, then down to the backwater country around Alappuzha or Kumarakom for a lakeside night." },
      { title: "Aboard the houseboat", body: "Board around noon and cruise the canals past paddy fields and village jetties, with lunch, dinner and breakfast cooked on board. The boat moors for the night." },
      { title: "South to Varkala", body: "Step off after breakfast and drive about three hours to Varkala. Spend the evening on the cliff path with the sun going down over the sea." },
      { title: "A day on the cliff", body: "Papanasam Beach, the Janardhana Swamy Temple, cafes along the cliff, and an optional Ayurvedic massage or yoga class." },
      { title: "Departure", body: "Transfer to Thiruvananthapuram airport or railway station, about an hour from Varkala." },
    ],
    note: "Eravikulam National Park closes for a few weeks around February and March for the Nilgiri tahr calving season. We swap in Top Station or Mattupetty if your dates fall then.",
  },
  {
    slug: "slow-days-on-the-varkala-cliff",
    title: "Slow Days on the Varkala Cliff",
    tagline: "Five unhurried days on the stretch of coast we call home.",
    region: "south",
    states: "Kerala",
    route: ["Varkala", "Kappil", "Ponnumthuruthu", "Anchuthengu"],
    nights: 4,
    days: 5,
    months: [10, 11, 12, 1, 2, 3],
    pace: "Easy",
    goodFor: ["Couples", "Solo travellers", "Yoga and wellness"],
    cover: "varkala-sunset",
    gallery: ["varkala-cliff", "backwater-canoe"],
    story:
      "Varkala is where Kerala's coast rises into red laterite cliffs, with the beach far below and a footpath of cafes along the top. There is not much to tick off here, which is the point. We know this coast well, so these days are built around the small things: the right cliff for sunset, a boat through the mangroves, and the quiet stretch of sand most visitors never reach.",
    highlights: [
      "Sunset from the cliff above Papanasam Beach",
      "A country boat around Ponnumthuruthu island",
      "Kappil, where the backwater meets the sea",
      "Anchuthengu Fort, an old English East India Company outpost",
      "Time set aside for yoga, Ayurveda or doing nothing",
    ],
    itinerary: [
      { title: "Arrive at the cliff", body: "Pick-up from Thiruvananthapuram airport or Varkala Sivagiri station. Settle in and walk the cliff path before sunset." },
      { title: "Papanasam and the old temple", body: "A morning on Papanasam Beach, a visit to the Janardhana Swamy Temple, and a walk north along the cliff to the darker sand of the Black Beach." },
      { title: "Island and estuary", body: "A country boat around Ponnumthuruthu, then Kappil, where a thin strip of sand keeps the lake from the Arabian Sea. Stop at Anchuthengu Fort on the way back." },
      { title: "Your day", body: "Keep it open for yoga, an Ayurvedic treatment or the beach. If you want a day out, Jatayu Earth's Center and its giant bird sculpture are within reach." },
      { title: "Departure via Thiruvananthapuram", body: "Time permitting, see the Kuthira Malika palace or Napier Museum in the capital before your flight or train." },
    ],
    note: "Add this to any South India trip. It works especially well as a rest at the end of the Tamil Nadu or Kerala routes.",
  },
  {
    slug: "stone-bronze-and-sea-tamil-nadu",
    title: "Stone, Bronze and Sea",
    tagline: "Tamil Nadu's temple country, from Chola granite to the very tip of India.",
    region: "south",
    states: "Tamil Nadu",
    route: ["Mahabalipuram", "Puducherry", "Thanjavur", "Karaikudi", "Madurai", "Rameswaram", "Kanyakumari"],
    nights: 7,
    days: 8,
    months: [11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["Culture lovers", "Pilgrimage", "Photographers"],
    cover: "meenakshi",
    gallery: ["shore-temple"],
    story:
      "Few drives in India hold as much history as this one. Start with the rock-cut carvings at Mahabalipuram, pass through the French streets of Puducherry, stand under the great Chola tower at Thanjavur, eat your way through Chettinad, and finish where three seas meet at Kanyakumari. From there, Varkala is an easy add-on.",
    highlights: [
      "The Shore Temple and Arjuna's Penance at Mahabalipuram",
      "Brihadeeswarar Temple at Thanjavur in evening light",
      "Chettinad mansions and cooking around Karaikudi",
      "The evening ceremony at Madurai's Meenakshi Temple",
      "Crossing to Rameswaram and on to Dhanushkodi",
    ],
    itinerary: [
      { title: "Chennai to Mahabalipuram", body: "Pick-up in Chennai and about ninety minutes down the coast road to Mahabalipuram." },
      { title: "Rock-cut art, then Puducherry", body: "See the Shore Temple, the Five Rathas and Arjuna's Penance in the morning, then drive about two hours to Puducherry for an evening in the French Quarter." },
      { title: "To Thanjavur", body: "About four hours inland through the Kaveri delta. See the Brihadeeswarar Temple in the late afternoon when the granite turns gold." },
      { title: "Chettinad", body: "About two hours to Karaikudi. Explore grand merchant mansions, antique lanes and one of India's great regional cuisines." },
      { title: "Madurai", body: "About two hours to Madurai. Spend the evening at the Meenakshi Temple, with its painted towers and hall of a thousand pillars." },
      { title: "Across to Rameswaram", body: "About three and a half hours to the island, crossing the Pamban sea channel. Visit the long pillared corridors of the Ramanathaswamy Temple." },
      { title: "Dhanushkodi to Kanyakumari", body: "An early trip to the ghost town of Dhanushkodi at the end of the road, then a long drive of five to six hours to Kanyakumari." },
      { title: "Land's end and departure", body: "Sunrise over the meeting of the seas, a ferry to the Vivekananda Rock Memorial, then about two and a half hours to Thiruvananthapuram." },
    ],
    note: "Temples set their own dress codes and some inner shrines are open to Hindus only. Shoulders and knees covered is a safe rule, and we build in time for queues on festival days.",
  },
  {
    slug: "palaces-coffee-and-hampi",
    title: "Palaces, Coffee and Hampi",
    tagline: "Karnataka in one sweep: a royal city, a coffee estate and a lost capital.",
    region: "south",
    states: "Karnataka",
    route: ["Mysuru", "Coorg", "Hampi"],
    nights: 7,
    days: 8,
    months: [10, 11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["Families", "Culture lovers", "Friends"],
    cover: "hampi",
    gallery: ["mysore-palace", "coorg"],
    story:
      "Karnataka rewards the traveller who keeps moving. Mysuru is all silk, sandalwood and palace light. Coorg is cool and green, with coffee growing under tall shade trees. And Hampi, once the capital of the Vijayanagara empire, is unlike anywhere else in India: temple ruins scattered across a landscape of giant granite boulders.",
    highlights: [
      "Mysore Palace and the view from Chamundi Hill",
      "The Tibetan Golden Temple at Bylakuppe",
      "A walk through a working Coorg coffee estate",
      "The stone chariot at Vittala Temple in Hampi",
      "A coracle on the Tungabhadra and sunset from Hemakuta Hill",
    ],
    itinerary: [
      { title: "Bengaluru to Mysuru", body: "About three and a half hours by road, stopping at the island fort of Srirangapatna on the way." },
      { title: "Royal Mysuru", body: "Tour Mysore Palace, go up Chamundi Hill, and wander Devaraja Market for flowers, silk and sandalwood." },
      { title: "Into Coorg", body: "About three hours west, with a stop at the Tibetan settlement and Golden Temple at Bylakuppe, then check in among the coffee." },
      { title: "A coffee day", body: "Walk an estate, see Abbey Falls, and end the afternoon at Raja's Seat as the hills turn blue." },
      { title: "Overnight towards Hampi", body: "Drive back to Bengaluru, about six hours, for the overnight train to Hosapete." },
      { title: "Hampi's sacred centre", body: "Arrive in the morning. See Virupaksha Temple, climb Hemakuta Hill, and visit the Vittala Temple and its stone chariot." },
      { title: "Hampi's royal centre", body: "The Royal Enclosure, Lotus Mahal and Elephant Stables, then a coracle on the Tungabhadra and a last sunset among the boulders." },
      { title: "Departure", body: "Onward from Hosapete by train, or by road to Vidyanagar or Hubballi airport." },
    ],
    note: "Mysore Palace is lit up with thousands of bulbs on Sunday evenings and public holidays. Tell us your dates and we will try to fit that in.",
  },
  {
    slug: "the-golden-triangle",
    title: "The Golden Triangle",
    tagline: "Delhi, Agra and Jaipur: the classic first journey through North India.",
    region: "north",
    states: "Delhi, Uttar Pradesh, Rajasthan",
    route: ["Delhi", "Agra", "Fatehpur Sikri", "Jaipur"],
    nights: 5,
    days: 6,
    months: [10, 11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["First time in India", "Families", "Couples"],
    cover: "taj-reflection",
    gallery: ["hawa-mahal", "amber-fort"],
    story:
      "It is a well-worn route for good reason. In six days you move through the Mughal and Rajput worlds: the crowded lanes of Old Delhi, the Taj Mahal at first light, the abandoned red city of Fatehpur Sikri, and the forts and bazaars of Jaipur. The roads between them are now fast, which leaves more time for the places themselves.",
    highlights: [
      "The Taj Mahal at sunrise",
      "Sunset across the Yamuna from Mehtab Bagh",
      "Old Delhi, Humayun's Tomb and the Qutub Minar",
      "Amber Fort and the City Palace of Jaipur",
      "The empty palaces of Fatehpur Sikri",
    ],
    itinerary: [
      { title: "Arrive in Delhi", body: "Pick-up from the airport or station. Depending on your arrival time, an easy evening at India Gate or Connaught Place." },
      { title: "Old and New Delhi", body: "Jama Masjid and Chandni Chowk in the morning, then Humayun's Tomb and the Qutub Minar." },
      { title: "To Agra", body: "About four hours on the expressway. Visit Agra Fort, then watch the sun set behind the Taj from Mehtab Bagh." },
      { title: "The Taj, then Jaipur", body: "Be at the gate for sunrise. After breakfast, drive to Jaipur with a stop at Fatehpur Sikri, around five to six hours in all." },
      { title: "The Pink City", body: "Amber Fort in the morning, then the City Palace, Jantar Mantar and the Hawa Mahal, with time for the bazaars." },
      { title: "Back to Delhi", body: "About five hours by road for your flight or train, or continue into Rajasthan with us." },
    ],
    note: "The Taj Mahal is closed on Fridays and the Red Fort on Mondays. We set the order of days around your arrival so you do not miss either.",
  },
  {
    slug: "kashi-sangam-ayodhya",
    title: "Kashi, Sangam, Ayodhya",
    tagline: "A journey along the sacred rivers of Uttar Pradesh.",
    region: "north",
    states: "Uttar Pradesh",
    route: ["Varanasi", "Sarnath", "Prayagraj", "Ayodhya"],
    nights: 5,
    days: 6,
    months: [10, 11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["Pilgrimage", "Families", "Senior travellers"],
    cover: "varanasi-boats",
    gallery: ["dashashwamedh"],
    story:
      "Varanasi at dawn is one of the great sights of India: boats on the Ganga, bells from the ghats, the whole city waking at the water's edge. This route gives Kashi the three days it deserves, then follows the rivers to the confluence at Prayagraj and on to Ayodhya on the Saryu. It suits pilgrims and curious travellers alike.",
    highlights: [
      "A dawn boat along the ghats of Varanasi",
      "Ganga aarti at Dashashwamedh Ghat",
      "Kashi Vishwanath and the old city lanes",
      "Sarnath, where the Buddha first taught",
      "A boat to the Triveni Sangam at Prayagraj",
      "Ram Mandir and the Saryu aarti in Ayodhya",
    ],
    itinerary: [
      { title: "Arrive in Varanasi", body: "Pick-up and check-in, then head to Dashashwamedh Ghat for the evening Ganga aarti." },
      { title: "Dawn on the river", body: "A boat along the ghats at first light, then darshan at Kashi Vishwanath and a walk through the lanes of the old city." },
      { title: "Sarnath and silk", body: "A morning at Sarnath's stupa and museum, then an afternoon with the weavers of Banarasi silk." },
      { title: "Prayagraj to Ayodhya", body: "About three hours to Prayagraj for a boat to the Sangam, then roughly three and a half hours on to Ayodhya." },
      { title: "Ayodhya", body: "Darshan at Ram Mandir and Hanuman Garhi, then the evening aarti on the banks of the Saryu." },
      { title: "Departure", body: "Transfer to Ayodhya airport or station, or on to Lucknow by road." },
    ],
    note: "Phones and bags are not allowed inside Kashi Vishwanath or Ram Mandir. We plan for lockers and a slower pace, and we can arrange wheelchair help for senior travellers on request.",
  },
  {
    slug: "four-colours-of-rajasthan",
    title: "Four Colours of Rajasthan",
    tagline: "Pink Jaipur, blue Jodhpur, gold Jaisalmer, white Udaipur.",
    region: "west",
    states: "Rajasthan",
    route: ["Jaipur", "Pushkar", "Jodhpur", "Jaisalmer", "Ranakpur", "Udaipur"],
    nights: 9,
    days: 10,
    months: [10, 11, 12, 1, 2, 3],
    pace: "Moderate",
    goodFor: ["Couples", "Photographers", "Friends"],
    cover: "camel-sunset",
    gallery: ["jaisalmer-fort", "udaipur-palace"],
    story:
      "Rajasthan is best told in colours. You start in the rose-coloured bazaars of Jaipur, look down on the blue houses of Jodhpur from one of India's mightiest forts, reach the honey-gold citadel of Jaisalmer at the edge of the Thar, and finish in Udaipur, where white palaces rise straight from the lake.",
    highlights: [
      "Amber Fort and the bazaars of Jaipur",
      "Mehrangarh Fort above the blue city of Jodhpur",
      "A night at a desert camp near the Sam dunes",
      "The living fort and havelis of Jaisalmer",
      "The marble Jain temple at Ranakpur",
      "An evening boat on Lake Pichola",
    ],
    itinerary: [
      { title: "Arrive in Jaipur", body: "Pick-up and an easy evening in the old city." },
      { title: "The Pink City", body: "Amber Fort, the City Palace, Jantar Mantar and the Hawa Mahal, with time for block prints and jewellery in the bazaars." },
      { title: "Pushkar to Jodhpur", body: "A stop at the sacred lake of Pushkar on the way to Jodhpur, around six to seven hours on the road." },
      { title: "The Blue City", body: "Mehrangarh Fort, the marble Jaswant Thada, and a walk through the blue lanes around the clock tower." },
      { title: "To Jaisalmer", body: "About five hours west as the land turns to desert. See the sunset from Gadisar Lake or the fort walls." },
      { title: "Fort and dunes", body: "Walk the living fort and the carved Patwon ki Haveli, then head to the Sam dunes for sunset and a night at a desert camp." },
      { title: "Back across the desert", body: "Return to Jodhpur, about five hours, with the evening free. It breaks up the long road to Udaipur." },
      { title: "Ranakpur to Udaipur", body: "See the marble halls of the Ranakpur Jain temple on the way to Udaipur, around six hours in all." },
      { title: "The city of lakes", body: "Tour the City Palace and Jagdish Temple, then take a boat on Lake Pichola at sunset." },
      { title: "Departure", body: "Transfer to Udaipur airport or station." },
    ],
    note: "This is a route with long road days. If you would rather not spend them in the car, we can swap some stretches for trains or trim the route to three cities.",
  },
  {
    slug: "two-sides-of-goa",
    title: "Two Sides of Goa",
    tagline: "Lively north, quiet south, and old Portuguese Goa in between.",
    region: "west",
    states: "Goa",
    route: ["North Goa", "Panaji", "Old Goa", "South Goa"],
    nights: 4,
    days: 5,
    months: [11, 12, 1, 2, 3],
    pace: "Easy",
    goodFor: ["Couples", "Friends", "Short breaks"],
    cover: "palolem",
    gallery: ["bom-jesus", "vagator"],
    story:
      "Most people only see half of Goa. This trip splits your time: two nights in the north for cafes, sunsets and Chapora Fort, and two in the south, where the beaches are wider, the villages sleepier and the palms come down to the sand. In between you get the churches of Old Goa and the coloured lanes of Fontainhas.",
    highlights: [
      "Sunset from Chapora Fort",
      "The painted Latin Quarter of Fontainhas",
      "The Basilica of Bom Jesus in Old Goa",
      "A spice farm lunch near Ponda",
      "Cabo de Rama and the crescent of Palolem",
    ],
    itinerary: [
      { title: "Arrive in North Goa", body: "Pick-up from Mopa or Dabolim airport, or Madgaon station. Sunset at Vagator or Chapora Fort." },
      { title: "Portuguese Goa", body: "Walk Fontainhas in Panaji, then see the Basilica of Bom Jesus and Se Cathedral in Old Goa." },
      { title: "Spice farm to the south", body: "Lunch at a spice farm near Ponda, then continue south, stopping at the cliff-top fort of Cabo de Rama if time allows." },
      { title: "South Goa", body: "A slow day at Palolem or Agonda, with an optional boat to nearby coves." },
      { title: "Departure", body: "Transfer to the airport or station." },
    ],
    note: "Most beach shacks run from about November to April. Goa in the monsoon is green and quiet, but the sea is rough and many places close.",
  },
  {
    slug: "kashmir-meadow-to-lake",
    title: "Kashmir, Meadow to Lake",
    tagline: "Shikaras on Dal Lake, the Gulmarg gondola and the river valleys of Pahalgam.",
    region: "himalaya",
    states: "Jammu & Kashmir",
    route: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    nights: 6,
    days: 7,
    months: [4, 5, 6, 7, 8, 9, 10],
    pace: "Easy",
    goodFor: ["Honeymoon", "Families", "Senior travellers"],
    cover: "betaab-valley",
    gallery: ["dal-lake", "pahalgam"],
    story:
      "Few places in India are as easy on the eye as the Kashmir Valley. Start with a night on a cedar houseboat in Srinagar, ride the gondola into the high meadows at Gulmarg, follow the Lidder River through Pahalgam, and end at the glacier valley of Sonamarg. Distances are short and the days are gentle, which makes this a favourite for couples and families.",
    highlights: [
      "A night on a Dal Lake houseboat",
      "A shikara ride at sunset",
      "The Mughal gardens of Nishat and Shalimar",
      "The Gulmarg gondola",
      "Betaab and Aru valleys near Pahalgam",
    ],
    itinerary: [
      { title: "Arrive in Srinagar", body: "Pick-up from the airport, check in to a houseboat, and take a shikara across Dal Lake at sunset." },
      { title: "Gardens and old Srinagar", body: "See Nishat and Shalimar Baghs, then Jamia Masjid and the old city's wooden shrines and craft shops." },
      { title: "Gulmarg", body: "About two hours to Gulmarg for the gondola, high meadows in summer and snow in the colder months." },
      { title: "To Pahalgam", body: "About four and a half hours by road, passing the saffron fields of Pampore. Evening by the Lidder River." },
      { title: "Pahalgam valleys", body: "A day out to Betaab and Aru valleys, with pony rides or gentle walks." },
      { title: "Sonamarg", body: "About four hours along the Sindh River to Sonamarg and the Thajiwas glacier valley, then on to Srinagar for the night." },
      { title: "Departure", body: "Transfer to Srinagar airport. Allow extra time for security checks." },
    ],
    note: "We check current travel advisories and road conditions before confirming any Kashmir dates, and we will tell you plainly if we would change a plan.",
  },
  {
    slug: "ladakh-the-high-road",
    title: "Ladakh, the High Road",
    tagline: "Monasteries, high passes and two of the great landscapes of the Himalaya.",
    region: "himalaya",
    states: "Ladakh",
    route: ["Leh", "Khardung La", "Nubra Valley", "Pangong Tso"],
    nights: 7,
    days: 8,
    months: [5, 6, 7, 8, 9],
    pace: "Active",
    goodFor: ["Adventure", "Photographers", "Friends"],
    cover: "pangong",
    gallery: ["nubra-dunes", "thiksey"],
    story:
      "Ladakh feels like the roof of another world: bare mountains in every shade of ochre, white monasteries on rock spurs, and a lake so blue it looks unreal. This route is paced for altitude first. You spend three days around Leh before crossing the high passes to the sand dunes of Nubra and the long blue water of Pangong Tso.",
    highlights: [
      "Three days of careful acclimatisation around Leh",
      "Thiksey and Hemis monasteries",
      "Crossing Khardung La, well above 5,000 metres",
      "Sand dunes and Bactrian camels at Hunder",
      "Sunrise at Pangong Tso",
    ],
    itinerary: [
      { title: "Land in Leh", body: "Pick-up from the airport and straight to your hotel. Today you rest, drink water and let your body adjust." },
      { title: "Easy Leh", body: "A short day: Shanti Stupa, Leh Palace and an unhurried walk around the market." },
      { title: "The Indus Valley", body: "Visit the monasteries at Thiksey and Hemis and the palace at Shey." },
      { title: "Over Khardung La", body: "Cross the pass to Nubra, see the giant Maitreya Buddha at Diskit, and spend the evening at the Hunder dunes." },
      { title: "The Shyok road to Pangong", body: "A long and spectacular day of six to seven hours along the Shyok River to Pangong Tso. Overnight in a lakeside camp." },
      { title: "Back over Chang La", body: "Watch the lake change colour at sunrise, then cross Chang La back to Leh, about five to six hours." },
      { title: "Sham Valley", body: "An easier day to Gurudwara Pathar Sahib, Magnetic Hill and the Indus and Zanskar confluence." },
      { title: "Departure", body: "Early transfer to Leh airport. Morning flights are the norm here." },
    ],
    note: "Leh sits at about 3,500 metres and the passes go much higher. The slow first days are not optional. Please check with your doctor if you have a heart or lung condition. Permit rules for Nubra and Pangong change from time to time, so we confirm them for your dates.",
  },
  {
    slug: "himachal-toy-train-to-snowline",
    title: "Himachal, Toy Train to Snowline",
    tagline: "Colonial Shimla, the Kullu Valley and the mountain road through the Atal Tunnel.",
    region: "himalaya",
    states: "Himachal Pradesh",
    route: ["Chandigarh", "Shimla", "Kullu", "Manali", "Sissu"],
    nights: 6,
    days: 7,
    months: [3, 4, 5, 6, 9, 10, 11],
    pace: "Moderate",
    goodFor: ["Families", "Honeymoon", "Friends"],
    cover: "solang",
    gallery: ["solang-snow"],
    story:
      "This is the Himalaya at its most welcoming: pine forests, apple orchards and old hill towns, with snow peaks always in view. You leave the plains by road or toy train to Shimla, follow the Beas River into the Kullu Valley, and base yourself in Manali for easy days out, including the drive through the Atal Tunnel into Lahaul.",
    highlights: [
      "The Mall and Christ Church in Shimla",
      "The Beas River road to the Kullu Valley",
      "Hadimba Temple and Old Manali",
      "Solang Valley and its views of the snow peaks",
      "Through the Atal Tunnel to Sissu in Lahaul",
    ],
    itinerary: [
      { title: "Chandigarh to Shimla", body: "About four hours by road, or take the UNESCO-listed toy train from Kalka if you prefer the slow way up." },
      { title: "Shimla", body: "Walk The Mall and The Ridge, see Christ Church, and go up to Jakhu Temple or out to Kufri." },
      { title: "The long road to Manali", body: "A full day of about eight hours through Mandi and along the Beas River." },
      { title: "Around Manali", body: "See the cedar forest at Hadimba Temple, the cafes of Old Manali, and the hot springs of Vashisht." },
      { title: "Solang and Sissu", body: "Drive through the Atal Tunnel to Sissu in Lahaul, then stop in Solang Valley for the views and adventure activities." },
      { title: "Naggar and Kullu", body: "An easy day to Naggar Castle and the Roerich Gallery, with shawl shopping in Kullu." },
      { title: "Departure", body: "About eight hours back to Chandigarh for your evening train or flight." },
    ],
    note: "For snow on the ground, come between December and February, when the roads beyond Manali can close. The months we list here are the most comfortable for touring.",
  },
  {
    slug: "darjeeling-and-sikkim",
    title: "Darjeeling and Sikkim",
    tagline: "Tea gardens, a mountain railway and the wall of Kanchenjunga.",
    region: "himalaya",
    states: "West Bengal, Sikkim",
    route: ["Darjeeling", "Gangtok", "Tsomgo Lake", "Pelling"],
    nights: 7,
    days: 8,
    months: [3, 4, 5, 10, 11, 12],
    pace: "Moderate",
    goodFor: ["Families", "Couples", "Photographers"],
    cover: "tsomgo",
    gallery: ["toy-train"],
    story:
      "The eastern Himalaya has a softer feel than the west: mist, prayer flags, tea on steep green slopes, and on clear mornings the huge white wall of Kanchenjunga filling the horizon. This trip starts with the tea and toy trains of Darjeeling, then crosses the Teesta into Sikkim for monasteries, a high lake and the quiet ridges of Pelling.",
    highlights: [
      "Kanchenjunga sunrise from Tiger Hill",
      "A joyride on the Darjeeling Himalayan Railway",
      "A walk through a Darjeeling tea estate",
      "Tsomgo Lake at over 3,700 metres",
      "Pemayangtse Monastery and the ruins of Rabdentse",
    ],
    itinerary: [
      { title: "Bagdogra to Darjeeling", body: "About three and a half hours uphill from Bagdogra airport or New Jalpaiguri station." },
      { title: "Darjeeling", body: "Tiger Hill for sunrise, then Batasia Loop, a tea estate visit and a toy train joyride." },
      { title: "To Gangtok", body: "Four to five hours down to the Teesta River and up again into Sikkim. Evening on MG Marg." },
      { title: "Tsomgo Lake", body: "A day trip to the high lake and Baba Mandir, on a permit we arrange in advance." },
      { title: "Monasteries of Gangtok", body: "Rumtek Monastery, the Namgyal Institute of Tibetology and the city viewpoints." },
      { title: "West to Pelling", body: "About five hours through forests and small villages to a ridge facing Kanchenjunga." },
      { title: "Around Pelling", body: "Pemayangtse Monastery, the ruins of Rabdentse and the Pelling skywalk." },
      { title: "Departure", body: "About six to seven hours by road to Bagdogra or New Jalpaiguri. Plan on an evening flight or train." },
    ],
    note: "Foreign nationals need a Restricted Area Permit for Sikkim, and Tsomgo Lake needs a separate permit for everyone. Hill roads can close after heavy rain, so please keep a little flexibility in your plans.",
  },
  {
    slug: "meghalaya-and-kaziranga",
    title: "Root Bridges and Rhinos",
    tagline: "The wettest hills in India, then the great one-horned rhino of Assam.",
    region: "east",
    states: "Meghalaya, Assam",
    route: ["Shillong", "Sohra", "Dawki", "Kaziranga"],
    nights: 6,
    days: 7,
    months: [10, 11, 12, 1, 2, 3, 4],
    pace: "Active",
    goodFor: ["Adventure", "Nature lovers", "Friends"],
    cover: "root-bridge",
    gallery: ["nohkalikai", "rhino"],
    story:
      "The Northeast still feels like a discovery. In Meghalaya, Khasi villagers have grown bridges from living tree roots over generations, and rivers run so clear that boats seem to float on air. Then you drop to the plains of Assam, where the grasslands of Kaziranga hold the largest population of one-horned rhinoceros in the world.",
    highlights: [
      "The double-decker root bridge at Nongriat",
      "Nohkalikai Falls and the caves around Sohra",
      "The clear water of the Umngot at Dawki",
      "Mawlynnong village",
      "Jeep safaris for rhino at Kaziranga",
    ],
    itinerary: [
      { title: "Guwahati to Shillong", body: "About three and a half hours from Guwahati, stopping at Umiam Lake on the way." },
      { title: "To Sohra", body: "Drive to Sohra, also called Cherrapunji, with stops at Nohkalikai Falls, Mawsmai Cave and the Seven Sisters Falls." },
      { title: "The root bridges", body: "The long stairway down to the double-decker bridge at Nongriat, with a swim in the pools if you like, and the climb back." },
      { title: "Mawlynnong and Dawki", body: "Visit Mawlynnong village, see the single root bridge at Riwai, and take a boat on the Umngot at Dawki before returning to Shillong." },
      { title: "Down to Assam", body: "About six to seven hours from the hills to the edge of Kaziranga National Park." },
      { title: "Kaziranga", body: "Morning and afternoon jeep safaris through the grasslands for rhino, wild buffalo and birdlife." },
      { title: "Back to Guwahati", body: "About four and a half hours to Guwahati, stopping at Kamakhya Temple if time allows, then your flight or train." },
    ],
    note: "The walk to Nongriat is around 3,000 steps down and the same back up. If that is too much, Riwai has a root bridge you can reach easily. Kaziranga usually closes from May to October.",
  },
  {
    slug: "andaman-three-islands",
    title: "Andaman, Three Islands",
    tagline: "Coral water, white beaches and a piece of India's freedom story.",
    region: "islands",
    states: "Andaman & Nicobar Islands",
    route: ["Sri Vijaya Puram", "Swaraj Dweep", "Shaheed Dweep"],
    nights: 5,
    days: 6,
    months: [10, 11, 12, 1, 2, 3, 4, 5],
    pace: "Easy",
    goodFor: ["Honeymoon", "Families", "Divers and snorkellers"],
    cover: "radhanagar",
    gallery: ["havelock-huts"],
    story:
      "The Andamans sit far out in the Bay of Bengal, closer to Myanmar than to mainland India, and they feel that way. You will see tall forest coming down to white sand, clear warm water over coral, and very little else. The trip starts at the Cellular Jail in Sri Vijaya Puram, then takes the ferry to Swaraj Dweep, still widely known as Havelock, and quieter Shaheed Dweep, or Neil.",
    highlights: [
      "Radhanagar Beach at sunset",
      "Snorkelling at Elephant Beach",
      "The Cellular Jail and its evening light and sound show",
      "The natural rock bridge on Shaheed Dweep",
      "Inter-island ferries across the blue",
    ],
    itinerary: [
      { title: "Arrive in Sri Vijaya Puram", body: "Formerly Port Blair. Visit the Cellular Jail in the afternoon and stay for the light and sound show." },
      { title: "To Swaraj Dweep", body: "A morning ferry of about two hours to Havelock, then sunset at Radhanagar Beach." },
      { title: "Elephant Beach", body: "A boat to Elephant Beach for snorkelling, or arrange a discovery scuba dive with a local dive school." },
      { title: "To Shaheed Dweep", body: "A short ferry to Neil. Sunset at Laxmanpur Beach and a walk along the shore." },
      { title: "Back to the capital", body: "See the natural rock bridge and Bharatpur Beach in the morning, then ferry back to Sri Vijaya Puram." },
      { title: "Departure", body: "Transfer to the airport. Flights connect through Chennai, Kolkata and other mainland cities." },
    ],
    note: "Ferries and water activities depend on the weather and can change at short notice, so we suggest a late-morning or afternoon flight home. Carry a government photo ID at all times.",
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function regionName(id: RegionId) {
  return regions.find((r) => r.id === id)?.name ?? "";
}

export function durationLabel(p: Pick<Package, "nights" | "days">) {
  return `${p.nights} nights, ${p.days} days`;
}

export function priceLabel(p: Pick<Package, "priceFrom">) {
  return p.priceFrom
    ? `From ₹${p.priceFrom.toLocaleString("en-IN")} per person`
    : "Quote on request";
}

export const lengthFilters = [
  { id: "short", label: "Up to 6 days", match: (days: number) => days <= 6 },
  { id: "week", label: "7 to 8 days", match: (days: number) => days >= 7 && days <= 8 },
  { id: "long", label: "9 days or more", match: (days: number) => days >= 9 },
];
