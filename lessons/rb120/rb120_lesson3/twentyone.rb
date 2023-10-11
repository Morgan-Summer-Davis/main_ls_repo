class Game
  def initialize
    reset
    @human    = Human.new(self)
    @computer = Computer.new(self)
  end

  def play
    display_welcome_message
    loop do
      deal_hands
      play_turns
      display_hands(hide_computer_hands: false)
      determine_winner
      break unless play_again?

      reset
    end
    display_goodbye_message
  end

  def deal_card(player)
    player.hand << deck.deal
  end

  def display_hands(hide_computer_hands: true)
    ObjectSpace.each_object(Computer) do |ai|
      ai.display_hand(hide_hand: hide_computer_hands)
    end
    ObjectSpace.each_object(Human, &:display_hand)
  end

  private

  attr_reader :human, :computer, :deck

  def display_welcome_message
    system 'clear'
    puts "Welcome to Twenty-One, #{human.name}! You're playing against "\
         "#{computer.name}."
    puts ''
  end

  def display_goodbye_message
    puts 'Thank you for playing Twenty-One. Goodbye!'
    puts ''
  end

  def determine_winner
    winning_players = []
    ObjectSpace.each_object(Player) do |player|
      puts "#{player.name} busted!" if player.busted?
      winning_players << player unless player.busted?
    end

    winning_players = winning_players.select do |player|
      player.hand_value == winning_players.max { |a, b| a.hand_value <=> b.hand_value }.hand_value
    end

    display_winner(winning_players)
  end

  def display_winner(winning_players)
    case winning_players.count
    when 0 then puts "It's a tie!"
    when 1 then puts "#{winning_players.first.name} wins!"
    else
      puts "It's a tie! The following players tied with the winning score:"
      puts winning_players.join(', ')
    end
  end

  def deal_hands
    2.times do
      ObjectSpace.each_object(Player) do |player|
        deal_card(player)
      end
    end
  end

  def play_turns
    ObjectSpace.each_object(Human, &:take_turn)
    ObjectSpace.each_object(Computer, &:take_turn)
  end

  def play_again?
    puts 'Would you like to play again? (y/n)'
    choice = gets.chomp.downcase
    return choice == 'y' if %w[y n].include? choice

    puts "Sorry, that's not a valid choice. Please choose y or n."
  end

  def reset
    system 'clear'
    @deck = Deck.new
    ObjectSpace.each_object(Player) { |player| player.hand = [] }
  end
end

class Player
  attr_accessor :hand
  attr_reader   :name

  def initialize(game)
    @hand = []
    @name = pick_name
    @game = game
  end

  def hand_value
    adjust_aces = false
    adjust_aces = hand.collect(&:value).sum > 21
    hand.collect { |card| card.value(adjust_aces) }.sum
  end

  def hit
    @game.deal_card(self)
  end

  def busted?
    hand_value > 21
  end

  def display_hand
    puts "#{name} has the following cards:"
    puts hand
    puts "Their total is #{hand_value}."
    puts ''
  end
end

class Human < Player
  def pick_name
    name = ''
    loop do
      puts "What's your name?"
      name = gets.chomp
      break unless name.strip == ''

      puts "Sorry, that's invalid. Please input a name."
    end
    name
  end

  def take_turn
    @game.display_hands
    loop do
      break if busted?

      puts 'Would you like to (h)it or (s)tay?'
      choice = gets.chomp.downcase
      system 'clear'
      hit       if choice == 'h'
      take_turn if choice == 'h'
      break     if %w[h s].include? choice

      @game.display_hands
      puts "Sorry, that's not a valid choice."
    end
  end
end

class Computer < Player
  COMPUTER_NAMES = %w[R2D2 Hal Sonny].freeze

  def pick_name
    COMPUTER_NAMES.sample
  end

  def take_turn
    puts ''
    loop do
      if hand_value >= 18
        puts "#{name} stays."
        break
      else
        puts "#{name} hits."
        hit
      end
    end
  end

  def display_hand(hide_hand: true)
    super() unless hide_hand
    return unless hide_hand

    puts "#{name} has the following cards:"
    puts hand[0]
    puts "#{hand.count - 1} unknown card(s)."
    puts "Their known total is #{hand[0].value}."
    puts ''
  end
end

class Deck
  SUITS = %w[hearts diamonds spades clubs].freeze
  RANK  = (2..10).to_a << 'ace' << 'king' << 'queen' << 'jack'
  # REMOVE THE READER, JUST FOR TESTING
  attr_reader :deck

  def initialize
    @deck = []
    SUITS.each do |suit|
      RANK.each do |rank|
        @deck << Card.new(suit, rank)
      end
    end
  end

  def deal
    @deck.shuffle!.pop
  end
end

class Card
  attr_accessor :suit, :rank

  def initialize(suit, rank)
    @suit = suit
    @rank = rank
  end

  def face_card?
    %w[king queen jack].include? rank
  end

  def to_s
    "The #{rank} of #{suit}."
  end

  def +(other)
    rank + other.rank
  end

  def value(adjust_aces = false)
    return 10 if face_card?
    return 10 if rank == 'ace' && !adjust_aces
    return 1  if rank == 'ace' && adjust_aces

    rank
  end
end

game = Game.new
game.play
