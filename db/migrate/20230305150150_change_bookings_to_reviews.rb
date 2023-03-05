class ChangeBookingsToReviews < ActiveRecord::Migration[7.0]
  def change
    rename_table('bookings','reviews')
  end
end
