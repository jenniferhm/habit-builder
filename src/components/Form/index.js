import React, {useContext} from 'react';
import Context from '../../Context';

import {
  DatePicker,
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Tooltip,
  Input,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { useHistory } from 'react-router-dom';
const { MonthPicker, RangePicker } = DatePicker;

const TimeRelatedForm = (props) => {

  const { contract, wallet } = useContext(Context);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      console.log(values);

      console.log(contract);
      history.push('/')
    });
  };

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol:
      { span: 6 },
    wrapperCol:
      { span: 14 },
  };

  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} >
      <Form.Item label="Date Ranges">
        {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
      </Form.Item>
      <Form.Item label="Amount">
        {getFieldDecorator('amount')(
          <Slider
            marks={{
              0: '$0',
              25: '$25',
              50: '$50',
              75: '$75',
              100: '$100',
            }}
          />,
        )}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Task Description&nbsp;
              <Tooltip title="What do you want to do?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please add a title', whitespace: true }],
        })(<Input />)}
      </Form.Item>

      <Form.Item
        label={
          <span>
            Supporter &nbsp;
              <Tooltip title="What do you want to do?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('supporter', {
          rules: [{ required: true, message: 'Please add a title', whitespace: true }],
        })(<Input />)}
      </Form.Item>
      <Button onSubmit={handleSubmit} type="primary" htmlType="submit">
        Submit
          </Button>
    </Form>
  );
}


const WrappedTimeRelatedForm = Form.create({
  name: 'time_related_controls',
})(TimeRelatedForm);

export default WrappedTimeRelatedForm;