# MEDIUM 1
# ------------------------------------------------------------------------------

# Question 1
10.times { |i| puts ' ' * i + "The Flintstones Rock!" }

# Question 2
# It will throw an error because "the value of 40 + 2 is " is a string and
# (40 + 2) is an integer. It could be fixed either of the following ways:
puts "the value of 40 + 2 is " + (40 + 2).to_s
puts "the value of 40 + 2 is #{(40 + 2)}"

# Question 3
# Replace the begin / end until with a while loop, like so:
def factors(number)
  divisor = number
  factors = []
  while divisor > 0
    factors << number / divisor if number % divisor == 0
    divisor -= 1
  end
  factors
end

  # Bonus 1
  # This line varifies we only store integers into factors and not the integer
  # equivalent of decimals that would be provided by the equation at times
  # otherwise, as in, for example, 4 / 3
  
  # Bonus 2
  # The second-to-last line is to guarantee the function returns the value of
  # factors, as opposed to nil, which it would do as the loop has no break to
  # return another value.

# Question 4
# Yes, there is a difference; << mutates the argument, whereas + does not.

# Question 5
# The limit variable is defined outside the method, meaning that, due to its
# scope, the method cannot see it. To fix it, I would define the limit within
# the method (or replace the reference to the limit to the value directly) or
# add it as an argument, if the limit needs to be adjustable.

# Question 6
# 34

# Question 7
# Yes, it did. The Hash#[]= and related methods are mutating, despite looking
# like the non-mutating assignment syntax (=).

# Question 8
# paper

# Question 9
# no

# MEDIUM 2
# ------------------------------------------------------------------------------

# Question 1
# a and c will have the same id, but b will have a different id pointing to a
# distinct place in memory with the same value

# Question 2
# By the phrasing of these two questions I assume all three will share the same
# id, but I'm not 100% confident as to why. Maybe because numbers in Ruby are
# immutable?

# Question 3
# My string looks like this now: pumpkins
# My array looks like this now: ["pumpkins", "rutabaga"]
# The += in tricky_method does not mutate the variable, but the << does.

# Question 4
# My string looks like this now: pumpkinsrutabaga
# My array looks like this now: ["pumpkins"]

# Question 5
def tricky_method(a_string_param, an_array_param)
  a_string_param += "rutabaga"
  an_array_param = an_array_param + ["rutabaga"]
  [a_string_param, an_array_param]
end

my_string = "pumpkins"
my_array = ["pumpkins"]
my_string = tricky_method(my_string, my_array)[0]
my_array = tricky_method(my_string, my_array)[1]

puts "My string looks like this now: #{my_string}"
puts "My array looks like this now: #{my_array}"

# Question 6
def color_valid(color)
  color == "blue" || color == "green"
end