class CreateHotels < ActiveRecord::Migration[7.0]
  def change
    create_table :hotels do |t|
      t.string :hotel
      t.string :address

      t.timestamps
    end
  end
end
