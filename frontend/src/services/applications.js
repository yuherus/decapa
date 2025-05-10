import apiClient from '@/lib/apiClient';

// Thêm interceptor để gắn token vào mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service cho đơn ứng tuyển
export const applicationService = {
  // Lấy danh sách đơn ứng tuyển của người dùng hiện tại
  getApplications: async (params = {}) => {
    const { data } = await apiClient.get('/api/v1/applications', { params });
    return data;
  },

  // Lấy chi tiết một đơn ứng tuyển
  getApplication: async (id) => {
    const { data } = await apiClient.get(`/api/v1/applications/${id}`);
    return data;
  },

  // Tạo đơn ứng tuyển mới
  createApplication: async (applicationData) => {
    const { data } = await apiClient.post('/api/v1/applications', 
      applicationData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return data;
  },

  // Cập nhật đơn ứng tuyển
  updateApplication: async (id, applicationData) => {
    const { data } = await apiClient.put(`/api/v1/applications/${id}`, { application: applicationData });
    return data;
  },

  // Xóa đơn ứng tuyển
  deleteApplication: async (id) => {
    const { data } = await apiClient.delete(`/api/v1/applications/${id}`);
    return data;
  }
};

// API service cho quản lý đơn ứng tuyển (dành cho doanh nghiệp)
export const enterpriseApplicationService = {
  // Lấy danh sách đơn ứng tuyển vào công ty
  getApplications: async (params = {}) => {
    const { data } = await apiClient.get('/api/v1/enterprise/applications', { params });
    return data;
  },

  // Lấy chi tiết một đơn ứng tuyển
  getApplication: async (id) => {
    const { data } = await apiClient.get(`/api/v1/enterprise/applications/${id}`);
    return data;
  },

  // Cập nhật trạng thái đơn ứng tuyển
  updateApplicationStatus: async (id, status) => {
    const { data } = await apiClient.put(`/api/v1/enterprise/applications/${id}`, {
      application: { status }
    });
    return data;
  },

  // Tải CV của ứng viên
  downloadCV: async (id) => {
    const response = await apiClient.get(`/api/v1/enterprise/applications/${id}/download_cv`, {
      responseType: 'blob'
    });
    
    // Tạo URL để tải xuống file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Lấy tên file từ Content-Disposition header nếu có
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'cv.pdf';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response;
  }
}; 
