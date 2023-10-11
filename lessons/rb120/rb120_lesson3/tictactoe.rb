class Board
  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] + # rows
                  [[1, 4, 7], [2, 5, 8], [3, 6, 9]] + # cols
                  [[1, 5, 9], [3, 5, 7]]              # diagonals

  def initialize
    @squares = {}
    reset
  end

  def []=(num, marker)
    @squares[num].marker = marker
  end

  def unmarked_keys
    @squares.keys.select { |key| @squares[key].unmarked? }
  end

  def full?
    unmarked_keys.empty?
  end

  def someone_won?
    !!winning_marker
  end

  def any_line_has_num_identical_markers?(marker = nil, num)
    WINNING_LINES.each do |line|
      squares = @squares.values_at(*line)
      return squares if identical_markers?(squares, marker, num)
    end

    false
  end

  def winning_marker
    winning_line = any_line_has_num_identical_markers?(3)
    return winning_line.first.marker if winning_line
    false
  end

  def reset
    (1..9).each { |key| @squares[key] = Square.new(key) }
  end

  # rubocop:disable Metrics/AbcSize
  def draw
    puts "     |     |"
    puts "  #{@squares[1]}  |  #{@squares[2]}  |  #{@squares[3]}"
    puts "     |     |"
    puts "-----+-----+-----"
    puts "     |     |"
    puts "  #{@squares[4]}  |  #{@squares[5]}  |  #{@squares[6]}"
    puts "     |     |"
    puts "-----+-----+-----"
    puts "     |     |"
    puts "  #{@squares[7]}  |  #{@squares[8]}  |  #{@squares[9]}"
    puts "     |     |"
  end
  # rubocop:enable Metrics/AbcSize

  private

  def identical_markers?(squares, marker = nil, num)
    markers = squares.select(&:marked?).collect(&:marker)
    markers = squares.select { |square| square.marked_with?(marker) }.collect(&:marker) if marker
    return false if markers.size != num
    markers.min == markers.max
  end
end

class Square
  INITIAL_MARKER = " "

  attr_accessor :marker
  attr_reader :key

  def initialize(key, marker = INITIAL_MARKER)
    @key = key
    @marker = marker
  end

  def to_s
    @marker
  end

  def unmarked?
    marker == INITIAL_MARKER
  end

  def marked?
    marker != INITIAL_MARKER
  end

  def marked_with?(marker)
    self.marker == marker
  end
end

class Player
  attr_accessor :wins
  attr_reader :marker, :name

  def initialize(name, marker)
    @name = name
    @marker = marker
    @wins = 0
  end
end

class TTTGame
  attr_reader :board, :human, :computer

  def initialize
    @board = Board.new
    @human = Player.new(request_player_name, request_player_marker)
    @human_name = ''
    @computer = Player.new(choose_computer_name, choose_computer_marker)
    @current_marker = human.marker
    @first_to_move = human.marker
  end

  def play
    clear
    display_welcome_message
    main_game
    display_goodbye_message
  end

  private

  def main_game
    loop do
      display_board
      player_move
      display_result
      break unless play_again?
      reset
      display_play_again_message
    end
  end

  def player_move
    loop do
      current_player_moves
      break if board.someone_won? || board.full?
      clear_screen_and_display_board if human_turn?
    end
  end

  def display_welcome_message
    clear
    puts "Welcome to Tic Tac Toe!"
    puts ""
  end

  def request_player_name
    name = ''
    puts "Please input your name:"
    loop do
      name = gets.chomp
      break unless name.strip == ''
      puts "Sorry, that's an invalid response. Please input something!"
    end
    name
  end

  def request_player_marker
    marker = ''
    puts "What would you like your marker to be?"
    loop do
      marker = gets.chomp
      break unless marker.strip == ''
      puts "Sorry, that's an invalid response. Please input something!"
    end
    marker
  end

  def choose_computer_name; ['R2D2', 'Hal', 'Sonny'].sample; end

  def choose_computer_marker
    case human.marker
    when 'X' then 'O'
    when 'O' then 'X'
    else ('A'..'Z').to_a.sample end
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  def clear_screen_and_display_board
    clear
    display_board
  end

  def human_turn?
    @current_marker == human.marker
  end

  def display_board
    puts "#{human.name} is #{human.marker}. #{computer.name} is #{computer.marker}."
    puts ""
    board.draw
    puts ""
  end

  def markable_keys
    case board.unmarked_keys.count
    when 1 then board.unmarked_keys[0].to_s
    when 2 then board.unmarked_keys.join(' or ')
    else        [board.unmarked_keys[0..-2].join(', '), board.unmarked_keys[-1]].join(', or ')
    end

  end

  def human_moves
    puts "Choose a square (#{markable_keys}): "
    square = nil
    loop do
      square = gets.chomp.to_i
      break if board.unmarked_keys.include?(square)
      puts "Sorry, that's not a valid choice."
    end

    board[square] = human.marker
  end

  def computer_moves
    noteworthy_line = nil
    next_move = nil

    noteworthy_line = board.any_line_has_num_identical_markers?(computer.marker, 2)
    noteworthy_line = board.any_line_has_num_identical_markers?(human.marker, 2) unless noteworthy_line
    next_move = noteworthy_line.select{ |square| square.marker == Square::INITIAL_MARKER }.first if noteworthy_line
    next_move = next_move.key if next_move

    if next_move
      board[next_move] = computer.marker
    elsif board.unmarked_keys.include?(5)
      board[5] = computer.marker
    else
      board[board.unmarked_keys.sample] = computer.marker
    end
  end

  def current_player_moves
    if human_turn?
      human_moves
      @current_marker = computer.marker
    else
      computer_moves
      @current_marker = human.marker
    end
  end

  def display_result
    clear_screen_and_display_board

    case board.winning_marker
    when human.marker
      puts "#{human.name} won!"
      human.wins += 1
    when computer.marker
      puts "#{computer.name} won!"
      computer.wins += 1
    else
      puts "It's a tie!"
    end
    puts "#{human.name} has won #{human.wins} times. #{computer.name} has won "\
         "#{computer.wins} times."
    puts ""
  end

  def play_again?
    answer = nil
    loop do
      puts "Would you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %w(y n).include? answer
      puts "Sorry, must be y or n"
    end

    answer == 'y'
  end

  def clear
    system "clear"
  end

  def reset
    board.reset
    @current_marker = @first_to_move
    clear
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ""
  end
end

game = TTTGame.new
game.play