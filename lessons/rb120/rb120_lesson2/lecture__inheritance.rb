# Exercise 1
  # class Dog
  #   def speak
  #     'bark!'
  #   end
  
  #   def swim
  #     'swimming!'
  #   end
  # end
  
  # class Bulldog < Dog
  #   def swim
  #     "can't swim!"
  #   end
  # end

# Exercise 2
class Animal
  def speak
    'bark!'
  end

  def run
    'running!'
  end

  def jump
    'jumping!'
  end
end

class Dog < Animal
  def fetch
    'fetching!'
  end
  
  def swim
    'swimming!'
  end
end

class Cat < Animal ; end
  
# Exercise 3
  #      Animal
  #     /      \
  #   Dog      Cat
  #    |
  # Bulldog

# Exercise 4
  # The method lookup path is how Ruby determines where to look for a method when
  # it's called. It's important because its order determines which method is
  # executed when several in a hierarchy share the same name, allowing overriding.