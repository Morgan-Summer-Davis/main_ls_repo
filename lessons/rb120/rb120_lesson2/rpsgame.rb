class Player
  attr_accessor :score
  attr_reader :move, :name, :move_history

  def initialize
    set_name
    @score = 0
    @move_history = []
  end

  private

  attr_writer :move, :name
end

class Human < Player
  def set_name
    loop do
      puts "What's your name"
      self.name = gets.chomp
      break unless name.empty?

      puts 'Sorry, must enter a valid name.'
    end
  end

  def choose
    choice = nil
    loop do
      puts 'Please choose rock, paper, or scissors:'
      choice = gets.downcase.chomp
      break if Move::VALUES.include?(choice)

      puts 'Sorry, invalid choice.'
    end
    self.move = Move.new(choice)
    move_history << choice
  end
end

class Computer < Player
  def initialize
    super
    @possible_moves = %w[rock paper scissors]
  end

  def set_name
    self.name = 'Generic Robot'
  end

  def choose
    choice = possible_moves.sample
    self.move = Move.new(choice)
    move_history << choice
  end

  private

  attr_reader :possible_moves

end

module Robots
  class R2D2 < Computer
    def initialize
      super
      @possible_moves = %w[rock]
    end

    def set_name
      self.name = 'R2D2'
    end
  end

  class Hal < Computer
    def initialize
      super
      @possible_moves = %w[rock scissors scissors scissors]
    end

    def set_name
      self.name = 'Hal'
    end
  end

  class Sonny < Computer
    def set_name
      self.name = 'Sonny'
    end
  end
end

class Move
  include Comparable
  VALUES = %w[rock paper scissors].freeze

  def initialize(value)
    @value = value
  end

  def to_s
    value
  end

  protected

  attr_reader :value

  def <=>(other)
    case value
    when 'rock'     then return 1 if other.value == 'scissors'
    when 'paper'    then return 1 if other.value == 'rock'
    when 'scissors' then return 1 if other.value == 'paper'
    end

    return -1 if value == other.value

    0
  end
end

class RPSGame
  attr_accessor :human, :computer

  def initialize
    @human = Human.new
    @computer = [Robots::R2D2, Robots::Hal, Robots::Sonny].sample.new
  end

  def play
    display_welcome_message

    loop do
      human.choose
      computer.choose
      display_winner
      break unless play_again?
    end

    display_goodbye_message
  end

  def display_welcome_message
    puts "Welcome to Rock, Paper, Scissors, #{human.name}!"
    puts "You're currently playing against #{computer.name}."
  end

  def display_goodbye_message
    puts 'Thanks for playing Rock, Paper, Scissors. Goodbye!'
  end

  def display_winner
    puts ''
    puts "#{human.name} chose #{human.move}."
    puts "#{computer.name} chose #{computer.move}."

    if human.move > computer.move
      puts "#{human.name} won!"
      human.score += 1
    elsif computer.move > human.move
      puts "#{computer.name} won!"
      computer.score += 1
    else
      puts "It's a tie!"
    end

    puts ''
    [human, computer].each do |player|
      puts "#{player.name}'s score is #{player.score}. "\
           "You've chosen rock #{player.move_history.count('rock')} times, "\
           "paper #{player.move_history.count('paper')} times, and "\
           "scissors #{player.move_history.count('scissors')} times."
    end
  end

  def play_again?
    answer = nil

    loop do
      puts ''
      puts 'Would you like to play again? (y/n)'
      answer = gets.chomp
      break if %w[y n].include? answer.downcase

      puts 'Sorry, must be y or n.'
    end

    return true if answer == 'y'

    false
  end
end

RPSGame.new.play
