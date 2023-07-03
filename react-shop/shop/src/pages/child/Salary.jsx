import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react"
import { findAllCategroy } from '../../api/goodsCateApi'


export default function Salary() {
  const [dataX,setDataX]=useState([])
  const [dataCen,setDataCen]=useState([])
  useEffect(()=>{
    getallCate();
  },[])
  //获取分类信息
  const getallCate=async ()=>{
    const res=await findAllCategroy()
    if(res.code===1){
      let dataXArr=[],dataCenArr=[]
      res.data.forEach(v=>{
        dataXArr.push(v.value);
        dataCenArr.push(v.children.length)
      })
      setDataX(dataXArr);
      setDataCen(dataCenArr);
    }
  }


  const getOption = () => {

    return {
      title: {
        text: "各大类子类数量统计",
        textStyle: {
          fontSize: 20,
        },
        
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '子类数量',
          type: 'bar',
          barWidth: '60%',
          data: dataCen
        }
      ]
    };
  }
  const getOption2 = () => {

    return {
      title: {
        text: "各个分类下的商品数量",
        textStyle: {
          fontSize: 20,
        },
        
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '商品数量',
          type: 'bar',
          barWidth: '60%',
          data: dataCen
        }
      ]
    };
  }
  const getOption3 = () => {
    return {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ],
          type: 'scatter'
        }
      ]
    }
  }
  const getOption4 = () => {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
  }
  return (
    <div>
      <ReactEcharts
        option={getOption()}
        style={{ height: "350px", width: "50%" }}
        className="react_for_echarts"
      ></ReactEcharts>
      <ReactEcharts
        option={getOption2()}
        style={{ height: "350px", width: "50%" }}
        className="react_for_echarts"
      ></ReactEcharts>
      <ReactEcharts
        option={getOption3()}
        style={{ height: "350px", width: "50%" }}
        className="react_for_echarts"
      ></ReactEcharts>
      <ReactEcharts
        option={getOption4()}
        style={{ height: "350px", width: "50%" }}
        className="react_for_echarts"
      ></ReactEcharts>
    </div>
  )
}