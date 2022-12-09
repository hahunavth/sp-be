export interface PriceQuotation {
  id: number;
  supplier_id: number;
  product_id: number;
  subproduct_id: number;
  unit_price: number;
  note: string;
  created_by: string;
  updated_by: string;
}
