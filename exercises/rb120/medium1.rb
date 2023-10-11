#	Privacy
class Machine
  def start
    flip_switch(:on)
  end

  def stop
    flip_switch(:off)
  end

  def switch_on?
    switch == :on
  end

  private

  attr_accessor :switch

  def flip_switch(desired_state)
    self.switch = desired_state
  end
end

#	Fixed Array
class FixedArray
  def initialize(length)
    @value = [nil] * length
  end

  def [](index)
    @value.fetch(index)
  end

  def []=(index, value)
    self[index]
    @value[index] = value
  end

  def to_a
    @value.clone
  end

  def to_s
    @value.to_s
  end
end

# fixed_array = FixedArray.new(5)
# puts fixed_array[3] == nil
# puts fixed_array.to_a == [nil] * 5

# fixed_array[3] = 'a'
# puts fixed_array[3] == 'a'
# puts fixed_array.to_a == [nil, nil, nil, 'a', nil]

# fixed_array[1] = 'b'
# puts fixed_array[1] == 'b'
# puts fixed_array.to_a == [nil, 'b', nil, 'a', nil]

# fixed_array[1] = 'c'
# puts fixed_array[1] == 'c'
# puts fixed_array.to_a == [nil, 'c', nil, 'a', nil]

# fixed_array[4] = 'd'
# puts fixed_array[4] == 'd'
# puts fixed_array.to_a == [nil, 'c', nil, 'a', 'd']
# puts fixed_array.to_s == '[nil, "c", nil, "a", "d"]'

# puts fixed_array[-1] == 'd'
# puts fixed_array[-4] == 'c'

# begin
#   fixed_array[6]
#   puts false
# rescue IndexError
#   puts true
# end

# begin
#   fixed_array[-7] = 3
#   puts false
# rescue IndexError
#   puts true
# end

# begin
#   fixed_array[7]
#   puts false
# rescue IndexError
#   puts true
# end

#	Students
class PersonAssociatedWithTheCollege
  def initialize
    add_to_college_database
  end
end

class Student < PersonAssociatedWithTheCollege
  def initialize(name, year)
    @name = name
    @year = year
    super()
  end
end

class Graduate < Student
  def initialize(name, year, parking)
    super(name, year)
    @parking = parking
  end
end

class Undergraduate < Student; end

#	Circular Queue
class OriginalCircularQueue
  def initialize(size)
    @queue          = [nil] * size
    @circular_index = 1
    @object_order   = [0] * size
  end

  def enqueue(object)
    next_index = @object_order.index(@object_order.max) + 1
    next_index = 0 if next_index >= @queue.count
    @queue[next_index] = object
    @object_order[next_index] = @circular_index
    @circular_index += 1
  end

  def dequeue
    oldest_index = nil
    @object_order.each_with_index do |_, index|
      iterator = -1
      oldest_index = index if @object_order[index] == @object_order.select do
        iterator += 1
        @queue[iterator] != nil
      end.min
    end
    oldest_index = 0 unless oldest_index

    return_value = @queue[oldest_index]
    @queue[oldest_index] = nil
    return_value
  end
end

  # Further Exploration
class CircularQueue
  def initialize(size)
    @queue = [nil] * size
  end

  def enqueue(object)
    @queue.shift
    @queue.push(object)
  end

  def dequeue
    return_index = @queue.index { |elem| elem != nil }
    return_value = nil
    return_value = @queue[return_index] if return_index

    @queue[return_index] = nil if return_index
    return_value
  end
end

# queue = CircularQueue.new(3)
# puts queue.dequeue == nil

# queue.enqueue(1)
# queue.enqueue(2)
# puts queue.dequeue == 1

# queue.enqueue(3)
# queue.enqueue(4)
# puts queue.dequeue == 2

# queue.enqueue(5)
# queue.enqueue(6)
# queue.enqueue(7)
# puts queue.dequeue == 5
# puts queue.dequeue == 6
# puts queue.dequeue == 7
# puts queue.dequeue == nil

# queue = CircularQueue.new(4)
# puts queue.dequeue == nil

# queue.enqueue(1)
# queue.enqueue(2)
# puts queue.dequeue == 1

# queue.enqueue(3)
# queue.enqueue(4)
# puts queue.dequeue == 2

# queue.enqueue(5)
# queue.enqueue(6)
# queue.enqueue(7)
# puts queue.dequeue == 4
# puts queue.dequeue == 5
# puts queue.dequeue == 6
# puts queue.dequeue == 7
# puts queue.dequeue == nil

#	input Machine Interpretation
class Minilang
  def initialize(input)
    @input = input.downcase.split
    @stack    = []
    @register = 0
  end

  def eval(temperature = false)
    @input.each do |command|
      command = format(command.to_s, temperature) if temperature
      command = command.to_i.to_s == command ? command.to_i : command.to_sym
      begin
        send(:n, command) if command.class == Integer
        send(command)     if command.class == Symbol
      rescue NoMethodError
        return puts "Invalid token: #{command}"
      rescue TypeError
        return puts "Error: Empty stack"
      end
    end
  end

  private

  def n(input); @register =  input;      end
  def push;     @stack    << @register;  end
  def add;      @register += @stack.pop; end
  def sub;      @register -= @stack.pop; end
  def mult;     @register *= @stack.pop; end
  def div;      @register /= @stack.pop; end
  def mod;      @register %= @stack.pop; end
  def pop;      @register =  @stack.pop; end
  def print;    puts @register;          end
end

# Minilang.new('PRINT').eval
#   # 0

# Minilang.new('5 PUSH 3 MULT PRINT').eval
#   # 15

# Minilang.new('5 PRINT PUSH 3 PRINT ADD PRINT').eval
#   # 5
#   # 3
#   # 8

# Minilang.new('5 PUSH 10 PRINT POP PRINT').eval
#   # 10
#   # 5

# Minilang.new('5 PUSH POP POP PRINT').eval
#   # Empty input!

# Minilang.new('3 PUSH PUSH 7 DIV MULT PRINT ').eval
#   # 6

# Minilang.new('4 PUSH PUSH 7 MOD MULT PRINT ').eval
#   # 12

# Minilang.new('-3 PUSH 5 XSUB PRINT').eval
#   # Invalid token: XSUB

# Minilang.new('-3 PUSH 5 SUB PRINT').eval
#   # 8

# Minilang.new('6 PUSH').eval
#   # (nothing printed; no PRINT commands)

# CENTIGRADE_TO_FAHRENHEIT =
#   '5 PUSH %<degrees_c>d PUSH 9 MULT DIV PUSH 32 ADD PRINT'
# minilang = Minilang.new(CENTIGRADE_TO_FAHRENHEIT)
# minilang.eval(degrees_c: 100)
# # 212
# minilang.eval(degrees_c: 0)
# # 32
# minilang.eval(degrees_c: -40)
# # -40


#	Number Guesser Part 1
class GuessingGame

  def initialize(range_min, range_max)
    @range       = (range_min..range_max)
    @number      = @range.to_a.sample
    @guess       = nil
    @total_tries = Math.log2(@range.size).to_i + 1
  end

  def play
    @total_tries.downto(1) do |guesses_remaining|
      player_guess(guesses_remaining)
      evaluate_guess
      break if player_won?
    end

    display_results
    reset
  end

  private

  def reset
    @number      = @range.to_a.sample
    @guess       = nil
    @total_tries = Math.log2(@range.size).to_i + 1
  end

  def player_guess(guesses_remaining)
    puts "You have #{guesses_remaining} guesses remaining." if guesses_remaining > 1
    puts "You have #{guesses_remaining} guess remaining."   if guesses_remaining == 1
    print "Enter a number between #{@range.min} and #{@range.max}: "
    loop do
      @guess = gets.chomp.to_i
      break if @range.cover? @guess
      puts "Invalid guess. Enter a number between #{@range.min} and #{@range.max}: "
    end
  end

  def evaluate_guess
    return  puts "Your guess is too high.\n\n" if @guess > @number
    return  puts "Your guess is too low.\n\n"  if @guess < @number
    return  puts "That's the number!\n\n"      if player_won?
  end

  def player_won?
    @guess == @number
  end

  def display_results
    return puts "You won!" if @guess == @number
    puts "You have no more guesses. You lost!"
  end
end

# game = GuessingGame.new(501, 1500)
# game.play

#	Number Guesser Part 2
  #Implemented aboce

#	Highest and Lowest Ranking Cards
class Card
  include Comparable
  attr_reader :rank, :suit

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def to_s
    "#{@rank} of #{@suit}"
  end

  def value
    case @rank
    when 'Ace'   then 14
    when 'King'  then 13
    when 'Queen' then 12
    when 'Jack'  then 11
    else @rank   end
  end

  protected

  def <=>(other)
    return value <=> other.value if (value <=> other.value) != 0
    suit_value   <=> other.suit_value
  end

  def suit_value
    case @suit
    when 'Spades'   then 4
    when 'Hearts'   then 3
    when 'Clubs'    then 2
    when 'Diamonds' then 1
    end
  end
end

p Card.new(2, 'Hearts') <=>       Card.new(10, 'Diamonds'

# cards = [Card.new(2, 'Hearts'),
#         Card.new(10, 'Diamonds'),
#         Card.new('Ace', 'Clubs')]
# puts cards
# puts cards.min == Card.new(2, 'Hearts')
# puts cards.max == Card.new('Ace', 'Clubs')

# cards = [Card.new(5, 'Hearts')]
# puts cards.min == Card.new(5, 'Hearts')
# puts cards.max == Card.new(5, 'Hearts')

# cards = [Card.new(4, 'Hearts'),
#         Card.new(4, 'Diamonds'),
#         Card.new(10, 'Clubs')]
# puts cards.min.rank == 4
# puts cards.max == Card.new(10, 'Clubs')

# cards = [Card.new(7, 'Diamonds'),
#         Card.new('Jack', 'Diamonds'),
#         Card.new('Jack', 'Spades')]
# puts cards.min == Card.new(7, 'Diamonds')
# puts cards.max.rank == 'Jack'

# cards = [Card.new(8, 'Diamonds'),
#         Card.new(8, 'Clubs'),
#         Card.new(8, 'Spades')]
# puts cards.min
# puts cards.max

#	Deck of Cards
class Deck
  RANKS = ((2..10).to_a + %w(Jack Queen King Ace)).freeze
  SUITS = %w(Hearts Clubs Diamonds Spades).freeze

  def initialize
    reset
  end

  def draw
    reset if @cards.count == 0
    @cards.pop
  end

  private

  def reset
    @cards = []
    SUITS.each { |suit| RANKS.each { |rank| @cards << Card.new(rank, suit) } }
    @cards.shuffle!
  end
end

# deck = Deck.new
# drawn = []
# 52.times { drawn << deck.draw }
# p drawn.count { |card| card.rank == 5 } == 4
# p drawn.count { |card| card.suit == 'Hearts' } == 13

# drawn2 = []
# 52.times { drawn2 << deck.draw }
# p drawn != drawn2 # Almost always.

#	Poker!
# Include Card and Deck classes from the last two exercises.

class PokerHand
  def initialize(deck)
    @hand = []
    5.times do
      @hand << deck.draw
    end
  end

  def print
    puts @hand
  end

  def evaluate
    case
    when royal_flush?     then 'Royal flush'
    when straight_flush?  then 'Straight flush'
    when four_of_a_kind?  then 'Four of a kind'
    when full_house?      then 'Full house'
    when flush?           then 'Flush'
    when straight?        then 'Straight'
    when three_of_a_kind? then 'Three of a kind'
    when two_pair?        then 'Two pair'
    when pair?            then 'Pair'
    else                       'High card'
    end
  end

  private

  def royal_flush?
    straight_flush? && @hand.max.rank == 'Ace'
  end

  def straight_flush?
    straight? && flush?
  end

  def four_of_a_kind?
    @hand.group_by { |elem| elem.value }.values.any? { |arr| arr.count == 4 }
  end

  def full_house?
    three_of_a_kind? && pair?
  end

  def flush?
    @hand.all? { |card| card.suit == @hand.first.suit }
  end

  def straight?
    @hand.sort[0..-2].each_index do |index|
      return false unless @hand.sort[index].value == @hand.sort[index + 1].value - 1
    end
    true
  end

  def three_of_a_kind?
    @hand.group_by { |elem| elem.value }.values.any? { |arr| arr.count == 3 }
  end

  def two_pair?
    @hand.group_by { |elem| elem.value }.values.count { |arr| arr.count == 2 } == 2
  end

  def pair?
    @hand.group_by { |elem| elem.value }.values.any? { |arr| arr.count == 2 }
  end
end

hand = PokerHand.new(Deck.new)
hand.print
puts hand.evaluate

# Danger danger danger: monkey
# patching for testing purposes.
class Array
  alias_method :draw, :pop
end

# Test that we can identify each PokerHand type.
hand = PokerHand.new([
  Card.new(10,      'Hearts'),
  Card.new('Ace',   'Hearts'),
  Card.new('Queen', 'Hearts'),
  Card.new('King',  'Hearts'),
  Card.new('Jack',  'Hearts')
])
puts hand.evaluate == 'Royal flush'

hand = PokerHand.new([
  Card.new(8,       'Clubs'),
  Card.new(9,       'Clubs'),
  Card.new('Queen', 'Clubs'),
  Card.new(10,      'Clubs'),
  Card.new('Jack',  'Clubs')
])
puts hand.evaluate == 'Straight flush'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(3, 'Diamonds')
])
puts hand.evaluate == 'Four of a kind'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(5, 'Hearts')
])
puts hand.evaluate == 'Full house'

hand = PokerHand.new([
  Card.new(10, 'Hearts'),
  Card.new('Ace', 'Hearts'),
  Card.new(2, 'Hearts'),
  Card.new('King', 'Hearts'),
  Card.new(3, 'Hearts')
])
puts hand.evaluate == 'Flush'

hand = PokerHand.new([
  Card.new(8,      'Clubs'),
  Card.new(9,      'Diamonds'),
  Card.new(10,     'Clubs'),
  Card.new(7,      'Hearts'),
  Card.new('Jack', 'Clubs')
])
puts hand.evaluate == 'Straight'

hand = PokerHand.new([
  Card.new('Queen', 'Clubs'),
  Card.new('King',  'Diamonds'),
  Card.new(10,      'Clubs'),
  Card.new('Ace',   'Hearts'),
  Card.new('Jack',  'Clubs')
])
puts hand.evaluate == 'Straight'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(6, 'Diamonds')
])
puts hand.evaluate == 'Three of a kind'

hand = PokerHand.new([
  Card.new(9, 'Hearts'),
  Card.new(9, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(8, 'Spades'),
  Card.new(5, 'Hearts')
])
puts hand.evaluate == 'Two pair'

hand = PokerHand.new([
  Card.new(2, 'Hearts'),
  Card.new(9, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(9, 'Spades'),
  Card.new(3, 'Diamonds')
])
puts hand.evaluate == 'Pair'

hand = PokerHand.new([
  Card.new(2,      'Hearts'),
  Card.new('King', 'Clubs'),
  Card.new(5,      'Diamonds'),
  Card.new(9,      'Spades'),
  Card.new(3,      'Diamonds')
])
puts hand.evaluate == 'High card'
