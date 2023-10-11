class Clock
  def initialize(hour, minute = 0)
    @hour, @minute = hour, minute
    normalize_time
  end

  def self.at(hour, minute = 0)
    Clock.new(hour, minute)
  end

  def to_s
    "#{format("%02d", @hour)}:#{format("%02d", @minute)}"
  end

  def ==(other)
    to_s == other.to_s
  end

  def +(int)
    Clock.new(@hour, @minute + int)
  end

  def -(int)
    Clock.new(@hour, @minute - int)
  end

  private

  def normalize_time
    @hour, @minute = (@hour + @minute.divmod(60)[0]), @minute.divmod(60)[1] if @minute < 0 || @minute > 59
    @hour %= 24 if @hour < 0 || @hour > 23
  end
end