class SumOfMultiples
  def initialize(*nums)
    nums == [] ? (@nums = [3, 5]) : (@nums = nums)
  end

  def to(natural_num)
    1.upto(natural_num - 1).with_object([]) do |i, multiples_arr|
      multiples_arr << i if @nums.any? { |num| i % num == 0 }
    end.sum
  end

  def self.to(natural_num)
    SumOfMultiples.new.to(natural_num)
  end
end