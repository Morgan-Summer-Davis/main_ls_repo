class Element
  attr_reader :datum

  def initialize(datum, next_elem = nil)
    @datum, @next_elem = datum, next_elem
  end

  def tail?; @next_elem == nil end
  def next;  @next_elem        end
end

class SimpleLinkedList
  def initialize(arr = [])
    @arr = []
    arr.reverse_each { |elem| push(elem) } if arr.is_a? Array
  end

  def self.from_a(arr)
    SimpleLinkedList.new(arr)
  end

  def head;      @arr.first                                   end
  def tail;      @arr.last                                    end
  def peek;      head.datum if head                           end
  def size;      @arr.count                                   end
  def empty?;    @arr.empty?                                  end
  def to_a;      @arr.map(&:datum)                            end
  def push(int); @arr.unshift(Element.new(int, @arr.first))   end
  def pop;       @arr.shift.datum                             end
  def reverse;   SimpleLinkedList.new(self.to_a.reverse)      end
end