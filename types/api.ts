export type Category = {
  category: string
  servers_count: number
}

export type Language = {
  locale: string
  language?: string
  servers_count: number
}

export type Server = {
  domain: string
  version: string
  description: string
  approval_required: boolean
  category: string[]
  url: string
  concoursOptions: string[]
  niveauOptions: string
  natureOptions: string
  local_image: string
  formatOptions: string
}

export type Day = {
  period: string
  server_count: string
  user_count: string
  active_user_count: string
}

export type Region = {
  value: string
  label: string
}

export type Job = {
  id: string
  title: string
  departmentName: string
  externalLink: string
  locationName: string
  employmentType: string
}

export type JobsResponse = {
  success: boolean
  results: Job[]
}