import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enterpriseService } from '@/services/enterprise';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook để Enterprise quản lý thông tin công ty của mình
 * @returns {Object} Các function và dữ liệu liên quan đến quản lý công ty
 */
export const useEnterpriseCompany = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query để lấy thông tin công ty
  const {
    data: company,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['enterprise-company'],
    queryFn: enterpriseService.getCompany,
    staleTime: 5 * 60 * 1000, // Cache dữ liệu trong 5 phút
    refetchOnWindowFocus: false, // Không fetch lại khi focus vào cửa sổ để tránh re-render
    onError: (err) => {
      console.error('Lỗi khi lấy thông tin công ty:', err);
    }
  });

  // Mutation để cập nhật thông tin công ty
  const updateCompanyMutation = useMutation({
    mutationFn: enterpriseService.updateCompany,
    onSuccess: (data) => {
      console.log('Đã cập nhật công ty:', data);
      queryClient.invalidateQueries({ queryKey: ['enterprise-company'] });
      toast({
        title: "Thành công",
        description: "Thông tin công ty đã được cập nhật",
      });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật công ty:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin công ty. " + (error.response?.data?.errors?.join(', ') || error.message),
        variant: "destructive"
      });
    }
  });

  // Hàm xử lý cập nhật công ty
  const updateCompany = (data) => {
    updateCompanyMutation.mutate(data);
  };

  return {
    company: company || null,
    isLoading,
    error,
    updateCompany,
    isUpdating: updateCompanyMutation.isPending,
    refetchCompany: refetch
  };
}; 
