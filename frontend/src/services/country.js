import apiClient from '@/lib/apiClient';

export const countryService = {
  // Lấy danh sách quốc gia
  getCountries: async () => {
    const response = await apiClient.get('/api/v1/countries');
    return response.data.countries;
  },
  
  // Lấy thông tin một quốc gia
  getCountry: async (id) => {
    const response = await apiClient.get(`/api/v1/countries/${id}`);
    return response.data.country;
  }
}; 
