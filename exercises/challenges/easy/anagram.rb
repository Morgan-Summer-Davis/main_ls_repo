class Anagram
  def initialize(word)
    @word = word
  end

  def match(arr)
    arr.each_with_object([]) do |str, memo|
      memo << str if (str.downcase.chars.sort == @word.downcase.chars.sort) &&
                                                 str.downcase != @word.downcase
    end
  end
end