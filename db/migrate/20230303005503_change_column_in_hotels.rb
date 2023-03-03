class ChangeColumnInHotels < ActiveRecord::Migration[7.0]
  def change
    change_table :hotels do |t|
      t.rename :hotel, :name
    end
  end
end
