#	Madlibs Revisited
MADLIBS = { adjective: ['quick',  'lazy',  'sleepy',   'ugly'],
            noun:      ['fox',    'dog',    'head',    'leg'],
            verb:      ['jumps',  'lifts',  'bites',   'licks'],
            adverb:    ['easily', 'lazily', 'noisily', 'excitedly'] }

def madlib(file_path)
  file = File.read(file_path)
  MADLIBS.each_pair do |key, value|
    file.gsub!("%{#{key.to_s}}", value[rand(value.count)])
  end
  puts file
end

#	Seeing Stars
def star(int)
  half_star = (int - 1) / 2
  spaces    = half_star
  
  2.times do
    (half_star).times do
      print (' ' * (half_star - spaces.abs))                   + '*' +
            (' ' * (half_star - 1 - (half_star - spaces.abs))) + '*' +
            (' ' * (half_star - 1 - (half_star - spaces.abs))) + '*' +
            (' ' * (half_star - spaces.abs))                   + "\n"
      spaces -= 1
    end
    print '*' * int + "\n" if spaces == 0
    spaces -= 1
  end
end

def circle(diameter)
  radius = diameter / 2

  (-radius..radius).each do |i|
    (-radius..radius).each do |j|
      print Math.sqrt(i**2 + j**2).round == radius ? '*' : ' '
    end
    puts ''
  end
end

def sine_wave(amp, freq, phase = 0, time = 50, shift = 0)
  (-amp..amp).each do |a|
    print '| '
    (-time..time).each do |t|
      print ((amp * Math.cos(((2 * Math::PI) / freq) * t + phase)) + shift).round == a ? '*' : ' '
    end
    puts ' |'
  end
end

#	Transpose 3x3
def transpose(matrix)
  output      = []
  matrix     << []  while matrix.count <
                          matrix.max{ |a, b| a.count <=> b.count }.count
  while matrix.max{ |a, b| a.count <=> b.count }.count >
        matrix.min{ |a, b| a.count <=> b.count }.count
    matrix.min{ |a, b| a.count <=> b.count } << nil 
  end
  while matrix.min{ |a, b| a.count <=> b.count }.count < matrix.count
    matrix.min{ |a, b| a.count <=> b.count } << nil 
  end

  matrix.count.times { output << [] }
    matrix.count.times do |i|
      matrix[i].count.times do |j|
        output[i] << matrix[j][i]
    end
  end
  matrix.map!(&:compact).delete_if { |i| i.flatten.empty? }
  output.map(&:compact).delete_if { |i| i.flatten.empty? }
end

def further_transpose(matrix)
  matrix.count.times do |i|
    skips = i + 1
    matrix[i].count.times do |j|
      next if i == j
      skips -= 1 if skips > 0
      next if skips > 0
      matrix[i].insert(j, matrix[j].slice!(i))
      matrix[j].insert(i, matrix[i].slice!(j + 1))
      p matrix
    end
  end
  matrix
end

# Transpose MxN
# Incorporated into Transpose 3x3.

#	Rotating Matrices
def rotate(matrix, turns = 1)
  output = matrix
  turns.times { output = transpose(output).map(&:reverse) }
  output
end

def my_method(array)
  if array.empty?
    []
  elsif array.count > 1
    array.map do |value|
      value * value
    end
  else
    [7 * array.first]
  end
end


# Because the elsif statement is missing its intended conditional expression, it
# processed the map call as its condition, which is not false of nil and as such
# is truthy. However, since the map is treated as a condition, the block is read
# as empty and so returns nil.

#	Merge Sorted List
def merge(arr1, arr2)
  input = (arr1 + arr2)
  output = []
  
  input.each do |i|
    next_entry = input.min
    next_entry = input.select { |j| j > output.max }.min if output.count > 0
    input.count(next_entry).times { output << next_entry if next_entry }
  end
  output
end

#	Merge Sort
def merge_sort(arr)
  subarrays = [arr]

  while subarrays.count < arr.count
    subarrays.each_with_index do |v, i|
      break if v.count == 1
      p subarrays
      subarrays[i] = v[0..v.count.div(2) - 1]
      subarrays.insert(i + 1, v.slice!(v.count.div(2)..-1))
    end
  end
  
  while subarrays.count > 1
    subarrays.each_with_index do |v, i|
      break unless subarrays[i + 1]
      p subarrays
      subarrays[i] = merge(v, subarrays.slice!(i + 1))
    end
  end
  
  subarrays.flatten
end

#	Egyptian Fractions
def egyptian(rat)
  index = 0
  output = []
  
  while rat > 0
    index += 1
    next unless rat - Rational(1, index) >= 0
    rat -= Rational(1, index)
    output << index
  end
  
  output
end

def unegyptian(arr)
  arr.map { |i| Rational(1, i) }.inject(&:+)
end