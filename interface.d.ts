/**
 *
 *
 * @export
 * @interface IProduct
 */
export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: Rating;
}

export interface ICart extends IProduct {
  quantity: number;
  totalQuantities: number;
  totalPrice: number;
  qty: number;
}

interface Rating {
  rate: string;
  count: number;
}
