<template>
  <div class="sh-item-twodate">
    <div  :class="disabled?'disabled-twodate':''" ></div>
    <div class="two-date">
      <el-date-picker
        size="mini"
        v-model="date[gjzd[0]]"
        @blur="focusUpdate"
        align="left"
        :value-format="format?format:'yyyy-MM-dd'"
        format="yyyy-MM-dd"
        type="date"
        :placeholder="placeholder + '起'"
      >
        >
      </el-date-picker>
      <i class="iii">~</i>
      <el-date-picker
        class="rpicker"
        @blur="focusUpdate"
        prefix-icon="null"
        v-model="date[gjzd[1]]"
        size="mini"
        :value-format="format?format:'yyyy-MM-dd'"
        format="yyyy-MM-dd"
        align="left"
        type="date"
        :placeholder="placeholder + '止'"
      >
        >
      </el-date-picker>
    </div>
  </div>
</template>

<script> 
export default {
  name:'sh-two-date',
  model: {
          prop: "value",
          event: "change",
  },
  props: {
          "value": null,
          "placeholder": String,
          "title": String,
          "disabled": null,
          "gjzd": Array,
          "format": String
  },
  mounted() {
          this.date=this.value;
  },
  methods: {
        focusUpdate(){
              this.$forceUpdate();
        },
  },
  watch: {
    value() {
          this.date = this.value;
    },
    date: {
          handler() { 
                this.$emit("change", this.date); 
          },
          deep: true,
    },
  },
  data() {
    return {
          date: {},  
    };
  },
};
</script>
 
<style scoped>
.disabled-twodate{
    background: #F5F7FA;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99993;
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
}
.rpicker{
    position: absolute;
    right: 10px;
}
.sh-item-twodate>>>.el-input__suffix{
  display: none;
}
>>>.el-input--suffix .el-input__inner {
    padding-right: 0 !important;
}
.el-date-editor.el-input{
    width: 90px !important;
}
>>>.el-input--mini .el-input__icon{
  margin-right: -12px;
}
*{
  font-size: 9pt !important;
}
>>>.el-input--mini .el-input__icon{
  display: flex;
  align-items: center;
  margin-left: -1px;
  padding-left: 5px;
}
>>> .el-input__inner {
  height: 30px;
  width: 90px !important;
  min-width: 95px;
  padding-left: 27px !important;
}
.two-date {
  min-width: 200px;
  padding-left: 2px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(220, 223, 230);
  overflow: hidden;
  height: 30px;
  display: block;
  position: relative;
}
.two-date >>> .el-input__inner {
  border: none !important;
}
.two-date >>> input:nth-last-child() {
  text-align: right !important;
}
.two-date >>> .el-date-editor .el-icon-circle-close {
  position: relative;
  left: 2px;
}
.iii {
  position: absolute;
  display: inline-block;
  z-index: 999;
  top: 55%;
  left: 50%;
  transform: translate(50%, -55%);
}
.sh-item-twodate{
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
}
</style>