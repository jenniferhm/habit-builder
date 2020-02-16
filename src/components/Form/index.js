import React from 'react';
import useForm from './utils/useForm';

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
const { MonthPicker, RangePicker } = DatePicker;

class TimeRelatedForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      console.log('Received values of form: ', values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:
        { span: 6 },
      wrapperCol:
        { span: 14 },
  };

  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };
  return(
      <Form { ...formItemLayout } onSubmit = { this.handleSubmit } >
        <Form.Item label="Date Ranges">
          {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
        </Form.Item>
        <Form.Item label="Amount">
          {getFieldDecorator('slider')(
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
              Title&nbsp;
              <Tooltip title="What do you want to do?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please add a title', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
          </Button>
      </Form>
    );
  }
}


const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(TimeRelatedForm);

export default WrappedTimeRelatedForm;