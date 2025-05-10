import apiClient from '@/lib/apiClient';

export const companyService = {
  // Lấy danh sách doanh nghiệp
  getCompanies: async (params) => {
    const response = await apiClient.get('/api/v1/admin/companies', { params });
    return response.data;
  },

  // Lấy chi tiết doanh nghiệp
  getCompany: async (id) => {
    const response = await apiClient.get(`/api/v1/admin/companies/${id}`);
    return response.data;
  },

  // Tạo doanh nghiệp mới
  createCompany: async (data) => {
    const formData = new FormData();
    
    // Xử lý các trường dữ liệu cơ bản
    if (data.name) formData.append('company[name]', data.name);
    if (data.description) formData.append('company[description]', data.description);
    if (data.website) formData.append('company[website]', data.website);
    if (data.company_size !== undefined) formData.append('company[company_size]', data.company_size);
    if (data.industry !== undefined) formData.append('company[industry]', data.industry);
    if (data.company_type !== undefined) formData.append('company[company_type]', data.company_type);
    if (data.country_id) formData.append('company[country_id]', data.country_id);
    if (data.status) formData.append('company[status]', data.status);
    
    // Xử lý file logo và banner
    if (data.logo instanceof File) {
      formData.append('company[logo]', data.logo);
    }
    
    if (data.banner instanceof File) {
      formData.append('company[banner]', data.banner);
    }
    
    // Xử lý mảng images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images[]', image);
        }
      });
    }
    
    // Xử lý các nested attributes
    if (data.company_addresses_attributes && data.company_addresses_attributes.length > 0) {
      data.company_addresses_attributes.forEach((address, index) => {
        Object.keys(address).forEach(key => {
          formData.append(`company[company_addresses_attributes][${index}][${key}]`, address[key]);
        });
      });
    }
    
    if (data.company_social_links_attributes && data.company_social_links_attributes.length > 0) {
      data.company_social_links_attributes.forEach((link, index) => {
        Object.keys(link).forEach(key => {
          formData.append(`company[company_social_links_attributes][${index}][${key}]`, link[key]);
        });
      });
    }
    
    const response = await apiClient.post('/api/v1/admin/companies', formData);
    return response.data;
  },

  // Cập nhật doanh nghiệp
  updateCompany: async (id, data) => {
    const formData = new FormData();
    
    // Xử lý các trường dữ liệu cơ bản
    if (data.name) formData.append('company[name]', data.name);
    if (data.description !== undefined) formData.append('company[description]', data.description);
    if (data.website !== undefined) formData.append('company[website]', data.website);
    if (data.company_size !== undefined) formData.append('company[company_size]', data.company_size);
    if (data.industry !== undefined) formData.append('company[industry]', data.industry);
    if (data.company_type !== undefined) formData.append('company[company_type]', data.company_type);
    if (data.country_id) formData.append('company[country_id]', data.country_id);
    if (data.status) formData.append('company[status]', data.status);
    if (data.note) formData.append('company[note]', data.note);
    
    // Xử lý file logo và banner
    if (data.logo instanceof File) {
      formData.append('company[logo]', data.logo);
    }
    
    if (data.banner instanceof File) {
      formData.append('company[banner]', data.banner);
    }
    
    // Xử lý mảng images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images[]', image);
        }
      });
    }
    
    // Xử lý các nested attributes
    if (data.company_addresses_attributes && data.company_addresses_attributes.length > 0) {
      data.company_addresses_attributes.forEach((address, index) => {
        Object.keys(address).forEach(key => {
          formData.append(`company[company_addresses_attributes][${index}][${key}]`, address[key]);
        });
      });
    }
    
    if (data.company_social_links_attributes && data.company_social_links_attributes.length > 0) {
      data.company_social_links_attributes.forEach((link, index) => {
        Object.keys(link).forEach(key => {
          formData.append(`company[company_social_links_attributes][${index}][${key}]`, link[key]);
        });
      });
    }
    
    const response = await apiClient.put(`/api/v1/admin/companies/${id}`, formData);
    return response.data;
  },

  // Xóa doanh nghiệp
  deleteCompany: async (id) => {
    const response = await apiClient.delete(`/api/v1/admin/companies/${id}`);
    return response.data;
  }
}; 
