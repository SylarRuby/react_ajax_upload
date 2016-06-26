class UsersController < ApplicationController
  def update
    u = User.find(1).update_attributes(user_params)

    if request.xhr?
        render :json => {   # This can be extracted into a helper method to make it reusable:
                            :user => User.find(1).as_json(:methods => [:avatar_url_medium])
                        }
    end
  end

  private
    def user_params
      params.require(:user).permit(:avatar, :first_name, :last_name)
    end
end
