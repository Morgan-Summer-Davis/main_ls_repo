class Series
  def initialize(num_str)
    @num_str = num_str
  end

  def slices(length)
    raise ArgumentError, 'Slices longer than input' if length > @num_str.length
    (0..@num_str.chars.count - length).each_with_object([]) do |index, output|
      output << @num_str.chars[index, length].map(&:to_i)
    end
  end
end