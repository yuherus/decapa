import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { jobService } from '@/services/job';

export const useJobs = (params = {}) => {
  const queryClient = useQueryClient();
  
  // Sử dụng service để lấy danh sách tin tuyển dụng
  const {
    data: response = { jobs: [], metadata: { current_page: 1, per_page: 10, total_pages: 1, count: 0 } },
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin-jobs', params],
    queryFn: () => jobService.getJobs(params),
    keepPreviousData: true,
  });
  
  const { jobs, metadata } = response;
  
  // Tạo job mới
  const createJob = useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      toast.success('Tạo tin tuyển dụng mới thành công');
      queryClient.invalidateQueries(['admin-jobs']);
    },
    onError: (err) => {
      console.error('Lỗi khi tạo tin tuyển dụng:', err);
      toast.error(`Không thể tạo tin tuyển dụng: ${err.response?.data?.errors || err.message}`);
    }
  });
  
  // Cập nhật job
  const updateJob = useMutation({
    mutationFn: ({ id, data }) => jobService.updateJob(id, data),
    onSuccess: () => {
      toast.success('Cập nhật tin tuyển dụng thành công');
      queryClient.invalidateQueries(['admin-jobs']);
    },
    onError: (err) => {
      console.error('Lỗi khi cập nhật tin tuyển dụng:', err);
      toast.error(`Không thể cập nhật tin tuyển dụng: ${err.response?.data?.errors || err.message}`);
    }
  });
  
  // Xóa job
  const deleteJob = useMutation({
    mutationFn: jobService.deleteJob,
    onSuccess: () => {
      toast.success('Xóa tin tuyển dụng thành công');
      queryClient.invalidateQueries(['admin-jobs']);
    },
    onError: (err) => {
      console.error('Lỗi khi xóa tin tuyển dụng:', err);
      toast.error(`Không thể xóa tin tuyển dụng: ${err.response?.data?.errors || err.message}`);
    }
  });
  
  return {
    jobs,
    metadata,
    isLoading,
    isError,
    error,
    refetch,
    createJob,
    updateJob,
    deleteJob,
  };
}; 
