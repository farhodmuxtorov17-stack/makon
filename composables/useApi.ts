import type { CatalogResponse, BuildingDetailResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase as string

  async function fetchCatalog(): Promise<CatalogResponse> {
    return await $fetch<CatalogResponse>(`${baseUrl}/getPublicCatalog`, {
      method: 'POST',
      body: {},
    })
  }

  async function fetchBuilding(slug: string): Promise<BuildingDetailResponse> {
    return await $fetch<BuildingDetailResponse>(`${baseUrl}/getPublicCatalog?slug=${encodeURIComponent(slug)}`, {
      method: 'GET',
    })
  }

  async function fetchAdminData(action: string): Promise<any> {
    return await $fetch<any>(`${baseUrl}/getAdminData?action=${action}`, {
      method: 'GET',
    })
  }

  return { fetchCatalog, fetchBuilding, fetchAdminData }
}
