class TopicsController < ApplicationController

  # GET /topics
  # GET /topics.json
  def index
    page_per = 10
    current_page  = params[:page].nil? || params[:page].to_i <= 0 ? 1: params[:page]
    total_pages   = Topic.count % page_per != 0 ? (Topic.count / page_per) + 1 : (Topic.count / page_per)
    has_prev_page = !(params[:page].to_i - 1 <= 0) ? true: false
    has_next_page = params[:page].to_i + 1 <= total_pages ? true: false

    render_for_react(
      props: {
        topics: Topic.page(current_page).per(page_per),
        current_page: current_page,
        total_pages: total_pages,
        has_prev_page: has_prev_page,
        has_next_page: has_next_page
      },
    )
  end


  # GET /topics/new
  # GET /topics/new.json
  def new
    render_for_react(
      props: {
        tags: Tag.all
      },
    )
  end


  # POST /topics
  # POST /topics.json
  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      response_data = {
        status: 'success',
        txt: ['質問を投稿しました！']
      }
    else
      response_data = {
        status: 'error',
        txt: @topic.errors.full_messages
      }
    end
    render json: response_data
  end


  # GET /topics/1
  # GET /topics/1.json
  def show
    topic = Topic.find(params[:id])
    render_for_react(
      props: {
        topic: topic.as_json(:include => [:tags, :comments]),
      },
    )
  end


  private

    def topic_params
      params.permit(:gender, :title, :content, { :tag_ids => [] })
    end


end
