#	Sum of Sums
def sum_of_sums(arr)
  output = 0
  arr.each_index do |i|
    arr[0..i].each do |j|
      output += j
    end
  end
  output
end

#	Leading Substrings
def leading_substrings(str)
  output = []
  str.chars.each_index { |i| output << str[0..i] }
  output
end

#	All Substrings
def substrings(str)
  output = []
  str.chars.each_index { |i| output << leading_substrings(str[i..-1]) }
  output.flatten
end

#	Palindromic Substrings
def palindromes(str)
  output = []
  substrings(str).each do |i|
    processed_i = i.downcase.delete('^a-z0-9')
    output << processed_i if processed_i == processed_i.reverse && processed_i.length > 1
  end
  output
end

#	fizzbuzz
def fizzbuzz(num1, num2)
  output = "\n" 
  (num1..num2).each do |i|
    output << i.to_s if i % 3 != 0 && i % 5 != 0
    output << 'Fizz' if i % 3 == 0
    output << 'Buzz' if i % 5 == 0
    output << ', '
  end
  output.chomp(', ')
end

#	Double Char (Part 1)
def repeater(str)
  output = ''
  str.chars.each { |i| output << i << i }
  output
end

#	Double Char (Part 2)
def double_consonants(str)
  output = []
  str.chars.each do |i|
    str.delete('a-zA-Z').include?(i) ? output << i : output << i << i
  end
  output.join
end

#	Reverse It (Part 1)
def reverse_sentence(str)
  output = []
  str.split.reverse_each { |i| output << i }
  output.join(' ')
end

#	Reverse It (Part 2)
def reverse_words(str)
  output = []
  str.split.each { |i| i.length >= 5 ? output << i.reverse : output << i }
  output.join(' ')
end

#	Array Average
def average(arr)
  output = 0
  arr.each { |i| output += i }
  output.to_f / arr.count.to_f
end