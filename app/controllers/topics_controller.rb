class TopicsController < ApplicationController

  def index
    pagePer = 10
    currentPage = params[:page].nil? || params[:page].to_i <= 0 ? 1: params[:page]
    totalPages  = Topic.count % pagePer != 0 ? (Topic.count / pagePer) + 1 : (Topic.count / pagePer)
    hasPrevPage = !(params[:page].to_i - 1 <= 0) ? true: false
    hasNextPage = params[:page].to_i + 1 <= totalPages ? true: false

    render_for_react(
      props: {
        topics: Topic.page(currentPage).per(10),
        currentPage: currentPage,
        totalPages: totalPages,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage
      },
    )
  end

  def new
    render_for_react(
      props: {
        name: "AAAAAAAAAAA"
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
