/**
 * 校验密码
 * @param  {string} val
 * @returns boolean
 */
export const checkPsw = (val: string): boolean => /^[a-zA-Z0-9]{6,21}$/.test(val)

/**
 * 校验 手机号
 * @param  {string} val
 * @returns boolean
 */
export const checkPhone = (val: string): boolean => /^1[0-9]{10}$/.test(val)

/**
 * 0-100正数含小数
 * @param  {string} val
 * @returns boolean
 */
export const checkMax100 = (val: string): boolean => /^100$|^(\d|[1-9]\d)(\.\d+)*$/.test(val)

/**
 * 0-100正数整数
 * @param  {string} val
 * @returns boolean
 */
export const checkMax100Int = (val: string): boolean => /^100$|^(\d|[1-9]\d)$/.test(val)

/**
 * 大于0且最多保留两位小数
 * @param  {string} val
 * @returns boolean
 */
export const numFix2 = (val: string): boolean => /^([1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2})$/.test(val)

/**
 * 非负整数
 * @param  {string} val
 * @returns boolean
 */
export const integers = (val: string): boolean => /^[0-9]\d*$/.test(val)


export const regs = {
  phone: /^1[0-9]{10}$/,
  /**
   * 非负整数
   */
  integers: /^[0-9]\d*$/,
}

/**
 * @param pattern 正则
 * @param message 错误文案
 * @param trigger 触发方式
 */
export const validatorFunc = (pattern, message = '输入有误', trigger = 'onChange') => (
  {
    pattern,
    message,
  }
)
