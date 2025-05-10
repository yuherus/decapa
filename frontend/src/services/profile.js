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

// Service cho thông tin cá nhân người dùng
export const profileService = {
  // Lấy thông tin tổng thể của profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('api/v1/users/profile');
      console.log("Response: ", response.data)
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật thông tin cơ bản
  updateProfile: async (userData) => {
    try {
      const formData = new FormData();
      
      // Thêm các trường thông tin cơ bản
      Object.keys(userData).forEach(key => {
        if (key === 'avatar' && userData[key] instanceof File) {
          formData.append(`user[${key}]`, userData[key]);
        } else if (key === 'account_attributes' && typeof userData[key] === 'object' && userData[key] !== null) {
          Object.keys(userData[key]).forEach(subKey => {
            formData.append(`user[${key}][${subKey}]`, userData[key][subKey]);
          });
        }
         else if (key !== 'avatar') {
          formData.append(`user[${key}]`, userData[key]);
        }
      });
      
      const response = await apiClient.patch('api/v1/users/update_profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // APIs cho giáo dục
  education: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_educations');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_educations', { user_education: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_educations/${id}`, { user_education: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_educations/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho kinh nghiệm làm việc
  experience: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_experiences');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_experiences', { user_experience: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_experiences/${id}`, { user_experience: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_experiences/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho dự án
  project: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_projects');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_projects', { user_project: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_projects/${id}`, { user_project: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_projects/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho chứng chỉ
  certificate: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_certificates');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_certificates', { user_certificate: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_certificates/${id}`, { user_certificate: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_certificates/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho giải thưởng
  award: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_awards');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_awards', { user_award: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_awards/${id}`, { user_award: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_awards/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho kỹ năng
  skill: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_skills');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    getAllSkills: async () => {
      try {
        const response = await apiClient.get('api/v1/skills');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        // Xử lý trường hợp tạo kỹ năng mới hoặc chọn kỹ năng có sẵn
        let payload = { user_skill: { level: data.level } };
        
        if (data.skill_id) {
          payload.user_skill.skill_id = data.skill_id;
        } else if (data.skill_name) {
          payload = { ...payload, skill_name: data.skill_name };
        }
        
        const response = await apiClient.post('api/v1/user_skills', payload);
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    createSkill: async (data) => {
      try {
        const response = await apiClient.post('api/v1/skills', { skill: { skill_name: data.skill_name } });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_skills/${id}`, { user_skill: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_skills/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  },

  // APIs cho mạng xã hội
  socialLink: {
    getAll: async () => {
      try {
        const response = await apiClient.get('api/v1/user_social_links');
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    create: async (data) => {
      try {
        const response = await apiClient.post('api/v1/user_social_links', { user_social_link: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    update: async (id, data) => {
      try {
        const response = await apiClient.patch(`api/v1/user_social_links/${id}`, { user_social_link: data });
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    delete: async (id) => {
      try {
        await apiClient.delete(`api/v1/user_social_links/${id}`);
        return true;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
};

export default profileService; 
