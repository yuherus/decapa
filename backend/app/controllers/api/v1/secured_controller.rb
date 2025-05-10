module Api
  module V1
    class SecuredController < ApplicationController
      before_action :authenticate_account!
      
      # Tất cả các controller kế thừa từ SecuredController sẽ tự động yêu cầu xác thực token JWT
    end
  end
end 
