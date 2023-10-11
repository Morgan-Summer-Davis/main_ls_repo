# Question 1
# It'll throw an undefined local variable error.
# This is wrong, apparently! It's initialized within the if statement (variable
# scope!) even though it isn't ever processed, meaning it defaults to nil.

# Question 2
# hi there

# Question 3
# A: one is: one
#    two is: two
#    three is: three

# B: one is: one
#    two is: two
#    three is: three

# C: one is: two
#    two is: three
#    three is: one

# Question 4
def dot_separated_ip_address?(input_string)
  dot_separated_words = input_string.split(".")
  if dot_separated_words.size == 4
    while dot_separated_words.size > 0 do
      word = dot_separated_words.pop
      return false unless is_an_ip_number?(word)
    end
  else
    return false
  end
  return true
end

