# Class and Instance Methods
# https://ruby-doc.org/core-2.6/File.html
# ::path is a class method, while #path is an instance method. The methods don't
# seem to differ otherwise.

#	Optional Arguments Redux
# -4712-01-01
# 2016-01-01
# 2016-05-01
# 2016-05-13

#	Default Arguments in the Middle
# [4, 5, 3, 6]

#	Mandatory Blocks
a = [1, 4, 8, 11, 15, 19]
a.bsearch { |i| i > 8 }

#	Multiple Signatures
# IndexError
# beats me
# 49

#	Keyword Arguments
# 5
# 8

#	Parent Class
s = 'abc'
s.public_methods(false).inspect

#	Included Modules
a = [5, 9, 3, 11]
puts a.min(2)

#	Down the Rabbit Hole
# https://ruby-doc.org/stdlib-2.6.3/libdoc/psych/rdoc/Psych.html#method-c-load_file