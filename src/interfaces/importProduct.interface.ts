export interface ImportProduct {
  id: number;
  price_quotation_id?: number;
  supplier_id?: number;
  product_id: number;
  subproduct_id: number;
  quantity: number;

  original_cost: number; // tổng tiền chưa tính thuế = quantity * price_quotation.unit_price
  other_cost: number; // tiền khác (ko tính thuế)
  tax: number; // tiền thuế (Mặc định tính 10% original_cost)

  payment_status: string; // trạng thái thanh toán: PAID, UNPAID,NO_PAYMENT_REQUIRE
  payment_term: Date; // thời hạn thanh toán
  payment_date: Date; // ngày thanh toán trong thực tế

  status: string;
  note: string;
  created_by: string;
  updated_by: string;
}
