# Find the Class
puts "Hello".class
puts 5.class
puts [1, 2, 3].class

# Create the Class
module Walkable
  def walk
    puts "Let's go for a walk!"
  end
end

class Cat 
  include Walkable
  
  attr_accessor :name
  
  def initialize(name)
    @name = name
  end
  
  def greet
    puts "Hello! My name is #{name}!"
  end
end

# Create the Object
kitty = Cat.new('Sophie')

# What Are You?
  # Incorporated into 'Create the Class'.

# Hello, Sophie! (Part 1)
  # Incorporated into 'Create the Class' and 'Create the Object'

# Hello, Sophie! (Part 2)
kitty.greet

# Reader
  # Incoprated into 'Create the Class'

# Writer
kitty.name = 'Luna'
kitty.greet

# Accessor
  # Incoprorated into 'Create the Class'

# Walk the Cat
kitty.walk