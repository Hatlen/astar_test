# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch("script.js")
  watch("style.css")
  watch("index.html")
  watch(%r{spec/.*\.(js|html)$})
  watch(%r{lib/.*\.js$})
end

guard 'coffeescript', :input => 'spec'
