# Banner Class
class Banner
  def initialize(message, width = message.length)
    @message = message
    width < message.length ? (@width = message.length) : (@width = width)
  end

  def to_s
    [horizontal_rule, empty_line, message_line, empty_line, horizontal_rule].join("\n")
  end

  private

  def horizontal_rule
    "+-#{'-' * @width}-+"
  end

  def empty_line
    "| #{' ' * @width} |"
  end

  def message_line
    "| #{' ' * ((@width - @message.length).to_f / 2).ceil + @message +
         ' ' * ((@width - @message.length).to_f / 2).floor} |"
  end
end

#	What's the Output?
  # It will output "Fluffy", then "My name is FLUFFY.", then "FLUFFY", "FLUFFY".

class Pet
  attr_reader :name

  def initialize(name)
    @name = name.to_s
  end

  def to_s
    "My name is #{@name.upcase}."
  end
end

  # Further Exploration
  # The code results in the output it does because we never attempt to add 1 to
  # the string '43'. We first initialize a local variable name to 42, then assign
  # fluffy's @name instance variable to the String object '42' within its
  # initialize method. On the following line, we simply add 1 to the local variable
  # name. This is a completely different object--the fluffy object does not see
  # it at all. Finally, we print the local variable at the end, which is an Integer,
  # not a string. This can be more easily seen by replacing our puts calls with
  # p calls.

#	Fix the Program - Books (Part 1)
  # class Book
  #   attr_reader :title, :author
    
  #   def initialize(author, title)
  #     @author = author
  #     @title = title
  #   end
  
  #   def to_s
  #     %("#{title}", by #{author})
  #   end
  # end

  # Further Exploration
  # attr_reader creates a getter method; attr_writer creates a setter method; and
  # attr_accessor creates both. We need a getter but not a setter, so attr_reader
  # is ideal, but the code would function with attr_accessor.
  
  # The code functions identically with the provided methods, because attr_reader
  # dynamically creates methods identical to them. The benefit is easier legability
  # if you are unfamiliar with attr_reader and, more importantly, easier addition
  # of additional functionality later down the road, if necessary.

#	Fix the Program - Books (Part 2)
  # class Book
  #   attr_accessor :author, :title
    
  #   def to_s
  #     %("#{title}", by #{author})
  #   end
  # end

#	Fix the Program - Persons
  # class Person
  #   def initialize(first_name, last_name)
  #     @first_name = first_name.capitalize
  #     @last_name = last_name.capitalize
  #   end
    
  #   def first_name=(name)
  #     @first_name = name.capitalize
  #   end
    
  #   def last_name=(name)
  #     @last_name = name.capitalize
  #   end
  
  #   def to_s
  #     "#{@first_name} #{@last_name}"
  #   end
  # end

#	Fix the Program - Flight Data
  # Remove the accessor, since it isn't needed--the variable is initialized using
  # other data and editing it via a public setter is thus not necessary.

#	Buggy Code - Car Mileage
  # class Car
  #   attr_accessor :mileage
  
  #   def initialize
  #     @mileage = 0
  #   end
  
  #   def increment_mileage(miles)
  #     total = mileage + miles
  #     @mileage = total
  #   end
  
  #   def print_mileage
  #     puts mileage
  #   end
  # end

#	Rectangles and Squares
  # class Rectangle
  #   def initialize(height, width)
  #     @height = height
  #     @width = width
  #   end
  
  #   def area
  #     @height * @width
  #   end
  # end
  
  # class Square < Rectangle
  #   def initialize(dimension)
  #     super(dimension, dimension)
  #   end
  # end

#	Complete the Program - Cats!
  # class Pet
  #   def initialize(name, age)
  #     @name = name
  #     @age = age
  #   end
  # end
  
  # class Cat < Pet
  #   def initialize(name, age, color)
  #     super(name, age)
  #     @color = color
  #   end
    
  #   def to_s
  #     "My cat #{@name} is #{@age} years old and has #{@color} fur."
  #   end
  # end
  
#	Refactoring Vehicles
class Vehicle
  attr_accessor :make, :model
  
  def initialize(make, model)
    @make = make
    @model = model
  end
  
  def wheels
    puts "Error: Undefined number of wheels."
    nil
  end
  
  def to_s
    "#{make} #{model}"
  end
end

class Car < Vehicle
  def wheels
    4
  end
end

class Motorcycle < Vehicle
  def wheels
    2
  end
end

class Truck < Vehicle
  attr_reader :payload

  def initialize(make, model, payload)
    super(make, model)
    @payload = payload
  end

  def wheels
    6
  end
end
