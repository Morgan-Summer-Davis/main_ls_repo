class Robot
  attr_reader :name

  @@robot_names = []

  def initialize
    @name = [('A'..'Z').to_a.sample, ('A'..'Z').to_a.sample,
             ('0'..'9').to_a.sample, ('0'..'9').to_a.sample, ('0'..'9').to_a.sample].join
    initialize if @@robot_names.include? @name
    @@robot_names << @name
  end

  def reset
    initialize
  end
end