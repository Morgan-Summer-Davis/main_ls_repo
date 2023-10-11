# Repeat Yourself
def repeat(input, number_of_repeats)
  number_of_repeats.times { puts input }
end

#	Odd
def is_odd?(number)
  !(number.remainder(2) == 0)
end

#	Stringy Strings
def stringy(number, reverse = 1)
  output = '1'
  output = '0' if reverse != 1
  (number - 1).times { |_| output << (output[output.length - 1].to_i - 1).abs.to_s }
  output
end

#	What's my Bonus?
def calculate_bonus(salary, bonus)
  return salary / 2 if bonus
  0
end

#	Bannerizer
def print_in_box(input)
  banner_vertical = '+--+'
  banner_horizontal = '|  |'
  input.length.times do
    banner_vertical.insert(banner_vertical.length - 1, '-')
    banner_horizontal.insert(banner_horizontal.length - 1 , ' ')
  end
  
  puts banner_vertical
  puts banner_horizontal
  puts '| ' + input + " |"
  puts banner_horizontal
  puts banner_vertical
end

#	Right Triangles
def triangle(int, corner = 'topleft')
  corner.include?("top") ? (stars, spaces = int, 0) : (stars, spaces = 1, int)
  
  int.times do
    corner.include?("left") ? (puts '*' * stars + ' ' * spaces) :
                              (puts ' ' * spaces + '*' * stars)
    corner.include?("top") ? (stars, spaces = stars - 1, spaces + 1) :
                             (stars, spaces = stars + 1, spaces - 1)
  end
end

#	Madlibs
def madlib
  words = { noun: '',
            verb: '',
            adjective: '',
            adverb: '' }
  
  words.each_pair do |key, value|
    puts "Enter a #{key.to_s}:"  if !"aeiou".include?(key.to_s[0])
    puts "Enter an #{key.to_s}:" if "aeiou".include?(key.to_s[0])
    value << gets.chomp
  end

  puts "Do you #{words[:verb]} your #{words[:adjective]} #{words[:noun]} "\
        "#{words[:adverb]}? That's hilarious!"
end

#	Reverse the Digits in a Number
def reversed_number(int)
  output = 0
  i = 1
  int.to_s.chars.each do |digit|
    output += digit.to_i * i
    i *= 10
  end
  output.to_s
end

#	Get Middle Character
def center_of(input)
  return input[input.length / 2] if input.length.odd?
  return input[input.length / 2 - 1, 2] if input.length.even?
end