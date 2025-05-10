import apiClient from '@/lib/apiClient';

export const enterpriseService = {
  // Lấy thông tin công ty của enterprise
  getCompany: async () => {
    const response = await apiClient.get('/api/v1/enterprise/company');
    return response.data;
  },

  // Cập nhật thông tin công ty của enterprise
  updateCompany: async (data) => {
    const formData = new FormData();
    
    // Xử lý các trường dữ liệu cơ bản
    Object.keys(data).forEach(key => {
      if (key !== 'logo' && key !== 'banner' && key !== 'images' && 
          key !== 'company_addresses' && key !== 'company_social_links' && 
          key !== 'skill_ids') {
        formData.append(`company[${key}]`, data[key]);
      }
    });
    
    // Xử lý file logo và banner
    if (data.logo instanceof File) {
      formData.append('company[logo]', data.logo);
    }
    
    if (data.banner instanceof File) {
      formData.append('company[banner]', data.banner);
    }
    
    // Xử lý các nested attributes cho company_addresses
    if (data.company_addresses && data.company_addresses.length > 0) {
      data.company_addresses.forEach((address, index) => {
        if (address.id) {
          formData.append(`company[company_addresses_attributes][${index}][id]`, address.id);
        }
        formData.append(`company[company_addresses_attributes][${index}][province]`, address.province);
        formData.append(`company[company_addresses_attributes][${index}][full_address]`, address.full_address);
        if (address._destroy) {
          formData.append(`company[company_addresses_attributes][${index}][_destroy]`, "1");
        }
      });
    }
    
    // Xử lý các nested attributes cho company_social_links
    if (data.company_social_links && data.company_social_links.length > 0) {
      data.company_social_links.forEach((link, index) => {
        if (link.id) {
          formData.append(`company[company_social_links_attributes][${index}][id]`, link.id);
        }
        formData.append(`company[company_social_links_attributes][${index}][link_type]`, link.link_type);
        formData.append(`company[company_social_links_attributes][${index}][url]`, link.url);
        if (link._destroy) {
          formData.append(`company[company_social_links_attributes][${index}][_destroy]`, "1");
        }
      });
    }
    
    // Xử lý skill_ids
    if (data.skill_ids && data.skill_ids.length > 0) {
      data.skill_ids.forEach(id => {
        formData.append('company[skill_ids][]', id);
      });
    }
    
    const response = await apiClient.patch('/api/v1/enterprise/company', formData);
    return response.data;
  },

  // Lấy danh sách việc làm của enterprise
  getJobs: async (params) => {
    const response = await apiClient.get('/api/v1/enterprise/jobs', { params });
    return response.data;
  },

  // Lấy chi tiết việc làm
  getJob: async (id) => {
    const response = await apiClient.get(`/api/v1/enterprise/jobs/${id}`);
    return response.data;
  },

  // Lấy danh sách đơn ứng tuyển
  getApplications: async (params) => {
    const response = await apiClient.get('/api/v1/enterprise/applications', { params });
    return response.data;
  },

  // Lấy chi tiết đơn ứng tuyển
  getApplication: async (id) => {
    const response = await apiClient.get(`/api/v1/enterprise/applications/${id}`);
    return response.data;
  }
}; 
