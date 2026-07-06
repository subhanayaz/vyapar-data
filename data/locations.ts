export type LocationScope = "city" | "state" | "region";

export type CityTier = 1 | 2;

export type ServiceLocation = {
  slug: string;
  name: string;
  scope: LocationScope;
  tier?: CityTier;
};

export type LocationRegion = {
  id: string;
  title: string;
  states: ServiceLocation[];
  cities: ServiceLocation[];
  regionPacks: ServiceLocation[];
};

function city(slug: string, name: string, tier: CityTier = 2): ServiceLocation {
  return { slug, name, scope: "city", tier };
}

function state(slug: string, name: string): ServiceLocation {
  return { slug, name, scope: "state" };
}

function regionPack(slug: string, name: string): ServiceLocation {
  return { slug, name, scope: "region" };
}

export const LOCATION_REGIONS: LocationRegion[] = [
  {
    id: "north",
    title: "North India",
    states: [
      state("uttar-pradesh", "Uttar Pradesh"),
      state("punjab", "Punjab"),
      state("haryana", "Haryana"),
      state("himachal-pradesh", "Himachal Pradesh"),
      state("uttarakhand", "Uttarakhand"),
      state("rajasthan", "Rajasthan"),
    ],
    cities: [
      city("delhi", "Delhi", 1),
      city("jaipur", "Jaipur", 1),
      city("lucknow", "Lucknow", 1),
      city("kanpur", "Kanpur", 1),
      city("gurgaon", "Gurgaon"),
      city("ghaziabad", "Ghaziabad"),
      city("meerut", "Meerut"),
      city("mohali", "Mohali"),
      city("chandigarh", "Chandigarh"),
      city("panchkula", "Panchkula"),
      city("noida", "Noida"),
      city("greater-noida", "Greater Noida"),
      city("ludhiana", "Ludhiana"),
      city("faridabad", "Faridabad"),
      city("ballabgarh", "Ballabgarh"),
      city("agra", "Agra"),
      city("mathura", "Mathura"),
      city("aligarh", "Aligarh"),
      city("panipat", "Panipat"),
      city("sonipat", "Sonipat"),
      city("karnal", "Karnal"),
      city("rewari", "Rewari"),
      city("bhiwadi", "Bhiwadi"),
      city("haridwar", "Haridwar"),
      city("dehradun", "Dehradun"),
    ],
    regionPacks: [regionPack("all-north-india", "All North India")],
  },
  {
    id: "west",
    title: "Western India",
    states: [
      state("maharashtra", "Maharashtra"),
      state("madhya-pradesh", "Madhya Pradesh"),
      state("dadra-nagar-haveli", "Dadra & Nagar Haveli"),
      state("chhattisgarh", "Chhattisgarh"),
      state("goa", "Goa"),
      state("gujarat", "Gujarat"),
    ],
    cities: [
      city("mumbai", "Mumbai", 1),
      city("pune", "Pune", 1),
      city("ahmedabad", "Ahmedabad", 1),
      city("surat", "Surat", 1),
      city("nagpur", "Nagpur", 1),
      city("indore", "Indore", 1),
      city("vadodara", "Vadodara"),
      city("raipur", "Raipur"),
      city("satna", "Satna"),
      city("katni", "Katni"),
      city("rewa", "Rewa"),
      city("rajkot", "Rajkot"),
      city("aurangabad", "Aurangabad"),
      city("jalgaon", "Jalgaon"),
      city("nashik", "Nashik"),
      city("akola", "Akola"),
      city("jamnagar", "Jamnagar"),
      city("daman", "Daman"),
      city("diu", "Diu"),
      city("vapi", "Vapi"),
      city("ankleshwar", "Ankleshwar"),
      city("silvassa", "Silvassa"),
      city("bharuch", "Bharuch"),
    ],
    regionPacks: [regionPack("all-western-india", "All Western India")],
  },
  {
    id: "south",
    title: "South India",
    states: [
      state("karnataka", "Karnataka"),
      state("tamil-nadu", "Tamil Nadu"),
      state("kerala", "Kerala"),
      state("telangana", "Telangana"),
      state("andhra-pradesh", "Andhra Pradesh"),
    ],
    cities: [
      city("bangalore", "Bangalore", 1),
      city("hyderabad", "Hyderabad", 1),
      city("chennai", "Chennai", 1),
      city("coimbatore", "Coimbatore", 1),
      city("kochi", "Kochi", 1),
      city("visakhapatnam", "Visakhapatnam"),
      city("madurai", "Madurai"),
      city("pondicherry", "Pondicherry"),
      city("mangalore", "Mangalore"),
      city("belgaum", "Belgaum"),
      city("erode", "Erode"),
      city("hubli", "Hubli"),
      city("hosur", "Hosur"),
      city("vijayawada", "Vijayawada"),
      city("tirupur", "Tirupur"),
    ],
    regionPacks: [regionPack("all-south-india", "All South India")],
  },
  {
    id: "east",
    title: "Eastern India",
    states: [
      state("west-bengal", "West Bengal"),
      state("odisha", "Odisha"),
      state("bihar", "Bihar"),
      state("jharkhand", "Jharkhand"),
    ],
    cities: [
      city("kolkata", "Kolkata", 1),
      city("patna", "Patna", 1),
      city("bhubaneswar", "Bhubaneswar", 1),
      city("dhanbad", "Dhanbad"),
      city("ranchi", "Ranchi"),
      city("jamshedpur", "Jamshedpur"),
      city("siliguri", "Siliguri"),
      city("rourkela", "Rourkela"),
      city("cuttack", "Cuttack"),
    ],
    regionPacks: [regionPack("all-eastern-india", "All Eastern India")],
  },
];

export type FooterLocationSections = {
  states: ServiceLocation[];
  metroCities: ServiceLocation[];
  otherCities: ServiceLocation[];
  regionPacks: ServiceLocation[];
};

function byDemand(a: ServiceLocation, b: ServiceLocation): number {
  const tierA = a.tier ?? 2;
  const tierB = b.tier ?? 2;
  if (tierA !== tierB) return tierA - tierB;
  return a.name.localeCompare(b.name);
}

export function getFooterLocationSections(): FooterLocationSections {
  const allCities = LOCATION_REGIONS.flatMap((region) => region.cities);

  return {
    states: LOCATION_REGIONS.flatMap((region) => region.states).sort(byDemand),
    metroCities: allCities.filter((entry) => entry.tier === 1).sort(byDemand),
    otherCities: allCities.filter((entry) => entry.tier !== 1).sort(byDemand),
    regionPacks: LOCATION_REGIONS.flatMap((region) => region.regionPacks).sort(byDemand),
  };
}

export function getRegionLocations(region: LocationRegion): ServiceLocation[] {
  return [...region.states, ...region.cities, ...region.regionPacks];
}

export function getAllServiceLocations(): ServiceLocation[] {
  return LOCATION_REGIONS.flatMap(getRegionLocations);
}

export function getServiceLocationBySlug(slug: string) {
  for (const region of LOCATION_REGIONS) {
    const location = getRegionLocations(region).find((entry) => entry.slug === slug);
    if (location) {
      return { location, region };
    }
  }

  return undefined;
}

export function getLocationScopeLabel(scope: LocationScope) {
  if (scope === "city") return "Single city";
  if (scope === "state") return "Full state";
  return "Regional pack";
}
