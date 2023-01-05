export interface ImportProduct {
  id: number;
  price_quotation_id?: number;
  supplier_id?: number;
  product_id: number;
  subproduct_id: number;
  quantity: number;
  total_cost: number;
  status: string;
  note: string;
  created_by: string;
  updated_by: string;
}
