#	Welcome Stranger
def greetings(arr, hash)
  puts "=> Hello, #{arr.join(' ')}! Nice to have a #{hash[:title]} "\
       "#{hash[:occupation]} around."
end

#	Double Doubles
def twice(int)
  int *= 2 unless int.digits[0..int.digits.count / 2 - 1] ==
                  int.digits[int.digits.count / 2..-1] &&
                  int.digits.count.even?
  int
end

#	Counting Up
def sequence(int)
  int > 0 ? (1..int).to_a : (int..-1).to_a
end

#	How long are you?
def word_lengths(str)
  str.split.map { |i| i + " " + i.length.to_s }
end

#	Name Swapping
def swap_name(str)
  str.split[1] + ", " + str.split[0]
end

#	Sequence Count
def sequence_count(count, first)
  (1..count).map { |i| i * first }
end

#	Grade book
LETTER_GRADES = { 'A' => (90..100), 'B' => (80..89), 'C' => (70..79),
                  'D' => (60..69), 'F' => (0..59) }

def get_grade(int1, int2, int3)
  LETTER_GRADES.each_pair do |k, v|
    return k if v.include?((int1 + int2 + int3) / 3)
  end
  'A with extra credit!'
end

#	Grocery List
def buy_fruit(arr)
  arr.map { |i| ((i[0] + ' ') * i[1]).split }.flatten 
end

#	Group Anagrams
def anagrams(arr)
  output = []
  
  arr.each do |i|
    temp_arr = []
    arr.each do |j|
      temp_arr << j if j.chars.sort == i.chars.sort
    end
    output << temp_arr
  end
  
  output.each { |i| p i }
end

#	Sum of Digits
def sum(int)
  int.digits.inject(:+)
end

# Odd Lists
def oddities(arr)
  arr.select.with_index { |_, i| i % 2 == 0 }
end

def further_oddities_1(arr)
  arr.select.with_index { |_, i| i % 2 != 0 }
end

def further_oddities_2(arr)
  output = []
  arr.each_with_index { |v, i| output << v if i % 2 != 0 }
  output
end