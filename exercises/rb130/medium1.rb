# Listening Device
class Device
  def initialize
    @recordings = []
  end

  def record(recording)
    @recordings << recording
  end

  def listen
    record(yield) if block_given?
  end

  def play
    puts @recordings.last
  end
end

# listener = Device.new
# listener.listen { "Hello World!" }
# listener.listen
# listener.play # Outputs "Hello World!"


#	Text Analyzer - Sandwich Code
class TextAnalyzer
  def process
    yield(File.read('text_analyzer_-_sandwich_code.txt'))
  end
end

# analyzer = TextAnalyzer.new
# analyzer.process { |file| puts "#{file.split("\n\n").count} paragraphs" }
# analyzer.process { |file| puts "#{file.split("\n").count} lines"}
# analyzer.process { |file| puts "#{file.split.count} words"}


#	Passing Parameters Part 1
items = ['apples', 'corn', 'cabbage', 'wheat']

def gather(items)
  puts "Let's start gathering food."
  yield(items)
  puts "Nice selection of food we have gathered!"
end

#	Passing Parameters Part 2
def passing_parameters_2(arr)
  yield(arr)
end

passing_parameters_2(%w(raven finch hawk eagle)) do |_, _, *raptors|
  # p raptors
end

#	Passing Parameters Part 3
items = ['apples', 'corn', 'cabbage', 'wheat']

def gather(items)
  puts "Let's start gathering food."
  yield(items)
  puts "We've finished gathering!"
end

# gather(items) do |*veg, wheat|
#   puts veg.join(', ')
#   puts wheat
# end

# gather(items) do |apples, *veg, cabbage|
#   puts apples
#   puts veg.join(', ')
#   puts cabbage
# end

# gather(items) do |apples, *veg|
#   puts apples
#   puts veg.join(', ')
# end

# gather(items) do |apples, corn, cabbage, wheat|
#   puts "#{apples}, #{corn}, #{cabbage}, #{wheat}"
# end


#	Method to Proc
def convert_to_base_8(n)
  n.to_s(8).to_i
end

base8_proc = method(:convert_to_base_8).to_proc
# p [8, 10, 12, 14, 16, 33].map(&base8_proc)


#	Bubble Sort with Blocks
def bubble_sort!(array)
  loop do
    swapped = false
    1.upto(array.size - 1) do |index|
      case block_given?
      when true  then (next if yield(array[index - 1], array[index]))
      when false then (next if array[index - 1] <= array[index]) end

      array[index - 1], array[index] = array[index], array[index - 1]
      swapped = true
    end

    break unless swapped
  end
end

# array = [5, 3]
# bubble_sort!(array)
# p array == [3, 5]

# array = [5, 3, 7]
# bubble_sort!(array) { |first, second| first >= second }
# p array == [7, 5, 3]

# array = [6, 2, 7, 1, 4]
# bubble_sort!(array)
# p array == [1, 2, 4, 6, 7]

# array = [6, 12, 27, 22, 14]
# bubble_sort!(array) { |first, second| (first % 7) <= (second % 7) }
# p array == [14, 22, 12, 6, 27]

# array = %w(sue Pete alice Tyler rachel Kim bonnie)
# bubble_sort!(array)
# p array == %w(Kim Pete Tyler alice bonnie rachel sue)

# array = %w(sue Pete alice Tyler rachel Kim bonnie)
# bubble_sort!(array) { |first, second| first.downcase <= second.downcase }
# p array == %w(alice bonnie Kim Pete rachel sue Tyler)

def bubble_sort!(array)
  loop do
    swapped = false
    1.upto(array.size - 1) do |index|
      case block_given?
      when true  then (next if yield(array[index - 1]) <= yield(array[index]))
      when false then (next if array[index - 1] <= array[index]) end

      array[index - 1], array[index] = array[index], array[index - 1]
      swapped = true
    end

    break unless swapped
  end
end

# array = %w(sue Pete alice Tyler rachel Kim bonnie)
# bubble_sort!(array) { |value| value.downcase }
# p array #== %w(alice bonnie Kim Pete rachel sue Tyler)