import apiClient from '@/lib/apiClient';

export const jobService = {
  // Lấy danh sách tin tuyển dụng cho admin
  getJobs: async (params = {}) => {
    // Chuyển đổi params thành query string
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const { data } = await apiClient.get(`/api/v1/admin/jobs${queryString ? `?${queryString}` : ''}`);
    return data;
  },

  // Lấy chi tiết tin tuyển dụng
  getJob: async (id) => {
    const { data } = await apiClient.get(`/api/v1/admin/jobs/${id}`);
    return data;
  },

  // Tạo tin tuyển dụng mới
  createJob: async (jobData) => {
    const { data } = await apiClient.post('/api/v1/admin/jobs', { job: jobData });
    return data;
  },

  // Cập nhật tin tuyển dụng
  updateJob: async (id, jobData) => {
    const { data } = await apiClient.put(`/api/v1/admin/jobs/${id}`, { job: jobData });
    return data;
  },

  // Xóa tin tuyển dụng
  deleteJob: async (id) => {
    await apiClient.delete(`/api/v1/admin/jobs/${id}`);
  }
}; 
