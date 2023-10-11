# Internal vs External Iterators
factorials = Enumerator.new do |output|
  num = 0
  loop do
    num == 0 ? output << 1 : output << (1..num).inject(&:*)
    num += 1
  end
end

# 6.times { p factorials.next }
# 6.times { p factorials.next }
# factorials.rewind
# 6.times { p factorials.next }

p '=========== Group 1 ==========='
#	Exploring Procs, Lambdas, and Blocks: Definition and Arity
# Group 1
my_proc = proc { |thing| puts "This is a #{thing}." }
puts my_proc
puts my_proc.class
my_proc.call
my_proc.call('cat')

=begin
Procs have a dedicated class. They accept arguments as block arguments, and have lenient arity, meaning
they will accept any number of arguments. They can also accept fewer arguments than they have parameters.
Any unassigned parameters are assigned nil.
=end


p '=========== Group 2 ==========='
# Group 2
my_lambda = lambda { |thing| puts "This is a #{thing}." }
my_second_lambda = -> (thing) { puts "This is a #{thing}." }
puts my_lambda
puts my_second_lambda
puts my_lambda.class
my_lambda.call('dog')
# my_lambda.call                                                       # Error: expected 1 argument
# my_third_lambda = Lambda.new { |thing| puts "This is a #{thing}." }  # Error: Lambda isn't a class

=begin
Lambdas do not have a dedicated class and are simply a type of Proc object. They can be passed arguments
either as a block parameter or with a dash rocket. Because they have strict arity, a lambda must be
passed the exact correct number of arguments or it will throw an ArgumentError.
=end


p '=========== Group 3 ==========='
# Group 3
def block_method_1(animal)
  yield
end

block_method_1('seal') { |seal| puts "This is a #{seal}."}
# block_method_1('seal')                                              # Error: LocalJumpError--no block given

=begin
Blocks are non-object closures which must be passed to a method to be executed. While any method can accept
a method call as an argument (it will be ignored unless the method is designed to incorproate it), if
the method calls the yield method, a block must be provided or Ruby will throw a LocalJumpError.
=end


p '=========== Group 4 ==========='
# Group 4
def block_method_2(animal)
  yield(animal)
end

block_method_2('turtle') { |turtle| puts "This is a #{turtle}."}
block_method_2('turtle') do |turtle, seal|
  puts "This is a #{turtle} and a #{seal}."
end
# block_method_2('turtle') { puts "This is a #{animal}."}               # Error: No block parameter 'animal'

=begin
Blocks have lenient arity, like procs--they can accept either more or fewer arguments than they have parameters,
and like procs, excess parameters are assigned nil. Both procs and blocks pull their environments with them to
determine the values of variables within their enclosures.
=end