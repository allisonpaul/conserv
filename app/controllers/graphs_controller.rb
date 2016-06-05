class GraphsController < ApplicationController

  def line
    html = render_to_string 'line_graph'
    render json: {html: html}
  end

  def bar
    html = render_to_string 'bar_graph'
    render json: {html: html}
  end

  def pie
    html = render_to_string 'pie_graph'
    render json: {html: html}
  end

end
