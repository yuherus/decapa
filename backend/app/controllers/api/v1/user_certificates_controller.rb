class Api::V1::UserCertificatesController < Api::V1::SecuredController
  before_action :set_certificate, only: [:show, :update, :destroy]

  # GET /api/v1/user_certificates
  def index
    @certificates = current_user.user_certificates
    render json: @certificates, each_serializer: UserCertificateSerializer, status: :ok
  end

  # GET /api/v1/user_certificates/:id
  def show
    render json: @certificate, serializer: UserCertificateSerializer, status: :ok
  end

  # POST /api/v1/user_certificates
  def create
    @certificate = current_user.user_certificates.new(certificate_params)

    if @certificate.save
      render json: @certificate, serializer: UserCertificateSerializer, status: :created
    else
      render json: { errors: @certificate.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/user_certificates/:id
  def update
    if @certificate.update(certificate_params)
      render json: @certificate, serializer: UserCertificateSerializer, status: :ok
    else
      render json: { errors: @certificate.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user_certificates/:id
  def destroy
    @certificate.destroy
    head :no_content
  end

  private

  def set_certificate
    @certificate = current_user.user_certificates.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Certificate not found' }, status: :not_found
  end

  def certificate_params
    params.require(:user_certificate).permit(
      :certificate_name, :organization, :issue_date, :description
    )
  end
end 
