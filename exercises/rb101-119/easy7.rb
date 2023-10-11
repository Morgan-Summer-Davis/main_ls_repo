#	Combine Two Lists
def interleave(arr1, arr2)
  output = []
  arr1.each_index { |i| output << arr1[i] << arr2[i] }
  output
end

def further_interleave(arr1, arr2)
  arr1.zip(arr2).flatten
end

#	Lettercase Counter
def letter_case_count(str)
  { lowercase: str.delete('^a-z').length,
    uppercase: str.delete('^A-Z').length,
    neither:   str.delete('a-zA-Z').length }
end

#	Capitalize Words
def word_cap(str)
  output = []
  str.split.each { |i| output << i.capitalize }
  output.join(' ')
end

CAPITALS = { 'a' => 'A', 'b' => 'B', 'c' => 'C', 'd' => 'D', 'e' => 'E',
             'f' => 'F', 'g' => 'G', 'h' => 'H', 'i' => 'I', 'j' => 'J', 
             'k' => 'K', 'l' => 'L', 'm' => 'M', 'n' => 'N', 'o' => 'O', 
             'p' => 'P', 'q' => 'Q', 'r' => 'R', 's' => 'S', 't' => 'T', 
             'u' => 'U', 'v' => 'V', 'w' => 'W', 'x' => 'X', 'y' => 'Y', 
             'z' => 'Z' }

def further_word_cap_1(str)
  output = str.downcase.split
  str.split.each_index do |i|
    output[i][0] = CAPITALS[output[i][0]] if CAPITALS.has_key?(output[i][0])
  end
  output.join(' ')
end

def further_word_cap_2(str)
  output = str.downcase.split
  str.split.each_index { |i| output[i][0] = output[i][0].upcase }
  output.join(' ')
end

#	Swap Case
def swapcase(str)
  str.chars.map { |i| i =~ /[a-z]/ ? i.upcase : i.downcase }.join
end

#	Staggered Caps (Part 1)
def staggered_case(str)
  str.chars.map.with_index { |v, i| i % 2 == 0 ? v.upcase : v.downcase }.join
end

def further_staggered_case(string, start_upcase = true, ignore_symbols = true)
  result = ''
  start_upcase ? need_upper = true : need_upper = false
  string.chars.each do |char|
    if char =~ /[a-zA-Z]/ || ignore_symbols
      if need_upper
        result += char.upcase
      else
        result += char.downcase
      end
      need_upper = !need_upper
    else
      result += char
    end
  end
  result
end

#	Staggered Caps (Part 2)
# Incorporated into the further_staggered_case method above, as well as the
# further exploration for this problem.

#	Multiplicative Average
def show_multiplicative_average(arr)
  output = 1.0
  arr.each { |i| output *= i }
  p format('%.3f', (output / arr.count).round(3))
end

#	Multiply Lists
def multiply_list(arr1, arr2)
  output = []
  arr1.each_index { |i| output[i] = arr1[i] * arr2[i] }
  output
end

def further_multiply_list(arr1, arr2)
  arr1.zip(arr2) { |i| i[0] * i[1] }
end

#	Multiply All Pairs
def multiply_all_pairs(arr1, arr2)
  output = []
  arr1.each do  |i|
    arr2.each do |j|
      output << i * j
    end
  end
  output.sort
end

#	The End Is Near But Not Here
def penultimate(str)
  str.split[-2]
end

def middle_word(str)
  str.split[str.split.count / 2].to_s
end

#	How Many
def count_occurrences(arr)
  result = Hash.new(0)
  arr.each { |i| result[i.downcase] += 1 }
  result.each_pair { |k, v| puts "#{k + " => " + v.to_s}" }
end