# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch("script.js")
  watch("style.css")
  watch("index.html")
  watch(%r{spec/.*\.(js|html)$})
  watch(%r{(lib|src)/.*\.js$})
end

guard 'coffeescript', :input => 'spec', :source_maps => true
guard 'coffeescript', :input => 'src', :source_maps => true
