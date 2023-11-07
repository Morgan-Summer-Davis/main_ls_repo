# Classes to Test - Cash Register and Transaction

# Setup the Test Class - Cash Register
require 'minitest/autorun'
require_relative 'cash_register'
require_relative 'transaction'

class CashRegisterTest < Minitest::Test
  def setup
    @register = CashRegister.new(100)
    @transaction = Transaction.new(10)
    @transaction.amount_paid = 20
  end

# Test Accept Money Method - Cash Register
  def test_accept_money
    empty_register = @register.total_money
    @register.accept_money(@transaction)

    assert_equal(@register.total_money, empty_register + 20)
  end

# Test Change Method - Cash Register
  def test_change
    assert(@register.change(@transaction), 10)
    assert(@transaction.amount_paid, 10)
  end

# Test Give Receipt Method - Cash Register
  def test_give_receipt
    assert_output("You've paid $10.\n") { @register.give_receipt(@transaction) }
  end

# Test Prompt For Payment Method- Transaction
  def test_prompt_for_payment
    @transaction.prompt_for_payment(input: StringIO.new("30\n"), output: StringIO.new())
    assert_equal(@transaction.amount_paid, 30)
  end
end

# Alter Prompt For Payment Method - Transaction
  # Implemented above

# Swap Letters Sample Text and Starter File
class Text
  def initialize(text)
    @text = text
  end

  def swap(letter_one, letter_two)
    @text.gsub(letter_one, letter_two)
  end

  def word_count
    @text.split.count
  end
end

# Test swap method - Text
class TextTest < Minitest::Test
  def setup
    @file = File.open('sample_text.txt')
    @file_content = @file.read
    @text = Text.new(@file_content)
  end

  def test_swap
    assert_equal(@file_content.count('ae'), @text.swap('a', 'e').count('e'))
  end

  def test_word_count
    assert_equal(72, @text.word_count)
  end

  def teardown
    @file.close
  end
end

# Test word_count method - Text
