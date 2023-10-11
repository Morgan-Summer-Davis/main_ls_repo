#	Longest Sentence
def longest_sentence(file_path)
  file = File.read(file_path).gsub("\n", ' ').split(/[\.\?\!]/)
  file = file.each.map(&:split).sort_by { |i| i.count }
  p file.last.join(' ')
end

def further_longest(file_path, struct = 'sentence')
  output = []
  struct_end = 0
  file = File.read(file_path)
  
  case struct.downcase
  when 'sentence'
    file.gsub!("\n", ' ')
    while file.length > 0
      file.index(/[\.\!\?]/) ? struct_end = file.index(/[\.\!\?]/) :
                               struct_end = -1
      output << file[0..struct_end]
      file.gsub!(file[0..struct_end], '')
    end
    output = output.each.map(&:split).sort_by { |i| i.count }.last.join(' ')
  when 'word'
    output = file.split.sort_by { |i| i.length }.last
  when 'paragraph'
    output = file.split("\n\n").each { |i| i.gsub!("\n", ' ') }.map!(&:split)
             .sort_by { |i| i.count }.last.join(' ')
  end
  
  puts output
end

#	Now I Know My ABCs
BLOCKS = [['b', 'o'], ['x', 'k'], ['d', 'q'], ['c', 'p'], ['n', 'a'],
          ['g', 't'], ['r', 'e'], ['f', 's'], ['j', 'w'], ['h', 'u'],
          ['v', 'i'], ['l', 'y'], ['z', 'm']]

def block_word?(str)
  blocks = []
  
  str.downcase.chars.each do |i|
    BLOCKS.each_index do |j|
      blocks << BLOCKS[j] if BLOCKS[j].include?(i) 
    end
  end
  
  blocks == blocks.uniq
end

#	Lettercase Percentage Ratio
def letter_percentages(str)
  { lowercase: ((str.delete('^a-z').length.to_f   / str.length.to_f) * 100).round(1),
    uppercase: ((str.delete('^A-Z').length.to_f   / str.length.to_f) * 100).round(1),
    neither:   ((str.delete('a-zA-Z').length.to_f / str.length.to_f) * 100).round(1) }
end

#	Matching Parentheses?
def balanced?(str)
  while str.include?('(') && str.include?(')') &&
        str.index("(") < str.index(")")
    parentheses = str[str[0..str.index(")")].rindex("(")..str.index(")")]

    str.slice!(parentheses)
  end
  !(str.include?('(') || str.include?(')'))
end

def further_balanced?(str)
  parens, squares, curlies, single_quotes, quotes = 0, 0, 0, 0, 0
  str.each_char do |char|
    parens         += 1 if char == '('
    parens         -= 1 if char == ')'
    squares        += 1 if char == '['
    squares        -= 1 if char == ']'
    curlies        += 1 if char == '{'
    curlies        -= 1 if char == '}'
    single_quotes  += 1 if char == "'"
    quotes         += 1 if char == '"'
    [parens, squares, curlies].each { |i| break if i < 0 }
  end
  
  parens.zero? && squares.zero? && curlies.zero? &&
  single_quotes.even? && quotes.even?
end

#	Triangle Sides
def triangle_sides(side1, side2, side3)
  tri = [side1, side2, side3].sort
  
  return :invalid     if tri.include?(0) || tri[0] + tri[1] <= tri[2]
  return :equilateral if tri.uniq.count == 1
  return :scalene     if tri == tri.uniq
  return :isosceles
end

#	Tri-Angles
def triangle(angle1, angle2, angle3)
  tri = [angle1, angle2, angle3].sort
  
  return :invalid     if tri.include?(0) || tri.reduce(:+) != 180
  return :right       if tri.include?(90)
  return :obtuse      if tri.index { |i| i > 90 }
  return :acute
end

#	Unlucky Days
def friday_13th(year)
  output = 0
  12.times { |month| output += 1 if Time.new(year, month + 1, 13).friday? }
  output
end

def five_fridays(year)
  output = 0
  
  (1..12).each do |month|
    fridays = 0
    (1..31).each do |day|
      break if Time.new(year, month, day).month != month || fridays >= 5
      fridays += 1 if Time.new(year, month, day).friday?
      output += 1 if fridays == 5
    end
  end
  output
end

#	Next Featured Number Higher than a Given Value
def featured(int)
  (int+1..9876543210).find do |i|
    i.odd? && i.digits == i.digits.uniq && i % 7 == 0
  end || 'There is no possible number that fulfills those requirements'
end

#	Bubble Sort
def bubble_sort!(arr)
  i = 0
  
  while i < arr.count
    if arr[i + 1] && arr[i + 1] < arr[i]
      arr.insert(i + 1, arr.slice!(i))
      i = -1
    end
    i += 1
  end
end

#	Sum Square - Square Sum
def sum_square_difference(int)
  (1..int).inject(&:+)**2 - (1..int).map { |i| i**2 }.inject(&:+)
end

