INITIAL_MARKER  = ' '
PLAYER_MARKER   = 'X'
COMPUTER_MARKER = 'O'
WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] +
                [[1, 4, 7], [2, 5, 8], [3, 6, 9]] +
                [[1, 5, 9], [3, 5, 7]]

def prompt(msg)
  puts "=> #{msg}"
end

# rubocop:disable Metrics/AbcSize
def display_board(brd)
  system 'clear'
  puts "You're a #{PLAYER_MARKER}. Computer is #{COMPUTER_MARKER}."
  puts ""
  puts "     |     |"
  puts "  #{brd[1]}  |  #{brd[2]}  |  #{brd[3]}"
  puts "     |     |"
  puts "-----+-----+-----"
  puts "     |     |"
  puts "  #{brd[4]}  |  #{brd[5]}  |  #{brd[6]}"
  puts "     |     |"
  puts "-----+-----+-----"
  puts "     |     |"
  puts "  #{brd[7]}  |  #{brd[8]}  |  #{brd[9]}"
  puts "     |     |"
  puts ""
end
# rubocop:enable Metrics/AbcSize

def initialize_board
  new_board = {}
  (1..9).each { |num| new_board[num] = INITIAL_MARKER }
  new_board
end

def empty_squares(brd)
  brd.keys.select { |num| brd[num] == INITIAL_MARKER }
end

def alternate_player(player)
  return 'p' if player == 'c'
  return 'c' if player == 'p'
end

def place_piece!(brd, player)
  player_places_piece!(brd)   if player == 'p'
  computer_places_piece!(brd) if player == 'c'
end

def player_places_piece!(brd)
  square = ''

  loop do
    prompt "Choose a square (#{joinor(empty_squares(brd))}):"
    square = gets.chomp.to_i
    break if empty_squares(brd).include?(square)
    prompt "Sorry, that's not a valid choice."
  end

  brd[square] = PLAYER_MARKER
  display_board(brd)
end

def computer_places_piece!(brd)
  square = computer_finds_move(brd, COMPUTER_MARKER)
  square = computer_finds_move(brd, PLAYER_MARKER) if !square
  square = 5 if brd[5] == INITIAL_MARKER
  square = empty_squares(brd).sample if !square
  brd[square] = COMPUTER_MARKER
end

def computer_finds_move(brd, marker)
  WINNING_LINES.each do |line|
    if brd.values_at(*line).count(marker) == 2 &&
       brd.values_at(*line).count(INITIAL_MARKER) == 1
      line.each do |key|
        return key if brd[key] == INITIAL_MARKER
      end
      return nil
    end
  end
  nil
end

def board_full?(brd)
  empty_squares(brd).empty?
end

def someone_won?(brd)
  !!detect_winner(brd)
end

def detect_winner(brd)
  WINNING_LINES.each do |line|
    if brd.values_at(*line).all?(PLAYER_MARKER)
      return 'Player'
    elsif brd.values_at(*line).all?(COMPUTER_MARKER)
      return 'Computer'
    end
  end
  nil
end

def joinor(arr)
  case arr.length
  when 1 then arr.first.to_s
  when 2 then arr.join(' ')
  else arr[0..-2].join(', ') + ", or #{arr.last}"
  end
end

player_score = 0
computer_score = 0

loop do
  board = initialize_board

  prompt "Who should go first? (p for player, c for computer, or anything else"\
         " to let the computer decide.)"
  current_player = gets.chomp.downcase

  current_player = ['p', 'c'].sample if current_player != 'p' &&
                                        current_player != 'c'

  loop do
    display_board(board)
    place_piece!(board, current_player)
    current_player = alternate_player(current_player)
    break if someone_won?(board) || board_full?(board)
  end

  display_board(board)

  if someone_won?(board)
    player_score   += 1 if detect_winner(board) == 'Player'
    computer_score += 1 if detect_winner(board) == 'Computer'
    prompt "#{detect_winner(board)} won!"
  else
    prompt "It's a tie!"
  end

  prompt "Your score is #{player_score}. Computer's score is #{computer_score}."
  break if player_score >= 5 || computer_score >= 5
  prompt "Play again? (y or n)"
  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt "Thanks for playing Tic Tac Toe! Goodbye!"
