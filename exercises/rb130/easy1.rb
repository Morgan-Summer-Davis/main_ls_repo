# Enumerable Class Creation
class Tree
  include Enumerable

  def each; end
end

# Optional Blocks
def compute(param)
  return yield(param) if block_given?
  'Does not compute.'
end

# compute { 5 + 3 } == 8
# compute { 'a' + 'b' } == 'ab'
# compute == 'Does not compute.'

# compute(5) { |int| int + 3 } == 8
# compute('a') { |str| str + 'b' } == 'ab'
# compute(nil) == 'Does not compute.'


# Find Missing Numbers
def missing(arr)
  (arr.min..arr.max).to_a - arr
end

# missing([-3, -2, 1, 5]) == [-1, 0, 2, 3, 4]
# missing([1, 2, 3, 4]) == []
# missing([1, 5]) == [2, 3, 4]
# missing([6]) == []


# Divisors
def divisors(int)
  processed_int = int
  prime_factors = []

  while processed_int > 1
    2.upto(processed_int) do |num|
      if processed_int % num == 0
        prime_factors << num
        processed_int /= num
        break
      end
    end
  end

  divisors = prime_factors + [1]

  prime_factors.count.downto(2) do |num_of_primes|
    (num_of_primes).times do |starting_index|
      divisors << prime_factors[starting_index, num_of_primes].reduce(&:*)
    end
  end

  divisors.uniq.sort
end

# divisors(1) == [1]
# divisors(7) == [1, 7]
# divisors(12) == [1, 2, 3, 4, 6, 12]
# divisors(98) == [1, 2, 7, 14, 49, 98]
# divisors(99400891) == [1, 9967, 9973, 99400891] # may take a minute
# divisors(999962000357) == [1, 999979, 999983, 999962000357]


# Encrypted Pioneers
ALPHABET = ('a'..'z').to_a

def decrypt_rot13(str)
  output = ''
  str.chars.each do |char|
    processed_char = char

    if ALPHABET.include? processed_char.downcase
      processed_char = ALPHABET[(ALPHABET.index(char.downcase) + 13) % 26].clone
      processed_char.upcase! if char == char.upcase
    end

    output << processed_char
  end

  output
end

# ENCRYPTED_PIONEERS = [
#   'Nqn Ybirynpr',
#   'Tenpr Ubccre',
#   'Nqryr Tbyqfgvar',
#   'Nyna Ghevat',
#   'Puneyrf Onoontr',
#   'Noqhyynu Zhunzznq ova Zhfn ny-Xujnevmzv',
#   'Wbua Ngnanfbss',
#   'Ybvf Unvog',
#   'Pynhqr Funaaba',
#   'Fgrir Wbof',
#   'Ovyy Tngrf',
#   'Gvz Orearef-Yrr',
#   'Fgrir Jbmavnx',
#   'Xbaenq Mhfr',
#   'Fve Nagbal Ubner',
#   'Zneiva Zvafxl',
#   'Lhxvuveb Zngfhzbgb',
#   'Unllvz Fybavzfxv',
#   'Tregehqr Oynapu'
# ].freeze

# ENCRYPTED_PIONEERS.each { |pioneer| p decrypt_rot13(pioneer) }


# Iterators: True for Any?
def any?(arr)
  arr.each { |elem| return true if yield(elem) }
  false
end

# any?([1, 3, 5, 6]) { |value| value.even? } == true
# any?([1, 3, 5, 7]) { |value| value.even? } == false
# any?([2, 4, 6, 8]) { |value| value.odd? } == false
# any?([1, 3, 5, 7]) { |value| value % 5 == 0 } == true
# any?([1, 3, 5, 7]) { |value| true } == true
# any?([1, 3, 5, 7]) { |value| false } == false
# any?([]) { |value| true } == false


# Iterators: True for All?
def all?(arr)
  arr.each { |elem| return false unless yield(elem) }
  true
end

# all?([1, 3, 5, 6]) { |value| value.odd? } == false
# all?([1, 3, 5, 7]) { |value| value.odd? } == true
# all?([2, 4, 6, 8]) { |value| value.even? } == true
# all?([1, 3, 5, 7]) { |value| value % 5 == 0 } == false
# all?([1, 3, 5, 7]) { |value| true } == true
# all?([1, 3, 5, 7]) { |value| false } == false
# all?([]) { |value| false } == true


# Iterators: True for None?
def none?(arr)
  arr.each { |elem| return false if yield(elem) }
  true
end


# Iterators: True for One?
def one?(arr)
  output = false
  arr.each do |elem|
    output ? (return false if yield(elem)) : output = !!yield(elem)
  end
  output
end

# p one?([1, 3, 5, 6]) { |value| value.even? }     == true
# p one?([1, 3, 5, 7]) { |value| value.odd? }      == false
# p one?([2, 4, 6, 8]) { |value| value.even? }     == false
# p one?([1, 3, 5, 7]) { |value| value % 5 == 0 }  == true
# p one?([1, 3, 5, 7]) { |value| true }            == false
# p one?([1, 3, 5, 7]) { |value| false }           == false
# p one?([]) { |value| true }                      == false


# Count Items
def count(arr)
  iterator = 0

  arr.each do |elem|
    case block_given?
    when true then iterator += 1 if yield(elem)
    when false then iterator += 1 end
  end

  iterator
end

def further_count(arr)
  iterator = 0

  0.upto(arr.length - 1) do |index|
    case block_given?
    when true then iterator += 1 if yield(arr[index])
    when false then iterator += 1 end
  end

  iterator
end

# p further_count([1,2,3,4,5]) { |value| value.odd? } == 3
# p count([1,2,3,4,5]) { |value| value % 3 == 1 } == 2
# p count([1,2,3,4,5]) { |value| true } == 5
# p count([1,2,3,4,5]) { |value| false } == 0
# p count([]) { |value| value.even? } == 0
# p count(%w(Four score and seven)) { |value| value.size == 5 } == 2