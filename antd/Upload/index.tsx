import { Upload, Modal, Input, Button, Image } from "antd";
import style from "./index.less";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const { TextArea } = Input;

/**
 * 在文本输出框中实现，上传和预览的分离
 * @returns
 */
const Index = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    // },
    {
      uid: "-5",
      name: "image.png",
      status: "error"
    }
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    console.log({ file });

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);

    setFileList(newFileList);
  };

  return (
    <div className={style.uploadWrapper} style={{ border: "1px solid red", margin: "0 20px", display: "flex" }}>
      <div>
        <TextArea autoSize={{ minRows: 1, maxRows: 6 }} placeholder='maxLength is 6' />
        <div className='upload' style={{ display: "flex" }}>
          <Upload
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            listType='picture-card'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}></Upload>
        </div>
      </div>
      <div children={123}></div>

      <>
        <Upload
          action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
          listType='picture-card'
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}>
          {fileList.length >= 8 ? null : "sc"}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt='example' style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
      <Button style={{ alignSelf: "end" }}>发送</Button>
    </div>
  );
};

export default Index;