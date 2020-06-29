require "spec_helper"

describe Gobstones::Board do
  it { expect(File.exist? Gobstones::Board.assets_path_for('htmls/gs-board.html')).to be true }
  it { expect(File.exist? Gobstones::Board.assets_path_for('htmls/vendor/polymer.html')).to be true }
  it { expect(File.exist? Gobstones::Board.assets_path_for('javascripts/vendor/webcomponents.min.js')).to be true }
end
