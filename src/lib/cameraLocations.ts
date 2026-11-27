import type { CameraLocation } from "@/types/camera.types";

/**
 * Traffic cameras from https://ristmikud.tallinn.ee/index.php/cams.
 *
 * The source lists camera names only, so coordinates are intersection
 * centres derived from OpenStreetMap. Junctions closer than ~50 m share
 * one location to keep their map icons from overlapping.
 */
export const CAMERA_LOCATIONS: CameraLocation[] = [
  {
    id: "viru-valjak",
    name: "Viru väljak",
    coordinates: [24.75414, 59.43703],
    cameras: [
      {
        id: "cam103",
        name: "Viru väljak (suund Mere pst ja Narva mnt)",
      },
      {
        id: "cam104",
        name: "Viru väljak (suund Pärnu mnt)",
      },
    ],
  },
  {
    id: "estonia-teatri-valjak",
    name: "Estonia pst – Teatri väljak",
    coordinates: [24.75134, 59.43435],
    cameras: [
      {
        id: "cam001",
        name: "Estonia pst – Teatri väljak (suund Tammsaare park)",
      },
      {
        id: "cam002",
        name: "Estonia pst – Teatri väljak (suund Reaalkool)",
      },
    ],
  },
  {
    id: "parnu-draamateater",
    name: "Pärnu mnt – Draamateater",
    coordinates: [24.74862, 59.43503],
    cameras: [
      {
        id: "cam056",
        name: "Pärnu mnt – Draamateater (suund Viru ring)",
      },
      {
        id: "cam057",
        name: "Pärnu mnt – Draamateater (suund G. Otsa)",
      },
      {
        id: "cam055",
        name: "Pärnu mnt – Draamateater (suund Pärnu)",
      },
    ],
  },
  {
    id: "vabaduse-valjak",
    name: "Vabaduse väljak – Estonia pst",
    coordinates: [24.7459, 59.43297],
    cameras: [
      {
        id: "cam065",
        name: "Vabaduse väljak",
      },
      {
        id: "cam066",
        name: "Estonia pst – Pärnu mnt",
      },
    ],
  },
  {
    id: "parnu-liivalaia",
    name: "Pärnu mnt – Liivalaia tn",
    coordinates: [24.7426, 59.42724],
    cameras: [
      {
        id: "cam069",
        name: "Pärnu mnt (suund Pärnu) – Liivalaia tn",
      },
      {
        id: "cam070",
        name: 'Pärnu mnt (suund "Kosmos") – Liivalaia tn',
      },
      {
        id: "cam125",
        name: "Pärnu mnt – Suur-Ameerika tn",
      },
    ],
  },
  {
    id: "parnu-vineeri",
    name: "Pärnu mnt – Vineeri tn",
    coordinates: [24.74279, 59.42309],
    cameras: [
      {
        id: "cam229",
        name: 'Pärnu mnt (suund "Kosmos") – Vineeri tn',
      },
      {
        id: "cam228",
        name: "Pärnu mnt (suund Pärnu) – Vineeri tn",
      },
    ],
  },
  {
    id: "narva-hobujaama-laikmaa",
    name: "Narva mnt – Hobujaama tn / A. Laikmaa tn",
    coordinates: [24.75728, 59.43723],
    cameras: [
      {
        id: "cam251",
        name: "Narva mnt – Hobujaama tn",
      },
      {
        id: "cam250",
        name: "Narva mnt – A. Laikmaa tn",
      },
    ],
  },
  {
    id: "gonsiori-laikmaa",
    name: "Estonia pst / Gonsiori tn – A. Laikmaa tn",
    coordinates: [24.7571, 59.43553],
    cameras: [
      {
        id: "cam247",
        name: "Estonia pst – A. Laikmaa tn",
      },
      {
        id: "cam248",
        name: "Gonsiori tn – A. Laikmaa tn",
      },
    ],
  },
  {
    id: "narva-pronksi-joe",
    name: "Narva mnt – Pronksi tn / Jõe tn",
    coordinates: [24.76461, 59.4374],
    cameras: [
      {
        id: "cam076",
        name: "Narva mnt – Pronksi tn",
      },
      {
        id: "cam077",
        name: "Narva mnt – Jõe tn",
      },
    ],
  },
  {
    id: "narva-petrooleumi-vilmsi",
    name: "Narva mnt – Petrooleumi tn – Vilmsi tn",
    coordinates: [24.7749, 59.43897],
    cameras: [
      {
        id: "cam126",
        name: "Narva mnt – Petrooleumi tn – Vilmsi tn (suund Petrooleumi)",
      },
      {
        id: "cam127",
        name: "Narva mnt – Petrooleumi tn – Vilmsi tn (suund kesklinn)",
      },
      {
        id: "cam128",
        name: "Narva mnt – Petrooleumi tn – Vilmsi tn (suund Pirita)",
      },
    ],
  },
  {
    id: "narva-poska",
    name: "Narva mnt – Poska tn",
    coordinates: [24.78565, 59.44055],
    cameras: [
      {
        id: "cam004",
        name: "Narva mnt – Poska tn (suund Pirita)",
      },
    ],
  },
  // Paldiski mnt corridor: Toompuiestee out to Tähetorni and Tabasalu.
  {
    id: "toompuiestee-nunne",
    name: "Toompuiestee – Nunne tn",
    coordinates: [24.739, 59.44009],
    cameras: [
      {
        id: "cam212",
        name: "Toompuiestee – Nunne tn (suund Balti jaam)",
      },
      {
        id: "cam211",
        name: "Toompuiestee – Nunne tn (suund sadam)",
      },
    ],
  },
  {
    id: "toompuiestee-tehnika",
    name: "Toompuiestee – Tehnika tn",
    coordinates: [24.7328, 59.4365],
    cameras: [
      {
        id: "cam061",
        name: "Toompuiestee – Tehnika tn",
      },
      {
        id: "cam062",
        name: "Toompuiestee – Tehnika tn (suund Balti jaam)",
      },
    ],
  },
  {
    id: "toompuiestee-paldiski",
    name: "Toompuiestee – Paldiski mnt",
    coordinates: [24.73287, 59.43489],
    cameras: [
      {
        id: "cam210",
        name: "Toompuiestee – Paldiski mnt",
      },
    ],
  },
  {
    id: "paldiski-tehnika",
    name: "Paldiski mnt – Tehnika tn",
    coordinates: [24.72416, 59.43445],
    cameras: [
      {
        id: "cam213",
        name: "Paldiski mnt – Tehnika tn (suund kesklinn)",
      },
    ],
  },
  {
    id: "paldiski-ristiku",
    name: "Paldiski mnt – Ristiku tn",
    coordinates: [24.72236, 59.43401],
    cameras: [
      {
        id: "cam215",
        name: "Paldiski mnt – Ristiku tn (suund Ristiku)",
      },
      {
        id: "cam214",
        name: "Paldiski mnt – Ristiku tn (suund Mustamäe)",
      },
    ],
  },
  {
    id: "paldiski-tulika-sole",
    name: "Paldiski mnt – Tulika tn / Sõle tn",
    coordinates: [24.71622, 59.43268],
    cameras: [
      {
        id: "cam063",
        name: "Paldiski mnt – Tulika tn",
      },
      {
        id: "cam064",
        name: "Paldiski mnt – Sõle tn",
      },
    ],
  },
  {
    id: "paldiski-endla",
    name: "Paldiski mnt – Endla tn",
    coordinates: [24.70504, 59.42922],
    cameras: [
      {
        id: "cam035",
        name: "Paldiski mnt – Endla tn (suund Mustamäe, Õismäe)",
      },
      {
        id: "cam036",
        name: "Paldiski mnt – Endla tn (suund kesklinn)",
      },
    ],
  },
  {
    id: "paldiski-moisa",
    name: "Paldiski mnt – Mõisa tn",
    coordinates: [24.65652, 59.42598],
    cameras: [
      {
        id: "cam119",
        name: "Paldiski mnt – Mõisa tn (suund kesklinn)",
      },
      {
        id: "cam120",
        name: "Paldiski mnt – Mõisa tn (suund Õismäe)",
      },
    ],
  },
  {
    id: "paldiski-rannamoisa",
    name: "Paldiski mnt – Rannamõisa tee",
    coordinates: [24.6462, 59.42316],
    cameras: [
      {
        id: "cam218",
        name: "Paldiski mnt – Rannamõisa tee (suund Ehitajate tee)",
      },
      {
        id: "cam219",
        name: "Paldiski mnt – Rannamõisa tee (suund kesklinn)",
      },
      {
        id: "cam220",
        name: "Paldiski mnt – Rannamõisa tee (suund Keila)",
      },
    ],
  },
  {
    id: "paldiski-k-rauta",
    name: "Paldiski mnt – K-Rauta ristmik",
    coordinates: [24.64186, 59.42111],
    cameras: [
      {
        id: "cam221",
        name: "Paldiski mnt – K-Rauta ristmik (suund kesklinn)",
      },
    ],
  },
  {
    id: "rannamoisa-louka",
    name: "Rannamõisa tee – Lõuka tn",
    coordinates: [24.6314, 59.42674],
    cameras: [
      {
        id: "cam222",
        name: "Rannamõisa tee – Lõuka tn (suund kesklinn)",
      },
      {
        id: "cam223",
        name: "Rannamõisa tee – Lõuka tn (suund Tabasalu)",
      },
    ],
  },
  {
    id: "rannamoisa-pikaliiva",
    name: "Rannamõisa tee – Pikaliiva tn",
    coordinates: [24.61937, 59.42902],
    cameras: [
      {
        id: "cam226",
        name: "Rannamõisa tee – Pikaliiva tn (suund Tabasalu)",
      },
      {
        id: "cam227",
        name: "Rannamõisa tee – Pikaliiva tn (suund Õismägi)",
      },
    ],
  },
  {
    id: "paldiski-oismae",
    name: "Paldiski mnt – Õismäe tee",
    coordinates: [24.63396, 59.41356],
    cameras: [
      {
        id: "cam028",
        name: "Paldiski mnt – Õismäe tee (Harku järve JKÜ)",
      },
    ],
  },
  {
    id: "paldiski-jarveotsa",
    name: "Paldiski mnt – Järveotsa tee",
    coordinates: [24.63146, 59.40993],
    cameras: [
      {
        id: "cam010",
        name: "Paldiski mnt – Järveotsa tee (suund Keila)",
      },
      {
        id: "cam011",
        name: "Paldiski mnt – Järveotsa tee (suund kesklinn)",
      },
    ],
  },
  {
    id: "paldiski-jarvekalda",
    name: "Paldiski mnt – Järvekalda tee",
    coordinates: [24.61906, 59.40711],
    cameras: [
      {
        id: "cam012",
        name: "Paldiski mnt – Järvekalda tee (suund Keila)",
      },
      {
        id: "cam013",
        name: "Paldiski mnt – Järvekalda tee (suund kesklinn)",
      },
    ],
  },
  {
    id: "paldiski-tahetorni",
    name: "Paldiski mnt – Tähetorni tee",
    coordinates: [24.59424, 59.39543],
    cameras: [
      {
        id: "cam162",
        name: "Paldiski mnt – Tähetorni tee (suund kesklinn)",
      },
      {
        id: "cam163",
        name: "Paldiski mnt – Tähetorni tee (suund Keila)",
      },
    ],
  },
  {
    id: "akadeemia-jarveotsa",
    name: "Akadeemia tee – Järveotsa tee",
    coordinates: [24.64811, 59.40789],
    cameras: [
      {
        id: "cam202",
        name: "Akadeemia tee – Järveotsa tee (suund Järveotsa tee)",
      },
      {
        id: "cam203",
        name: "Akadeemia tee – Järveotsa tee (suund Pöörise tn)",
      },
    ],
  },
  // Port area: Mere pst, Põhja pst and the streets around the harbour.
  {
    id: "ahtri-hobujaama",
    name: "Ahtri tn – Hobujaama tn",
    coordinates: [24.75908, 59.43953],
    cameras: [
      {
        id: "cam252",
        name: "Ahtri tn – Hobujaama tn (suund Mere pst)",
      },
    ],
  },
  {
    id: "ahtri-laeva",
    name: "Ahtri tn – Laeva tn",
    coordinates: [24.75571, 59.44077],
    cameras: [
      {
        id: "cam253",
        name: "Ahtri tn – Laeva tn (suund Mere pst)",
      },
    ],
  },
  {
    id: "mere-ahtri",
    name: "Mere pst – Ahtri tn",
    coordinates: [24.7536, 59.44113],
    cameras: [
      {
        id: "cam110",
        name: "Mere pst – Ahtri tn (suund Ahtri)",
      },
      {
        id: "cam111",
        name: "Mere pst (suund Kopli) – Ahtri tn",
      },
    ],
  },
  {
    id: "mere-sadama",
    name: "Mere pst – Sadama tn",
    coordinates: [24.75299, 59.44341],
    cameras: [
      {
        id: "cam143",
        name: "Mere pst – Sadama tn",
      },
      {
        id: "cam259",
        name: "Mere pst – Sadama tn (suund Kopli)",
      },
      {
        id: "cam260",
        name: "Mere pst – Sadama tn (suund Ahtri tn)",
      },
    ],
  },
  {
    id: "pohja-kursi",
    name: "Põhja pst – Kursi tn",
    coordinates: [24.75176, 59.44373],
    cameras: [
      {
        id: "cam258",
        name: "Põhja pst – Kursi tn (suund Kopli)",
      },
    ],
  },
  {
    id: "pohja-kalasadama",
    name: "Põhja pst – Kalasadama tn",
    coordinates: [24.74782, 59.44417],
    cameras: [
      {
        id: "cam142",
        name: "Põhja pst – Kalasadama tn",
      },
    ],
  },
  {
    id: "niine-pohja",
    name: "Niine tn – Põhja pst",
    coordinates: [24.74312, 59.44348],
    cameras: [
      {
        id: "cam232",
        name: "Niine tn – Põhja pst",
      },
    ],
  },
  {
    id: "kai-logi",
    name: "Kai tn – Logi tn",
    coordinates: [24.75889, 59.44377],
    cameras: [
      {
        id: "cam254",
        name: "Kai tn – Logi tn (suund Mere pst)",
      },
      {
        id: "cam255",
        name: "Kai tn – Logi tn (suund Sadama tn)",
      },
    ],
  },
  {
    id: "sadama-logi",
    name: "Sadama tn – Logi tn",
    coordinates: [24.7586, 59.44431],
    cameras: [
      {
        id: "cam256",
        name: "Sadama tn – Logi tn",
      },
    ],
  },
  {
    id: "logi-rumbi",
    name: "Logi tn – Rumbi tn ringristmik",
    coordinates: [24.75787, 59.44518],
    cameras: [
      {
        id: "cam257",
        name: "Logi tn – Rumbi tn ringristmik",
      },
    ],
  },
  // Reidi tee: Ahtri tn along the waterfront to Narva mnt.
  {
    id: "reidi-joe-ahtri",
    name: "Reidi tee – Jõe tn – Ahtri tn",
    coordinates: [24.76357, 59.44004],
    cameras: [
      {
        id: "cam177",
        name: "Reidi tee – Ahtri tn",
      },
      {
        id: "cam178",
        name: "Reidi tee – Jõe tn – Ahtri tn",
      },
    ],
  },
  {
    id: "reidi-lootsi",
    name: "Reidi tee – Lootsi tn",
    coordinates: [24.76552, 59.44045],
    cameras: [
      {
        id: "cam176",
        name: "Reidi tee – Lootsi tn (suund sadam)",
      },
    ],
  },
  {
    id: "reidi-uus-sadama",
    name: "Reidi tee – Uus-Sadama tn",
    coordinates: [24.77085, 59.44146],
    cameras: [
      {
        id: "cam179",
        name: "Reidi tee – Uus-Sadama tn (suund sadam)",
      },
    ],
  },
  {
    id: "reidi-petrooleumi",
    name: "Reidi tee – Petrooleumi tn",
    coordinates: [24.77502, 59.44232],
    cameras: [
      {
        id: "cam180",
        name: "Reidi tee – Petrooleumi tn (suund sadam)",
      },
      {
        id: "cam181",
        name: "Reidi tee – Petrooleumi tn (suund Pirita)",
      },
    ],
  },
  {
    id: "reidi-pikksilma",
    name: "Reidi tee – Pikksilma tn",
    coordinates: [24.78134, 59.44343],
    cameras: [
      {
        id: "cam182",
        name: "Reidi tee – Pikksilma tn (suund Pirita)",
      },
      {
        id: "cam183",
        name: "Reidi tee – Pikksilma tn (suund sadam)",
      },
    ],
  },
  {
    id: "reidi-narva",
    name: "Reidi tee – Narva mnt",
    coordinates: [24.79018, 59.44249],
    cameras: [
      {
        id: "cam184",
        name: "Reidi tee – Narva mnt (suund sadam)",
      },
    ],
  },
  // Pirita tee towards Pirita and Merivälja.
  {
    id: "narva-pirita",
    name: "Narva mnt – Pirita tee",
    coordinates: [24.795, 59.44313],
    cameras: [
      {
        id: "cam186",
        name: "Narva mnt – Pirita tee (suund Pirita)",
      },
      {
        id: "cam185",
        name: "Narva mnt – Pirita tee (suund kesklinn)",
      },
    ],
  },
  {
    id: "pirita-rummu",
    name: "Pirita tee – Rummu tee",
    coordinates: [24.82693, 59.46307],
    cameras: [
      {
        id: "cam193",
        name: "Pirita tee – Rummu tee (suund kesklinn)",
      },
      {
        id: "cam194",
        name: "Pirita tee – Rummu tee (suund Rummu tee)",
      },
    ],
  },
  {
    id: "merivalja-kloostrimetsa",
    name: "Merivälja tee – Kloostrimetsa tee",
    coordinates: [24.8344, 59.46825],
    cameras: [
      {
        id: "cam197",
        name: "Merivälja tee – Kloostrimetsa tee",
      },
    ],
  },
  // Gonsiori tn corridor out to Laagna tee.
  {
    id: "gonsiori-maneezi-kivisilla",
    name: "Gonsiori tn – Maneeži tn / Kivisilla tn",
    coordinates: [24.76038, 59.4353],
    cameras: [
      {
        id: "cam245",
        name: "Gonsiori tn (suund Lasnamäe) – Maneeži tn",
      },
      {
        id: "cam246",
        name: "Gonsiori tn – Kivisilla tn",
      },
    ],
  },
  {
    id: "gonsiori-pronksi",
    name: "Gonsiori tn – Pronksi tn",
    coordinates: [24.76436, 59.43475],
    cameras: [
      {
        id: "cam083",
        name: "Gonsiori tn – Pronksi tn (suund Kaubamaja)",
      },
      {
        id: "cam082",
        name: "Gonsiori tn – Pronksi tn (suund Politsei park)",
      },
    ],
  },
  {
    id: "pronksi-raua",
    name: "Pronksi tn – Raua tn",
    coordinates: [24.76465, 59.43561],
    cameras: [
      {
        id: "cam140",
        name: "Pronksi tn – Raua tn (suund Ahtri tn)",
      },
      {
        id: "cam150",
        name: "Pronksi tn – Raua tn (suund Liivalaia tn)",
      },
    ],
  },
  {
    id: "gonsiori-kreutzwaldi",
    name: "Gonsiori tn – F. R. Kreutzwaldi tn",
    coordinates: [24.76852, 59.43424],
    cameras: [
      {
        id: "cam154",
        name: "Gonsiori tn – F. R. Kreutzwaldi tn (suund kesklinn)",
      },
      {
        id: "cam155",
        name: "Gonsiori tn – F. R. Kreutzwaldi tn (suund Lasnamäe)",
      },
    ],
  },
  {
    id: "gonsiori-vilmsi",
    name: "Gonsiori tn – Vilmsi tn",
    coordinates: [24.77859, 59.43299],
    cameras: [
      {
        id: "cam152",
        name: "Gonsiori tn – Vilmsi tn (suund kesklinn)",
      },
      {
        id: "cam151",
        name: "Gonsiori tn – Vilmsi tn (suund Lasnamäe)",
      },
    ],
  },
  {
    id: "gonsiori-laagna",
    name: "Gonsiori tn – Laagna tee",
    coordinates: [24.78489, 59.43198],
    cameras: [
      {
        id: "cam156",
        name: "Gonsiori tn – Laagna tee (suund kesklinn)",
      },
      {
        id: "cam153",
        name: "Gonsiori tn – Laagna tee (suund Lasnamäe)",
      },
    ],
  },
  // Tartu mnt from Liivalaia tn to the bus station.
  {
    id: "tartu-pronksi-liivalaia",
    name: "Tartu mnt – Pronksi tn / Liivalaia tn – Rävala pst",
    coordinates: [24.76319, 59.43286],
    cameras: [
      {
        id: "cam008",
        name: "Tartu mnt – Pronksi tn",
      },
      {
        id: "cam080",
        name: "Liivalaia tn – Rävala pst",
      },
    ],
  },
  {
    id: "tartu-kreutzwaldi",
    name: "Tartu mnt – F. R. Kreutzwaldi tn",
    coordinates: [24.76703, 59.43184],
    cameras: [
      {
        id: "cam081",
        name: "Tartu mnt – F. R. Kreutzwaldi tn",
      },
    ],
  },
  {
    id: "tartu-odra-turnpu",
    name: "Tartu mnt – Odra tn – Türnpu tn",
    coordinates: [24.77588, 59.42852],
    cameras: [
      {
        id: "cam037",
        name: "Tartu mnt – Odra tn – Türnpu tn",
      },
      {
        id: "cam038",
        name: "Tartu mnt – Odra tn – Türnpu tn (bussijaam)",
      },
      {
        id: "cam039",
        name: "Tartu mnt – Odra tn – Türnpu tn (suund Tartu)",
      },
    ],
  },
  {
    id: "tartu-lubja",
    name: "Tartu mnt – Lubja tn",
    coordinates: [24.77841, 59.42754],
    cameras: [
      {
        id: "cam188",
        name: "Tartu mnt – Lubja tn (suund kesklinn)",
      },
    ],
  },
  {
    id: "odra-lastekodu",
    name: "Odra tn – Lastekodu tn",
    coordinates: [24.77426, 59.42777],
    cameras: [
      {
        id: "cam044",
        name: "Odra tn – Lastekodu tn (suund bussijaam)",
      },
    ],
  },
  {
    id: "turnpu-kunderi",
    name: "Türnpu tn – Kunderi tn",
    coordinates: [24.77796, 59.43029],
    cameras: [
      {
        id: "cam042",
        name: "Türnpu tn – Kunderi tn (suund kesklinn)",
      },
      {
        id: "cam043",
        name: "Türnpu tn – Kunderi tn (suund Laagna tee)",
      },
    ],
  },
  // Tartu mnt from Peterburi tee out to Mõigu.
  {
    id: "tartu-peterburi",
    name: "Tartu mnt – Peterburi tee",
    coordinates: [24.78574, 59.42396],
    cameras: [
      {
        id: "cam009",
        name: "Tartu mnt (suund Sikupilli) – Peterburi tee",
      },
      {
        id: "cam084",
        name: "Tartu mnt – Peterburi tee",
      },
    ],
  },
  {
    id: "tartu-jarvevana-suur-sojamae",
    name: "Tartu mnt – Järvevana tee / Suur-Sõjamäe tn",
    coordinates: [24.78813, 59.42239],
    cameras: [
      {
        id: "cam078",
        name: "Tartu mnt – Järvevana tee",
      },
      {
        id: "cam079",
        name: "Tartu mnt – Suur-Sõjamäe tn",
      },
    ],
  },
  {
    id: "tartu-lennujaama",
    name: "Tartu mnt – Lennujaama tee",
    coordinates: [24.79165, 59.41998],
    cameras: [
      {
        id: "cam005",
        name: "Tartu mnt (suund kesklinn) – Lennujaama tee",
      },
      {
        id: "cam006",
        name: "Tartu mnt (suund Tartu) – Lennujaama tee",
      },
    ],
  },
  {
    id: "tartu-vana-tartu",
    name: "Tartu mnt – Vana-Tartu mnt",
    coordinates: [24.80162, 59.41181],
    cameras: [
      {
        id: "cam136",
        name: "Tartu mnt – Vana-Tartu mnt",
      },
    ],
  },
  {
    id: "tartu-kanali",
    name: "Tartu mnt – Kanali tee",
    coordinates: [24.80634, 59.40805],
    cameras: [
      {
        id: "cam137",
        name: "Tartu mnt – Kanali tee",
      },
    ],
  },
  {
    id: "tartu-moigu",
    name: "Tartu mnt – Mõigu tee",
    coordinates: [24.81343, 59.40221],
    cameras: [
      {
        id: "cam047",
        name: "Tartu mnt (suund kesklinn) – Mõigu tee",
      },
      {
        id: "cam048",
        name: "Tartu mnt (suund Tartu) – Mõigu tee",
      },
    ],
  },
  // Liivalaia tn, Juhkentali tn and Filtri tee.
  {
    id: "liivalaia-juhkentali-lembitu",
    name: "Liivalaia tn – Juhkentali tn – Lembitu tn",
    coordinates: [24.75702, 59.42953],
    cameras: [
      {
        id: "cam112",
        name: "Liivalaia tn (suund Pärnu mnt) – Juhkentali tn – Lembitu tn",
      },
      {
        id: "cam113",
        name: "Liivalaia tn – Juhkentali tn (suund Juhkentali) – Lembitu tn",
      },
      {
        id: "cam114",
        name: "Liivalaia tn – Juhkentali tn – Lembitu tn (suund Lembitu)",
      },
    ],
  },
  {
    id: "juhkentali-filtri-odra",
    name: "Juhkentali tn – Filtri tee – Odra tn",
    coordinates: [24.77153, 59.427],
    cameras: [
      {
        id: "cam099",
        name: "Juhkentali tn – Filtri tee – Odra tn (suund Lasnamäe)",
      },
      {
        id: "cam100",
        name: "Juhkentali tn – Filtri tee",
      },
    ],
  },
  // Lasnamäe: Peterburi tee, Smuuli tee, Laagna tee and Ussimäe tee.
  {
    id: "narva-turba",
    name: "Narva mnt – Turba tn",
    coordinates: [24.81462, 59.44475],
    cameras: [
      {
        id: "cam051",
        name: "Narva mnt (suund kesklinn) – Turba tn",
      },
    ],
  },
  {
    id: "pae-peterburi",
    name: "Pae tn – Peterburi tee",
    coordinates: [24.80045, 59.42602],
    cameras: [
      {
        id: "cam115",
        name: "Pae tn – Peterburi tee",
      },
    ],
  },
  {
    id: "smuuli-punane",
    name: "Smuuli tee – Punane tn",
    coordinates: [24.83106, 59.43395],
    cameras: [
      {
        id: "cam117",
        name: "Smuuli tee – Punane tn (suund kesklinn)",
      },
      {
        id: "cam118",
        name: "Smuuli tee – Punane tn (suund Narva)",
      },
    ],
  },
  {
    id: "peterburi-smuuli",
    name: "Peterburi tee – Smuuli tee",
    coordinates: [24.83531, 59.42922],
    cameras: [
      {
        id: "cam091",
        name: "Peterburi tee (suund kesklinn) – Smuuli tee",
      },
      {
        id: "cam092",
        name: "Peterburi tee (suund Narva) – Smuuli tee",
      },
    ],
  },
  {
    id: "suur-sojamae-smuuli",
    name: "Suur-Sõjamäe tn – Smuuli tee",
    coordinates: [24.84481, 59.41578],
    cameras: [
      {
        id: "cam090",
        name: "Suur-Sõjamäe tn – Smuuli tee",
      },
    ],
  },
  {
    id: "laagna-mustakivi",
    name: "Laagna tee – Mustakivi tee",
    coordinates: [24.86663, 59.44208],
    cameras: [
      {
        id: "cam217",
        name: "Laagna tee – Mustakivi tee (suund kesklinn)",
      },
      {
        id: "cam131",
        name: "Laagna tee – Mustakivi tee (suund Peterburi tee)",
      },
      {
        id: "cam216",
        name: "Laagna tee – Mustakivi tee (suund Narva mnt)",
      },
    ],
  },
  {
    id: "laagna-karberi",
    name: "Laagna tee – Kärberi tn",
    coordinates: [24.89748, 59.44686],
    cameras: [
      {
        id: "cam224",
        name: "Laagna tee – Kärberi tn (suund kesklinn)",
      },
      {
        id: "cam225",
        name: "Laagna tee – Kärberi tn (suund Peterburi tee)",
      },
    ],
  },
  {
    id: "ussimae-priisle",
    name: "Ussimäe tee – Priisle tee",
    coordinates: [24.89178, 59.45211],
    cameras: [
      {
        id: "cam230",
        name: "Ussimäe tee (suund Pärnamäe) – Priisle tee",
      },
      {
        id: "cam231",
        name: "Ussimäe tee (suund Kärberi tn) – Priisle tee",
      },
    ],
  },
  {
    id: "ussimae-narva",
    name: "Ussimäe tee – Narva mnt",
    coordinates: [24.89502, 59.45456],
    cameras: [
      {
        id: "cam249",
        name: "Ussimäe tee – Narva mnt",
      },
    ],
  },
  {
    id: "peterburi-vao",
    name: "Peterburi tee – Väo tee",
    coordinates: [24.89685, 59.44084],
    cameras: [
      {
        id: "cam097",
        name: "Peterburi tee (suund kesklinn) – Väo tee",
      },
    ],
  },
  // Pärnu mnt south through Nõmme to Pääsküla, with Viljandi mnt.
  {
    id: "parnu-tondi",
    name: "Pärnu mnt – Tondi tn",
    coordinates: [24.73935, 59.41476],
    cameras: [
      {
        id: "cam096",
        name: "Pärnu mnt – Tondi tn",
      },
    ],
  },
  {
    id: "parnu-saku",
    name: "Pärnu mnt – Saku tn",
    coordinates: [24.73689, 59.41003],
    cameras: [
      {
        id: "cam105",
        name: "Pärnu mnt – Saku tn",
      },
    ],
  },
  {
    id: "parnu-kohila",
    name: "Pärnu mnt – Kohila tn",
    coordinates: [24.73632, 59.40945],
    cameras: [
      {
        id: "cam106",
        name: "Pärnu mnt – Kohila tn",
      },
    ],
  },
  {
    id: "parnu-jarvevana",
    name: "Pärnu mnt – Järvevana tee",
    coordinates: [24.72983, 59.40297],
    cameras: [
      {
        id: "cam087",
        name: "Pärnu mnt (suund kesklinn) – Järvevana tee",
      },
      {
        id: "cam088",
        name: "Pärnu mnt (suund Pärnu) – Järvevana tee",
      },
      {
        id: "cam089",
        name: "Pärnu mnt – Järvevana tee (suund Lasnamäe)",
      },
      {
        id: "cam123",
        name: "Pärnu mnt – Järvevana tee (suund Neste)",
      },
      {
        id: "cam164",
        name: "Pärnu mnt – Järvevana tee (suund Neste) 2",
      },
    ],
  },
  {
    id: "parnu-viljandi",
    name: "Pärnu mnt – Viljandi mnt",
    coordinates: [24.72475, 59.39381],
    cameras: [
      {
        id: "cam095",
        name: "Pärnu mnt – Viljandi mnt",
      },
      {
        id: "cam053",
        name: "Pärnu mnt (suund kesklinn) – Viljandi mnt",
      },
    ],
  },
  {
    id: "parnu-manniku",
    name: "Pärnu mnt – Männiku tee",
    coordinates: [24.72269, 59.39224],
    cameras: [
      {
        id: "cam052",
        name: "Pärnu mnt – Männiku tee (suund Nõmme)",
      },
    ],
  },
  {
    id: "vabaduse-manniku",
    name: "Vabaduse pst – Männiku tee",
    coordinates: [24.71887, 59.38827],
    cameras: [
      {
        id: "cam107",
        name: "Vabaduse pst – Männiku tee (suund kesklinn)",
      },
      {
        id: "cam108",
        name: "Vabaduse pst – Männiku tee (suund Pärnu)",
      },
    ],
  },
  {
    id: "manniku-valdeku",
    name: "Männiku tee – Valdeku tn",
    coordinates: [24.71792, 59.37522],
    cameras: [
      {
        id: "cam204",
        name: "Männiku tee – Valdeku tn (suund kesklinn)",
      },
      {
        id: "cam205",
        name: "Männiku tee – Valdeku tn (suund Viljandi mnt)",
      },
    ],
  },
  {
    id: "viljandi-valdeku",
    name: "Viljandi mnt – Valdeku tn",
    coordinates: [24.7465, 59.3765],
    cameras: [
      {
        id: "cam058",
        name: "Viljandi mnt (suund kesklinn) – Valdeku tn",
      },
      {
        id: "cam059",
        name: "Viljandi mnt – Valdeku tn (suund Rapla)",
      },
    ],
  },
  {
    id: "parnu-vabaduse",
    name: "Pärnu mnt – Vabaduse pst",
    coordinates: [24.62988, 59.36079],
    cameras: [
      {
        id: "cam093",
        name: "Pärnu mnt (suund kesklinn) – Vabaduse pst",
      },
      {
        id: "cam094",
        name: "Pärnu mnt (suund Pärnu) – Vabaduse pst",
      },
    ],
  },
];
