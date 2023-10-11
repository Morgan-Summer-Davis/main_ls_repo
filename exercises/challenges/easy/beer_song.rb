class BeerSong
  def self.verse(num)
    "#{format_bottles(num).capitalize} of beer on the wall, #{format_bottles(num)} of beer.\n"  +
    if num <= 0
      "Go to the store and buy some more, 99 bottles of beer on the wall.\n"
    else
      "Take #{num == 1 ? ('it') : ('one')} down and pass it around, "\
      "#{format_bottles(num - 1)} of beer on the wall.\n"
    end
  end

  def self.verses(first, last)
    (last..first).to_a.reverse.map { |num| self.verse(num) }.join("\n")
  end

  def self.lyrics
    self.verses(99, 0)
  end

  class << self
    private

    def format_bottles(num)
      case num
      when 0 then bottles = 'no more bottles'
      when 1 then bottles = '1 bottle'
      else        bottles = "#{num} bottles"
      end
    end
  end

end