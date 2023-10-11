# Question 1
module Fuelable
  def range
    @fuel_capacity * @fuel_efficiency
  end
end

class WheeledVehicle
  include Fuelable
  attr_accessor :speed, :heading

  def initialize(tire_array, km_traveled_per_liter, liters_of_fuel_capacity)
    @tires = tire_array
    @fuel_efficiency = km_traveled_per_liter
    @fuel_capacity = liters_of_fuel_capacity
  end

  def tire_pressure(tire_index)
    @tires[tire_index]
  end

  def inflate_tire(tire_index, pressure)
    @tires[tire_index] = pressure
  end
end

class Auto < WheeledVehicle
  def initialize
    # 4 tires are various tire pressures
    super([30,30,32,32], 50, 25.0)
  end
end

class Motorcycle < WheeledVehicle
  def initialize
    # 2 tires are various tire pressures
    super([20,20], 80, 8.0)
  end
end

# Question 2
class Boat
  include Fuelable
  attr_reader :propeller_count, :hull_count
  attr_accessor :speed, :heading
  def initialize(num_propellers = 1, num_hulls = 1, km_traveled_per_liter, liters_of_fuel_capacity)
    # ... code omitted ...
  end

  def range
    super + 10
  end
end

class Catamaran < Boat; end
class Motorboat < Boat; end

# Question 3

