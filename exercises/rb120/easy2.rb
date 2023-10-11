#	Fix the Program - Mailable
    # module Mailable
    #   def print_address
    #     puts "#{name}"
    #     puts "#{address}"
    #     puts "#{city}, #{state} #{zipcode}"
    #   end
    # end

    # class Customer
    #   include Mailable
    #   attr_reader :name, :address, :city, :state, :zipcode
    # end

    # class Employee
    #   include Mailable
    #   attr_reader :name, :address, :city, :state, :zipcode
    # end

#	Fix the Program - Drivable
    # module Drivable
    #   def drive
    #   end
    # end

    # class Car
    #   include Drivable
    # end

#	Complete The Program - Houses
  # class House
  #   include Comparable
  #   attr_reader :price

  #   def initialize(price)
  #     @price = price
  #   end

  #   protected
  #   def <=>(other)
  #     self.price <=> other.price
  #   end
  # end

#	Reverse Engineering
  # class Transform
  #   def initialize(data) ; @data = data end

  #   def uppercase ; @data.upcase end
  #   def self.lowercase(data) ; data.downcase end
  # end

  # my_data = Transform.new('abc')
  # puts my_data.uppercase
  # puts Transform.lowercase('XYZ')

#	What Will This Do?
  # ByeBye
  # HelloHello

#	Comparing Wallets
  # class Wallet
  #   include Comparable

  #   def initialize(amount)
  #     @amount = amount
  #   end

  #   def <=>(other_wallet)
  #     amount <=> other_wallet.amount
  #   end

  #   protected
  #   attr_reader :amount
  # end

  # bills_wallet = Wallet.new(500)
  # pennys_wallet = Wallet.new(465)
  # if bills_wallet > pennys_wallet
  #   puts 'Bill has more money than Penny'
  # elsif bills_wallet < pennys_wallet
  #   puts 'Penny has more money than Bill'
  # else
  #   puts 'Bill and Penny have the same amount of money.'
  # end

#	Pet Shelter
  # class Pet
  #   attr_reader :type, :name

  #   def initialize(type, name)
  #     @type, @name = type, name
  #   end
  # end

  # class Owner
  #   attr_reader :name
  #   attr_accessor :number_of_pets, :pets

  #   def initialize(name)
  #     @name = name
  #     @number_of_pets = 0
  #     @pets = []
  #   end
  # end

  # class Shelter
  #   attr_reader :unadopted_pets

  #   def initialize
  #     @unadopted_pets = []
  #     ObjectSpace.each_object(Pet) do |pet|
  #       unadopted_pets << pet
  #     end
  #   end

  #   def adopt(owner, pet)
  #     if self.unadopted_pets.delete(pet)
  #       owner.number_of_pets += 1
  #       owner.pets << pet
  #     end
  #   end

  #   def print_adoptions
  #     ObjectSpace.each_object(Owner) do |owner|
  #       puts "#{owner.name} has adopted the following pets:"
  #       owner.pets.each do |pet|
  #         puts "a #{pet.type} named #{pet.name}"
  #       end
  #       puts ''
  #     end
  #   end
  # end

  # butterscotch = Pet.new('cat', 'Butterscotch')
  # pudding      = Pet.new('cat', 'Pudding')
  # darwin       = Pet.new('bearded dragon', 'Darwin')
  # kennedy      = Pet.new('dog', 'Kennedy')
  # sweetie      = Pet.new('parakeet', 'Sweetie Pie')
  # molly        = Pet.new('dog', 'Molly')
  # chester      = Pet.new('fish', 'Chester')

  # phanson = Owner.new('P Hanson')
  # bholmes = Owner.new('B Holmes')

  # shelter = Shelter.new
  # shelter.adopt(phanson, butterscotch)
  # shelter.adopt(bholmes, kennedy)
  # shelter.adopt(bholmes, chester)
  # shelter.print_adoptions
  # puts "#{phanson.name} has #{phanson.number_of_pets} adopted pets."
  # puts "#{bholmes.name} has #{bholmes.number_of_pets} adopted pets."
  # puts "The Animal shelter has #{shelter.unadopted_pets.count} unadopted pets."

#	Moving
module Walkable
  def walk
    puts "#{self} #{gait} forward."
  end
end

class Person
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def to_s
    name
  end

  private

  def gait
    "strolls"
  end
end

class Cat
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def to_s
    name
  end

  private

  def gait
    "saunters"
  end
end

class Cheetah
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def to_s
    name
  end

  private

  def gait
    "runs"
  end
end

mike = Person.new("Mike")
mike.walk
# => "Mike strolls forward"

kitty = Cat.new("Kitty")
kitty.walk
# => "Kitty saunters forward"

flash = Cheetah.new("Flash")
flash.walk
# => "Flash runs forward"

#	Nobility
class Noble
  include Walkable

  def initialize(name, title)
    @name, @title = name, title
  end

  def to_s
    "#{@title} #{@name}"
  end

  private

  def gait
    "struts"
  end
end

byron = Noble.new("Byron", "Lord")
byron.walk
# => "Lord Byron struts forward"