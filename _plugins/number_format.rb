module NumberFormat
  def compact_number(input)
    value = input.to_f
    return "0" if value.zero?

    abs_value = value.abs
    formatted = if abs_value >= 1_000_000_000
                  format_with_precision(value / 1_000_000_000, 'B')
                elsif abs_value >= 1_000_000
                  format_with_precision(value / 1_000_000, 'M')
                elsif abs_value >= 1_000
                  format_with_precision(value / 1_000, 'k')
                else
                  value.round.to_s
                end

    formatted
  end

  private

  def format_with_precision(number, suffix)
    rounded = number >= 10 ? number.round : number.round(1)
    format('%<value>s%<suffix>s', value: rounded.to_s.sub(/\.0$/, ''), suffix: suffix)
  end
end

Liquid::Template.register_filter(NumberFormat)
