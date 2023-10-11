# Practice Problem 1
# [1, 2, 3]
# Select iterates through the array and returns an array of each element for
# which the block returned true. 'hi' evaluates as truthy, so it returns an
# array with each element in it.

# Practice Problem 2
# It returns the number of elements for which the block returns true, in this
# case 2. This can be found in the Ruby docs.

# Practice Problem 3
# []
# Each iteration returns nil (as that is what puts returns), so each iteration
# evaluates as false and all elements are rejected.
#
# This is wrong! This would be Array#select. Array#reject is the inverse.

# Practice Problem 4
# { 'a' => 'ant', 'b' => 'bear', 'c' => 'cat' }
# hash is initialized as the memo and value the value of each iteration; hash is
# then given a key and a value. The key provided is [0] on value, which is a
# string, leading to a series of keys of single character strings. The value
# paired with each key is then assigned to value, the full string.

# Practice Problem 5
# It mutates hash, removing { :a => 'ant' } and returns [:a, 'ant']. This can
# be found in the Ruby docs.

# Practice Problem 6
# 11. Array#pop removes the last item in the array and returns it. String#size
# then returns the character length of the string returned by Array#pop, 11.

# Practice Problem 7
# The block will return true, then false, then true, as it iterates over each
# item and ends the block with num.odd?. any? will return true. The code will
# output 1, then 2, then 3 with newlines between each.
#
# This is wrong!! The doc confused me slightly. It effectively "shoft-circuits"
# (not literally) if any iteration ever evaluates as true. Therefore, it will
# only return true once and only print 1.

# Practice Problem 8
# It returns the first n elements of an array. It is non-destructive. This can
# be found in the Ruby docs.

# Practice Problem 9
# [nil, 'bear']
# Because the expression inside of the if expression does not execute for the
# first value, it returns nil. Enumerable#map always returns an array, so the
# first element in the output array is nil. In the second iteration, the if
# expression evaluates as true, so  the value of value is returned, becoming
# the second element.

# Practice Problem 10
# [1, nil, nil]
# Only the first element goes through the else statement, which returns the
# iterated value. Otherwise, the block returns the return value of the puts
# invokation in the if statement, nil. Array#map then returns the transformed
# array.