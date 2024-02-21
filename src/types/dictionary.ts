export interface Dictionary {
  configurations: { key: string; value: boolean | number | string }[]; // [{key: 'orders_number', value: 50}, ...]
  sellable_permissions: string[]; // ["create_comment", ...]
}
