# Countdown
def decrease(counter)
  counter -= 1
end

counter = 10

counter.times do
  puts counter
  counter = decrease(counter)
end

puts 'LAUNCH!'

# Added "counter =" before "decrease(counter)". Numbers are immutable, so the
# variable had to be reassigned to get the new value. For the further
# exploration, changed "10.times" to "counter.times"


#	HEY YOU!
def shout_out_to(name)
  name.upcase!

  puts 'HEY ' + name
end

shout_out_to('you') # expected: 'HEY YOU'

# Changeed "name.chars.each { |c| c.upcase!" to "name.upcase!" Because chars
# returns a new array based off the str, the upcase was mutating the strings
# inside the array, not the original variable.


#	Valid Series?
def valid_series?(nums)
  return false if nums.sum != 47

  odd_count = nums.count { |n| n.odd? }
  odd_count == 3 ? true : false
end

p valid_series?([5, 6, 2, 7, 3, 12, 4, 8])        # should return true
p valid_series?([1, 12, 2, 5, 16, 6])             # should return false
p valid_series?([28, 3, 4, 7, 9, 14])             # should return false
p valid_series?([20, 6, 9, 4, 2, 1, 2, 3])        # should return true
p valid_series?([10, 6, 19, 2, 6, 4])             # should return false

# Changed "odd_count = 3 ? true : false" to "odd_count == 3 ? true : false"
# Because it was an assignment instead of comparison and assignments are always
# truthy, the last line would always return true. In regards to the further
# exploration: no the ternary is not necessary, and in fact the odd_count
# variable could be refactored away altogether. The last two lines could be
# condensed to "nums.count { |n| n.odd? } == 3"


#	Reverse Sentence
def reverse_sentence(sentence)
  words = sentence.split(' ')
  reversed_words = []

  i = 0
  while i < words.length
    reversed_words.insert(0, words[i])
    i += 1
  end

  reversed_words.join(' ')
end

p reverse_sentence('how are you doing')
# expected output: 'doing you are how'

# Changed "reversed_words = words[i] + reversed_words" to
# "reversed_words.insert(0, words[i])". words[i] is a string, whereas
# reversed_words is an array, which cannot be concatanated with Array#+. If
# maintaining the + operator and assignment is imperative, it could be instead
# changed to "reversed_words = [words[i]] + reversed_words", but I find this
# version more "hacky" and less clear.


#	Card Deck
cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, :jack, :queen, :king, :ace]

deck = { :hearts   => cards.clone,
         :diamonds => cards.clone,
         :clubs    => cards.clone,
         :spades   => cards.clone }

def score(card)
  case card
  when :ace   then 11
  when :king  then 10
  when :queen then 10
  when :jack  then 10
  else card
  end
end

# Pick one random card per suit

player_cards = []
deck.keys.each do |suit|
  cards = deck[suit]
  cards.shuffle!
  player_cards << cards.pop
end

# Determine the score of the remaining cards in the deck

sum = deck.reduce(0) do |sum, (_, remaining_cards)|
  remaining_cards.map! do |card|
    score(card)
  end

  sum += remaining_cards.sum
end

puts sum

# Changed deck to refer to clones of cards, as originally they all referenced
# the same array. Changed Array#map on line 111 to #Array#map! so that the
# changes would actually be stored instead of called and never used.


#	Getting Things Done
def move(n, from_array, to_array)
  to_array << from_array.shift
  move(n - 1, from_array, to_array) if n > 1
end

# Example

todo = ['study', 'walk the dog', 'coffee with Tom']
done = ['apply sunscreen', 'go to the beach']

move(4, todo, done)

p todo # should be: ['coffee with Tom']
p done # should be: ['apply sunscreen', 'go to the beach', 'study', 'walk the dog']

# Added "if n > 1" to line 128. SystemStackError occurs when the stack
# overflows--in this case, because move recurs itself infinitely. As for the
# further exploration: it will add a nil to the end of to_array, as from_array
# will have no remaining elements and Array#shift returns nil in that case.
# This could be prevented by returning if from_array.empty? returns true before
# the recursion.


#	Neutralizer
def neutralize(sentence)
  words = sentence.split(' ')
  words.each_with_index do |word, i|
    words[i] = nil if negative?(word)
  end

  words.compact.join(' ')
end

def negative?(word)
  [ 'dull',
    'boring',
    'annoying',
    'chaotic'
  ].include?(word)
end

p neutralize('These dull boring cards are part of a chaotic board game.')
# Expected: These cards are part of a board game.
# Actual: These boring cards are part of a board game.

# The error is because the source of the iteration (words) is altered during
# the iteration. Specifically what happens is:
# words[0] ("These") is not negative
# words[1] ("dull") IS negative and removed
# words[2] is now "cards" and words[1] is "boring", but the iteration is beyond
# words[1] and so never catches it. There are a number of ways to solve this;
# I opted to instead replace their indexed position with nil and then compact
# the nil values away, maintaining the size of the array while iterating, then
# deleting them all after.


#	Password
password = nil

def set_password(password)
  puts 'What would you like your password to be?'
  new_password = gets.chomp
  password = new_password
end

def verify_password(password)
  puts '** Login **'
  print 'Password: '
  input = gets.chomp
  
  if input == password
    puts 'Welcome to the inside!'
  else
    puts 'Authentication failed.'
  end
end

if !password
  password = set_password(password)
end

verify_password(password)

# Added arguments to both verify_password and set_password so that password
# could be accessed inside those methods--because of password's scope, it can't
# otherwise. Additionally, set password to the output of set_password on line
# 204, as the output of the method did nothing otherwise and password stayed nil


#	Number Guessing Game
def valid_integer?(string)
  string.to_i.to_s == string
end

def guess_number(max_number, max_attempts)
  winning_number = (1..max_number).to_a.sample
  attempts = 0

  loop do
    attempts += 1
    break if attempts > max_attempts

    input = nil
    until valid_integer?(input)
      print 'Make a guess: '
      input = gets.chomp
    end

    guess = input.to_i

    if guess == winning_number
      puts 'Yes! You win.'
      return
    else
      puts 'Nope. Too small.' if guess < winning_number
      puts 'Nope. Too big.'   if guess > winning_number
    end
  end
end

guess_number(10, 3)

# The issue is that the method both loops and recurs. Thus, the guesses are
# reset and number rerandomized whenever one guesses wrong. Removing the
# recursion removes the most egrigious errors; however, I also added a return
# to the win condition, as otherwise the game continues after a win until you
# max your guesses.


#	TF-IDF
# Term frequency - inverse document frequency:
# A measure of how important a term is to a document in a collection of documents
# (the importance increases proportionally to the term frequency in the document,
# but decreases with the frequency of the word across documents)

def tfidf(term, document, documents)
  tf(term, document) * idf(term, documents)
end

# Term frequency (simple version):
# the number of times a term occurs in a document

def tf(term, document)
  document.split(/[\s,.-]/).count { |word| word.downcase == term }
end

# Inverse document frequency:
# measure of how much information the word provides,
# based on the number of documents in which it occurs
# (the rarer it is, the more information it provides)

def idf(term, documents)
  number_of_documents = documents.length.to_f
  number_of_documents_with_term = documents.count { |d| tf(term, d) > 0 }.to_f

  return 0 if number_of_documents_with_term == 0
  Math.log(number_of_documents / number_of_documents_with_term)
end

# Very simple example

document1 = "Schrödinger's cat is a thought experiment often featured in discussions of the interpretation of quantum mechanics. The Austrian physicist Erwin Schrödinger devised " +
"it in 1935 as an argument against the Copenhagen interpretation of quantum mechanics, which states that an object in a physical system can simultaneously exist in all possible configurations, " +
"a state called quantum superposition, and only observing the system forces the object into just one of those possible states. Schrödinger disagreed with this interpretation. In particular, " +
"quantum superposition could not work with larger objects. As an illustration, he presented a scenario with a cat in a sealed box, whose fate was linked to a subatomic event that may or may not occur. " +
"In a quantum superposed state of the subatomic particles, the cat would be both alive and dead, until someone opened the box and observed it."

document2 = "The domestic cat is a small, furry, carnivorous mammal. The term cat can, however, also refer to wild cats, which include animals like lions, tigers and leopards. " +
"Cats are claimed to have a lower social IQ than dogs but can solve more difficult cognitive problems and have a longer-term memory. International Cat Day is celebrated on August 8. " +
"Famous cats include Schrödinger's cat as well as Pudding and Butterscotch, which occur in some of the Launch School assignments."

document3 = "One of the core values that sets Launch School apart from some other coding schools out there is our emphasis on Mastery-based Learning. If the key to becoming a competent and confident Software Engineer " +
"is deep understanding of first principles, then the key to acquiring that understanding is through Mastery-based Learning. The core of Mastery-based Learning is replacing time with mastery. There's no graduation, " +
"but a continual learning journey of micro-improvements. At Launch School, we're not trying to catch a wave or take advantage of a surge in demand. Instead, we're trying to focus on things that'll be useful to you for decades to come, " +
"such as a systematic problem-solving approach or learning how to deconstruct a programming language or building sound mental representations of how web application work. Everything we're trying to do at " +
"Launch School is with an eye towards sustainable studying habits and building skills for a long-term career."

documents = [document2, document3]

# The higher the tf-idf score of a term for a document, the more informative
# it is for that document.
# E.g. when someone searches for the term 'cat' in your document collection,
# you want to return document1 and document2, but not document3.
# For the term 'quantum mechanics', on the other hand, you only want to return document1.

# expected outputs:

puts tfidf("cat", document1, documents) # ~ 1.2
puts tfidf("cat", document2, documents) # ~ 1.6
puts tfidf("cat", document3, documents) # 0

puts tfidf("quantum", document1, documents) # ~ 5.5
puts tfidf("quantum", document2, documents) # 0
puts tfidf("quantum", document3, documents) # 0

puts tfidf("mastery", document1, documents) # 0
puts tfidf("mastery", document2, documents) # 0
puts tfidf("mastery", document3, documents) # ~ 4.4

puts tfidf("some", document1, documents) # 0
puts tfidf("some", document2, documents) # ~ 0.4
puts tfidf("some", document3, documents) # ~ 0.4

# Both number_of_documents and number_of_documents_with_term in idf can be set
# to integers, so when they're processed in tfidf and idf, the program sometimes
# performs integer operations, leading to major rounding errors. They just
# needed to be converted to floats with Integer#to_f. Additionally, if there
# are no documents with the term, idf will attempt to divide by zero. Thus, I
# added a conditional return before the division to return 0 if there are no
# relevant documents.


#	What's wrong with the output?
arr = ["9", "8", "7", "10", "11"]

p arr.sort { |x, y| y.to_i <=> x.to_i }

# Expected output: ["11", "10", "9", "8", "7"] 
# Actual output: ["10", "11", "7", "8", "9"] 