#	Rotation (Part 1)
def rotate_array(arr)
  arr[1..-1] + [arr[0]]
end

def rotate_string(str)
  rotate_array(str.chars).join
end

def rotate_integer(int)
  rotate_array(int.digits.reverse).join
end

#	Rotation (Part 2)
def rotate_rightmost_digits(num, count)
  digits = num.to_s.chars.reverse
  (digits[0..-count - 1] + [rotate_array(digits[-count..-1])]).join
end

#	Rotation (Part 3)
def max_rotation(int)
  output = int.to_s
  int.digits.count.times do |i|
    output = rotate_rightmost_digits(output, int.digits.count - i)
  end
  output
end

# The rotation methods initially handled integers, as the original problem
# called for, but to satisfy the Further Exploration request to preserve zeroes,
# they were changed to output strings, as that is the only solution I can think
# of. I could then call to_i at the end, but that will still eliminate some
# number of zeroes--ie, 10001 would return 1010 instead of 01010.


#	1000 Lights
def switches(int)
  output = (1..int).to_a
  
  (2..int).each do |i|
    (2..int).each do |j|
      if j % i == 0
        output.include?(j) ? output.delete(j) : output << j
      end
    end
  end
  
  puts "Lights #{output[0..-2].join(", ")} and #{output[-1]} are on; "\
       "lights #{((1..int).to_a - output)[0..-2].join(", ")} and "\
       "#{((1..int).to_a - output)[-1]} are off."
end

#	Diamonds!
def diamond(int)
  spaces = (int - 1) / 2
  
  int.times do |i|
    puts (' ' * spaces.abs) + ('*' * (int - spaces.abs * 2)) + (' ' * spaces.abs)
    spaces -= 1
  end
end

def further_print_row(grid_size, distance_from_center)
  number_of_stars = grid_size - 2 * distance_from_center
  stars = ' ' * number_of_stars
  stars[0], stars[-1] = '*', '*'
  puts stars.center(grid_size)
end

def further_diamond(grid_size)
  max_distance = (grid_size - 1) / 2
  max_distance.downto(0) { |distance| further_print_row(grid_size, distance) }
  1.upto(max_distance)   { |distance| further_print_row(grid_size, distance) }
end

#	Stack Machine Interpretation
def minilang(input)
  register = 0
  stack = []
  input = input.downcase.split
  
  input.each do |command|
    case command
    when command.to_i.to_s then register = command.to_i
    when "push"            then stack << register
    when "add"             then register += stack.pop
    when "sub"             then register -= stack.pop
    when "mult"            then register *= stack.pop
    when "div"             then register /= stack.pop
    when "mod"             then register %= stack.pop
    when "pop"             then register = stack.pop
    when "print"           then puts register
    end
  end
end

def further_minilang(input)
  if input.count('^0-9()*/+-% ') > 0
    return "Invalid input. Only integers and operators are valid inputs."
  elsif input.length == 0
    return "Invalid input. Cannot process an empty stack."
  end
  processed_input = input.insert(0, '(') + ')'
  parentheses = processed_input
  while processed_input.include? ('(')
    parentheses = processed_input[processed_input[0..processed_input.index(")")]
                  .rindex("(")..processed_input.index(")")]

    processed_input[processed_input.index(parentheses)..processed_input
    .index(parentheses) + parentheses.length - 1] = pemdas(parentheses)
  end
  
  p processed_input
  return
end

def pemdas(equation)
  equation = equation.delete('()').split

  while equation.include?('**')
    i = equation.index('**')
    operation = equation[i]
    equation[i - 1..i + 1] =
    (equation[i - 1].to_i ** equation[i + 1].to_i).to_s
  end

  while equation.include?('*') || equation.include?('/') ||
        equation.include?('%')
    i = equation.index { |char| ['*', '/', '%'].include?(char) }
    operation = equation[i]
    case operation
    when '*'
      equation[i - 1..i + 1] =
      (equation[i - 1].to_i * equation[i + 1].to_i).to_s
    when '/'
      equation[i - 1..i + 1] =
      (equation[i - 1].to_i / equation[i + 1].to_i).to_s
    when '%'
      equation[i - 1..i + 1] =
      (equation[i - 1].to_i % equation[i + 1].to_i).to_s
    end
  end

  while equation.include?('+') || equation.include?('-')
    i = equation.index { |char| ['+', '-'].include?(char) }
    operation = equation[i]
    case operation
    when '+' 
      equation[i - 1..i + 1] =
      (equation[i - 1].to_i + equation[i + 1].to_i).to_s
    when '-'
      equation[i - 1..i + 1] =
      (equation[i - 1].to_i - equation[i + 1].to_i).to_s
    end
  end
  
  equation.join
end

#	Word to Digit
NUMBERS = { 'zero' => 0, 'one' => 1, 'two' => 2, 'three' => 3, 'four' => 4,
            'five' => 5, 'six' => 6, 'seven' => 7, 'eight' => 8, 'nine' => 9 }

def format_phone_number(str)
  if str.delete('^0-9').length == 10
    str = "(#{str[0..2]}) #{str[3..5]}-#{str[6..-1]}"
  end
  str
end

def word_to_digit(str)
  output       = str.split
  range_start  = output.index { |i| NUMBERS.keys.include?(i.downcase) }
  range_end    = range_start
  
  while range_start
    while output[range_end] != output.last &&
          NUMBERS.include?(output[range_end + 1].delete('^a-zA-Z'))
      range_end += 1
    end
    
    NUMBERS.keys.each do |i|
      output[range_start..range_end].each do |j|
        j.downcase! if NUMBERS[j.downcase]
        j.gsub!(/\b#{i}\b/, NUMBERS[i].to_s)
      end
    end
    
    output[range_start..range_end] = output[range_start..range_end].join
    output[range_start] = format_phone_number(output[range_start])
    
    range_start  = output.index { |i| NUMBERS.keys.include?(i) }
    range_end    = range_start
  end
  output.join(' ')
end

#	Fibonacci Numbers (Recursion)
def fibonacci(int, last_two = [1, 1])
  return last_two[1] if int <= 2
  last_two[0], last_two[1], = last_two[1], last_two[0] + last_two[1]
  fibonacci(int - 1, last_two)
end

#	Fibonacci Numbers (Procedural)
def fibonacci2(int)
  last_two = [1, 1]
  while int > 2
    last_two[0], last_two[1] = last_two[1], last_two[0] + last_two[1] 
    int -= 1
  end
  last_two[1]
end

#	Fibonacci Numbers (Last Digit)
def fibonacci_last(int)
  fibonacci2(int % 60).digits[0]
end