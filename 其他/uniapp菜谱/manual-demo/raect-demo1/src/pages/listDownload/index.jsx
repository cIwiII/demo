/* disable-eslint */
import React from "react";
import { CSVDownload, CSVLink } from "react-csv";

function Index() {
  const list = "你好";
  const array = [
    ["array1", "array2", "array3"],
    ["array4", "array5"]
  ];

  return (
    <div>
      123
      <CSVDownload
        data={list} //要导出的数据list
        target='_blank' //以打开新标签页形式进行下载
        filename='文本数据表.csv'
        style={{ float: "right", marginTop: "50px", marginRight: "35px" }}>
        下载
      </CSVDownload>
      <CSVLink data={array} enclosingCharacter={`'`} filename='文本数据表2.xlsx'>
        Download me //Link形式
      </CSVLink>
    </div>
  );
}

export default Index;
