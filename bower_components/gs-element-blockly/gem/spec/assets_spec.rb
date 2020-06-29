require "spec_helper"

describe Gobstones::Blockly do
  it { expect(File.exist? Gobstones::Blockly.assets_path_for('htmls/gs-element-blockly.html')).to be true }
  it { expect(File.exist? Gobstones::Blockly.assets_path_for('htmls/vendor/polymer.html')).to be true }
  it { expect(File.exist? Gobstones::Blockly.assets_path_for('javascripts/vendor/webcomponents.min.js')).to be true }
end
