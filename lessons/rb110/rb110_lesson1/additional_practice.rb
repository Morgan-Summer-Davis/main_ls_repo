# Practie Problem 1
flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "BamBam"]
hash = Hash.new

flintstones.each_with_index { |key, index| hash[key] = index }

# Practie Problem 2
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10, "Marilyn" => 22, "Spot" => 237 }
ages.values.sum

# Practie Problem 3
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }
ages.delete_if { |_, value| value >= 100 }

# Practie Problem 4
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10, "Marilyn" => 22, "Spot" => 237 }
ages.values.min

# Practie Problem 5
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)
flintstones.index { |str| str.start_with?("Be") }

# Practie Problem 6
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)
flintstones.map! { |str| str[0, 3] }

# Practie Problem 7
statement = "The Flintstones Rock"
output = Hash.new(0)

statement.delete('^a-zA-Z').chars.each { |char| output[char] += 1 }

# Practie Problem 8
# Changing an array while iterating over it can be done, it may simply lead to
# unexpected results, including possibly errors as, for instance, expected
# values are deleted.
# 1, then 3
# 1, then 2

# Practie Problem 9
def titleize(str)
  str.split.map { |substr| substr.capitalize }.join(' ')
end


# Practie Problem 10
munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}

munsters.each do |name, stats|
  case stats["age"]
  when 0..17  then stats["age_group"] = "kid"
  when 18..64 then stats["age_group"] = "adult"
  else                        stats["age_group"] = "senior"
  end
end