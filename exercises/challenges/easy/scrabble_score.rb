SCRABBLE_LETTER_SCORES = { 1  => ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
                           2  => ['D', 'G'],
                           3  => ['B', 'C', 'M', 'P'],
                           4  => ['F', 'H', 'V', 'W', 'Y'],
                           5  => ['K'],
                           8  => ['J', 'X'],
                           10 => ['Q', 'Z'] }

class Scrabble
  def initialize(word)
    @word = word
  end

  def score
    output = 0
    @word.upcase.chars.each do |char|
      SCRABBLE_LETTER_SCORES.each do |key, value|
        output += key if value.include? char
      end
    end if @word.class == String
    output
  end

  def self.score(word)
    self.new(word).score
  end
end