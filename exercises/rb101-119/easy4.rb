# Short Long Short
def short_long_short(str1, str2)
  str1.length < str2.length ? str1 + str2 + str1 : str2 + str1 + str2
end

#	What Century is That?
def century(year)
  year -= 1 if year % 100 == 0
  output = (year / 100 + 1).to_s
  
  if output.length > 1 && output[output.length - 2] == "1"
    output += "th"
  elsif output.chars.last == "1"
    output += "st"
  elsif output.chars.last == "2"
    output += "nd"
  elsif output.chars.last == "3"
    output += "rd"
  else
    output += "th"
  end
  
  output
end

#	Leap Years (Part 1)
def leap_year?(year)
  return puts "Only years after 0 CE can be inputted." if year <= 0
  
  if year > 1752
    return true if (year % 4 == 0 && year % 100 != 0) ||
                   (year % 400 == 0 && year % 100 == 0)
  else
    return true if year % 4 == 0
  end

  false
end


#	Leap Years (Part 2)
# Incorporated into Part 1 above.

#	Multiples of 3 and 5
def multisum(num)
  output = 0
  (1..num).each { |i| output += i if i % 3 == 0 || i % 5 == 0 }
  output
end

def multisum_with_inject(num)
  array = (0..num).to_a.delete_if { |n| n % 3 != 0 && n % 5 != 0 }
  array.inject { |sum, i| sum + i }
end

#	Running Totals
def running_total(arr)
  output = []
  total = 0
  arr.each do |i|
    total += i
    output << total
  end
  output
end

def running_total_with_object(arr)
  total = 0
  arr.each_with_object([]) do |i, a|
    total += i
    a << total
  end
end

#	Convert a String to a Number!
def string_to_integer(num)
  output = 0
  array = []
  num.reverse!
  
  num.chars.each_index do |i|
    array << '0123456789'.index(num[i])
    
    output += array[i] * (10 ** i)
  end
  output
end

HEXES = { '0' => 0, '1' => 1, '2' => 2, '3' => 3, '4' => 4, '5' => 5, '6' => 6,
          '7' => 7, '8' => 8, '9' => 9, 'a' => 10, 'b' => 11, 'c' => 12,
          'd' => 13, 'e' => 14, 'f' => 15 }

def hexadecimal_to_integer(hex)
  output = 0
  array = []
  hex.downcase!.reverse!
  
  hex.chars.each_index do |i|
    array << HEXES[hex[i]]
    
    output += array[i] * (16 ** i)
  end
  output
end

#	Convert a String to a Signed Number!
def string_to_signed_integer(num)
  num[0] = '' while num[0] == "+"
  num[0] == '-' ? -string_to_integer(num[1, num.length]) : string_to_integer(num)
end

def further_string_to_signed_integer(string)
  case string[0]
  when '-' then pos_or_neg = -1
  when '+' then pos_or_neg = 1
  else          pos_or_neg, string = 1, ' ' + string
  end
  string_to_integer(string[1..-1]) * pos_or_neg
end
# This technically completes the assignment but is it really fair to say this
# is refactored to be less repetitive?

#	Convert a Number to a String!
NUMBERS_TO_STRINGS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]

def integer_to_string(int)
  output = ''
  int.digits.each do |i|
    output.insert(0, NUMBERS_TO_STRINGS[i])
  end
  output
end

#	Convert a Signed Number to a String!
def signed_integer_to_string(int)
  sign = ''
  case 
  when int < 0 then sign = "-"
  when int > 0 then sign = "+"
  end
  
  sign + integer_to_string(int.abs)
end