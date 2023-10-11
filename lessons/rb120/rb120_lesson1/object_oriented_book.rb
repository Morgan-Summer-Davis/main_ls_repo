# The Object Model
  # Exercise 1
  # We create an object by calling new on a class, like so:
  module GoodbyeWorld
  end
  
  class HelloWorld
    include GoodbyeWorld
  end
  
  hello_world_object = HelloWorld.new
  
  # Exercise 2
  # Modules are a means to include methods in multiple classes without having
  # to use inheritance between them. We include them in a class by passing
  # them to the include keyword inside the class. (See above).
  
# Classes and Objects I
  # Exercises 1 and 2
  class Vehicle
    attr_accessor :color
    attr_reader   :year, :model, :speed
    @@initialized = 0
    
    def initialize(year, color, model)
      @year = year
      self.color = color
      @model = model
      @speed = 0
      @@initialized += 1
    end
    
    def accelerate(speed)
      @speed += speed
    end
    
    def brake(speed)
      @speed -= speed
    end
    
    def turn_off
      @speed = 0
    end
    
    def spray_paint(color)
      self.color = color
    end
    
    def self.mileage(gas, miles)
      puts "#{gas / miles} miles per gallon of gas."
    end
    
    def to_s
      "This is a #{color} #{year} #{model} going #{speed} miles per hour."
    end
    
    def self.num_of_vehicles
      p @@initialized
    end
    
    def age
      calculate_age
    end
    
    private
    
    def calculate_age
      Time.now.year - @year
    end
  end
  
  module Towable
    def can_tow?
      true
    end
  end
  
  class MyCar < Vehicle
    SIZE = 'Medium'
  end
  
  class MyTruck < Vehicle
    include Towable
    
    SIZE = 'Big'
  end
  
  # puts Vehicle.ancestors
  puts MyCar.ancestors
  # puts MyTruck.ancestors
  
  car = MyCar.new(1999, 0, 0)
  p car.age
  
  # Exercise 3
  # We get this error because we only have a getter method for Person@name, not a
  # setter. We can fix this by replacing the attr_reader with attr_accessor on
  # line 2.
  
# Classes and Objects II
  # Implemented above

# Inheritance
  # Exercises 1 - 6 implemented above
  # Exercise 7
  
  class Student
    attr_accessor :name
    attr_writer :grade
    
    def initialize(name, grade)
      @name = name
      @grade = grade
    end
    
    def better_grade_than?(student)
      self.grade > student.grade
    end
    
    protected
    
    attr_reader :grade
  end
  
  joe = Student.new('Joe', 100)
  bob = Student.new('Bob', 0)
  
  puts "Well done!" if joe.better_grade_than?(bob)
  
  # Exercise 8
  # The problem is that the hi method is private. This could be fixed by making
  # it public, or by accessing its return / output using another public method,
  # depending on the desired protection of hi.