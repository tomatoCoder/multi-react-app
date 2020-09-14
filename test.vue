<!--
 * @Description: 绑定银行卡
 * @Author: qingyang
 * @Date: 2020-05-27 19:14:03
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 10:47:26
--> 
<template>
  <view class="container bank-container">
    <view class="main-container">
      <view class="upload_view">
        <view class="wallet_link" v-if="bankId == 'SECOND_ACCOUNT'" @click="introduceClick">什么是工银e钱包>></view>
        <p class="title">{{bankId == 'SECOND_ACCOUNT' ? '开通工银e钱包' : '绑定银行卡'}}</p>
        <p class="des">{{ bankId == 'SECOND_ACCOUNT' ? '绑定银行储蓄卡，开通ETC通行费专属钱包' : '需绑定个人银行卡，授权该卡为ETC通行费扣款卡'}}</p>
        <view class="card_wrap">
          <view class="card_tag">持卡人</view>
          <view class="card_des">
            <p>{{cardInfo.name}}</p>
            <p>{{cardInfo.idcardNo}}</p>
          </view>
        </view>
        <p class="info_title">信息填写</p>
      </view>
      <view>
        <etc-input-cell name="开卡银行" type="select" :arrow="bankId == 'SECOND_ACCOUNT'"  @show-picker="showPickerClick">
          <view slot="pick" class="bank_con">
            <span slot="pick" v-if="!selectBank" class="placehold">请选择开卡银行</span>
            <template v-else>
              <image class="image" v-if="selectBank.iconUrl" :src="selectBank.iconUrl" />
              <span>{{selectBank.name}}</span>
            </template>
          </view>
        </etc-input-cell>
        <etc-input-cell name="卡片类型">
          <view class="span_container" slot="center">
            <button
              :class="{'span--select': selectType == BANK_CARD_TYPE.SAVE}"
              @click="selectBankType(BANK_CARD_TYPE.SAVE,saveDisable)"
            >储蓄卡</button>
            <button
              :class="{'span--select': selectType == BANK_CARD_TYPE.CREDIT}"
              @click="selectBankType(BANK_CARD_TYPE.CREDIT,creditDisable)"
            >信用卡</button>
          </view>
        </etc-input-cell>
        <etc-input-cell name="银行卡号" placeholder="请输入您的银行卡号" type="number" v-model="bankAccountNo" maxlength="19">
          <view slot="right" class="cell__right cell__right--icon" @click="handleClickCameraIcon">
            <image src="~@/static/images/icon_camera.png" />
          </view>
        </etc-input-cell>
        <template v-if="selectType == BANK_CARD_TYPE.CREDIT">
          <etc-input-cell
            name="CVV"
            placeholder="请填写卡片背面签名栏后三位数字"
            v-model="cvv"
            maxlength="3"
            type="number"
          ></etc-input-cell>
          <etc-input-cell name="有效期">
            <view slot="center" class="input_cont">
              <etc-message-input v-model="period"></etc-message-input>
              <!-- <input placeholder="MM" maxlength="2" type="number"  v-model="periodMonth" :focus="focusMM" @focus="focusFlag = true" @blur="focusFlag = false"/>
              <i>/</i>
              <input placeholder="YY" maxlength="2" type="number" v-model="periodYear" :focus="focusYY" @input="changeYY"/> -->
            </view>
          </etc-input-cell>
        </template>
      </view>
      <view>
        <etc-input-cell
          name="预留手机号"
          placeholder="请填写预留手机号码"
          v-model="phone"
          maxlength="11"
          type="number"
        ></etc-input-cell>
        <etc-input-cell
          name="验证码"
          placeholder="请填写验证码"
          v-model="verfiyCode"
          maxlength="6"
          type="number"
          v-if="hasSMSSend"
        >
          <span slot="right" class="cell__right" v-if="verfiyCodeCount">已发送{{ verfiyCodeCount }}s</span>
          <span slot="right" @click="getCode" class="cell__right" v-else>发送验证码</span>
        </etc-input-cell>
        <view class="check_container" @click.prevent="checked = !checked">
          <u-checkbox-group>
            <u-checkbox :value="checked" active-color="#09BB07" icon-size="20">我已阅读并同意
              <span class="check_span" @click.stop="showProtocol = true">《ETC服务协议》</span>
            </u-checkbox>
          </u-checkbox-group>
        </view>
      </view>
    </view>
    <view class="buttons__wrap">
        <button class="button" :disabled="disable" @click="commit">{{bankId == 'SECOND_ACCOUNT' ? '立即开通' : '立即绑定'}}</button>
    </view>
    <etc-loading v-model="uploadLoading" :text="uploadText"></etc-loading>
    <etc-popup title="ETC服务协议" v-model="showProtocol">
        <rich-text :nodes="zhengwen"></rich-text>
    </etc-popup>
    <etc-popup title="工银e钱包" v-model="showWalletText">
        <rich-text :nodes="walletText"></rich-text>
    </etc-popup>
    <etc-action-sheet
        title="请选择开卡银行"
        subTitle="（仅支持储蓄卡）"
        :list="bankList"
        v-model="showPicker"
        cancel-btn
        safe-area-inset-bottom
        @click="actionSelect"
    ></etc-action-sheet>
    <etc-dialog direction='row' desColor="#32363C" ref="pop2"  :des="des" confirmText="是" cancelText="否" @confirm="goDetail"></etc-dialog>
  </view>
</template>
<script>
import { uploadFile } from '@/utils/file-upload.js';
import { BANK_CARD_TYPE } from '@/common/enum.js';
import { jianhangProtocol, gonghangProtocol, walletText } from '@/common/protocol.js';
export default {
    data() {
        return {
            des: '',
            sigedStatus: '',
            timer: null, // 定时器
            queryCount: 0, // 查询是否开户次数
            hasSMSSend: false,
            bankId: '',
            phone: '',
            checked: null,
            showPicker: false,
            showAccountPicker: false,
            selectType: BANK_CARD_TYPE.SAVE,
            verfiyCodeCount: 0,
            verfiyCodeTimer: null,
            verfiyCode: '',
            showProtocol: false,
            bankList: [],
            selectBank: null,
            bankAccountNo: '',
            cvv: '',
            period: '',
            periodMonth: '',
            periodYear: '',
            orderNo: '', // 订单编号
            cardInfo: {},
            BANK_CARD_TYPE,
            supportTypes: [], // 银行卡支持的类型
            uploadLoading: false,
            uploadText: '照片上传中',
            bankcardImgPath: '', // 银行卡路径名称
            focusFlag: false,
            zhengwen: '',
            showWalletText: false,
            walletText: walletText
        };
    },
    components: {},
    onLoad(option) {
        this.$buriedPoint('bankcard', 'bankcard_enter', '1');
        this.orderNo = option.orderNo;
        this.bankId = option.bankId;
        if (option.bankId === 'SECOND_ACCOUNT') {
            this._getBankList();
        } else {
            const bank = JSON.parse(option.bank);
            this.selectBank = bank;
            this.actionSelect(0, bank);
        }
        this._getIDCardInfo(); 
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    computed: {
        focusYY() {
            return this.periodMonth.length === 2;
        },
        focusMM() {
            return (this.periodMonth && !this.periodYear.length) || this.focusFlag;
        },
        creditDisable() {
            return !this.supportTypes.includes(1);
        },
        saveDisable() {
            return !this.supportTypes.includes(2);
        },
        disable() {
            if (this.selectType === BANK_CARD_TYPE.CREDIT) {
                return (
                    !this.selectBank ||
            !this.bankAccountNo ||
            !this.cvv ||
            this.period.length < 4 ||
            !this.phone ||
            !this.checked || (this.hasSMSSend && !this.verfiyCode)
                );
            }
            return (
                !this.selectBank ||
            !this.bankAccountNo ||
            !this.phone ||
            !this.checked || (this.hasSMSSend && !this.verfiyCode)
            );
        }
    },
    methods: {
        showPickerClick() {
            if (this.bankId !== 'SECOND_ACCOUNT') {
                return;
            }
            this.showPicker = true;   
        },
        selectBankType(type, disbaled) {
            if (disbaled) {
                this.$u.toast('工银e钱包不支持绑定信用卡');
                return;
            }
            this.selectType = type;
        },
        changeYY(e) {
            this.focusFlag = false;
            if (!e.detail.value) {
                this.focusFlag = true;
            }
        },
        _loadVerfiyCount() {
            const after = Date.parse(new Date()) / 1000;
            const before = uni.getStorageSync('bank_verfiy_time') / 1000;
            const during = uni.getStorageSync('bank_verfiy_during');
            if (after - before < during) {
                this.verfiyCodeCount = during - (after - before);
                this.verfiyCodeTimer = setInterval(() => {
                    if (this.verfiyCodeCount > 0) {
                        this.verfiyCodeCount--;
                    } else {
                        this.verfiyCodeCount = null;
                        clearInterval(this.verfiyCodeTimer);
                    }
                }, 1000);
            }
        },
        _getIDCardInfo() {
            this.$api.getIDCardInfo(this.orderNo).then(res => {
                this.cardInfo = res;
                this.phone = res.mobile;
                if (this.selectBank && this.selectBank.bankId === 'CCB') {
                    this.zhengwen = jianhangProtocol(res.name);
                } else {
                    this.zhengwen = gonghangProtocol(res.name);
                }
            });
        },
        _getBankList() {
            this.$api.getBankList('SDGS_OPEN').then(res => {
                this.bankList = res;
            });
        },
        getCode() {
            if (this.bankId === 'SECOND_ACCOUNT' && !this.selectBank) {
                this.$u.toast('请先选择您的发卡银行');
                return;
            }
            if (!this.bankAccountNo) {
                this.$u.toast('请先输入您的银行卡号');
                return;
            }
            if (this.bankAccountNo.length < 16 || this.bankAccountNo.length > 19) {
                this.$u.toast('银行卡号格式错误');
                return; 
            }
            if (!this.phone) {
                this.$u.toast('请先输入手机号');
                return;
            }
            if (this.$u.test.mobile(this.phone)) {
                const params = {
                    orderNo: this.orderNo,
                    mobile: this.phone,
                    bankId: this.bankId,
                    bankAccountNo: this.bankAccountNo,
                    name: this.cardInfo.name,
                    idcardNo: this.cardInfo.idcardNo,
                    bankcardType: this.selectType,
                    bankcardImgPath: this.bankcardImgPath,
                    bankShorthand: this.selectBank.shorthand,
                    bankName: this.selectBank.name,
                    isOpenAccount: this.bankId === 'SECOND_ACCOUNT' ? 1 : 0
                };
                if (this.selectType === BANK_CARD_TYPE.CREDIT) {
                    if (!this.cvv) {
                        this.$u.toast('请先输入CVV');
                        return;
                    }
                    if (!this.period) {
                        this.$u.toast('请先输入有效期');
                        return;
                    }
                    params.cvv = this.cvv;
                    // TIP 传参格式YYMM
                    params.expired = this.period.substring(2, 4) + this.period.substring(0, 2);
                }
                uni.showLoading({
                    mask: true
                });
                this.$api.bankSmsSendV2(params).then(res => {
                    uni.hideLoading();
                    // 判断是否已签约过 
                    if (res.status === 1) {
                        this.$u.toast('验证码已发送');
                        uni.setStorageSync('bank_verfiy_time', Date.parse(new Date()));
                        console.log(res.delayTime);
                        console.log(res);
                        uni.setStorageSync('bank_verfiy_during', res.delayTime || 60);
                        this.verfiyCodeCount = res.delayTime || 60;
                        this.verfiyCodeTimer = setInterval(() => {
                            if (this.verfiyCodeCount > 0) {
                                this.verfiyCodeCount--;
                            } else {
                                this.verfiyCodeCount = null;
                                clearInterval(this.verfiyCodeTimer);
                            }
                        }, 1000);
                    } else {
                        this.des = `${res.message}，是否使用？`;
                        this.sigedStatus = res.status;
                        this.$refs.pop2._showDialog();
                    }
                });
            } else {
                this.$u.toast('手机格式不正确');
            }
        },
        goDetail() {
            const params = {
                orderNo: this.orderNo,
                mobile: this.phone,
                bankId: this.bankId,
                bankAccountNo: this.bankAccountNo,
                name: this.cardInfo.name,
                idcardNo: this.cardInfo.idcardNo,
                bankcardType: this.selectType,
                bankcardImgPath: this.bankcardImgPath,
                isOpenAccount: this.bankId === 'SECOND_ACCOUNT' ? 1 : 0,
                bankShorthand: this.selectBank.shorthand,
                bankName: this.selectBank.name,
                bankGroupCode: this.selectBank.bankGroupCode
            };
            if (this.sigedStatus === 2) {
                // 如果已签约 绑定签约关系
                this.$api.signedBind(params).then(() => {
                    uni.reLaunch({
                        url: `/pages/mine/signSuccess/index?bankId=${this.bankId}&orderNo=${this.orderNo}`
                    }); 
                });
            } else {
                // 如果是已开户，继续签约
                this._sign(params);
            } 
        },
        actionSelect(index, item) {
            this.selectBank = item;
            this.supportTypes = item.supportTypes;
            // 如果只限定信用卡
            if (item.supportTypes && item.supportTypes.length === 1) {
                if (item.supportTypes[0] === BANK_CARD_TYPE.CREDIT) {
                    this.selectType = BANK_CARD_TYPE.CREDIT;
                } else {
                    this.selectType = BANK_CARD_TYPE.SAVE;
                }
            }
            this.hasSMSSend = !!item.hasSMSSend;
            if (this.hasSMSSend) {
                // 需要发短信 就先预加载验证码倒计时
                this._loadVerfiyCount(); 
            }
        },
        commit() {
            if (this.bankAccountNo.length < 16 || this.bankAccountNo.length > 19) {
                this.$u.toast('银行卡号格式错误');
                return; 
            }
            const params = {
                orderNo: this.orderNo,
                mobile: this.phone,
                bankId: this.bankId,
                bankAccountNo: this.bankAccountNo,
                smsVerifyCode: this.verfiyCode,
                name: this.cardInfo.name,
                idcardNo: this.cardInfo.idcardNo,
                bankcardType: this.selectType,
                bankcardImgPath: this.bankcardImgPath,
                isOpenAccount: this.bankId === 'SECOND_ACCOUNT' ? 1 : 0,
                bankShorthand: this.selectBank.shorthand,
                bankName: this.selectBank.name,
                bankGroupCode: this.selectBank.bankGroupCode
            };
            if (this.selectType === BANK_CARD_TYPE.CREDIT) {
                if (!this.cvv) {
                    this.$u.toast('请先输入CVV');
                    return;
                }
                if (!this.period) {
                    this.$u.toast('请先输入有效期');
                    return;
                }
                params.cvv = this.cvv;
                // TIP 传参格式YYMM
                params.expired = this.period.substring(2, 4) + this.period.substring(0, 2);
            }
            this._sign(params);
        },
        _sign(params) {
            uni.showLoading({
                mask: true,
                title: '绑定中...'
            });
            this.$buriedPoint('bankcard', 'bankcard_submit', '1');
            this.$api.signBankV2(params).then(res => {
                if (res.status === 1) {
                    uni.hideLoading();
                    uni.reLaunch({
                        url: `/pages/mine/signSuccess/index?bankId=${this.bankId}&orderNo=${this.orderNo}`
                    }); 
                } else if (res.status === 4) {
                    // 三类户账户需要查询是否已开户 
                    this.queryOpenStatus();   
                } else {
                    uni.hideLoading();
                    this.des = res.status === 2 ? '您已存在签约，是否使用？' : '您的账户已开户，是否使用？';
                    this.sigedStatus = res.status;
                    this.$refs.pop2._showDialog();
                };  
            }).catch((err) => {
                uni.hideLoading();
                uni.navigateTo({
                    url: `/pages/mine/signFail/index?err=${err}`
                }); 
            });
        },
        async queryOpenStatus() {
            const data = await this.$api.queryICBCOenStatus(this.orderNo);
            if (data) {
                uni.hideLoading();
                this.commit();
            } else {
                // 如果还未开户 继续2秒一次轮询接口
                this.timer = setInterval(() => {
                    this.intervalQuery();
                }, 2000);
            }
        },
        async intervalQuery() {
            try {
                const data = await this.$api.queryICBCOenStatus(this.orderNo);
                if (data) {
                    clearInterval(this.timer);
                    this.timer = null;
                    uni.hideLoading();
                    this.commit();
                } else {
                    this.queryCount++;
                    // 轮询3次后
                    if (this.queryCount === 3) { 
                        clearInterval(this.timer);
                        this.timer = null;
                        uni.hideLoading();
                        uni.navigateTo({
                            url: '/pages/mine/signFail/index?err=开户签约失败，请返回重试'
                        });
                        return Promise.reject;
                    }
                }
            } catch {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        introduceClick() {
            this.showWalletText = true;
            // uni.navigateTo({
            //     url: '/pages/mine/walletIntroduce/index'
            // }); 
        },
        // 银行卡相机图标
        async handleClickCameraIcon() {
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: (res) => {
                    const tempFilePaths = res.tempFiles;
                    this.uploadLoading = true;
                    this.uploadText = '照片上传中';
                    const params = {
                        dir: 'bankcard'
                    };
                    uploadFile(tempFilePaths, params, 'IMG', false).then(async(res) => {
                        const url = res[0].filename;
                        this.bankcardImgPath = url;
                        this.uploadText = '照片识别中';
                        this.$buriedPoint('bankcard', 'bankcard_ocr_start', '1');
                        const ocrRes = await this.$api.getBankCardOcr({
                            imgPath: url
                        });
                        this.$buriedPoint('bankcard', 'bankcard_ocr_end', '1');
                        this.bankAccountNo = ocrRes;
                        this.uploadLoading = false;
                    }).catch((err) => {
                        console.log('err', err);
                        this.uploadLoading = false;
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.bank-container {
  overflow-x: hidden;
  padding-bottom: 54rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main-container {
      flex-grow:1;
      padding-bottom: 18rpx;
  }
  .des {
    font-size: 26rpx;
    color: #9ba2ad;
  }
  .upload_view {
    position: relative;
    padding: 0rpx 40rpx 19rpx;
    display: flex;
    flex-direction: column;
    .wallet_link {
      position: absolute;
      right: 30rpx;
      top: 13rpx;
      color: #5C7099;
      font-size: 24rpx;
    }
    .title {
      font-size: 42rpx;
      font-weight: bold;
      height:59rpx;
      line-height: 59rpx;
    }
    .des {
      margin-top: 4rpx;
      &:nth-of-type(2) {
        margin-bottom: 10rpx;
      }
    }
    .card_wrap {
      width: 100%;
      height: 120rpx;
      background: url('/static/images/back_bankhold.png') no-repeat;
      background-size: 100% 120rpx;
      border-radius: 20rpx;
      box-shadow:0px 10rpx 10rpx 0px rgba(229,234,243, 0.3);
      padding: 20rpx 30rpx;
      margin-top: 26rpx;
      display: flex;
      .card_tag {
          width: 100rpx;
          height: 40rpx;
          background: linear-gradient(343deg,rgba(181,173,157,1) 0%,rgba(227,214,188,1) 100%);
          border-radius: 4rpx;
          color: #FFFFFF;
          line-height: 40rpx;
          text-align: center;
          margin-right: 50rpx;
      }
      .card_des {
        font-weight: bold;
      }
    }
    .info_title {
      font-size: 34rpx;
      margin-top: 35rpx;
      font-weight: bold;
    }
  }
  .bank_con {
    display: flex;
    line-height: 1;
    justify-content: flex-start;
    align-items: center;
    font-size: 28rpx;
    padding-left: 30rpx;
    width: 100%;
    .image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 19rpx;
    }
    .name {
      color: #191919;
      margin-right: 30rpx;
      flex-shrink: 0;
      max-width: 110rpx;
    }
    span {
      font-size: 28rpx;
    }
    .placehold {
      color: #9ba2ad;
      font-size: 28rpx;
    }
  }
  .input_cont {
    display: flex;
    align-items: center;
    padding-left: 30rpx;
    height: 100rpx;
    input {
      background: #F8F9FB;
      border-radius: 10rpx;
      width: 80rpx;
      height: 50rpx;
      // padding: 0 15rpx;
      text-align: center;
    }
    i {
      display: inline-block;
      margin: 0 10rpx;
    }
  }
  .gray_des {
    background: #f8f9fb;
    width: 100%;
    height: 74rpx;
    padding-left: 45rpx;
    line-height: 74rpx;
  }
  .gray_line {
    background: #f8f9fb;
    width: 100%;
    height: 20rpx;
  }
  .cell__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 100rpx;
    height: 100rpx;
    text-align: right;
    width: 250rpx !important;
    color: #2546ff;
    font-weight: 600;
    font-size: 24rpx;
    &.cell__right--icon {
        width: 150rpx !important;
        image {
            width: 42rpx;
            height: 42rpx;
        }
    }
  }
  .bottom_line {
      margin-left:195rpx;
      width:100%;
      height:1px;
      background: #EEEEEE;
  }
  .span_container {
    display: flex;
    padding-left: 30rpx;
    button {
      display: inline-block;
      width: 100rpx;
      height: 45rpx;
      margin: 0;
      padding: 0;
      background: rgba(244, 245, 246, 1);
      border-radius: 4rpx;
      font-size: 24rpx;
      color: #D3D8E2;
      text-align: center;
      line-height: 45rpx;
      border: 0 !important;
    }
    button + button {
      margin-left: 30rpx;
    }
    .span--select {
      background: rgba(18,53,255,0.04);;
      color: $uni-color-primary;
    }
  }
  .check_container {
    padding: 28rpx 0 20rpx 40rpx;
    /deep/ .u-checkbox__icon {
      width: 24rpx !important;
      height: 24rpx !important;
      border: 1px solid #D0D0D0 !important;
    }
    /deep/ .u-checkbox__icon--checked {
      background: #FFFFFF !important;
      text {
        color:  #09BB07 !important;
      }
    }
    /deep/ .u-checkbox__label {
      color: $uni-text-color-grey;
      font-size: 26rpx;
      margin-right: 0;
    }
    .check_span {
      color: #576B95;
      font-size: 26rpx;
    }
  }
}
</style>
