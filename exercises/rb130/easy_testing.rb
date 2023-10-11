require 'minitest/autorun'

class EasyTesting < Minitest::Test

# Boolean Assertions
  def test_boolean
    value = 1
    assert_equal(true, value.odd?)
  end

# Equality Assertions
  def test_equality
    value = "XYZ"
    assert_equal('xyz', value.downcase)
  end

# Nil Assertions
  def test_nil
    value = nil
    assert_nil(value)
  end

# Empty Object Assertions
  def test_empty_object
    list = []
    assert_empty(list)
  end


# Included Object Assertions
  def test_included_object
    list = ['abc', 'xyz']
    assert_includes(list, 'xyz')
  end

# Exception Assertions
  def test_exception
    # assert_raises(NoExperienceError) { employee.hire }
    # commented out to avoid errors
  end

# Type Assertions
  def test_type
    value = Numeric.new
    assert_instance_of(Numeric, value)
  end

# Kind Assertions
  def test_kind
    value = 3
    assert_kind_of(Numeric, value)
  end

# Same Object Assertions
  def test_same_object
    # assert_same(list, list.process)
    # commented out to avoid errors
  end

# Refutations
  def test_refutations
    list = ['abc', 'def']
    refute_includes(list, 'xyz')
  end

end