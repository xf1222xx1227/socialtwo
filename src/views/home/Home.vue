<template>
  <div id="home">
    <div id="total">
      <el-form label-width="100px" :label-position="labelPosition" class="form">
        <!-- 
          ref: 获取dom元素
          action: 必选参数，上传的地址
          :on-preview：点击文件列表中已上传的文件时的钩子
          on-remove：文件列表移除文件时的钩子
          :before-remove：删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
          :on-exceed：文件超出个数限制时的钩子
          :file-list：上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
          multiple：选择多个文件
          drag ：是否启用拖拽上传
       -->
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-success="successUpload"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
        </el-upload>
      </el-form>
      <div>
        <p>{{ imgurl }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import base from "../../api/base";
export default {
  data() {
    return {
      labelPosition: "left",
      fileList: [],
      url: base.upload, // 图片地址服务器
      imgurl: "",
    };
  },
  methods: {
    // 点击上传按钮
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传成功函数
    successUpload(response, file, fileList) {
      console.log("上传成功");
      console.log(111, response);
      // console.log(222, file);
      // console.log(333, fileList);
      this.imgurl = base.host + "/" + response.url.slice(7);
      // console.log(444, this.imgurl);
      // : "upload\1645962080571-班主任工作电子记录本(1)(1).docx";
    },
  },
  computed: {
    ...mapState(["userid"]),
  },

  created() {
    // console.log(111, this.userid);
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  #total {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
}
</style>