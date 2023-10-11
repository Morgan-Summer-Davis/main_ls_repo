class DNA
  def initialize(strand)
    @strand = strand.chars
  end

  def hamming_distance(other_strand)
    distance = 0

    [@strand.count, other_strand.chars.count].min.times do |index|
      distance += 1 if @strand[index] != other_strand[index]
    end

    distance
  end
end