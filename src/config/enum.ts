/*
 * @Description: 枚举常量
 * @Author: qingyang
 * @Date: 2020-09-14 15:16:29
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 15:21:54
 */
//订单状态
export enum ORDER_STATUS {
    APPLYING,
    SIGNED,
    SUBMITTED,
    SUBMIT_FIALED,
    WAIT_ACTIVATE,
    ACTIVATING,
    ACTIVATED,
    CANCELED,
    HANG_UP,
    REPORT,
    WITHDRAW = 10,
    NOT_PASS,
    ACTIVE_FAILED
}
