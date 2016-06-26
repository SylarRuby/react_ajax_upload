class User < ApplicationRecord

  has_attached_file :avatar, styles: { medium: "200x200>", thumb: "138x138>", small: "100x100>", tiny: "55x55>"  },
                    :storage => :s3,
                    :s3_protocol => 'https',
                    :s3_host_name => 's3-us-west-2.amazonaws.com',
                    :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates_with AttachmentSizeValidator, attributes: :avatar, less_than: 1.megabytes


  def s3_credentials
    {:bucket => ENV['BUCKET_NAME'], :access_key_id => ENV['AMAZON_ACCESS_KEY_ID'], :secret_access_key => ENV['AMAZON_SECRET_ACCESS_KEY']}
  end

  def avatar_url_medium
   avatar.url(:medium)
  end

end
