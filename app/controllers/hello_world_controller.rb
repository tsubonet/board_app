# frozen_string_literal: true

class HelloWorldController < ApplicationController

  def index
    render_for_react(
      props: {
        name: "Strangersssssssss"
      },
    )
  end

  def show
    render_for_react(
      props: {
        name: "AAAAAAAAAAA"
      },
    )
  end
end
