class TopicsController < ApplicationController
  include RankingTopics
  impressionist :actions => [:show]

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
        topics: target[:model].includes([:user, :likes]).page(current_page).per(page_per).as_json(:include => :likes),
        filter: target[:filter],
        query: target[:query],
        pager: {
          totalPages: total_pages,
          currentPage: current_page,
          hasPrevPage: has_prev_page,
          hasNextPage: has_next_page,
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
    topic = Topic.includes([:user, :likes, {:comments => [{:replies => [:likes, :user]}, :likes, :user]}]).find(params[:id])
    render_for_react(
      props: {
        topic: topic.as_json(:include => [
          {
            :comments =>
            {
              :include => [
                {
                  :replies =>
                  {
                    :include => :likes
                  }
                },
                :likes
              ]
            }
          },
          :tags,
          :likes
        ]),
      },
    )
  end


  # DELETE /topics/1
  # DELETE /topics/1.json
  def destroy
    topic = Topic.find(params[:id])
    if topic.destroy
      response_data = {
        status: 'success',
        txt: ['質問を削除しました！'],
      }
      render json: response_data, status: :ok
    end
  end


  # GET /topics/ranking_weekly.json
  def ranking_weekly
    ranking_topics = module_ranking_weekly
    render json: ranking_topics, status: :ok
  end


  # GET /topics/ranking_monthly.json
  def ranking_monthly
    ranking_topics = module_ranking_monthly
    render json: ranking_topics, status: :ok
  end


  # GET /topics/ranking_all.json
  def ranking_all
    ranking_topics = module_ranking_all
    render json: ranking_topics, status: :ok
  end


  private

    def filter_topic
      if params[:query].present?
        {
          model: Topic.includes(:comments => :replies).where("topics.title like :keyword or topics.content like :keyword or comments.content like :keyword or replies.content like :keyword", {keyword: "%#{params[:query]}%"}).references(:comments, :replies),
          filter: 'search',
          query: params[:query],
        }
      elsif params[:tag].present? && tag = Tag.find_by(:id => params[:tag])
        {
          model: tag.topics,
          filter: 'tag',
          query: params[:tag],
        }
      elsif params[:order] == 'mine' && !current_user.nil?
        {
          #model: current_user.topics,
          model: Topic.includes(:comments => :replies).where("topics.user_id = :id or comments.user_id = :id or replies.user_id = :id", {id: current_user.id}).references(:comments, :replies),
          filter: 'mine',
        }
      elsif params[:order] == 'new'
        {
          model: Topic.no_comments,
          filter: 'new',
        }
      else
        {
          model: Topic,
          filter: 'default',
        }
      end
    end

    def topic_params
      params.permit(:user_id, :gender, :title, :content, {:tag_ids => []})
    end


end
