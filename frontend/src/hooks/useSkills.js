import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

/**
 * Hook để lấy và quản lý danh sách kỹ năng
 * @returns {Object} Dữ liệu các kỹ năng và trạng thái query
 */
export const useSkills = () => {
  const fetchSkills = async () => {
    const response = await apiClient.get('/api/v1/skills');
    return response.data;
  };

  const {
    data: skills,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills
  });

  // Hàm tiện ích để lấy tên kỹ năng từ ID
  const getSkillName = (id) => {
    const skill = skills?.find(s => s.id === id);
    return skill ? skill.name : '';
  };

  return {
    skills,
    isLoading,
    error,
    refetchSkills: refetch,
    getSkillName
  };
}; 
