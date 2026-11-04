import type { PhotoKey } from "@/data/photos";

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  place: string;
  cover: PhotoKey;
  facts: { label: string; value: string }[];
  intro: string;
  sections: { heading: string; body: string[]; tips?: string[] }[];
  packages: string[];
};

export const guides: Guide[] = [
  {
    slug: "varkala-guide",
    title: "Varkala: the guide we give our friends",
    dek: "Where to walk, when to swim and what most visitors miss on the cliffs we call home.",
    place: "Kerala",
    cover: "varkala-shore",
    facts: [
      { label: "Best time", value: "October to March" },
      { label: "Getting there", value: "Thiruvananthapuram airport, about an hour by road, or Varkala Sivagiri station" },
      { label: "Stay for", value: "3 to 5 nights" },
    ],
    intro:
      "Most of Kerala's coast is flat, which is why Varkala comes as a surprise. Here the land rises into red laterite cliffs, with the Arabian Sea breaking below and a footpath running along the top. It is both a pilgrim town and a traveller's hangout, and the two get along better than you might expect.",
    sections: [
      {
        heading: "Finding your way around",
        body: [
          "The cliff path is the heart of Varkala. The North Cliff is the busiest stretch, lined with cafes, guesthouses and shops. Steps lead down to Papanasam Beach, and past it the South Cliff is calmer and closer to the old temple.",
          "Walk north from the busy section and things quieten down fast. The Black Beach, named for its dark mineral sand, is usually less crowded, and Odayam and Edava beyond it are quieter still.",
        ],
      },
      {
        heading: "What to see",
        body: [
          "Papanasam Beach takes its name from the belief that its waters wash away sins, and in the mornings you will see families performing rites for their ancestors. Please give them space, and keep your camera down. The Janardhana Swamy Temple stands just inland and is the town's old centre.",
          "Sivagiri, the ashram of the social reformer Sree Narayana Guru, is a short trip inland and draws pilgrims from across Kerala. For a change of scene, head north to Kappil, where a narrow sandbar separates the backwater from the sea, or take a country boat around the small island of Ponnumthuruthu.",
        ],
      },
      {
        heading: "Staying safe on the cliff and in the sea",
        body: [
          "The sea here is powerful, even when it looks calm. The cliff path also has unfenced stretches, and the lighting is patchy once you leave the main section.",
        ],
        tips: [
          "Swim only where lifeguards are on duty, and stay between their flags.",
          "Stay out of the water in the monsoon months.",
          "Carry a torch or phone light if you walk the cliff after dark.",
          "Dress modestly near the temple and in town, even if the cliff feels relaxed.",
        ],
      },
      {
        heading: "When to come",
        body: [
          "October to March is the classic season, with blue skies and calm evenings. April and May get hot and humid. From June to September the monsoon arrives, many cliff cafes close, and the sea turns rough. It is also when Kerala is at its greenest, and a traditional time for Ayurvedic treatments, so it is not without appeal if you want quiet.",
        ],
      },
    ],
    packages: ["slow-days-on-the-varkala-cliff", "kerala-cliff-to-tea-hill"],
  },
  {
    slug: "choosing-a-kerala-houseboat",
    title: "How to choose a Kerala houseboat",
    dek: "Alappuzha or Kumarakom, one night or two, and the questions to ask before you book.",
    place: "Kerala",
    cover: "houseboat",
    facts: [
      { label: "Best time", value: "September to March" },
      { label: "Where", value: "Alappuzha or Kumarakom" },
      { label: "Stay for", value: "One night suits most people" },
    ],
    intro:
      "A night on a kettuvallam is one of the best-known experiences in India, and also one of the easiest to get wrong. Boats vary enormously, and photographs do not tell you everything. Here is what actually makes the difference.",
    sections: [
      {
        heading: "What a kettuvallam is",
        body: [
          "These boats were once rice barges, built from wood planks tied together with coir rope rather than nails. That is where the name comes from: in Malayalam, kettu means tied and vallam means boat. Today they carry bedrooms, a deck and a kitchen, and a crew of two or three cooks and steers for you.",
        ],
      },
      {
        heading: "Alappuzha or Kumarakom?",
        body: [
          "Alappuzha, or Alleppey, has the most boats and the widest network of canals, plus easy access from the main road and rail line. In peak season the water near the main jetty can get busy, but the narrow side canals are worth the trip.",
          "Kumarakom sits on the eastern shore of Vembanad Lake. It is smaller, quieter and known for its lake resorts and birdlife. If you would like a slower, more upscale stay, it is a good choice. If you want village life along the canals, Alappuzha usually wins.",
        ],
      },
      {
        heading: "How the day works",
        body: [
          "Most overnight cruises board around noon. You cruise through the afternoon, then the boat moors in the early evening, as local rules stop cruising after dark. You disembark the next morning, usually by about nine. So an overnight trip is less than a day on the water, and one night is enough for most people. A day cruise is a good choice if you are short of time.",
        ],
      },
      {
        heading: "What to ask before booking",
        body: ["Two boats at the same price can feel very different. These are the questions we ask on your behalf."],
        tips: [
          "When does the air conditioning run? On many boats it is only on at night.",
          "Is the boat private, and how many bedrooms does it have?",
          "Is the upper deck open or covered, and is it shared?",
          "What meals are included, and can they cook vegetarian or for children?",
          "How old is the boat, and when was it last refitted?",
        ],
      },
      {
        heading: "When to go",
        body: [
          "November to February has the most pleasant weather. Christmas and New Year are the busiest and most expensive weeks of the year, so book as early as you can. The monsoon brings lower prices and lush scenery, and the famous snake boat races take place in the wet season, with the Nehru Trophy on Punnamada Lake being the best known.",
        ],
      },
    ],
    packages: ["kerala-cliff-to-tea-hill"],
  },
  {
    slug: "india-month-by-month",
    title: "India, month by month",
    dek: "It is always a good time to be somewhere in India. Here is how to work out where.",
    place: "All India",
    cover: "munnar-rays",
    facts: [
      { label: "Peak season", value: "October to March for most of the country" },
      { label: "Himalayan season", value: "May to September" },
      { label: "Book early for", value: "Christmas, New Year and Diwali" },
    ],
    intro:
      "India is a country of three great seasons, and they do not arrive everywhere at once. While Rajasthan bakes in May, Sikkim is full of rhododendrons. While Kerala is drenched in July, Ladakh is at its best. The trick is to choose the place to suit the month, not the other way round.",
    sections: [
      {
        heading: "October to March: plains, deserts and the south",
        body: [
          "This is the main season for most of India. The monsoon has cleared, the air is cool and dry, and Rajasthan, the Golden Triangle, Varanasi, Goa, Kerala and Tamil Nadu are all at their most comfortable. The Andamans are calm too.",
          "December and January can bring dense fog to the northern plains, which sometimes delays flights and trains and can hide the Taj Mahal in the early morning. Leave some slack in your schedule.",
        ],
      },
      {
        heading: "December to February: snow",
        body: [
          "If you are hoping for snow, this is your window. Gulmarg, Manali and the higher parts of Himachal are all good bets, but some mountain roads close, and Ladakh is extremely cold. In the south, this is simply the finest weather of the year.",
        ],
      },
      {
        heading: "March to June: head for the hills",
        body: [
          "From April the plains heat up fast. This is when Indian families head for the hills, so Shimla, Manali, Munnar, Darjeeling and Sikkim are all at their best, and also at their busiest. School holidays in May and June fill hotels quickly. Kashmir's valleys are green and bright from April onward.",
        ],
      },
      {
        heading: "June to September: the monsoon",
        body: [
          "The monsoon reaches Kerala around the start of June and spreads north. Beaches go quiet and some islands and national parks close, but Kerala and the Western Ghats turn a deep green.",
          "This is high season for the Himalayan rain shadow. Ladakh sits beyond the reach of the monsoon, and its roads and passes are fully open. Kashmir is also a good choice. Elsewhere in the hills, watch for landslides.",
        ],
      },
      {
        heading: "Festivals worth planning around",
        body: [
          "A festival can be the best part of a trip, or the reason you cannot find a room. Dates for most of these follow the lunar calendar and shift a little each year.",
        ],
        tips: [
          "Holi, in March: colour across North India, especially Mathura, Vrindavan and Jaipur.",
          "Onam, in August or September: Kerala's harvest festival, with feasts and boat races.",
          "Dussehra, in September or October: the Mysuru celebrations are especially grand.",
          "Diwali, in October or November: lamps everywhere, and heavy travel demand.",
          "Pushkar Camel Fair, around November: a huge gathering in the Rajasthan desert.",
        ],
      },
    ],
    packages: ["kerala-cliff-to-tea-hill", "ladakh-the-high-road", "the-golden-triangle"],
  },
  {
    slug: "golden-triangle-first-timers",
    title: "The Golden Triangle for first-timers",
    dek: "How to see Delhi, Agra and Jaipur without the queues, and what we would do differently.",
    place: "North India",
    cover: "taj-reflection",
    facts: [
      { label: "Best time", value: "October to March" },
      { label: "Stay for", value: "5 to 7 days" },
      { label: "Remember", value: "The Taj is closed on Fridays" },
    ],
    intro:
      "Delhi, Agra and Jaipur make a neat triangle on the map, joined by fast expressways. It is the natural first trip for many visitors, and it is easy to do badly: rushed, hot and queuing. A few small decisions make the difference.",
    sections: [
      {
        heading: "Choosing the order",
        body: [
          "The usual loop runs Delhi, Agra, Jaipur, then back to Delhi. The most important thing is to make sure your day in Agra is not a Friday, when the Taj Mahal is closed. The Red Fort in Delhi closes on Mondays, so plan around that too.",
          "If you are also going further into Rajasthan, you need not come back to Delhi at all. You can fly home from Jaipur, Jodhpur or Udaipur.",
        ],
      },
      {
        heading: "Seeing the Taj well",
        body: [
          "Go at sunrise. The gates open before the sun comes up, the light on the marble changes by the minute, and the crowds are at their thinnest. Then return in the evening to Mehtab Bagh, the garden across the Yamuna, for the view from behind.",
        ],
        tips: [
          "Take as little as possible, since large bags and many items are not allowed inside.",
          "Book tickets online in advance, including the separate mausoleum entry if you want to go inside.",
          "On a foggy winter morning, the view may take a while to appear. Be patient.",
        ],
      },
      {
        heading: "Delhi in two days",
        body: [
          "Divide the city in two. Spend one morning in Old Delhi for Jama Masjid, Chandni Chowk and its food, and another among the great tombs and gardens, with Humayun's Tomb and the Qutub Minar. Delhi's metro is clean and fast, and often better than sitting in traffic.",
        ],
      },
      {
        heading: "Jaipur beyond the pictures",
        body: [
          "Go to Amber Fort as early as you can, before the sun and tour buses arrive. Then spend your afternoon in the old city. The Hawa Mahal is at its best in early morning light, the Jantar Mantar is more interesting with a guide, and the bazaars around Johari Bazaar are best in the cool of the evening.",
        ],
      },
    ],
    packages: ["the-golden-triangle", "four-colours-of-rajasthan"],
  },
  {
    slug: "ladakh-altitude-guide",
    title: "Ladakh without the headache",
    dek: "Altitude, season, phones and cash: what to know before you fly to Leh.",
    place: "Ladakh",
    cover: "nubra-dunes",
    facts: [
      { label: "Best time", value: "May to September" },
      { label: "Altitude", value: "Leh is at about 3,500 metres" },
      { label: "Stay for", value: "At least 7 days" },
    ],
    intro:
      "Ladakh is one of the great journeys in India, but it is the one place on this site where your health truly shapes the plan. Fly to Leh and you land at about 3,500 metres with no time to adjust. A careful start is what separates a wonderful trip from a miserable one.",
    sections: [
      {
        heading: "The first 48 hours",
        body: [
          "On your first day, do almost nothing. Most people feel some breathlessness, and many have a headache. Give your body time to adapt: stay in, sleep, and drink plenty of water. Skip alcohol and hard exertion. On the second day, take a short, easy walk.",
          "Talk to your doctor before you travel, especially if you have a heart or lung condition, are pregnant, or are travelling with young children. Ask whether medicine for altitude sickness is right for you. If symptoms get worse rather than better, tell someone straight away. The only real cure is to go lower.",
        ],
      },
      {
        heading: "Why the order of places matters",
        body: [
          "A good Ladakh route climbs slowly. Spend your early days around Leh and the Indus Valley before crossing the high passes. Khardung La, on the way to Nubra, is well above 5,000 metres, so we limit time at the top. Nubra itself is lower than Leh, which makes it a good next step before Pangong Tso, which sits at about 4,200 metres.",
        ],
      },
      {
        heading: "Phones, cash and permits",
        body: ["Ladakh runs a little differently from the rest of India, and small things can catch you out."],
        tips: [
          "Most prepaid SIMs from other states do not work here. Bring a postpaid connection.",
          "Mobile coverage fades quickly outside Leh.",
          "Carry cash. ATMs are mostly in Leh, and can run out.",
          "Permit rules for Nubra and Pangong change, so we confirm them for your dates. Keep several copies of your photo ID.",
        ],
      },
      {
        heading: "Which month?",
        body: [
          "From May, flights are busy, and there can still be snow on the passes, which makes for dramatic pictures. July and August are the warmest months, and everything is open. September is quieter, with golden trees along the Indus and clear skies. Nights are cold at Pangong in every month, so pack warm layers even for a summer trip.",
        ],
      },
    ],
    packages: ["ladakh-the-high-road"],
  },
  {
    slug: "planning-a-rajasthan-route",
    title: "How to plan a Rajasthan route",
    dek: "Five days, a week or ten: which cities to pick, and which to save for next time.",
    place: "Rajasthan",
    cover: "udaipur-palace",
    facts: [
      { label: "Best time", value: "October to March" },
      { label: "Stay for", value: "5 to 10 days" },
      { label: "Road days", value: "Often 5 to 6 hours between cities" },
    ],
    intro:
      "Rajasthan is the size of a small country, and that is the thing most first plans get wrong. Between cities, the drives are long, and it is tempting to fit in too many. Here is how we think about it.",
    sections: [
      {
        heading: "Know the four main cities",
        body: [
          "Jaipur is the busiest and easiest to reach, with Amber Fort, palaces and the best shopping. Jodhpur has Mehrangarh, perhaps the most impressive fort of them all, above its blue houses. Jaisalmer is the far-flung desert city, built of golden sandstone. Udaipur is the romantic one, a lake city of white palaces.",
        ],
      },
      {
        heading: "Choosing by length of trip",
        body: ["As a rule of thumb, we plan for two nights in each place, and we do not recommend adding a city unless you can give it that."],
        tips: [
          "5 days: Jaipur and Udaipur, connected by a short flight.",
          "7 days: Jaipur, Jodhpur and Udaipur, stopping at Ranakpur on the way.",
          "10 days: all four, with a night in the desert.",
          "Extra time: add Pushkar, Bundi or the tiger reserve at Ranthambore.",
        ],
      },
      {
        heading: "Sleeping in the desert",
        body: [
          "Camps near the Sam dunes outside Jaisalmer range from simple tents to full-service luxury. Sunset on the dunes is the highlight. Nights get surprisingly cold from December to February, so check that your camp provides good bedding. If you prefer peace, ask about camps away from the main strip, which can be loud in peak season.",
        ],
      },
      {
        heading: "Pacing your days",
        body: [
          "Reach forts early, before the sun and the coach groups. Save the bazaars for late afternoon and evening, when the old cities come alive. Even in winter, the midday sun is strong, so use the middle of the day for lunch, a rest or a haveli courtyard. Avoid April to June if you can, when the temperature regularly climbs well above 40 degrees.",
        ],
      },
    ],
    packages: ["four-colours-of-rajasthan", "the-golden-triangle"],
  },
  {
    slug: "andaman-island-hopping",
    title: "Island hopping in the Andamans",
    dek: "New names, ferry timings and the beaches worth building your trip around.",
    place: "Andaman Islands",
    cover: "radhanagar",
    facts: [
      { label: "Best time", value: "October to May" },
      { label: "Getting there", value: "Fly to Sri Vijaya Puram via a mainland city" },
      { label: "Stay for", value: "5 to 7 nights" },
    ],
    intro:
      "The Andamans lie more than a thousand kilometres east of the Indian mainland, and getting between them takes some thought. The islands themselves are simple and very beautiful. The planning is what needs attention.",
    sections: [
      {
        heading: "The new names",
        body: [
          "You will see two sets of names on tickets and maps, so it helps to know both. Port Blair is now Sri Vijaya Puram, Havelock is Swaraj Dweep, Neil is Shaheed Dweep, and Ross Island is Netaji Subhas Chandra Bose Dweep. Most people, including ferry staff, still use the old names in conversation.",
        ],
      },
      {
        heading: "Ferries, and why timing matters",
        body: [
          "Private catamarans link Sri Vijaya Puram with Havelock and Neil, and government ferries run the same routes more cheaply. Seats on the best departures sell out in season, so we book as soon as your dates are fixed.",
          "Sailings can be cancelled in rough weather. Do not plan to come back from Havelock on the same morning as your flight home.",
        ],
      },
      {
        heading: "Choosing your beaches",
        body: [
          "Radhanagar Beach on Havelock is the star, with wide white sand and forest at its back, and it is at its best at sunset. Elephant Beach, reached by boat, is the easiest place for snorkelling. On Neil, Laxmanpur is the sunset beach, and Bharatpur is a short walk from the jetty, with calm, shallow water for children.",
        ],
      },
      {
        heading: "Before you go",
        body: ["The islands are remote, so a little preparation helps."],
        tips: [
          "Carry some cash, because ATMs can be unreliable on the smaller islands.",
          "Expect patchy mobile data. Download tickets and maps in advance.",
          "Never touch coral or take shells or coral home. It harms the reef and is against the law.",
          "Foreign nationals should check the current permit rules before booking.",
        ],
      },
    ],
    packages: ["andaman-three-islands"],
  },
  {
    slug: "meghalaya-root-bridges",
    title: "Walking to Meghalaya's living root bridges",
    dek: "Which bridge to see, how hard the walk really is, and when the rivers run clear.",
    place: "Meghalaya",
    cover: "root-bridge",
    facts: [
      { label: "Best time", value: "October to April" },
      { label: "Getting there", value: "Fly to Guwahati, then drive to Shillong and Sohra" },
      { label: "Stay for", value: "4 to 5 nights in the hills" },
    ],
    intro:
      "In the wet southern valleys of Meghalaya, Khasi villagers have long had a clever answer to rivers that wash away wooden bridges: they grow them. Over many years, the roots of rubber fig trees are guided across the water until they form a living span. Some of these bridges are thought to be centuries old, and they grow stronger with age.",
    sections: [
      {
        heading: "Which bridge should you visit?",
        body: [
          "The famous one is the double-decker bridge at Nongriat, two root bridges stacked one above the other. It is well worth the effort, but it does take effort.",
          "If long stairways are not for you, the single bridge at Riwai, close to Mawlynnong village, can be reached with a short walk. It is a good choice for older travellers or families with small children.",
        ],
      },
      {
        heading: "How hard is the walk to Nongriat?",
        body: [
          "The walk begins at Tyrna, near Sohra, and goes down around 3,000 steps, passing through villages and across wire bridges. What goes down must come back up, and in the humidity the climb is genuinely tiring.",
        ],
        tips: [
          "Start early, ideally before nine.",
          "Wear shoes with good grip, as stone steps stay wet.",
          "Pack water and a light rain jacket.",
          "Consider a night in a Nongriat homestay. It splits the climb and gives you the valley to yourself in the evening.",
        ],
      },
      {
        heading: "When to go",
        body: [
          "Sohra, or Cherrapunji, is among the wettest places on Earth. From June to September, the rain is extraordinary and the waterfalls are at full power, but the steps are slippery and the views often disappear in cloud.",
          "October to April is more comfortable. For the famous clear water of the Umngot at Dawki, come between about November and April. In the rains the river turns murky.",
        ],
      },
      {
        heading: "Travelling with respect",
        body: [
          "These bridges are not tourist attractions so much as working parts of village life, and the people who look after them are the same people who use them. Pay local fees, stay on the path, take your rubbish back with you, and ask before photographing people.",
        ],
      },
    ],
    packages: ["meghalaya-and-kaziranga"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function readingMinutes(guide: Guide) {
  const text = [
    guide.intro,
    ...guide.sections.flatMap((s) => [...s.body, ...(s.tips ?? [])]),
  ].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}
