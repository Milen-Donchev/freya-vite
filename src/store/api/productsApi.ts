import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import type { Cart, Order, PaymentMethod, Product, Links, Meta } from '@freya/types';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['ORDERS_HISTORY'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProducts>({
      query: ({ sellableId, sellableType, permission, subscriptionsOnly, virtualProductsOnly }) => {
        const queryParams = permission
          ? `?permission=${permission}`
          : sellableId && sellableType
          ? `?sellable_id=${sellableId}&sellable_type=${sellableType}`
          : subscriptionsOnly
          ? '/subscription'
          : virtualProductsOnly
          ? '/virtual_product'
          : '';

        return {
          url: apiRoute(`/products${queryParams}`)
        };
      },
      transformResponse: (response: any) => response.data
    }),
    // (P.1) - Returns only 1 product to display on InstantCheckoutPage
    // (Future) - Should return entire cart
    getCartProducts: builder.query<CardProductsResponse, {}>({
      query: () => ({
        url: apiRoute('/cart')
      }),
      keepUnusedDataFor: 0.00001
    }),
    getOrdersHistory: builder.query<OrdersHistoryResponse, { page: number }>({
      query: ({ page }) => ({
        url: apiRoute(page && page > 1 ? `/orders?page=${page}` : '/orders')
      }),
      providesTags: ['ORDERS_HISTORY']
    }),
    // (P.1) - Pushes product to instant checkout page (overwrites if there is already a product in BE cart)
    // (Future) - Will add product to cart regularly
    addProductToCart: builder.mutation({
      query: ({ product }: { product: Product }) => ({
        url: apiRoute(`/cart-products/upsert`),
        body: {
          product_id: product.id,
          [product.default_quantifiable.key]: product.default_quantifiable.value
        },
        method: 'POST'
      })
    }),
    submitInstantCheckout: builder.mutation<any, SubmitInstantCheckout>({
      query: ({ address, has_agreed, payment_method_id }) => ({
        url: apiRoute('/instant-checkout'),
        body: {
          address,
          has_agreed,
          payment_method_id
        },
        method: 'POST'
      })
    }),
    getOrderPaymentStatus: builder.query<Order, { token: string }>({
      query: ({ token }) => ({
        url: apiRoute(`/orders/status?token=${token}`)
      })
    }),
    requestOrderRefund: builder.mutation({
      query: ({ order_id }: { order_id: number }) => ({
        url: apiRoute(`/order-refunds`),
        body: {
          order_id
        },
        method: 'POST'
      }),
      invalidatesTags: (_, error) => (error ? [] : ['ORDERS_HISTORY'])
    })
  })
});

export const {
  middleware: productsApiMiddleware,
  useGetProductsQuery,
  useGetCartProductsQuery,
  useGetOrdersHistoryQuery,
  useGetOrderPaymentStatusQuery,
  useAddProductToCartMutation,
  useSubmitInstantCheckoutMutation,
  useRequestOrderRefundMutation
} = productsApi;

export const resetProductsApi = productsApi.util.resetApiState;

type GetProducts = {
  sellableId?: string;
  sellableType?: string;
  permission?: string;
  subscriptionsOnly?: boolean;
  virtualProductsOnly?: boolean;
};

type CardProductsResponse = {
  cart: Cart;
  payment_methods: PaymentMethod[];
};

type SubmitInstantCheckout = {
  address: {
    full_name: string;
    address: string;
    ucn: string;
  };
  payment_method_id: number;
  has_agreed: boolean;
};

type OrdersHistoryResponse = {
  data: Order[];
  links: Links;
  meta: Meta;
};
