export interface SearchResponse {
  objectID: string
  locale_names: {
    en?: string[]
    ru?: string[]
    "default": string[]
  },
  city?: {
    default: string[]
  },
  county?: {
    default: string[]
  },
  administrative: string[]
country?: {
    default: string[]
  },
  country_code: string
  postcode: string[]
  population: number,
  _geoloc: {
    "lat": number
    "lng": number
  }
}

