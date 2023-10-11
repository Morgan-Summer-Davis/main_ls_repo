require 'date'

WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
SCHEDULE = ['first', 'second', 'third', 'fourth', 'fifth', 'last', 'teenth']

class Meetup
  def initialize(year, month)
    @year, @month = year, month
  end

  def day(weekday, schedule)
    weekday, schedule = weekday.downcase, schedule.downcase

    case schedule
    when *SCHEDULE[0..4] then nth_weekday(weekday, SCHEDULE.index(schedule))
    when  SCHEDULE[5]    then last_weekday(weekday, SCHEDULE.index(schedule))
    when  SCHEDULE[6]    then teenth_weekday(weekday, SCHEDULE.index(schedule))
    end
  end

  private

  def nth_weekday(weekday, n)
    Date.new(@year, @month, 1).step(Date.new(@year, @month, -1)).select do |day|
      day.send("#{weekday}?")
    end[n]
  end

  def last_weekday(weekday, n)
    Date.new(@year, @month, 1).step(Date.new(@year, @month, -1)).select do |day|
      day.send("#{weekday}?")
    end.last
  end

  def teenth_weekday(weekday, n)
    Date.new(@year, @month, 13).step(Date.new(@year, @month, 19)).select do |day|
      day.send("#{weekday}?")
    end.first
  end
end

meetup = Meetup.new(2013, 3)
puts meetup.day('Monday', 'first')