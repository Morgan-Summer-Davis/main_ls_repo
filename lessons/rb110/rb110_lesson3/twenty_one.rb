def prompt(msg)
  puts "=> #{msg}"
end

def initialize_game(deck)
  player_hand = []
  dealer_hand = []

  4.times do |i|
    hit(deck, player_hand) if i.even?
    hit(deck, dealer_hand) if i.odd?
  end

  [player_hand, dealer_hand]
end

def hit(deck, hand)
  rand_card = deck.select { |_, value| value > 0 }.keys.sample
  hand << rand_card
  deck[rand_card] -= 1
end

def calculate_total(hand)
  total = hand.select { |card| card.to_i == card }.sum +
          hand.count  { |card| card.to_s == card && card != 'Ace' } * 10 +
          hand.count  { |card| card == 'Ace' }
  hand.count { |card| card == 'Ace' }.times { total += 10 if total <= 11 }

  total
end

deck = { 2 => 4, 3 => 4, 4 => 4, 5 => 4, 6 => 4, 7 => 4, 8 => 4, 9 => 4,
         10 => 4, "Jack" => 4, 'Queen' => 4, 'King' => 4, 'Ace' => 4 }

hands = initialize_game(deck)
player_hand = hands[0]
dealer_hand = hands[1]
player_total = calculate_total(player_hand)
dealer_total = calculate_total(dealer_hand)

loop do
  prompt "You have: #{player_hand.join(', ')}."
  prompt "Your total is #{player_total}."
  puts ''
  prompt "The dealer has: #{dealer_hand.last} and an unknown card."
  prompt "Would you like to hit or stay?"
  action = gets.chomp.downcase

  if action == 'hit'
    hit(deck, player_hand)
    player_total = calculate_total(player_hand)
  end

  break if action == 'stay' || player_total > 21
  prompt "Sorry, I didn't understand that input."
end

if player_total > 21
  prompt "You lost!"
  exit
end

while dealer_total < 17
  hit(deck, dealer_hand)
  prompt "The dealer chooses to hit, revealing a #{dealer_hand.last}."
  dealer_total = calculate_total(dealer_hand)
end

prompt "The dealer's unknown card was: #{dealer_hand.first}."
prompt "Your total was #{player_total}."
prompt "The dealer's total was #{dealer_total}."
prompt "You won!"    if player_total > dealer_total || dealer_total > 21
prompt "You lost!"   if dealer_total > player_total && dealer_total <= 21
prompt "It's a tie!" if  dealer_total == player_total
