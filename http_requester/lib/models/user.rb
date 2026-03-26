class User
  attr_accessor :id, :pages

  def initialize(id, pages = [])
    @id = id
    @pages = pages
  end
end