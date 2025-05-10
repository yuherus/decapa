class Api::V1::CountriesController < Api::V1::SecuredController
  # GET /api/v1/countries
  def index
    countries = Country.all.order(:name)
    
    render json: {
      countries: countries.as_json(only: [:id, :name, :code]),
      message: "Lấy danh sách quốc gia thành công",
      success: true
    }, status: :ok
  end
  
  # GET /api/v1/countries/:id
  def show
    country = Country.find_by(id: params[:id])
    
    if country
      render json: {
        country: country.as_json(only: [:id, :name, :code]),
        message: "Lấy thông tin quốc gia thành công",
        success: true
      }, status: :ok
    else
      render json: {
        message: "Không tìm thấy quốc gia",
        success: false
      }, status: :not_found
    end
  end
end
