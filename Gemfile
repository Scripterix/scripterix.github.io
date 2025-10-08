source "https://rubygems.org"

gem "jekyll", "~> 4.4.1"
gem "logger"

# Jekyll plugins
group :jekyll_plugins do  
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-reading-time", "~> 0.1.0"
  gem "jekyll-paginate-v2"
end

# Windows gems
platforms :windows do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1"
end

# JRuby gems
platforms :jruby do
  gem "http_parser.rb", "~> 0.6.0"
end