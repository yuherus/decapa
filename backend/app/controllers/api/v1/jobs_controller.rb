module Api
  module V1
    class JobsController < ApplicationController      
      before_action :set_job, only: [:show, :update, :destroy]
      
      # GET /api/v1/jobs
      def index
        @q = Job.includes({ company: :company_social_links }, :company_address, :skills)
              .where(status: :active)
              .ransack(params[:q])
        @q.sorts = 'created_at desc' if @q.sorts.empty?
        
        pagy, jobs = pagy(@q.result(distinct: true), limit: params[:per_page])
        
        render json: {
          jobs: ActiveModelSerializers::SerializableResource.new(jobs),
          metadata: pagy_metadata(pagy)
        }
      end
      
      # GET /api/v1/jobs/:id
      def show
        render json: @job, include: ['company.company_social_links', 'company.country', 'company_address', 'skills']
      end
      
      # # POST /api/v1/jobs
      # def create
      #   @job = Job.new(job_params)
        
      #   if @job.save
      #     render json: @job, status: :created
      #   else
      #     render json: { errors: @job.errors }, status: :unprocessable_entity
      #   end
      # end
      
      # # PATCH/PUT /api/v1/jobs/:id
      # def update
      #   if @job.update(job_params)
      #     render json: @job
      #   else
      #     render json: { errors: @job.errors }, status: :unprocessable_entity
      #   end
      # end
      
      # # DELETE /api/v1/jobs/:id
      # def destroy
      #   @job.destroy
      #   head :no_content
      # end
      
      private
      
      def set_job
        @job = Job.includes({ company: :company_social_links }, :company_address, :skills).find(params[:id])
      end
      
      def job_params
        params.require(:job).permit(
          :title, :description, :requirements, :benefit, 
          :job_type, :contract_type, :min_salary, :max_salary, 
          :experience, :expired_at, :company_id, :company_address_id, :status,
          :currency, :salary_period, :display_salary,
          skill_ids: [],
          company_attributes: [:id, company_social_link: []]
        )
      end
    end
  end
end
