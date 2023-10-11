# Exercises 1 - 3
class Person
  attr_accessor :first_name, :last_name
  
  def initialize(full_name)
    self.name = full_name
  end
  
  def name
    "#{@first_name} #{@last_name}".strip
  end
  
  def name=(full_name)
    @first_name, @last_name = full_name.split[0], full_name.split[1]
    @first_name = '' unless @first_name
    @last_name =  '' unless @last_name
  end
end

# Exercise 4
bob = Person.new('Robert Smith')
rob = Person.new('Robert Smith')

bob.name == rob.name

# Exercise 5
"The person's name is: #<Person:0x000000000279a930 @last_name=\"Smith\", @first_name=\"Robert\">"
"The person's name is: Robert Smith"
