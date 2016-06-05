class GraphsController < ApplicationController
  def line
    html = render_to_string 'line_graph'
    render json: {html: html}
  end
end
