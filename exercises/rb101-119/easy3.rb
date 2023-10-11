#	Searching 101
def search_for_number
  array = []
  ["1st", "2nd", "3rd", "4th", "5th", "last"].each do |i|
    puts ">> Enter the #{i} number:"
    array << gets.chomp.to_i
  end
  sixth_number = array.pop
  
  if array.include? sixth_number
    puts "The number #{sixth_number} appears in #{array}."
  else
    puts "The number #{sixth_number} does not appear in #{array}."
  end
end

#	Arithmetic Integer
def arithmetic
  puts ">> Enter the first number:"
  num1 = gets.chomp.to_i
  puts ">> Enter the second number:"
  num2 = gets.chomp.to_i
  
  ["+", "-", "*", "/", "%", "**"].each do |i|
    puts ">> #{num1} #{i} #{num2} = #{[num1, num2].inject(i.to_sym)}"
  end
end


#	Counting the Number of Characters
def count_chars
  puts ">> Please input one or more words:"
  input = gets.chomp
  
  puts ">> There are #{input.gsub(' ', '').length} characters in #{'"' + input + '"'}."
end

#	Multiplying Two Numbers
def multiply(num1, num2)
  num1 * num2
end

#	Squaring an Argument
def square(num, exponent)
  output = num
  (exponent - 1).times do
    output = multiply(output, num)
  end
  output
end

#	Exclusive Or
def xor?(arg1, arg2)
  if arg1 == true
    return true if arg2 == false
  elsif arg2 == true
    return true if arg1 == false
  end
  false
end

#	Palindromic Strings (Part 1)
def palindrome?(input)
  array = []
  begin
    input.chars.each do |i|
      array << i
    end
    input = array
  rescue
  end
  
  input.each_index do |i|
    return false if input[i] != input[input.length - i - 1]
  end
  true
end

#	Palindromic Strings (Part 2)
def real_palindrome?(input)
  palindrome?(input.downcase.gsub(/[^0-9a-z]/i, ''))
end

#	Palindromic Numbers
def palindromic_number?(int)
  while int.to_s[0] =='0'
    int.to_s[0] = ''
    int.to_i
  end
  palindrome?(int.to_s)
end

#	Uppercase Check
def uppercase?(input)
  return puts "No string provided" if input == ''
  return true if input.delete('^A-Z') == input.delete('^A-Za-z')
  false
end