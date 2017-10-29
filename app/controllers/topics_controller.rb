class TopicsController < ApplicationController

  # GET /topics
  # GET /topics.json
  def index
    target = filter_topic
    page_per = 10
    total_pages  = target[:model].count % page_per != 0 ? (target[:model].count / page_per) + 1 : (target[:model].count / page_per)
    current_page =
      if target[:model].count == 0
        0
      elsif params[:page].to_i <= 0 || params[:page].to_i > total_pages
        1
      else
        params[:page].to_i
      end

    has_prev_page = current_page > 1 ? true: false
    has_next_page = current_page < total_pages ? true: false

    render_for_react(
      props: {
        topics: target[:model].page(current_page).per(page_per),
        filter: target[:filter],
        pager: {
          total_pages: total_pages,
          current_page: current_page,
          has_prev_page: has_prev_page,
          has_next_page: has_next_page,
        },
      },
    )
  end


  # GET /topics/new
  # GET /topics/new.json
  def new
    render_for_react(
      props: {}
    )
  end


  # POST /topics
  # POST /topics.json
  def create
    topic = Topic.new(topic_params)
    if topic.save
      response_data = {
        status: 'success',
        txt: ['質問を投稿しました！'],
      }
    else
      response_data = {
        status: 'error',
        txt: topic.errors.full_messages,
      }
    end
    render json: response_data
  end


  # GET /topics/1
  # GET /topics/1.json
  def show
    topic = Topic.find(params[:id])
    topic.record_timestamps = false
    topic.update( view_count: topic.view_count + 1 )
    render_for_react(
      props: {
        topic: topic.as_json(:include => [:tags, :comments]),
      },
    )
  end


  private

    def filter_topic
      if params[:order] == 'new'
        {
          model: Topic.where('comments_count = ?', '0'),
          filter: 'new',
        }
      elsif params[:tag] && tag = Tag.find_by(:id => params[:tag])
        {
          model: tag.topics,
          filter: 'tag' + params[:tag],
        }
      else
        {
          model: Topic,
          filter: 'default',
        }
      end
    end

    def topic_params
      params.permit(:user, :gender, :title, :content, { :tag_ids => [] })
    end


end
