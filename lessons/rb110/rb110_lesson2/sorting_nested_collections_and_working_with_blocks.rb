# Practice Problem 1
arr = ['10', '11', '9', '7', '8']
arr.sort { |x, y| y.to_i <=> x.to_i }

# Practice Problem 2
books = [
  {title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967'},
  {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925'},
  {title: 'War and Peace', author: 'Leo Tolstoy', published: '1869'},
  {title: 'Ulysses', author: 'James Joyce', published: '1922'}
]

books.sort_by { |hash| hash[:published].to_i }

# Practice Problem 3
arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]]
arr2 = [{first: ['a', 'b', 'c'], second: ['d', 'e', 'f']}, {third: ['g', 'h', 'i']}]
arr3 = [['abc'], ['def'], {third: ['ghi']}]
hsh1 = {'a' => ['d', 'e'], 'b' => ['f', 'g'], 'c' => ['h', 'i']}
hsh2 = {first: {'d' => 3}, second: {'e' => 2, 'f' => 1}, third: {'g' => 0}}

arr1[2][1][3]
arr2[1][:third][0]
arr3[2][:third][0][0]
hsh1['b'][1]
hsh2[:third].keys[0]

# Practice Problem 4
arr1 = [1, [2, 3], 4]
arr2 = [{a: 1}, {b: 2, c: [7, 6, 5], d: 4}, 3]
hsh1 = {first: [1, 2, [3]]}
hsh2 = {['a'] => {a: ['1', :two, 3], b: 4}, 'b' => 5}

arr1[1][1] = 4
arr2[2] = 4 # or arr2.last = 4
hsh1[:first][2][0] = 4
hsh2[['a']][:a][2] = 4

# Practice Problem 5
munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}

munsters.select { |_, person| person['gender'] == 'male' }
                .map { |_, person| person["age"] }.sum

# Practice Problem 6
munsters.each do |key, value|
  puts "#{key} is a #{value["age"]}-year-old #{value["gender"]}."
end

# Practice Problem 7
# a == 2
# b == [3, 8]

# Practice Problem 8
hsh = {first: ['the', 'quick'], second: ['brown', 'fox'], third: ['jumped'],
       fourth: ['over', 'the', 'lazy', 'dog']}

hsh.each do |_, arr|
  arr.each do |str|
    str.chars.each { |char| puts char if char.delete("^aeiouAEIOU") != '' }
  end
end

# Practice Problem 9
arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']]

arr.map { |elem| elem.sort.reverse }

# Practice Problem 10
[{a: 1}, {b: 2, c: 3}, {d: 4, e: 5, f: 6}].map do |hash|
  hash.map do |arr|
    arr.map do |elem|
      if elem.to_s.to_i.to_s == elem.to_s
        elem + 1
      else
        elem
      end
    end
  end.to_h
end

# Practice Problem 11
arr = [[2], [3, 5, 7, 12], [9], [11, 13, 15]]

p arr.map { |subarr| subarr.select { |int| int % 3 == 0 } }

# Practice Problem 12
arr = [[:a, 1], ['b', 'two'], ['sea', {c: 3}], [{a: 1, b: 2, c: 3, d: 4}, 'D']]

hash = Hash.new
arr.each { |subarray| hash[subarray[0]] = subarray[1] }

# Practice Problem 13
arr = [[1, 6, 9], [6, 1, 7], [1, 8, 3], [1, 5, 9]]

arr.sort do |subarray1, subarray2|
  subarray1.select { |int| int.odd? } <=> subarray2.select { |int| int.odd? }
end

# Practice Problem 14
hsh = {
  'grape' => {type: 'fruit', colors: ['red', 'green'], size: 'small'},
  'carrot' => {type: 'vegetable', colors: ['orange'], size: 'medium'},
  'apple' => {type: 'fruit', colors: ['red', 'green'], size: 'medium'},
  'apricot' => {type: 'fruit', colors: ['orange'], size: 'medium'},
  'marrow' => {type: 'vegetable', colors: ['green'], size: 'large'},
}

hsh.values.map do |hash|
  case hash[:type]
  when 'fruit' then hash[:colors].map { |color| color.capitalize }
  when 'vegetable' then hash[:size].upcase
  end
end

# Practice Problem 15
arr = [{a: [1, 2, 3]}, {b: [2, 4, 6], c: [3, 6], d: [4]}, {e: [8], f: [6, 10]}]

arr.select do |hash| 
  hash.all? do |_, value|
    value.all? { |int| int.even? }
  end
end

# Practice Problem 16
output = ''

36.times do |digit|
  output << rand(16).to_s(16)
  output[-1] = '-' if digit == 8 || digit == 13 || digit == 18 || digit == 23
end