class ChangeColumnInReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column(:reviews, :datebooked, :datetime)
    add_column(:reviews, :review, :string)
  end
end
