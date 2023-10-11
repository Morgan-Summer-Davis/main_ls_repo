class RomanNumeral
  def initialize(num)
    @num = num
  end

  def to_roman
    num = @num
    output = []

    while num != 0
      num > 0 ? (method = :subtract) : (method = :add)
      location, digit, adjustment = *send(method, num, output.last)

      output.insert(location, digit)
      num += adjustment
    end

    output.join
  end

  private

  def subtract(num, output = nil)
    case num
    when (900..)    then [-1, 'M', -1000]
    when (400..899) then [-1, 'D', -500]
    when (90..399)  then [-1, 'C', -100]
    when (40..89)   then [-1, 'L', -50]
    when (9..39)    then [-1, 'X', -10]
    when (4..8)     then [-1, 'V', -5]
    when (1..3)     then [-1, 'I', -1]
    end
  end

  def add(num = nil, last)
    case last
    when 'M', 'D'   then [-2, 'C', 100]
    when 'C', 'L'   then [-2, 'X', 10]
    else                 [-2, 'I', 1]
    end
  end
end
