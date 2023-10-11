require 'yaml'

VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"]
RESULTS = YAML.load_file('rock_paper_scissors_results.yml')

def prompt(input)
  puts "=> #{input}"
end

def win?(player1, player2)
  if RESULTS[player1].find_index(player2)
    true
  end
end

def display_results(player, computer)
  if win?(player, computer)
    prompt("You won!")
  elsif win?(computer, player)
    prompt("You lose...")
  else
    prompt("It's a tie.")
  end
end

choice = ''
player_wins = 0
computer_wins = 0

loop do
  while player_wins < 3 && computer_wins < 3
    loop do
      prompt("Choose one: #{VALID_CHOICES.join(', ')}")
      choice = gets.chomp.downcase
      choice_array = VALID_CHOICES
      choice_array = ['r', 'p', 'sc', 'l', 'sp'] if
        ['r', 'p', 'sc', 'l', 'sp'].index(choice)

      if choice_array.any?(choice)
        choice = VALID_CHOICES[choice_array.index(choice)]
        break
      else
        prompt("That is not a valid input.")
      end
    end

    computer_choice = VALID_CHOICES.sample
    prompt("You chose: #{choice}; the computer chose: #{computer_choice}")

    display_results(choice, computer_choice)
    if win?(choice, computer_choice)
      player_wins += 1
    elsif win?(computer_choice, choice)
      computer_wins += 1
    end

    prompt("You have #{player_wins} wins; the computer has
      #{computer_wins} wins. First to three is the grand champion!")
  end

  if player_wins >= 3
    prompt("Congratulations, you are the grand champion!")
  else
    prompt("The computer is the grand champion!")
  end

  prompt("Would you like to play again?")
  break unless gets.chomp.downcase.start_with?('y')
  player_wins = 0
  computer_wins = 0
end

prompt("Thank you for playing!")
