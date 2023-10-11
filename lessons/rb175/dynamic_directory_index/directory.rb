require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

get "/" do
  @files = Dir.glob("public/*").select { |path| File.file?(path) }.map { |file| File.basename(file) }.sort
  @files.reverse! if params[:sort] == "desc"

  erb :home
end