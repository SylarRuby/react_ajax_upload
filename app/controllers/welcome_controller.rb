class WelcomeController < ApplicationController
  def index
    @user = User.find(1).as_json(:methods => [:avatar_url_medium])
  end
end
