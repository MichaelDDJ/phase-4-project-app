class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :hotel_id
      t.datetime :datebooked

      t.timestamps
    end
  end
end
