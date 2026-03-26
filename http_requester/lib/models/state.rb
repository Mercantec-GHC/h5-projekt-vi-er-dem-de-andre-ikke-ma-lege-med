class State

  attr_accessor :changes
  attr_reader :logger, :mutex
  
  def initialize(logger)
    @logger = logger
    @changes = []
    @mutex = Mutex.new
  end

  def changes?
    !changes.empty?
  end

  def clean_changes!
    mutex.synchronize do
      changes.clear
    end
  end

  def add_change(change)
    mutex.synchronize do
      changes << change
    end
  end

  end
end