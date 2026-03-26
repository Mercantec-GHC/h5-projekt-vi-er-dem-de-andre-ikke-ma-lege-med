class Page
  attr_accessor  :path, :interval_time, :id

  def initialize(id, path, interval_time)
    @id = id
    @path = path
    @interval_time = interval_time
  end
end