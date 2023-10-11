ALPHABET = ('A'..'Z').to_a

class Diamond
  def self.make_diamond(char)
    spaces = ALPHABET.index(char.upcase)
    output = []

    print_corner = Proc.new do |index|
      if output.last == nil || !output.last.include?(ALPHABET[index])
        output << "#{' ' * (spaces - index).abs}"\
                  "#{ALPHABET[index]}"\
                  "#{' ' * ((index * 2) - 1) if index > 0}"\
                  "#{ALPHABET[index] if index > 0}"\
                  "#{' ' * (spaces - index).abs}"
      end
    end

    (0..spaces).each(&print_corner).reverse_each(&print_corner)

    output.join("\n") + "\n"
  end
end