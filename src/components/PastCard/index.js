/**
 * Temporary card component
 */
import React from 'react';
import { Button, Card, Icon, Avatar } from 'antd';

const PastCard = (props) => {
  console.log(props);

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Icon style={{
          color: 'green',
        }} 
        type="check-circle"></Icon>
      ]}
    >
      <Card.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={props.task_description}
        description={props.challege_start_date + ' ' + props.challege_end_date}
      />
    </Card>
  )
}

export default PastCard;