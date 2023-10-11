require 'minitest/autorun'
require "minitest/reporters"
require 'simplecov'
Minitest::Reporters.use!
SimpleCov.start

require_relative '../rb130_lesson1/lesson_1'

class TodoListTest < MiniTest::Test

  def setup
    @todo1 = Todo.new("Buy milk")
    @todo2 = Todo.new("Clean room")
    @todo3 = Todo.new("Go to gym")
    @todos = [@todo1, @todo2, @todo3]

    @list = TodoList.new("Today's Todos")
    @list.add(@todo1)
    @list.add(@todo2)
    @list.add(@todo3)
  end

  # Your tests go here. Remember they must start with "test_"
  def test_to_a
    assert_equal(@todos, @list.to_a)
  end

  def test_size
    assert_equal(3, @list.size)
  end

  def test_first
    assert_equal(@todo1, @list.first)
  end

  def test_last
    assert_equal(@todo3, @list.last)
  end

  def test_shift
    assert_equal(@list.shift, @todo1)
    assert_equal(@todo2, @list.first)
  end

  def test_pop
    assert_equal(@list.pop, @todo3)
    assert_equal(@todo2, @list.last)
  end

  def test_done?
    assert_equal(false, @list.done?)
  end

  def test_error_on_add_non_todo
    assert_raises(TypeError) { @list << 1 }
  end

  def test_shovel_operator
    new_todo_test = Todo.new("This is a test")
    @list  << new_todo_test
    @todos << new_todo_test

    assert_equal(@list.to_a, @todos)
  end

  def test_add
    new_todo_test = Todo.new("This is a test")
    @list.add new_todo_test
    @todos << new_todo_test

    assert_equal(@list.to_a, @todos)
  end

  def test_item_at
    assert_equal(@todo2, @list.item_at(1))
    assert_raises(IndexError) { @list.item_at(4) }
  end

  def test_mark_done_at
    @todo2.undone!
    @list.mark_done_at(1)
    assert_equal(true, @todo2.done?)
    assert_raises(IndexError) { @list.mark_done_at(4) }
  end

  def test_mark_undone_at
    @todo2.done!
    @list.mark_undone_at(1)
    assert_equal(false, @todo2.done?)
    assert_raises(IndexError) { @list.mark_undone_at(4) }
  end

  def test_done!
    @todos.each(&:undone!)
    @list.done!

    assert_equal(true, @todo1.done?)
    assert_equal(true, @todo2.done?)
    assert_equal(true, @todo3.done?)
  end

  def test_remove_at
    @list.remove_at(1)
    refute_equal(@todos, @list)
    assert_raises(IndexError) { @list.remove_at(4) }
  end

  def test_to_s
    output = <<~OUTPUT.chomp
    ---- Today's Todos ----
    [ ] Buy milk
    [ ] Clean room
    [ ] Go to gym
    OUTPUT

    assert_equal(@list.to_s, output)
  end

  def test_to_s_with_one_done
    @todo3.done!
    output = <<~OUTPUT.chomp
    ---- Today's Todos ----
    [ ] Buy milk
    [ ] Clean room
    [X] Go to gym
    OUTPUT

    assert_equal(@list.to_s, output)
  end

  def test_to_s_with_all_done
    @list.done!
    output = <<~OUTPUT.chomp
    ---- Today's Todos ----
    [X] Buy milk
    [X] Clean room
    [X] Go to gym
    OUTPUT

    assert_equal(@list.to_s, output)
  end

  def test_each
    @list.each { |todo| todo.title = 'This is a test' }
    assert_equal('This is a test', @todo1.title)
    assert_equal('This is a test', @todo2.title)
    assert_equal('This is a test', @todo3.title)
  end

  def test_each_return
    assert_equal(@list, @list.each { |todo| todo.title = 'This is a test' })
  end

  def test_select
    new_list_test = TodoList.new(@list.title)
    new_list_test.add(@todo1)

    assert_equal(new_list_test.to_a, @list.select { |todo| todo == @todo1 }.to_a)
    refute_same(@list, @list.select { |todo| todo == @todo1 })
  end

end