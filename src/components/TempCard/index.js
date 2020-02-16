/**
 * Temporary card component for one challenge that's almost completed

 */
import React from 'react';
import { Button, Card, Icon, Avatar } from 'antd';

const TempCard = (props) => {

  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        // subtract 5
        <Button href={`/challenge${props.challenge_id - 5}`} type="secondary">
          More
          <Icon type="right" />
        </Button> 
      ]}
    >
      <Card.Meta
        title={props.task_description}
        description={`${props.days_out_of_30} day${props.days_out_of_30 === 1 ? '' : 's'} left!`}
      />
    </Card>
  )
}

export default TempCard;