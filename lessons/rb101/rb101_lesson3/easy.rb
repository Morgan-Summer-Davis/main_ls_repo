# EASY 1
# ------------------------------------------------------------------------------

# Question 1
# 1
# 2
# 2
# 3

# Question 2
# In Ruby, an exclamation point usually denotes either a destructive method or a
# negation of a boolean value. A question mark is often used in methods which 
# return a boolean value and as the operator in ternaries.
# 
# 1. It's a "not equals" operator, and it should be used when trying to determine
#    if two values are different from one another.
# 2. The bang operator negates its argument, returning a truthy value if the
#    passed argument is falsey and vice versa.
# 3. Nothing inherently happens, but many destructive methods by convention end
#    in an exclamation point.
# 4. A question mark before other values indicates a ternary.
# 5. A question mark after something does not inherently do anything, but methods
#    that return boolean values by convention often end in a question mark.
# 6. It would return the original argument, in this case user_name.

# Question 3
advice = "Few things in life are as important as house training your pet dinosaur."
advice["important"] = "urgent"

# Question 4
# Mutates to [1, 3, 4, 5]. Returns 2
# Mutates to [2, 3, 4, 5]. Returns 1

# Question 5
(1..100).include?(42)

# Question 6
famous_words = "seven years ago..."
"four score and " + famous_words
famous_words[0] = "four score and s"

# Question 7
flintstones = ["Fred", "Wilma"]
flintstones << ["Barney", "Betty"]
flintstones << ["BamBam", "Pebbles"]
flintstones.flatten!

# Question 8
flintstones = { "Fred" => 0, "Wilma" => 1, "Barney" => 2, "Betty" => 3, "BamBam" => 4, "Pebbles" => 5 }
flintstones.delete_if { |key, _| key != "Barney" }

# EASY 2
# ------------------------------------------------------------------------------

# Question 1
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }
ages.has_key?("Spot")
ages.include?("Spot")
ages.member?("Spot")

# Question 2
munsters_description = "The Munsters are creepy in a good way."

munsters_description.swampcase
munsters_description[4] = "m"
munsters_description.downcase
munsters_description.upcase

# Question 3
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10 }
additional_ages = { "Marilyn" => 22, "Spot" => 237 }

ages.merge!(additional_ages)

# Question 4
advice = "Few things in life are as important as house training your pet dinosaur."
advice.include?("Dino")

# Question 5
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)

# Question 6
flintstones << "Dino"

# Question 7
flintstones.push("Dino", "Hoppy")

# Question 8
advice = "Few things in life are as important as house training your pet dinosaur."
advice.slice!(0..38)
# String#slice will only return the sliced string, but not alter the original.

# Question 9
statement = "The Flintstones Rock!"
statement.count("t")

# Question 10
title = "Flintstone Family Members"
title.center(40)