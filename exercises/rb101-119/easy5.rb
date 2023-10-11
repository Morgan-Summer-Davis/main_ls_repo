#	ASCII String Value
def ascii_value(str)
  output = 0
  str.chars.each { |i| output += i.ord }
  output
end

#	After Midnight (Part 1)
MINUTES_PER_HOUR = 60
HOURS_PER_DAY = 24

def time_of_day(int)
  format("%02d:%02d", (int / MINUTES_PER_HOUR) % HOURS_PER_DAY,
                       int % MINUTES_PER_HOUR)
end

SECONDS_PER_MINUTE = 60
WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
            'Saturday']

def further_time_of_day(int)
  time = Time.new(Time.new.year, Time.new.month,
                  Time.new.day, 0) + int * SECONDS_PER_MINUTE
  
  "#{WEEKDAYS[time.wday]} #{format("%02d:%02d", time.hour, time.min)}"
end

#	After Midnight (Part 2)
MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR

def after_midnight(str)
  time_array = str.split(':')
  time_array[0].to_i % HOURS_PER_DAY * MINUTES_PER_HOUR + time_array[1].to_i
end

def before_midnight(str)
  time_array = str.split(':')
  ((MINUTES_PER_DAY - (time_array[0].to_i % HOURS_PER_DAY * MINUTES_PER_HOUR +
    time_array[1].to_i)) % MINUTES_PER_DAY)
end

def further_after_midnight(str)
  hour, minute = str.split(':').map(&:to_i)
  time = Time.new(Time.new.year, Time.new.month, Time.new.day, hour, minute)
  
  time.min + time.hour * MINUTES_PER_HOUR
end

def further_before_midnight(str)
  hour, minute = str.split(':').map(&:to_i)
  time = Time.new(Time.new.year, Time.new.month, Time.new.day - 1, hour, minute)
  midnight = Time.new(Time.new.year, Time.new.month, Time.new.day, 0)

  (midnight - time).to_i / SECONDS_PER_MINUTE
end

#	Letter Swap
def swap(str)
  output = ''
  str.split.each do |i|
    i[0], i[i.length - 1] = i.reverse[0], i.reverse[i.length - 1]
    output = output + i + " "
  end
  output[output.length - 1] = ''
  output
end

#	Clean up the words
def cleanup(str)
  str_with_spaces = str.gsub(/[^a-z]/, ' ')
  output = str_with_spaces.split.join(" ")
  output.insert(0, ' ') if str_with_spaces.start_with?(' ')
  output << ' ' if str_with_spaces.end_with?(' ')
  output
end

#	Letter Counter (Part 1)
def word_sizes(str)
  output = Hash.new
  str.gsub(/[^a-zA-Z ]/, '').split.each do |i|
    output[i.length] = 0 if output[i.length] == nil
    output[i.length] += 1
  end
  output
end

#	Letter Counter (Part 2)
# Incorporated into part 1 (it was just the gsub call).

#	Alphabetical Numbers
ALPHABETIC_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
                      'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
                      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
                      'eighteen', 'nineteen']

def alphabetic_number_sort(arr)
  arr.sort_by { |i| ALPHABETIC_NUMBERS[i] }
end

def further_alphabetic_number_sort(arr)
  output = []
  arr.each { |i| output << ALPHABETIC_NUMBERS[i] }
  output.sort!.each_index { |i| output[i] = ALPHABETIC_NUMBERS.index(output[i]) }
end

#	ddaaiillyy ddoouubbllee
def crunch(str)
  output = str.chars.each.with_index.select do |_, i|
    str.chars[i] != str.chars[i - 1] || i == 0
  end.map(&:first).join
  output
end

#	Spin Me Around In Circles
# It will be the same object, but the value of the object will have been changed,
# due to the destructive nature of reverse!.

# This is incorrect. It would be correct if the method took an array as an
# argument, but since it takes a string and converts it to an array via split,
# it creates a new object.

#	List of Digits
def digit_list(int)
  int.digits.reverse
end