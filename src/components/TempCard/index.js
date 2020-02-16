/**
 * Temporary card component
 */
import React from 'react';
import { Button, Card, Icon, Avatar } from 'antd';

const TempCard = (props) => {
  console.log(props.challenge_id);

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
        // <Icon type="setting" key="setting" />,
        // <Icon type="edit" key="edit" />,
        // <Icon type="ellipsis" key="ellipsis" />,
        <Button> Set Challenges</Button>
      ]}
    >
      <Card.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={props.task_description}
        description={`${props.days_out_of_30} days left!`}
      />
      {/* <Button>More Detail</Button> */}
    </Card>
  )
}

export default TempCard;