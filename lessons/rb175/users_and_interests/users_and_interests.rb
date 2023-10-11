require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require "yaml"

before do
  @user_hash = YAML.load_file "users.yaml"
  @users = @user_hash.keys.map(&:to_s)
end

helpers do
  def count_interests
    @user_hash.values.map { |value| value[:interests] }.flatten.count
  end
end

get '/' do
  redirect '/users'
end

get '/users' do
  erb :user_list
end

get '/users/:user' do |user|
  @user = user
  @email, @interests = @user_hash[@user.to_sym][:email], @user_hash[@user.to_sym][:interests].join(', ')

  erb :user_page
end