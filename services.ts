// @ts-ignore
import { get, post } from '@/views/Request/ajax'

// 列表接口
export function getList({
  platform,
  status,
  money_type,
  out_address,
  in_address,
  start_at,
  end_at,
  batch,
  passage,
  page,
  page_size,
  isAgent,
}) {
  return get('/central/v1/usdtpay/payPutIn/collectionList', {
    platform,
    status,
    money_type,
    out_address,
    in_address,
    start_at,
    end_at,
    batch,
    passage,
    page,
    page_size,
    isAgent,
  })
}

//导出
export function exportExcel({
  platform,
  status,
  money_type,
  out_address,
  in_address,
  start_at,
  end_at,
  batch,
  passage,
  page,
  page_size,
  isAgent,
}) {
  return get(
    '/central/v1/usdtpay/payPutIn/collectionExcel',
    {
      platform,
      status,
      money_type,
      out_address,
      in_address,
      start_at,
      end_at,
      batch,
      passage,
      page,
      page_size,
      isAgent,
    },
    {
      responseType: 'blob',
    },
  )
}
