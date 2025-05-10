import { useQuery } from '@tanstack/react-query';
import { countryService } from '@/services/country';

export const useCountries = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: countryService.getCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    countries: data || [],
    isLoading,
    error,
  };
};

// Hook để lấy thông tin chi tiết một quốc gia
export const useCountry = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['country', id],
    queryFn: () => countryService.getCountry(id),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!id // Chỉ gọi API khi có id
  });

  return {
    country: data || null,
    isLoading,
    error,
  };
}; 
