lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "gobstones/board/version"

Gem::Specification.new do |spec|
  spec.authors       = ["Rodrigo Alfonso"]
  spec.email         = ["info@gobstones.org"]

  spec.summary       = "Gobstones Board"
  spec.homepage      = "https://github.com/gobstones/gs-board"
  spec.license       = "MIT"

  spec.files         = Dir["lib/**/*"] + Dir["app/**/*"] + ["Rakefile", "README.md"]
  spec.test_files    = `git ls-files -- {test,spec}/*`.split("\n")

  spec.name          = "gobstones-board"
  spec.require_paths = ["lib"]
  spec.version       = Gobstones::Board::VERSION

  spec.add_development_dependency "bundler", "~> 1.16.a"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"

  spec.required_ruby_version = '~> 2.3'
end
