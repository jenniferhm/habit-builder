/**
 * Temporary card component
 */
import React from 'react';
import { Button, Card } from 'antd';

const TempCard = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Card.Meta title="Exercise or something" description="10 days to go" />
      <Button type="primary" size={100}>
        See more
    </Button>
    </Card>
  )
}

export default TempCard;