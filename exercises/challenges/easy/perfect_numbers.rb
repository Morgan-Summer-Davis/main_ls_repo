class NegativeNumberError < StandardError; end

class PerfectNumber
  def self.classify(num)
    if num.class != Integer || num < 1
      raise NegativeNumberError, 'Input must be a positive integer'
    end

    divisor_arr = []
    1.upto(num / 2) { |divisor| divisor_arr << divisor if num % divisor == 0 }

    return 'abundant' if divisor_arr.sum > num
    return 'deficient' if divisor_arr.sum < num
    'perfect'
  end
end