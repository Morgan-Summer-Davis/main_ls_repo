class CustomSet
  def initialize(arr = [])
    @arr = arr.uniq
  end

  def empty?;            @arr.empty?                              end
  def contains?(elem);   @arr.include? elem                       end
  def subset?(set);      @arr.all? { |elem| set.contains? elem }  end
  def disjoint?(set);    @arr.none? { |elem| set.contains? elem } end
  def ==(other);         @arr.sort == other.arr.sort              end
  def add(elem);        (@arr << elem).uniq!; self                end

  def intersection(set); CustomSet.new(@arr.select { |elem| set.contains? elem })  end
  def difference(set);   CustomSet.new(@arr.select { |elem| !set.contains? elem }) end
  def union(set);        CustomSet.new(@arr + set.arr)                             end

  alias_method :eql?, :==

  protected

  attr_reader :arr
end