/**
 * Temporary card component
 */
import React from 'react';
import { Button, Card, Icon, Avatar } from 'antd';

const FailStyles = {
  iconColor: 'red',
  iconType: 'exclamation-circle',
  message: 'Failed',
};

const SuccessStyles = {
  iconColor: 'green',
  iconType: 'check-circle',
  message: 'Success',
};

const PastCard = (props) => {
  const styleObj = props.is_success ? FailStyles : SuccessStyles;

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
          color: styleObj.iconColor,
        }}
          type={styleObj.iconType}>
        </Icon>
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