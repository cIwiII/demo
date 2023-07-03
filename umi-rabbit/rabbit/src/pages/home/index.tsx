import { Col, Row, Card } from 'antd';
import React from 'react';
import img from '@/assets/index.png'

export default function index() {
  return (
    <div id='index'>
      <div>
        <Row style={{border:'1px solid #efefef',marginTop:'8px',padding:'20px'}}>
          <Col span={3}>
            <img src={`http://xawn.f3322.net:8002/distremote/static/avatar/${localStorage.getItem('userimg')}`}
             alt="" style={{width:'70px',height:'70px'}} />
          </Col>
          <Col span={8}>
            <div>
            下午好，{localStorage.getItem('username')}，要不要和朋友打局王者荣耀
            </div>
            <div>
            开发部 | 管理员
            </div>
            <div>上次登录时间：2022-08-27 17:51:40</div>
          </Col>
          <Col span={7}></Col>
          <Col span={2}>今日IP <div>1</div></Col>
          <Col span={2}>今日访问 <div>483</div></Col>
          <Col span={2}>总访问量 <div>4448</div></Col>
        </Row>
      </div>
      <div style={{width:'100%'}}>
        {/* <div>图表</div>
        <div>
          <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <div></div>
          </Card>
        </div> */}
        <img src={img} alt="" style={{margin:'8px 0px 5px -7px',width:'995px'}} />
      </div>

    </div>
  )
}
