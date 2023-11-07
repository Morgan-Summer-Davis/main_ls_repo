# Inherited Year
  # class Vehicle
  #   attr_reader :year
  
  #   def initialize(year)
  #     @year = year
  #   end
  # end
  
  # class Truck < Vehicle ; end
  # class Car < Vehicle ; end
  
  # truck1 = Truck.new(1994)
  # puts truck1.year
  
  # car1 = Car.new(2006)
  # puts car1.year

# Start the Engine (Part 1)
  # class Vehicle
  #   attr_reader :year
  
  #   def initialize(year)
  #     @year = year
  #   end
  # end
  
  # class Truck < Vehicle
  #   def initialize(year)
  #     super
  #     start_engine
  #   end
    
  #   def start_engine
  #     puts 'Ready to go!'
  #   end
  # end
  
  # truck1 = Truck.new(1994)
  # puts truck1.year

# Only Pass the Year
  # class Vehicle
  #   attr_reader :year
  
  #   def initialize(year)
  #     @year = year
  #   end
  # end
  
  # class Truck < Vehicle
  #   attr_reader :bed_type
    
  #   def initialize(year, bed_type)
  #     super(year)
  #     @bed_type = bed_type
  #   end
  # end
  
  # class Car < Vehicle
  # end
  
  # truck1 = Truck.new(1994, 'Short')
  # puts truck1.year
  # puts truck1.bed_type

# Start the Engine (Part 2)
  # class Vehicle
  #   def start_engine
  #     'Ready to go!'
  #   end
  # end
  
  # class Truck < Vehicle
  #   def start_engine(speed)
  #     super() + " Drive #{speed}, please!"
  #   end
  # end
  
  # truck1 = Truck.new
  # puts truck1.start_engine('fast')

# Towable (Part 1)
  # module Towable
  #   def tow
  #     puts "I can tow a trailer!"
  #   end
  # end
  
  # class Truck
  #   include Towable
  # end
  
  # class Car
  # end
  
  # truck1 = Truck.new
  # truck1.tow

# Towable (Part 2)
  # module Towable
  #   def tow
  #     'I can tow a trailer!'
  #   end
  # end
  
  # class Vehicle
  #   attr_reader :year
    
  #   def initialize(year)
  #     @year = year
  #   end
  # end
  
  # class Truck < Vehicle
  #   include Towable
  # end
  
  # class Car < Vehicle
  # end
  
  # truck1 = Truck.new(1994)
  # puts truck1.year
  # puts truck1.tow
  
  # car1 = Car.new(2006)
  # puts car1.year

# Method Lookup (Part 1)
  # Cat, Animal

# Method Lookup (Part 2)
  # Cat, Animal, Object, Kernel, BasicObject

# Method Lookup (Part 3)
  # Bird, Flyable, Animal

# Transportation
module Transportation
  class Vehicle ; end
  class Truck < Vehicle ; end
  class Car < Vehicle ; end
end
