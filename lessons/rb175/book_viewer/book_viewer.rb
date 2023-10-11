require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

before do
  @table_of_contents = File.readlines("data/toc.txt")
end

helpers do
  def in_paragraphs(text)
    text.split("\n\n")
  end

  def files_containing(text)
    Dir.glob("data/*").select do |path|
      File.file?(path) && File.read(path).include?(text)
    end
  end

  def get_chapter_title(file)
    @table_of_contents[File.basename(file).slice(/[\d]+/).to_i - 1]
  end

  def bold_substring(text, substring)
    text.split(substring).join("<strong>#{substring}</strong>")
  end
end

get "/" do
  @title = "The Adventures of Sherlock Holmes"

  erb :home
end

get "/chapters/:number" do
  number = params[:number].to_i
  @title = @table_of_contents[number - 1]
  @chapter = File.read("data/chp#{number}.txt")

  redirect "/" unless (1..@table_of_contents.size).cover? number

  erb :chapter
end

get "/search" do
  erb :search
end

not_found do
  redirect "/"
end