class AddNamesToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string, default: ""
    add_column :users, :last_name, :string, default: ""
  end
end
