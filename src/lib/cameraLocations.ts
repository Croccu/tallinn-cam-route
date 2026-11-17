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
];
