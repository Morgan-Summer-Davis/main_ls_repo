#	How old is Teddy?
def print_age
  puts "What is the subject's name?"
  name = gets.chomp
  name = "Teddy" if name == ''

  puts "#{name} is #{rand(20..200)} years old!"
end

#	How big is the room?
FEET_TO_CENTIMETERS = 30.48

def room_size
  puts "What is the length of the room in feet?"
  length = gets.chomp.to_f
  puts "What is the width of the room in feet?"
  width = gets.chomp.to_f
  
  puts "The area of the room is #{(length * width).round(2)} square feet."\
       "That's #{(length * width * 12).round(2)} square inches or "\
       "#{(length * width * FEET_TO_CENTIMETERS).round(2)} centimeters."
end

#	Tip calculator
def tip_calculator
  puts "What is the bill?"
  bill = gets.chomp.to_f
  puts "What is the tip percentage?"
  tip = gets.chomp.to_f
  
  puts "The tip is #{format("%.2f", bill * tip * 0.01)}"
  puts "The total is #{format("%.2f", bill + (bill * tip * 0.01))}"
end

#	When will I Retire?
def retirement_year
  puts "What is your age?"
  age = gets.chomp.to_i
  puts "At what age would you like to retire?"
  retirement_age = gets.chomp.to_i
  
  puts "It's #{Time.now.year}. You will retire in "\
       "#{Time.now.year + retirement_age - age}."
  puts "You only have #{retirement_age - age} years of work to go!"
end

#	Greeting a user
def greeting
  puts "What is your name?"
  name = gets.chomp
  
  if name.chomp('!') != name
    puts "HELLO #{name.chomp('!').upcase}. WHY ARE WE SCREAMING?"
  else
    puts "Hello #{name}."
  end
end

#	Odd Numbers
def odd_numbers
  (1..100).each { |i| puts i if i.odd? }
end

def further_odd_numbers
  (1..100).to_a.select { |i| i % 2 == 1 }.each do |k|
    puts k
  end
end

#	Even Numbers
def even_numbers
  (1..100).each { |i| puts i if i.even? }
end

#	Sum or Product of Consecutive Integers
def consecutive_integer_operation
  puts ">> Please enter a number greater than 0:"
  input = gets.chomp.to_i
  puts ">> Enter 's' to compute the sum, 'p' to compute the product."
  operation = gets.chomp
  
  if operation == 's'
    output = (1..input).inject(:+)
    puts "The sum of the integers between 1 and #{input} is #{output}."
  elsif operation == 'p'
    output = (1..input).each.inject(:*)
    puts "The product of the integers between 1 and #{input} is #{output}."
  else
    puts ">> Invalid operation input."
    return
  end
end

#	String Assignment
#BOB
#BOB

# Both variables point to the same location in memory, since save_name was
# assigned to name, and not to the value "Bob" directly. Since upcase! mutates
# the caller, it modifies the information stored in that address in memory, so
# both variables see it, as they are still looking at that same address.

#	Always Return Negative
def negative(int)
  int.abs * -1
end