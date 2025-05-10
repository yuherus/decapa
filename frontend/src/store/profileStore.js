import { create } from 'zustand';
import profileService from '@/services/profile';

const useProfileStore = create((set, get) => ({
  // State
  user: null,
  userEducations: [],
  userExperiences: [],
  userProjects: [],
  userCertificates: [],
  userAwards: [],
  userSkills: [],
  userSocialLinks: [],
  isLoading: false,
  error: null,

  // Thao tác cơ bản với state
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Lấy toàn bộ dữ liệu profile
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await profileService.getProfile();
      set({
        user: data.user,
        userEducations: data.user_educations || [],
        userExperiences: data.user_experiences || [],
        userProjects: data.user_projects || [],
        userCertificates: data.user_certificates || [],
        userAwards: data.user_awards || [],
        userSkills: data.user_skills || [],
        userSocialLinks: data.user_social_links || [],
        isLoading: false
      });
    } catch (error) {
      set({ error: error.message || 'Lỗi khi tải dữ liệu profile', isLoading: false });
    }
  },

  // Cập nhật thông tin cơ bản của user
  updateUserProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await profileService.updateProfile(userData);
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật thông tin', isLoading: false });
      throw error;
    }
  },

  // ------ Education ------
  addEducation: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newEducation = await profileService.education.create(data);
      set(state => ({ 
        userEducations: [...state.userEducations, newEducation], 
        isLoading: false 
      }));
      return newEducation;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm học vấn', isLoading: false });
      throw error;
    }
  },

  updateEducation: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEducation = await profileService.education.update(id, data);
      set(state => ({
        userEducations: state.userEducations.map(item => 
          item.id === id ? updatedEducation : item
        ),
        isLoading: false
      }));
      return updatedEducation;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật học vấn', isLoading: false });
      throw error;
    }
  },

  deleteEducation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.education.delete(id);
      set(state => ({
        userEducations: state.userEducations.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa học vấn', isLoading: false });
      throw error;
    }
  },

  // ------ Experience ------
  addExperience: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newExperience = await profileService.experience.create(data);
      set(state => ({ 
        userExperiences: [...state.userExperiences, newExperience], 
        isLoading: false 
      }));
      return newExperience;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm kinh nghiệm', isLoading: false });
      throw error;
    }
  },

  updateExperience: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedExperience = await profileService.experience.update(id, data);
      set(state => ({
        userExperiences: state.userExperiences.map(item => 
          item.id === id ? updatedExperience : item
        ),
        isLoading: false
      }));
      return updatedExperience;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật kinh nghiệm', isLoading: false });
      throw error;
    }
  },

  deleteExperience: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.experience.delete(id);
      set(state => ({
        userExperiences: state.userExperiences.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa kinh nghiệm', isLoading: false });
      throw error;
    }
  },

  // ------ Project ------
  addProject: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newProject = await profileService.project.create(data);
      set(state => ({ 
        userProjects: [...state.userProjects, newProject], 
        isLoading: false 
      }));
      return newProject;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm dự án', isLoading: false });
      throw error;
    }
  },

  updateProject: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProject = await profileService.project.update(id, data);
      set(state => ({
        userProjects: state.userProjects.map(item => 
          item.id === id ? updatedProject : item
        ),
        isLoading: false
      }));
      return updatedProject;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật dự án', isLoading: false });
      throw error;
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.project.delete(id);
      set(state => ({
        userProjects: state.userProjects.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa dự án', isLoading: false });
      throw error;
    }
  },

  // ------ Certificate ------
  addCertificate: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newCertificate = await profileService.certificate.create(data);
      set(state => ({ 
        userCertificates: [...state.userCertificates, newCertificate], 
        isLoading: false 
      }));
      return newCertificate;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm chứng chỉ', isLoading: false });
      throw error;
    }
  },

  updateCertificate: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCertificate = await profileService.certificate.update(id, data);
      set(state => ({
        userCertificates: state.userCertificates.map(item => 
          item.id === id ? updatedCertificate : item
        ),
        isLoading: false
      }));
      return updatedCertificate;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật chứng chỉ', isLoading: false });
      throw error;
    }
  },

  deleteCertificate: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.certificate.delete(id);
      set(state => ({
        userCertificates: state.userCertificates.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa chứng chỉ', isLoading: false });
      throw error;
    }
  },

  // ------ Award ------
  addAward: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newAward = await profileService.award.create(data);
      set(state => ({ 
        userAwards: [...state.userAwards, newAward], 
        isLoading: false 
      }));
      return newAward;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm giải thưởng', isLoading: false });
      throw error;
    }
  },

  updateAward: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedAward = await profileService.award.update(id, data);
      set(state => ({
        userAwards: state.userAwards.map(item => 
          item.id === id ? updatedAward : item
        ),
        isLoading: false
      }));
      return updatedAward;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật giải thưởng', isLoading: false });
      throw error;
    }
  },

  deleteAward: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.award.delete(id);
      set(state => ({
        userAwards: state.userAwards.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa giải thưởng', isLoading: false });
      throw error;
    }
  },

  // ------ Skill ------
  addSkill: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newSkill = await profileService.skill.create(data);
      set(state => ({ 
        userSkills: [...state.userSkills, newSkill], 
        isLoading: false 
      }));
      return newSkill;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm kỹ năng', isLoading: false });
      throw error;
    }
  },

  updateSkill: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedSkill = await profileService.skill.update(id, data);
      set(state => ({
        userSkills: state.userSkills.map(item => 
          item.id === id ? updatedSkill : item
        ),
        isLoading: false
      }));
      return updatedSkill;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật kỹ năng', isLoading: false });
      throw error;
    }
  },

  deleteSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.skill.delete(id);
      set(state => ({
        userSkills: state.userSkills.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa kỹ năng', isLoading: false });
      throw error;
    }
  },

  // ------ Social Link ------
  addSocialLink: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newSocialLink = await profileService.socialLink.create(data);
      set(state => ({ 
        userSocialLinks: [...state.userSocialLinks, newSocialLink], 
        isLoading: false 
      }));
      return newSocialLink;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi thêm liên kết mạng xã hội', isLoading: false });
      throw error;
    }
  },

  updateSocialLink: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedSocialLink = await profileService.socialLink.update(id, data);
      set(state => ({
        userSocialLinks: state.userSocialLinks.map(item => 
          item.id === id ? updatedSocialLink : item
        ),
        isLoading: false
      }));
      return updatedSocialLink;
    } catch (error) {
      set({ error: error.message || 'Lỗi khi cập nhật liên kết mạng xã hội', isLoading: false });
      throw error;
    }
  },

  deleteSocialLink: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await profileService.socialLink.delete(id);
      set(state => ({
        userSocialLinks: state.userSocialLinks.filter(item => item.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Lỗi khi xóa liên kết mạng xã hội', isLoading: false });
      throw error;
    }
  },
}));

export default useProfileStore; 
