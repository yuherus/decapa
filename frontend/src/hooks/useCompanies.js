import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '@/services/company';
import { toast } from 'sonner';

export const useCompanies = (params) => {
  const queryClient = useQueryClient();

  // Query để lấy danh sách doanh nghiệp
  const { data, isLoading, error } = useQuery({
    queryKey: ['companies', params],
    queryFn: () => companyService.getCompanies(params)
  });

  console.log("data", data);

  // Mutation để tạo doanh nghiệp mới
  const createMutation = useMutation({
    mutationFn: companyService.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Tạo doanh nghiệp thành công');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi tạo doanh nghiệp');
    }
  });

  // Mutation để cập nhật doanh nghiệp
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => companyService.updateCompany(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Cập nhật doanh nghiệp thành công');
    },
    onError: (error) => {
      console.log("err", error);
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi cập nhật doanh nghiệp');
    }
  });

  // Mutation để xóa doanh nghiệp
  const deleteMutation = useMutation({
    mutationFn: companyService.deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Xóa doanh nghiệp thành công');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi xóa doanh nghiệp');
    }
  });

  return {
    companies: data?.companies || [],
    metadata: data?.metadata || {},
    isLoading,
    error,
    createCompany: createMutation.mutate,
    updateCompany: updateMutation.mutate,
    deleteCompany: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
}; 
