require "gobstones/board/version"

module Gobstones
  module Board
    class Engine < ::Rails::Engine
    end if defined? ::Rails::Engine

    ASSETS_PATH=File.join(__dir__, '..', '..', 'app', 'assets')

    def self.assets_path_for(asset)
      File.join ASSETS_PATH, asset
    end
  end
end
