class Triangle
  def initialize(side1, side2, side3)
    @sides = [side1, side2, side3]
    valid_triangle?
  end

  def kind
    case @sides.uniq.count
    when 1 then 'equilateral'
    when 2 then 'isosceles'
    when 3 then 'scalene' end
  end

  private

  def valid_triangle?
    @sides.each do |side|
      raise ArgumentError, 'Each side must be greater than 0' if side <= 0
    end

    if @sides.max >= (@sides.sort[0..-2]).sum
      raise ArgumentError, "The side with value #{@sides.max} is too large"
    end
  end
end