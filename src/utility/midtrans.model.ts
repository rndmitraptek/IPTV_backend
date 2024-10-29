export interface response_midtrans{
    status_code:number;
    token?: string;
    redirect_url?: string;
    error_messages?: string[];
}

  export interface request_midtrans {
    hotelId:number;
    transaction_details: TransactionDetails
    item_details?: ItemDetail[]
    customer_details?: CustomerDetails
    enabled_payments?: string[]
    payment_type?:string
    credit_card?: CreditCard
    bca_va?: BcaVa
    bni_va?: BniVa
    bri_va?: BriVa
    cimb_va?: CimbVa
    qris?:qris
    permata_va?: PermataVa
    shopeepay?: Shopeepay
    gopay?: Gopay
    callbacks?: Callbacks
    uob_ezpay?: UobEzpay
    expiry?: Expiry
    page_expiry?: PageExpiry
    recurring?: Recurring
  }
  
  export interface TransactionDetails {
    order_id: string
    gross_amount: number
  }
  
  export interface ItemDetail {
    id: string
    price: number
    quantity: number
    name: string
    brand: string
    category: string
    merchant_name: string
    url: string
  }
  
  export interface qris{
    acquirer:string;
  }

  export interface CustomerDetails {
    first_name: string
    last_name: string
    email: string
    phone: string
    billing_address: BillingAddress
    shipping_address: ShippingAddress
  }
  
  export interface BillingAddress {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    postal_code: string
    country_code: string
  }
  
  export interface ShippingAddress {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    postal_code: string
    country_code: string
  }
  
  export interface CreditCard {
    secure: boolean
    channel: string
    bank: string
    installment: Installment
    whitelist_bins: string[]
    dynamic_descriptor: DynamicDescriptor
  }
  
  export interface Installment {
    required: boolean
    terms: Terms
  }
  
  export interface Terms {
    bni: number[]
    mandiri: number[]
    cimb: number[]
    bca: number[]
    offline: number[]
  }
  
  export interface DynamicDescriptor {
    merchant_name: string
    city_name: string
    country_code: string
  }
  
  export interface BcaVa {
    va_number: string
    sub_company_code: string
    free_text: FreeText
  }
  
  export interface FreeText {
    inquiry: Inquiry[]
    payment: Payment[]
  }
  
  export interface Inquiry {
    en: string
    id: string
  }
  
  export interface Payment {
    en: string
    id: string
  }
  
  export interface BniVa {
    va_number: string
  }
  
  export interface BriVa {
    va_number: string
  }
  
  export interface CimbVa {
    va_number: string
  }
  
  export interface PermataVa {
    va_number: string
    recipient_name: string
  }
  
  export interface Shopeepay {
    callback_url: string
  }
  
  export interface Gopay {
    enable_callback: boolean
    callback_url: string
  }
  
  export interface Callbacks {
    finish: string
  }
  
  export interface UobEzpay {
    callback_url: string
  }
  
  export interface Expiry {
    start_time: string
    unit: string
    duration: number
  }
  
  export interface PageExpiry {
    duration: number
    unit: string
  }
  
  export interface Recurring {
    required: boolean
    start_time: string
    interval_unit: string
  }