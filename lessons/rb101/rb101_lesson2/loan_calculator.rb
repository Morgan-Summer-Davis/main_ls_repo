require "pry"

def verify_input(input)
  return true if input.to_f.to_s == input
  return true if input.to_i.to_s == input
end

puts ">> Welcome to the Mortage Calculator! "

loan = ''
interest = ''
duration = ''

loop do
  loop do
    puts ">> Please input the total loan amount."
    loan = gets.chomp.delete_prefix("$")
    
    if !verify_input(loan)
      puts ">> That doesn't look like a valid input. Please enter the amount numerically."
      next
    end
    loan = loan.to_f
    break
  end
  
  loop do
    puts ">> Now please input the Annual Percentage Rate (APR)."
    interest = gets.chomp
    if !verify_input(interest)
      puts ">> That doesn't look like a valid input. Please enter the APR numerically."
      next
    end
    interest = (interest.to_f / 12) * 0.01
    break
  end
  
  loop do
    puts ">> And finally input the duration of the loan in years."
    duration = gets.chomp
    if !verify_input(duration)
      puts ">> That doesn't look like a valid input. Please enter the loan length numerically."
      next
    end
    duration = duration.to_i * 12
    break
  end
  
  puts ">> Calculating..."
  payment = (loan * (interest / (1 - (1 + interest)**(-duration)))).round(2)
  puts ">> Your monthly payment is $#{payment}."
  puts ">> Your loan will last #{duration} months."
  puts ">> Each month, you'll pay #{interest} interest."
  break
end