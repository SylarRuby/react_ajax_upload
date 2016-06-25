class UsersController < ApplicationController
  def update
    User.find(1).update_attributes(user_params)
  end

  private
    def user_params
      params.require(:user).permit(:avatar)
    end
end
