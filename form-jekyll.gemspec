# frozen_string_literal: true
# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "form-jekyll"
  spec.version       = "0.6.3"
  spec.authors       = ["Josh Rubenoff"]
  spec.email         = ["joshua.rubenoff@sfgov.org"]
  spec.license       = "MIT"

  spec.summary       = "A prototyping tool for SF.GOV forms."
  spec.homepage      = "https://github.com/sfdigitalservices/form-jekyll"

  spec.required_ruby_version = ">= 2.6.2"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
  spec.add_runtime_dependency "jekyll-typogrify", "~> 0.3"

  spec.add_development_dependency "bundler", "~> 2.0.1"
end