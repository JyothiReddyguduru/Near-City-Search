interface CountryData {
  code: string;
  name: string;
  wikiDataId: string;
}

interface StateData {
  isoCode: string;
  name: string;
  wikiDataId: string;
}

interface CityData {
  id: number;
  wikiDataId: string;
  name: string;
}

interface APIResponse {
  data: CountryData[] | StateData[] | CityData[];
}
