# Question 1
  # Ben is. Because we have a getter method for @balance, the balance on line 9 is a method call.

# Question 2
  # The problem is that quantity has no setter method. Either add one (and add a self call to quantity)
  # or set the instance variable directly.

# Question 3
  # Fixing it this way allows objects (and the main scope) outside of the class to change quantity's value.

# Question 4
class Greeting
  def greet(str)
    puts str
  end
end

class Hello < Greeting
  def hi
    greet('Hello')
  end
end

class Goodbye < Greeting
  def bye
    greet('Bye')
  end
end

# Question 5
class KrispyKreme
  def initialize(filling_type, glazing)
    @filling_type = filling_type
    @glazing = glazing
  end

  def to_s
    [(@filling_type || 'Plain'), @glazing].compact.join(' with ')
  end
end

donut1 = KrispyKreme.new(nil, nil)
donut2 = KrispyKreme.new("Vanilla", nil)
donut3 = KrispyKreme.new(nil, "sugar")
donut4 = KrispyKreme.new(nil, "chocolate sprinkles")
donut5 = KrispyKreme.new("Custard", "icing")

puts donut1
puts donut2
puts donut3
puts donut4
puts donut5

# Question 6
  # They will function identically, but the self call is considered superfluous.

# Question 7
  # Change it to just status
