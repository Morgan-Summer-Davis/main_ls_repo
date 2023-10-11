class Octal
  def initialize(num)
    @num = num
  end

  def to_decimal
    return 0 if @num.match?(/[^0-7]/)
    @num.to_i.digits.map.with_index { |digit, index| digit *= 8**index }.sum
  end
end