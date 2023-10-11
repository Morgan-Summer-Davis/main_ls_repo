# From-To-Step Sequence Generator
def step(min, max, step)
  iterator = min

  while iterator <= max
    yield(iterator)
    iterator += step
  end
end

# p step(1, 10, 3) { |value| puts "value = #{value}" }


# Zipper
def zip(arr1, arr2)
  output = []

  arr1.each_index do |index|
    output << [arr1[index], arr2[index]]
  end

  output
end

# p zip([1, 2, 3], [4, 5, 6]) == [[1, 4], [2, 5], [3, 6]]


# map
def map(coll)
  coll.each_with_object([]) { |elem, result| result << yield(elem) }
end

# p map([1, 3, 6]) { |value| value**2 } == [1, 9, 36]
# p map([]) { |value| true } == []
# p map(['a', 'b', 'c', 'd']) { |value| false } == [false, false, false, false]
# p map(['a', 'b', 'c', 'd']) { |value| value.upcase } == ['A', 'B', 'C', 'D']
# p map([1, 3, 4]) { |value| (1..value).to_a } == [[1], [1, 2, 3], [1, 2, 3, 4]]
# p map({ 1 => '1', 2 => '2' }) { |key, value| [value, key] }

# count
def count(*arr)
  iterator = 0

  arr.each do |elem|
    case block_given?
    when true then iterator += 1 if yield(elem)
    when false then iterator += 1 end
  end

  iterator
end

# p count(1, 3, 6) { |value| value.odd? } == 2
# p count(1, 3, 6) { |value| value.even? } == 1
# p count(1, 3, 6) { |value| value > 6 } == 0
# p count(1, 3, 6) { |value| true } == 3
# p count() { |value| true } == 0
# p count(1, 3, 6) { |value| value - 6 } == 3


# drop_while
def drop_while(coll)
  coll.each_with_index { |elem, index| return coll.to_a[index..-1] unless yield(elem) }
  []
end

# p drop_while([1, 3, 5, 6]) { |value| value.odd? } == [6]
# p drop_while([1, 3, 5, 6]) { |value| value.even? } == [1, 3, 5, 6]
# p drop_while([1, 3, 5, 6]) { |value| true } == []
# p drop_while([1, 3, 5, 6]) { |value| false } == [1, 3, 5, 6]
# p drop_while([1, 3, 5, 6]) { |value| value < 5 } == [5, 6]
# p drop_while([]) { |value| true } == []


# each_with_index
def each_with_index(coll)
  index = 0
  coll.each do |elem|
    yield(elem, index)
    index += 1
  end
end

# result = each_with_index([1, 3, 6]) do |value, index|
#   puts "#{index} -> #{value**index}"
# end

# puts result == [1, 3, 6]


# each_with_object
def each_with_object(coll, memo)
  coll.each { |elem| yield(elem, memo) }
  memo
end

# result = each_with_object([1, 3, 5], []) do |value, list|
#   list << value**2
# end
# p result == [1, 9, 25]

# result = each_with_object([1, 3, 5], []) do |value, list|
#   list << (1..value).to_a
# end
# p result == [[1], [1, 2, 3], [1, 2, 3, 4, 5]]

# result = each_with_object([1, 3, 5], {}) do |value, hash|
#   hash[value] = value**2
# end
# p result == { 1 => 1, 3 => 9, 5 => 25 }

# result = each_with_object([], {}) do |value, hash|
#   hash[value] = value * 2
# end
# p result == {}


# max_by
def max_by(coll)
  block_max = nil
  output_index = 0

  coll.each_with_index do |elem, index|
    block_output = yield(elem)
    block_max = block_output if block_max == nil || block_output > block_max
    output_index = index if block_max == block_output
  end

  coll[output_index]
end

# p max_by([1, 5, 3]) { |value| value + 2 } == 5
# p max_by([1, 5, 3]) { |value| 9 - value } == 1
# p max_by([1, 5, 3]) { |value| (96 - value).chr } == 1
# p max_by([[1, 2], [3, 4, 5], [6]]) { |value| value.size } == [3, 4, 5]
# p max_by([-7]) { |value| value * 3 } == -7
# p max_by([]) { |value| value + 5 } == nil


# each_cons (Part 1)
def each_cons(arr)
  arr[0..-2].each_index { |index| yield(arr[index], arr[index + 1]) }
  nil
end

# hash = {}
# result = each_cons([1, 3, 6, 10]) do |value1, value2|
#   hash[value1] = value2
# end
# p result == nil
# p hash == { 1 => 3, 3 => 6, 6 => 10 }

# hash = {}
# result = each_cons([]) do |value1, value2|
#   hash[value1] = value2
# end
# p hash == {}
# p result == nil

# hash = {}
# result = each_cons(['a', 'b']) do |value1, value2|
#   hash[value1] = value2
# end
# p hash == {'a' => 'b'}
# p result == nil


# each_cons (Part 2)
def each_cons(arr, cons_size)
  arr[0..-cons_size].each_index do |index|
    yield(arr[index], *arr[index + 1, cons_size - 1])
  end
  nil
end

# hash = {}
# each_cons([1, 3, 6, 10], 1) do |value|
#   hash[value] = true
# end
# p hash == { 1 => true, 3 => true, 6 => true, 10 => true }

# hash = {}
# each_cons([1, 3, 6, 10], 2) do |value1, value2|
#   hash[value1] = value2
# end
# p hash == { 1 => 3, 3 => 6, 6 => 10 }

# hash = {}
# each_cons([1, 3, 6, 10], 3) do |value1, *values|
#   hash[value1] = values
# end
# p hash == { 1 => [3, 6], 3 => [6, 10] }

# hash = {}
# each_cons([1, 3, 6, 10], 4) do |value1, *values|
#   hash[value1] = values
# end
# p hash == { 1 => [3, 6, 10] }

# hash = {}
# each_cons([1, 3, 6, 10], 5) do |value1, *values|
#   hash[value1] = values
# end
# p hash == {}
