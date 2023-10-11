#	Cute angles
DEGREE = "\xC2\xB0"
MINUTES_PER_DEGREE = 60
SECONDS_PER_MINUTE = 60

def dms(float)
  degrees = float.floor
  minutes = ((float - degrees) * MINUTES_PER_DEGREE).floor
  seconds = ((((float - degrees) * MINUTES_PER_DEGREE) - minutes) *
            SECONDS_PER_MINUTE).floor
  
  
  "#{ (degrees % 360).to_s + DEGREE +
      format("%02d", minutes) + "'" +
      format("%02d", seconds) + '"' }"
end

#	Delete vowels
def remove_vowels(arr)
  output = []
  arr.each { |i| output << i.delete('aeiouAEIOU') }
  output
end

#	Fibonacci Number Location By Length
def find_fibonacci_index_by_length(int)
  fibonacci = [1, 1]
  output = 2
  while fibonacci[1].digits.count < int
    fibonacci[0], fibonacci[1] = fibonacci[1], fibonacci[0] + fibonacci[1]
    output += 1
  end
  output
end

#	Reversed Arrays (Part 1)
def reverse!(arr)
  arr.reverse_each { |i| arr << i }
  (arr.count / 2).times { arr.shift }
  arr
end

#	Reversed Arrays (Part 2)
def reverse(arr)
  output = []
  arr.reverse_each { |i| output << i }
  output
end

def further_reverse(arr)
  output = arr.each_with_object([]) { |i, a| a.unshift(i) }
end

#	Combining Arrays
def merge(arr1, arr2)
  output = arr1
  arr2.each { |i| output << i unless arr1.include?(i) }
  output
end

#	Halvsies
def halvsies(arr)
  output = [[], []]
  arr.each do |i|
    output[0].count < arr.count.to_f / 2 ? output[0] << i : output[1] << i
  end
  output
end

#	Find the Duplicate
def find_dup(arr)
  arr.each_index { |i| return arr[i] if arr[i + 1, arr.count - 1].include?(arr[i]) }
end

#	Does My List Include This?
def include?(arr, search_item)
  arr.each { |i| return true if i == search_item }
  false
end

#	Mutation
# Moe
# Larry
# CURLY
# SHEMP
# Harpo
# CHICO
# Groucho
# Zeppo