# Assignment: Build a 'select' method

def select(arr)
  iterator = 0
  output = []

  while iterator < arr.length
    output << arr[iterator] if yield(arr[iterator])
    iterator += 1
  end

  output
end

array = [1, 2, 3, 4, 5]

# select(array) { |num| num.odd? }      # => [1, 3, 5]
# select(array) { |num| puts num }      # => [], because "puts num" returns nil and evaluates to false
# select(array) { |num| num + 1 }       # => [1, 2, 3, 4, 5], because "num + 1" evaluates to true


# Assignment: Build a 'reduce' method
# NOTE: This improvement doesn't work if init is supposed to be nil

def reduce(init_arr, init = nil)
  arr = init_arr.clone
  init = arr.shift if init == nil
  output = init
  iterator = 0

  while iterator < arr.length
    output = yield(output, arr[iterator])
    iterator += 1
  end

  output
end

array = [1, 2, 3, 4, 5]

# reduce(array) { |acc, num| acc + num }                    # => 15
# reduce(array, 10) { |acc, num| acc + num }                # => 25
# reduce(['a', 'b', 'c']) { |acc, value| acc += value }     # => 'abc'
# reduce([[1, 2], ['a', 'b']]) { |acc, value| acc + value } # => [1, 2, 'a', 'b']
# reduce(array) { |acc, num| acc + num if num.odd? }          # => NoMethodError: undefined method `+' for nil:NilClass


# Assignment: TodoList

# This class represents a todo item and its associated
# data: name and description. There's also a "done"
# flag to show whether this todo item is done.

class Todo
  DONE_MARKER = 'X'
  UNDONE_MARKER = ' '

  attr_accessor :title, :description, :done

  def initialize(title, description='')
    @title = title
    @description = description
    @done = false
  end

  def done!
    self.done = true
  end

  def done?
    done
  end

  def undone!
    self.done = false
  end

  def to_s
    "[#{done? ? DONE_MARKER : UNDONE_MARKER}] #{title}"
  end

  def ==(otherTodo)
    title == otherTodo.title &&
      description == otherTodo.description &&
      done == otherTodo.done
  end
end

# This class represents a collection of Todo objects.
# You can perform typical collection-oriented actions
# on a TodoList object, including iteration and selection.

class TodoList
  attr_accessor :title

  def initialize(title)
    @title = title
    @todos = []
  end

  def to_s
    "---- #{@title} ----\n"\
    "#{@todos.map { |todo| "#{todo.to_s}"}.join("\n") }"

  end

  def add(todo)
    raise TypeError, "Can only add Todo objects" unless todo.is_a? Todo
    @todos << todo
  end

  alias_method :<<, :add

  def done?; @todos.all? { |todo| todo.done? } end
  def done!; @todos.each { |todo| todo.done! } end

  def mark_done_at(i);   @todos.fetch(i).done!   end
  def mark_undone_at(i); @todos.fetch(i).undone! end
  def item_at(i);        @todos.fetch(i)         end

  def shift;        @todos.shift        end
  def pop;          @todos.pop          end
  def remove_at(i)
    @todos.fetch(i)
    @todos.delete_at(i)
  end

  def size;       @todos.count end
  def first;      @todos.first end
  def last;       @todos.last  end
  def to_a;       @todos.to_a  end

  def each
    @todos.each do |todo|
      yield(todo)
    end
    self
  end

  def select
    output = TodoList.new(title)
    each { |todo| output << todo if yield(todo) }
    output
  end

  def find_by_title(string)
    each { |todo| return todo if todo.title == string }
    nil
  end

  def all_done
    select { |todo| todo.done? }
  end

  def all_not_done
    select { |todo| !todo.done? }
  end

  def mark_done(string)
    find_by_title(string).done!
  end

  def mark_all_done
    each { |todo| todo.done! }
  end

  def mark_all_undone
    each { |todo| todo.undone! }
  end

end


# given
# todo1 = Todo.new("Buy milk")
# todo2 = Todo.new("Clean room")
# todo3 = Todo.new("Go to gym")
# list = TodoList.new("Today's Todos")

# following instructions removed for brevity


# Assignment: TodoList#each

# todo1 = Todo.new("Buy milk")
# todo2 = Todo.new("Clean room")
# todo3 = Todo.new("Go to gym")

# list = TodoList.new("Today's Todos")
# list.add(todo1)
# list.add(todo2)
# list.add(todo3)

# list.each do |todo|
#   puts todo                   # calls Todo#to_s
# end


# Assignment: ToDoList#Select

todo1 = Todo.new("Buy milk")
todo2 = Todo.new("Clean room")
todo3 = Todo.new("Go to gym")

list = TodoList.new("Today's Todos")
list.add(todo1)
list.add(todo2)
list.add(todo3)

todo1.done!

results = list.select { |todo| todo.done? }    # you need to implement this method