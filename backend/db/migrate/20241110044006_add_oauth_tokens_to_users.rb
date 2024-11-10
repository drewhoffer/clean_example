class AddOauthTokensToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :oauth_token, :string
    add_column :users, :refresh_token, :string
  end
end
